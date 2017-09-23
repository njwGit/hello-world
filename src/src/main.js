// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import routerConfig from './routers'
import App from './App'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routerConfig // （缩写）相当于 routes: routes
})

// 多个组件之间出现传递的数据
const store = new Vuex.Store({
  state: {
    tabbarVisiable: true,
    // 本地测试地址
    // basePath: 'http://192.168.2.248:8082',
    // 线上测试地址
    basePath: 'https://testvip.ews.m.jaeapp.com',
    vipMessage: {},
    shopMessage: {},
    address: {
      recieveName: '',
      recieveTel: '',
      province: '',
      city: '',
      region: '',
      street: '',
      detailAddress: '',
      isDefault: 2,
      returnFromRegion: false
    },
    activity: {
      baseMessage: {},
      extraMessage: {},
      userData: {}
    }
  },
  mutations: {
    closeTabbarVisiable (state) {
      state.tabbarVisiable = false
    },
    openTabbarVisiable (state) {
      state.tabbarVisiable = true
    },
    setVipMessage (state, vipMessage) {
      state.vipMessage = vipMessage
    },
    setShopMessage (state, shopMessage) {
      state.shopMessage = shopMessage
    },
    setAddress (state, address) {
      state.address = address
    },
    setReturnFromRegion (state, returnFromRegion) {
      state.address.returnFromRegion = returnFromRegion
    }
  }
})
// 日期格式化为yyyy-MM-dd格式的过滤器
Vue.filter('formatDate', function (value) {
  let date = new Date(value)
  let format = 'yyyy-MM-dd hh:mm'
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
})
// 切换页面标题的自定义指令
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')

/* 路由导航的处理 */
// router.beforeEach((to, from, next) => {
//   let path = to.path
//   if (path === '/activity/actDetail') {
//     // 当访问的是活动详情页时，此时获取活动信息，根据活动类型跳转到各活动的组件
//     Vue.http.post(store.state.basePath + '/activity/detail', to.query, {
//       emulateJSON: true
//     }).then(response => {
//       let resp = response.body
//       // 当该店铺活动不存在或暂无该类活动时
//       if (resp.isNoActivity) {
//         next({path: '/noActivity', query: to.query})
//         return
//       }
//       // 活动过期
//       if (resp.baseMessage.status === 3) {
//         next({path: '/activity/overdue', query: to.query})
//         return
//       }
//       // 活动未开始
//       if (resp.baseMessage.status === 2) {
//         next({path: '/activity/noStart', query: to.query})
//         return
//       }
//       store.state.activity.baseMessage = resp.baseMessage
//       store.state.activity.extraMessage = resp.extraMessage
//       store.state.activity.userData = resp.userData
//       let actType = resp.baseMessage.type
//       switch (actType) {
//         case 4:
//           next({path: '/sign/actDetail', query: to.query})
//           break
//         case 7:
//           let q = to.query
//           q.skinId = resp.baseMessage.skinId
//           next({path: '/draw/actDetail', query: q})
//           break
//         case 8:
//           next({path: '/favor/actDetail', query: to.query})
//           break
//         case 10:
//           next({path: '/sharePacking/actDetail', query: to.query})
//           break
//       }
//     })
//   } else {
//     next()
//   }
// })
