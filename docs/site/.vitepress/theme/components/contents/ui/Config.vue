<script setup lang="ts">
import AppDropdown from '../../common/ui/AppDropdown.vue';
import IconLoader from '../../common/ui/IconLoader.vue';
import AppAppearanceSwitch from '../../common/ui/AppAppearanceSwitch.vue';
import AppLanguageSwitch from '../../common/ui/AppLanguageSwitch.vue';
</script>

<template>
  <AppDropdown class="config">
    <template #trigger="{ isOpen, toggle }">
      <button
        type="button"
        class="config-button"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click="toggle"
      >
        <IconLoader name="icon-cog" :width="23" :height="23" fill="currentColor" />
      </button>
    </template>
    
    <template #menu="{ close }">
      <div class="config__dropdown">
        <div class="config__menu">
          <b>言語設定</b>
          <AppLanguageSwitch inline />
        </div>
        <div class="config__menu">
          <b>テーマ設定</b>
          <AppAppearanceSwitch inline />
        </div>
      </div>
    </template>
  </AppDropdown>
</template>

<style scoped>
.config {
  position: relative;
  margin-left: 2em;
}

.config-button {
  border-radius: .4rem;
  width: 3.8rem;
  height: 3.8rem;
  color: var(--text-option);
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid var(--storoke-light);
  &:hover {
    background-color: var(--bg-accent);
  }
}

.config__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  min-width: 16rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background: var(--bg-main);
  border: 1px solid var(--stroke-light);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.config__menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .5rem;
  margin-bottom: 1.2rem;

  &:last-child {
    margin-bottom: 0;
  }

  b {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text-option);
    margin-bottom: 0.45rem;
  }
}
</style>