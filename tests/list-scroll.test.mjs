import assert from 'node:assert/strict'
import test from 'node:test'
import { createSjfListScroll, getSjfListWheelDelta } from '../src/components/List/scroll.ts'

function harness(position = 0, maximum = 1000) {
  let time = 0
  let nextId = 0
  const callbacks = new Map()
  const positions = []
  const scroll = createSjfListScroll({
    read: () => position,
    write: (value) => { position = value; positions.push(value) },
    max: () => maximum,
    now: () => time,
    requestFrame: (callback) => { callbacks.set(++nextId, callback); return nextId },
    cancelFrame: (id) => callbacks.delete(id),
  })
  return {
    scroll,
    positions,
    get position() { return position },
    get pending() { return callbacks.size },
    setMaximum(value) { maximum = value },
    step(milliseconds) {
      time += milliseconds
      const frame = [...callbacks.values()]
      callbacks.clear()
      frame.forEach((callback) => callback(time))
    },
  }
}

test('page scroll has intermediate frames, eases out, and lands exactly', () => {
  const h = harness()
  assert.equal(h.scroll.moveBy(240, 320), true)
  assert.equal(h.position, 0)
  for (let i = 0; i < 4; i++) h.step(80)
  assert.ok(h.positions[0] > 0 && h.positions[0] < 240)
  assert.ok(h.positions.every((value, i) => i === 0 || value > h.positions[i - 1]))
  assert.ok(h.positions[1] - h.positions[0] > h.positions[3] - h.positions[2])
  assert.equal(h.position, 240)
  assert.equal(h.pending, 0)
})

test('rapid same-direction input accumulates without a position jump', () => {
  const h = harness()
  h.scroll.moveBy(100, 320)
  h.step(40)
  const before = h.position
  h.scroll.moveBy(100, 320)
  assert.equal(h.position, before)
  assert.equal(h.pending, 1)
  h.step(320)
  assert.equal(h.position, 200)
})

test('reversing wheel input turns from the current position, not the old target', () => {
  const h = harness()
  h.scroll.moveBy(300, 160)
  h.step(40)
  const before = h.position
  h.scroll.moveBy(-40, 160)
  assert.equal(h.position, before)
  h.step(40)
  assert.ok(h.position < before)
  h.step(120)
  assert.equal(h.position, before - 40)
})

test('both ends clamp, and boundary input can fall through to native scrolling', () => {
  const h = harness(100, 250)
  h.scroll.moveBy(300, 180)
  h.step(180)
  assert.equal(h.position, 250)
  assert.equal(h.scroll.moveBy(100, 180), false)
  h.scroll.moveBy(-400, 180)
  h.step(180)
  assert.equal(h.position, 0)
  assert.equal(h.scroll.moveBy(-100, 180), false)
})

test('pointer / keyboard / unmount cancellation stops subsequent frames', () => {
  const h = harness()
  h.scroll.moveBy(200, 320)
  h.step(40)
  const before = h.position
  h.scroll.cancel()
  h.step(1000)
  assert.equal(h.position, before)
  assert.equal(h.pending, 0)
  h.scroll.moveBy(20, 120)
  h.step(120)
  assert.equal(h.position, before + 20)
})

test('content shrinking during animation never scrolls past the new end', () => {
  const h = harness()
  h.scroll.moveBy(600, 320)
  h.step(40)
  h.setMaximum(60)
  h.step(40)
  assert.ok(h.position <= 60)
  h.step(240)
  assert.equal(h.position, 60)
})

test('short reduced-motion duration still contains a real intermediate frame', () => {
  const h = harness()
  h.scroll.moveBy(120, 120)
  h.step(60)
  assert.ok(h.position > 0 && h.position < 120)
  h.step(60)
  assert.equal(h.position, 120)
})

test('invalid deltas do nothing; explicit zero duration completes safely', () => {
  const h = harness()
  for (const delta of [0, NaN, Infinity, -Infinity]) {
    assert.equal(h.scroll.moveBy(delta, 320), false)
  }
  assert.equal(h.pending, 0)
  h.scroll.moveBy(80, 0)
  assert.equal(h.position, 80)
})

test('wheel units, horizontal mapping, and off-axis gestures are normalized', () => {
  const event = { deltaX: 0, deltaY: 3, deltaMode: 0, shiftKey: false }
  assert.equal(getSjfListWheelDelta(event, false, 200), 3)
  assert.equal(getSjfListWheelDelta({ ...event, deltaMode: 1 }, false, 200), 60)
  assert.equal(getSjfListWheelDelta({ ...event, deltaY: -1, deltaMode: 2 }, false, 200), -200)
  assert.equal(getSjfListWheelDelta(event, true, 200), 3)
  assert.equal(getSjfListWheelDelta({ ...event, deltaX: -15 }, true, 200), -15)
  assert.equal(getSjfListWheelDelta({ ...event, deltaX: -15 }, false, 200), 0)
  assert.equal(getSjfListWheelDelta({ ...event, shiftKey: true }, false, 200), 0)
})
