import { shallowRef, type ShallowRef } from 'vue'

export const SJF_BUILTIN_SIZE_ORDER = ['mn', 'sm', 'nm', 'md', 'lg'] as const

export type SjfBuiltinSize = (typeof SJF_BUILTIN_SIZE_ORDER)[number]
export type SjfSize = SjfBuiltinSize | (string & {})

export interface SjfSizeDomains {
  padding: string
  margin: string
  gap: string
  radius: string
  shadow: string
  controlHeight: string
  fontSize: string
  labelWidth: string
  lineWidth: string
}

export type SjfSizeDomain = keyof SjfSizeDomains
export type SjfSizeOffset = number

export interface SjfSizeRecipeItem {
  domain: SjfSizeDomain
  offset?: SjfSizeOffset
}

export type SjfSizeRecipe = Record<string, SjfSizeRecipeItem>

export interface RegisterSizeOptions {
  before?: SjfSize
  after?: SjfSize
  domains: SjfSizeDomains
}

const DEFAULT_DOMAINS: Record<SjfBuiltinSize, SjfSizeDomains> = {
  mn: {
    padding: '4px',
    margin: '4px',
    gap: '4px',
    radius: '4px',
    shadow: '0 1px 2px rgb(0 0 0 / 0.10)',
    controlHeight: '28px',
    fontSize: '11px',
    labelWidth: '72px',
    lineWidth: '1px',
  },
  sm: {
    padding: '8px',
    margin: '8px',
    gap: '8px',
    radius: '6px',
    shadow: '0 1px 3px rgb(0 0 0 / 0.12)',
    controlHeight: '32px',
    fontSize: '12px',
    labelWidth: '84px',
    lineWidth: '1px',
  },
  nm: {
    padding: '12px',
    margin: '12px',
    gap: '12px',
    radius: '8px',
    shadow: '0 2px 6px rgb(0 0 0 / 0.12)',
    controlHeight: '40px',
    fontSize: '14px',
    labelWidth: '96px',
    lineWidth: '1px',
  },
  md: {
    padding: '16px',
    margin: '16px',
    gap: '16px',
    radius: '12px',
    shadow: '0 3px 10px rgb(0 0 0 / 0.14)',
    controlHeight: '48px',
    fontSize: '15px',
    labelWidth: '112px',
    lineWidth: '2px',
  },
  lg: {
    padding: '24px',
    margin: '24px',
    gap: '24px',
    radius: '16px',
    shadow: '0 6px 18px rgb(0 0 0 / 0.16)',
    controlHeight: '56px',
    fontSize: '16px',
    labelWidth: '132px',
    lineWidth: '2px',
  },
}

const order = shallowRef<SjfSize[]>([...SJF_BUILTIN_SIZE_ORDER])
const baseSize = shallowRef<SjfSize>('nm')
const domains = new Map<SjfSize, SjfSizeDomains>(
  SJF_BUILTIN_SIZE_ORDER.map((name) => [name, { ...DEFAULT_DOMAINS[name] }]),
)

export function useSjfSizeOrder(): ShallowRef<SjfSize[]> {
  return order
}

export function useSjfBaseSize(): ShallowRef<SjfSize> {
  return baseSize
}

export function setSjfBaseSize(size: SjfSize): void {
  assertRegisteredSize(size)
  baseSize.value = size
}

export function registerSjfSize(name: SjfSize, options: RegisterSizeOptions): void {
  if (domains.has(name)) {
    throw new Error(`[SJF-UI] size "${name}" is already registered.`)
  }

  if (options.before && options.after) {
    throw new Error('[SJF-UI] registerSjfSize accepts either before or after, not both.')
  }

  const nextOrder = [...order.value]

  if (options.before) {
    const index = nextOrder.indexOf(options.before)
    if (index < 0) throwUnknownAnchor(options.before)
    nextOrder.splice(index, 0, name)
  } else if (options.after) {
    const index = nextOrder.indexOf(options.after)
    if (index < 0) throwUnknownAnchor(options.after)
    nextOrder.splice(index + 1, 0, name)
  } else {
    nextOrder.push(name)
  }

  domains.set(name, { ...options.domains })
  order.value = nextOrder
}

export function compareSjfSize(a: SjfSize, b: SjfSize): number {
  return getSizeIndex(a) - getSizeIndex(b)
}

export function nextSjfSize(size: SjfSize): SjfSize {
  return offsetSjfSize(size, 1)
}

export function prevSjfSize(size: SjfSize): SjfSize {
  return offsetSjfSize(size, -1)
}

export function offsetSjfSize(size: SjfSize, offset = 0): SjfSize {
  const sizeOrder = order.value
  const currentIndex = getSizeIndex(size)
  const targetIndex = Math.min(sizeOrder.length - 1, Math.max(0, currentIndex + offset))
  return sizeOrder[targetIndex]
}

export function getSjfSizeValue(
  domain: SjfSizeDomain,
  size: SjfSize,
  offset = 0,
): string {
  const resolvedSize = offsetSjfSize(size, offset)
  const values = domains.get(resolvedSize)

  if (!values) {
    throw new Error(`[SJF-UI] size "${resolvedSize}" has no domain values.`)
  }

  return values[domain]
}

export function resolveSjfSizeRecipe(
  size: SjfSize,
  recipe: SjfSizeRecipe,
): Record<string, string> {
  assertRegisteredSize(size)

  return Object.fromEntries(
    Object.entries(recipe).map(([key, item]) => [
      key,
      getSjfSizeValue(item.domain, size, item.offset ?? 0),
    ]),
  )
}

function getSizeIndex(size: SjfSize): number {
  const index = order.value.indexOf(size)
  if (index < 0) {
    throw new Error(`[SJF-UI] unknown size "${size}".`)
  }
  return index
}

function assertRegisteredSize(size: SjfSize): void {
  getSizeIndex(size)
}

function throwUnknownAnchor(size: SjfSize): never {
  throw new Error(`[SJF-UI] size anchor "${size}" is not registered.`)
}
