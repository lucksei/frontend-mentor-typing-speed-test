<script setup lang="ts">
withDefaults(
  defineProps<{
    show: boolean
  }>(),
  {
    show: true,
  },
)

const emit = defineEmits(['start'])

const handleModalClick = () => {
  emit('start')
}
</script>

<template>
  <div class="overlay">
    <Transition name="modal">
      <div class="start-modal" v-if="show" @click="handleModalClick">
        <button class="start-modal-button" @click="handleModalClick">Start Typing Test</button>
        <p class="start-modal-text">Or click the text and start typing</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.1s ease-in-out;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-to {
  opacity: 1;
}

.modal-leave-from {
  opacity: 1;
}

.modal-leave-to {
  opacity: 0;
}

.start-modal {
  position: absolute;
  /* visibility: hidden; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(0.2rem);
  left: -10px;
  top: 0;
  width: calc(100% + 20px);
  height: 100%;
  z-index: 100;

  .start-modal-button {
    border: none;
    padding: 0.6rem 1rem 0.6rem 1rem;
    background-color: var(--colors-blue-600);
    color: var(--colors-neutral-0);
    width: fit-content;
  }

  .start-modal-button:hover {
    background-color: var(--colors-blue-400);
  }
}
</style>
