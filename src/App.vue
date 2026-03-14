<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSettings from './components/AppSettings.vue'
import AppAttribution from './components/AppAttribution.vue'
import AppTypingTest from '@/components/AppTypingTest/index.vue'
import TestCompletedModal from './components/TestCompletedModal.vue'

import TypingTest from './utils/typingTest'
import { typingTestKey } from './utils/injectionKeys'
import { getRandomText } from './utils/textData'

// Settings & Stats
const wpm = ref(0)
const accuracy = ref(0)
const time = ref(0)
const difficulty = ref<'easy' | 'medium' | 'hard' | undefined>('easy')
const mode = ref<'timed' | 'passage' | undefined>('timed')

// Modals
const completeModalShow = ref(false)
const startModalShow = ref(true)

// Typing Test
const testText = ref({ id: 'sample', text: 'Sample' }) // TODO: fix error when text is empty in typingTest.ts
const typingTest = ref(new TypingTest(testText.value.text))

const initializeTest = () => {
  if (!difficulty.value) return
  testText.value = getRandomText(difficulty.value)
  typingTest.value.resetTest(testText.value.text)
}

onMounted(() => {
  initializeTest()
})

provide(typingTestKey, typingTest)

const handleRestart = () => {
  initializeTest()
  startModalShow.value = true
  completeModalShow.value = false
}

const handleStart = () => {
  startModalShow.value = false
}

const handleTypingTestChange = () => {
  wpm.value = typingTest.value.getWpm()
  accuracy.value = typingTest.value.getAccuracy()
  if (typingTest.value.getIsTestFinished()) {
    completeModalShow.value = true
  }
}

const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
  if (difficulty.value === newDifficulty) return
  difficulty.value = newDifficulty
  handleRestart()
}

const handleModeChange = (newMode: 'timed' | 'passage') => {
  if (mode.value === newMode) return
  mode.value = newMode
  handleRestart()
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  timer = setInterval(() => {
    const elapsedTime = typingTest.value.getElapsedTime()
    if (elapsedTime === null) {
      time.value = 0
      return
    }
    time.value = elapsedTime
  }, 100)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="app">
    <AppHeader />
    <TestCompletedModal
      :show="completeModalShow"
      @restart="handleRestart"
      :wpm="wpm"
      :accuracy="accuracy"
      :characters="{
        correct: typingTest.getCorrectCharacters(),
        incorrect: typingTest.getIncorrectCharacters(),
      }"
      result-type="first"
    />
    <AppSettings
      :wpm="wpm"
      :accuracy="accuracy"
      :time="time"
      :difficulty="difficulty"
      @change-difficulty="handleDifficultyChange"
      :time-mode="mode"
      @change-mode="handleModeChange"
    />
    <AppTypingTest
      :modal-open="startModalShow"
      @change="handleTypingTestChange"
      @restart="handleRestart"
      @start="handleStart"
    />
    <AppAttribution />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1rem 0 1rem;
  height: 100dvh;
}
</style>
