<template>
  <div
    v-if="visible"
    class="sjf-control sjf-alert sjf-tone"
    :style="style"
    :data-tone="props.tone ?? 'primary'"
    :role="props.tone === 'error' ? 'alert' : 'status'"
  >
    <SJFIcon :name="icon" :size="size" />
    <div class="sjf-alert-copy">
      <strong v-if="props.title">{{ props.title }}</strong>
      <div><slot /></div>
    </div>
    <button
      v-if="props.closable"
      type="button"
      aria-label="关闭提示"
      @click="
        () => {
          visible = false
          emit('close')
        }
      "
    >
      <SJFIcon name="close" :size="size" />
    </button>
  </div>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import { computed, ref } from 'vue'
import SJFIcon from '../Icon/index.vue'
import type { SjfAlertProps } from './index'
const props = defineProps<SjfAlertProps>()
const emit = defineEmits<{ close: [] }>()
const { size, style } = useSjfControl(props)
const visible = ref(true)
const icon = computed(
  () =>
    ({
      primary: 'info',
      neutral: 'info',
      success: 'check_circle',
      warning: 'warning',
      error: 'error',
    })[props.tone ?? 'primary'],
)
</script>
<style scoped>
.sjf-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--sjf-c-pd);
  padding: var(--sjf-c-pd);
  border: 1px solid color-mix(in srgb, var(--sjf-tone) 30%, transparent);
  border-radius: var(--sjf-c-rd);
  background: color-mix(
    in srgb,
    var(--sjf-tone) 9%,
    var(--md-sys-color-surface)
  );
  color: var(--sjf-tone);
}
.sjf-alert-copy {
  flex: 1;
  min-width: 0;
  line-height: 1.65;
}
.sjf-alert-copy strong {
  display: block;
}
.sjf-alert-copy div {
  color: var(--md-sys-color-on-surface);
}
</style>
