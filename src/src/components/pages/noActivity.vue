<template>
  <div id="view-noActivity" class="view tab active" v-title="title">
      <div class="pages">
        <!-- 个人信息列表页-->
        <div class="page" data-page="noActivity">
          <div class="page-content">
            <div class="nogift">
          <img src="/static/images/vipCenter/smile.png">
            <h2 class="">敬请期待</h2>
          <p>亲，店铺还没有该类活动~</p><p v-if="isNoActivity"><a href="javascript:;" v-on:click="toShop">进店逛逛</a></p>
        </div>
        <div v-if="recommendActivities != null && recommendActivities.length > 0" class="navbar list-title">
          <div class="navbar-inner">
            <div class="left">
              <img src="static/images/vipCenter/icon1.png" alt="" class="ticon">
              <span>活动推荐</span>
            </div> 
          </div>
        </div>
        <div v-if="recommendActivities != null && recommendActivities.length > 0" class="list-block media-list btn-list">
                <ul>
                  <li v-for="act in recommendActivities">
                    <div class="item-content">
                      <div class="item-media">
                        <div v-bind:class="['media-img', actIconColor[act.type]]"><i v-bind:class="['iconfont', actIcon[act.type]]"></i></div>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-titled">{{act.title}}</div>
                        </div>
                        <div class="item-subtitle">截止时间：{{act.endTime | formatDate}}</div>
                        <div class="item-right">
                            <a href="javascript:;" class="button" v-bind:data-actId="act.id" v-on:click="toActivity">参加</a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      recommendActivities: [],
      actIconColor: {4: 'bg-red', 5: 'bg-purple', 7: 'bg-purple', 8: 'bg-ori', 10: 'bg-pink', 17: 'bg-green', 21: 'bg-green'},
      actIcon: {4: 'icon-sign', 5: 'icon-gailou', 7: 'icon-draw', 8: 'icon-collect', 10: 'icon-share', 17: 'icon-sign', 21: 'icon-yaoqing'},
      titles: {4: '每日签到', 5: '微淘盖楼', 7: '幸运大转盘', 8: '关注店铺', 10: '分享有礼', 17: '完善信息', 21: '邀请有礼'},
      title: '互动大师',
      isNoActivity: false
    }
  },
  computed: {
    sellerNick () {
      return this.$store.state.shopMessage.sellerNick
    },
    shopLink () {
      return this.$store.state.shopMessage.shopLink
    }
  },
  created () {
    this.$store.commit('openTabbarVisiable')
    let sellerNick = this.$route.query.sellerNick
    this.$http.get(this.$store.state.basePath + '/activity/recommend?sellerNick=' + sellerNick).then((response) => {
      let resp = response.body
      if (resp.err_code === 0) {
        this.recommendActivities = resp.recommendActivities
      }
      this.isNoActivity = this.recommendActivities == null || this.recommendActivities.length <= 0
    })
  },
  methods: {
    toActivity: function (event) {
      let actId = event.target.getAttribute('data-actId')
      this.$router.push({path: '/activity/actDetail?actId=' + actId + '&sellerNick=' + this.sellerNick})
    },
    toShop: function () {
      window.location.href = this.shopLink
    }
  }
}
</script>