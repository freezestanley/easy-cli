<template>
  <div class="page page-role-manage">
    <div class="filter-form">
      <el-form ref="form" :model="form" :inline="true" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名称" prop="nickName">
              <el-input v-model="form.nickName" clearable auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号" prop="loginName">
              <el-input v-model="form.loginName" clearable auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm('form')">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <div class="opt-add-btn opt-add-btn-left">
              <el-button v-permission="'user-list__check'" type="primary" icon="el-icon-plus" @click="userDialogVisible = true">新增用户</el-button>
              <el-button v-permission="'user-list__delete'" @click="handleDeleteRole('batchDelete')">删除</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <basic-table v-loading="loading" stripe :data="listData" :col-configs="colConfigs" @deleteBatch="getMsgFormSon">
      <el-table-column slot="status" label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 'INVALID'" class="error">已失效</div>
          <div v-else class="success">使用中</div>
        </template>
      </el-table-column>
      <el-table-column slot="opt" label="操作" width="300">
        <template slot-scope="scope">
          <span>
            <el-button v-permission="'user-list__modify'" type="text" size="small" @click="getUserRoleList(scope.row)">编辑用户</el-button>
            <!-- <el-button type="text" size="small" @click="handleViewUser(scope.row.roleUserList)">查看用户</el-button> -->
            <!-- <el-button type="text" size="small" @click="handleAddUser(scope.row.id)">增加用户</el-button> -->
            <!-- <el-button type="text" size="small" :class="{ forbid: scope.row.status !== 'INVALID' }" @click="handleModifyRoleStatus(scope.row)">{{ scope.row.status === 'INVALID' ? "启用" : "禁用" }}</el-button> -->
            <el-button v-permission="'user-list__delete'" type="text" size="small" class="error" @click="handleDeleteRole(scope.row)">删除</el-button>
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
    <!-- <el-dialog
      :visible.sync="roleDialogVisible"
      title="编辑角色"
      :append-to-body="true"
      @closed="handleRoleDialogClose"
    >
      <div class="page page-system">
        <el-checkbox-group v-model="checkUserListData">
          <el-checkbox v-for="(item, index) in userListData" :key="index" :label="item.roleNo">{{ item.roleName }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="text-align:right;">
        <el-button @click="roleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog> -->

    <!-- 添加用户 -->
    <el-dialog
      :visible.sync="userDialogVisible"
      :title="roleDialogType === 'edit'? '编辑用户' :'新增用户'"
      :before-close="handleUserDialogClose"
      :append-to-body="true"
    >
      <el-form ref="userInfoForm" :model="userInfo" :rules="userInfoRules" label-width="80px" label-position="left" class="form-container">
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="userInfo.nickName" :disabled="roleDialogType === 'edit'" placeholder="请输入姓名" :maxlength="20" :show-word-limit="true" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userInfo.mobile" :disabled="roleDialogType === 'edit'" placeholder="请输入手机号" :maxlength="20" />
        </el-form-item>
        <el-form-item label="账号" prop="loginName">
          <el-input v-model="userInfo.loginName" :disabled="roleDialogType === 'edit'" placeholder="请输入账号" :maxlength="20" :show-word-limit="true" />
        </el-form-item>
        <!-- <el-form-item label="密码" prop="pwd">
          <el-input v-model="userInfo.pwd" placeholder="请输入密码" />
        </el-form-item> -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" :disabled="roleDialogType === 'edit'" :maxlength="50" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="角色设置" prop="roleNos">
          <el-checkbox-group v-model="userInfo.roleNos">
            <el-checkbox v-for="(item, index) in userListData" :key="index" :label="item.roleNo">{{ item.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="tar">
        <el-button @click="handleUserDialogClose">取消</el-button>
        <el-button type="primary" @click="confirmUser">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import BasicTable from '@/components/BasicUserTable'
import Pagination from '@/components/Pagination'
// import UserTable from './components/UserTable'

import tableMixin from '@/utils/tableMixin'
import { CommonApi } from '@/api'
import { ROLE_AUTH_LIST, ROLE_AUTH_LIST_MAP } from '@/utils/authList'
import { Regs } from '@/utils/validator'

import { mapGetters } from 'vuex'
import { Promise } from 'q'

export default {
  name: 'UserList',
  components: {
    BasicTable,
    Pagination,
    // UserTable
  },
  mixins: [tableMixin],
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!Regs.isPhoneUser(value)) {
        return callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!Regs.isPassword(value)) {
        return callback(new Error('需包含大小写字母和数字，长度6-20位'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!Regs.isEmail(value)) {
        return callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    return {
      deleteBatchArr: [],
      userListData: [],
      checkUserListData: [],
      roleType: 'PLATFORM',
      data: [],
      loading: false,
      checkedAuth: [],
      form: {
        nickName: '',
        loginName: ''
      },
      listData: [],
      colConfigs: [
        { label: '用户名称', prop: 'nickName' },
        { label: '账号', prop: 'loginName' },
        { label: '生成时间', prop: 'gmtCreated', formatter: (row) => { return this.formatterTime(row.gmtCreated) } },
        { label: '用户角色', prop: 'count', formatter: (row) => { return this.getRoleName(row.roles) } },
        { slot: 'status' },
        { slot: 'opt' }
      ],
      listDialogVisible: false,
      selectedUserList: [],
      roleDialogVisible: false,
      roleDialogType: 'add',
      roleForm: {
        roleName: '',
        authDtoList: []
      },
      roleFormRule: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
        ],
        authDtoList: [
          { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
        ]
      },
      userDialogVisible: false,
      selectedRoleId: '',
      userInfo: {
        nickName: '',
        mobile: '',
        loginName: '',
        email: '',
        roleNos: [],
      },
      userInfoRules: {
        nickName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        roleNos: [
          { type: 'array', required: true, message: '请勾选角色', trigger: 'change' },
        ]
      },
      userNo: '',
    }
  },
  computed: {
    ...mapGetters([
      'role'
    ]),
    authConfigList() {
      console.log(ROLE_AUTH_LIST[this.role])
      return ROLE_AUTH_LIST[this.role]
    },
    authMap() {
      console.log(ROLE_AUTH_LIST_MAP[this.role])
      return ROLE_AUTH_LIST_MAP[this.role]
    }
  },
  created() {
    this.getData()
    this.getUserRoleList()
  },
  methods: {
    // getData() {
    //   this.loading = true
    //   CommonApi.queryRoleList({
    //     roleType: this.roleType
    //   }).then(res => {
    //     console.log(res.data)
    //     this.checkedAuth = res.data.checkedAuth
    //     this.data = this.transform(res.data.allAuth)
    //   }).finally(() => {
    //     this.loading = false
    //   })
    // },
    getRoleName(row) {
      const arr = []
      for (let i = 0; i < row.length; i++) {
        arr.push(row[i].roleName)
      }
      return arr.join(' | ')
    },
    getUserRoleList(row) {
      this.loading = true
      if (row === undefined) {
        this.roleDialogType = 'add'
        CommonApi.getUserRoleList({
        }).then(res => {
          this.userListData = res.data.allRoles
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.roleDialogType = 'edit'
        this.userNo = row.operNo
        CommonApi.getUserRoleList({
          userNo: row.operNo
        }).then(res => {
          this.userInfo = {
            'nickName': res.data.nickName,
            'mobile': res.data.mobile,
            'loginName': res.data.loginName,
            'email': res.data.email,
            'roleNos': [],
          }
          const arr = res.data.hasRoles
          this.checkUserListData = []
          for (let i = 0; i < arr.length; i++) {
            this.userInfo.roleNos.push(arr[i].roleNo)
          }
          // this.roleDialogVisible = true
          this.getData()
          this.userDialogVisible = true
        }).finally(() => {
          this.loading = false
        })
      }
    },
    getMsgFormSon(data) {
      this.deleteBatchArr = data
      console.log(this.deleteBatchArr)
    },
    transform(data) {
      return data.map((item) => {
        if (item.children && item.children.length) {
          return {
            label: item.authName,
            authNo: item.authNo,
            children: this.transform(item.children)
          }
        } else {
          return {
            label: item.authName,
            authNo: item.authNo,
            children: item.chidren
          }
        }
      })
    },
    getData() {
      if (this.loading) return
      this.loading = true
      CommonApi.getUserList({
        ...this.form,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.listData = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleCheckedCitiesChange(value, event) {
      // const keyList = event.target.defaultValue.split('_')
      // if (keyList.length > 1 && (keyList[1] === 'HANDLE' || keyList[1] === 'CHECK')) {
      //   this.deleteKey(keyList[1])
      // }
    },
    deleteKey(key) {
      var l = this.roleForm.authDtoList.length
      for (let i = 0; i < l; ++i) {
        const keyList = this.roleForm.authDtoList[i].split('_')
        if (keyList.length > 1) {
          if (key === 'HANDLE') {
            if (keyList[1] === 'CHECK') {
              this.roleForm.authDtoList.splice(i, 1)
              break
            }
          } else {
            if (keyList[1] === 'HANDLE') {
              this.roleForm.authDtoList.splice(i, 1)
              break
            }
          }
        }
      }
    },
    handleViewUser(roleUserList) {
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
    },
    handleEditRole(row) {
      this.selectedRoleId = row.id
      this.roleForm = {
        roleName: row.name,
        authDtoList: this._authObjectToArr(row.authDtoList || [])
      }
      this.roleDialogVisible = true
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
      const data = {
        roleName: this.roleForm.roleName,
        authDtoList: this._toAuthObject(this.roleForm.authDtoList)
      }
      if (isEdit) {
        CommonApi.modifyRole({
          roleId: this.selectedRoleId,
          ...data
        }).then(() => {
          this.$message({
            message: '修改角色成功',
            type: 'success'
          })
          this.roleDialogVisible = false
        })
      } else {
        CommonApi.addRole(data).then(() => {
          this.$message({
            message: '添加角色成功',
            type: 'success'
          })
          this.onSearch()
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
      this.checkUserListData = []
      // this.$refs.roleForm.resetFields()
      this.roleForm = {
        roleName: '',
        authDtoList: []
      }
    },
    handleAddUser(id) {
      this.selectedRoleId = id
      this.userDialogVisible = true
    },
    validateUserInfoForm() {
      return new Promise((resolve, reject) => {
        this.$refs.userInfoForm.validate(valid => {
          if (valid) {
            resolve(valid)
          }
        })
      })
    },
    async confirmUser() {
      console.log(this.checkUserListData)
      const valid = await this.validateUserInfoForm()
      if (!valid) {
        return
      }
      if (this.roleDialogType === 'add') {
        CommonApi.addSaveUser({
          ...this.userInfo,
        }).then(() => {
          this.addRoleUserTip(this.userInfo.email)
        })
      } else {
        CommonApi.editUser({
          ...this.userInfo,
          userNo: this.userNo
        }).then(() => {
          this.getData()
          this.$message.success('修改用户成功')
          this.handleUserDialogClose()
        })
      }
    },
    addRoleUserTip(email) {
      this.$alert(`已发送该账户信息（账号+初始密码）和秘钥（登录时绑定动态码使用）到该用户 ${email} 邮箱，请该用户及时下载App，完成动态码绑定后并修改登录密码`, '提示', {
        confirmButtonText: '知道了'
      }).then(() => {
        this.handleUserDialogClose()
        this.getData()
      })
    },
    handleUserDialogClose() {
      this.checkUserListData = []
      this.userInfo = {
        'nickName': '',
        'mobile': '',
        'loginName': '',
        'email': '',
        'roleNos': [],
      }
      this.$refs.userInfoForm.resetFields()
      this.userDialogVisible = false
      this.roleDialogType = 'add'
    },
    handleModifyRoleStatus(row) {
      const status = row.status === 'VALID'
      let message = '启用后该角色下所有用户都将恢复权限操作，确定要启用该角色吗？'
      if (status) {
        message = '禁用后该角色下所有用户都将不能进行权限操作，确定要禁用该角色吗？'
      }
      this.$myConfirm({
        msg: message,
        title: '禁用',
        icon: 'forbid'
      }).then(() => {
        CommonApi.editUser({
          userNo: row.operNo,
          status: status ? 'INVALID' : 'VALID'
        }).then(() => {
          this.getData()
        })
      }).catch(() => {

      })
    },
    handleDeleteRole(row) {
      const { count } = row
      const arr = []
      console.log(row)
      if (row === 'batchDelete') {
        for (let i = 0; i < this.deleteBatchArr.length; i++) {
          arr.push(this.deleteBatchArr[i].operNo)
        }
      } else {
        arr.push(row.operNo)
      }
      console.log(arr.length)
      if (arr.length === 0) {
        this.$myConfirm({
          msg: '请先选择要删除的用户',
          title: '提示',
          icon: 'delete',
          btnstr: '知道了'
        })
        return 0
      }
      if (count) {
        this.$myConfirm({
          msg: '当前有用户在使用该角色，不能删除！',
          title: '删除',
          icon: 'delete',
          btnstr: '知道了'
        })
      } else {
        this.$myConfirm({
          msg: '确定要删除该用户吗？',
          title: '删除',
          icon: 'delete'
        }).then(() => {
          CommonApi.deleteUser({
            userNos: arr
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
.page-system{
  .el-checkbox{
    width: 40%;
    margin-top: 10px;
    margin-left: 3%;
  }
}
</style>
