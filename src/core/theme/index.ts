export type SjfThemeName = 'pink' | 'starry'

export const SJF_M3_COLOR_ROLES = [
  'primary',
  'on-primary',
  'primary-container',
  'on-primary-container',
  'secondary',
  'on-secondary',
  'secondary-container',
  'on-secondary-container',
  'tertiary',
  'on-tertiary',
  'tertiary-container',
  'on-tertiary-container',
  'error',
  'on-error',
  'error-container',
  'on-error-container',
  'surface',
  'surface-dim',
  'surface-bright',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
  'on-surface',
  'on-surface-variant',
  'outline',
  'outline-variant',
  'inverse-surface',
  'inverse-on-surface',
  'inverse-primary',
  'shadow',
  'scrim',
] as const

export type SjfM3ColorRole = (typeof SJF_M3_COLOR_ROLES)[number]

export interface SjfThemePreset {
  name: SjfThemeName
  label: string
  colorScheme: 'light' | 'dark'
  colors: Record<SjfM3ColorRole, string>
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
    'surface-dim': '#E9D6DC',
    'surface-bright': '#FFF8FA',
    'surface-container-lowest': '#FFFFFF',
    'surface-container-low': '#FFF0F4',
    'surface-container': '#F9E9EE',
    'surface-container-high': '#F3E3E8',
    'surface-container-highest': '#EDDDE2',
    'on-surface': '#211A1D',
    'on-surface-variant': '#514347',
    outline: '#837378',
    'outline-variant': '#D5C2C8',
    'inverse-surface': '#362F31',
    'inverse-on-surface': '#FCEEF2',
    'inverse-primary': '#FFB0C9',
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
    'surface-dim': '#0B1020',
    'surface-bright': '#31394D',
    'surface-container-lowest': '#070B16',
    'surface-container-low': '#101629',
    'surface-container': '#151C31',
    'surface-container-high': '#1B233A',
    'surface-container-highest': '#252E46',
    'on-surface': '#E3E7F4',
    'on-surface-variant': '#C5C9DA',
    outline: '#8E92A5',
    'outline-variant': '#44495D',
    'inverse-surface': '#E3E7F4',
    'inverse-on-surface': '#2A3042',
    'inverse-primary': '#3D5F96',
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

export function getSjfContrastText(
  background: string,
  dark = '#000000',
  light = '#FFFFFF',
): string {
  return getSjfContrastRatio(background, dark) >= getSjfContrastRatio(background, light)
    ? dark
    : light
}

export function getSjfContrastRatio(a: string, b: string): number {
  const l1 = getRelativeLuminance(a)
  const l2 = getRelativeLuminance(b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function getSjfThemeRoleColor(name: SjfThemeName, role: SjfM3ColorRole): string {
  return SJF_THEME_PRESETS[name].colors[role]
}

export function getSjfAutoTextForRole(name: SjfThemeName, role: SjfM3ColorRole): string {
  return getSjfContrastText(getSjfThemeRoleColor(name, role))
}

export function applySjfTheme(name: SjfThemeName, root: HTMLElement = document.documentElement): void {
  const theme = SJF_THEME_PRESETS[name]
  root.dataset.sjfTheme = theme.name
  root.style.colorScheme = theme.colorScheme

  for (const [role, value] of Object.entries(theme.colors) as [SjfM3ColorRole, string][]) {
    root.style.setProperty(`--md-sys-color-${role}`, value)
    root.style.setProperty(`--sjf-auto-on-${role}`, getSjfContrastText(value))
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

function getRelativeLuminance(color: string): number {
  const [r, g, b] = parseHexColor(color).map((value) => {
    const channel = value / 255
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function parseHexColor(color: string): [number, number, number] {
  const value = color.trim().replace(/^#/, '')
  const normalized = value.length === 3
    ? value.split('').map((char) => char + char).join('')
    : value

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    throw new Error(`[SJF-UI] contrast color must be #RGB or #RRGGBB, got "${color}".`)
  }

  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ]
}
