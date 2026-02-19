<script setup lang="ts">
import { provide, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSettings from './components/AppSettings.vue'
import AppAttribution from './components/AppAttribution.vue'
import CustomDivider from './components/CustomDivider.vue'
import AppTypingTest from './components/AppTypingTest.vue'
// import TestNotStartedModal from './components/TestNotStartedModal.vue'
// import TestComplete from './components/TestComplete.vue'

import TypingTest from './utils/typingTest'
import { typingTestKey } from './utils/injectionKeys'

const typingTest = ref(
  new TypingTest(
    'Coffee culture has evolved dramatically in recent decades. What was once a simple morning ritual has become an art form, with baristas crafting intricate latte designs and roasters sourcing beans from remote mountain villages. The humble cup of coffee now tells a global story.',
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
  console.log(`change, wpm=${wpm.value}, accuracy=${accuracy.value}`)
}
</script>

<template>
  <div class="app">
    <AppHeader />
    <AppSettings
      :wpm="wpm"
      :accuracy="accuracy"
      :time="time"
      :difficulty="difficulty"
      @change-difficulty="difficulty = $event"
      :time-mode="mode"
      @change-mode="mode = $event"
    />
    <CustomDivider />
    <!-- <TestNotStartedModal /> -->
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
