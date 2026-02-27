<script setup lang="ts"></script>

<template>
  <div class="shadow-1">
    <div class="shadow-2">
      <img src="/src/assets/images/icon-completed.svg" alt="icon-completed" />
    </div>
  </div>
</template>

<style scoped>
.shadow-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 1rem hsl(140 63% 57% / 0.2);
}
.shadow-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 0.6rem hsla(140 63% 57% / 0.2);
}
img {
  width: 3.2rem;
  height: 3.2rem;
}
</style>
