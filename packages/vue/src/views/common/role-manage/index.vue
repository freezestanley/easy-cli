<template>
  <div class="page page-role-manage">
    <div class="filter-form">
      <el-form ref="form" :model="form" :inline="true" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" clearable auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm('form')">重置</el-button>
              <div class="opt-add-btn">
                <el-button v-permission="'role__check'" type="primary" icon="el-icon-plus" @click="handleAddRole">新增角色</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <basic-table v-loading="loading" stripe :data="listData" :col-configs="colConfigs">
      <el-table-column slot="status" label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 'INVALID'" class="error">已失效</div>
          <div v-else class="success">使用中</div>
        </template>
      </el-table-column>
      <el-table-column slot="opt" label="操作" width="300">
        <template slot-scope="scope">
          <span>
            <el-button v-permission="'role__modify'" type="text" size="small" @click="handleEditRole(scope.row)">编辑角色</el-button>
            <el-button type="text" size="small" @click="handleViewUser(scope.row.roleUserList)">查看用户</el-button>
            <el-button v-permission="'role__delete'" type="text" size="small" class="error" @click="handleDeleteRole(scope.row)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </basic-table>

    <Pagination
      v-if="listData.length"
      :page-size="pageSize"
      :current-page="pageNum"
      :total="total"
      :current-change="onCurrentChange"
      :size-change="onSizeChange"
    />

    <!-- 用户列表 -->
    <el-dialog
      title="用户详情"
      :visible.sync="listDialogVisible"
      :append-to-body="true"
      width="800px"
    >
      <user-table :list-data.sync="selectedUserList" @refresh="handleDeleteUser" />
    </el-dialog>

    <!-- 角色 -->
    <el-dialog
      :visible.sync="roleDialogVisible"
      :title="roleDialogType === 'edit'? '编辑角色' :'新增角色'"
      :append-to-body="true"
      @closed="handleRoleDialogClose"
    >
      <el-form ref="roleForm" :rules="roleFormRule" :model="roleForm" label-width="80px" label-position="left" class="form-container">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名" :maxlength="20" :show-word-limit="true" />
        </el-form-item>
        <el-form-item label="权限" prop="showAuthNos">
          <div v-loading="loading" class="tree-wrap">
            <el-tree
              ref="authTree"
              :data="data"
              show-checkbox
              :filter-node-method="getTree"
              node-key="authNo"
              :default-checked-keys="roleForm.showAuthNos"
              @check-change="getCheckedKeys"
            />
          </div>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="closeTree">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import UserTable from './components/UserTable'

import tableMixin from '@/utils/tableMixin'
import { CommonApi, SuperApi } from '@/api'
import { ROLE_AUTH_LIST, ROLE_AUTH_LIST_MAP } from '@/utils/authList'

import { mapGetters } from 'vuex'
import { Promise } from 'q'

export default {
  name: 'RoleList',
  components: {
    BasicTable,
    Pagination,
    UserTable
  },
  mixins: [tableMixin],
  data () {
    return {
      roleType: 'PLATFORM',
      data: [],
      loading: false,
      deleteBatchArr: [],
      checkedAuth: [],
      roleNo: '',
      form: {
        roleName: '',
        // nickName: '',
        // loginName: '',
        status: '',
      },
      listData: [],
      colConfigs: [
        { label: '角色名称', prop: 'roleName' },
        { label: '用户数量', prop: 'count' },
        { label: '生成时间', prop: 'gmtCreated', formatter: (row) => { return this.formatterTime(row.gmtCreated) } },
        { slot: 'status' },
        { slot: 'opt' }
      ],
      listDialogVisible: false,
      selectedUserList: [],
      roleDialogVisible: false,
      roleDialogType: 'add',
      roleForm: {
        roleName: '',
        authDtoList: [],
        showAuthNos: [],
      },
      roleFormRule: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
        ],
        showAuthNos: [
          { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
        ]
      },
      selectedRoleId: '',
      userInfo: {
        'nickName': '',
        'mobile': '',
        'loginName': '',
        'pwd': '',
        'email': '',
      },
    }
  },
  computed: {
    ...mapGetters([
      'role',
    ]),
    authConfigList() {
      return ROLE_AUTH_LIST[this.role]
    },
    authMap() {
      return ROLE_AUTH_LIST_MAP[this.role]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getTree() {
      this.loading = true
      SuperApi.listAuth({
        roleType: this.role
      }).then(res => {
        const checkeds = []
        this.setIndexChecked(checkeds)
        this.data = this.transform(res.data.allAuth)
        this.$nextTick(() => {
          this.$refs.authTree && this.$refs.authTree.setCheckedKeys(checkeds)
        })
      }).finally(() => {
        this.loading = false
      })
    },
    setIndexChecked(checkeds) {
      if (!checkeds.includes(this.role + '_index__todo')) {
        checkeds.push(this.role + '_index__todo')
      }
    },
    closeTree() {
      this.roleDialogVisible = false
      this.$nextTick(() => {
        this.$refs.authTree && this.$refs.authTree.setCheckedKeys([])
      })
    },
    getCheckedKeys() {
      this.roleForm.authDtoList = this.$refs.authTree.getHalfCheckedKeys()
      this.roleForm.showAuthNos = this.$refs.authTree.getCheckedKeys()
    },
    transform(data) {
      return data.map((item) => {
        if (item.children && item.children.length) {
          return {
            label: item.authName,
            authNo: item.authNo,
            children: this.transform(item.children),
            disabled: item.authNo === this.role + '_index'
          }
        } else {
          return {
            label: item.authName,
            authNo: item.authNo,
            children: item.chidren,
            disabled: item.authNo === this.role + '_index__todo'
          }
        }
      })
    },
    getData() {
      if (this.loading) return
      this.loading = true
      CommonApi.queryRoleList({
        ...this.form,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        this.listData = res.data
        if (JSON.stringify(res.data) !== '[]') {
          this.data = this.transform(res.data[0].authList)
        }
        if (this.data.length === 0) {
          this.getTree()
        }
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleViewUser(roleUserList) {
      console.log(roleUserList)
      this.selectedUserList = roleUserList || []
      this.listDialogVisible = true
    },
    handleDeleteUser() {
      this.listDialogVisible = false
      this.getData()
    },
    handleAddRole() {
      this.roleDialogVisible = true
      this.roleDialogType = 'add'
      this.getTree()
    },
    handleEditRole(row) {
      this.selectedRoleId = row.id
      this.roleNo = row.roleNo
      this.roleForm = {
        roleName: row.roleName,
      }
      this.checkedAuth = []
      this.roleForm.showAuthNos = []
      for (let i = 0; i < row.hasAuthList.length; i++) {
        this.checkedAuth.push(row.hasAuthList[i].authNo)
        this.roleForm.showAuthNos.push(row.hasAuthList[i].authNo)
      }
      this.setIndexChecked(this.roleForm.showAuthNos)
      this.roleDialogVisible = true
      this.$nextTick(() => {
        this.$refs.authTree.setCheckedKeys(this.roleForm.showAuthNos)
      })
      this.roleDialogType = 'edit'
    },
    _authObjectToArr(arr = []) {
      const result = []
      arr.forEach(item => {
        if (item.authNo) {
          result.push(item.authNo)
        }
      })
      return result
    },
    validateRoleForm() {
      return new Promise((resolve, reject) => {
        this.$refs.roleForm.validate(valid => {
          if (valid) {
            resolve(valid)
          }
        })
      })
    },
    async confirmRole() {
      const isEdit = this.roleDialogType === 'edit'
      const valid = await this.validateRoleForm()

      if (!valid) {
        return
      }
      if (isEdit) {
        const data = {
          roleName: this.roleForm.roleName,
          authNoList: this.roleForm.authDtoList,
          showAuthNoList: this.roleForm.showAuthNos,
          roleNo: this.roleNo,
          sortNum: '0',
          status: 'VALID'
        }
        CommonApi.modifyRole({
          roleId: this.selectedRoleId,
          ...data
        }).then(() => {
          this.$message({
            message: '修改角色成功',
            type: 'success'
          })
          this.getData()
          this.$refs['roleForm'].resetFields()
          this.data = []
          this.roleDialogVisible = false
        })
      } else {
        const data = {
          roleName: this.roleForm.roleName,
          authNos: this.roleForm.authDtoList,
          showAuthNos: this.roleForm.showAuthNos,
          sortNum: '0',
          status: 'VALID'
        }
        CommonApi.addRole(data).then(() => {
          this.$message({
            message: '添加角色成功',
            type: 'success'
          })
          this.onSearch()
          this.$refs['roleForm'].resetFields()
          this.data = []
          this.roleDialogVisible = false
        })
      }
    },
    _toAuthObject(arr = []) {
      const result = []
      arr.forEach(item => {
        if (this.authMap[item]) {
          result.push({
            authName: this.authMap[item],
            authNo: item
          })
        }
      })
      return result
    },
    handleRoleDialogClose() {
      this.roleDialogType = 'add'
      this.closeTree()
      this.$refs.roleForm.resetFields()
      this.roleForm = {
        roleName: '',
        authDtoList: []
      }
    },
    handleDeleteRole(row) {
      const { count } = row
      console.log(row)
      if (count) {
        this.$myConfirm({
          msg: '当前有用户在使用该角色，不能删除！',
          title: '删除',
          icon: 'delete',
          btnstr: '知道了'
        })
      } else {
        this.$myConfirm({
          msg: '确定要删除该角色吗？',
          title: '删除',
          icon: 'delete'
        }).then(() => {
          CommonApi.deleteRole({
            roleNo: row.roleNo
          }).then(() => {
            this.getData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  /deep/ .el-input .el-input__count .el-input__count-inner {
    line-height: 1;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
.form-class {
  /deep/ .el-form-item--small.el-form-item {
    margin-bottom: 16px;
  }
  /deep/ .el-input__inner {
    width: 240px;
  }
  /deep/ .el-range-editor--small.el-input__inner {
    width: 240px !important;
  }
}
.marb-32 {
  margin-bottom: 32px;
}
.marl-60 {
  margin-left: 60px;
}
.opt-add-btn-left{
  text-align: left !important;
  margin-bottom: 16px;
}
</style>
