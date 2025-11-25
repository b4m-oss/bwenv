# bwenv

## 概要

Bitwardenを.envの管理に用いるCLIツール。

- 依存：bwコマンド

## 前提

- Bitwarden Cloudか、セルフホストのBitwarden環境があること
- それらで利用可能な、Bitwardenアカウント（メールアドレスとパスワードがあること）
- bwコマンドがインストールされていること

## 仕様

Bitwarden内に、dotenvsというフォルダを、.env専用のフォルダとして利用する
（従って、dotenvsという名称は、予約語となる）

dotenvsディレクトリのログインアイテムのドメイン名に相当する部分が「プロジェクト名」となる
例：「my-todo-app」など

## 機能

### bwenv pull --output <dirname>

カレントディレクトリ名をプロジェクト名として、dotenvsの中を検索
一致するプロジェクトに保存されている.env情報を取り出し、カレントディレクトリまたは、指定ディレクトリに展開する
既に、.envファイルがディレクトリ内に存在する場合は、上書きするかどうかをy/Nで質問

### bwenv push --from <dirname>

カレントディレクトリ名をプロジェクト名として、dotenvsの中を検索
一致するプロジェクト名のBitwardenログインアイテムがあれば、上書きするかどうかをy/Nで質問

### bwenv list

Bitwardenのdotenvs内にあるアイテムの一覧をリスト表示