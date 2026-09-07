<template>
  <Teleport v-if="mount" :to="mount"
    ><Transition name="sjf-pop"
      ><div
        v-if="model"
        class="sjf-control sjf-snackbar"
        :style="style"
        role="status"
        @mouseenter="
          () => {
            hovering = true
            pause()
          }
        "
        @mouseleave="
          () => {
            hovering = false
            start()
          }
        "
        @focusin="
          () => {
            focusing = true
            pause()
          }
        "
        @focusout="focusout"
      >
        <span
          ><slot>{{ props.message }}</slot></span
        ><button
          v-if="props.action"
          type="button"
          @click="
            () => {
              emit('action')
              close()
            }
          "
        >
          {{ props.action }}</button
        ><button type="button" aria-label="关闭消息" @click="close">
          <SJFIcon name="close" :size="size" />
        </button></div></Transition
  ></Teleport>
</template>
<script setup vapor lang="ts">
import { shallowRef, watch, onMounted, onBeforeUnmount } from 'vue'
import SJFIcon from '../Icon/index.vue'
import { resolveSjfOverlayMount } from '../../core/overlay'
import { useSjfControl, useSjfValue } from '../shared/control'
import type { SjfSnackbarProps } from './index'
const props = withDefaults(defineProps<SjfSnackbarProps>(), {
  modelValue: undefined,
})
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  action: []
  close: []
}>()
const { style, size } = useSjfControl(props)
const model = useSjfValue(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  false,
)
const mount = shallowRef<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
const hovering = shallowRef(false),
  focusing = shallowRef(false)
function focusout(event: FocusEvent) {
  if (
    (event.currentTarget as HTMLElement).contains(
      event.relatedTarget as Node | null,
    )
  )
    return
  focusing.value = false
  start()
}
function pause() {
  if (timer) clearTimeout(timer)
  timer = undefined
}
function close() {
  pause()
  model.value = false
  emit('close')
}
function start() {
  pause()
  if (
    model.value &&
    !hovering.value &&
    !focusing.value &&
    (props.duration ?? 4500) > 0
  )
    timer = setTimeout(close, props.duration ?? 4500)
}
watch([model, () => props.message, () => props.duration], () => {
  if (!model.value) {
    hovering.value = false
    focusing.value = false
  }
  start()
})
onMounted(() => {
  mount.value = resolveSjfOverlayMount()
  start()
})
onBeforeUnmount(pause)
</script>
<style scoped>
.sjf-snackbar {
  position: fixed;
  z-index: 2000;
  bottom: 24px;
  left: 50%;
  translate: -50% 0;
  display: flex;
  align-items: center;
  gap: var(--sjf-c-pd);
  max-width: calc(100vw - 32px);
  min-width: min(360px, calc(100vw - 32px));
  padding: var(--sjf-c-pd);
  border-radius: var(--sjf-c-rd);
  background: var(
    --md-sys-color-inverse-surface,
    var(--md-sys-color-on-surface)
  );
  color: var(--md-sys-color-inverse-on-surface, var(--md-sys-color-surface));
  box-shadow: var(--sjf-shadow-md);
  pointer-events: auto;
}
.sjf-snackbar > span {
  flex: 1;
  overflow-wrap: anywhere;
}
.sjf-snackbar button {
  display: grid;
  place-items: center;
  color: inherit;
  white-space: nowrap;
  min-height: 2em;
  font-weight: 600;
}
</style>
