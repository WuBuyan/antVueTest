import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Empty from '../components/Empty'
import navigationTemplate from "../components/navigationTemplate";
import initialRegistration from "../views/opportunityManagement/initialRegistration";
import recordRegistration from "../views/opportunityManagement/recordRegistration";
import initialRegistrationAdd from "../views/opportunityManagement/initialRegistrationAdd";

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const routes =[
  {
    path:'/',
    name:'Empty',
    component:Empty,
    children:[
      {
        path:'/',
        name:'navigationTemplate',
        component:navigationTemplate,
        redirect:'/views/opportunityManagement/a',
        children:[
          {
            path:'/views/opportunityManagement/a',
            name:'initialRegistration',
            component:initialRegistration,
          },{
            path:'/views/opportunityManagement/b',
            name:'recordRegistration',
            component:recordRegistration,
          },{
            path:'/views/opportunityManagement/aAdd',
            name:'initialRegistrationAdd',
            component:initialRegistrationAdd,
          }
        ]
      }
    ]

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
