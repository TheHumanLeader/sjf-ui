<template>
  <span
    class="sjf-control sjf-avatar"
    :class="{ square: props.square }"
    :style="style"
    role="img"
    :aria-label="props.alt ?? props.name ?? '头像'"
    ><img
      v-if="props.src && !failed"
      :src="props.src"
      alt=""
      @error="failed = true"
    /><span v-else aria-hidden="true">{{ initials }}</span></span
  >
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import { computed, ref, watch } from 'vue'
import type { SjfAvatarProps } from './index'
const props = defineProps<SjfAvatarProps>()
const { style } = useSjfControl(props)
const failed = ref(false)
watch(
  () => props.src,
  () => {
    failed.value = false
  },
)
const initials = computed(() =>
  (props.name ?? 'S')
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)
</script>
<style scoped>
.sjf-avatar {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: var(--sjf-c-h);
  height: var(--sjf-c-h);
  border-radius: 50%;
  overflow: hidden;
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-weight: 700;
}
.sjf-avatar.square {
  border-radius: var(--sjf-c-rd);
}
.sjf-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
