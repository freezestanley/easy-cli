<template>
  <div class="page page-invite-code">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业类型" prop="corpType">
              <el-select v-model="ruleForm.corpType" placeholder="请选择" class="el-input">
                <el-option label="全部" value />
                <el-option
                  v-for="s in ROLE_TYPE_LIST_PLATFORM"
                  :key="s.value"
                  :label="s.label"
                  :value="s.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请选择" class="el-input">
                <el-option label="全部" value />
                <el-option v-for="s in STATUS_LIST" :key="s.value" :label="s.label" :value="s.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人" prop="contactName">
              <el-input v-model="ruleForm.contactName" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="邀请码" prop="inviteCode">
              <el-input v-model="ruleForm.inviteCode" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="corpName">
              <el-input v-model="ruleForm.corpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
              <div v-permission="'invite-code__add'" class="opt-add-btn">
                <el-button type="primary" @click="add">+ 新增邀请码</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <div v-loading="loading">
        <el-table
          :data="list"
          :empty-text="' '"
          fit
          stripe
          highlight-current-row
        >
          <el-table-column align="center" label="序号" type="index" width="55" />
          <el-table-column label="企业类型" prop="corpType" width="110">
            <template slot-scope="scope">{{ ROLE_TYPE[scope.row.corpType] }}</template>
          </el-table-column>
          <el-table-column label="企业名称" prop="corpName" min-width="150" show-overflow-tooltip />
          <el-table-column label="联系人" prop="contactName" width="120" />
          <el-table-column label="联系邮箱" prop="email" min-width="150" show-overflow-tooltip />
          <el-table-column label="邀请码" prop="inviteCode" width="100" />
          <el-table-column label="邀请码状态" width="100px">
            <template slot-scope="scope">
              <span
                v-if="scope.row.status === STATUS_MAP.KEY_UNUSED"
                class="error"
              >{{ STATUS_MAP[scope.row.status] }}</span>
              <span
                v-else-if="scope.row.status === STATUS_MAP.KEY_UNUSED"
                class="success"
              >{{ STATUS_MAP[scope.row.status] }}</span>
              <span v-else class="disabled">{{ STATUS_MAP[scope.row.status] }}</span>
              <el-button type="text">&nbsp;</el-button>
            </template>
          </el-table-column>
          <el-table-column label="失效时间" prop="expireDate" width="150" />
          <el-table-column label="创建人" prop="creator" width="150" show-overflow-tooltip />
          <el-table-column label="创建时间" prop="gmtCreated" width="150" />
          <div slot="append">
            <NoData v-if="!list.length && !loading" title="暂时没有邀请码" />
          </div>
        </el-table>
        <Pagination
          v-if="list.length && !loading"
          :current-change="onCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          :size-change="onSizeChange"
          :total="total"
        />
      </div>
    </div>
    <el-dialog
      title="新增邀请码"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="520px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="企业类型" prop="corpType" required>
          <el-select v-model="form.corpType" class="db" placeholder="请选择企业类型">
            <el-option
              v-for="s in ROLE_TYPE_LIST_PLATFORM"
              :key="s.value"
              :label="s.label"
              :value="s.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称" prop="corpName">
          <el-input v-model="form.corpName" placeholder="请输入企业名称" />
        </el-form-item>
        <el-form-item label="联系人(选填)" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系人邮箱(选填)" prop="email">
          <el-input v-model="form.email" placeholder="请输入联系人邮箱,邀请码会发送至联系人邮箱" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PlatformApi } from '@/api'
import { STATUS_LIST, STATUS_MAP } from '@/utils/constant/invite-code'
import { ROLE_TYPE, ROLE_TYPE_LIST_PLATFORM } from '@/utils/constant/index'
import { isEmail } from '@/utils/validator'
import tableMixin from '@/utils/tableMixin'
import Pagination from '@/components/Pagination'
const tempForm = {
  corpType: '',
  corpName: '',
  contactName: '',
  email: ''
}
export default {
  name: 'InviteCode',
  components: {
    Pagination
  },
  filters: {
    statusFilter(s) {
      return s === '1' ? '已使用' : '未使用'
    }
  },
  mixins: [tableMixin],
  data() {
    return {
      STATUS_LIST,
      STATUS_MAP,
      ROLE_TYPE,
      ROLE_TYPE_LIST_PLATFORM,
      ruleForm: {
        inviteCode: '',
        contactName: '',
        corpName: '',
        corpType: '',
        status: ''
      },
      loading: false,
      dialogFormVisible: false, // 表单弹窗
      list: [],
      form: { ...tempForm },
      rules: {
        corpName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        corpType: [
          { required: true, message: '请选择企业类型', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getData()
  },

  methods: {
    getData() {
      if (this.loading) return
      this.loading = true
      PlatformApi.queryCorpInviteCode({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          this.list = res.data
          this.total = res.total
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    },
    add() {
      this.dialogFormVisible = true
    },
    cancel() {
      this.$refs.form.resetFields()
      this.dialogFormVisible = false
    },
    setCode(code) {
      PlatformApi.addCorpInviteCode({
        ...this.form,
        securityCode: code
      })
        .then(() => {
          this.getData()
          this.$notify({
            title: '新增成功',
            message: this.form.email
              ? this.form.email + ' 请前往查收'
              : '复制后可发给企业',
            type: 'success'
          })
          this.codeDialogVisible = false
          this.$refs.form.resetFields()
          this.dialogFormVisible = false
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.email) {
            if (!isEmail(this.form.email)) {
              this.$message.error('请输入正确的邮箱地址')
              return
            }
          }
          this.$securityCode().then((code) => {
            this.setCode(code)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
