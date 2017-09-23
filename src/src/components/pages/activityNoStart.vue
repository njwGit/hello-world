<template>
	<div id="view-overdue" class="view tab active integral_gift" v-title="'活动未开始'">
      <div class="pages">
        <div data-page="index-overdue" class="page">
          <div class="page-content">
          	<div class="exception">
		        <img class="exc_img" src="/static/images/error/error.png">
		        <p class="tip">亲，活动还未开始哦～</p>
		        <p class="tips">先去看看别的吧～</p>
		        <div class="bottom_btn">
		            <a href="javascript:;" class="weui_btn tb_btn_round btn_red" v-on:click="toShop"><span>进店逛逛</span></a>
		            <a href="javascript:;" class="weui_btn tb_btn_round btn_orig" v-on:click="toIndex"><span>更多有礼活动</span></a>
		        </div>
		    </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    toShop: function () {
      // 进店逛逛
      window.location.href = this.$store.state.shopMessage.shopLink
    },
    toIndex: function () {
      let sellerNick = encodeURIComponent(this.$store.state.shopMessage.sellerNick)
      this.$router.push('/interaction?sellerNick=' + sellerNick)
    }
  }
}
</script>