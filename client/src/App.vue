<script setup lang="ts">
  // Keyword "setup" is required for the script to be recognized as a composition API
  import { RouterLink, RouterView, useRoute } from 'vue-router'
  import ExerciseView from './views/ExerciseView.vue';
  import Login from './views/Login.vue';
  import Register from './views/Register.vue';
  import NavBar from './components/NavBar.vue';
  import FriendsTable from './components/FriendsTable.vue';
  import CurrentWorkout from './components/CurrentWorkout.vue';
  import PfpSearch from './components/PfpSearch.vue';
  import { computed } from 'vue'
  import { defineComponent, onMounted, inject } from 'vue'


  const userStore = inject('userStore') as any;



  
  
  
  // onMounted(userStore.getUser)

  const dynamicLabel = computed(() => {
      const route = useRoute()
      if (route.path === '/') {
          return 'Login'
      } else if (route.path === '/statistics') {
          return 'Register'
      }
    })
  

  
</script>

<template>
  <!-- These two things should always be here -->
  <!-- <ExerciseView /> -->
  <!-- Don't display a navbar if we're not at the main dashboard page -->
  <!-- v-if="userStore.getters.isLoggedIn" -->
  <NavBar v-if="userStore.getters.isLoggedIn"/>
  <PfpSearch v-if="userStore.getters.isLoggedIn"/>
  <!-- <Login v-if="!userStore.getters.isLoggedIn"/> -->
  <!-- Displays depending on what the RouterLink is -->
  <!-- <currentWorkout /> -->
  <!-- <FriendsTable /> -->


  <div class="container">
    <RouterView />
  </div>

  <!-- Displays depending on what the RouterLink is -->
  
</template>

<style scoped>

</style>
