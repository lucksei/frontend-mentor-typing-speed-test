<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import IconRestart from './images/IconRestart.vue'

const props = defineProps<{
  isHidden?: boolean
  wpm?: number
  accuracy?: number
  characters?: { correct: number; incorrect: number }
}>()

const fadeState = ref<'fade-in' | 'fade-out' | null>(null)
const isHiddenClass = ref(true)

watchEffect(() => {
  if (props.isHidden) {
    fadeState.value = 'fade-out'
    setTimeout(() => {
      isHiddenClass.value = true
    }, 1000)
  }
  if (!props.isHidden) {
    fadeState.value = 'fade-in'
    isHiddenClass.value = false
  }
})
</script>

<template>
  <div class="overlay">
    <div class="test-completed-modal" :class="`${fadeState} ${isHiddenClass ? 'hidden' : ''}`">
      <h2>Baseline Established!</h2>
      <p class="text-secondary">
        You've set the bar. Now the real challenge begins-time to beat it.
      </p>
      <div class="stat-container">
        <span>WPM:</span>
        <span>85</span>
      </div>
      <div class="stat-container">
        <span>Accuracy:</span>
        <span>90%</span>
      </div>
      <div class="stat-container">
        <span>Characters:</span>
        <span>120/5</span>
      </div>
      <button class="restart-button">Beat This Score<IconRestart /></button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(50px);
  }
}

.overlay {
  position: relative;
}
.test-completed-modal {
  position: absolute;
  background-color: var(--colors-neutral-900);
  z-index: 300;
  height: 100vh;
  left: -1rem;
  width: calc(100% + 2rem);
  padding: 1rem;
}

.fade-in {
  animation: fade-in 1s ease-in-out;
}

.fade-out {
  animation: fade-out 1s ease-in-out;
}
</style>
