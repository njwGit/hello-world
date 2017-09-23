<template>
<transition name="slide">
	<div id="view-activityPage" class="view tab active" v-title="'幸运大转盘'">
    	<div class="pages">
			<div class="page" data-page="drawActivity">
        <div class="page-content">
    <!-- 奖品对应图标 -->
      <img :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/draw4.png'" id="default-img" style="display:none;" />
      <img :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/draw4.png'" id="sorry-img" style="display:none;" />
      <img :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/draw3.png'" id="flow-img" style="display:none;" />
      <img :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/draw2.png'" id="redbag-img" style="display:none;" />
      <img :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/draw1.png'" id="coupons-img" style="display:none;" />
      <img :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/draw5.png'" id="onemore-img" style="display:none;" />
      <img :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/draw6.png'" id="jifen-img" style="display:none;" />
      <template v-for="(award,index) in extraMessage.awards">
        <img v-if="award.awardType == 8" :src="award.award" :id="'good-img' + index" style="display:none;">
      </template>
      <!-- 转盘位置 -->
    <div :class="['banner', 'banner' + baseMessage.skinId]">
      <img :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/bg.png'" style="width:100%;" />
      <div :class="['banner-logo', 'banner-logo' + baseMessage.skinId]" v-on:click="toShop">
        <div class="banner-logo-img"><img :src="shopMessage.shopLogo" class="img-radius" /></div>
        <a href="javascript:;" class="banner-logo-enter">进入店铺</a>
      </div>
      <div :class="['turnplate', 'turnplate' + baseMessage.skinId]">
        <div></div>
        <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
        <img class="pointer" :src="'/static/images/manySkin/draw/skin'+baseMessage.skinId+'/turnplate-pointer.png'"/>
        <span v-on:click="draw" :class="['pointer_btn', 'pointer_btn' + baseMessage.skinId]"></span>
      </div>
      <div :class="['banner-text', 'banner-text' + baseMessage.skinId]">
        <label class="text-middle color-1">今天您还剩<span :class="['color-0', 'color-0' + baseMessage.skinId]" id="drawNum">{{restDrawNum}}</span>次抽奖机会</label><br />
        <marquee direction="left" loop="true" scrollamount="2" style="width:60%;">
          <label v-if="extraMessage.randRecordAwardName != null" class="text-small color-1">恭喜{{extraMessage.randRecordUserNick}}抽中<span :class="['color-0', 'color-0' + baseMessage.skinId]">{{extraMessage.randRecordAwardName}}</span></label>
        </marquee>
      </div>
      <!-- 赚取抽奖机会 -->
      <div :class="['chance-way', 'chance-way' + baseMessage.skinId]">
        <template v-if="extraMessage.ways != null && extraMessage.ways.length > 0">
          <template v-for="way in extraMessage.ways">
            <button v-if="way.addType == 3" :class="['chance-button', 'chance-button' + baseMessage.skinId]" v-on:click="shareActivity"><i class="iconfont icon-share"></i>分享活动</button>
            <button v-else-if="way.addType == 4" :class="['chance-button', 'earn-chance-order', 'chance-button' + baseMessage.skinId]" v-on:click="placeOrder(way.doNum, way.addNum)">
                <i class="iconfont icon-rmb"></i>下单抽奖</button>
          </template>
        </template>
        <p v-else class="color-1">店铺没有设置哦~</p>
      </div>
    </div>
    <div :class="['chance', 'chance' + baseMessage.skinId]">
      <div class="chance-content">
        <div class="chance-item">
          <div :class="['chance-title', 'color-0', 'color-0' + baseMessage.skinId]">
            <i class="iconfont icon-liwu3"></i>
            <label class="text-middle">我的奖品</label>
          </div>
          <div class="chance-con color-1">
            <div v-for="myAward in userData.awardRecords">
              <div class="inline-b">
                <label>
                  {{myAward.levelName}}:{{myAward.awardName}}
                </label>
              </div>
              <div style="float:right;">
                <label>{{myAward.createDate}}&nbsp;&nbsp;{{myAward.createTime}}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="chance-item">
          <div :class="['chance-title', 'color-0', 'color-0' + baseMessage.skinId]">
            <i class="iconfont icon-calenter"></i>
            <label class="text-middle">活动时间</label>
          </div>
          <div class="chance-con color-1">
            <label>{{baseMessage.startTime | formatDate}}至{{baseMessage.endTime | formatDate}}</label>
          </div>
        </div>
        <div class="chance-item">
          <div :class="['chance-title', 'color-0', 'color-0' + baseMessage.skinId]">
            <i class="iconfont icon-guize"></i>
            <label class="text-middle">抽奖规则</label>
          </div>
          <div class="chance-con color-1">
            <template v-for="remark in baseMessage.remarks">
              <label>{{remark }}</label><br />
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 宝贝列表弹窗 -->
    <div class="add-collect-goods">
      <div class="mask"></div>
      <div class="add-collect-goods-content">
          <div class="weui_panel_bd small_title_panel">
              <p class="picker-title order_addnum_title"></p>
          </div>
          <div id="hm_goods_list" class="list_content">
            <div class="list_item" v-for="item in items">
              <div class="list_top">
                <img class="list_img" :src="item.picUrl">
                <div class="list_bottom">
                  <div class="mask"></div>
                  <div>
                    <p class="top_title">{{item.itemTitle}}</p>
                    <p class="price">￥<span>{{item.price}}</span></p>
                  </div>
                </div>
              </div>
              <div class="list_btn_wrap">
                <a class="list_btn full_width" v-on:click="addCart(item.itemId)">立即购买</a>
              </div>
            </div>
          </div>
      </div>
    </div>
    <!-- 抽奖活动弹窗 -->
    <template v-if="modualData.isShow">
      <div :class="[modualData.type <= 0 || modualData.type === 9 ? 'alert_fail' : 'alert_success', 'alert_dialog', 'alert_draw']">
        <div class="alert_mask"></div>
          <div v-if="modualData.type > 0" class="alert_light"></div>'
          <div class="alert_con">
              <div class="alert_title">
                <img :src="'/static/images/manySkin/draw/' + modualTitleImage + '.png'">
              </div>
              <p v-if="modualData.type != 0" class="text" v-html="modualData.text"></p>
              <div v-if="modualData.type == 0" class="text-center">诶哟，还差一点点。再来一次</div>
              <div v-if="modualData.type == 5 || modualData.type == 6" class="text-center">请到“我的淘宝” - “卡券包”查收！</div>
              <div v-if="modualData.type == 8" class="user-info">
                <div class="text-center"><label>请输入</label></div>
                <div>
                  <div class="inline-b info-name"><label>旺旺号：</label></div>
                  <div class="inline-b info-input">
                    <input id="ri-ww" v-model="receivingInformation.ww" type="text" />
                  </div>
                </div>
                <div>
                  <div class="inline-b info-name"><label>收货人：</label></div>
                  <div class="inline-b info-input">
                    <input id="ri-realname" v-model="receivingInformation.realName" type="text" />
                  </div>
                </div>
                <div>
                  <div class="inline-b info-name"><label>联系电话：</label></div>
                  <div class="inline-b info-input">
                    <input id="ri-phone" v-model="receivingInformation.phone" type="text" />
                  </div>
                </div>
                <div>
                  <div class="inline-b info-name"><label>收货地址：</label></div>
                  <div class="inline-b info-input">
                    <input id="ri-address" v-model="receivingInformation.address" type="text" />
                  </div>
                </div>
                <!-- <input id="hm_token" type="hidden" value="data.token"> -->
              </div> 
              <div class="alert_btn">
              <template v-if="modualData.type == -10">
                <a href="javascript:;" class="img_btn cancel" v-on:click="colseModual">
                  &nbsp;&nbsp;取消&nbsp;&nbsp;
                </a>
                <a href="javascript:;" class="img_btn" v-on:click="toShop">进店下单</a>
              </template>
              <a v-else-if="modualData.type == -20" href="javascript:;" class="img_btn" v-on:click="colseModual">
                &nbsp;&nbsp;立即抽奖&nbsp;&nbsp;
              </a>
              <template v-else-if="modualData.type == -30">
                <a href="javascript:;" class="img_btn cancel" v-on:click="colseModual">
                  &nbsp;&nbsp;取消&nbsp;&nbsp;
                </a>
                <a href="javascript:;" class="img_btn" v-on:click="toCart">去支付</a>
              </template>
              <a v-else-if="modualData.type == 2" href="javascript:;" class="img_btn receive_coupon_rightnow">立即领取</a>
              <a v-else-if="modualData.type == 8 && !receivingInformation.isSubmission" href="javascript:;" class="img_btn" v-on:click="submit">提交</a>
              <a v-else-if="modualData.type == 8 && receivingInformation.isSubmission" href="javascript:;" class="img_btn">提交中...</a>
              <a v-else-if="modualData.type == -2" href="javascript:;" class="img_btn" v-on:click="colseModualAndFavorShop">确定</a>
              <a v-else href="javascript:;" class="img_btn" v-on:click="colseModual">确定</a>
            </div>
          </div>
        </div>
    </template>
  </div>
			</div>
		</div>
	</div>
  </transition>
</template>
<script>
import {initTurnplate, getImg, rotateFn, showItems} from '../../common/js/draw.js'
import {doFavor, doShare, isShareSuccess, doAddCart, jumpCart} from '../../common/js/tb.js'
import $ from 'jquery'
import 'tipsy'
export default {
  data () {
    return {
      loadFinish: false,
      modualData: {
        type: 1,
        isShow: false,
        text: ''
      },
      isDrawing: false,
      receivingInformation: {
        ww: '',
        realName: '',
        phone: '',
        address: '',
        isSubmission: false
      },
      baseMessage: {},
      extraMessage: {},
      userData: {},
      items: []
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    this.baseMessage = this.$store.state.activity.baseMessage
    this.extraMessage = this.$store.state.activity.extraMessage
    this.userData = this.$store.state.activity.userData
    if (this.baseMessage.id == null) {
      this.baseMessage.skinId = this.$route.query.skinId
      this.$http.post(this.$store.state.basePath + '/activity/detail', this.$route.query, {
        emulateJSON: true
      }).then(response => {
        let resp = response.body
        this.baseMessage = resp.baseMessage
        this.extraMessage = resp.extraMessage
        this.userData = resp.userData
      })
    }
  },
  computed: {
    // 获取用户剩余抽奖次数
    restDrawNum () {
      if (this.baseMessage.id === undefined) {
        return 0
      }
      let num = this.userData.addDrawNum - this.userData.drawedNum + this.extraMessage.rule.drawNum
      return (num < 0) ? 0 : num
    },
    shopMessage () {
      return this.$store.state.shopMessage
    },
    // 弹窗标题图片的设置
    modualTitleImage () {
      let image = ''
      if (this.modualData.type === 0) {
        image = 'draw_fail'
      } else if (this.modualData.type < 0 || this.modualData.type === 9) {
        image = 'draw_common'
      } else {
        image = 'draw_title'
      }
      return image
    }
  },
  methods: {
    toShop: function () {
      window.location.href = this.shopMessage.shopLink
    },
    init: function () {
      // 监听到图片加载完成，初始化转盘
      if (this.loadFinish) {
        initTurnplate(this.extraMessage.awards, this.baseMessage.skinId)
      }
      if (this.userData.addNumMessage != null) {
        this.modualData.text = '成功下单，恭喜获得' + this.userData.addNumMessage.addNum + '次抽奖机会'
        this.modualData.type = -20
        this.modualData.isShow = true
      }
    },
    draw: function () {
      // 判断是否满足抽奖条件
      let num = this.userData.addDrawNum - this.userData.drawedNum + this.extraMessage.rule.drawNum
      let restDrawNum = (num <= 0) ? 0 : num
      if (restDrawNum <= 0) {
        // 抽奖次数不足
        if (this.extraMessage.rule.stat === 1) {
          this.modualData.text = '亲，今天的抽奖次数已用完，<br />快去赚取抽奖机会吧！'
        } else {
          this.modualData.text = '亲，今天的抽奖次数已用完，<br />明天再来吧！'
        }
        this.modualData.type = -1
        this.modualData.isShow = true
      } else {
        // 抽奖次数充足，检测是否需要关注店铺才能抽奖
        if (this.extraMessage.rule.cond === 1 && !this.userData.isrelation) {
          // 用户不满足收藏店铺才能抽奖的条件
          this.modualData.text = '亲，收藏本店铺才能参与抽奖哦！'
          this.modualData.type = -2
          this.modualData.isShow = true
        } else {
          // 满足所有条件，直接抽奖
          if (!this.isDrawing) {
            rotateFn(this)
          }
        }
      }
    },
    // 关闭弹窗
    colseModual: function () {
      this.modualData.isShow = false
      this.isDrawing = false
    },
    // 关闭弹窗并提示关注店铺
    colseModualAndFavorShop: function () {
      this.modualData.isShow = false
      let thisVue = this
      // 成功关注店铺，开始抽奖
      doFavor(this.shopMessage, function () {
        if (!thisVue.isDrawing) {
          rotateFn(thisVue)
        }
      })
    },
    // 提交中奖实物的收货信息
    submit: function () {
      if (!this.receivingInformation.isSubmission) {
        if (this.receivingInformation.ww === '') {
          $('#ri-ww').tipsy({
            delayOut: 500,
            fallback: '请输入旺旺号',
            trigger: 'focus'
          })
          $('#ri-ww').focus()
          return
        }
        if (this.receivingInformation.realName === '') {
          $('#ri-realname').tipsy({
            delayOut: 500,
            fallback: '请填写收货人姓名',
            trigger: 'focus'
          })
          $('#ri-realname').focus()
          return
        }
        if (this.receivingInformation.phone === '') {
          $('#ri-phone').tipsy({
            delayOut: 500,
            fallback: '请输入联系电话',
            trigger: 'focus'
          })
          $('#ri-phone').focus()
          return
        }
        if (this.receivingInformation.address === '') {
          $('#ri-address').tipsy({
            delayOut: 500,
            fallback: '请输入收货地址',
            trigger: 'focus'
          })
          $('#ri-address').focus()
          return
        }
        this.receivingInformation.isSubmission = true
        // 提交中奖实物的收货信息
        this.$http.post(this.$store.state.basePath + '/draw/submit/receivingInformation', this.receivingInformation,
          {
            emulateJSON: true
          }).then(response => {
            let resp = response.body
            if (resp.err_code === 0) {
              let code = resp.result
              switch (code) {
                case -1:
                  this.modualData.text = '请勿重复提交'
                  this.modualData.type = -1
                  this.modualData.isShow = true
                  break
                case 1:
                  this.modualData.text = '提交成功'
                  this.modualData.type = -1
                  this.modualData.isShow = true
                  break
                case 2:
                  $('#ri-ww').tipsy({
                    delayOut: 500,
                    fallback: '请输入正确的旺旺号',
                    trigger: 'focus'
                  })
                  $('#ri-ww').focus()
                  break
              }
            }
            this.receivingInformation.isSubmission = false
          })
      }
    },
    // 分享活动赚取抽奖机会
    shareActivity: function () {
      let params = {
        url: this.$route.fullPath,
        image: this.$store.state.basePath + '/static/images/share/share_tidaIcon.png',
        title: '参与活动赢奖品',
        content: '您的好友向您分享了有礼活动，赶快参加吧！'
      }
      let thisVue = this
      doShare(params, function (data) {
        let isShare = isShareSuccess(data)
        if (isShare) {
          // 请求后台进行数据处理
          thisVue.$http(thisVue.$store.state.basePath + '/draw/share/addDrawNum?actId=' + thisVue.baseMessage.id).then(response => {
            let resp = response.body
            if (resp.err_code === 0) {
              let addResult = resp.result
              if (addResult === 0) {
                thisVue.modualData.text = '亲，今天已经分享过啦~'
                thisVue.modualData.type = -1
                thisVue.modualData.isShow = true
              } else if (resp.result > 0) {
                thisVue.modualData.text = '分享成功，获得 ' + addResult + ' 次抽奖机会'
                thisVue.modualData.type = -1
                thisVue.modualData.isShow = true
                // 增加抽奖次数
                thisVue.userData.addDrawNum = thisVue.userData.addDrawNum + addResult
              }
            }
          })
        }
      })
    },
    placeOrder: function (doNum, addNum) {
      if (doNum === 0) {
        this.modualData.text = '挑选店铺的一个宝贝，下单后<br>即可获得 ' + addNum + ' 次抽奖机会'
        this.modualData.type = -10
        this.modualData.isShow = true
      } else {
        // 请求后台获取可以通过下单增加抽奖次数的商品列表
        if (this.items == null || this.items.length === 0) {
          this.$http.get(this.$store.state.basePath + '/draw/order/items?actId=' + this.baseMessage.id).then(response => {
            let resp = response.body
            if (resp.err_code === 0) {
              this.items = resp.items
              showItems()
            }
          })
        } else {
          showItems()
        }
      }
    },
    addCart: function (itemId) {
      let shopType = this.shopMessage.type
      let sellerNick = this.shopMessage.sellerNick
      let vm = this
      doAddCart(itemId, shopType, sellerNick, function () {
        vm.modualData.text = '成功加入购物车<br>亲，赶快把宝贝买下~'
        vm.modualData.type = -30
        vm.modualData.isShow = true
      })
    },
    toCart: function () {
      jumpCart()
    }
  },
  mounted () {
    // 监听转盘奖品图标图片是否加载完成
    let loadFinishNum = 0
    if (this.extraMessage.awards != null) {
      for (let i = 0; i < this.extraMessage.awards.length; i++) {
        let type = this.extraMessage.awards[i].awardType
        let img = getImg(type, i)
        let thisVue = this
        img.onload = function () {
          loadFinishNum = loadFinishNum + 1
          if (loadFinishNum === thisVue.extraMessage.awards.length) {
            thisVue.loadFinish = true
          }
        }
      }
    }
  },
  updated () {
    if (!this.loadFinish) {
      let loadFinishNum = 0
      let needNum = 0
      if (this.extraMessage.awards != null) {
        // 计算需要加载多少张图片
        for (let j = 0; j < this.extraMessage.awards.length; j++) {
          let t = this.extraMessage.awards[j].awardType
          if (t === 8) {
            needNum = needNum + 1
          }
        }
        // 计算已经加载完了多少张图片
        for (let i = 0; i < this.extraMessage.awards.length; i++) {
          let type = this.extraMessage.awards[i].awardType
          let img = getImg(type, i)
          let thisVue = this
          img.onload = function () {
            loadFinishNum = loadFinishNum + 1
            // 所有转盘图片加载完，画到转盘上
            if (loadFinishNum === needNum) {
              thisVue.loadFinish = true
            }
          }
        }
      }
    }
  },
  watch: {
    'loadFinish': 'init'
  }
}
</script>
<style>
   @import '../../common/style/manySkin/draw/iconfont.css';
   @import '../../common/style/manySkin/draw/style.css';
   @import '../../common/style/manySkin/draw/skin.css';
   @import '../../common/style/tipsy.css';
</style>