import { createRouter, createWebHistory } from 'vue-router'
import ExerciseView from '../views/ExerciseView.vue'
import ActivityView from '../views/ActivityView.vue'
import AdminView from '../views/AdminView.vue'
import SearchView from '../views/SearchView.vue'
import StatisticsView from '../views/StatisticsView.vue'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'exercise',
      component: ExerciseView
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
    
  ]
})

export default router
