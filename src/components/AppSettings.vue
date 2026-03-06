<script setup lang="ts">
import SettingsDropdown from '@/components/SettingsDropdown/index.vue'
import MetricsContainer from './MetricsContainer.vue'
import CustomDivider from './CustomDivider.vue'

const props = withDefaults(
  defineProps<{
    wpm: number
    accuracy: number
    time: number
    difficulty?: 'easy' | 'medium' | 'hard'
    timeMode?: 'timed' | 'passage'
  }>(),
  {
    wpm: 0,
    accuracy: 0,
    time: 0,
    difficulty: 'easy',
    timeMode: 'timed',
  },
)

const emit = defineEmits(['changeDifficulty', 'changeMode'])

const difficultyOptions = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
]

const modeOptions = [
  { label: 'Timed (60s)', value: 'timed' },
  { label: 'Passage', value: 'passage' },
]
</script>

<template>
  <div class="metrics-container">
    <MetricsContainer type="wpm" :value="props.wpm" />
    <CustomDivider />
    <MetricsContainer type="accuracy" :value="props.accuracy" />
    <CustomDivider />
    <MetricsContainer type="time" :value="props.time" />
  </div>
  <div class="settings-container">
    <SettingsDropdown
      label="Difficulty"
      name="difficulty"
      :options="difficultyOptions"
      @select="emit('changeDifficulty', $event)"
      :selected-option="difficulty"
    />
    <SettingsDropdown
      label="Mode"
      name="mode"
      :options="modeOptions"
      @select="emit('changeMode', $event)"
      :selected-option="timeMode"
    />
  </div>
</template>

<style scoped>
.metrics-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
  padding: 0 1.2rem;
  margin-bottom: 0.8rem;
}
.settings-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  z-index: 200; /* Needed for dropdown to appear above other elements */
}
</style>
