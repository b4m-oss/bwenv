package cmd

import (
	"bwenv/src/utils"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

var pullCmd = &cobra.Command{
	Use:   "pull",
	Short: "Pull .env file from Bitwarden",
	Long:  "Pull .env file from Bitwarden and save it to the current directory or specified directory",
	Run:   runPull,
}

func init() {
	pullCmd.Flags().String("output", ".", "Directory to save .env file")
	rootCmd.AddCommand(pullCmd)
}

func runPull(cmd *cobra.Command, args []string) {
	// Check if bw command is installed
	installed, _ := utils.CheckBwCommand()
	if !installed {
		utils.Error("[ERROR] ❌ bw command is not installed...\n")
		os.Exit(1)
	}

	// Get --output flag value
	outputDir, err := cmd.Flags().GetString("output")
	if err != nil {
		utils.Error("[ERROR] Failed to get --output flag: %v\n", err)
		os.Exit(1)
	}

	// Get current working directory name as project name
	wd, err := os.Getwd()
	if err != nil {
		utils.Error("[ERROR] Failed to get current working directory: %v\n", err)
		os.Exit(1)
	}
	projectName := filepath.Base(wd)

	// If outputDir is "." or "..", use /project-root (for Docker container)
	if outputDir == "." || outputDir == ".." {
		outputDir = "/project-root"
	}

	// Get dotenvs folder ID (with unlock retry if locked)
	folderID, err := getDotenvsFolderIDWithUnlock()
	if err != nil {
		utils.Error("[ERROR] %s\n", err)
		os.Exit(1)
	}

	// Get item by project name (with unlock retry if locked)
	item, err := getItemByNameWithUnlock(folderID, projectName)
	if err != nil {
		utils.Error("[ERROR] %s\n", err)
		os.Exit(1)
	}

	// Check if item exists
	if item == nil {
		utils.Error("[ERROR] Item '%s' not found in dotenvs folder\n", projectName)
		utils.Infoln("[INFO] Tip: Use 'bwenv list' to see available items")
		os.Exit(1)
	}

	// Restore .env file content from JSON
	envContent, err := utils.RestoreEnvFileFromJSON(item.Notes)
	if err != nil {
		utils.Error("[ERROR] Failed to restore .env file from JSON: %v\n", err)
		os.Exit(1)
	}

	// Check if .env file already exists in output directory
	envPath := filepath.Join(outputDir, ".env")
	if _, err := os.Stat(envPath); err == nil {
		// File exists, ask for confirmation
		confirmed, err := utils.ConfirmOverwrite(fmt.Sprintf(".env file already exists in %s. Overwrite? (y/N): ", outputDir))
		if err != nil {
			utils.Error("[ERROR] Failed to get confirmation: %v\n", err)
			os.Exit(1)
		}
		if !confirmed {
			utils.Infoln("[INFO] Operation cancelled.")
			return
		}
	}

	// Create output directory if it doesn't exist
	if outputDir != "." && outputDir != "/project-root" {
		if err := os.MkdirAll(outputDir, 0755); err != nil {
			utils.Error("[ERROR] Failed to create output directory: %v\n", err)
			os.Exit(1)
		}
	}

	// Write .env file
	if err := os.WriteFile(envPath, []byte(envContent), 0644); err != nil {
		utils.Error("[ERROR] Failed to write .env file: %v\n", err)
		os.Exit(1)
	}

	utils.Successln("[INFO] ✅ .env file pulled successfully!")
}

