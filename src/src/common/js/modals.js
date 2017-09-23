import {myApp, $$} from './f7.js'
export const toBeMember = (thisVue) => {
  myApp.modal({
    title: '输入淘宝昵称，领取会员奖励',
    text: '<div class="input-field"><input type="text" name="modal-username" placeholder="请输入淘宝昵称" class="modal-text-input"></div>',
    buttons: [
      {
        text: '取消'
      },
      {
        text: '确定',
        bold: true,
        onClick: function () {
          let userName = $$(".modal-text-input[name='modal-username']").val()
          if (userName === '') {
            myApp.alert('请输入淘宝昵称', ' ')
          } else {
            thisVue.$http.get(thisVue.$store.state.basePath + '/personalMessage/perfectMessage?userName=' + userName + '&type=1').then((response) => {
              let resp = response.body
              if (resp.err_code === 0) {
                if (resp.awardIntegral === -1) {
                  myApp.alert('所输入的淘宝账号与当前账号不一致，请检查', ' ')
                } else {
                  let popMessage = '恭喜成为会员'
                  if (resp.awardIntegral > 0) {
                    popMessage += ',获得' + resp.awardIntegral + '积分'
                  }
                  myApp.alert(popMessage, ' ')
                  thisVue.$store.commit('setVipMessage', resp.vipUser)
                }
              }
            })
          }
        }
      }
    ]
  })
}
export const confirmModalWithoutTitle = (text, okCallback, cancelCallback) => {
  myApp.modal({
    text: text,
    buttons: [
      {
        text: '取消',
        onClick: function () {
          cancelCallback()
        }
      },
      {
        text: '确定',
        onClick: function () {
          okCallback()
        }
      }
    ]
  })
}
