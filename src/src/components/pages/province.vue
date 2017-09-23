<template>
	<div id="view-province" class="view view-main tab active" v-title="'省份'">
	    <div class="pages">
	      <div data-page="index-1" class="page">
	        <div class="page-content">
				<div class="list-block">
					<ul>
						<li v-for="province in provinceList" class="item-content">
						  <div class="item-inner" v-bind:data-id="province.id" v-bind:data-name="province.name" v-on:click.self="select">
						    <div class="item-title">{{province.name}}</div>
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
      provinceList: []
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    if (this.provinceList == null || this.provinceList.length <= 0) {
      this.$http.get(this.$store.state.basePath + '/personalMessage/province').then((response) => {
        let resp = response.body
        if (resp.err_code === 0) {
          this.provinceList = resp.province
        }
      })
    }
  },
  methods: {
    select: function (event) {
      let id = event.target.getAttribute('data-id')
      let name = event.target.getAttribute('data-name')
      let hash = this.$route.hash
      this.$router.push('/listCity?id=' + id + '&provinceName=' + name + hash)
    }
  }
}
</script>