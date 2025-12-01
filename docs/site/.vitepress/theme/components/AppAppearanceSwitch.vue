<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { isDark, theme } = useData()

const title = computed(() => {
  return isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})

function toggle() {
  isDark.value = !isDark.value
}
</script>

<template>
  <button
    type="button"
    class="app-appearance-switch"
    :aria-pressed="isDark"
    :title="title"
    @click="toggle"
  >
    <span class="icon sun" aria-hidden="true" />
    <span class="icon moon" aria-hidden="true" />
  </button>
</template>

<style scoped>
.app-appearance-switch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 20px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.app-appearance-switch:hover {
  background: var(--vp-c-bg-soft-up);
  border-color: var(--vp-c-brand-1);
}

.icon {
  width: 14px;
  height: 14px;
  display: inline-block;
}

.sun {
  mask: var(--vp-icon-sun) no-repeat center / contain;
  background-color: var(--vp-c-text-2);
}

.moon {
  display: none;
  mask: var(--vp-icon-moon) no-repeat center / contain;
  background-color: var(--vp-c-text-2);
}

.dark .sun {
  display: none;
}

.dark .moon {
  display: inline-block;
}
</style>


