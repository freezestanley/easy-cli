<template>
  <div class="page page-menu">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业类型" prop="roleType">
              <el-select v-model="ruleForm.roleType" @change="getList">
                <el-option v-for="r in ROLE_TYPE_LIST" :key="r.value" :label="r.label" :value="r.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="addOrUpdateHandle({})">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      :data="dataList"
      border
      style="width: 100%;"
    >
      <el-table-column
        prop="authNo"
        header-align="center"
        align="left"
        :min-width="200"
        :show-overflow-tooltip="true"
        label="编号"
      />
      <table-tree-column
        prop="authName"
        header-align="center"
        tree-key="authNo"
        width="200"
        label="权限名称"
      />
      <!-- prop="parentAuthNo" -->
      <!-- <el-table-column
        header-align="center"
        align="center"
        width="120"
        label="上级菜单"
      >
        <template slot-scope="scope"> {{ parentMap[scope.row.parentAuthNo] }}</template>
      </el-table-column> -->
      <!-- <el-table-column
        header-align="center"
        align="center"
        width="100"
        label="可见范围"
      >
        <template slot-scope="scope"> {{ ROLE_TYPE[scope.row.roleType] }}</template>
      </el-table-column> -->
      <el-table-column
        header-align="center"
        align="center"
        label="图标"
      >
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon || ''" />
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 'CATA'" size="small" type="warning">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 'MENU'" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 'BUTTON'" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sortNum"
        header-align="center"
        align="center"
        label="排序号"
      />
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        :min-width="130"
        :show-overflow-tooltip="true"
        label="菜单URL"
      />
      <el-table-column
        prop="component"
        header-align="center"
        align="center"
        :min-width="130"
        :show-overflow-tooltip="true"
        label="菜单组件"
      />
      <el-table-column
        prop="visiable"
        header-align="center"
        align="center"
        :min-width="130"
        label="显示在菜单"
      >
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.visible === 'Y'">显示</span> -->
          <span v-if="scope.row.visible === 'N'">隐藏</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="perms"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="授权标识"
      />
      <el-table-column
        header-align="center"
        align="center"
        width="80"
        label="返回按钮"
      >
        <template slot-scope="scope"> {{ scope.row.back === 'Y' ? '可以返回' : '' }}</template>
      </el-table-column>
      <el-table-column
        prop="remarks"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="备注"
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row)"
          >修改
          </el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.authNo, scope.row.authName)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <MenuEdit ref="addOrUpdate" :role-type="ruleForm.roleType" :parent-list="parentList" @success="getData" />
  </div>
</template>

<script>
import TableTreeColumn from '@/components/BasicTable/TableTreeColumn'
import MenuEdit from '@/components/Business/System/MenuEdit'
import { SuperApi } from '@/api/'
import tableMixin from '@/utils/tableMixin'
import { ROLE_TYPE, ROLE_TYPE_LIST } from '@/utils/constant/index'

export default {
  name: 'SystemMenu',
  components: {
    TableTreeColumn,
    MenuEdit
  },
  mixins: [tableMixin],
  data () {
    return {
      ROLE_TYPE,
      ROLE_TYPE_LIST,
      loading: false,
      ruleForm: {
        roleType: 'PLATFORM'
      },
      dataList: [],
      addOrUpdateVisible: false,
      parentList: [],
    }
  },
  computed: {
    // parentMap() {
    //   const a = {}
    //   this.parentList.forEach(t => {
    //     a[t.authNo] = t.authName
    //   })
    //   return a
    // }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 获取数据列表
    getData () {
      this.getList()
      // this.getParentList()
    },
    getList() {
      this.loading = true
      SuperApi.list({
        roleType: this.ruleForm.roleType,
        pageNum: this.pageNum,
        pageSize: 200
      }).then(({ data }) => {
        this.dataList = this.treeDataTranslate(data, 'authNo', 'parentAuthNo', 'childrens')
      }).finally(() => {
        this.loading = false
      })
    },
    getParentList() {
      SuperApi.simplifyAuthList({
        roleType: this.ruleForm.roleType
      }).then(res => {
        this.parentList = res.data
      })
    },
    /**
     * 树形数据转换
     * @param {*} data list数据
     * @param {*} id 主键ID
     * @param {*} pid 上级ID
     * @param childrenKey 子list数据的key
    */
    treeDataTranslate (data, id = 'authNo', pid = 'parentAuthNo', childrenKey = 'children') {
      const res = []
      const temp = {}
      for (let i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
      }
      for (let k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
          if (!temp[data[k][pid]][childrenKey]) {
            temp[data[k][pid]][childrenKey] = []
          }
          if (!temp[data[k][pid]]['_level']) {
            temp[data[k][pid]]['_level'] = 1
          }
          data[k]['_level'] = temp[data[k][pid]]._level + 1
          temp[data[k][pid]][childrenKey].push(data[k])
        } else {
          res.push(data[k])
        }
      }
      return res
    },

    // 新增 / 修改
    addOrUpdateHandle (row) {
      this.addOrUpdateVisible = true
      console.log('传给弹窗的row::', row)
      this.$refs.addOrUpdate.open(row)
    },
    // 删除
    deleteHandle (id, name) {
      this.$confirm(`确定对 [名称为 ${name}] 进行 [删除] 操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        SuperApi.delAuth(id).then(({ data }) => {
          this.$message.success('操作成功')
          this.getData()
        })
      }).finally(() => {
      })
    }
  }
}
</script>
<style>
  .el-popper {
    max-height: 500px;
    max-width: 200px;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
