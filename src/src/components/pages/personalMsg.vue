<template>
  <div id="view-4" class="view tab active" v-title="'个人信息'">
      <div class="pages">
        <!-- 个人信息列表页-->
        <div class="page" data-page="personal-message">
          <div class="page-content">
            <div class="list-block">
              <ul>
                <li class="item-content personal-msg-avatar">
                  <div class="item-inner">
                    <div class="item-title">头像</div>
                    <div class="item-after">
                      <img v-if="vipMessage.level > 1" class="personal-msg-avatar-img" v-bind:src="vipMessage.avatar" alt="">
                      <img v-else class="personal-msg-avatar-img" src="static/images/vipCenter/head.png" alt="">
                    </div>
                  </div>
                </li>
                <li class="item-content">
              <div class="item-inner">
                <div class="item-title">淘宝昵称</div>
                <div class="item-after">{{vipMessage.name}}</div>
              </div>
            </li>
            <li>
              <a href="javascript:;" v-bind:class="[vipMessage.tel == null ? 'item-link' : '', 'item-content']">
                <div class="item-inner" v-on:click="toBindTel">
                  <div class="item-title">手机号码</div>
                    <div class="item-after">{{vipMessage.tel == null ? '填写手机，领取积分' : vipMessage.tel}}</div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title label">性别</div>
                  <div class="item-input">
                  <input type="text" v-bind:placeholder="vipMessage.sex == null ? '保密' : vipMessage.sex" id="picker-sex" style="text-align:right;color:#8e8e93;">
                </div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title label">生日</div>
                  <div class="item-input">
                  <input type="text" placeholder="" readonly id="picker-birthday" style="text-align:right;color:#8e8e93;">
                </div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:;" v-bind:class="[vipMessage.mail == null ? 'item-link' : '', 'item-content']">
                <div class="item-inner" v-on:click="toBindEmail">
                  <div class="item-title">邮箱</div>
                    <div class="item-after">{{vipMessage.mail == null ? '填写邮箱，领取积分' : vipMessage.mail}}</div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:;" v-bind:class="[vipMessage.address == null ? 'item-link' : '', 'item-content']">
                <div class="item-inner" v-on:click="selectProvince">
                  <div class="item-title">地区</div>
                    <div class="item-after">{{vipMessage.address == null ? '未填写' : vipMessage.address}}</div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="item-link item-content">
                <div class="item-inner" v-on:click="toAddressList">
                  <div class="item-title">收货地址</div>
                    <div class="item-after"></div>
                </div>
              </a>
            </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
let Framework7 = require('framework7')
let myApp = new Framework7()
let $$ = window.Dom7
var initDatePicker = function (thisVue) {
  console.log('初始化')
  // 初始化日期选择器
  let today = new Date()
  let openNum = 0
  if (thisVue.vipMessage.birthday != null) {
    today = new Date(thisVue.vipMessage.birthday)
  } else {
    today = new Date()
  }
  myApp.picker({
    input: '#picker-birthday',
    rotateEffect: true,
    toolbarCloseText: '完成',
    value: [today.getFullYear(), today.getMonth(), today.getDate()],
    onChange: function (picker, values, displayValues) {
      openNum = openNum + 1
      var daysInMonth = new Date(picker.value[0], picker.value[1] * 1 + 1, 0).getDate()
      if (values[2] > daysInMonth) {
        picker.cols[2].setValue(daysInMonth)
      }
    },
    formatValue: function (p, values, displayValues) {
      var result = values[0] + '-' + (parseInt(values[1], 10) + 1) + '-' + values[2]
      if (thisVue.vipMessage.birthday != null || openNum > 1) {
        return result
      }
      return '填写生日，领取积分'
    },
    onClose: function () {
      let birthday = $$('#picker-birthday').val()
      if (birthday == null || birthday === '') {
        return
      }
      let i = 1
      thisVue.$http.get(thisVue.$store.state.basePath + '/personalMessage/perfectMessage?birthday=' + birthday + '&type=4').then((response) => {
        console.log(i++)
        let resp = response.body
        if (resp.err_code === 0) {
          if (resp.awardIntegral != null && resp.awardIntegral > 0) {
            myApp.alert('完善信息成功，获得' + resp.awardIntegral + '积分', '')
          }
          thisVue.$store.commit('setVipMessage', resp.vipUser)
        }
      })
    },
    cols: [
// 年
      {
        values: (function () {
          var arr = []
          for (var i = 1950; i <= 2030; i++) { arr.push(i) }
          return arr
        })(),
        displayValues: (function () {
          var arr = []
          for (var i = 1950; i <= 2030; i++) { arr.push(i + '年') }
          return arr
        })()
      },
        // 月
      {
        values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
        displayValues: ('1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月').split(' ')
      },
        // 日
      {
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        displayValues: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日']
      }
    ]
  })
}
export default {
  computed: {
    vipMessage () {
      return this.$store.state.vipMessage
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
  },
  mounted () {
    let thisVue = this
    // 初始化性别选择器
    myApp.picker({
      input: '#picker-sex',
      toolbarCloseText: '完成',
      cols: [
        {
          textAlign: 'center',
          values: ['男', '女']
        }
      ],
      onClose: function (p) {
        let sex = $$('#picker-sex').val()
        if (sex == null || sex === '') {
          return
        }
        thisVue.$http.get(thisVue.$store.state.basePath + '/personalMessage/perfectMessage?sex=' + sex + '&type=3').then((response) => {
          let resp = response.body
          if (resp.err_code === 0) {
            if (resp.awardIntegral != null && resp.awardIntegral > 0) {
              myApp.alert('完善信息成功，获得' + resp.awardIntegral + '积分', '')
            }
            thisVue.$store.commit('setVipMessage', resp.vipUser)
          }
        })
      }
    })
    initDatePicker(thisVue)
  },
  updated () {
    // let thisVue = this
    // initDatePicker(thisVue)
  },
  methods: {
    toBindTel: function () {
      if (this.vipMessage.tel != null) {
        return
      }
      this.$router.push({path: '/bindTel?sellerNick=' + this.vipMessage.sellerNick})
    },
    toAddressList: function () {
      this.$router.push({path: '/addressList?sellerNick=' + this.vipMessage.sellerNick})
    },
    toBindEmail: function () {
      if (this.vipMessage.mail != null) {
        return
      }
      this.$router.push({path: '/bindMail?sellerNick=' + this.vipMessage.sellerNick})
    },
    selectProvince: function () {
      this.$router.push({path: '/listProvince?sellerNick=' + this.vipMessage.sellerNick})
    }
  }
}
</script>
<style></style>
