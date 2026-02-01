<script setup lang="ts">
import { ref } from 'vue'
import SettingsDropdownButton from './SettingsDropdownButton.vue'
import SettingsDropdownItem from './SettingsDropdownItem.vue'

const props = defineProps<{
  label?: string
}>()

const isOpen = ref(false)

const handleButtonClick = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="dropdown">
    <SettingsDropdownButton
      :label="props.label"
      @click="handleButtonClick"
      @click-outside="handleClickOutside"
      :isOpen="isOpen"
    />
    <ul class="dropdown-content" v-bind:class="isOpen ? 'dropdown-show' : 'dropdown-hide'">
      <slot>
        <SettingsDropdownItem value="item-1" label="Item 1" @click="console.log('clicked')" />
        <SettingsDropdownItem value="item-2" label="Item 2" />
        <SettingsDropdownItem value="item-3" label="Item 2" />
      </slot>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  min-width: 10rem;
  width: 100%;
}

.dropdown-content {
  position: absolute;
  width: 100%;
  background-color: var(--colors-neutral-900);
  top: calc(100% - 0.8rem);
  padding-top: 0.8rem;
  border: 1px solid var(--colors-neutral-400);
  border-radius: 0.5rem;
  z-index: 99;
}

.dropdown-hide {
  display: none;
}

.dropdown-show {
  display: block;
}
</style>
