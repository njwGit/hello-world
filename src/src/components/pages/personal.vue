<template>
	<div id="view-3" class="view tab per-center active" v-title="'个人中心'">
        <div class="pages navbar-fixed">
          <div class="page">
            <div class="page-content">
            <!-- 会员信息 -->
			    <div class="top_banner per_center_banner">
			    	<div class="weui_panel_bd">
	                  <div class="weui_media_box weui_media_appmsg">
	                    <div class="weui_media_hd">
	                      <img v-if="vipMessage.level > 1" class="weui_media_appmsg_thumb member_avatar" v-bind:src="vipMessage.avatar">
                      <img v-else class="weui_media_appmsg_thumb member_avatar" src="static/images/vipCenter/head.png">
	                    </div>
	                    <div class="weui_media_bd">
	                      <h4 class="weui_media_title personal_center_nick">{{vipMessage.name}}</h4>
	                    <p class="personal_center_point">{{vipMessage.integral}}积分</p>
	                    </div>
	                    <p v-if="vipMessage.level > 1" class="weui_media_title personal_center_shop_vip"><img src="static/images/vipCenter/iconv1.png" alt="">店铺会员</p>
	                    <p class="weui_media_title personal_center_tovip" v-else><img src="static/images/vipCenter/iconv2.png" alt="">普通客户</p>
	                  </div>
	                </div>
			    </div>
			  <div class="list-block sortable">
			    <ul>
			      <li>
			        <div class="item-content item-link">
			          <div class="item-media"><i class="iconfont icon-collect col-pink"></i></div>
			          <div class="item-inner" v-on:click="ToMyActivity">
			            <div class="item-title">我的活动</div>
			            <div class="item-after"></div>
			          </div>
			        </div>
			      </li>
			      <li>
			        <div class="item-content item-link">
			          <div class="item-media"><i class="iconfont icon-liwu1 col-ori"></i></div>
			          <div class="item-inner" v-on:click="ToIntegralPrize">
			            <div class="item-title">积分奖品</div>
			            <div class="item-after"></div>
			          </div>
			        </div>
			      </li>
			      <li>
			        <div class="item-content item-link">
			          <div class="item-media"><i class="iconfont icon-geren1 col-blue"></i></div>
			          <div class="item-inner" v-on:click="personalMessage">
			            <div class="item-title">个人信息</div>
			            <div class="item-after">完善信息赚积分</div>
			          </div>
			        </div>
			      </li>
			      <li>
			        <div class="item-content item-link">
			          <div class="item-media"><i class="iconfont icon-vip col-yel"></i></div>
			          <div class="item-inner" v-on:click="ToVipCard">
			            <div class="item-title">会员卡</div>
			            <div class="item-after"></div>
			          </div>
			        </div>
			      </li>
			      <!-- <li>
			        <div class="item-content item-link">
			          <div class="item-media"><i class="iconfont icon-dengjiv col-yel"></i></div>
			          <div class="item-inner">
			            <div class="item-title">会员特权</div>
			            <div class="item-after"></div>
			          </div>
			        </div>
			      </li> -->
			    </ul>
			   </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
  computed: {
    vipMessage () {
      return this.$store.state.vipMessage
    }
  },
  methods: {
    personalMessage: function () {
      this.$router.push({path: '/personalMsg?sellerNick=' + this.vipMessage.sellerNick})
    },
    ToMyActivity: function () {
      this.$router.push({path: '/myActivity?sellerNick=' + this.vipMessage.sellerNick})
    },
    ToIntegralPrize: function () {
      this.$router.push({path: '/integralPrize?sellerNick=' + this.vipMessage.sellerNick})
    },
    ToVipCard: function () {
      this.$router.push({path: '/vipCard?sellerNick=' + this.vipMessage.sellerNick})
    }
  },
  created () {
    this.$store.commit('openTabbarVisiable')
  }
}
</script>
<style></style>