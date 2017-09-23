<template>
  <div id="view-2" class="view tab active integral_gift" v-title="'积分礼遇'">
      <div class="pages">
        <div data-page="index-2" class="page">
          <div class="page-content">
            <div class="navbar">
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link">
                        <span>当前积分：</span>
                    </a>
                </div>
                <div class="center curr_integral">{{vipMessage.integral}}</div>
                <div class="right">
                    <a href="#" class="link" v-on:click="exchangedDetail">
                      <span>兑换记录</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- 兑换列表-->
        <div v-if="giftList != null && giftList.length > 0" class="list-block media-list gift-list">
          <ul>
            <li v-for="(scoreAct,index) in giftList">
              <div class="item-content">
                <div class="item-media">
                  <img v-bind:src="scoreAct.scoreAward.awardType != 8 ? 'static/images/vipCenter/exchange_' + scoreAct.scoreAward.awardType + '.png' : scoreAct.scoreAward.awardSize" width="75">
                </div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">{{scoreAct.scoreAward.awardName}}</div>
                  </div>
                  <div class="item-text" style="pointer-events:none;">
                    {{scoreAct.scoreAward.awardTotal == 0 ? '数量无限' : '剩余'+(scoreAct.scoreAward.awardTotal - scoreAct.exchangedNum)+'份' }}<br>截止&nbsp;{{scoreAct.eTime | formatDate}}
            </div>
              <div class="item-subtitle" style="pointer-events:none;"><span class="needscore">{{scoreAct.needScore}}</span>积分</div>
              <span v-bind:data-index="index" class="gift-exchange" v-on:click.stop="exchangeGift">兑换</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="isNoGift" class="nogift">
          <img src="/static/images/vipCenter/smile.png">
            <h2 class="">敬请期待</h2>
          <p>店铺还没兑换礼品哦~</p><p><a href="javascript:;" v-on:click="toShop">进店逛逛</a></p>
        </div>
          </div>
        </div>
       </div>
    </div>
</template>
<script>
import {toBeMember} from '../../common/js/modals.js'
import {getSellerNick} from '../../common/js/common.js'
import {myApp} from '../../common/js/f7.js'
export default {
  data () {
    return {
      giftList: [],
      isNoGift: false
    }
  },
  computed: {
    vipMessage () {
      return this.$store.state.vipMessage
    },
    shopLink () {
      return this.$store.state.shopMessage.shopLink
    }
  },
  created () {
    this.$store.commit('openTabbarVisiable')
    let sellerNick = getSellerNick(this)
    // 获取积分兑换列表
    this.$http.get(this.$store.state.basePath + '/courtesy/giftList?sellerNick=' + sellerNick).then((response) => {
      let resp = response.body
      this.giftList = resp.scoreActs
      this.isNoGift = this.giftList.length <= 0
    })
  },
  updated () {
    let hash = this.$route.hash
    window.location.hash = hash
  },
  methods: {
    exchangeGift: function (event) {
      let thisVue = this
      let index = event.target.getAttribute('data-index')
      let gift = this.giftList[index]
      // 获取用户当前积分
      let currentIntegral = this.vipMessage.integral
      if (currentIntegral < gift.needScore) {
        // 积分不足
        myApp.modal({
          text: '主人，您的积分不够哦。',
          buttons: [
            {
              text: '取消'
            },
            {
              text: '去赚积分',
              bold: true,
              onClick: function () {
                thisVue.$router.replace({path: '/interaction', query: { sellerNick: thisVue.vipMessage.sellerNick }})
              }
            }
          ]
        })
      } else {
        // 兑换奖品
        myApp.modal({
          text: '主人，确认兑换？',
          buttons: [
            {
              text: '取消'
            },
            {
              text: '确定',
              bold: true,
              onClick: function () {
                // 获取奖品类型
                let awardType = gift.scoreAward.awardType
                if (awardType !== 8) {
                  thisVue.$http.get(thisVue.$store.state.basePath + '/courtesy/exchangeAward?actId=' + gift.id).then((response) => {
                    let resp = response.body
                    if (resp.err_code === 0) {
                      if (resp.awardResult == null || !resp.awardResult.isSend) {
                        myApp.modal({
                          text: resp.message,
                          buttons: [
                            {
                              text: '知道了',
                              bold: true,
                              onClick: function () {
                                if (resp.message === '亲，成为会员才能兑换哦！') {
                                  toBeMember(thisVue)
                                }
                              }
                            }
                          ]
                        })
                      } else {
                        // 兑换成功
                        let exchangeResult = resp.exchangeResult
                        switch (exchangeResult.awardType) {
                          case 2:
                            myApp.modal({
                              text: '兑换成功',
                              buttons: [
                                {
                                  text: '领取优惠券',
                                  bold: true,
                                  onClick: function () {
                                    window.location.href = exchangeResult.url
                                  }
                                }
                              ]
                            })
                            break
                          case 5:
                          case 6:
                            myApp.alert('可到我的淘宝-卡券包中查看', '兑换成功')
                            break
                          case 8:
                            myApp.alert('兑换成功', '')
                            break
                        }
                        thisVue.$store.commit('setVipMessage', resp.vipUser)
                        gift.exchangedNum += 1
                      }
                    } else {
                      myApp.modal({
                        text: '亲，系统出了个小猜，稍后再来',
                        buttons: [
                          {
                            text: '知道了',
                            bold: true
                          }
                        ]
                      })
                    }
                  })
                }
              }
            }
          ]
        })
      }
    },
    exchangedDetail: function () {
      this.$router.push({path: '/integralPrize?sellerNick=' + this.vipMessage.sellerNick + '#exchangeDetail'})
    },
    toShop: function () {
      window.location.href = this.shopLink
    }
  }
}
</script>

<style></style>