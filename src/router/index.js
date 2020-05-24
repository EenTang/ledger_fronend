import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Login from '@/views/Login'
import GeneralIncome from '@/views/income/General'
import DetailsIncome from '@/views/income/Details'
import GeneralCost from '@/views/cost/General'
import ClientInfo from '@/views/template/ClientInfo'
import Goods from '@/views/template/Goods'
import Incomed from '@/views/history/Income'
import Costed from '@/views/history/Cost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      hidden: true
    },
    {
        path: '*',
        name: '',
        component: NotFound,
        hidden: true
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        hidden: true
    },
    {
      path: '/',
      name: '收入账本',
      component: Home,
      icon: "el-icon-notebook-2",
      children: [
        {
          path: '/income/gernel',
          name: '收入总览',
          component: GeneralIncome
        },
        {
          path: '/income/details',
          name: '账单详情',
          component: DetailsIncome
        },
      ]
    },
    {
      path: '/',
      name: '支出账本',
      component: Home,
      icon: "el-icon-notebook-1",
      children: [
        {
          path: '/cost/gernel',
          name: '支出总览',
          component: GeneralCost
        },
      ]
    },
    {
      path: '/',
      name: '配置模版',
      component: Home,
      icon: "el-icon-menu",
      children: [
        {
          path: '/template/client',
          name: '客户模版',
          component: ClientInfo
        },
        {
          path: '/template/details',
          name: '商品模板',
          component: Goods
        },
      ]
    },
    {
      path: '/',
      name: '历史账单',
      component: Home,
      icon: "el-icon-time",
      children: [
        {
          path: '/history/income',
          name: '收入',
          component: Incomed
        },
        {
          path: '/history/cost',
          name: '支出',
          component: Costed
        },
      ]
    },
  ]
})
