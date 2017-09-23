<template>
  <div id="view-region" class="view view-main tab active" v-title="'县/区'">
      <div class="pages">
        <div data-page="index-1" class="page">
          <div class="page-content">
        <div class="list-block">
          <ul>
            <li v-for="region in regionList" class="item-content">
              <div class="item-inner" v-bind:data-id="region.id" v-bind:data-name="region.name" v-on:click.self="select">
                <div class="item-title">{{region.name}}</div>
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
      regionList: []
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    let id = this.$route.query.id
    let cityName = this.$route.query.cityName
    this.$http.get(this.$store.state.basePath + '/personalMessage/region?parentId=' + id + '&cityName=' + cityName).then((response) => {
      let resp = response.body
      if (resp.err_code === 0) {
        this.regionList = resp.region
        if (resp.region == null || resp.region.length <= 0) {
          let province = this.$route.query.provinceName
          let city = this.$route.query.cityName
          let address = this.$store.state.address
          address.province = province
          address.returnFromRegion = true
          if (province !== city) {
            address.city = city
          } else {
            address.city = ''
          }
          address.region = ''
          this.$store.commit('setAddress', address)
          this.$router.go(-3)
        }
      }
    })
  },
  methods: {
    select: function (event) {
      let province = this.$route.query.provinceName
      let city = this.$route.query.cityName
      let region = event.target.getAttribute('data-name')
      let address = this.$store.state.address
      address.province = province
      address.city = city
      address.region = region
      address.returnFromRegion = true
      this.$store.commit('setAddress', address)
      // this.$router.replace({path: '/addAddress?province=' + province + '&city=' + city + '&region=' + region})
      this.$router.go(-3)
    }
  }
}
</script>