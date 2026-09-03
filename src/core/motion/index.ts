export const SJF_MOTION_DURATIONS = {
  instant: '80ms',
  fast: '120ms',
  normal: '180ms',
  slow: '260ms',
  enter: '220ms',
  leave: '160ms',
} as const

export type SjfMotionDuration = keyof typeof SJF_MOTION_DURATIONS

export const SJF_MOTION_EASINGS = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  enter: 'cubic-bezier(0, 0, 0, 1)',
  leave: 'cubic-bezier(0.4, 0, 1, 1)',
} as const

export type SjfMotionEasing = keyof typeof SJF_MOTION_EASINGS

/**
 * Cheap/default transition properties used by SJF components.
 * Components may opt into a bounded layout animation when the interaction
 * explicitly requires it, but transition: all is never part of the default.
 */
export const SJF_MOTION_SAFE_PROPERTIES = [
  'color',
  'background-color',
  'border-color',
  'box-shadow',
  'opacity',
  'transform',
] as const
