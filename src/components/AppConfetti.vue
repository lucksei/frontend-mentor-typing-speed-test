<script setup lang="ts">
import PatternConfetti from './images/PatternConfetti.vue'

withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: true,
  },
)
</script>

<template>
  <div class="overlay">
    <Transition name="confetti" appear>
      <div class="pattern-confetti" v-if="show">
        <PatternConfetti />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.confetti-enter-active {
  animation: confetti-in 1s ease-in-out;
}

.confetti-leave-active {
  animation: confetti-out 1s ease-in-out;
}

@keyframes confetti-in {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes confetti-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}

.overlay {
  position: relative;
}

.pattern-confetti {
  position: absolute;
  bottom: 0;
}
</style>
