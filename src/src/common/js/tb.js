// 引入Tida
export const Tida = require('tida')
// 关注店铺,shopMessage必须包含shopId和sellerId两个字段，
// 一个用于天猫客户端，一个用于淘宝客户端
export const doFavor = (shopMessage, callback) => {
  Tida.ready({}, function () {
    Tida.doAuth({refresh: false}, function (data) {
      if (data.finish) {
        // 授权成功
        // 淘宝客户端关注店铺
        if (Tida.appinfo.isTaobao) {
          Tida.social({
            sellerId: shopMessage.sellerId,
            action: 'follow'
          }, function (e) {
            if (e.ret === 'HY_SUCCESS') {
              callback()
            }
          })
        } else if (Tida.appinfo.isTmall) {
          // 天猫客户端
          Tida.shopFavor({
            'shopId': shopMessage.shopId,
            'action': 'add'
          }, function (e) {
            let isFav
            if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
              // 苹果平台
              isFav = e.ret[0] === 'HY_SUCCESS' || /您已经收藏过了/.test(e.msg)
            } else if (/android/.test(navigator.userAgent.toLowerCase())) {
              // 安卓平台
              isFav = e.ret === 'HY_SUCCESS'
            }
            if (isFav) {
              if (callback) {
                callback()
              }
            }
          })
        }
      }
    })
  })
}
/**
  根据分享接口返回数据判断用户是否分享成功
  data 分享接口回调函数返回的数据
*/
export const isShareSuccess = (data) => {
  // 判断用户当前使用的客户端以及操作系统
  let ua = navigator.userAgent.toLowerCase()
  let isIphone = /iphone|ipad|ipod/.test(ua)
  let isAndroid = /android/.test(ua)
  let isTmall = Tida.appinfo.isTmall
  let isTaobao = Tida.appinfo.isTaobao
  if (isTmall) {
    // 天猫客户端
    return data.ret.retMsg === '成功'
  } else if (isTaobao) {
    // 淘宝客户端
    if (isIphone) {
      // ios平台
      return data.ret === 'HY_SUCCESS'
    }
    if (isAndroid) {
      // 安卓平台
      return true
    }
  }
  return false
}
/** 自动关注店铺
*  sellerId 商家用户id
*/
export const autoFavorShop = (sellerId) => {
  Tida.ready({}, function () {
    Tida.follow2({
      sellerId: sellerId
    }, function (data) {
      console.log('')
    })
  })
}
/** 分享
  params 参数列表
    --url 分享的页面链接
    --image 分享显示的图片
    --title 标题
    --content 内容
  callback(data) 回调函数  data分享接口回调参数
*/
export const doShare = (params, callback) => {
  Tida.ready({}, function () {
    Tida.doAuth({refresh: false}, function (data) {
      if (data.finish) {
        Tida.share({
          title: params.title,
          content: params.content,
          url: params.url,
          image: params.image,
          targets: [0, 1, 2, 3, 4, 5, 6, 7]
        }, function (data) {
          if (callback) {
            callback(data)
          }
        })
      }
    })
  })
}
/**
  进行加入购物车操作
  @param itemId 加购的商品id
  @param shopType 店铺类型 B：天猫店铺，C：淘宝店铺
  @param sellerNick 商家昵称
  @param callback 加购成功后的回调函数
*/
export const doAddCart = (itemId, shopType, sellerNick, callback) => {
  Tida.ready({}, function () {
    Tida.doAuth({refresh: false}, function (data) {
      if (data.finish) {
        // 如果是天猫客户端，店铺为淘宝店铺
        if (Tida.appinfo.isTmall && shopType === 'C') {
          if (window.confirm('天猫客户端暂时不支持加购淘宝店的商品，是否跳到淘宝客户端打开？')) {
            Tida.openClient(window.location.href)
            return
          }
        }
        Tida.cart({
          sellerNick: sellerNick,
          itemId: itemId,
          isvExt: 'any business params string'
        }, function (data) {
          if (Tida.appinfo.isTaobao || shopType === 'B') {
            // 加购成功，执行回调函数
            if (data.ret === 'HY_SUCCESS') {
              if (callback) {
                callback()
              }
            }
          }
        })
      }
    })
  })
}
/**
  跳转到购物车
*/
export const jumpCart = () => {
  Tida.jumpcart({}, function (data) {
    return
  })
}
/**
  获取用户混淆昵称
  @param callback(mixnick) 获得混淆昵称后的回调函数
  @param failed 授权失败的回调函数
*/
export const getMixnick = (callback, failed) => {
  Tida.ready({}, function () {
    // 检测授权
    Tida.doAuth({refresh: false}, function (data) {
      if (data.finish) {
        Tida.mixNick({}, function (data) {
          let mixnick = encodeURIComponent(data.mixnick)
          if (callback) {
            callback(mixnick)
          }
        })
      } else {
        if (failed) {
          failed()
        }
      }
    })
  })
}
/**
  关闭手淘浏览器窗口
*/
export const closeWindow = () => {
  Tida.popWindow()
}
