import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.path.startsWith('/user') || localStorage.getItem('token')) next();
//   else void router.push('/user/login')
// });

// router.afterEach(() => {
//   //
// });

export default router;
