import assert from 'node:assert/strict'
import test from 'node:test'
import {
  clampSjfNumber,
  stepSjfNumber,
  sjfPageCount,
  sjfPageItems,
  sjfFileAccepted,
} from '../src/components/shared/models.ts'

test('number commits clamp both boundaries without changing in-range values', () => {
  assert.equal(clampSjfNumber(99, 0, 10), 10)
  assert.equal(clampSjfNumber(-99, 0, 10), 0)
  assert.equal(clampSjfNumber(2.5, 0, 10), 2.5)
  assert.equal(clampSjfNumber(8, 10, 2), 10)
  assert.equal(clampSjfNumber(8, NaN, NaN), 8)
})

test('decimal steps do not accumulate binary floating point noise', () => {
  let value = 0
  for (let i = 0; i < 100; i++) value = stepSjfNumber(value, 0.1)
  assert.equal(value, 10)
  assert.equal(stepSjfNumber(0.3, -0.1), 0.2)
  assert.equal(stepSjfNumber(1, 0.001), 1.001)
})

test('empty number stepping uses minimum or zero, then applies the range', () => {
  assert.equal(stepSjfNumber(null, 1), 1)
  assert.equal(stepSjfNumber(null, 0.1, 2, 10), 2.1)
  assert.equal(stepSjfNumber(null, -1, 0, 10), 0)
  assert.equal(stepSjfNumber(9.9, 0.2, 0, 10), 10)
})

test('pagination uses a safe integer page size and always offers at least one page', () => {
  assert.equal(sjfPageCount(0, 10), 1)
  assert.equal(sjfPageCount(-10, 10), 1)
  assert.equal(sjfPageCount(101, 10), 11)
  assert.equal(sjfPageCount(101, 10.5), 11)
  assert.equal(sjfPageCount(3, 0), 3)
  assert.equal(sjfPageCount(NaN, 10), 1)
  assert.equal(sjfPageCount(20, Infinity), 2)
})

test('pagination keeps first, last and adjacent pages with stable gap keys', () => {
  assert.deepEqual(sjfPageItems(1, 1), [1])
  assert.deepEqual(sjfPageItems(1, 2), [1, 2])
  assert.deepEqual(sjfPageItems(6, 12), [1, 'gap-5', 5, 6, 7, 'gap-12', 12])
  assert.deepEqual(sjfPageItems(99, 5), [1, 'gap-4', 4, 5])
  assert.deepEqual(sjfPageItems(NaN, NaN), [1])
})

test('pagination output remains bounded, unique and ordered over a million pages', () => {
  for (const page of [1, 2, 500000, 999999, 1000000]) {
    const items = sjfPageItems(page, 1000000)
    assert.ok(items.length <= 7)
    assert.equal(new Set(items).size, items.length)
    const numeric = items.filter((item) => typeof item === 'number')
    assert.equal(numeric[0], 1)
    assert.equal(numeric.at(-1), 1000000)
    assert.ok(numeric.includes(page))
    assert.deepEqual(
      numeric,
      [...numeric].sort((a, b) => a - b),
    )
  }
})

test('file acceptance handles case-insensitive extensions and empty MIME metadata', () => {
  assert.equal(sjfFileAccepted({ name: 'REPORT.PDF', type: '' }, '.pdf'), true)
  assert.equal(
    sjfFileAccepted({ name: 'archive.tar.gz', type: '' }, '.tar.gz'),
    true,
  )
  assert.equal(
    sjfFileAccepted({ name: 'report.pdf.exe', type: '' }, '.pdf'),
    false,
  )
})

test('file acceptance supports exact MIME, wildcard and mixed lists', () => {
  const image = { name: 'image.bin', type: 'IMAGE/PNG' }
  assert.equal(sjfFileAccepted(image, 'image/*'), true)
  assert.equal(sjfFileAccepted(image, '.txt, image/png'), true)
  assert.equal(sjfFileAccepted(image, 'text/*'), false)
  assert.equal(sjfFileAccepted({ name: 'unknown', type: '' }, 'image/*'), false)
  assert.equal(sjfFileAccepted(image, ' , '), true)
})
