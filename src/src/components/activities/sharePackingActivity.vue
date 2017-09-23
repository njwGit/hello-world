<template>
<transition name="slide">
	<div id="view-activityPage" class="view tab active" v-title="'分享有礼'">
    	<div class="pages">
			<div class="page" data-page="sharePackingActivity">
				<div class="page-content">
					<div class="main_body">
						<div class="share_bg">
					        <img class="share_bg_img" src="/static/images/share/share_bg.png" alt="">
					    </div>
					    <!-- 奖品 -->
					    <div class="prize_bg">
					    	<template v-if="extraMessage.awardType == 2">
					    		<img class="prize_bg_img" src="/static/images/coupon/coupon_bg.png" alt="">
				                <div class="prize_c">
				                    <div>
				                        <span class="num">{{extraMessage.award}}</span><span>元</span>
				                    </div>
				                </div>
					    	</template>
					        <template v-else-if="extraMessage.awardType == 5">
					        	<img class="prize_bg_img" src="/static/images/coupon/flow.png" alt="">
				                <div class="prize_c">
				                    <div>
				                        <span class="num">{{extraMessage.award}}</span><span>MB</span>
				                    </div>
				                </div>
					        </template>
			                <template v-else-if="extraMessage.awardType == 6">
			                	<img class="prize_bg_img" src="/static/images/coupon/red_bg.png" alt="">
				                <div class="prize_c">
				                    <div>
				                        <span class="num">{{extraMessage.award}}</span><span>元</span>
				                    </div>
				                </div>
			                </template>
					    </div>
					    <div class="text_c message">
					        <p>已邀请<span class="big_red">{{userData.alreadyNum }}</span>位好友</p>
					        <p>再邀请<span class="big_red">{{userData.restNum}}</span>位可获得<span>
					        {{extraMessage.award}}
					            <template v-if="extraMessage.awardType == 2">
					            	元优惠券
					            </template>
					            <template v-else-if="extraMessage.awardType == 5">
					            	MB流量
					            </template>
					            <template v-else-if="extraMessage.awardType == 6">
					            	元支付宝红包
					            </template>
					        </span></p>
					    </div>
					    <div class="bottom_btn text_c fz16">
					        <a href="javascript:;" class="weui_btn tb_btn_round btn_red" v-on:click="invivateFriend"><span>邀请好友</span></a>
				            <a v-if="userData.isFinish" href="javascript:;" class="weui_btn tb_btn_round btn_orig btn_gray"><span>已领取</span></a>
				            <a v-else href="javascript:;" class="weui_btn tb_btn_round btn_orig" id="receive" v-on:click="receiveAward"><span>领取奖励</span></a>
					    </div>
					    <div class="share_block">
					        <div class="block_title"><img src="/static/images/share/icon21.png" alt=""><span>活动规则</span></div>
					        <p>
					        	<template v-for="remark in baseMessage.remarks">
					        		{{remark}}<br>
					        	</template>
					        </p>
					    </div>
					</div>
					<!-- 成功领取奖励的弹窗 -->
					<div v-if="showAwardSuccessModal" class="alert_success alert_dialog">
					    <div class="alert_mask"></div>
					    <div class="alert_light"></div>
					    <div class="alert_con">
					        <div class="alert_title"><img src="/static/images/share/share_oktitle.png"></div>
					        <p v-html="modalText"></p>
				        	<div class="alert_btn">
					            <a href="javascript:;" v-on:click="toShop" class="img_btn">进店逛逛</a>
					            <a href="javascript:;" v-on:click="toIndex" class="img_btn">参加活动</a>
					    	</div>
					    </div>
					</div>
					<!--领取奖励失败的弹窗 -->
					<div v-if="showAwardFaileModal" class="alert_fail alert_dialog">
					    <div class="alert_mask"></div>
					    <div class="alert_con">
					        <div class="alert_title"><img src="/static/images/share/fail_title.png"></div>
					        <p v-html="modalText"></p>
					        <div class="alert_btn">
					            <a href="javascript:;" v-on:click="toShop" class="img_btn">进店逛逛</a>
					            <a href="javascript:;" v-on:click="toIndex" class="img_btn">参加活动</a>
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
import {doShare} from '../../common/js/tb.js'
export default {
  data () {
    return {
      baseMessage: {},
      extraMessage: {},
      userData: {},
      showAwardSuccessModal: false,
      showAwardFaileModal: false,
      modalText: ''
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
      })
    }
  },
  methods: {
    // 点击领取奖励按钮触发
    receiveAward: function () {
      this.$http.get(this.$store.state.basePath + '/SharingCourtesy/getAward?actId=' + this.baseMessage.id).then(response => {
        let resp = response.body
        if (resp.err_code === 0) {
          let result = resp.result
          switch (result) {
            case 0:
              this.modalText = '亲，您还需要<br>邀请' + resp.rest + '位好友才能领取'
              this.showAwardFaileModal = true
              this.showAwardSuccessModal = false
              break
            case 1:
              let awardResult = resp.awardResult
              this.modalText = '恭喜获得<br>' + awardResult.denomination
              switch (awardResult.awardType) {
                case 1:
                  this.modalText = this.modalText + '积分'
                  break
                case 2:
                  this.modalText = this.modalText + '元优惠券'
                  break
                case 5:
                  this.modalText = this.modalText + 'MB手机流量'
                  break
                case 6:
                  this.modalText = this.modalText + '元支付宝红包'
                  break
              }
              this.showAwardSuccessModal = true
              this.showAwardFaileModal = false
              break
            case 2:
              this.modalText = '亲，奖品已发完<br>看看别的活动吧～'
              this.showAwardFaileModal = true
              this.showAwardSuccessModal = false
              break
          }
        }
      })
    },
    // 返回首页
    toIndex: function () {
      this.$router.push('/interaction?sellerNick=' + this.shopMessage.sellerNick)
    },
    // 进店逛逛
    toShop: function () {
      window.location.href = this.shopMessage.shopLink
    },
    // 邀请好友
    invivateFriend: function () {
      // 增加分享记录
      this.$http.get(this.$store.state.basePath + '/SharingCourtesy/invivateFriend?actId=' + this.baseMessage.id).then(response => {
        console.log(response.body)
      })
      // 弹出分享窗口
      let sellerNick = encodeURIComponent(this.shopMessage.sellerNick)
      let invitation = encodeURIComponent(this.$store.state.vipMessage.nick)
      let params = {
        url: this.$store.state.basePath + '/sharePacking/task?actId=' + this.baseMessage.id + '&sellerNick=' + sellerNick + '&invitation=' + invitation,
        image: this.$store.state.basePath + '/static/images/share/share_tidaIcon.png',
        title: '分享拆包有礼',
        content: '分享拆包有好礼，您的好友邀请您帮Ta完成拆包任务，赶紧去完成吧'
      }
      doShare(params)
    }
  }
}
</script>