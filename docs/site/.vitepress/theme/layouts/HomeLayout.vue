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
  <section id="hero">
    <div class="container">
      <section class="hero-main">
        <slot name="hero" />
      </section>
      <section class="hero-features">
        <slot name="features" />
      </section>
    </div>
  </section>
</template>

<style scoped>
#hero  {
  padding-top: 7rem;
  .container {
    background-color: #ccd5e6;
    max-width: 130rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
    border-radius: .75rem;
  }

  .hero-main {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    align-self: start;
    padding: 4.5rem;

  }

  .heading-1 {
    font-size: 8.8rem;
  }

  .hero-features {
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: row;


  }

}


</style>