<script setup lang="ts">
import { ref } from 'vue'
import SettingsDropdown from './dropdown/SettingsDropdown.vue'

const wpm = ref(40)
const accuracy = ref(0.94)
const time = ref('0:46')

// TODO: add type or interface for "Difficulty"
//       Easy | Medium | Hard
// const difficulty = ref('Hard')

// TODO: add type or interface for "Mode"
//       Timed (60s) | Passage
// const timeMode = ref('Timed (60s)')
</script>

<template>
  <div>
    <div>WPM: {{ wpm }}</div>
    <div>Accuracy: {{ `${accuracy * 100}%` }}</div>
    <div>Time: {{ time }}</div>
  </div>
  <div class="settings-container">
    <SettingsDropdown label="Hard" />
    <SettingsDropdown label="Timed (60s)" />
  </div>
</template>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: left;
  align-items: center;
}
</style>
