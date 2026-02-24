<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSettings from './components/AppSettings.vue'
import AppAttribution from './components/AppAttribution.vue'
import AppTypingTest from './components/typingTest/AppTypingTest.vue'
// import TestComplete from './components/TestComplete.vue'

import TypingTest from './utils/typingTest'
import { typingTestKey } from './utils/injectionKeys'
import TestCompletedModal from './components/TestCompletedModal.vue'

const typingTest = ref(
  new TypingTest(
    // 'Coffee culture has evolved dramatically in recent decades. What was once a simple morning ritual has become an art form, with baristas crafting intricate latte designs and roasters sourcing beans from remote mountain villages. The humble cup of coffee now tells a global story.',
    'Coffee culture has evolved dramatically...',
  ),
)
provide(typingTestKey, typingTest)

const wpm = ref(0)
const accuracy = ref(0)
const time = ref(0)
const difficulty = ref<string | undefined>(undefined)
const mode = ref<string | undefined>(undefined)

const handleTypingTestChange = () => {
  wpm.value = typingTest.value.getWpm()
  accuracy.value = typingTest.value.getAccuracy()
  console.log(typingTest.value.getIsTestFinished())
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
    <TestCompletedModal :is-hidden="false" />
    <AppSettings
      :wpm="wpm"
      :accuracy="accuracy"
      :time="time"
      :difficulty="difficulty"
      @change-difficulty="difficulty = $event"
      :time-mode="mode"
      @change-mode="mode = $event"
    />
    <AppTypingTest @change="handleTypingTestChange" />
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
  height: 100vh;
}
</style>
