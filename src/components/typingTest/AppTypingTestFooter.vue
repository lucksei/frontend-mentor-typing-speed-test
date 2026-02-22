<script setup lang="ts">
import IconRestart from '@/components/images/IconRestart.vue'

const emit = defineEmits(['restart'])
</script>

<template>
  <div class="typing-test-footer">
    <button class="restart-btn" @click="emit('restart', $event)">
      Restart Test
      <IconRestart />
    </button>
  </div>
</template>

<style scoped>
.typing-test-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: 1rem 0 0 0;

  .restart-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: var(--font-size);
    font-weight: var(--weight-semi-bold);
    color: var(--colors-neutral-0);
    background-color: var(--colors-neutral-800);
    padding: 1rem 1.4rem 1rem 1.4rem;
    margin: 1.8rem 0 1.8rem 0;
    border: none;
    cursor: pointer;
  }
}
</style>
