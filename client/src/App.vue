<script setup lang="ts">
  // Keyword "setup" is required for the script to be recognized as a composition API
  import { RouterLink, RouterView } from 'vue-router'
  import ExerciseView from './views/ExerciseView.vue';

  
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>


  <!-- Displays depending on what the RouterLink is -->
  <RouterView />
</template>

<style scoped>

</style>
