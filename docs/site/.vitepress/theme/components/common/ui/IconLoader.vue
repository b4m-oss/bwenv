<script setup lang="ts">
import { computed, withDefaults, defineProps, ref, onMounted, watch } from 'vue'
import { withBase } from 'vitepress'

type FlipMode = 'none' | 'horizontal' | 'vertical' | 'both'

const props = withDefaults(
  defineProps<{
    /**
     * 読み込むアイコン名（拡張子なし）
     * 例: "icon-lang" -> /public/icons/icon-lang.svg
     */
    name: string
    fill?: string
    strokeWidth?: number | string
    strokeColor?: string
    width?: number | string
    height?: number | string
    /**
     * 水平方向・垂直方向の反転指定
     */
    flip?: FlipMode
    /**
     * 回転角度（deg）
     */
    rotate?: number
    /**
     * アクセシビリティ用のラベル
     */
    ariaLabel?: string
    /**
     * role 属性。アイコン用途なので基本は "img"
     */
    role?: string
  }>(),
  {
    fill: 'currentColor',
    strokeWidth: 1.5,
    strokeColor: 'currentColor',
    width: 24,
    height: 24,
    flip: 'none',
    rotate: 0,
    ariaLabel: '',
    role: 'img'
  }
)

// 読み込む SVG の URL
const src = computed(() => {
  // VitePress の base を考慮して public/icons からロード
  return withBase(`/icons/${props.name}.svg`)
})

// fetch してきた生の SVG テキスト
const rawSvg = ref<string>('')

// SVG のロード処理
const loadSvg = async () => {
  try {
    if (!src.value) return
    const res = await fetch(src.value)
    if (!res.ok) return
    const text = await res.text()
    rawSvg.value = text
  } catch (e) {
    // 失敗しても致命的ではないので握りつぶす
    rawSvg.value = ''
  }
}

onMounted(() => {
  loadSvg()
})

watch(src, () => {
  loadSvg()
})

const transformValue = computed(() => {
  const transforms: string[] = []

  if (props.flip === 'horizontal' || props.flip === 'both') {
    transforms.push('scaleX(-1)')
  }
  if (props.flip === 'vertical' || props.flip === 'both') {
    transforms.push('scaleY(-1)')
  }
  if (props.rotate) {
    transforms.push(`rotate(${props.rotate}deg)`)
  }

  return transforms.join(' ')
})

const wrapperStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : String(props.width)
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : String(props.height)
  }
  if (transformValue.value) {
    style.transform = transformValue.value
    style.transformOrigin = 'center'
  }

  // fill / stroke 系は、SVG 内で currentColor を使っている場合に効くように color を指定
  if (props.strokeColor) {
    // strokeColor を優先（線で描かれたアイコン用）
    style.color = props.strokeColor
  } else if (props.fill) {
    style.color = props.fill
  }

  return style
})

/**
 * props から渡されたスタイルを SVG テキストに反映する
 *  - strokeColor / strokeWidth / fill を簡易的に置換する
 *  - すべてのアイコンに効くように、存在する属性は上書きし、なければ <svg> に付与
 */
const processedSvg = computed(() => {
  if (!rawSvg.value) return ''

  let svg = rawSvg.value

  // <svg ...> を特定
  const svgTagMatch = svg.match(/<svg\b[^>]*>/)
  if (!svgTagMatch) return svg

  const originalSvgTag = svgTagMatch[0]
  let newSvgTag = originalSvgTag

  const ensureAttr = (tag: string, name: string, value?: string | number) => {
    if (value === undefined || value === null || value === '') return tag
    const strValue = String(value)
    const regexp = new RegExp(`${name}="[^"]*"`)
    if (regexp.test(tag)) {
      return tag.replace(regexp, `${name}="${strValue}"`)
    }
    // 属性がない場合は追加
    return tag.replace('<svg', `<svg ${name}="${strValue}"`)
  }

  newSvgTag = ensureAttr(newSvgTag, 'stroke', props.strokeColor)
  newSvgTag = ensureAttr(newSvgTag, 'stroke-width', props.strokeWidth)
  newSvgTag = ensureAttr(newSvgTag, 'fill', props.fill)

  // 1つ目の <svg> タグだけを差し替える
  svg = svg.replace(originalSvgTag, newSvgTag)

  return svg
})
</script>

<template>
  <span
    class="icon-loader"
    :style="wrapperStyle"
    :role="role"
    :aria-label="ariaLabel || undefined"
    :aria-hidden="ariaLabel ? undefined : 'true'"
    v-html="processedSvg"
  />
</template>

<style scoped>
.icon-loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* インライン SVG を以前の <img> と同様にラップ要素いっぱいに収める */
.icon-loader :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>


