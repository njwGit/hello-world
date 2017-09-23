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
    console.log('happy')
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
	/*happy 天天欢乐  #ffd531 #fabe38*/
	.banner .turnplate>div{
		background-image: url(/static/images/manySkin/draw/skin6/turnplate-bg.png);
	}
	.banner .turnplate .pointer_btn{
		background: url(/static/images/manySkin/draw/skin6/go.png);
		background-size: 100% 100%;
	}
	.color-0{
		color: #fff;
	}
	.banner .banner-text marquee{
		background: #e15472;
		border-radius: 4px;
	}
	.banner .banner-text marquee .color-0{
		color: #ffe074;
	}
	.chance-way{
		bottom: 3%;
	}
	.chance-way .chance-button{
		background: url(/static/images/manySkin/draw/skin6/btnbg.png);
		background-size: 100% 100%;
		color: #fff;
	}
	.chance{
		background: url(/static/images/manySkin/draw/skin6/bg2.png) no-repeat;
		background-size: 100% 100%;
	}
</style>