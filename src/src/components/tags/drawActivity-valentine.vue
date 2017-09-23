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
    console.log('valentine')
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
	/*情人节  底盘颜色  #ffdc64  #fcfa76*/
	.banner .turnplate{
		top: 28%;
	}
	.banner .turnplate>div{
		background-image: url(/static/images/manySkin/draw/skin5/turnplate-bg.png);
	}
	.banner .turnplate .pointer_btn{
		background: url(/static/images/manySkin/draw/skin5/go.png);
		background-size: 100% 100%;
	}
	.banner>.banner-logo{
		top: 21.5%;
	}
	.banner .banner-text{
		top: 74%;
	}
	.color-0{
		color: #FCFA76;
	}
	.banner .banner-text marquee{
		background: #fecfc9;
		border-radius: 4px;
	}
	.banner .banner-text marquee .color-0{
		color: #f03f6d;
	}
	.chance-way .chance-button{
		background: #ffdc64;
		color: #f03f6d;
	}
	.chance{
		background: url(/static/images/manySkin/draw/skin5/bg2.png) no-repeat;
		background-size: 100% 100%;
	} 
</style>