<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppSettings from './components/AppSettings.vue'
import AppAttribution from './components/AppAttribution.vue'

// import AppTypingTest from './components/AppTypingTest.vue'
// import TestNotStartedModal from './components/TestNotStartedModal.vue'
// import TestComplete from './components/TestComplete.vue'
</script>

<template>
  <AppHeader />
  <div class="app">
    <AppSettings />
    <!-- <TestNotStartedModal /> -->
    <!-- <AppTypingTest />
    <TestComplete /> -->
    <AppAttribution />
  </div>
</template>

<style scoped>
.app {
  padding: 0 1rem 0 1rem;
}
</style>
