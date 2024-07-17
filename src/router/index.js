import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/page/Login.vue';
import Dashboard from '@/page/Dashboard.vue';
import Posko from '@/page/Posko.vue';
import Korban from '@/page/Korban.vue';
import Offline from '@/page/Offline.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: 'Login',
    component: Login,
  },
  {
    path: "/dashboard",
    name: 'Dashboard',
    component: Dashboard,
  },{
    path: "/posko",
    name: 'Posko',
    component: Posko,
  },{
    path: "/korban",
    name: 'Korban',
    component: Korban,
  },{
    path: "/offline",
    name: 'Offline',
    component: Offline,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router