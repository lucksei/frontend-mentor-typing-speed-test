<script setup lang="ts">
import { ref } from 'vue'

import IconRestart from '/src/components/images/IconRestart.vue'

const wpm = ref(85)
const accuracy = ref(0.9)
const characters = ref({
  correct: 120,
  incorrect: 5,
})
</script>

<template>
  <h3>Test Complete!</h3>
  <p>Solid run. Keep pushing to beat your high score. WPM:</p>
  <div>WPM: {{ wpm }}</div>
  <div>Accuracy: {{ `${accuracy * 100}%` }}</div>
  <div>Characters: {{ characters.correct }}/{{ characters.incorrect }}</div>
  <button>
    Go Again
    <IconRestart />
  </button>
</template>
