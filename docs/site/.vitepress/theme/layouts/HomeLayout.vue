<script setup lang="ts">
// Nuxt の layout 相当のコンポーネントサンプルです。
// トップページなどで:
// 
//   <HomeLayout>
//     # Markdown コンテンツ...
//   </HomeLayout>
// 
// のようにラップして使ってください。
</script>

<template>
  <main id="main">
    <section class="home-layout__hero">
      <slot name="hero" />
    </section>
    <section class="home-layout__features">
      <slot name="features" />
    </section>
  </main>
</template>

<style scoped>
#main {
  display: flex;
  align-items: flex-start; /* 親（左右カラム）は中身の高さに合わせる */
  gap: 1rem;
}

.home-layout__hero {
  flex: 0 0 55%;
}

.home-layout__features {
  flex: 0 0 45%;

  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.home-layout__features > * {
  flex: 1 1 calc(50% - 1rem); /* 2 カラム & 各カードはコンテンツ量に応じた高さ */
}


</style>