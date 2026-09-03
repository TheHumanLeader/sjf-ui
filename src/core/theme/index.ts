export type SjfThemeName = 'pink' | 'starry'

export interface SjfThemePreset {
  name: SjfThemeName
  label: string
  colorScheme: 'light' | 'dark'
  colors: Record<string, string>
}

const pink: SjfThemePreset = {
  name: 'pink',
  label: '粉色',
  colorScheme: 'light',
  colors: {
    primary: '#B73E6F',
    'on-primary': '#FFFFFF',
    'primary-container': '#FFD9E5',
    'on-primary-container': '#3D001D',
    secondary: '#74565F',
    'on-secondary': '#FFFFFF',
    'secondary-container': '#FFD9E1',
    'on-secondary-container': '#2B151B',
    tertiary: '#80525F',
    'on-tertiary': '#FFFFFF',
    'tertiary-container': '#FFD9E0',
    'on-tertiary-container': '#32101A',
    error: '#BA1A1A',
    'on-error': '#FFFFFF',
    'error-container': '#FFDAD6',
    'on-error-container': '#410002',
    surface: '#FFF8FA',
    'surface-bright': '#FFF8FA',
    'surface-dim': '#E9D6DC',
    'surface-container-lowest': '#FFFFFF',
    'surface-container-low': '#FFF0F4',
    'surface-container': '#F9E9EE',
    'surface-container-high': '#F3E3E8',
    'surface-container-highest': '#EDDDE2',
    'on-surface': '#211A1D',
    'on-surface-variant': '#514347',
    outline: '#837378',
    'outline-variant': '#D5C2C8',
    shadow: '#000000',
    scrim: '#000000',
  },
}

const starry: SjfThemePreset = {
  name: 'starry',
  label: '星空',
  colorScheme: 'dark',
  colors: {
    primary: '#AEC6FF',
    'on-primary': '#17315F',
    'primary-container': '#304979',
    'on-primary-container': '#DAE2FF',
    secondary: '#C4C6DD',
    'on-secondary': '#2D3042',
    'secondary-container': '#44475A',
    'on-secondary-container': '#E0E2F9',
    tertiary: '#7DDCE7',
    'on-tertiary': '#00363C',
    'tertiary-container': '#00505A',
    'on-tertiary-container': '#A2EEF5',
    error: '#FFB4AB',
    'on-error': '#690005',
    'error-container': '#93000A',
    'on-error-container': '#FFDAD6',
    surface: '#0B1020',
    'surface-bright': '#31394D',
    'surface-dim': '#0B1020',
    'surface-container-lowest': '#070B16',
    'surface-container-low': '#101629',
    'surface-container': '#151C31',
    'surface-container-high': '#1B233A',
    'surface-container-highest': '#252E46',
    'on-surface': '#E3E7F4',
    'on-surface-variant': '#C5C9DA',
    outline: '#8E92A5',
    'outline-variant': '#44495D',
    shadow: '#000000',
    scrim: '#000000',
  },
}

export const SJF_THEME_PRESETS: Record<SjfThemeName, SjfThemePreset> = {
  pink,
  starry,
}

export const SJF_DEFAULT_THEME: SjfThemeName = 'pink'
export const SJF_THEME_STORAGE_KEY = 'sjf-ui-theme'

export function applySjfTheme(name: SjfThemeName, root: HTMLElement = document.documentElement): void {
  const theme = SJF_THEME_PRESETS[name]
  root.dataset.sjfTheme = theme.name
  root.style.colorScheme = theme.colorScheme

  for (const [role, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--md-sys-color-${role}`, value)
  }
}

export function readStoredSjfTheme(): SjfThemeName {
  if (typeof localStorage === 'undefined') return SJF_DEFAULT_THEME
  const value = localStorage.getItem(SJF_THEME_STORAGE_KEY)
  return value === 'starry' || value === 'pink' ? value : SJF_DEFAULT_THEME
}

export function setSjfTheme(name: SjfThemeName): void {
  applySjfTheme(name)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(SJF_THEME_STORAGE_KEY, name)
  }
}
