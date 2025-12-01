<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

type NavItem = {
  text: string
  link?: string
  items?: NavItem[]
}

const props = defineProps<{
  items: NavItem[]
  /** 'header' = ヘッダーナビ用ドロップダウン, 'sidebar' = サイドバー用ツリー */
  variant?: 'header' | 'sidebar'
  /** 再帰レベル（1 がルート） */
  level?: number
}>()

const openState = ref<Record<string, boolean>>({})

const normalizedItems = computed(() => props.items ?? [])
const variant = computed(() => props.variant ?? 'header')
const level = computed(() => props.level ?? 1)

const hasItems = (item: NavItem) => Array.isArray(item.items) && item.items.length > 0

const keyFor = (index: number) => `${variant.value}-${level.value}-${index}`

const isOpen = (index: number) => !!openState.value[keyFor(index)]

const toggle = (index: number) => {
  const key = keyFor(index)
  openState.value[key] = !openState.value[key]
}
</script>

<template>
  <!-- ヘッダーナビ用（既存のドロップダウン） -->
  <template v-if="variant === 'header'">
    <ul class="header-nav-list">
      <li
        v-for="(item, index) in normalizedItems"
        :key="item.text ?? index"
        class="header-nav-item"
      >
        <template v-if="hasItems(item)">
          <button
            type="button"
            class="header-nav-link header-nav-toggle"
            :aria-expanded="isOpen(index)"
            @click="toggle(index)"
          >
            <span>{{ item.text }}</span>
            <span class="header-nav-toggle-icon" aria-hidden="true">
              {{ isOpen(index) ? '▲' : '▼' }}
            </span>
          </button>

          <transition name="header-nav-fade">
            <div
              v-if="isOpen(index)"
              class="header-submenu-wrapper"
            >
              <ListMenu
                :items="item.items || []"
                :variant="variant"
                :level="level + 1"
              />
            </div>
          </transition>
        </template>
        <template v-else>
          <a
            v-if="item.link"
            class="header-nav-link"
            :href="withBase(item.link)"
          >
            {{ item.text }}
          </a>
          <span
            v-else
            class="header-nav-link header-nav-link--static"
          >
            {{ item.text }}
          </span>
        </template>
      </li>
    </ul>
  </template>

  <!-- サイドバー用ツリーメニュー -->
  <template v-else>
    <ul
      class="sidebar-nav-list"
      :class="{ 'sidebar-nav-root': level === 1 }"
    >
      <li
        v-for="(item, index) in normalizedItems"
        :key="item.text ?? index"
        class="sidebar-nav-item"
      >
        <!-- 第1階層: デフォルト表示・トグルなし -->
        <template v-if="level === 1">
          <div class="sidebar-nav-section">
            <span class="sidebar-nav-section-title">
              {{ item.text }}
            </span>
          </div>
          <ListMenu
            v-if="hasItems(item)"
            :items="item.items || []"
            variant="sidebar"
            :level="level + 1"
          />
        </template>

        <!-- 第2階層以降: トグルで展開／折りたたみ -->
        <template v-else>
          <template v-if="hasItems(item)">
            <button
              type="button"
              class="sidebar-nav-link sidebar-nav-toggle"
              :aria-expanded="isOpen(index)"
              @click="toggle(index)"
            >
              <span class="sidebar-nav-text">
                {{ item.text }}
              </span>
              <span class="sidebar-nav-toggle-icon" aria-hidden="true">
                {{ isOpen(index) ? '−' : '+' }}
              </span>
            </button>

            <transition name="sidebar-nav-collapse">
              <div
                v-if="isOpen(index)"
                class="sidebar-nav-children"
              >
                <ListMenu
                  :items="item.items || []"
                  variant="sidebar"
                  :level="level + 1"
                />
              </div>
            </transition>
          </template>
          <template v-else>
            <a
              v-if="item.link"
              class="sidebar-nav-link sidebar-nav-leaf"
              :href="withBase(item.link)"
            >
              {{ item.text }}
            </a>
            <span
              v-else
              class="sidebar-nav-link sidebar-nav-leaf sidebar-nav-leaf--static"
            >
              {{ item.text }}
            </span>
          </template>
        </template>
      </li>
    </ul>
  </template>
</template>

<style scoped>
.header-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
}

.header-nav-item {
  position: relative;
}

.header-nav-link {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-option);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.header-nav-link:hover {
  color: var(--text-bold);
}

.header-nav-toggle {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

.header-nav-toggle-icon {
  font-size: 0.9rem;
}

.header-submenu-wrapper {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  min-width: 12rem;

  background: var(--bg-surface, #fff);
  border-radius: 0.5rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);
  padding: 0.75rem 0.75rem;
  z-index: 20;
}

.header-submenu-wrapper :deep(.header-nav-list) {
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
}

.header-submenu-wrapper :deep(.header-nav-link) {
  width: 100%;
  justify-content: space-between;
}

.header-nav-fade-enter-active,
.header-nav-fade-leave-active {
  transition: opacity 0.12s ease-out, transform 0.12s ease-out;
}

.header-nav-fade-enter-from,
.header-nav-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}

.header-nav-link--static {
  cursor: default;
}

/* === Sidebar variant === */
.sidebar-nav-list {
  list-style: none;
  margin: 0;
  padding-left: 0;
}

.sidebar-nav-root {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-nav-item {
  margin: 0;
}

.sidebar-nav-section-title {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-option);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.sidebar-nav-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  gap: 0.5rem;

  font-size: 1.35rem;
  font-weight: 500;
  color: var(--text-main, var(--text-bold));
  text-decoration: none;

  padding: 0.25rem 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.sidebar-nav-link:hover {
  color: var(--accent, var(--text-bold));
}

.sidebar-nav-text {
  flex: 1 1 auto;
}

.sidebar-nav-toggle-icon {
  font-size: 0.85rem;
}

.sidebar-nav-leaf {
  padding-left: 0.75rem;
}

.sidebar-nav-leaf--static {
  cursor: default;
}

.sidebar-nav-children {
  margin-top: 0.25rem;
  margin-left: 0.75rem;
  padding-left: 0.25rem;
  border-left: 1px solid var(--stroke-light, rgba(148, 163, 184, 0.4));
}

.sidebar-nav-collapse-enter-active,
.sidebar-nav-collapse-leave-active {
  transition: all 0.12s ease-out;
}

.sidebar-nav-collapse-enter-from,
.sidebar-nav-collapse-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
</style>