<script setup lang="ts">
import TableOfContents from '../components/contents/ui/TableOfContents.vue'
import DocFooter from '../components/contents/ui/DocFooter.vue'

// 一般的なページ用のレイアウトサンプルです。
// 例:
//   <DefaultPageLayout>
//     # Markdown 見出し
//     ページ本文...
//   </DefaultPageLayout>
//
// といった形で、docs 全体に共通のレイアウトを持たせることができます。
</script>

<template>
  <div class="subpage">
    <nav class="subpage-nav">
      <SidebarMenu />
    </nav>
    <main id="main">
      <div class="content-container">
        <slot />
        <DocFooter />
      </div>
    </main>
    <aside class="subpage-aside">
      <TableOfContents />
      <slot name="aside" />
    </aside>
  </div>
</template>

<style scoped>

</style>
