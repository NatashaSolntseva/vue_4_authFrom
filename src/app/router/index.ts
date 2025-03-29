import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/shared/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import SignInPage from '@/pages/SignInPage.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue'
import ListPage from '@/pages/ListPage.vue'
import ListItemPage from '@/pages/ListItemPage.vue'
import {
  URL_SIGN_IN,
  URL_SIGN_UP,
  URL_FORGOT_PASSWORD,
  URL_LIST,
  URL_LIST_ITEM,
  URL_NOT_FOUND,
} from '@/shared/config/routes'

const routes = [
  { path: '/', redirect: URL_SIGN_IN },
  { path: URL_SIGN_IN, component: SignInPage, name: 'SignIn', meta: { requiresGuest: true } },
  { path: URL_SIGN_UP, component: SignUpPage, name: 'SignUp', meta: { requiresGuest: true } },
  {
    path: URL_FORGOT_PASSWORD,
    component: ForgotPasswordPage,
    name: 'ForgotPassword',
    meta: { requiresGuest: true },
  },
  { path: URL_LIST, component: ListPage, name: 'List', meta: { requiresAuth: true } },
  {
    path: URL_LIST_ITEM,
    component: ListItemPage,
    name: 'ListItem',
    props: true,
    meta: { requiresAuth: true },
  },
  { path: URL_NOT_FOUND, redirect: URL_SIGN_IN },
]

// export const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(_to, _from, savedPosition) {
//     if (savedPosition) {
//       return savedPosition
//     }

//     const customScroll = sessionStorage.getItem('scrollPosition')
//     if (customScroll) {
//       sessionStorage.removeItem('scrollPosition')
//       return { top: parseInt(customScroll) }
//     }

//     return { top: 0 }
//   },
// })

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
      next(URL_SIGN_IN)
    } else if (requiresGuest && isAuthenticated) {
      next(URL_LIST)
    } else {
      next()
    }
  })
})
