<script setup lang="ts">
import { onMounted, useTemplateRef, shallowRef, inject } from 'vue'
import CustomDivider from '@/components/CustomDivider.vue'
import { typingTestKey } from '@/utils/injectionKeys'
import { ignoredCharacters } from '@/utils/ignoredCharacters'
import AppTypingTestFooter from './AppTypingTestFooter.vue'

const emit = defineEmits(['change'])

const typingTest = inject(typingTestKey)?.value
if (!typingTest) throw new Error('TypingTest not provided')

const textArray = shallowRef(typingTest.getText())
const cursor = shallowRef(typingTest.getCursor())

const textElementRef = useTemplateRef('text-ref')

const handleKeyPress = (event: KeyboardEvent) => {
  event.preventDefault()
  if (ignoredCharacters.includes(event.key)) return
  if (event.key === 'Backspace') {
    typingTest.sendBackspace()
    textArray.value = [...typingTest.getText()]
    emit('change')
    updateScroll()
    return
  }
  if (event.key === ' ') {
    typingTest.sendSpace()
    textArray.value = [...typingTest.getText()]
    emit('change')
    updateScroll()
    return
  }
  typingTest.sendKeyStroke(event.key)
  textArray.value = [...typingTest.getText()]
  emit('change')
  updateScroll()
}

const handleRestart = (event: Event) => {
  event.preventDefault()
  typingTest.resetTest()
  textElementRef.value?.focus()
  textArray.value = [...typingTest.getText()]
  emit('change')
  updateScroll()
}

const updateScroll = () => {
  cursor.value = typingTest.getCursor()
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
  <div class="text-wrapper">
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
      </span>
    </p>
  </div>
  <CustomDivider />
  <AppTypingTestFooter @restart="handleRestart" />
</template>

<style scoped>
.text-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  overflow: hidden;
  margin: 1rem 0 1rem 0;
}

.text {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 1;
  font-size: var(--font-size-large);
  min-height: 0;
}

.word::after {
  content: ' ';
  margin-left: 0.5rem;
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
