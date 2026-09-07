import type { SjfPopoverProps } from '../Popover'
import type { SjfMenuItem } from '../Menu'
export interface SjfDropdownProps extends SjfPopoverProps {
  items: readonly SjfMenuItem[]
}
