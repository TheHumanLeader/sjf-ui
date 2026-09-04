import type { SjfSize } from '../../core/size'

export const SJF_LIST_TYPES = ['list', 'menu', 'tree', 'tabs'] as const

export type SjfListType = (typeof SJF_LIST_TYPES)[number]
export type SjfListRole = 'listbox' | 'menu' | 'tree' | 'tablist'
export type SjfListItemRole = 'option' | 'menuitem' | 'treeitem' | 'tab'
export type SjfListModelValue = unknown | unknown[] | null
export type SjfListItemField = string | ((item: unknown, index: number) => unknown)

export interface SjfListProps {
  modelValue?: SjfListModelValue
  list?: readonly unknown[]
  itemTitle?: SjfListItemField
  itemSubtitle?: SjfListItemField
  itemIcon?: SjfListItemField
  itemValue?: SjfListItemField
  itemDisabled?: SjfListItemField
  activeColor?: string
  height?: string | number
  horizontal?: boolean
  multiple?: boolean
  size?: SjfSize
  type?: SjfListType
  ariaLabel?: string
}

export interface SjfListSelectPayload {
  value: unknown
  active: boolean
  item?: unknown
  index?: number
}

export function resolveSjfListItemField(
  item: unknown,
  field: SjfListItemField | undefined,
  index: number,
): unknown {
  if (!field) return undefined
  if (typeof field === 'function') return field(item, index)
  if (!field) return undefined

  return field.split('.').reduce<unknown>((value, key) => {
    if (value === null || typeof value !== 'object') return undefined
    return (value as Record<string, unknown>)[key]
  }, item)
}

export function getSjfListRole(type: SjfListType): SjfListRole {
  const roles: Record<SjfListType, SjfListRole> = {
    list: 'listbox',
    menu: 'menu',
    tree: 'tree',
    tabs: 'tablist',
  }
  return roles[type]
}

export function getSjfListItemRole(type: SjfListType): SjfListItemRole {
  const roles: Record<SjfListType, SjfListItemRole> = {
    list: 'option',
    menu: 'menuitem',
    tree: 'treeitem',
    tabs: 'tab',
  }
  return roles[type]
}
