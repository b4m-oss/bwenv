import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'bwenv',
  description: 'Manage .env files with Bitwarden CLI',
  
  // GitHub Pages base path
  base: '/bwenv/',
  
  // Clean URLs (no .html extension)
  cleanUrls: true,
  
  // Head meta tags
  head: [
    ['meta', { name: 'theme-color', content: '#175ddc' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:site_name', content: 'bwenv' }],
  ],
  
  themeConfig: {
    // Logo and site title
    logo: '/logo.svg',
    siteTitle: 'bwenv',
    
    // Navigation bar
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Commands', link: '/guide/commands' },
      {
        text: 'Links',
        items: [
          { text: 'GitHub', link: 'https://github.com/b4m-oss/bwenv' },
          { text: 'Changelog', link: 'https://github.com/b4m-oss/bwenv/releases' },
        ]
      }
    ],
    
    // Sidebar
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is bwenv?', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' },
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'Commands', link: '/guide/commands' },
        ]
      }
    ],
    
    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/b4m-oss/bwenv' }
    ],
    
    // Footer
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © b4m-oss'
    },
    
    // Search
    search: {
      provider: 'local'
    },
    
    // Edit link
    editLink: {
      pattern: 'https://github.com/b4m-oss/bwenv/edit/main/docs/site/:path',
      text: 'Edit this page on GitHub'
    }
  }
})

