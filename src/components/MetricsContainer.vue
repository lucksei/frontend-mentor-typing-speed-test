<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  type: 'wpm' | 'accuracy' | 'time'
  value: number
}>()

const displayValue = ref('')

switch (props.type) {
  case 'wpm':
    displayValue.value = `${props.value}`
    break
  case 'accuracy':
    displayValue.value = `${props.value * 100}%`
    break
  case 'time':
    displayValue.value = `${new Date(props.value * 1000).toISOString().slice(14, 19)}`
    break
}
</script>

<template>
  <div class="metric-container">
    <div class="text-secondary">{{ `${type[0]?.toUpperCase()}${type.slice(1)}:` }}</div>
    <div class="metric">{{ value }}</div>
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
</style>
