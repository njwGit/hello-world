<template>
  <div id="view-5" class="view tab active" v-title="'手机号码'">
      <div class="pages">
    <div class="page" data-page="bindTel">
          <div class="page-content">
            <div class="content-block-title personal-msg-block-title">未绑定手机号</div>
              <div class="list-block">
                <ul>
                  <li>
                    <div class="item-content">
                      <div class="item-inner has-checkcode-btn">
                        <div class="item-title label">手机号</div>
                        <div class="item-input">
                          <input v-model="tel" type="text" placeholder="请输入新手机号">
                        </div>
                        <div class="item-after">
                          <p>
                            <a href="javascript:;" class="button button-fill color-red button-round" v-on:click="getCheckCode" :disabled="disabled">{{codeTxt}}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">验证码</div>
                        <div class="item-input">
                          <input v-model="code" type="email" placeholder="请输入验证码">
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <p class="mglr05"><a href="javascript:;" class="button button-fill button-big color-red" v-on:click="submit">提交</a></p>
          </div>
        </div>
    </div>
  </div>
</template>
<script >
let Framework7 = require('framework7')
let myApp = new Framework7()
export default {
  data () {
    return {
      tel: '',
      code: '',
      codeTxt: '获取验证码',
      disabled: false,
      submitNum: 0
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
  },
  methods: {
    getCheckCode: function () {
      let _this = this
      if (this.tel === '') {
        myApp.alert('请输入手机号', '')
      } else if (!(/^1[34578]\d{9}$/.test(this.tel))) {
        myApp.alert('输入正确的手机格式', '')
      } else {
        this.$http.get(this.$store.state.basePath + '/personalMessage/sendCode?tel=' + this.tel).then((response) => {
          let resp = response.body
          if (resp.err_code === 0) {
            _this.disabled = true
            let second = 60
            for (var i = 0; i <= 60; i++) {
              window.setTimeout(function () {
                if (second !== 0) {
                  _this.codeTxt = second + 's后重发'
                  second--
                } else {
                  console.log('second等于0')
                  _this.codeTxt = '重新获取验证码'
                  _this.disabled = false
                }
              }, i * 1000)
            }
          } else {
            myApp.alert(resp.message, '')
          }
        })
      }
    },
    submit: function () {
      if (this.submitDisable) {
        return
      }
      let thisVue = this
      if (this.code === '') {
        myApp.alert('请输入验证码', '')
      } else if (this.tel === '') {
        myApp.alert('请输入手机号', '')
      } else if (!(/^1[34578]\d{9}$/.test(this.tel))) {
        myApp.alert('输入正确的手机格式', '')
      } else {
        this.submitNum = this.submitNum + 1
        if (this.submitNum === 1) {
          this.$http.get(this.$store.state.basePath + '/personalMessage/perfectMessage?tel=' + this.tel + '&verCode=' + this.code + '&type=2').then((response) => {
            let resp = response.body
            if (resp.err_code === 0 && resp.awardIntegral >= 0) {
              this.$store.commit('setVipMessage', resp.vipUser)
              let popMessage = '提交成功'
              if (resp.awardIntegral > 0) {
                popMessage += ',获得' + resp.awardIntegral + '积分'
              }
              myApp.alert(popMessage, '', function () {
                thisVue.$router.replace({path: '/personalMsg'})
              })
            } else {
              myApp.alert('验证码错误', '')
            }
            this.submitNum = 0
          })
        }
      }
    }
  }
}
</script>
<style ></style>