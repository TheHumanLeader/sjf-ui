interface SjfScrollDriver {
  read: () => number
  write: (position: number) => void
  max: () => number
  now: () => number
  requestFrame: (callback: (time: number) => void) => number
  cancelFrame: (id: number) => void
}

/** One animation per list; repeated input retargets it without jumping. */
export function createSjfListScroll(driver: SjfScrollDriver) {
  let frame: number | undefined
  let destination: number | undefined

  const clamp = (value: number) => Math.max(0, Math.min(value, Math.max(0, driver.max())))

  function cancel(): void {
    if (frame !== undefined) driver.cancelFrame(frame)
    frame = undefined
    destination = undefined
  }

  function moveBy(delta: number, duration: number): boolean {
    if (!Number.isFinite(delta) || delta === 0) return false

    const start = clamp(driver.read())
    const pending = destination === undefined ? 0 : destination - start
    // Same-direction input accumulates; a reversal must not wait for old input.
    const base = pending * delta > 0 ? destination! : start
    const target = clamp(base + delta)
    if (Math.abs(target - start) < 0.5) {
      cancel()
      return false
    }

    cancel()
    if (!Number.isFinite(duration) || duration <= 0) {
      driver.write(target)
      return true
    }

    destination = target
    const startedAt = driver.now()
    const tick = (time: number) => {
      const progress = Math.max(0, Math.min(1, (time - startedAt) / duration))
      const eased = 1 - (1 - progress) ** 3
      const end = clamp(target)
      driver.write(clamp(start + (end - start) * eased))
      if (progress < 1) {
        frame = driver.requestFrame(tick)
      } else {
        frame = undefined
        destination = undefined
      }
    }
    frame = driver.requestFrame(tick)
    return true
  }

  return { moveBy, cancel }
}

export function getSjfListWheelDelta(
  event: Pick<WheelEvent, 'deltaX' | 'deltaY' | 'deltaMode' | 'shiftKey'>,
  horizontal: boolean,
  pageSize: number,
): number {
  if (!horizontal && (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY))) {
    return 0
  }
  const delta = horizontal && Math.abs(event.deltaX) > Math.abs(event.deltaY)
    ? event.deltaX
    : event.deltaY
  const unit = event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? pageSize : 1
  return delta * unit
}
