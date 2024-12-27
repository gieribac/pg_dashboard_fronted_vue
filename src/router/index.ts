//   src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import { isAuthenticated } from '../services/authHelpers';
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
        component: AdminV,
        meta: { requiresAuth: true }
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
router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'MainV' }); // Redirige al usuario a la página de login si no está autenticado
  } else {
    next(); // Permite la navegación
  }
});
export default router