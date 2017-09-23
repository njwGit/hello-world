<template>
  <div id="view-5" class="view tab active" v-title="'收货地址'">
    <div class="pages">
    <div class="page" data-page="addressList">
          <div class="page-content">
              <div v-if="isNoAddress">
                <p style="padding:1rem;text-align:center;">暂无收货地址~</p>
              </div>
              <div class="addr-list">
                  <div class="addr-item" v-for="(address, index) in addressList">
                    <p><span class="fl">{{address.recieveName}}</span><span class="fr">{{address.recieveTel}}</span></p>
                    <p>{{address.province + address.city + address.region + address.street + address.detailAddress}}</p>
                    <div class="addr-btn">
                        <label v-bind:data-index="index" class="label-checkbox item-content fl" v-on:click.self="setDefault">
                          <!-- Checked by default -->
                          <input type="checkbox" name="my-checkbox" value="Books" v-model="checked[index]">
                          <div class="item-media" style="pointer-events:none;">
                            <i class="icon icon-form-checkbox"></i>
                          </div>
                          <div class="item-inner" style="pointer-events:none;">
                            <div class="item-title">默认地址</div>
                          </div>
                        </label>
                        <span class="fr">
                          <a href="javascript:;" v-bind:data-addressId="address.addID" v-on:click.self="edit"><i class="iconfont icon-bianji"></i>编辑</a>
                          <a href="javascript:;" v-bind:data-index="index" v-on:click.self="deleteAdd"><i class="iconfont icon-shanchu"></i>删除</a>
                        </span>
                    </div>
                  </div>
              </div> 
              <a href="javascript:;" class="add-addrbtn" v-on:click="toAddAddress">添加新地址</a>           
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addressList: [],
      checked: [],
      isNoAddress: false
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    this.$http.get(this.$store.state.basePath + '/personalMessage/addressList').then((response) => {
      let resp = response.body
      if (resp.err_code === 0) {
        this.addressList = resp.addressList
        this.isNoAddress = this.addressList.length <= 0
        for (var address in resp.addressList) {
          this.checked[address] = resp.addressList[address].isDefault === 1 ? 'checked' : ''
        }
      }
    })
  },
  methods: {
    toAddAddress: function () {
      this.$router.push({path: '/addAddress'})
    },
    edit: function (event) {
      let addressId = event.target.getAttribute('data-addressId')
      this.$router.push({path: '/addAddress#' + addressId})
    },
    deleteAdd: function (event) {
      let index = event.target.getAttribute('data-index')
      let addressId = this.addressList[index].addID
      this.$http.get(this.$store.state.basePath + '/personalMessage/deleteAdd?addID=' + addressId).then((response) => {
        let resp = response.body
        if (resp.err_code === 0) {
          this.addressList.splice(index, 1)
          this.checked.splice(index, 1)
        }
      })
    },
    setDefault: function (event) {
      let index = event.target.getAttribute('data-index')
      if (index != null) {
        let address = this.addressList[index]
        address.isDefault = address.isDefault === 1 ? 2 : 1
        this.$http.post(this.$store.state.basePath + '/personalMessage/saveAddress',
          address,
          {
            emulateJSON: true
          }).then((response) => {
            let resp = response.body
            if (resp.err_code === 0) {
              window.location.reload()
            }
          })
      }
    }
  }
}
</script>
<style></style>