<template>
  <div class="page page-agreement">
    <div class="container">
      <Navbar />
      <div style="width: 860px;margin: 10px auto">
        <iframe :src="REGISTER_PRO_URL" frameborder="0" style="width: 820px;margin: 0 auto; height:calc(100vh - 60px)" />
        <el-form>
          <el-form-item>
            <el-button v-loading="loading" class="bgbtn" @click.native.prevent="handleAgree()"><span class="agree">同意协议<span>(同意平台协议即可进入系统)</span></span></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { UserApi } from '@/api/'
import { REGISTER_PRO_URL } from '@/utils/constant/index.js'
import Navbar from '@/components/NavBar'
import { mapGetters } from 'vuex'
export default {
  name: 'Agreement',
  components: {
    Navbar,
  },
  data() {
    return {
      REGISTER_PRO_URL,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'loginName',
      'role',
      'messageCount'
    ])
  },
  methods: {
    handleAgree() {
      this.loading = true
      UserApi.agreeLicense({
        loginName: this.loginName
      }).then(res => {
        this.$message.success('欢迎进众企安链供应链平台')
        location.hash = '#/'
        setTimeout(() => {
          location.reload()
        }, 100)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped >
.title{
  width:100%;
  height:60px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 6px 0px rgba(246,246,246,1);
  font-size:16px;
  line-height: 60px;
  font-weight:500;
  color:rgba(70,70,70,1);
}
.bgbtn{
  width:256px;
  height:32px;
  background:rgba(0,188,112,1);
  border-radius:4px;
  color: #fff;
  margin-top: 8px;
  position: relative;
  left: 50%;
  margin-left: -116px;
  .agree{
    font-size: 14px !important;
    line-height: 13px !important;
    >span{
      font-size: 12px !important;
      padding-left: 5px;
    }
  }
}
</style>
