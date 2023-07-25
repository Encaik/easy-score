import { createRouter, createWebHistory } from "vue-router";
import home from "@/pages/Home.vue";
import hero from "@/pages/Hero.vue";
import layout from "@/components/Layout.vue";

const routes:any = [
  {
    path: '/',
    component: hero
  },
  {
    path: '/',
    component: layout,
    children:[
      {
        path: '/home',
        component: home
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router