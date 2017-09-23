<template>
  <div id="view-5" class="view tab active" v-title="'邮箱地址'">
    <div class="pages">
    <div class="page" data-page="bindEmail">
          <div class="page-content">
            <div class="content-block-title personal-msg-block-title">请填写邮箱地址</div>
              <div class="list-block">
                <ul>
                  <li>
                    <div class="item-content">
                      <div class="item-inner has-checkcode-btn">
                        <div class="item-title label">邮箱</div>
                        <div class="item-input">
                          <input v-model="email" type="email" placeholder="输入邮箱">
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
<script>
let Framework7 = require('framework7')
let myApp = new Framework7()
export default {
  data () {
    return {
      email: '',
      submitNum: 0
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
  },
  methods: {
    submit: function () {
      if (this.submitDisable) {
        return
      }
      let thisVue = this
      if (this.email === '') {
        myApp.alert('请输入邮箱', '')
      } else {
        // 判断邮箱格式是否正确
        if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.email))) {
          myApp.alert('请输入正确的邮箱', '')
        } else {
          this.submitNum = this.submitNum + 1
          if (this.submitNum === 1) {
            // 提交邮箱
            this.$http.get(this.$store.state.basePath + '/personalMessage/perfectMessage?email=' + this.email + '&type=5').then((response) => {
              let resp = response.body
              if (resp.err_code === 0) {
                this.$store.commit('setVipMessage', resp.vipUser)
                let popMessage = '提交成功'
                if (resp.awardIntegral > 0) {
                  popMessage += ',获得' + resp.awardIntegral + '积分'
                }
                myApp.alert(popMessage, '', function () {
                  thisVue.$router.replace({path: '/personalMsg?sellerNick=' + thisVue.$store.state.vipMessage.sellerNick})
                })
              }
              this.submitNum = 0
            })
          }
        }
      }
    }
  }
}
</script>
<style></style>