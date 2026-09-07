<template>
  <div
    class="sjf-control sjf-space"
    :style="[
      style,
      {
        flexDirection: props.vertical ? 'column' : 'row',
        flexWrap: props.wrap === false ? 'nowrap' : 'wrap',
        alignItems: props.align ?? 'center',
      },
    ]"
  >
    <slot />
  </div>
</template>
<script setup vapor lang="ts">
import { useSjfControl } from '../shared/control'
import type { SjfSpaceProps } from './index'
const props = withDefaults(defineProps<SjfSpaceProps>(), { wrap: true })
const { style } = useSjfControl(props)
</script>
<style scoped>
.sjf-space {
  display: flex;
  gap: var(--sjf-c-pd);
  min-width: 0;
}
</style>
