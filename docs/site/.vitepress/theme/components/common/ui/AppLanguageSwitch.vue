<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useData, withBase } from 'vitepress'
import IconLoader from './IconLoader.vue'
import AppDropdown from './AppDropdown.vue'

const route = useRoute()
const { site } = useData()

// site.base（例: "/bwsf/"）を正規化して、先頭/末尾のスラッシュ重複を避ける
const normalizedBase = computed(() => {
  const base = site.value.base || '/'
  if (base === '/' || base === '') return ''
  return base.endsWith('/') ? base.slice(0, -1) : base
})

// ルーティング上の「言語付きパス」（例: "/ja/guide/..."）だけを取り出す
const languagePath = computed(() => {
  const base = normalizedBase.value
  const path = route.path

  if (base && path.startsWith(base + '/')) {
    return path.slice(base.length)
  }

  if (base && path === base) {
    return '/'
  }

  return path
})

const currentLang = computed(() => {
  const path = languagePath.value
  const match = path.match(/^\/([a-zA-Z-]+)\//)
  if (match) return match[1]
  return 'en'
})

// locales 設定から候補一覧を作成
const localeOptions = computed(() => {
  const locales = site.value.locales ?? {}
  const entries = Object.entries(locales) as [string, any][]

  return entries.map(([key, locale]) => {
    const langCode = key // "en", "ja", ...
    const label = locale.label ?? langCode

    const path = languagePath.value
    let langPath: string

    const match = path.match(/^\/([a-zA-Z-]+)\//)
    if (match) {
      // 先頭の言語セグメントを置き換える
      langPath = path.replace(/^\/([a-zA-Z-]+)\//, `/${langCode}/`)
    } else {
      // 何もついていなければ、その言語のルートへ
      langPath = `/${langCode}/`
    }

    return {
      lang: langCode,
      label,
      href: withBase(langPath)
    }
  })
})

const currentLabel = computed(() => {
  const current = localeOptions.value.find((opt) => opt.lang === currentLang.value)
  return current?.label ?? currentLang.value
})
</script>

<template>
  <AppDropdown class="app-language-switch">
    <template #trigger="{ isOpen, toggle }">
      <button
        type="button"
        class="button button-ghost"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click="toggle"
      >
        <IconLoader
          name="icon-lang"
          :width="14"
          :height="14"
          fill="currentColor"
          aria-label="言語を切り替える"
        />
        <span class="text">
          {{ currentLabel }}
        </span>
      </button>
    </template>

    <template #menu="{ close }">
      <ul class="app-language-switch__menu" role="listbox">
        <li
          v-for="locale in localeOptions"
          :key="locale.lang"
          class="app-language-switch__item"
        >
          <a
            :href="locale.href"
            class="app-language-switch__link"
            @click="close"
          >
            {{ locale.label }}
          </a>
        </li>
      </ul>
    </template>
  </AppDropdown>
</template>

<style scoped>
.app-language-switch {
  position: relative;

  .button {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
}

.app-language-switch__menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  min-width: 7rem;
  border-radius: 0.5rem;
  background: var(--bg-main);
  border: 1px solid var(--text-option);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;

  .app-language-switch__item {
    list-style: none;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-option);

    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      color: var(--text-option);
      &:hover {
        background: var(--bg-accent);
        color: var(--text-lightest);
      }
    }
  }
}
</style>


