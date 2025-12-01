<script setup lang="ts">
import { Content } from 'vitepress'
</script>

<template>
  <div class="page">
    <Header />
    <div class="content">
      <Content />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.content {
  flex: 1;
}
</style>