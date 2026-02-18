<script setup lang="ts">
import { ref } from 'vue'
import SettingsDropdown from './settingsDropdown/SettingsDropdown.vue'
import MetricsContainer from './MetricsContainer.vue'
import CustomDivider from './CustomDivider.vue'

const wpm = ref(40)
const accuracy = ref(0.94)
const time = ref(46)
const difficulty = ref<string | undefined>('hard')
const timeMode = ref<string | undefined>('timed')

const handleDifficultySelect = (value: string) => {
  difficulty.value = value
}

const handleModeSelect = (value: string) => {
  timeMode.value = value
}

// TODO: add type or interface for "Difficulty"
//       Easy | Medium | Hard
// const difficulty = ref('Hard')

// TODO: add type or interface for "Mode"
//       Timed (60s) | Passage
// const timeMode = ref('Timed (60s)')
</script>

<template>
  <div class="metrics-container">
    <MetricsContainer type="wpm" :value="wpm" />
    <CustomDivider />
    <MetricsContainer type="accuracy" :value="accuracy" />
    <CustomDivider />
    <MetricsContainer type="time" :value="time" />
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
      @select="handleDifficultySelect"
      :selected-option="difficulty"
    />
    <SettingsDropdown
      label="Mode"
      name="mode"
      :options="[
        { label: 'Timed (60s)', value: 'timed' },
        { label: 'Passage', value: 'passage' },
      ]"
      @select="handleModeSelect"
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
}
.settings-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}
</style>
