---
title: ホーム
description: Bitwarden CLIで.envファイルを安全に管理
titleTemplate: bwsf - .env管理をもっと手軽に
layout: home
---

<HomeLayout>

<template #hero>
  <hgroup>
    <h1 class="heading-1">bwsf</h1>
    <div class="description">
      <p>.envファイルの管理はCLIに任せる</p>
      <p>プロジェクトも、環境も、メンバーも、すべて一元管理する</p>
      <p>オンプレミスでの利用も可能</p>
      <p>そんな夢のコマンドが、<span class="cmd">bwsf</span>です。</p>
    </div>
  </hgroup>
  
  <nav class="hero-nav">
    <a href="/guide/getting-started/" class="button button-super">今すぐ始める</a>
    <a href="https://github.com/b4m-oss/bwsf" class="button" taget="_blank" rel="noopener">GitHub</a>
    <span class="dev-by">開発：<a href="https://b4m.co.jp/" target="_blank" rel="noopener">合同会社 知的・自転車</a></span>
  </nav>
</template>

<template #features>
  <HeroFeatureCard title="たった4文字のコマンドライン" description="左手の指を4回動かすだけで打てる基本コマンド。オプションコマンドも、わかりやすくシンプルです。" />
  <HeroFeatureCard title="複数の開発環境に対応" description="開発（.local）、ステージング（.staging）、本番（.production）など、開発に利用されている複数の環境をまとめて管理できます。" />
  <HeroFeatureCard title="組織・メンバーで活用しやすい" description="Bitwardenは、組織での利用も可能です。開発メンバーだけをdotenvsフォルダーに招待し、必要な権限を与えることができます。" />
  <HeroFeatureCard title="機密情報は外に出さない" description="Bitwardenは、オープンソースです。オンプレミスで運用することもできます。" />
</template>

## クイックスタート

```bash
# Homebrew でインストール
brew tap b4m-oss/tap && brew install bwsf

# 初期設定
bwsf setup

# Bitwarden から .env をプル
cd /path/to/your_project
bwsf pull

# Bitwarden に .env をプッシュ
bwsf push
```

## 仕組み

bwsf は公式の Bitwarden CLI（`bw`）を使用して、`.env` ファイルを安全に保存・取得します。環境変数は Bitwarden ボールト内の専用 `dotenvs` フォルダに**ノートアイテム**として保存されます。

各プロジェクトの `.env` ファイルはディレクトリ名で識別されるため、複数のプロジェクトを簡単に整理・管理できます。

</HomeLayout>