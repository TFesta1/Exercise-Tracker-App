<script setup lang="ts">
  // Keyword "setup" is required for the script to be recognized as a composition API
  import { RouterLink, RouterView } from 'vue-router'
  import ExerciseView from './views/ExerciseView.vue';
  import Login from './views/Login.vue';
  import Register from './views/Register.vue';
  import NavBar from './components/NavBar.vue';
  import FriendsTable from './components/FriendsTable.vue';
  import currentWorkout from './components/currentWorkout.vue';
  import 

  

  
</script>

<template>
  <ExerciseView />
  <currentWorkout />
  <FriendsTable />


  <div class="container">
    <!-- <RouterView /> -->
  </div>

  <!-- Displays depending on what the RouterLink is -->
  
</template>

<style scoped>

</style>
