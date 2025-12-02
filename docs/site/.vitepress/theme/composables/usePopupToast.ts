import { createApp } from 'vue'
import PopupToast from '../components/common/ui/PopupToast.vue'

type PopupOptions = {
  message: string
  x: number
  y: number
  duration?: number
}

export function usePopupToast() {
  const showPopup = (options: PopupOptions) => {
    if (typeof window === 'undefined') return

    const container = document.createElement('div')
    document.body.appendChild(container)

    const app = createApp(PopupToast, {
      ...options,
      onClose: () => {
        app.unmount()
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
      }
    })

    app.mount(container)
  }

  return {
    showPopup
  }
}


