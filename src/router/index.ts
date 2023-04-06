import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect(to) {
        return {
          path: '/analytics',
          name: 'Аналитика',
          component: () => import('@/views/AnalyticView.vue')
        };
      }
    },
    {
      path: '/analytics',
      name: 'Аналитика',
      component: () => import('@/views/AnalyticView.vue')
    },
    {
      path: '/orders',
      name: 'Заказы',
      component: () => import('@/views/OrderView.vue')
    },
    {
      path: '/reports',
      name: 'Отчеты',
      component: () => import('@/views/ReportView.vue')
    },
    {
      path: '/settings',
      name: 'Настройки',
      component: () => import('@/views/SettingView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/components/SettingTitles.vue')
        },
        {
          path: ':settingType',
          component: () => import('@/components/SettingList.vue')
        },
        {
          path: ':settingType/:settingId',
          component: () => import('@/components/SettingItem.vue')
        }
      ]
    }
  ]
});

export default router;
