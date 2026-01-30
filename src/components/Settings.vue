<script setup>
import { ref } from 'vue'

const wpm = ref(40)
const accuracy = ref(0.94)
const time = ref('0:46')

// TODO: add type or interface for "Difficulty"
//       Easy | Medium | Hard
const difficulty = ref('hard')

// TODO: add type or interface for "Mode"
//       Timed (60s) | Passage
const timeMode = ref('Timed (60s)')
</script>

<template>
  <div>WPM: {{ wpm }}</div>
  <div>Accuracy: {{ `${accuracy * 100}%` }}</div>
  <div>Time: {{ time }}</div>
  <button>{{ difficulty }}</button>
  <button>{{ timeMode }}</button>
</template>
