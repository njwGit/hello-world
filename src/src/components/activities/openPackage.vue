<template>
<transition name="slide">
	<div id="view-activityPage" class="view tab active" v-title="'好友拆包'">
    	<div class="pages">
			<div class="page" data-page="openPackage">
				<div class="page-content">
					<div class="main_body">
						<div class="share_bg">
					        <img class="share_bg_img" src="/static/images/share/share_bg.png" alt="">
					    </div>
					    <div class="redbg">
					        <img class="redbg_img" src="/static/images/share/redpacket.png" alt="">
					        <p>亲，您的好友邀请您帮TA拆包！</p>
					        <a href="javascript:;" class="open_packet" v-on:click="openPackage"></a>
					    </div>
					    <div class="share_block">
					        <div class="block_title"><img src="/static/images/share/icon21.png" alt=""><span>活动规则</span></div>
					        <p>
					        	<template v-for="remark in activity.remarks">
					                {{remark}}<br>
					            </template>
					        </p>
					    </div>
					</div>
					<!--拆包成功的弹窗 -->
					<div v-if="isShowSuccessModal" class="alert_success alert_dialog">
					    <div class="alert_mask"></div>
					    <div class="alert_light"></div>
					    <div class="alert_con">
					        <div class="alert_title"><img src="/static/images/share/share_title.png"></div>
					        <p v-html="modalText"></p>
					        <div v-if="awardResult.awardType != 2" class="alert_btn">
					            <a href="javascript:;" class="img_btn" v-on:click="toShop">进店逛逛</a>
					            <a href="javascript:;" class="img_btn" v-on:click="toIndex">参加活动</a>
					        </div>
					       <div v-else class="alert_btn">
					            <a href="javascript:;" class="img_btn receive_coupon_rightnow">立即领取</a>
					       </div>
					    </div>
					</div>
					<!-- 拆包失败的弹窗 -->
					<div v-if="isShowFailModal" class="alert_fail alert_dialog">
					    <div class="alert_mask"></div>
					    <div class="alert_con">
					        <div class="alert_title"><img src="/static/images/share/fail_title.png"></div>
					        <p v-html="modalText"></p>
					        <div class="alert_btn">
					            <a href="javascript:;" class="img_btn" v-on:click="toShop">进店逛逛</a>
					            <a href="javascript:;" class="img_btn" v-on:click="toIndex">参加活动</a>
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
import {autoFavorShop} from '../../common/js/tb.js'
export default {
  data () {
    return {
      activity: {},
      isShowSuccessModal: false,
      isShowFailModal: false,
      awardResult: {},
      modalText: ''
    }
  },
  methods: {
    // 点击拆包
    openPackage: function () {
      if (this.$route.query.invitation === this.$store.state.vipMessage.nick) {
        this.modalText = '亲，不能帮自己拆包，<br>快邀请好友帮您拆包吧！'
        this.isShowFailModal = true
        this.isShowSuccessModal = false
      } else {
        // 自动关注店铺
        autoFavorShop(this.$store.state.shopMessage.sellerId)
        // 请求服务器进行拆包的数据处理
        this.$http.get(this.$store.state.basePath + '/SharingCourtesy/openPackage?actId=' + this.activity.id + '&invitation=' + this.$route.query.invitation).then(response => {
          let resp = response.body
          if (resp.err_code === 0) {
            this.isShowSuccessModal = true
            this.isShowFailModal = false
            this.modalText = '帮TA拆包成功，<br>你也快去参加活动吧～！'
          }
        })
      }
    },
    // 返回首页
    toIndex: function () {
      let sellerNick = encodeURIComponent(this.$store.state.shopMessage.sellerNick)
      this.$router.push('/interaction?sellerNick=' + sellerNick)
    },
    // 进店逛逛
    toShop: function () {
      window.location.href = this.$store.state.shopMessage.shopLink
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    let actId = this.$route.query.actId
    let invitation = encodeURIComponent(this.$route.query.invitation)
    this.$http.get(this.$store.state.basePath + '/SharingCourtesy/showPackingPage?actId=' + actId + '&invitation=' + invitation).then(response => {
      let resp = response.body
      if (resp.err_code === 0) {
        this.activity = resp.activity
        if (resp.isOpen) {
          this.modalText = '帮TA拆包成功，<br>你也快去参加活动吧～！'
          this.isShowSuccessModal = true
        }
      }
    })
  }
}
</script>