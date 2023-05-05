<script setup lang="ts">
  // Keyword "setup" is required for the script to be recognized as a composition API
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue';
  import { inject } from 'vue'
  import type UserStore from '@/stores/user';
  import { useLogin } from '@/model/session';
  import type LoginTokenStore from '@/stores/loginToken'


  let token = inject("token") as typeof LoginTokenStore
  const userStore = inject('userStore') as typeof UserStore;
  // console.log(token)
  // token.loginRetrieveToken()
  // console.log(token.getters.getToken)

  // Just for testing purposes so we don't have to login each time
  // userStore.login("tanner", "tanner")
  
  
</script>

<template>
  <!-- These two things should always be here -->
  <!-- <ExerciseView /> -->
  <!-- Don't display a navbar if we're not at the main dashboard page -->
  <!-- v-if="userStore.getters.isLoggedIn" -->
  <NavBar v-if="userStore.getters.isLoggedIn"/>
  <!-- <PfpSearch v-if="userStore.getters.isLoggedIn"/> -->
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
