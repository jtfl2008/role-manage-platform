import Vue from 'vue';
import Router from 'vue-router';
import Vuex from '../store';
const Home = () => import('@/page/Home');
const WorkBench = () => import('@/page/WorkBench');
const Form = () => import('@/page/WorkBench/Form');
const Chart = () => import('@/page/WorkBench/Chart');
const Login = () => import('@/page/Login');
const System = () => import('@/page/WorkBench/system');
const Role = () => import('@/page/WorkBench/role');
const Resource = () => import('@/page/WorkBench/resource');
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        index: '1',
      },
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/login/:env',
      component: Login,
    },
    {
      path: '/workbench',
      component: WorkBench,
      redirect: '/workbench/system',
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: '/workbench/form',
          component: Form,
          meta: {
            index: '3',
          },
        },
        {
          path: '/workbench/chart',
          component: Chart,
          meta: {
            index: '4',
          },
        },
        {
          path: '/workbench/system',
          component: System,
          meta: {
            index: '5',
          },
        },
        {
          path: '/workbench/role',
          component: Role,
          meta: {
            index: '6',
          },
        },
        {
          path: '/workbench/resource',
          component: Resource,
          meta: {
            index: '7',
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  Vuex.commit('setActiveIndex', to.meta.index);
  next();
});

export default router;
