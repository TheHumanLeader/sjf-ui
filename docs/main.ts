import { createVaporApp } from 'vue'
import App from './App.vue'
import SJFUI from '@/sjfui'
import { readStoredSjfTheme } from '@/core/theme'
import '@/styles/index.css'
import './styles.css'
import './theme.css'
import './component-demo.css'
import './list-demo.css'

SJFUI.setTheme(readStoredSjfTheme())

const app = createVaporApp(App)
app.use(SJFUI, {
  defaultSize: 'nm',
  overlay: {
    mount: () => '#sjf-overlay-root',
  },
})
app.mount('#app')
