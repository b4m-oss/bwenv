<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, ref, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    message: string
    x: number
    y: number
    duration?: number
  }>(),
  {
    duration: 2200
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true

  window.setTimeout(() => {
    isVisible.value = false
    window.setTimeout(() => {
      emit('close')
    }, 200)
  }, props.duration)
})
</script>

<template>
  <div
    class="popup-toast"
    :class="{ 'popup-toast--visible': isVisible }"
    :style="{
      left: `${x}px`,
      top: `${y}px`
    }"
  >
    <div class="popup-toast__inner">
      <span class="popup-toast__message">
        {{ message }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.popup-toast {
  position: fixed;
  z-index: 9999;
  transform: translate(-50%, -100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.popup-toast--visible {
  opacity: 1;
  transform: translate(-50%, -115%);
}

.popup-toast__inner {
  background: var(--bg-main);
  color: var(--text-bold);
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 1.1rem;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.16);
  border: 1px solid var(--stroke-light);
  position: relative;
}

html.dark .popup-toast__inner {
  background: rgba(15, 23, 42, 0.98);
  color: var(--text-lightest);
  border-color: rgba(148, 163, 184, 0.4);
}

.popup-toast__inner::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -0.5rem;
  transform: translateX(-50%);
  border-width: 0.5rem 0.5rem 0;
  border-style: solid;
  border-color: var(--bg-main) transparent transparent;
}

html.dark .popup-toast__inner::after {
  border-color: rgba(15, 23, 42, 0.98) transparent transparent;
}

.popup-toast__message {
  white-space: nowrap;
}

@media (max-width: 480px) {
  .popup-toast {
    max-width: calc(100vw - 3rem);
  }

  .popup-toast__message {
    white-space: normal;
  }
}
</style>


