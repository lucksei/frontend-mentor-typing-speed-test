<script setup lang="ts">
import { onMounted, useTemplateRef, inject, reactive, computed } from 'vue'
import CustomDivider from '@/components/CustomDivider.vue'
import AppTypingTestFooter from './AppTypingTestFooter.vue'
import AppTypingTestStartModal from './AppTypingTestStartModal.vue'
import { typingTestKey } from '@/utils/injectionKeys'
import { ignoredCharacters } from '@/utils/ignoredCharacters'

withDefaults(
  defineProps<{
    modalOpen: boolean
  }>(),
  {
    modalOpen: true,
  },
)

const emit = defineEmits(['change', 'restart', 'start'])

// Text element ref for scroll
const textElementRef = useTemplateRef('text-ref')

const typingTestProvider = inject(typingTestKey)
if (!typingTestProvider) throw new Error('TypingTest not provided')

// Inject typing test & refs
const typingTest = reactive(typingTestProvider.value)
const textArray = computed(() => typingTest.getText())
const cursor = computed(() => typingTest.getCursor())

const handleKeyPress = (event: KeyboardEvent) => {
  event.preventDefault()
  if (ignoredCharacters.includes(event.key)) return
  if (event.key === 'Backspace') {
    typingTest.sendBackspace()
    emit('change')
    updateScroll()
    return
  }
  if (event.key === ' ') {
    typingTest.sendSpace()
    emit('change')
    updateScroll()
    return
  }
  typingTest.sendKeyStroke(event.key)
  emit('change')
  updateScroll()
}

const handleRestart = (event?: Event) => {
  event?.preventDefault()
  emit('restart')
  updateScroll()
}

const handleStart = () => {
  emit('start')
  textElementRef.value?.focus()
}

const updateScroll = () => {
  if (!textElementRef.value) return
  const currentWord = textElementRef.value.querySelector(`[data-id="${cursor.value.word_idx}"]`)
  if (!currentWord) return

  currentWord.scrollIntoView({
    block: 'center',
    inline: 'end',
    behavior: 'smooth',
  })
}

onMounted(() => {
  if (!textElementRef.value) return
  textElementRef.value.addEventListener('keydown', handleKeyPress)
  updateScroll()
})
</script>

<template>
  <CustomDivider />
  <div class="typing-test-container">
    <AppTypingTestStartModal :show="modalOpen" @start="handleStart" />
    <div class="text-wrapper" tabindex="-1" @click="textElementRef?.focus()">
      <p class="text" tabindex="-1" ref="text-ref">
        <span
          class="word"
          :class="word.status"
          v-for="word in textArray"
          :key="word.id"
          :data-id="word.id"
        >
          <span
            class="char"
            :class="char.status"
            v-for="char in word.word"
            :key="char.id"
            :data-id="char.id"
          >
            {{ char.char }}
          </span>
          <span>&nbsp;</span>
        </span>
      </p>
    </div>
  </div>
  <CustomDivider />
  <AppTypingTestFooter @restart="handleRestart" />
</template>

<style scoped>
.typing-test-container {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 1rem 0 1rem 0;
}

/* Text */

.text-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 99;
  height: 100%;
  width: 100%;
  overflow: scroll;
}

.text-wrapper:focus {
  outline: none;
}

.text {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 1;
  font-size: var(--font-size-large);
  min-height: 0;
}

.text:focus {
  outline: none;
}

.char.empty {
  color: var(--colors-neutral-500);
}

.char.correct {
  color: var(--colors-green-500);
}

.char.incorrect {
  color: var(--colors-red-500);
  text-decoration: underline;
  text-underline-offset: 0.4rem;
  text-decoration-thickness: 0.2rem;
}

.text .char.selected {
  color: var(--colors-neutral-500);
}

.text:focus .char.selected {
  background-color: var(--colors-neutral-800);
}
</style>
