<template>
  <ModalShell
    v-bind="props"
    :model-value="model"
    @update:model-value="model = $event"
    @cancel="emit('cancel')"
    ><slot /><template #footer
      ><slot name="footer"
        ><SJFButton
          variant="text"
          :size="props.size"
          :disabled="props.loading"
          @click="
            () => {
              model = false
              emit('cancel')
            }
          "
          >{{ props.cancelText ?? '取消' }}</SJFButton
        ><SJFButton
          :size="props.size"
          :loading="props.loading"
          @click="confirm"
          >{{ props.confirmText ?? '确认' }}</SJFButton
        ></slot
      ></template
    ></ModalShell
  >
</template>
<script setup vapor lang="ts">
import ModalShell from '../shared/ModalShell.vue'
import SJFButton from '../Button/index.vue'
import { useSjfValue } from '../shared/control'
import type { SjfDialogProps } from './index'
const props = withDefaults(defineProps<SjfDialogProps>(), {
  modelValue: undefined,
  closable: true,
  closeOnBackdrop: true,
  closeOnConfirm: true,
})
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()
const model = useSjfValue(
  () => props.modelValue,
  (v) => emit('update:modelValue', v),
  false,
)
function confirm() {
  if (props.loading) return
  emit('confirm')
  if (props.closeOnConfirm !== false) model.value = false
}
</script>
