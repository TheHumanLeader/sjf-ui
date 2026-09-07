import type { SjfSize } from '../../core/size'
export interface SjfSpaceProps {
  size?: SjfSize
  vertical?: boolean
  wrap?: boolean
  align?: 'start' | 'center' | 'end' | 'stretch'
}
