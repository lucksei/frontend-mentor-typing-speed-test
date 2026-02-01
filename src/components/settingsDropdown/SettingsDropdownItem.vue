<script setup lang="ts">
const props = defineProps<{
  value?: string
  label?: string
}>()

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.value)
}
</script>

<template>
  <li class="dropdown-item">
    <span @click="handleClick">{{ props.label }}</span>
  </li>
</template>

<style scoped>
.dropdown-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  padding: 0.2rem 1.1rem 0.2rem 1.1rem;
  text-wrap-mode: nowrap;

  span {
    padding: 0.4rem 0 0.2rem 0;
    width: 100%;
    user-select: none;
    cursor: pointer;
  }

  span:hover {
    color: var(--colors-neutral-500);
  }

  span:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0.6rem;
    width: calc(100% - 1.2rem);
    height: 1px;
    background-color: var(--colors-neutral-800);
  }
}
</style>
