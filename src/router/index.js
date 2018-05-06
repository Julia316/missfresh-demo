import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/homepage/homepage'
import Member from '../components/member/member'
import ShoppingCart from '../components/shoppingcart/shoppingcart'
import Mine from '../components/mine/mine'

import BestSellers from '../components/homepage/tabs/bestsellers/bestsellers'
import Special from '../components/homepage/tabs/special/special'
import Fruits from '../components/homepage/tabs/fruits/fruits'
import Vegetables from '../components/homepage/tabs/vegetables/vegetables'
import Fresh from '../components/homepage/tabs/fresh/fresh'
import Milk from '../components/homepage/tabs/milk/milk'
import Meat from '../components/homepage/tabs/meat/meat'
import Drink from '../components/homepage/tabs/drink/drink'
import Snacks from '../components/homepage/tabs/snacks/snacks'
import Aquatic from '../components/homepage/tabs/aquatic/aquatic'
import FastFood from '../components/homepage/tabs/fastfood/fastfood'
import Cooked from '../components/homepage/tabs/cooked/cooked'
import Grain from '../components/homepage/tabs/grain/grain'
import LightMeal from '../components/homepage/tabs/lightmeal/lightmeal'
import Merchandise from '../components/homepage/tabs/merchandise/merchandise'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/home',
      component:HomePage,
      children:[
        {
          path:"",
          name:"BestSellers",
          component:BestSellers
        },
        {
          path:'special',
          name:"Special",
          component:Special
        },
        {
          path:'fruits',
          name:"Fruits",
          component:Fruits
        },
        {
          path:'vegetables',
          name:"Vegetables",
          component:Vegetables
        },
        {
          path:'fresh',
          name:"Fresh",
          component:Fresh
        },
        {
          path:'milk',
          name:"Milk",
          component:Milk
        },
        {
          path:'meat',
          name:"Meat",
          component:Meat
        },
        {
          path:'drink',
          name:"Drink",
          component:Drink
        },
        {
          path:'aquatic',
          name:"Aquatic",
          component:Aquatic
        },
        {
          path:'snacks',
          name:"Snacks",
          component:Snacks
        },
        {
          path:'fastfood',
          name:"FastFood",
          component:FastFood
        },
        {
          path:'cooked',
          name:"Cooked",
          component:Cooked
        },
        {
          path:'grain',
          name:"Grain",
          component:Grain
        },
        {
          path:'lightmeal',
          name:"LightMeal",
          component:LightMeal
        },
        {
          path:'merchandise',
          name:"Merchandise",
          component:Merchandise
        }
      ]
    },
    {
      path: '/member',
      name: 'Member',
      component:Member
    },
    {
      path: '/shoppingcart',
      name: 'ShoppingCart',
      component:ShoppingCart
    },
    {
      path: '/mine',
      name: 'Mine',
      component:Mine
    },
  ]
})
