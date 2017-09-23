<template>
  <div id="view-5" class="view tab active" v-title="'收货地址'">
    <div class="pages">
    <div class="page" data-page="addAddress">
          <div class="page-content">
               <div class="content-block-title personal-msg-block-title">请填写详细收货地址</div>
              <div class="list-block">
                <ul>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">收货人</div>
                        <div class="item-input">
                          <input v-model="address.recieveName" type="text" placeholder="">
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">联系电话</div>
                        <div class="item-input">
                          <input v-model="address.recieveTel" type="text" placeholder="">
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner" v-on:click="selectProvince"> 
                        <div class="item-title label">所在地区</div>
                        <!-- <div class="item-input">
                          <input id="address" type="text" readonly="" placeholder="请选择" value="">
                          <input id="addressVal" type="hidden" value="">
                        </div> -->
                        <div class="item-after">{{address.province + address.city + address.region}}</div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner"> 
                        <div class="item-title label">街道</div>
                        <div class="item-input">
                          <input v-model="address.street" type="text" id=''/>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner"> 
                        <div class="item-input">
                          <textarea v-model="address.detailAddress" v-bind:placeholder="address.detailAddress == '' ? '请填写详细地址，不少于5个字' : address.detailAddress"></textarea>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">设为默认地址</div>
                        <div class="item-input text-r">
                          <label class="label-switch color-red" v-on:click="changeChoose">
                            <input type="checkbox" v-model="checked">
                            <div class="checkbox"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <p class="mglr05"><a href="javascript:;" v-on:click="submit" class="button button-fill button-big color-red">提交</a></p>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      address: {
        recieveName: '',
        recieveTel: '',
        province: '',
        city: '',
        region: '',
        street: '',
        detailAddress: '',
        isDefault: 2
      },
      checked: false
    }
  },
  created () {
    this.$store.commit('closeTabbarVisiable')
    let addressId = this.$route.hash
    if (addressId != null && addressId !== '') {
      if (!this.$store.state.address.returnFromRegion) {
        this.address.addID = addressId.substring(1, addressId.length)
        this.$http.get(this.$store.state.basePath + '/personalMessage/address?addressId=' + addressId.substring(1, addressId.length)).then((response) => {
          let resp = response.body
          if (resp.err_code === 0) {
            this.address = resp.address
            this.checked = resp.address.isDefault === 1
          }
        })
      } else {
        this.$store.commit('setReturnFromRegion', false)
        this.address = this.$store.state.address
      }
    } else if (this.$store.state.address.returnFromRegion) {
      this.$store.commit('setReturnFromRegion', false)
      this.address = this.$store.state.address
    }
    this.checked = this.address.isDefault === 1
  },
  methods: {
    changeChoose: function () {
      this.checked = !this.checked
      this.address.isDefault = this.checked ? 1 : 2
    },
    submit: function () {
      let Framework7 = require('framework7')
      let myApp = new Framework7()
      if (this.address.recieveName === '') {
        myApp.alert('请填写收件人姓名', '')
      } else if (this.address.recieveTel === '') {
        myApp.alert('请填写收件人联系电话', '')
      } else if ((this.address.province + this.address.city + this.address.region) === '') {
        myApp.alert('请选择地区', '')
      } else if (this.address.detailAddress === '') {
        myApp.alert('请填写详细收货地址', '')
      } else {
        if (!(/^1[34578]\d{9}$/.test(this.address.recieveTel))) {
          myApp.alert('请输入正确的手机号', '')
          return
        }
        this.$http.post(this.$store.state.basePath + '/personalMessage/saveAddress', this.address,
          {
            emulateJSON: true
          }).then((response) => {
            let resp = response.body
            if (resp.err_code === 0) {
              this.$router.replace({path: '/addressList'})
            }
          })
      }
    },
    selectProvince: function () {
      this.$store.commit('setAddress', this.address)
      this.$router.push({path: '/listProvince#007'})
    }
  }
}
</script>
<style></style>