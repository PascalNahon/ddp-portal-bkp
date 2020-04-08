import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/pages/Home'
import Login from '@/components/login/Login'

Vue.use(Router)

function applyMiddleware (guards, to, from, next, idx) {
  const guard = guards[idx]
  if (guards.length === idx + 1) {
    guard(from, to, next)
  } else {
    guard(from, to, (nextArg) => {
      switch (typeof (nextArg)) {
        case 'undefined':
          applyMiddleware(guards, from, to, next, idx + 1)
          break
        case 'object':
          next(nextArg)
          break
        case 'boolean':
          next(nextArg)
          break
        case 'string':
          next(nextArg)
          break
        default:
          nextArg(nextArg)
          break
      }
    })
  }
}

function guardsCheck (guards) {
  return (to, from, next) => {
    applyMiddleware(guards, to, from, next, 0)
  }
}

function requireAuth (to, from, next) {
  if (!Vue.$jwt.hasToken()) {
    next({ path: '/login' })
    return
  }
  store.dispatch('loginAction', {user: Vue.$jwt.decode().user, token: Vue.$jwt.getToken()})

  return next()
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: guardsCheck([requireAuth])
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
