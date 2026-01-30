<script setup lang="ts">
import { ref } from 'vue'

import Settings from './components/Settings.vue'
import TypingTest from './components/TypingTest.vue'
import TestNotStartedModal from './components/TestNotStartedModal.vue'
import TestComplete from './components/TestComplete.vue'

import LogoSmall from './components/images/LogoSmall.vue'
import IconPersonalBest from './components/images/IconPersonalBest.vue'

const personalBest = ref(92)
</script>

<template>
  <header>
    <LogoSmall />
    <div>
      <IconPersonalBest />
      Best: {{ `${personalBest} WPM` }}
    </div>
  </header>
  <Settings />
  <TestNotStartedModal />
  <TypingTest />
  <TestComplete />
</template>
