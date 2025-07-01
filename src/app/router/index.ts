import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/shared/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import SignInPage from '@/pages/SignInPage.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue'
import ListPage from '@/pages/ListPage.vue'
import ListItemPage from '@/pages/ListItemPage.vue'
import { ROUTE_NAMES, ROUTE_PATHS } from '@/shared/config/routes'

const routes = [
  { path: '/', redirect: { name: ROUTE_NAMES.SIGN_IN } },
  {
    path: ROUTE_PATHS[ROUTE_NAMES.SIGN_IN],
    component: SignInPage,
    name: ROUTE_NAMES.SIGN_IN,
    meta: { requiresGuest: true },
  },
  {
    path: ROUTE_PATHS[ROUTE_NAMES.SIGN_UP],
    component: SignUpPage,
    name: ROUTE_NAMES.SIGN_UP,
    meta: { requiresGuest: true },
  },
  {
    path: ROUTE_PATHS[ROUTE_NAMES.FORGOT_PASSWORD],
    component: ForgotPasswordPage,
    name: ROUTE_NAMES.FORGOT_PASSWORD,
    meta: { requiresGuest: true },
  },
  {
    path: ROUTE_PATHS[ROUTE_NAMES.LIST],
    component: ListPage,
    name: ROUTE_NAMES.LIST,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTE_PATHS[ROUTE_NAMES.LIST_ITEM],
    component: ListItemPage,
    name: ROUTE_NAMES.LIST_ITEM,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTE_PATHS[ROUTE_NAMES.NOT_FOUND],
    redirect: { name: ROUTE_NAMES.SIGN_IN },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, _from, next) => {
  onAuthStateChanged(auth, (user) => {
    const isAuthenticated = !!user
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

    if (requiresAuth && !isAuthenticated) {
      next({ name: ROUTE_NAMES.SIGN_IN })
    } else if (requiresGuest && isAuthenticated) {
      next({ name: ROUTE_NAMES.LIST })
    } else {
      next()
    }
  })
})
