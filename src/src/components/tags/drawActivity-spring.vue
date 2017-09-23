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
    console.log('spring')
    this.$store.commit('closeTabbarVisiable')
    this.baseMessage = this.$store.state.activity.baseMessage
    this.extraMessage = this.$store.state.activity.extraMessage
    this.userData = this.$store.state.activity.userData
    console.log(this.baseMessage.id)
    if (this.baseMessage.id === undefined) {
      this.$http.post(this.$store.state.basePath + '/activity/detail', this.$route.query, {
        emulateJSON: true
      }).then(response => {
        let resp = response.body
        console.log(resp)
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
	/*春节   #ffdd9a #efc36d*/
	.banner .turnplate{
		top: 27%;
	}
	.banner .banner-text{
		top: 73%;
	}
	.banner .turnplate>div{
		background-image: url(/static/images/manySkin/draw/skin3/turnplate-bg.png);
	}
	.banner .turnplate .pointer_btn{
		background: url(/static/images/manySkin/draw/skin3/go.png);
		background-size: 100% 100%;
	}
	.color-0{
		color: #fdd266;
	}
	.banner .banner-text marquee{
		background: #e7576a;
	}
	.banner .banner-text marquee .color-0{
		color: #ffe074;
	}
	.chance-way{
		bottom: 6%;
	}
	.chance-way .chance-button{
		background: url(/static/images/manySkin/draw/skin3/btnbg.png);
		background-size: 100% 100%;
		color: #e93b3d;
	}
	.chance{
		background: url(/static/images/manySkin/draw/skin3/bg2.png) repeat-y;
	}
</style>