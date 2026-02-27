<script setup lang="ts">
import SettingsDropdown from '@/components/SettingsDropdown/index.vue'
import MetricsContainer from './MetricsContainer.vue'
import CustomDivider from './CustomDivider.vue'

const props = defineProps<{
  wpm?: number
  accuracy?: number
  time?: number
  difficulty?: string
  timeMode?: string
}>()

const emit = defineEmits(['changeDifficulty', 'changeMode'])
</script>

<template>
  <div class="metrics-container">
    <MetricsContainer type="wpm" :value="props.wpm || 0" />
    <CustomDivider />
    <MetricsContainer type="accuracy" :value="props.accuracy || 0" />
    <CustomDivider />
    <MetricsContainer type="time" :value="props.time || 0" />
  </div>
  <div class="settings-container">
    <SettingsDropdown
      label="Difficulty"
      name="difficulty"
      :options="[
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
      ]"
      @select="emit('changeDifficulty', $event)"
      :selected-option="difficulty"
    />
    <SettingsDropdown
      label="Mode"
      name="mode"
      :options="[
        { label: 'Timed (60s)', value: 'timed' },
        { label: 'Passage', value: 'passage' },
      ]"
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
  padding: 0 1.2rem 0 1.2rem;
  margin-bottom: 0.8rem; /* TODO delete */
  z-index: 200;
}
.settings-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  z-index: 200;
}
</style>
