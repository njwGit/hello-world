<template>
	<div id="view-noActivity" class="view tab active" v-title="'更多互动'">
      <div class="pages">
        <!-- 全部互动列表 -->
        <div class="page" data-page="personal-message">
          <div class="page-content">
          	<div v-if="activities != null && activities.length > 0" class="list-block media-list btn-list">
                <ul>
                  <li v-for="act in activities">
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
          <div v-if="isNoActivity" class="nogift">
            <img src="/static/images/vipCenter/smile.png">
            <h2 class="">敬请期待</h2>
            <p>亲，店铺还没有任何活动~</p>
            <p><a href="javascript:;" v-on:click="toShop">进店逛逛</a></p>
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
      activities: [],
      actIconColor: {4: 'bg-red', 5: 'bg-purple', 7: 'bg-purple', 8: 'bg-ori', 10: 'bg-pink', 17: 'bg-green', 21: 'bg-green'},
      actIcon: {4: 'icon-sign', 5: 'icon-gailou', 7: 'icon-draw', 8: 'icon-collect', 10: 'icon-share', 17: 'icon-sign', 21: 'icon-yaoqing'},
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
    this.$store.commit('closeTabbarVisiable')
    let sellerNick = this.sellerNick == null ? this.$route.query.sellerNick : this.sellerNick
    this.$http.get(this.$store.state.basePath + '/vipCenter/allActivities?sellerNick=' + sellerNick).then((response) => {
      let resp = response.body
      if (resp.err_code === 0) {
        this.activities = resp.activities
      }
      this.isNoActivity = this.activities.length <= 0
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