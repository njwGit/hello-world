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
	/*紫色   #fcfa76 #ffdc64*/
	.banner .turnplate{
		top: 29%;
	}
	.banner .banner-text{
		top: 76%;
	}
	.banner .turnplate>div{
		background-image: url(/static/images/manySkin/draw/skin1/turnplate-bg.png);
	}
	.banner .turnplate .pointer_btn{
		background: url(/static/images/manySkin/draw/skin1/go.png);
		background-size: 100% 100%;
	}
	.color-0{
		color: #fdd266;
	}
	.banner .banner-text marquee{
		background: #761f97;
	}
	.chance-way{
		bottom: 4%;
	}
	.chance-way .chance-button{
		color: #333;
	    background-color: #ffdc64;
	}
	.chance{
		background-color: #66068b;
	}
</style>