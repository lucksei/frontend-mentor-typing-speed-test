<script setup lang="ts">
import { ref } from 'vue'
import SettingsDropdownButton from './SettingsDropdownButton.vue'
import SettingsDropdownItem from './SettingsDropdownItem.vue'

const emit = defineEmits(['select'])

type SettingsDropdownOption = {
  label?: string
  value?: string
}

const props = defineProps<{
  label?: string
  name?: string
  options: SettingsDropdownOption[]
  selectedOption?: string
}>()

const isOpen = ref(false)

const handleButtonClick = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = () => {
  isOpen.value = false
}

const handleItemClick = (value: string) => {
  emit('select', value)
  isOpen.value = false
}
</script>

<template>
  <div class="dropdown">
    <SettingsDropdownButton
      :label="
        props.options.find((o) => o.value === props.selectedOption)?.label ?? props.label ?? ''
      "
      @click="handleButtonClick"
      @click-outside="handleClickOutside"
      :isOpen="isOpen"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-controls="`settings-dropdown-${props.name}`"
    />
    <ul
      role="listbox"
      :id="`settings-dropdown-${props.name}`"
      class="dropdown-content"
      v-bind:class="isOpen ? 'dropdown-show' : 'dropdown-hide'"
      :aria-hidden="!isOpen"
    >
      <SettingsDropdownItem
        v-for="option in props.options"
        :value="option.value"
        :label="option.label"
        :key="option.value"
        :selected="option.value === props.selectedOption"
        @click="handleItemClick"
      />
      <!-- <slot>
        <SettingsDropdownItem value="" label="- - -" />
      </slot> -->
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
  background-color: var(--colors-neutral-800);
  top: calc(100% - 0.8rem);
  padding-top: 0.8rem;
  border: none;
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
