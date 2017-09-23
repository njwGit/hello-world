<template>
<transition name="slide">
<div id="view-activityPage" class="view tab active" v-title="'每日签到'">
  <div class="pages">
	<div class="page" data-page="signActivity">
		<div class="page-content">
			<div class="sign" >
            	<div id="sd-sign" style="height:100%;">
                	<div class="sign_bg">
                    	<img src="/static/images/sign/sign_bg.png" alt="" class="sign_bg_img">
                	</div>
                	<div class="sign_content">
                    	<div>
	                        <label id="sd-date" class="sd-color-2">{{currentDate}}</label>
		                        <label class="small sd-color-2" style="float:right;">已连续签到：
		                        	<span id="sd-signDay" class="sd-color-4">{{userData.continuesSignDays}}天</span>
		                        </label>
                    	</div>
	                    <div class="sd-sign-table">
	                        <table class="sd-table">
	                            <thead>
	                                <th>日</th>
	                                <th>一</th>
	                                <th>二</th>
	                                <th>三</th>
	                                <th>四</th>
	                                <th>五</th>
	                                <th>六</th>
	                            </thead>
	                            <tbody id="sd-sign-tableList">
	                            	<tr v-for="(row, index1) in day_row">
	                            		<td v-for="(day, index2) in row" v-bind:class="{'sd-signed': isSignFlag[day], 'sd-gift': day === continuesSignAwardDay && !isSignFlag[day]}">
	                            			<div v-if="day === today" class="sd-sign-today">{{day}}</div>
	                            			<template v-else>{{day}}</template>
	                            		</td>
	                            	</tr>
	                            </tbody>
	                        </table>
	                    </div>
                	</div>
                <div class="sd-sign-end">
                    <div id="btn_sign" class="sign_button" v-if="userData.isSignToday">
                        <img class="" src="/static/images/sign/signed_btn.png">
                    </div>
                    <div id="btn_sign" class="sign_button" v-else>
                        <img class="no_sign_today" v-on:click="sign" src="/static/images/sign/sign_btn.png">
                    </div>		
                </div>
                <div class="sign_rule sign_block">
                    <div class="block_title">活动规则</div>
                    <p>
                       <template v-for="remark in baseMessage.remarks">{{remark}}<br></template>
                    </p>
                </div>
            </div>
        </div>
        <!-- 签到成功弹窗 -->
        <div v-if="showAwardSuccessModal" class="alert_success alert_dialog alert_pink">
          <div class="alert_mask"></div>
          <div class="alert_light"></div>
          <div class="alert_con">
            <div class="alert_title">
              <img src="/static/images/sign/sign_title.png">
            </div>
            <div class="prize_bg">
              <img class="prize_bg_img" :src="'/static/images/coupon/' + prize_bg_img + '.png'" alt="">
              <div v-if="sendResult.awardResult.awardType != 1" class="prize_c">
                <div>
                  {{span_prize_text}}
                </div>
              </div>
            </div>
            <p>签到成功，获得<span>{{prize_val_text}}</span>！</p>
            <div class="alert_btn">
              <a v-if="sendResult.awardResult.awardType != 2" v-on:click="disposeModal" href="javascript:;" class="pink_okbtn"></a>
              <a v-else href="javascript:;" class="pink_rightnow_btn receive_coupon_rightnow"></a>
            </div>
          </div>
        </div>
        <!-- 签到失败弹窗 -->
        <div v-if="showAwardFaileModal" class="alert_fail alert_dialog alert_pink">
          <div class="alert_mask"></div>
          <div class="alert_con">
              <div class="alert_title"><img src="/static/images/sign/sign_fail.png"></div>
              <p>{{faileModalText}}</p>
              <div class="alert_btn">
                  <a href="javascript:;" v-on:click="toPage(shopMessage.shopLink)" class="pink_btn">进店逛逛</a>
                  <a href="javascript:;" v-on:click="toIndex" class="pink_btn">更多活动</a>
              </div>
          </div>
        </div>
		</div>
	</div>
</div>
</div>
</transition>
</template>
<script>
import {init} from '../../common/js/sign.js'
export default {
  data () {
    return {
      baseMessage: {},
      extraMessage: {},
      userData: {},
      currentDate: '',
      day_row: [],
      isSignFlag: {},
      today: new Date().getDate(),
      continuesSignAwardDay: 0,
      sendResult: {},
      prize_bg_img: '',
      prize_val_text: '',
      span_prize_text: '',
      showAwardSuccessModal: false,
      showAwardFaileModal: false,
      faileModalText: ''
    }
  },
  methods: {
    sign: function () {
      // 请求服务器进行签到
      this.$http.get(this.$store.state.basePath + '/sign/doSign?actId=' + this.baseMessage.id).then(response => {
        let resp = response.body
        if (resp.err_code === 0) {
          this.sendResult = resp
          if (this.sendResult.result === 1) {
            // 签到成功
            // 设置签到按钮为已签到
            this.userData.isSignToday = true
            // 把签到对应的日期打钩
            this.isSignFlag[this.today] = true
            this.userData.continuesSignDays = this.userData.continuesSignDays + 1
            if (this.today === this.continuesSignAwardDay) {
              this.continuesSignAwardDay = 0
            }
            let awardType = this.sendResult.awardResult.awardType
            let val = this.sendResult.awardResult.denomination
            switch (awardType) {
              case 5:
                this.prize_bg_img = 'flow'
                this.prize_val_text = val + 'MB手机流量'
                this.span_prize_text = '<span class="num">' + val + '</span><span>MB</span>'
                break
              case 2:
                this.prize_bg_img = 'coupon_bg'
                this.prize_val_text = val + '元店铺优惠券'
                this.span_prize_text = '<span class="num">' + val + '</span><span>元</span>'
                break
              case 6:
                this.prize_bg_img = 'red_bg'
                this.prize_val_text = val + '元支付宝红包'
                this.span_prize_text = '<span class="num">' + val + '</span><span>元</span>'
                break
              case 1:
                this.prize_bg_img = 'jifen_bg'
                this.prize_val_text = val + '积分'
                this.$store.commit('setVipMessage', resp.vipMessage)
                break
            }
            this.showAwardSuccessModal = true
            this.showAwardFaileModal = false
          } else {
            this.faileModalText = this.sendResult.message
            this.showAwardSuccessModal = false
            this.showAwardFaileModal = true
          }
        }
      })
    },
    toIndex: function () {
      this.$router.push('/interaction?sellerNick=' + this.shopMessage.sellerNick)
    },
    disposeModal: function () {
      this.showAwardSuccessModal = false
    },
    toPage: function (url) {
      // 点击跳转页面
      window.location.href = url
    }
  },
  computed: {
    shopMessage () {
      return this.$store.state.shopMessage
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    this.baseMessage = this.$store.state.activity.baseMessage
    this.extraMessage = this.$store.state.activity.extraMessage
    this.userData = this.$store.state.activity.userData
    if (this.baseMessage.id == null) {
      this.$http.post(this.$store.state.basePath + '/activity/detail', this.$route.query, {
        emulateJSON: true
      }).then(response => {
        let resp = response.body
        this.baseMessage = resp.baseMessage
        this.extraMessage = resp.extraMessage
        this.userData = resp.userData
        init(this)
      })
    } else {
      init(this)
    }
  }
}
</script>