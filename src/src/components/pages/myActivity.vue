<template>
<div class="view view-main myActivity" id="view-4" v-title="'我的活动'">
    <div class="pages">
      <div data-page="myActivity" class="page with-subnavbar">
        <div class="page-content">
              <div class="list-block media-list btn-list">
                <ul>
                  <li v-for="act in myActivities">
                    <div class="item-content">
                      <div class="item-media">
                        <div v-bind:class="['media-img', actIconColor[act.activity.type]]"><i v-bind:class="['iconfont', actIcon[act.activity.type]]"></i></div>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-titled">{{act.activity.title}}</div>
                        </div>
                        <div class="item-subtitle">{{act.createTime | formatDate}} {{act.status == 2 ? '领取' : ''}}</div>
                        <div class="item-right">
                            <a v-if="act.activity.status >= 3" href="javascript:;" class="button haschoose">已结束</a>
                            <a v-else-if="act.status == 2" href="javascript:;" class="button haschoose">已领奖</a>
                            <a v-else href="javascript:;" class="button" v-bind:data-actId="act.activity.id" v-on:click="toActivity">进行中</a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="isNoMyActivity" class="nogift">
                <img src="/static/images/vipCenter/smile.png">
                <p>亲！您还没参与店铺活动哦~</p><p><a href="javascript:;" v-on:click="allActivity">参与活动</a></p>
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
      myActivities: [],
      actIconColor: {4: 'bg-red', 5: 'bg-purple', 7: 'bg-purple', 8: 'bg-ori', 10: 'bg-pink', 17: 'bg-green', 21: 'bg-green'},
      actIcon: {4: 'icon-sign', 5: 'icon-gailou', 7: 'icon-draw', 8: 'icon-collect', 10: 'icon-share', 17: 'icon-sign', 21: 'icon-yaoqing'},
      isNoMyActivity: false
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    this.$http.get(this.$store.state.basePath + '/personalMessage/myActivities').then((response) => {
      let resp = response.body
      if (resp.err_code === 0) {
        this.myActivities = resp.myActivities
      }
      this.isNoMyActivity = this.myActivities.length <= 0
    })
  },
  computed: {
    sellerNick () {
      return this.$store.state.shopMessage.sellerNick
    }
  },
  methods: {
    toActivity: function (event) {
      let actId = event.target.getAttribute('data-actId')
      window.location.href = this.$store.state.basePath + '/activity/actDetail?actId=' + actId + '&sellerNick=' + this.sellerNick
    },
    allActivity: function () {
      let sellerNick = encodeURIComponent(this.sellerNick)
      this.$router.push({path: '/allActivities?sellerNick=' + sellerNick})
    }
  }
}
</script>