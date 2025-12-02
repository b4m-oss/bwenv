import { onMounted, onBeforeUnmount, createApp } from 'vue'
import { usePopupToast } from './usePopupToast'
import CopyIcon from '../components/common/ui/CopyIcon.vue'

/**
 * Shiki が生成するコードブロックに「コードコピー」ボタンを差し込む
 * - 対象: pre.vp-code 内の code 要素
 * - 仕組み: マウント時に DOM を走査してボタンを動的に追加
 */
export function useCodeCopy() {
  const cleanupFns: (() => void)[] = []

  const { showPopup } = usePopupToast()

  onMounted(() => {
    const blocks = Array.from(document.querySelectorAll('pre.vp-code')) as HTMLElement[]

    blocks.forEach((pre) => {
      // 既にボタンが付いている場合はスキップ
      if (pre.querySelector('.copy')) return

      const code = pre.querySelector('code')
      if (!code) return

      // ボタン用のラッパー
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'copy'
      button.setAttribute('aria-label', 'copy code')

      // アイコン挿入用の span （IconLoader の SVG がここにマウントされる想定）
      const iconWrapper = document.createElement('span')
      iconWrapper.className = 'copy-icon'
      button.appendChild(iconWrapper)

      const iconApp = createApp(CopyIcon)
      iconApp.mount(iconWrapper)

      // ボタンのクリックでコード全文をコピー
      const handleClick = async (event: MouseEvent) => {
        const text = (code as HTMLElement).innerText
        try {
          await navigator.clipboard.writeText(text)
          button.classList.add('is-copied')
          setTimeout(() => button.classList.remove('is-copied'), 1500)

          const rect = button.getBoundingClientRect()
          const x = rect.left + rect.width / 2
          const y = rect.top

          showPopup({
            message: 'Copied!',
            x,
            y,
            duration: 2300
          })
        } catch (e) {
          // 失敗時は特に何もしない（将来トーストを出すなど拡張可能）
        }
      }

      button.addEventListener('click', handleClick)
      pre.appendChild(button)

      cleanupFns.push(() => {
        iconApp.unmount()
        button.removeEventListener('click', handleClick)
        if (button.parentNode) {
          button.parentNode.removeChild(button)
        }
      })
    })
  })

  onBeforeUnmount(() => {
    cleanupFns.forEach((fn) => fn())
  })
}


