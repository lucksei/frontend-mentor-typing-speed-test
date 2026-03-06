<script setup lang="ts">
import { ref, useTemplateRef, onMounted, onUnmounted } from 'vue'
import IconRestart from './images/IconRestart.vue'
import IconCompleted from './images/IconCompleted.vue'
import PatternStar1 from './images/PatternStar1.vue'
import PatternStar2 from './images/PatternStar2.vue'

const props = withDefaults(
  defineProps<{
    isShown?: boolean
    wpm?: number
    accuracy?: number
    characters?: { correct: number; incorrect: number }
  }>(),
  {
    isShown: false,
    wpm: 0,
    accuracy: 0,
    characters: () => ({ correct: 0, incorrect: 0 }),
  },
)

const emit = defineEmits(['restart'])

const overlayRef = useTemplateRef<HTMLDivElement>('overlay-ref')
const overlayTop = ref(0)

let resizeObserver: ResizeObserver | undefined

const updateOverlayTop = () => {
  if (!overlayRef.value) return
  overlayTop.value = Math.trunc(overlayRef.value.getBoundingClientRect().top)
  console.log(overlayTop.value)
}

onMounted(() => {
  resizeObserver = new ResizeObserver(updateOverlayTop)
  resizeObserver.observe(document.body)
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
  <div class="overlay" ref="overlay-ref">
    <Transition name="modal" mode="out-in" style="z-index: 1000">
      <div
        class="test-completed-modal"
        v-if="props.isShown"
        :style="{ height: `calc(100dvh - ${overlayTop}px)` }"
      >
        <div class="icon">
          <IconCompleted />
        </div>
        <h2>Baseline Established!</h2>
        <p class="text-secondary">
          You've set the bar. Now the real challenge begins—time to beat it.
        </p>
        <div class="stat-container">
          <span class="stat-name text-secondary">WPM:</span>
          <span class="stat-value">{{ `${Math.floor(props.wpm)}` }}</span>
        </div>
        <div class="stat-container">
          <span class="stat-name text-secondary">Accuracy:</span>
          <span class="stat-value red">{{ `${Math.floor(props.accuracy * 100)}%` }}</span>
        </div>
        <div class="stat-container">
          <span class="stat-name text-secondary">Characters:</span>
          <span class="stat-value">
            <span class="green">{{ characters?.correct }}</span>
            <span class="text-secondary">/</span>
            <span class="red">{{ characters?.incorrect }}</span>
          </span>
        </div>
        <button class="restart-button" @click="emit('restart')">
          Beat This Score<IconRestart />
        </button>
        <div class="modal-background">
          <div class="pattern-star-2">
            <PatternStar2 />
          </div>
          <div class="pattern-star-1">
            <PatternStar1 />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 1s ease-in-out;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.modal-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.modal-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(0px);
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
  z-index: 100;
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
    padding: 1rem 1.3rem 1rem 1.3rem;
    background-color: var(--colors-neutral-0);
    font-weight: var(--weight-bold);
    border: none;
    margin-top: 1rem;
    z-index: 200;

    img {
      filter: invert();
    }
  }

  .restart-button:hover {
    box-shadow: inset 0 0 0 2px var(--colors-neutral-400);
  }
}

.test-completed-modal .modal-background {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .pattern-star-1 {
    align-self: flex-end;
    margin: 2rem;
  }

  .pattern-star-2 {
    align-self: flex-start;
    margin: 2rem;
  }
}
</style>
