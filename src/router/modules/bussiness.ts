import { get } from 'lodash-es'

export const bussinessRoutes: Array<any> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: false, title: '首页', showHeader: true, showSide: false },
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('@/pages/home/index.vue'),
        meta: { permission: false, title: '首页', showHeader: true, showSide: false }
      }
    ]
  },
  {
    path: '/application',
    name: 'Application',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: false, title: '精选应用', showHeader: true, showSide: false },
    redirect: '/application/index',
    children: [
      {
        path: 'index',
        name: 'ApplicationIndex',
        component: () => import('@/pages/application/index.vue'),
        meta: { permission: false, title: '精选应用', showHeader: true, showSide: false }
      }
    ]
  },
  {
    path: '/intelligentMeet',
    name: 'IntelligentMeet',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: false, title: '智能会议', showHeader: true, showSide: false },
    redirect: '/intelligentMeet/index',
    children: [
      {
        path: 'index',
        name: 'IntelligentMeetIndex',
        component: () => import('@/pages/intelligentMeet/index.vue'),
        meta: { permission: false, title: '智能会议', showHeader: true, showSide: false }
      },

    ]
  },
  {
    path: '/intelligentWriting',
    name: 'IntelligentWriting',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: false, title: '智能会议', showHeader: true, showSide: false },
    redirect: '/intelligentWriting/index',
    children: [
      {
        path: 'index',
        name: 'IntelligentWritingIndex',
        component: () => import('@/pages/intelligentWriting/index.vue'),
        meta: { permission: false, title: '智能写作', showHeader: false, showSide: false }
      },
      {
        path: 'document',
        name: 'IntelligentWritingDocument',
        component: () => import('@/pages/intelligentWriting/document.vue'),
        meta: { permission: false, title: '智能写作文档', showHeader: false, showSide: false }
      },
    ]
  }
]

export const systemRoutes: Array<any> = [
  // 系统管理
  {
    path: '/system',
    name: 'System',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: true, name: '系统管理', title: '系统管理', showHeader: true, showSide: true },
    redirect: '/system/user',
    showMenu: true,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/pages/system/user/index.vue'),
        meta: { permission: true, name: '用户管理', title: '用户管理', showHeader: true, showSide: true }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/pages/system/role/index.vue'),
        meta: { permission: true, name: '角色管理', title: '角色管理', showHeader: true, showSide: true }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/pages/system/menu/index.vue'),
        meta: { permission: true, name: '菜单管理', title: '菜单管理', showHeader: true, showSide: true }
      },
      {
        path: 'dict',
        name: 'Dict',
        component: () => import('@/pages/system/dict/index.vue'),
        meta: { permission: true, name: '字典管理', title: '字典管理', showHeader: true, showSide: true }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/pages/system/log/index.vue'),
        meta: { permission: true, name: '日志管理', title: '日志管理', showHeader: true, showSide: true }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/pages/system/dept/index.vue'),
        meta: { permission: true, name: '部门管理', title: '部门管理', showHeader: true, showSide: true }
      },

    ]
  },
]

export const useBussinessRoutes = () => {

  const routes = [...bussinessRoutes, ...systemRoutes]
  // 处理路由的数据结构，以达到aside侧边栏菜单组件的格式
  const handleRoutes = routes.map((module, index) => {
    const extra = {
      name: get(module, 'meta.title', '未命名菜单'),
      hidden: 1,// 0为隐藏，1为显示
      routerPath: get(module, 'path', ''),
      children: get(module, 'children', []).map((child: any) => {
        return {
          name: get(child, 'meta.title', '未命名菜单'),
          hidden: 1,// 0为隐藏，1为显示
          routerPath: module.path + '/' + get(child, 'path', ''),
        }
      })
    }
    return extra
  })

  return handleRoutes
}


