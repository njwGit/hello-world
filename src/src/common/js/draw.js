import $ from 'jquery'
import 'awardRotate'
const turnplate = {
  restaraunts: [],  // 大转盘奖品名称
  ptype: [],                 // 奖品类型
  colors: [],  // 大转盘奖品区块对应背景颜色
  outsideRadius: 192,  // 大转盘外圆的半径
  textRadius: 165,  // 大转盘奖品位置距离圆心的距离
  insideRadius: 68,  // 大转盘内圆的半径
  startAngle: 0,  // 开始角度
  bRotate: false  // false:停止;ture:旋转
}
export const getImg = (type, i) => {
  let img = null
  switch (type) {
    case 0:
      img = window.document.getElementById('sorry-img')
      break
    case 1:
      img = window.document.getElementById('jifen-img')
      break
    case 2:
      img = window.document.getElementById('coupons-img')
      break
    case 5:
      img = window.document.getElementById('flow-img')
      break
    case 6:
      img = window.document.getElementById('redbag-img')
      break
    case 8:
      img = window.document.getElementById('good-img' + i)
      break
    case 9:
      img = window.document.getElementById('onemore-img')
      break
  }
  return img
}
/**
  展示抽奖活动可以通过下单增加抽奖次数的商品列表
*/
export const showItems = () => {
  $('.add-collect-goods').fadeIn()
  $('.add-collect-goods-content').slideDown()
  $('body').css('position', 'fixed')
  $('.add-collect-goods .mask').on('touchstart', function () {
    $('.add-collect-goods, .add-collect-goods-content').fadeOut()
    $('body').css('position', 'relative')
  })
}
/**
  进行抽奖，转动转盘并请求后台处理抽奖逻辑返回数据
*/
export const rotateFn = (thisVue) => {
  // 设置为抽奖中
  thisVue.isDrawing = true
  // 停止指针旋转
  $('.pointer').stopRotate()
  // 异步请求后台处理抽奖逻辑
  thisVue.$http.get(thisVue.$store.state.basePath + '/draw/doDraw?actId=' + thisVue.baseMessage.id).then(response => {
    let resp = response.body
    if (resp.err_code === 0) {
      // 转动转盘指针
      $('.pointer').rotate({
        angle: 0,
        animateTo: (resp.angle + 1800),
        duration: 8000,
        callback: function () {
          thisVue.receivingInformation.actId = thisVue.baseMessage.id
          thisVue.receivingInformation.awardName = thisVue.extraMessage.awards[resp.awardIndex].awardName
          // 中奖为实物时，设置后台返回的token，防止用户重复提交收货信息
          if (resp.awardResult.awardType === 8) {
            thisVue.receivingInformation.token = resp.token
          }
          // 更新页面上的数据
          thisVue.userData.drawedNum = thisVue.userData.drawedNum + 1
          thisVue.modualData.type = resp.awardResult.awardType
          thisVue.modualData.text = resp.awardResult.message
          thisVue.modualData.isShow = true
        }
      })
    }
  })
}
const drawRouletteWheel = () => {
  let canvas = window.document.getElementById('wheelcanvas')
  if (canvas.getContext) {
  // 根据奖品个数计算圆周角度
    let arc = Math.PI / (turnplate.restaraunts.length / 2)
    let ctx = canvas.getContext('2d')
    // 在给定矩形内清空一个矩形
    ctx.clearRect(0, 0, 422, 422)
    // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
    ctx.strokeStyle = '#fff'
    // font 属性设置或返回画布上文本内容的当前字体属性
    ctx.font = '16px Microsoft YaHei'
    for (let i = 0; i < turnplate.restaraunts.length; i++) {
      let angle = turnplate.startAngle + i * arc
      ctx.fillStyle = turnplate.colors[i]
      ctx.beginPath()
      // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆)
      ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false)
      ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true)
      ctx.stroke()
      ctx.fill()
      // 锁画布(为了保存之前的画布状态)
      ctx.save()
      // ----绘制奖品开始----
      ctx.fillStyle = '#E5302F'
      let text = turnplate.restaraunts[i]
      let type = turnplate.ptype[i]
      let lineHeight = 17
      // translate方法重新映射画布上的 (0,0) 位置
      let translateX = 211 + Math.cos(angle + arc / 2) * turnplate.textRadius
      let translateY = 211 + Math.sin(angle + arc / 2) * turnplate.textRadius
      ctx.translate(translateX, translateY)
      // rotate方法旋转当前的绘图
      let rotateNum = angle + arc / 2 + Math.PI / 2
      ctx.rotate(rotateNum)
      /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
      if (text.indexOf('M') > 0) {  // 流量包
        let texts = text.split('M')
        for (let j = 0; j < texts.length; j++) {
          ctx.font = j === 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei'
          if (j === 0) {
            ctx.fillText(texts[j] + 'M', -ctx.measureText(texts[j] + 'M').width / 2, j * lineHeight)
          } else {
            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
          }
        }
      } else if (text.indexOf('M') === -1 && text.length > 6) {  // 奖品名称长度超过一定范围
        text = text.substring(0, 6) + '||' + text.substring(6)
        let texts = text.split('||')
        for (let j = 0; j < texts.length; j++) {
          ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
        }
      } else {
        //  在画布上绘制填色的文本。文本的默认颜色是黑色
        // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
        if (text.indexOf('再来一次') < 0) {
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
        }
      }
      let img = getImg(type, i)
      // 添加对应图标
      if (img != null) {
        if (type === 9 || type === 1) {
          ctx.drawImage(img, -30, 6, 60, 60)
        } else {
          ctx.drawImage(img, -30, 25, 60, 60)
        }
      }
      // 把当前画布返回（调整）到上一个save()状态之前
      ctx.restore()
    }
  }
}
export const initTurnplate = (awards, skinId) => {
  // 初始化转盘背景颜色
  let turnplateColor1
  let turnplateColor2
  switch (skinId) {
    case 6:
      turnplateColor1 = '#ffd531'
      turnplateColor2 = '#fabe38'
      break
    case 4:
      turnplateColor1 = '#fdd4e0'
      turnplateColor2 = '#fff'
      break
    case 3:
      turnplateColor1 = '#ffdd9a'
      turnplateColor2 = '#efc36d'
      break
    case 2:
      turnplateColor1 = '#c8ebff'
      turnplateColor2 = '#69cdff'
      break
    case 1:
    case 5:
      turnplateColor1 = '#ffdc64'
      turnplateColor2 = '#fcfa76'
      break
  }
  turnplate.restaraunts = []
  turnplate.ptype = []
  turnplate.colors = []
  for (let i = 0; i < awards.length; i++) {
    turnplate.restaraunts.push(awards[i].awardName)
    turnplate.ptype.push(awards[i].awardType)
    if (i % 2 === 0) {
      turnplate.colors.push(turnplateColor1)
    } else {
      turnplate.colors.push(turnplateColor2)
    }
  }
  drawRouletteWheel()
}
