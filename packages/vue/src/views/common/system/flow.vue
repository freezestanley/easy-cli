<template>
  <div class="page page-system-flow">
    <div v-loading="loading" class="table-box">
      <basic-table stripe :data="list" :col-configs="colConfigs" border>
        <el-table-column slot="opt" label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="goConsole(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </basic-table>
    </div>

    <Pagination
      v-if="list.length && !loading"
      :current-change="onCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      :size-change="onSizeChange"
      :total="total"
    />
  </div>
</template>

<script>
import { SuperApi } from '@/api/'
import tableMixin from '@/utils/tableMixin'
import { parseTime } from '@/utils/index'
export default {
  name: 'MainFlow',
  mixins: [tableMixin],
  data () {
    return {
      loading: false,
      list: [],
      colConfigs: [
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: '流程名称' },
        { prop: 'lastUpdateTime', label: '最后更新时间', formatter: row => parseTime(row.lastUpdateTime) },
        { slot: 'opt' }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData() {
      SuperApi.queryModelList({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      }).then(res => {
        this.list = res.data
        this.total = res.total
      })
    },
    goConsole(id) {
      window.open('http://17956-finance-bscf-scf-trans-service.test.za-tech.net/modeler.html?modelId=' + id)
      // console.log(process.env.VUE_APP_SUPER_MANAGE_URL)
    }
  }
}
</script>

<style lang="" >

</style>
