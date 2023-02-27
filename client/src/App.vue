<script setup lang="ts">
  // Keyword "setup" is required for the script to be recognized as a composition API
  import { RouterLink, RouterView } from 'vue-router'
  import ExerciseView from './views/ExerciseView.vue';
  import NavBar from './components/NavBar.vue';

  
</script>

<template>
  <NavBar />

  <div class="container">
    <RouterView />
  </div>

  <!-- Displays depending on what the RouterLink is -->
  
</template>

<style scoped>

</style>
