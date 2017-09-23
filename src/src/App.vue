<template>
    <div id="app" class="views tabs toolbar-through">
    <!-- 内容区 -->
    <router-view></router-view>
    <!-- 底部tab栏 -->
      <div v-if="tabbarVisiable" class="toolbar tabbar tabbar-labels">
        <div class="toolbar-inner">
          <router-link v-bind:replace="true" v-bind:to="'/interaction?sellerNick=' + shopMessage.sellerNick" class="tab-link">
            <i class="iconfont icon-shangchengicon21"></i>
            <span class="tabbar-label">会员互动</span>
          </router-link>
          <router-link v-bind:replace="true" v-bind:to="'/courtesy?sellerNick=' + shopMessage.sellerNick" class="tab-link">
            <i class="iconfont icon-liwu1"></i>
            <span class="tabbar-label">积分礼遇</span>
          </router-link>
          <router-link v-bind:replace="true" v-bind:to="'/personal?sellerNick=' + shopMessage.sellerNick" class="tab-link">
            <i class="iconfont icon-geren"></i>
            <span class="tabbar-label">个人中心</span>
          </router-link>
          <a v-bind:href="shopMessage.shopLink" class="tab-link"> 
            <i class="iconfont icon-shop"></i>
            <span class="tabbar-label">返回店铺</span>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
import {getMixnick, closeWindow} from './common/js/tb.js'
import {confirmModalWithoutTitle} from './common/js/modals.js'
export default {
  computed: {
    tabbarVisiable () {
      return this.$store.state.tabbarVisiable
    },
    shopMessage () {
      return this.$store.state.shopMessage
    }
  },
  beforeCreate () {
    // 本地测试代码
    // let sellerNick = this.$route.query.sellerNick
    // let userNick = encodeURIComponent('残01HZnYhSOgmT2h72ivuVl2hXlOOkEfOG4XR+quRuqD7a8=')
    // if (sellerNick && userNick) {
    //   this.$http.get(this.$store.state.basePath + '/vipCenter/entry?userNick=' + userNick + '&sellerNick=' + sellerNick).then((response) => {
    //     let resp = response.body
    //     this.$store.commit('setShopMessage', resp.shopMessage)
    //     this.$store.commit('setVipMessage', resp.vipMessage)
    //   })
    // }
    // 线上测试代码
    let sellerNick = this.$route.query.sellerNick
    let thisVue = this
    getMixnick(function (mixnick) {
      // let userNick = encodeURIComponent(mixnick)
      if (sellerNick && mixnick) {
        thisVue.$http.get(thisVue.$store.state.basePath + '/vipCenter/entry?userNick=' + mixnick + '&sellerNick=' + sellerNick).then((response) => {
          let resp = response.body
          thisVue.$store.commit('setShopMessage', resp.shopMessage)
          thisVue.$store.commit('setVipMessage', resp.vipMessage)
        })
      }
    }, function () {
      confirmModalWithoutTitle('亲，点击授权才能浏览哦', function () {
        // 点击确定
        window.location.reload()
      }, function () {
        // 点击取消
        closeWindow()
      })
    })
  }
}
</script>

<style>
  .toolbar a.router-link-active{
    color: #ff4441;
  }
  a.my-tool-bar {
    padding-top: 4px;
    padding-bottom: 4px;
    height: 100%;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: visible;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
</style>
