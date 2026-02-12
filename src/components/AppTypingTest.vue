<script setup lang="ts">
import { onMounted, shallowRef, useTemplateRef } from 'vue'
import TypingTest from '@/utils/typingTest'

const textRef = useTemplateRef('text-ref')

const testText =
  'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. \"We\'ve underestimated ancient peoples\' navigational capabilities and their appetite for luxury goods,\" the lead researcher observed. \"Globalization isn\'t as modern as we assume.\"'

const typingTest = new TypingTest(testText)
const textArray = shallowRef(typingTest.getText())

const handleKeyPress = (event: KeyboardEvent) => {
  event.preventDefault()
  if (['Control', 'Shift', 'Meta', 'Escape', 'Tab'].includes(event.key)) return
  if (event.key === 'Backspace') {
    typingTest.sendBackspace()
    textArray.value = [...typingTest.getText()]
    return
  }
  if (event.key === ' ') {
    typingTest.sendSpace()
    textArray.value = [...typingTest.getText()]
    return
  }
  typingTest.sendKeyStroke(event.key)
  textArray.value = [...typingTest.getText()]
}
onMounted(() => {
  if (textRef.value) {
    textRef.value.addEventListener('keydown', handleKeyPress)
  }
})
</script>

<template>
  <div class="typing-test-container">
    <p class="text" tabindex="-1" ref="text-ref">
      <span class="word" :class="word.status" v-for="word in textArray" :key="word.id">
        <span class="char" :class="char.status" v-for="char in word.word" :key="char.id">
          {{ char.char }}
        </span>
      </span>
    </p>
  </div>
</template>

<style scoped>
.typing-test-container {
  display: flex;
  flex-direction: column;
  padding: 1rem 0 1rem 0;
}
.text {
  font-size: var(--font-size-large);
  /* color: var(--colors-neutral-500); */
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
