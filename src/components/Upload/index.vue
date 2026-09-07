<template>
  <FieldShell v-bind="field" :filled="true"
    ><div class="sjf-control sjf-upload" :style="style">
      <label
        class="sjf-upload-drop"
        :class="{ dragging }"
        @dragover.prevent="dragging = !disabled"
        @dragleave.prevent="dragging = false"
        @drop.prevent="drop"
        ><SJFIcon name="upload_file" size="lg" /><strong
          >选择文件或拖放到这里</strong
        ><span class="sjf-muted"
          >{{ props.accept || '支持任意文件类型' }} · 仅选择，不自动上传</span
        ><input
          v-bind="attrs"
          type="file"
          :name="props.name"
          :accept="props.accept"
          :multiple="props.multiple"
          :disabled="disabled || props.readonly"
          :aria-label="props.label ?? '选择文件'"
          @change="change"
      /></label>
      <ul v-if="model.length">
        <li v-for="(file, index) in model" :key="file.name + '-' + index">
          <SJFIcon name="description" size="sm" /><span
            >{{ file.name }}
            <small class="sjf-muted"
              >{{ Math.ceil(file.size / 1024) }} KB</small
            ></span
          ><button
            type="button"
            :disabled="disabled || props.readonly"
            :aria-label="'移除 ' + file.name"
            @click="remove(index)"
          >
            <SJFIcon name="close" size="sm" />
          </button>
        </li>
      </ul>
      <p v-if="message" role="alert" class="sjf-upload-error">{{ message }}</p>
    </div></FieldShell
  >
</template>
<script setup vapor lang="ts">
import { ref, useAttrs } from 'vue'
import SJFIcon from '../Icon/index.vue'
import FieldShell from '../shared/FieldShell.vue'
import { useSjfControl, useSjfValue } from '../shared/control'
import { selectSjfFiles } from '../shared/models'
import type { SjfUploadProps, SjfUploadRejection } from './index'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SjfUploadProps>(), {
  disabled: undefined,
  required: undefined,
  error: undefined,
})
const emit = defineEmits<{
  'update:modelValue': [value: File[]]
  change: [value: File[]]
  reject: [value: SjfUploadRejection[]]
}>()
const { style, field, disabled } = useSjfControl(props)
const attrs = useAttrs(),
  dragging = ref(false),
  message = ref('')
const model = useSjfValue<File[]>(
  () => props.modelValue,
  (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
  [],
)
function accept(files: File[]) {
  if (disabled.value || props.readonly) return
  const { files: next, rejected } = selectSjfFiles(model.value, files, props)
  if (next !== model.value) model.value = next
  message.value = rejected.map((r) => r.file.name + '：' + r.reason).join('；')
  if (rejected.length) emit('reject', rejected)
}
function change(event: Event) {
  const input = event.target as HTMLInputElement
  accept(Array.from(input.files ?? []))
  input.value = ''
}
function drop(event: DragEvent) {
  dragging.value = false
  accept(Array.from(event.dataTransfer?.files ?? []))
}
function remove(index: number) {
  if (disabled.value || props.readonly) return
  model.value = model.value.filter((_, i) => i !== index)
}
</script>
<style scoped>
.sjf-upload {
  width: 100%;
  display: grid;
  gap: var(--sjf-c-pd);
}
.sjf-upload-drop {
  position: relative;
  display: grid;
  place-items: center;
  gap: var(--sjf-c-gap);
  padding: calc(var(--sjf-c-pd) * 2);
  border: 1px dashed var(--md-sys-color-outline);
  border-radius: var(--sjf-c-rd);
  text-align: center;
}
.sjf-upload-drop.dragging,
.sjf-upload-drop:focus-within {
  background: var(--md-sys-color-primary-container);
  border-color: var(--md-sys-color-primary);
}
.sjf-upload-drop input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.sjf-upload ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.sjf-upload li {
  display: flex;
  align-items: center;
  gap: var(--sjf-c-gap);
  padding: var(--sjf-c-gap);
}
.sjf-upload li > span:not(.sjf-icon) {
  flex: 1;
  overflow-wrap: anywhere;
}
.sjf-upload-error {
  margin: 0;
  color: var(--md-sys-color-error);
}
</style>
