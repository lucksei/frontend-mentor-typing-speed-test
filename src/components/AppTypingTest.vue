<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
text.value =
  'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. \"We\'ve underestimated ancient peoples\' navigational capabilities and their appetite for luxury goods,\" the lead researcher observed. \"Globalization isn\'t as modern as we assume.\"'
</script>

<template>
  <div class="typing-test-container">
    <div class="typing-test">{{ text }}</div>
  </div>
</template>

<style scoped>
.typing-test-container {
  padding: 1rem 0 1rem 0;
}
.typing-test {
  font-size: var(--font-size-large);
  color: var(--colors-neutral-500);
}
</style>
