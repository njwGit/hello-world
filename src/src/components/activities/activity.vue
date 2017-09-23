<template></template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$http.post(vm.$store.state.basePath + '/activity/detail', to.query, {
        emulateJSON: true
      }).then(response => {
        let resp = response.body
        // 当该店铺活动不存在或暂无该类活动时
        if (resp.isNoActivity) {
          next({path: '/noActivity', query: to.query, replace: true})
          return
        }
        // 活动过期
        if (resp.baseMessage.status === 3) {
          next({path: '/activity/overdue', query: to.query, replace: true})
          return
        }
        // 活动未开始
        if (resp.baseMessage.status === 2) {
          next({path: '/activity/noStart', query: to.query, replace: true})
          return
        }
        vm.$store.state.activity.baseMessage = resp.baseMessage
        vm.$store.state.activity.extraMessage = resp.extraMessage
        vm.$store.state.activity.userData = resp.userData
        let actType = resp.baseMessage.type
        switch (actType) {
          case 4:
            next({path: '/sign/actDetail', query: to.query, replace: true})
            break
          case 7:
            let q = to.query
            q.skinId = resp.baseMessage.skinId
            next({path: '/draw/actDetail', query: q, replace: true})
            break
          case 8:
            next({path: '/favor/actDetail', query: to.query, replace: true})
            break
          case 10:
            next({path: '/sharePacking/actDetail', query: to.query, replace: true})
            break
        }
      })
    })
  }
}
</script>