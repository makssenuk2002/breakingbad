import Vue from 'vue'
import VueRouter from 'vue-router'
import FirstSeason from "@/components/seasons/FirstSeason";
import SecondSeason from "@/components/seasons/SecondSeason";
import ThirdSeason from "@/components/seasons/ThirdSeason";
import FourthSeason from "@/components/seasons/FourthSeason";
import Characters from "@/components/Characters";
import Main from "@/components/Main";

Vue.use(VueRouter)

const routes = [
  {
    path: '/Main',
    name: 'Main',
    component: Main
  },
  {
    path: '/FirstSeason',
    name: 'FirstSeason',
    component: FirstSeason
  },
  {
    path: '/SecondSeason',
    name: 'SecondSeason',
    component: SecondSeason
  },
  {
    path: '/ThirdSeason',
    name: 'ThirdSeason',
    component: ThirdSeason
  },
  {
    path: '/FourthSeason',
    name: 'FourthSeason',
    component: FourthSeason
  },
  {
    path: '/Characters',
    name: 'Characters',
    component: Characters
  },

]

const router = new VueRouter({
  routes
})

export default router
