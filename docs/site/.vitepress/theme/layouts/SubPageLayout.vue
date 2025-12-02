<script setup lang="ts">
import { ref } from 'vue'
import TableOfContents from '../components/contents/ui/TableOfContents.vue'
import DocFooter from '../components/contents/ui/DocFooter.vue'
import { useCodeCopy } from '../composables/useCodeCopy'

// 一般的なページ用のレイアウトサンプルです。
// 例:
//   <DefaultPageLayout>
//     # Markdown 見出し
//     ページ本文...
//   </DefaultPageLayout>
//
// といった形で、docs 全体に共通のレイアウトを持たせることができます。

const isSidebarOpen = ref(false)

useCodeCopy()

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="subpage-layout">
    <!-- 860px 以下で表示されるメニュートグル -->
    <button
      type="button"
      class="subpage-menu-toggle"
      :aria-expanded="isSidebarOpen"
      @click="toggleSidebar"
    >
      メニュー
    </button>

    <div class="subpage">
      <nav
        class="subpage-nav"
        :class="{ 'is-open': isSidebarOpen }"
      >
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

    <!-- オフキャンバス時の背景オーバーレイ -->
    <div
      v-if="isSidebarOpen"
      class="subpage-overlay"
      @click="closeSidebar"
    />
  </div>
</template>

<style scoped>
.subpage-aside {
  padding: .8rem;
  padding-top: 3.2rem;
}
</style>
