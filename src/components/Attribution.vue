<script setup>
import { ref } from 'vue'
const attribution = ref({
  name: 'Lucksei',
  gitUrl: 'https://github.com/lucksei/frontend-mentor-typing-speed-test',
})
</script>

<template>
  <div class="attribution">
    <span>
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. Coded
      by <a :href="attribution.gitUrl">{{ attribution.name }}</a> .
    </span>
  </div>
</template>

<style scoped>
.attribution {
  font-size: 11px;
  text-align: center;
}
.attribution a {
  color: hsl(228, 45%, 44%);
}
</style>
