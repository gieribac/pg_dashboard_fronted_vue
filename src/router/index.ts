//   src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import AdminV from '../views/AdminV.vue';
import MainV from '../views/MainV.vue';

const routes:RouteRecordRaw[] = [
      {
        path: '/MainV',
        name: 'MainV',
        component: MainV
      },
      { 
        path: '/AdminV',
        name: 'AdminV',
        component: AdminV
      },
      {
        path: '/:catchAll(.*)',
        redirect: to => {return {name: 'MainV'}}
      }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  
})

export default router