<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import IconDownArrow from '../images/IconDownArrow.vue'

const props = defineProps<{
  label?: string
  isOpen?: boolean
}>()

const emit = defineEmits(['click', 'click-outside'])

const buttonRef = ref<HTMLButtonElement | null>(null)

const handleGlobalClick = (event: Event) => {
  if (buttonRef.value && !buttonRef.value.contains(event.target as Node)) {
    emit('click-outside', event.target)
  }
}

onMounted(() => {
  window.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleGlobalClick)
})
</script>

<template>
  <button
    @click="emit('click')"
    class="dropdown-button"
    :class="isOpen ? 'open' : null"
    ref="buttonRef"
  >
    <span>{{ props.label ?? '' }}</span>
    <IconDownArrow />
  </button>
</template>

<style scoped>
.dropdown-button {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--colors-neutral-900);
  border: 1px solid var(--colors-neutral-400);
  border-radius: 0.5rem;
  color: var(--colors-neutral-0);
  padding: 0.4rem 1.5rem 0.4rem 1.5rem;
  width: 100%;
  z-index: 100;

  .icon-image {
    height: 0.5rem;
  }
}

.dropdown-button:hover {
  border: 1px solid var(--colors-neutral-500);
}

.open {
  filter: brightness(0.7);
}
</style>
