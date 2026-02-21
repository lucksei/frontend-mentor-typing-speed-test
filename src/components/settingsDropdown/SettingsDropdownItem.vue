<script setup lang="ts">
const props = defineProps<{
  value?: string
  label?: string
  selected?: boolean
}>()

const emit = defineEmits(['click'])

const handleClick = (): void => {
  emit('click', props.value)
}
</script>

<template>
  <li class="dropdown-item" :class="selected ? 'selected' : ''">
    <span @click="handleClick">{{ props.label }}</span>
  </li>
</template>

<style scoped>
.dropdown-item {
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  padding: 0.2rem 1.1rem 0.2rem 1.1rem;
  text-wrap-mode: nowrap;

  span {
    display: flex;
    flex-direction: row;
    align-items: start;
    padding: 0.6rem 0 0.2rem 0;
    width: 100%;
    user-select: none;
    cursor: pointer;
  }

  span:hover {
    color: var(--colors-neutral-500);
  }

  span:before {
    display: inline-block;
    content: '';
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: solid 2px var(--colors-neutral-0);
    margin-right: 0.5rem;
  }

  span:hover:before {
    border-color: var(--colors-neutral-500);
  }
}

.dropdown-item.selected span:before {
  border: none;
  width: calc(1rem + 2px);
  height: calc(1rem + 2px);
  box-shadow: inset 0 0 0 6px var(--colors-blue-400);
}

.dropdown-item + .dropdown-item:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0.6rem;
  width: calc(100% - 1.2rem);
  height: 1px;
  background-color: var(--colors-neutral-500);
}
</style>
