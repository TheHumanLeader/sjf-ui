<template>
  <ModalShell
    v-bind="props"
    drawer
    :model-value="model"
    @update:model-value="model = $event"
    @cancel="emit('cancel')"
    ><slot /><template v-if="slots.footer" #footer
      ><slot name="footer" /></template
  ></ModalShell>
</template>
<script setup vapor lang="ts">
import ModalShell from '../shared/ModalShell.vue'
import { useSjfValue } from '../shared/control'
import type { SjfDrawerProps } from './index'
const props = withDefaults(defineProps<SjfDrawerProps>(), {
  modelValue: undefined,
  closable: true,
  closeOnBackdrop: true,
})
const slots = defineSlots<{ default?: () => unknown; footer?: () => unknown }>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  cancel: []
}>()
const model = useSjfValue(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  false,
)
</script>
