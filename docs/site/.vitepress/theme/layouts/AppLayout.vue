<script setup lang="ts">
import { Content } from 'vitepress'
import AppAppearanceSwitch from '../components/AppAppearanceSwitch.vue'
import AppLanguageSwitch from '../components/AppLanguageSwitch.vue'
</script>

<template>
  <div class="app-layout">
    <header class="app-layout__header">
      <div class="app-layout__header-inner">
        <div class="app-layout__brand">
          <!-- ロゴ + サイトタイトル（お好みで差し替え） -->
          <a href="/" class="app-layout__logo-link">
            <img
              src="/logo.svg"
              alt="bwsf logo"
              class="app-layout__logo-image"
            >
            <span class="app-layout__logo-text">
              bwsf
            </span>
          </a>
        </div>

        <nav class="app-layout__nav">
          <!-- ここは一旦シンプルなマークアップだけ用意しておく -->
          <!-- 実際のリンク先は config.ts の locales.[lang].themeConfig.nav で制御されます -->
          <a href="/ja/guide/getting-started" class="app-layout__nav-link">
            ガイド
          </a>
          <a href="/ja/guide/commands" class="app-layout__nav-link">
            コマンド
          </a>
          <a href="/ja/guide/features" class="app-layout__nav-link">
            機能
          </a>
        </nav>

        <div class="app-layout__header-actions">
          <AppLanguageSwitch />
          <AppAppearanceSwitch />
        </div>
      </div>
    </header>

    <main class="app-layout__main">
      <Content />
    </main>

    <footer class="app-layout__footer">
      <div class="app-layout__footer-inner">
        <p class="app-layout__footer-copy">
          © b4m-oss, Bicycle for Mind LLC.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.app-layout__header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-border);
}

.app-layout__header-inner {
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.app-layout__logo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.app-layout__logo-image {
  width: 28px;
  height: 28px;
}

.app-layout__logo-text {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.app-layout__nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-layout__nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.app-layout__nav-link:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.app-layout__header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.app-layout__main {
  flex: 1;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.app-layout__footer {
  border-top: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

.app-layout__footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
}

.app-layout__footer-copy {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .app-layout__header-inner {
    padding-inline: 1rem;
    gap: 0.75rem;
  }

  .app-layout__main {
    padding-inline: 1rem;
  }

  .app-layout__nav {
    gap: 0.5rem;
  }

  .app-layout__nav-link {
    font-size: 0.85rem;
  }

  .app-layout__header-actions {
    gap: 0.5rem;
  }
}
</style>


