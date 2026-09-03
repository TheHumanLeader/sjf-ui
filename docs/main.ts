import { createVaporApp } from 'vue'
import App from './App.vue'
import { applySjfTheme, readStoredSjfTheme } from '@/core/theme'
import './styles.css'
import './theme.css'
import './component-demo.css'

applySjfTheme(readStoredSjfTheme())
createVaporApp(App).mount('#app')
