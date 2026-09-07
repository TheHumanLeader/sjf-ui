import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { parse } from '@vue/compiler-sfc'
import { componentCatalog } from '../docs/catalog.ts'

const root = new URL('../', import.meta.url)

test('all component and documentation SFCs parse with the installed Vapor compiler', () => {
  for (const directory of ['src/components', 'docs']) {
    const base = new URL(directory + '/', root)
    for (const name of fs
      .readdirSync(base, { recursive: true })
      .filter((name) => name.endsWith('.vue'))) {
      const filename = path.join(directory, name)
      const { errors } = parse(
        fs.readFileSync(new URL(name.replaceAll('\\', '/'), base), 'utf8'),
        { filename },
      )
      assert.deepEqual(
        errors.map((error) => String(error)),
        [],
        filename,
      )
    }
  }
})

test('the 42-component catalog has unique routes, live sources, public types and design notes', () => {
  assert.equal(componentCatalog.length, 42)
  assert.equal(new Set(componentCatalog.map((entry) => entry.name)).size, 42)
  assert.equal(new Set(componentCatalog.map((entry) => entry.path)).size, 42)
  const registry = fs.readFileSync(
    new URL('src/components/registry.ts', root),
    'utf8',
  )
  const registration = registry.slice(
    registry.indexOf('export const sjfComponents'),
  )
  for (const entry of componentCatalog) {
    assert.ok(
      registration.includes('SJF' + entry.name + ','),
      entry.name + ' is globally registered',
    )
    for (const file of ['index.vue', 'index.ts', 'design.md']) {
      assert.ok(
        fs.existsSync(new URL(`src/components/${entry.name}/${file}`, root)),
        entry.name + '/' + file,
      )
    }
    assert.ok(
      entry.code.includes('SJF' + entry.name),
      entry.name + ' has a usage example',
    )
    assert.ok(entry.api.length, entry.name + ' has API documentation')
  }
})
