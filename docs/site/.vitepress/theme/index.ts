import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import CookieConsent from './CookieConsent.vue'
import CookieSettings from './CookieSettings.vue'
import { useLanguageRedirect } from './useLanguageRedirect'
import { useGoogleAnalytics } from './useGoogleAnalytics'

// Nuxt 風の pages/layouts/components 構成用に、
// レイアウト・コンポーネントをここで登録しておきます。
import HomeLayout from './layouts/HomeLayout.vue'
import DefaultPageLayout from './layouts/DefaultPageLayout.vue'
import AppLayout from './layouts/AppLayout.vue'
import HeroSection from './components/HeroSection.vue'
import HeroFeatureCard from './components/HeroFeatureCard.vue'

// サイト全体で使うカスタム CSS
import './custom.css'

export default {
  extends: DefaultTheme,
  // サイト全体のレイアウトを完全にオリジナルの AppLayout に差し替えます。
  Layout: AppLayout,
  enhanceApp({ app }) {
    // グローバルコンポーネントとして登録しておくことで、
    // 任意の Markdown ページから <HomeLayout> や <HeroSection> を使えるようにします。
    app.component('CookieSettings', CookieSettings)

    // layouts
    app.component('HomeLayout', HomeLayout)
    app.component('DefaultPageLayout', DefaultPageLayout)

    // components
    app.component('HeroSection', HeroSection)
    app.component('HeroFeatureCard', HeroFeatureCard)
    app.component('CookieConsent', CookieConsent)
  },
  setup() {
    useLanguageRedirect()
    useGoogleAnalytics()
  }
} satisfies Theme

