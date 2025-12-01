# bwsf

bwsf（Bitwarden Secured Files）は、[Bitwarden](https://bitwarden.com/)を使用して.envファイルを管理するCLIツールです。

[English version is here.](./README.md)

## 🚨🚨 破壊的変更 🚨🚨

### CLI名の変更

v0.11.0から、`bwenv`は`bwsf`に名前が変更されました。これは、既にbwenvコマンドが存在していたためです。混乱を避けるため、CLI名を変更することにしました。

#### 移行方法

設定ディレクトリの名前を変更してください。

```bash
mv ~/.config/bwenv ~/.config/bwsf
```

現在のバージョンをアンインストールし、最新バージョンを再インストールしてください。

```bash
brew uninstall bwenv
brew install bwsf
```

### 複数の`.env.environment`ファイル

v0.9.0から、bwsfは`.env | .env.staging | .env.production`のような複数の環境用.envファイルを保存できるようになりました。

これに伴い、BitwardenのNoteアイテムに保存されるデータ構造が変更されました。

v0.8.0以前に保存されたデータは、v0.9.0以降では互換性がありません。

移行システムは提供しません。

## 🚨🚨 破壊的変更 🚨🚨

v0.9.0から、bwenvは`.env | .env.staging | .env.production`のような複数環境の.envファイルを保存するようになりました。
これに伴い、BitwardenのNoteアイテムに保存されるデータ構造が変更されました。
v0.8.0以前に保存されたデータは、v0.9.0以降との互換性がありません。
マイグレーションシステムは提供されません。

## 概要

bwsfコマンドは、Bitwardenで管理されているdotenvファイルをサポートします。

簡単な使用方法は以下の通りです：

| コマンド | |
|----|----|
| bwsf push | .envファイルをBitwardenホストにプッシュ |
| bwsf pull | Bitwardenホストから.envファイルをプル |
| bwsf list | Bitwardenホストに保存されている.envファイルの一覧を表示 |

## 動機

私たちは長い間、Bitwardenをパスワードマネージャーとして使用しています。
また、.envファイルをBitwardenホストに保存し、シェルスクリプトとして管理しています。
このプロジェクトは、手作りのシェルスクリプトをGoで書かれたモダンなCLIコマンドに移行するものです。

## 要件

**`bw`** コマンドがマシンにインストールされている必要があります。

[bwコマンドのインストール方法については、こちらのドキュメントをお読みください。](https://bitwarden.com/help/cli/#download-and-install)

** Homebrew **: インストールに必要です。

### 対応OS

- macOS
- Linux
- [計画中] Windows

## インストール

[!Note]
これは計画中です。

- **macOS & Linux**: Homebrew
- **Windows**: Chocolaty

## 開発

### 要件

**Docker** が開発マシンにインストールされている必要があります。

### 開発環境の起動

```
git clone https://github.com/b4m-oss/bwenv.git
cd bwenv
make run
```

## ライセンス

[MIT License](./LICENSE)
