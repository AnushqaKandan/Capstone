import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import AuthOptions from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'auth-options',
    component: AuthOptions,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/views/ProductView.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/CheckoutView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/LoginComp.vue')
  }
  
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   beforeEnter: (to, from, next) => {
  //     localStorage.removeItem('token');
  //     next('/login');
  //   }
  // }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'auth-options' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
