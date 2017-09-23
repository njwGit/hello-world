const buildCal = (y, m, thisVue) => {
  let month = []
  month[0] = []
  month[1] = []
  month[2] = []
  month[3] = []
  month[4] = []
  month[5] = []
  // 获取当月第一天
  let xDate = new Date(y, m - 1, 1)
  let day = xDate.getDay()
  // 获取当月的总天数
  let yDate = new Date(y, m, 0)
  let days = yDate.getDate()
  let w
  let d
  let k = 1   //  k是日期数，如1-31
  // 设置第一天的位置
  for (d = day; d < 7; d++) {
    month[0][d] = k
    k++
  }
  for (w = 1; w < 6; w++) {
    for (d = 0; d < 7; d++) {
      if (k <= days) {
        month[w][d] = k
        k++
      }
    }
  }
  return month
}
export const init = (thisVue) => {
  let date = new Date()
  let curYear = date.getFullYear()
  let curMonth = date.getMonth() + 1
  thisVue.currentDate = curYear + '.' + (curMonth > 9 ? curMonth : ('0' + curMonth))
  let month = buildCal(curYear, curMonth, thisVue)
  thisVue.day_row = month
  // 初始化已经签到的日期
  for (let i = 0; i < thisVue.userData.signDateList.length; i++) {
    let d = parseInt(thisVue.userData.signDateList[i], 10)
    thisVue.isSignFlag.name = d
    thisVue.isSignFlag[d] = true
  }
  // 初始化距离连续签到的日期
  if (thisVue.userData.distance !== -1) {
    if (!thisVue.userData.isSignToday) {
      thisVue.continuesSignAwardDay = thisVue.today + thisVue.userData.distance - 1
    } else {
      thisVue.continuesSignAwardDay = thisVue.today + thisVue.userData.distance
    }
  } else {
    thisVue.continuesSignAwardDay = 0
  }
}
