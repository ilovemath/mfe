const routes = [
  {
    path: '/search1',
    name: 'search1',
    component: () => import('@/views/search1')
  },
  {
    path: '/search2',
    name: 'search2',
    component: () => import('@/views/search2')
  },
  {
    path: '/business1',
    name: 'business1',
    component: () => import('@/views/business1')
  },
  {
    path: '/business2',
    name: 'business2',
    component: () => import('@/views/business2')
  },
]
export default routes
