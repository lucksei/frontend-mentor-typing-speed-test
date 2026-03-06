<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref, useTemplateRef } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSettings from './components/AppSettings.vue'
import AppAttribution from './components/AppAttribution.vue'
import AppTypingTest from '@/components/AppTypingTest/index.vue'
import TestCompletedModal from './components/TestCompletedModal.vue'

import TypingTest from './utils/typingTest'
import { typingTestKey } from './utils/injectionKeys'

// const testText =
//   'Coffee culture has evolved dramatically in recent decades. What was once a simple morning ritual has become an art form, with baristas crafting intricate latte designs and roasters sourcing beans from remote mountain villages. The humble cup of coffee now tells a global story.'
const testText = 'a'

const typingTest = computed(() => new TypingTest(testText))
provide(typingTestKey, typingTest)

const wpm = ref(0)
const accuracy = ref(0)
const time = ref(0)
const difficulty = ref<'easy' | 'medium' | 'hard' | undefined>(undefined)
const mode = ref<'timed' | 'passage' | undefined>(undefined)

const appTypingTestRef = useTemplateRef<InstanceType<typeof AppTypingTest>>('app-typing-test-ref')
const completeModalShown = ref(false)

const handleRestart = () => {
  typingTest.value.resetTest()
  appTypingTestRef.value?.handleRestart()
  completeModalShown.value = false
}

const handleTypingTestChange = () => {
  wpm.value = typingTest.value.getWpm()
  accuracy.value = typingTest.value.getAccuracy()
  if (typingTest.value.getIsTestFinished()) {
    completeModalShown.value = true
  }
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
      :is-shown="completeModalShown"
      @restart="handleRestart"
      :wpm="wpm"
      :accuracy="accuracy"
      :characters="{
        correct: typingTest.getCorrectCharacters(),
        incorrect: typingTest.getIncorrectCharacters(),
      }"
      :result-type="`first`"
    />
    <AppSettings
      :wpm="wpm"
      :accuracy="accuracy"
      :time="time"
      :difficulty="difficulty"
      @change-difficulty="difficulty = $event"
      :time-mode="mode"
      @change-mode="mode = $event"
    />
    <AppTypingTest @change="handleTypingTestChange" ref="app-typing-test-ref" />
    <!-- <TestComplete /> -->
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
