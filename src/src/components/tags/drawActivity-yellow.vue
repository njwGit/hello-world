<template>
	<div id="view-activityPage" class="view tab active" v-title="'幸运大转盘'">
		<div class="pages">
			<div class="page" data-page="drawActivity">
				<drawActivityBody :baseMessage="baseMessage" :extraMessage="extraMessage" :userData="userData"></drawActivityBody>
			</div>
		</div>
	</div>
</template>
<script>
import drawActivityBody from './drawActivityBody'
export default {
  data () {
    return {
      baseMessage: {},
      extraMessage: {},
      userData: {}
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    this.baseMessage = this.$store.state.activity.baseMessage
    this.extraMessage = this.$store.state.activity.extraMessage
    this.userData = this.$store.state.activity.userData
    if (this.baseMessage.id == null) {
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
  components: {
    drawActivityBody
  }
}
</script>
<style scoped>
	/*yellow 超级赚赚赚 底盘颜色  #c8ebff  #69cdff*/
	.banner .turnplate{
		top: 27%;
	}
	.banner .turnplate>div{
		background-image: url(/static/images/manySkin/draw/skin2/turnplate-bg.png);
	}
	.banner .turnplate .pointer_btn{
		background: url(/static/images/manySkin/draw/skin2/go.png);
		background-size: 100% 100%;
	}
	.color-0{
		color: #ffba00;
	}
	.banner .banner-text{
		top: 75%;
	}
	.banner .banner-text>label>span{
		color: #ffea00;
	}
	.banner .banner-text marquee{
		background: #fee9c3;
		border-radius: 4px;
	}
	.banner .banner-text marquee>label,.banner .banner-text marquee>label>span{
		color: #f18b0d
	}
	.chance-way{
		bottom: 7%;
	}
	.chance-way .chance-button{
		background: url(/static/images/manySkin/draw/skin2/btnbg.png);
		background-size: 100% 100%;
		color: #fff;
		border-radius: 0;
		font-weight: bold;
		padding: 0.5em 0.3em;
	    margin-right: 0.1em;
	}
	.chance{
		background: url(/static/images/manySkin/draw/skin2/bg2.png) no-repeat;
		background-size: 100% 100%;
	} 
</style>