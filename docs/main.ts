import { createVaporApp } from 'vue'
import App from './App.vue'
import SJFUI from '@/sjfui'
import { applySjfTheme, readStoredSjfTheme } from '@/core/theme'
import '@/styles/index.css'
import './styles.css'
import './theme.css'
import './component-demo.css'

applySjfTheme(readStoredSjfTheme())

const app = createVaporApp(App)
app.use(SJFUI)
app.mount('#app')
