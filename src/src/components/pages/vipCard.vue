<template>
<div class="view view-main vipCard" id="view-4" v-title="'会员卡'">
    <div class="pages">
      <div data-page="vipCard" class="page with-subnavbar">
        <div class="page-content">
          <div class="vipcard">
              <img class="cardImg" src="static/images/vipCenter/vipcard.png" alt="">
              <img class="logo" v-bind:src="shopMessage.shopLogo" alt="">
              <p class="shopname">{{shopMessage.shopNick}}</p>
              <p class="tname">会员：<span>{{vipMessage.name}}</span></p>
          </div>
          <div class="cardIntro">
            <p>会员须知</p>
            <p>您领取会员卡时，需要跟据网站要求绑定淘宝昵称；领取会员卡后，您可以使用会员互动的相关服务，如实物礼品兑换、虚拟礼品兑换、淘宝优惠兑换等；网站承诺不公开或透露您淘宝昵称、手机号码等在本站的非公开信息。除非因会员本人的需要、法律或其他合法程序的要求、服务条款的改变或修订等。</p>
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
    },
    shopMessage () {
      return this.$store.state.shopMessage
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
  }
}
</script>