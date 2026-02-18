<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppSettings from './components/AppSettings.vue'
import AppAttribution from './components/AppAttribution.vue'
import CustomDivider from './components/CustomDivider.vue'
import AppTypingTest from './components/AppTypingTest.vue'
// import TestNotStartedModal from './components/TestNotStartedModal.vue'
// import TestComplete from './components/TestComplete.vue'
</script>

<template>
  <div class="app">
    <AppHeader />
    <AppSettings />
    <CustomDivider />
    <!-- <TestNotStartedModal /> -->
    <AppTypingTest />
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
