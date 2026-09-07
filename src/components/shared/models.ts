export function clampSjfNumber(
  value: number,
  min = -Infinity,
  max = Infinity,
): number {
  const low = Number.isNaN(min) ? -Infinity : min
  const high = Math.max(low, Number.isNaN(max) ? Infinity : max)
  return Math.min(high, Math.max(low, value))
}
export function stepSjfNumber(
  value: number | null,
  delta: number,
  min = -Infinity,
  max = Infinity,
): number {
  const next = Number(
    ((value ?? (Number.isFinite(min) ? min : 0)) + delta).toPrecision(14),
  )
  return clampSjfNumber(next, min, max)
}
export function sjfPageCount(total: number, pageSize: number): number {
  return Math.max(
    1,
    Math.ceil(
      Math.max(0, Number.isFinite(total) ? total : 0) /
        Math.max(1, Number.isFinite(pageSize) ? Math.floor(pageSize) : 10),
    ),
  )
}
export function sjfPageItems(page: number, count: number): (number | string)[] {
  count = Math.max(1, Number.isFinite(count) ? Math.floor(count) : 1)
  const current = Math.max(
    1,
    Math.min(count, Number.isFinite(page) ? Math.floor(page) : 1),
  )
  const values = Array.from(
    new Set(
      [1, count, current - 1, current, current + 1].filter(
        (n) => n >= 1 && n <= count,
      ),
    ),
  ).sort((a, b) => a - b)
  const result: (number | string)[] = []
  values.forEach((n, i) => {
    if (i > 0 && n - values[i - 1] > 1) result.push('gap-' + n)
    result.push(n)
  })
  return result
}
export function sjfFileAccepted(
  file: { name: string; type: string },
  accept = '',
): boolean {
  const rules = accept
    .toLowerCase()
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return (
    !rules.length ||
    rules.some((rule) =>
      rule.startsWith('.')
        ? file.name.toLowerCase().endsWith(rule)
        : rule.endsWith('/*')
          ? file.type.toLowerCase().startsWith(rule.slice(0, -1))
          : file.type.toLowerCase() === rule,
    )
  )
}

export interface SjfFileSelectionOptions {
  multiple?: boolean
  accept?: string
  maxSize?: number
  limit?: number
}

export function selectSjfFiles<
  T extends { name: string; type: string; size: number },
>(
  current: T[],
  incoming: readonly T[],
  options: SjfFileSelectionOptions = {},
): { files: T[]; rejected: { file: T; reason: string }[] } {
  const next: T[] = options.multiple ? [...current] : []
  const limit = options.multiple
    ? Number.isFinite(options.limit)
      ? Math.max(1, Math.floor(options.limit!))
      : Infinity
    : 1
  const rejected: { file: T; reason: string }[] = []
  let accepted = 0
  for (const file of incoming) {
    const reason = !sjfFileAccepted(file, options.accept)
      ? '文件类型不符合要求'
      : Number.isFinite(options.maxSize) &&
          file.size > Math.max(0, options.maxSize!)
        ? '文件大小超出限制'
        : next.length >= limit
          ? '文件数量超出限制'
          : ''
    if (reason) rejected.push({ file, reason })
    else {
      next.push(file)
      accepted++
    }
  }
  // Cancelled selections and fully rejected batches preserve the existing files.
  return { files: accepted ? next : current, rejected }
}
