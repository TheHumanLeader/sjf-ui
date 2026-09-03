<template>
  <div class="sjf-label-helper" :class="classes">
    {{ text }}
  </div>
</template>

<script setup vapor lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  error?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  error: false,
  disabled: false,
})

const classes = computed(() => ({
  'is-error': props.error,
  'is-disabled': props.disabled,
}))
</script>

<style scoped>
.sjf-label-helper {
  color: var(--sjf-label-muted-color);
  font-size: var(--sjf-label-helper-font-size);
  line-height: 1.35;
}

.sjf-label-helper.is-error {
  color: var(--sjf-label-error-color);
}

.sjf-label-helper.is-disabled {
  opacity: 0.64;
}
</style>
