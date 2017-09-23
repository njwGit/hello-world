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
    console.log('women')
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
	/*妇女节  底盘颜色 #fff  #fdd4e0*/
	 .banner .turnplate{
		top: 27.5%;
	}
	.banner .banner-text{
		top: 73.5%;
	}
	 .banner .turnplate>div{
		background-image: url(/static/images/manySkin/draw/skin4/turnplate-bg.png);
	}
	.banner .turnplate .pointer_btn{
		background: url(/static/images/manySkin/draw/skin4/go.png);
		background-size: 100% 100%;
	}
	.color-0{
		color: #F50068;
	}
	.banner .banner-text>label{
		color: #ce90ae;
	}
	.banner .banner-text marquee{
		background: #FD98BA;
		border-radius: 4px;
	}
	.chance-way .chance-button{
		background: #DD0069;
		color: #fff;
	}
	.chance{
		background: url(/static/images/manySkin/draw/skin4/bg2.png) no-repeat;
	} 
</style>