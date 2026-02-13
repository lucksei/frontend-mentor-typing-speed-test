<script setup lang="ts">
import { onMounted, shallowRef, useTemplateRef } from 'vue'
import TypingTest from '@/utils/typingTest'

const textRef = useTemplateRef('text-ref')

const typingTest = new TypingTest(
  'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. \"We\'ve underestimated ancient peoples\' navigational capabilities and their appetite for luxury goods,\" the lead researcher observed. \"Globalization isn\'t as modern as we assume.\"',
)

const textArray = shallowRef(typingTest.getText())
const cursor = shallowRef(typingTest.getCursor())

const ignoredCharacters = [
  'Control',
  'Shift',
  'Meta',
  'Escape',
  'Tab',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
]

const handleKeyPress = (event: KeyboardEvent) => {
  event.preventDefault()
  if (ignoredCharacters.includes(event.key)) return
  if (event.key === 'Backspace') {
    typingTest.sendBackspace()
    textArray.value = [...typingTest.getText()]
    updateScroll()
    return
  }
  if (event.key === ' ') {
    typingTest.sendSpace()
    textArray.value = [...typingTest.getText()]
    updateScroll()
    return
  }
  typingTest.sendKeyStroke(event.key)
  textArray.value = [...typingTest.getText()]
  updateScroll()
}

const updateScroll = () => {
  cursor.value = typingTest.getCursor()
  if (!textRef.value) return
  const currentWord = textRef.value.querySelector(`[data-id="${cursor.value.word_idx}"]`)
  if (!currentWord) return
  currentWord.scrollIntoView({ block: 'start', inline: 'start', behavior: 'smooth' })
}

onMounted(() => {
  if (!textRef.value) return
  textRef.value.addEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="typing-test-container">
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
</template>

<style scoped>
.typing-test-container {
  min-height: 0;
  flex: 1;
  overflow: scroll;
  padding: 1rem 0 1rem 0;
}
.text {
  font-size: var(--font-size-large);
  flex-shrink: 1;
  min-height: 0;
}

.word::after {
  content: ' ';
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

.char.selected {
  background-color: var(--colors-neutral-800);
  color: var(--colors-neutral-500);
}
</style>
