<template>
  <div class="com-ukey-wrap">
    <img src="../../assets/images/insert.gif" class="animate" alt="请插入ukey">
    <div class="tar">
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" :loading="loading" @click="comfirm">已插入Ukey</el-button>
    </div>
  </div>
</template>

<script>
import { checkUkeyValid } from '@/utils/ukey/index'
// import store from '@/store'
export default {
  name: 'UkeyPop',
  props: {
    odata: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async comfirm() {
      const { isBindUkeyOnly, ...params } = this.odata
      // if (!isBindUkeyOnly && !store.getters.userInfo.ukey) {
      //   this.$alert('您还未绑定ukey，请先绑定ukey后再操作', '提示', {
      //     confirmButtonText: '确定'
      //   })
      //   return
      // }
      if (this.loading) return
      this.loading = true
      let result = ''
      try {
        result = await checkUkeyValid(params, isBindUkeyOnly)
      } catch {
        this.loading = false
      }
      this.loading = false
      if (result) {
        console.log('签名结果===', result)
        if (result === '-1') {
          this.$message.warning('用户取消了ukey操作')
          this.$emit('cancel')
        } else {
          // 在绑定ukey的时候，不需要加签参数
          const data = isBindUkeyOnly ? result : {
            signData: result,
            ...params
          }
          console.log('最后请求参数：', data)
          this.$emit('ok', data)
          return data
        }
      } else {
        this.$message.error('验证ukey不通过，请确认ukey是否有效')
        this.$emit('cancel')
      }
    },
  }
}
</script>

<style lang="scss" >
.com-ukey-wrap {
  .animate {
    width: 400px;
    height: 300px;
    display: block;
    margin: 20px auto;
  }
}
</style>
