<script setup>
import { ref } from 'vue'

import LogoSmall from '/src/components/images/LogoSmall.vue'
import IconPersonalBest from '/src/components/images/IconPersonalBest.vue'

const personalBest = ref(92)
</script>

<template>
  <header class="header">
    <div class="logo">
      <LogoSmall />
    </div>
    <div class="personal-best">
      <IconPersonalBest />
      <span class="text-secondary">Best: </span>
      <span class="text-primary">
        {{ `${personalBest} WPM` }}
      </span>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 1rem 1rem;
}
.logo {
  height: min-content;
}
.personal-best {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-wrap-mode: nowrap;
  height: max-content;
  gap: 0.2rem;
  img {
    margin-right: 0.2rem;
  }
}
</style>
