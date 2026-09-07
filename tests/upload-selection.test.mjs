import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { selectSjfFiles } from '../src/components/shared/models.ts'

const file = (name, size = 12, type = 'text/plain') => ({ name, size, type })

test('validated File objects retain identity and original local bytes', async () => {
  const bytes = readFileSync(new URL('./fixtures/attachment.txt', import.meta.url))
  const attachment = new File([bytes], 'attachment.txt', {type: 'text/plain'})
  const selected = selectSjfFiles([], [attachment], {accept: '.txt', maxSize: 1024})
  assert.equal(selected.files[0], attachment)
  assert.equal(await selected.files[0].text(), bytes.toString())
})

test('single-file selection replaces the file only after validation succeeds', () => {
  const previous = [file('old.txt')]
  const incoming = file('new.txt')
  assert.deepEqual(selectSjfFiles(previous, [incoming], { accept: '.txt' }), {
    files: [incoming],
    rejected: [],
  })
  assert.equal(previous[0].name, 'old.txt')
  const rejected = selectSjfFiles(previous, [file('bad.exe')], {
    accept: '.txt',
  })
  assert.equal(rejected.files, previous)
  assert.equal(rejected.rejected[0].reason, '文件类型不符合要求')
})

test('cancelling the picker never clears an existing selection', () => {
  const previous = [file('old.txt')]
  assert.equal(selectSjfFiles(previous, []).files, previous)
  assert.equal(selectSjfFiles(previous, [], { multiple: true }).files, previous)
})

test('multiple selection preserves previous files and checks aggregate count', () => {
  const previous = [file('one.txt')]
  const second = file('two.txt'),
    third = file('three.txt')
  const result = selectSjfFiles(previous, [second, third], {
    multiple: true,
    limit: 2,
  })
  assert.deepEqual(result.files, [previous[0], second])
  assert.deepEqual(result.rejected, [
    { file: third, reason: '文件数量超出限制' },
  ])
  assert.equal(previous.length, 1)
})

test('size rejection does not consume a slot needed by later valid files', () => {
  const tooLarge = file('large.txt', 101),
    valid = file('valid.txt', 100)
  const result = selectSjfFiles([], [tooLarge, valid], {
    multiple: true,
    limit: 1,
    maxSize: 100,
  })
  assert.deepEqual(result.files, [valid])
  assert.equal(result.rejected[0].reason, '文件大小超出限制')
})

test('a single-file batch accepts at most one file even if a drop contains more', () => {
  const result = selectSjfFiles([], [file('one.txt'), file('two.txt')])
  assert.equal(result.files.length, 1)
  assert.equal(result.rejected.length, 1)
})
