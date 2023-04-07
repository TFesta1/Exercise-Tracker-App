import ExerciseView from '../views/ExerciseView.vue'
import ActivityView from '../views/ActivityView.vue'
import AdminView from '../views/AdminView.vue'
import SearchView from '../views/SearchView.vue'
import StatisticsView from '../views/StatisticsView.vue'
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useSession } from '@/model/session'
import LoginVue from '@/views/Login.vue'
import RegisterVue from '@/views/Register.vue'
import WorkoutVue from '@/views/WorkoutView.vue'
import userStore from '@/stores/user'
// import userStore from '@/stores/user'

import { defineComponent, onMounted, inject } from 'vue'



// onMounted(userStore.getUser)

// const username = ref("")

// async function logUserName() {
//     const result = await userStore.getUserName();
//     username.value += result
//     // console.log(result); // logs "tanner"
// }
// logUserName();

// console.log('username: ' + username.value + "from router");


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'exercise',
      component: ExerciseView,
      // beforeEnter: secureRoute,
    },
    {
      path: '/statistics',
      name: 'statistics',
      
      component: StatisticsView
    },
    {
      path: '/activity',
      name: 'activity',
      
      component: ActivityView
    },
    {
      path: '/search',
      name: 'search',
      
      component: SearchView
    },
    {
      path: '/admin',
      name: 'admin',
      
      component: AdminView
    },
    {
      path: '/login',
      name: 'login',
      
      component: LoginVue
    },
    {
      path: '/register',
      name: 'register',
      
      component: RegisterVue
    },
    {
      path: '/workoutList',
      name: 'workoutList',
      
      component: WorkoutVue
    },
    

    
  ]
})

// If there's no user, we get sent to the login page
function secureRoute (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if(userStore.getters.isLoggedIn){
    next()
  }
  else {
    next('/login')
  }

}

export default router
