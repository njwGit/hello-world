<template>
<div class="view view-main integralPrize" id="view-4" v-title="'积分奖品'">
    <div class="navbar">
        <div class="subnavbar">
          <div class="buttons-row">
            <a href="#tab1" v-bind:class="['tab-link', visiableTab == 'awardDetail' ? 'active' : '']">奖品明细</a>
            <a href="#tab2" v-bind:class="['tab-link', visiableTab == 'exchangeDetail' ? 'active' : '']">积分兑换</a>
          </div>
        </div>
    </div>
    <div class="pages navbar-through">
      <!-- Pag has additional "with-subnavbar" class -->
      <div data-page="integralPrize" class="page with-subnavbar">
        <div class="page-content hide-bars-on-scroll">
          <div class="tabs">
            <div id="tab1" v-bind:class="['tab', visiableTab == 'awardDetail' ? 'active' : '']">
            <div v-if="isNoAward" class="nogift" v-bind:style="{height:deviceHeight}">
              <img src="/static/images/vipCenter/smile.png">
              <p>参与活动，领取更多奖品~</p>
              <p><a href="javascript:;" v-on:click="toIndex">参与活动</a></p>
            </div>
              <div class="list-block media-list btn-list">
                <ul>
                  <li v-for="detail in awardDetail">
                    <div class="item-content">
                      <div class="item-media">
                        <div v-bind:class="['media-img', actIconColor[detail.activity.type]]"><i v-bind:class="['iconfont', actIcon[detail.activity.type]]"></i></div>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-titled">{{detail.activity.title}}</div>
                        </div>
                        <div class="item-subtitle">{{detail.createTime | formatDate}} 领取</div>
                        <div class="item-right">
                            <span v-if="detail.awardType == '1'" class="col-red">+{{detail.denomination}}积分</span>
                            <span v-else-if="detail.awardType == '2'" class="col-red">{{detail.denomination}}元店铺优惠券</span>
                            <span v-else-if="detail.awardType == '5'" class="col-red">{{detail.denomination}}M流量</span>
                            <span v-else-if="detail.awardType == '6'" class="col-red">{{detail.denomination}}元支付宝红包</span>
                            <span v-else-if="detail.awardType == '8'" class="col-red">{{detail.awardName == null ? '实物奖品' : detail.awardName}}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div id="tab2" v-bind:class="['tab', visiableTab == 'exchangeDetail' ? 'active' : '']">
              <div v-if="isNoExchange" class="nogift" v-bind:style="{height:deviceHeight}">
                <img src="/static/images/vipCenter/smile.png">
                <p>暂无兑换记录<br>参与活动，赚取积分~</p>
                <p><a href="javascript:;" v-on:click="toIndex">参与活动</a></p>
              </div>
              <div class="list-block media-list btn-list">
                <ul>
                  <li v-for="detail in exchangeDetail">
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-titled">{{detail.activity.scoreAward.awardName}} * {{detail.orderNum}}</div>
                        </div>
                        <div class="item-subtitle">{{detail.createTime | formatDate}} 领取</div>
                        <div class="item-right">
                            <span class="col-red">-{{detail.score * detail.orderNum}}积分</span>
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
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      deviceHeight: document.documentElement.clientHeight - 100 + 'px',
      visiableTab: 'awardDetail',
      awardDetail: [],
      exchangeDetail: [],
      actIconColor: {4: 'bg-red', 5: 'bg-purple', 7: 'bg-purple', 8: 'bg-ori', 10: 'bg-pink', 17: 'bg-green', 21: 'bg-green'},
      actIcon: {4: 'icon-sign', 5: 'icon-gailou', 7: 'icon-draw', 8: 'icon-collect', 10: 'icon-share', 17: 'icon-sign', 21: 'icon-yaoqing'},
      isNoAward: false,
      isNoExchange: false
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    let tab = window.location.hash
    if (tab == null || tab === '') {
      this.visiableTab = 'awardDetail'
    } else {
      this.visiableTab = tab.substring(1, tab.length)
    }
    // 获取获奖和积分兑换明细
    this.$http.get(this.$store.state.basePath + '/personalMessage/awardAndExchangeDetail').then((response) => {
      let resp = response.body
      if (resp.err_code === 0) {
        this.awardDetail = resp.awardDetail
        this.exchangeDetail = resp.exchangeDetail
        this.isNoAward = this.awardDetail.length <= 0
        this.isNoExchange = this.exchangeDetail.length <= 0
      }
    })
  },
  methods: {
    toIndex: function () {
      this.$router.replace({path: '/interaction', query: { sellerNick: this.$store.state.vipMessage.sellerNick }})
    }
  }
}
</script>