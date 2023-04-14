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
import EditWorkout from '@/views/EditWorkout.vue'
import DisplayFriendWorkouts from '@/views/DisplayFriendWorkout.vue'
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
      // beforeEnter: secureRoute
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView,
      // beforeEnter: secureRoute
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView,
      // beforeEnter: secureRoute
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      // beforeEnter: secureRoute
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      // beforeEnter: secureRoute
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue,
      // beforeEnter: secureRoute
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterVue,
      // beforeEnter: secureRoute
    },
    {
      path: '/workoutList',
      name: 'workoutList',
      component: WorkoutVue,
      // beforeEnter: secureRoute
    },
    {
      path: '/workouts/edit/:id',
      name: 'editWorkout',
      component: EditWorkout,
      props: route => ({ id: Number(route.params.id) }),
      // beforeEnter: secureRoute
    },
    {
      path: '/viewFriend/:personName',
      name: 'viewFriendsWorkout',
      component: DisplayFriendWorkouts,
      props: route => ({ personName: route.params.personName }),
      // beforeEnter: secureRoute
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
