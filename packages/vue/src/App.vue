<template>
  <div id="app">
    <!-- <div style="margin-left: 500px;width: 200px;height:200px;position: fixed;z-index: 10000;left: 400;border:1px solid red; color:blue; font-size: 20px">
      <el-button v-fast-click="wrapClick(test, 'fast')"> v-debounce</el-button>
      <div @click="showCode">动态码</div>
    </div> -->
    <router-view />
  </div>
</template>

<script>
// import { PlatformApi, EnterprisApi } from '@/api'
// import { CommonApi } from '@/api'
import Vue from 'vue'
import NoData from './components/NoData/'
import Download from './components/Download'
import SecurityCode from './components/SecurityCode'
import TokenFlowRecord from './components/TokenFlowRecord'
import HashLink from './components/CommonLink/HashLink'
import CorpLink from './components/CommonLink/CorpLink'
import AssetLink from './components/CommonLink/AssetLink'
import PDF from './components/PDF'
import CheckFlow from './components/CheckFlow'
import BasicTable from '@/components/BasicTable'

Vue.component('Download', Download)
Vue.component('NoData', NoData)
Vue.component('SecurityCode', SecurityCode)
Vue.component('TokenFlowRecord', TokenFlowRecord)
Vue.component('HashLink', HashLink)
Vue.component('CorpLink', CorpLink)
Vue.component('AssetLink', AssetLink)
Vue.component('PDF', PDF)
Vue.component('BasicTable', BasicTable)
Vue.component('CheckFlow', CheckFlow)

export default {
  name: 'App',
  mounted() {
    // PlatformApi.login({
    //   loginName: 'adfasdf',
    //   pwd: 'adsfasdf'
    // }).then(response => {
    //   console.log(response.data.items, '====mock接口调用方式  看App.vue========')
    // })
    // CommonApi.queryAllDict().then(res => {
    //   console.log('res', res)
    // })
  },
  methods: {
    showCode() {
      this.$securityCode()
    },
    test(v) {
      console.log('fast-click', Date.now(), v)
    },
  }
}
</script>
<style lang="scss">
.el-loading-spinner {
  background: url(./assets/loading.gif) no-repeat;
  background-size: 140px 76px;
  width: 140px;
  height: 76px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.el-loading-spinner .circular {
  // width: 42px;
  // height: 42px;
  // animation: loaing-rotate 2s linear infinite;
  display: none;
}
</style>
