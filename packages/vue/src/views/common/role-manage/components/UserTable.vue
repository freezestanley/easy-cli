<template>
  <div v-bind="$attrs" v-on="$listeners">
    <basic-table stripe :data="listData" :col-configs="colConfigs" max-height="600" :border="false">
      <!-- <el-table-column slot="opt" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" class="error" @click="handleDeleteUse(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </basic-table>
  </div>

</template>

<script>
import BasicTable from '@/components/BasicTable'
import { CommonApi } from '@/api'

export default {
  components: {
    BasicTable
  },
  props: {
    listData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      colConfigs: [
        { label: '账号', prop: 'loginName' },
        { label: '姓名', prop: 'nickName' },
        { label: '手机号', prop: 'mobile' },
        { label: '邮箱', prop: 'email' },
        { slot: 'opt' }
      ],
    }
  },
  methods: {
    handleDeleteUse(row) {
      console.log(row)
      this.$confirm('确定要删除该用户？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CommonApi.deleteUser({ userNos: [row.operNo] }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('refresh')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
