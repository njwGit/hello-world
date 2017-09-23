<template>
	<div id="view-city" class="view view-main tab active" v-title="'城市'">
	    <div class="pages">
	      <div data-page="index-1" class="page">
	        <div class="page-content">
				<div class="list-block">
					<ul>
						<li v-for="city in cityList" class="item-content">
						  <div class="item-inner" v-bind:data-id="city.id" v-bind:data-name="city.name" v-on:click.self="select">
						    <div class="item-title">{{city.name}}</div>
						  </div>
						</li>
					</ul>
				</div>
	        </div>
	      </div>
	    </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      cityList: []
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    let id = this.$route.query.id
    let provinceName = this.$route.query.provinceName
    this.$http.get(this.$store.state.basePath + '/personalMessage/city?parentId=' + id + '&provinceName=' + provinceName).then((response) => {
      let resp = response.body
      if (resp.err_code === 0) {
        this.cityList = resp.city
      }
    })
  },
  methods: {
    select: function (event) {
      let hash = this.$route.hash
      let provinceName = this.$route.query.provinceName
      let name = event.target.getAttribute('data-name')
      if (hash == null || hash === '') {
        let Framework7 = require('framework7')
        let myApp = new Framework7()
        let area = provinceName + ' ' + name
        this.$http.get(this.$store.state.basePath + '/personalMessage/perfectMessage?area=' + area + '&type=6').then((response) => {
          let resp = response.body
          if (resp.err_code === 0) {
            this.$store.commit('setVipMessage', resp.vipUser)
            let popMessage = '提交成功'
            if (resp.awardIntegral != null && resp.awardIntegral > 0) {
              popMessage += ',获得' + resp.awardIntegral + '积分'
            }
            let thisVue = this
            myApp.alert(popMessage, '', function () {
              thisVue.$router.go(-2)
            })
          }
        })
      } else {
        let id = event.target.getAttribute('data-id')
        this.$router.push('/listRegion?id=' + id + '&provinceName=' + provinceName + '&cityName=' + name)
      }
    }
  }
}
</script>