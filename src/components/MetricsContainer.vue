<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  type: 'wpm' | 'accuracy' | 'time'
  value: number
}>()

const displayValue = ref('')

switch (props.type) {
  case 'wpm':
    watchEffect(() => (displayValue.value = `${Math.floor(props.value)}`))
    break
  case 'accuracy':
    watchEffect(() => (displayValue.value = `${Math.floor(props.value * 100)}%`))
    break
  case 'time':
    watchEffect(() => (displayValue.value = `${new Date(props.value).toISOString().slice(14, 19)}`))
    break
}
</script>

<template>
  <div class="metric-container">
    <div class="text-secondary">{{ `${type[0]?.toUpperCase()}${type.slice(1)}:` }}</div>
    <div
      class="metric"
      :class="props.type === 'accuracy' ? 'red' : props.type === 'time' ? 'yellow' : null"
    >
      {{ displayValue }}
    </div>
  </div>
</template>

<style scoped>
.metric-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem 0 0.5rem;
}

.metric {
  font-size: var(--font-size-medium);
  font-weight: var(--weight-bold);
}

.red {
  color: var(--colors-red-500);
}

.yellow {
  color: var(--colors-yellow-400);
}
</style>
