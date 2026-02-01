<script setup lang="ts">
import { ref } from 'vue'
import SettingsDropdown from './settingsDropdown/SettingsDropdown.vue'
import MetricsContainer from './MetricsContainer.vue'
import VerticalDivider from './VerticalDivider.vue'

const wpm = ref(40)
const accuracy = ref(0.94)
const time = ref(46)

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
    <VerticalDivider />
    <MetricsContainer type="accuracy" :value="accuracy" />
    <VerticalDivider />
    <MetricsContainer type="time" :value="time" />
  </div>
  <div class="settings-container">
    <SettingsDropdown label="Hard" />
    <SettingsDropdown label="Timed (60s)" />
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
  margin-bottom: 1rem; /* TODO delete */
}
.settings-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
</style>
