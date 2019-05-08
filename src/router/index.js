import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
 {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '首页',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/pages/index/index')
    },{
      path: 'newsDetails',
      hidden: true,
      component: () => import('@/pages/index/newsDetails'),
      meta: { title: '公告详情'}
    }]
  },
  {
    path: '/index',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/pages/index/index'),
      meta: { title: '首页', icon: 'example' }
    }]
  },
  {
    path: '/merchants',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/pages/merchants/index'),
      meta: { title: '我的商家', icon: 'user' }
    }]
  },
  {
    path: '/account',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/pages/account/index'),
      meta: { title: '资金明细', icon: 'form' }
    }]
  },
  // {
  //   path: '/settlement',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/pages/settlement/index'),
  //     meta: { title: '结算申请', icon: 'form' }
  //   }]
  //   },
  {
    path: '/settlement',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/settlement/index'),
      meta: { title: '提现申请', icon: 'count' }
    }]
  },
  // {
  //   path: '/orderManage',
  //   component: Layout,
  //   redirect: '/orderManage/waitAcceptOrder',
  //   name: '订单管理',
  //   meta: { title: '订单管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'waitAcceptOrder',
  //       name: '待接订单',
  //       component: () => import('@/views/index/index'),
  //       meta: { title: '待接订单', icon: 'tree' }
  //     },
  //     {
  //       path: 'acceptOrder',
  //       name: '已接订单',
  //       component: () => import('@/views/index/index'),
  //       meta: { title: '已接订单', icon: 'tree' }
  //     },
  //     {
  //       path: 'finishOrder',
  //       name: '已完成订单',
  //       component: () => import('@/views/index/index'),
  //       meta: { title: '已完成订单', icon: 'tree' }
  //     },
  //     {
  //       path: 'revokeOrder',
  //       name: '已撤销订单',
  //       component: () => import('@/views/index/index'),
  //       meta: { title: '已撤销订单', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/financeManage',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/index/index'),
  //     meta: { title: '财务管理', icon: 'example' }
  //   }]
  // },
  // {
  //   path: '/platformExtend',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/index/index'),
  //     meta: { title: '平台推广', icon: 'example' }
  //   }]
  // },
  // {
  //   path: '/staffManage',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/index/index'),
  //     meta: { title: '员工管理', icon: 'example' }
  //   }]
  // },
  // {
  //   path: '/substationManage',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/index/index'),
  //     meta: { title: '分站管理', icon: 'example' }
  //   }]
  // },
  /*
  {
    path: '/shopManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '店铺管理', icon: 'example' }
    }]
  },
  {
    path: '/accountInfo',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '账户信息', icon: 'example' }
    }]
  },
  {
    path: '/underwayOrder',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '进行中订单', icon: 'example' }
    }]
  },
  {
    path: '/courseEnrollManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '课程报名管理', icon: 'example' }
    }]
  },
  {
    path: '/substationManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '分站管理', icon: 'example' }
    }]
  },
  */
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
