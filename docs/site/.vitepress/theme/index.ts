import type { Theme } from 'vitepress'
import CookieConsent from './components/common/CookieConsent.vue'
import CookieSettings from './components/common/CookieSettings.vue'
import IconLoader from './components/common/ui/IconLoader.vue'
import { useLanguageRedirect } from './useLanguageRedirect'
import { useGoogleAnalytics } from './useGoogleAnalytics'
import 'reset-css'

// Nuxt 風の pages/layouts/components 構成用に、
// レイアウト・コンポーネントをここで登録しておきます。
import HomeLayout from './layouts/HomeLayout.vue'
import Header from './components/contents/ui/Header.vue'
import Footer from './components/contents/ui/Footer.vue'
import DefaultPageLayout from './layouts/DefaultPageLayout.vue'
import AppLayout from './layouts/AppLayout.vue'
import HeroSection from './components/contents/HeroSection.vue'
import HeroFeatureCard from './components/contents/HeroFeatureCard.vue'

// サイト全体で使うカスタム CSS
import './styles/main.css'

export default {
  // 完全に自前実装のレイアウトを使う（DefaultTheme には依存しない）
  Layout: AppLayout,
  enhanceApp({ app }) {
    // グローバルコンポーネントとして登録しておくことで、
    // 任意の Markdown ページから <HomeLayout> や <HeroSection> を使えるようにします。
    app.component('CookieSettings', CookieSettings)
    app.component('Header', Header)
    app.component('Footer', Footer)

    // layouts
    app.component('HomeLayout', HomeLayout)
    app.component('DefaultPageLayout', DefaultPageLayout)

    // components
    app.component('HeroSection', HeroSection)
    app.component('HeroFeatureCard', HeroFeatureCard)
    app.component('CookieConsent', CookieConsent)
    app.component('IconLoader', IconLoader)
  },
  setup() {
    useLanguageRedirect()
    useGoogleAnalytics()
  }
} satisfies Theme

