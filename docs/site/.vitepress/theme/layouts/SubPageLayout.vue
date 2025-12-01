<script setup lang="ts">
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
      <slot />
    </main>
  </div>
</template>

<style scoped>
.subpage {
  padding: 7rem;
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "nav main";
  .subpage-nav {
    grid-area: nav;
  }
  #main {
    grid-area: main;
  }
}
</style>


