<template>
  <div id="view-1" class="view view-main tab active" v-title="'店铺会员中心'">
    <div class="pages">
      <div data-page="index-1" class="page">
        <div class="page-content">
        <!-- 会员信息 -->
          <div class="top_banner center_banner">
          <img class="center_banner_bg" v-bind:src="adList.length > 0 && adList[0].imgId == 0 ? adList[0].imgUrl : 'static/images/vipCenter/banner.png'">
                <div class="mask"></div>
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
                    <p v-on:click="beMember" class="weui_media_title personal_center_tovip" v-else><img src="static/images/vipCenter/iconv2.png" alt="">成为会员</p>
                  </div>
                </div>
          </div>
          <!--消息 -->
          <!-- <p class="notice"><i class="iconfont icon-laba"></i>{{notice}}</p> -->
          <!--互动模块 -->
          <div class="interaction-container entrance">
            <div class="interaction-list">
             <span class="interaction-module" >
                <a href="javascript:void(0);" v-on:click.self="clickActivityModule(4)"></a>
                <img src="static/images/vipCenter/icond1.png" alt="">
                <span>每日签到</span>
              </span>
              <span class="interaction-module" >
                <a href="javascript:void(0);" v-on:click.self="clickActivityModule(8)"></a>
                <img src="static/images/vipCenter/icond2.png" alt="">
                <span>关注店铺</span>
              </span>
              <span class="interaction-module" >
                <a href="javascript:void(0);" v-on:click.self="clickActivityModule(21)"></a>
                <img src="static/images/vipCenter/icond4.png" alt="">
                <span>邀请有礼</span>
              </span>
              <span class="interaction-module" >
                <a href="javascript:void(0);" v-on:click.self="clickActivityModule(17)"></a>
                <img src="static/images/vipCenter/icond7.png" alt="">
                <span>完善信息</span>
              </span>
            </div>
            <div class="interaction-list">
              <span class="interaction-module" >
                <a href="javascript:void(0);" v-on:click.self="clickActivityModule(10)"></a>
                <img src="static/images/vipCenter/icond3.png" alt="">
                <span>分享有礼</span>
              </span>
              <span class="interaction-module" >
                <a href="javascript:void(0);" v-on:click.self="clickActivityModule(7)"></a>
                <img src="static/images/vipCenter/icond5.png" alt="">
                <span>幸运大转盘</span>
              </span>
              <span class="interaction-module" >
                <a href="javascript:void(0);" v-on:click.self="clickActivityModule(5)"></a>
                <img src="static/images/vipCenter/icond6.png" alt="">
                <span>微淘盖楼</span>
              </span>
              <span class="interaction-module" >
                <a href="javascript:void(0);" v-on:click.self="clickActivityModule(0)"></a>
                <img src="static/images/vipCenter/icond8.png" alt="">
                <span>更多互动</span>
              </span>
            </div>
          </div>
          <!--广告幻灯片 -->
        <div class="swiper-container mgb08">
            <div class="swiper-wrapper">
                <div v-for="ad in adList" v-if="ad.imgId != 0" class="swiper-slide interaction-ad">
                    <a class="ad-link">
                      <img alt="" v-bind:src="ad.imgUrl" v-bind:style="{height:adImgHeight}" v-on:click="toAdPage(ad.imgLine)">
                    </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <!-- 礼品推荐-->
        <div class="navbar navbar-white list-title">
            <div class="navbar-inner">
                <div class="left">
                    <img src="static/images/vipCenter/icon1.png" alt="" class="ticon"><span>礼品推荐</span>
                </div>
                <div class="right more">
                    <router-link v-bind:to="'/courtesy?sellerNick=' + shopMessage.sellerNick" class="link">
                      <span>更多</span>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 推荐礼品列表-->
        <div class="list-block media-list gift-list">
        <p v-if="isNoGift" class="no-act">亲，店铺还没设置积分兑换活动哦~</p>
          <ul>
            <li v-for="(recommendGift, index) in recommendGiftList">
              <a href="javascript:;" class="item-link item-content">
                <div class="item-media">
                  <img v-bind:src="recommendGift.scoreAward.awardType != 8 ? 'static/images/vipCenter/exchange_' + recommendGift.scoreAward.awardType + '.png' : recommendGift.scoreAward.awardSize" width="60">
                </div>
                <div class="item-inner" v-on:click="toGift">
                  <div class="item-title-row" v-bind:data-index="index">
                    <div class="item-title" v-bind:data-index="index">{{recommendGift.scoreAward.awardName}}</div>
                  </div>
                  <div class="item-text" v-bind:data-index="index">{{recommendGift.needScore}}积分</div>
                </div>
              </a>
            </li>
          </ul>
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
      // notice: '耶****通过签到获得10积分',
      adList: [],
      recommendGiftList: [],
      adImgHeight: document.body.offsetWidth / (75 / 18),
      isNoGift: false
    }
  },
  methods: {
    clickActivityModule: function (actType) {
      // 点击豆腐块
      // 判断模块类型
      if (actType === 0) {
        // 更多互动
        this.$router.push({path: '/allActivities?sellerNick=' + this.vipMessage.sellerNick})
      } else if (actType === 17) {
        // 完善信息
        this.$router.push({path: '/personalMsg?sellerNick=' + this.vipMessage.sellerNick})
      } else {
        this.$router.push({path: '/activity/actDetail', query: {type: actType, sellerNick: this.vipMessage.sellerNick}})
      }
    },
    beMember: function () {
      // 点击成为会员按钮
      toBeMember(this)
    },
    toAdPage: function (imgLine) {
      if (imgLine == null || imgLine === '') {
        return
      }
      window.location.href = imgLine
    },
    toGift: function (event) {
      let index = event.target.getAttribute('data-index')
      let gift = this.recommendGiftList[index]
      this.$router.push({path: '/courtesy?sellerNick=' + this.vipMessage.sellerNick + '#' + gift.id})
    }
  },
  computed: {
    vipMessage () {
      return this.$store.state.vipMessage
    },
    shopMessage () {
      return this.$store.state.shopMessage
    }
  },
  created () {
    this.$store.commit('openTabbarVisiable')
    // 获取会员中心信息（如：广告信息、推荐兑换礼品信息等）
    let sellerNick = getSellerNick(this)
    this.$http.get(this.$store.state.basePath + '/vipCenter/indexMessage?sellerNick=' + sellerNick).then((response) => {
      let resp = response.body
      this.adList = resp.indexAds
      this.recommendGiftList = resp.recommendScoreActs
    })
  },
  updated () {
    // 初始化广告轮播插件
    myApp.swiper('.swiper-container', {
      pagination: '.swiper-pagination'
    })
  }
}
</script>
<style>
  .more:after{
    display: none;
  }
</style>
