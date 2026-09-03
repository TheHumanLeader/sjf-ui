export type SjfOverlayPlacement =
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'left-start'
  | 'left'
  | 'left-end'

export type SjfOverlayStrategy = 'fixed' | 'absolute' | 'auto'
export type SjfOverlayMountTarget = HTMLElement | string | null
export type SjfOverlayMountResolver = () => SjfOverlayMountTarget

export interface SjfOverlayPointAnchor {
  x: number
  y: number
  width?: number
  height?: number
}

export type SjfOverlayAnchor = HTMLElement | SjfOverlayPointAnchor
export type SjfOverlayAnchorSource = SjfOverlayAnchor | (() => SjfOverlayAnchor | null)

export interface SjfOverlayOptions {
  placement?: SjfOverlayPlacement
  strategy?: SjfOverlayStrategy
  offset?: number
  viewportPadding?: number
  flip?: boolean
  shift?: boolean
  matchWidth?: boolean
}

export interface SjfOverlayDefaults {
  placement: SjfOverlayPlacement
  strategy: SjfOverlayStrategy
  offset: number
  viewportPadding: number
  flip: boolean
  shift: boolean
  matchWidth: boolean
}

export interface SjfOverlayRect {
  x: number
  y: number
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}

export interface SjfOverlayPositionResult {
  x: number
  y: number
  viewportX: number
  viewportY: number
  placement: SjfOverlayPlacement
  strategy: Exclude<SjfOverlayStrategy, 'auto'>
  anchorRect: SjfOverlayRect
  panelRect: SjfOverlayRect
  mount: HTMLElement | null
  maxWidth: number
  maxHeight: number
  minWidth?: number
}

const DEFAULTS: SjfOverlayDefaults = {
  placement: 'bottom-start',
  strategy: 'auto',
  offset: 6,
  viewportPadding: 8,
  flip: true,
  shift: true,
  matchWidth: false,
}

let overlayDefaults: SjfOverlayDefaults = { ...DEFAULTS }
let overlayMountResolver: SjfOverlayMountResolver = () =>
  typeof document === 'undefined' ? null : document.body

const scheduledUpdates = new Set<() => void>()
let scheduledFrame = 0

export function setSjfOverlayMount(resolver: SjfOverlayMountResolver): void {
  overlayMountResolver = resolver
}

export function getSjfOverlayMountResolver(): SjfOverlayMountResolver {
  return overlayMountResolver
}

export function resolveSjfOverlayMount(): HTMLElement | null {
  if (typeof document === 'undefined') return null

  const target = overlayMountResolver()
  const mount = typeof target === 'string'
    ? document.querySelector<HTMLElement>(target)
    : target

  const resolved = mount ?? document.body
  prepareCustomMount(resolved)
  return resolved
}

export function setSjfOverlayDefaults(options: Partial<SjfOverlayDefaults>): void {
  overlayDefaults = {
    ...overlayDefaults,
    ...options,
  }
}

export function getSjfOverlayDefaults(): Readonly<SjfOverlayDefaults> {
  return overlayDefaults
}

export function resetSjfOverlayDefaults(): void {
  overlayDefaults = { ...DEFAULTS }
}

export function createSjfPointAnchor(
  x: number,
  y: number,
  width = 0,
  height = 0,
): SjfOverlayPointAnchor {
  return { x, y, width, height }
}

export function getSjfOverlayAnchorRect(anchor: SjfOverlayAnchor): SjfOverlayRect {
  if (isHTMLElement(anchor)) {
    return rectFromDomRect(anchor.getBoundingClientRect())
  }

  const width = anchor.width ?? 0
  const height = anchor.height ?? 0
  return {
    x: anchor.x,
    y: anchor.y,
    left: anchor.x,
    top: anchor.y,
    right: anchor.x + width,
    bottom: anchor.y + height,
    width,
    height,
  }
}

export function computeSjfOverlayPosition(
  anchor: SjfOverlayAnchor,
  panel: HTMLElement | SjfOverlayRect,
  options: SjfOverlayOptions = {},
  mount: HTMLElement | null = resolveSjfOverlayMount(),
): SjfOverlayPositionResult {
  const config = { ...overlayDefaults, ...options }
  const anchorRect = getSjfOverlayAnchorRect(anchor)
  const panelRect = isHTMLElement(panel)
    ? rectFromDomRect(panel.getBoundingClientRect())
    : panel

  const viewport = getViewportRect()
  let placement = config.placement
  let coords = getPlacementCoords(anchorRect, panelRect, placement, config.offset)

  if (config.flip) {
    const opposite = getOppositePlacement(placement)
    const oppositeCoords = getPlacementCoords(anchorRect, panelRect, opposite, config.offset)
    const currentOverflow = getMainAxisOverflow(coords, panelRect, placement, viewport, config.viewportPadding)
    const oppositeOverflow = getMainAxisOverflow(oppositeCoords, panelRect, opposite, viewport, config.viewportPadding)

    if (currentOverflow > 0 && oppositeOverflow < currentOverflow) {
      placement = opposite
      coords = oppositeCoords
    }
  }

  if (config.shift) {
    coords = shiftIntoViewport(coords, panelRect, viewport, config.viewportPadding)
  }

  const strategy = resolveStrategy(config.strategy, mount)
  const mountCoords = convertViewportToMountCoords(coords.x, coords.y, strategy, mount)
  const available = getAvailableSize(
    anchorRect,
    placement,
    coords,
    viewport,
    config.viewportPadding,
    config.offset,
  )

  return {
    x: mountCoords.x,
    y: mountCoords.y,
    viewportX: coords.x,
    viewportY: coords.y,
    placement,
    strategy,
    anchorRect,
    panelRect,
    mount,
    maxWidth: available.maxWidth,
    maxHeight: available.maxHeight,
    ...(config.matchWidth ? { minWidth: anchorRect.width } : {}),
  }
}

export function applySjfOverlayPosition(
  panel: HTMLElement,
  result: SjfOverlayPositionResult,
): void {
  panel.style.position = result.strategy
  panel.style.left = `${roundCssPixel(result.x)}px`
  panel.style.top = `${roundCssPixel(result.y)}px`
  panel.style.maxWidth = `${Math.max(0, Math.floor(result.maxWidth))}px`
  panel.style.maxHeight = `${Math.max(0, Math.floor(result.maxHeight))}px`

  if (result.minWidth !== undefined) {
    panel.style.minWidth = `${Math.max(0, roundCssPixel(result.minWidth))}px`
  } else {
    panel.style.removeProperty('min-width')
  }

  panel.dataset.sjfOverlayPlacement = result.placement
  panel.style.setProperty('--sjf-overlay-anchor-width', `${result.anchorRect.width}px`)
  panel.style.setProperty('--sjf-overlay-anchor-height', `${result.anchorRect.height}px`)
}

export function scheduleSjfOverlayUpdate(update: () => void): void {
  scheduledUpdates.add(update)
  if (scheduledFrame || typeof requestAnimationFrame === 'undefined') {
    if (typeof requestAnimationFrame === 'undefined') flushScheduledUpdates()
    return
  }

  scheduledFrame = requestAnimationFrame(() => {
    scheduledFrame = 0
    flushScheduledUpdates()
  })
}

export function autoUpdateSjfOverlay(
  anchorSource: SjfOverlayAnchorSource,
  panelSource: () => HTMLElement | null,
  update: () => void,
): () => void {
  if (typeof window === 'undefined') return () => undefined

  let disposed = false
  let observedAnchor: HTMLElement | null = null
  let observedPanel: HTMLElement | null = null
  const resizeObserver = typeof ResizeObserver === 'undefined'
    ? null
    : new ResizeObserver(() => schedule())

  const resolveAnchor = (): SjfOverlayAnchor | null =>
    typeof anchorSource === 'function' ? anchorSource() : anchorSource

  const syncObservedElements = (): void => {
    if (!resizeObserver) return
    const anchor = resolveAnchor()
    const anchorElement = anchor && isHTMLElement(anchor) ? anchor : null
    const panelElement = panelSource()

    if (anchorElement !== observedAnchor) {
      if (observedAnchor) resizeObserver.unobserve(observedAnchor)
      observedAnchor = anchorElement
      if (observedAnchor) resizeObserver.observe(observedAnchor)
    }

    if (panelElement !== observedPanel) {
      if (observedPanel) resizeObserver.unobserve(observedPanel)
      observedPanel = panelElement
      if (observedPanel) resizeObserver.observe(observedPanel)
    }
  }

  const run = (): void => {
    if (disposed) return
    syncObservedElements()
    update()
  }

  const schedule = (): void => scheduleSjfOverlayUpdate(run)

  window.addEventListener('scroll', schedule, true)
  window.addEventListener('resize', schedule, { passive: true })
  window.visualViewport?.addEventListener('scroll', schedule, { passive: true })
  window.visualViewport?.addEventListener('resize', schedule, { passive: true })

  schedule()

  return () => {
    disposed = true
    scheduledUpdates.delete(run)
    resizeObserver?.disconnect()
    window.removeEventListener('scroll', schedule, true)
    window.removeEventListener('resize', schedule)
    window.visualViewport?.removeEventListener('scroll', schedule)
    window.visualViewport?.removeEventListener('resize', schedule)
  }
}

function flushScheduledUpdates(): void {
  const updates = [...scheduledUpdates]
  scheduledUpdates.clear()
  for (const update of updates) update()
}

function getPlacementCoords(
  anchor: SjfOverlayRect,
  panel: SjfOverlayRect,
  placement: SjfOverlayPlacement,
  offset: number,
): { x: number; y: number } {
  const [side, align = 'center'] = placement.split('-') as [string, string?]
  let x = anchor.left + (anchor.width - panel.width) / 2
  let y = anchor.top + (anchor.height - panel.height) / 2

  if (side === 'bottom') y = anchor.bottom + offset
  if (side === 'top') y = anchor.top - panel.height - offset
  if (side === 'right') x = anchor.right + offset
  if (side === 'left') x = anchor.left - panel.width - offset

  if (side === 'bottom' || side === 'top') {
    if (align === 'start') x = anchor.left
    if (align === 'end') x = anchor.right - panel.width
  } else {
    if (align === 'start') y = anchor.top
    if (align === 'end') y = anchor.bottom - panel.height
  }

  return { x, y }
}

function getOppositePlacement(placement: SjfOverlayPlacement): SjfOverlayPlacement {
  if (placement.startsWith('bottom')) return placement.replace('bottom', 'top') as SjfOverlayPlacement
  if (placement.startsWith('top')) return placement.replace('top', 'bottom') as SjfOverlayPlacement
  if (placement.startsWith('right')) return placement.replace('right', 'left') as SjfOverlayPlacement
  return placement.replace('left', 'right') as SjfOverlayPlacement
}

function getMainAxisOverflow(
  coords: { x: number; y: number },
  panel: SjfOverlayRect,
  placement: SjfOverlayPlacement,
  viewport: SjfOverlayRect,
  padding: number,
): number {
  if (placement.startsWith('bottom')) {
    return Math.max(0, coords.y + panel.height - (viewport.bottom - padding))
  }
  if (placement.startsWith('top')) {
    return Math.max(0, viewport.top + padding - coords.y)
  }
  if (placement.startsWith('right')) {
    return Math.max(0, coords.x + panel.width - (viewport.right - padding))
  }
  return Math.max(0, viewport.left + padding - coords.x)
}

function shiftIntoViewport(
  coords: { x: number; y: number },
  panel: SjfOverlayRect,
  viewport: SjfOverlayRect,
  padding: number,
): { x: number; y: number } {
  const minX = viewport.left + padding
  const maxX = Math.max(minX, viewport.right - padding - panel.width)
  const minY = viewport.top + padding
  const maxY = Math.max(minY, viewport.bottom - padding - panel.height)

  return {
    x: clamp(coords.x, minX, maxX),
    y: clamp(coords.y, minY, maxY),
  }
}

function getAvailableSize(
  anchor: SjfOverlayRect,
  placement: SjfOverlayPlacement,
  coords: { x: number; y: number },
  viewport: SjfOverlayRect,
  padding: number,
  offset: number,
): { maxWidth: number; maxHeight: number } {
  let maxWidth = viewport.width - padding * 2
  let maxHeight = viewport.height - padding * 2

  if (placement.startsWith('bottom')) maxHeight = viewport.bottom - padding - coords.y
  if (placement.startsWith('top')) maxHeight = anchor.top - padding - offset
  if (placement.startsWith('right')) maxWidth = viewport.right - padding - coords.x
  if (placement.startsWith('left')) maxWidth = anchor.left - padding - offset

  return {
    maxWidth: Math.max(0, maxWidth),
    maxHeight: Math.max(0, maxHeight),
  }
}

function resolveStrategy(
  strategy: SjfOverlayStrategy,
  mount: HTMLElement | null,
): Exclude<SjfOverlayStrategy, 'auto'> {
  if (strategy !== 'auto') return strategy
  if (typeof document === 'undefined' || !mount) return 'fixed'
  return mount === document.body || mount === document.documentElement ? 'fixed' : 'absolute'
}

function convertViewportToMountCoords(
  x: number,
  y: number,
  strategy: Exclude<SjfOverlayStrategy, 'auto'>,
  mount: HTMLElement | null,
): { x: number; y: number } {
  if (strategy === 'fixed' || !mount || typeof document === 'undefined') return { x, y }
  const mountRect = mount.getBoundingClientRect()
  return {
    x: x - mountRect.left + mount.scrollLeft,
    y: y - mountRect.top + mount.scrollTop,
  }
}

function prepareCustomMount(mount: HTMLElement): void {
  if (typeof document === 'undefined') return
  if (mount === document.body || mount === document.documentElement) return
  mount.dataset.sjfOverlayMount = ''

  if (typeof getComputedStyle !== 'undefined' && getComputedStyle(mount).position === 'static') {
    mount.style.position = 'relative'
    mount.dataset.sjfOverlayPositionPatched = ''
  }
}

function getViewportRect(): SjfOverlayRect {
  const visual = typeof window === 'undefined' ? null : window.visualViewport
  const left = visual?.offsetLeft ?? 0
  const top = visual?.offsetTop ?? 0
  const width = visual?.width ?? (typeof window === 'undefined' ? 0 : window.innerWidth)
  const height = visual?.height ?? (typeof window === 'undefined' ? 0 : window.innerHeight)

  return {
    x: left,
    y: top,
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
  }
}

function rectFromDomRect(rect: DOMRect | DOMRectReadOnly): SjfOverlayRect {
  return {
    x: rect.x,
    y: rect.y,
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  }
}

function isHTMLElement(value: unknown): value is HTMLElement {
  return typeof HTMLElement !== 'undefined' && value instanceof HTMLElement
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function roundCssPixel(value: number): number {
  return Math.round(value * 100) / 100
}
