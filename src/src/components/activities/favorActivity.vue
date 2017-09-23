<template>
<transition name="slide">
	<div id="view-activityPage" class="view tab active" v-title="'关注店铺'">
    	<div class="pages">
			<div class="page" data-page="favorShoeActivity">
				<div class="page-content">
					<div class="collect_bg">
						<a v-if="userData.isFinish" href="javascript:;" class="weui_btn tb_btn" v-on:click="toPage(shopMessage.shopLink)">已参与过，进店逛逛</a>
						<a v-else href="javascript:;" v-on:click="favorShop" class="weui_btn tb_btn" id="collect_shop">关注店铺，领取好礼</a>
    			</div>
          <div v-if="showAwardModal" class="weui_dialog_alert" id="show_coupon">
            <div class="weui_mask"></div>
              <div class="weui_dialog coupon">
              <div class="close_btn" v-on:click="closeModal"></div>
              <div class="coupon_title">{{sendResult.result === 1 ? '亲，恭喜你' : shopMessage.shopNick}}</div>
              <div class="coupon_logo"><img :src="shopMessage.shopLogo" alt=""></div>
              <p class="coupon_text">{{modalText}}</p>
              <div class="coupon_bottom">
                <a v-if="sendResult.result === 1 && sendResult.awardResult.awardType === 2" href="javascript:;" class="weui_btn tb_btn receive_coupon_rightnow" v-on:click="toPage(sendResult.awardResult.url)">立即领取</a>
                <a v-else href="javascript:;" class="weui_btn tb_btn" v-on:click="toPage(shopMessage.shopLink)">进店逛逛</a>
                <a href="javascript;" class="weui_btn tb_btn" v-on:click="shareActivity">分享好友</a>
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
import {doFavor, doShare} from '../../common/js/tb.js'
export default {
  data () {
    return {
      baseMessage: {},
      extraMessage: {},
      userData: {},
      showAwardModal: false,
      sendResult: {},
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
    favorShop: function () {
      let vm = this
      // 点击关注店铺
      doFavor(vm.shopMessage, function () {
        vm.$http.get(vm.$store.state.basePath + '/favorite/doFavorite?actId=' + vm.baseMessage.id).then(response => {
          let resp = response.body
          if (resp.err_code === 0) {
            vm.sendResult = resp
            if (vm.sendResult.result === 1) {
              let str = vm.sendResult.awardResult.message
              let awardType = vm.sendResult.awardResult.awardType
              if (awardType === 5 || awardType === 6) {
                str = str + '<br>(可在我的淘宝-卡券包中查看)'
              }
              if (awardType === 1) {
                // 更新用户积分信息
                vm.$store.commit('setVipMessage', resp.vipMessage)
              }
              vm.modalText = str
              vm.userData.isFinish = true
            } else {
              vm.modalText = vm.sendResult.message
            }
            vm.showAwardModal = true
          }
        })
      })
    },
    closeModal: function () {
      // 关闭弹窗
      this.showAwardModal = false
    },
    toPage: function (url) {
      // 点击跳转页面
      window.location.href = url
    },
    shareActivity: function () {
      // 分享活动
      let params = {
        url: this.$route.fullPath,
        image: this.$store.state.basePath + '/static/images/share/share_tidaIcon.png',
        title: '参与活动赢奖品',
        content: '您的好友向您分享了有礼活动，赶快参加吧！'
      }
      doShare(params)
    }
  }
}
</script>