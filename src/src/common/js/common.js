export const getSellerNick = (thisVue) => {
  let sellerNick = thisVue.$store.state.shopMessage.sellerNick
  if (sellerNick == null) {
    sellerNick = thisVue.$route.query.sellerNick
  }
  if (sellerNick == null) {
    return ''
  }
  return sellerNick
}
export const toErrorPage = (errorType, query, thisVue) => {
  switch (errorType) {
    case -1:
      // 异常
      break
    case 2:
      // 活动未开始
      thisVue.$router.push({path: '/activity/noStart', query: query})
      break
    case 3:
      // 活动已结束
      thisVue.$router.push({path: '/activity/overdue', query: query})
      break
    case 0:
      // 活动不存在
      thisVue.$router.push({path: '/noActivity', query: query})
      break
  }
}
