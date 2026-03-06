<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'wpm' | 'accuracy' | 'time'
  value: number
}>()

const displayValue = computed(() => {
  switch (props.type) {
    case 'wpm':
      return `${Math.floor(props.value)}`
    case 'accuracy':
      return `${Math.floor(props.value * 100)}`
    case 'time':
      return `${new Date(props.value).toISOString().slice(14, 19)}`
    default:
      return ''
  }
})
</script>

<template>
  <div class="metric-container">
    <div class="text-secondary">{{ `${props.type[0]?.toUpperCase()}${type.slice(1)}:` }}</div>
    <div
      class="metric"
      :class="{
        red: props.type === 'accuracy',
        yellow: props.type === 'time',
      }"
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
  padding: 0 0.5rem;
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
