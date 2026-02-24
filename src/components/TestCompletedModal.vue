<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import IconRestart from './images/IconRestart.vue'
import IconCompleted from './images/IconCompleted.vue'

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
      <div class="icon">
        <IconCompleted />
      </div>
      <h2>Baseline Established!</h2>
      <p class="text-secondary">
        You've set the bar. Now the real challenge begins—time to beat it.
      </p>
      <div class="stat-container">
        <span class="stat-name text-secondary">WPM:</span>
        <span class="stat-value">85</span>
      </div>
      <div class="stat-container">
        <span class="stat-name text-secondary">Accuracy:</span>
        <span class="stat-value red">90%</span>
      </div>
      <div class="stat-container">
        <span class="stat-name text-secondary">Characters:</span>
        <span class="stat-value">
          <span class="green">120</span>
          <span class="text-secondary">/</span>
          <span class="red">5</span>
        </span>
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

.fade-in {
  animation: fade-in 1s ease-in-out;
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

.fade-out {
  animation: fade-out 1s ease-in-out;
}

.overlay {
  position: relative;
}

.test-completed-modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  background-color: var(--colors-neutral-900);
  z-index: 300;
  height: 100vh;
  left: -1rem;
  width: calc(100% + 2rem);
  padding: 1rem;

  p,
  h1 {
    text-align: center;
  }

  .icon {
    margin-bottom: 1rem;
  }

  .stat-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: start;
    border: 1px solid var(--colors-neutral-800);
    border-radius: 0.5rem;
    padding: 0.6rem 1rem 0.6rem 1rem;
    gap: 0.5rem;

    .stat-name {
      font-size: var(--font-size-medium);
    }

    .stat-value {
      font-size: var(--font-size-medium);
      font-weight: var(--weight-bold);
    }

    .red {
      color: var(--colors-red-500);
    }

    .green {
      color: var(--colors-green-500);
    }

    .yellow {
      color: var(--colors-yellow-400);
    }
  }

  .restart-button {
    padding: 0.8rem 1.1rem 0.8rem 1.1rem;
    background-color: var(--colors-neutral-0);
    font-weight: var(--weight-bold);
    border: none;

    img {
      filter: invert();
    }
  }

  .restart-button:hover {
    box-shadow: inset 0 0 0 2px var(--colors-neutral-400);
  }
}
</style>
