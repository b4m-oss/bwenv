<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, ref, watch, type Ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * ドロップダウンの開閉状態（制御コンポーネント用）
     */
    modelValue?: boolean
    /**
     * 外側クリックで閉じるかどうか
     */
    closeOnClickOutside?: boolean
  }>(),
  {
    modelValue: undefined,
    closeOnClickOutside: true
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}>()

// 内部制御用
const isOpenInternal = ref(false)

const isOpen = computed({
  get() {
    if (props.modelValue === undefined) {
      return isOpenInternal.value
    }
    return props.modelValue
  },
  set(value: boolean) {
    if (props.modelValue === undefined) {
      isOpenInternal.value = value
    }
    emit('update:modelValue', value)
  }
})

const rootEl: Ref<HTMLElement | null> = ref(null)

function open() {
  if (!isOpen.value) {
    isOpen.value = true
  }
}

function close() {
  if (isOpen.value) {
    isOpen.value = false
  }
}

function toggle() {
  isOpen.value = !isOpen.value
}

function onClickOutside(ev: MouseEvent) {
  if (!props.closeOnClickOutside) return
  const root = rootEl.value
  if (!root) return
  const target = ev.target as Node | null
  if (target && root.contains(target)) return
  close()
}

watch(
  () => isOpen.value,
  (opened, wasOpened) => {
    if (opened && !wasOpened) {
      emit('open')
    } else if (!opened && wasOpened) {
      emit('close')
    }
  }
)

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside)
})

defineExpose({
  open,
  close,
  toggle,
  isOpen
})
</script>

<template>
  <div ref="rootEl" class="app-dropdown">
    <slot name="trigger" :is-open="isOpen" :open="open" :close="close" :toggle="toggle" />
    <slot v-if="isOpen" name="menu" :is-open="isOpen" :close="close" />
  </div>
</template>

<style scoped>
.app-dropdown {
  position: relative;
  display: inline-block;
}
</style>


