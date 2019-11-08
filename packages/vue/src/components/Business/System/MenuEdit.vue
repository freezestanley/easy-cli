<template>
  <el-dialog
    :title="isUpdate ? '修改' : '新增'"
    :close-on-click-modal="false"
    :before-close="close"
    :visible.sync="visible"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="110px"
      @keyup.enter.native="dataFormSubmit()"
    >
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type" @change="resetField">
          <el-radio v-for="(type, index) in MENU_TEXTS" :key="index" :label="type.value">{{ type.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="MENU_AUTH[dataForm.type] + '名称'" prop="authName">
        <el-input v-model="dataForm.authName" :clearable="true" :placeholder="MENU_AUTH[dataForm.type] + '名称'" />
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentAuthName">
        <el-popover
          ref="menuListPopover"
          placement="top-start"
          trigger="click"
        >
          <!-- <el-tree
            ref="menuListTree"
            :data="menuList"
            :props="menuListTreeProps"
            node-key="authNo"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
            @current-change="menuListTreeCurrentChangeHandle"
          /> -->
          <!-- <el-select v-model="dataForm.parentAuthName" @change="selectParent">
            <el-option v-for="menu in parentList" :key="menu.authNo" :label="menu.authName" :value="menu.authNo" />
          </el-select> -->
        </el-popover>
        <el-select v-model="dataForm.parentAuthName" class="w100" @change="selectParent">
          <el-option v-for="menu in parentList" :key="menu.authNo" :label="menu.authName" :value="menu.authNo" />
        </el-select>
        <!-- <el-input
          v-model="dataForm.parentAuthName"
          v-popover:menuListPopover
          placeholder="点击选择上级菜单"
          :clearable="true"
        /> -->
      </el-form-item>
      <el-form-item v-if="dataForm.type !== MENU_AUTH.KEY_BUTTON" label="菜单路由" prop="url">
        <el-input v-model="dataForm.url" placeholder="菜单路由" />
      </el-form-item>
      <el-form-item v-if="dataForm.type !== MENU_AUTH.KEY_BUTTON" label="页面组件" prop="component">
        <el-input v-model="dataForm.component" placeholder="菜单路由" />
      </el-form-item>
      <el-form-item v-if="dataForm.type === MENU_AUTH.KEY_CATA" label="重定向" prop="redirect">
        <el-input v-model="dataForm.redirect" placeholder="重定向菜单" />
      </el-form-item>
      <el-form-item label="授权标识" prop="perms">
        <el-input v-model="dataForm.perms" placeholder="多个用下划线分隔, 如: user_list,user_create" />
      </el-form-item>
      <el-form-item v-if="dataForm.type !== MENU_AUTH.KEY_BUTTON" label="排序号" prop="sortNum">
        <el-input-number v-model="dataForm.sortNum" controls-position="right" :min="0" label="排序号" class="w100" />
      </el-form-item>
      <el-form-item v-if="dataForm.type !== MENU_AUTH.KEY_BUTTON" label="菜单图标" prop="icon">
        <el-row>
          <el-col>
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover"
            >
              <div class="mod-menu__icon-list">
                <el-button
                  v-for="(item, index) in iconList"
                  :key="index"
                  :class="{ 'is-active': item === dataForm.icon }"
                  @click="iconActiveHandle(item)"
                >
                  <svg-icon :icon-class="item" />
                </el-button>
              </div>
              <el-button class="fr" @click="dataForm.icon = ''">重置</el-button>
            </el-popover>
            <el-input
              v-model="dataForm.icon"
              v-popover:iconListPopover
              :readonly="true"
              placeholder="菜单图标名称"
              class="icon-list__input"
            />
            <svg-icon v-if="dataForm.icon" :icon-class="dataForm.icon" class="pos-icon" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="dataForm.type === MENU_AUTH.KEY_MENU" label="在侧菜单显示" prop="visible">
        <el-radio v-model="dataForm.visible" label="Y">显示</el-radio>
        <el-radio v-model="dataForm.visible" label="N">隐藏</el-radio>
      </el-form-item>
      <el-form-item v-if="dataForm.type === MENU_AUTH.KEY_MENU" label="返回按钮" prop="back">
        <el-checkbox v-model="dataForm.back">显示返回按钮</el-checkbox>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="dataForm.remarks" :clearable="true" :placeholder="MENU_AUTH[dataForm.type] + '名称'" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Icon from '@/icons'
import { SuperApi } from '@/api/'
const MENU_TEXTS = [
  { value: 'CATA', label: '目录' },
  { value: 'MENU', label: '菜单' },
  { value: 'BUTTON', label: '按钮' }
]
const MENU_AUTH = {
  CATA: '目录',
  MENU: '菜单',
  BUTTON: '按钮',
  KEY_CATA: 'CATA',
  KEY_MENU: 'MENU',
  KEY_BUTTON: 'BUTTON',
}
const tempForm = {
  authNo: '',
  type: 'MENU',
  authName: '',
  parentAuthNo: '',
  parentAuthName: '',
  url: '', // 菜单path
  component: '', // 页面组件
  perms: '', // 权限标识
  sortNum: 0, // 菜单排序
  icon: '', // svg icon名
  roleType: '', // 所属角色类型  PLATFORM FUND CHAIN CORE
  visible: 'Y', // 是否显示在菜单栏
  back: 'N', // 是否有返回按钮
  remarks: '', // 备注
}
export default {
  props: {
    authInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    // parentList: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    roleType: {
      type: String,
      required: true
    }
  },
  data () {
    const validateUrl = (rule, value, callback) => {
      if (this.dataForm.type === MENU_AUTH.KEY_MENU && !/\S/.test(value)) {
        callback(new Error('菜单URL不能为空'))
      } else {
        callback()
      }
    }
    const validateParent = (rule, value, callback) => {
      if (this.dataForm.type !== MENU_AUTH.KEY_CATA && !/\S/.test(value)) {
        callback(new Error('父菜单不能为空'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      MENU_TEXTS,
      MENU_AUTH,
      dataForm: {
        ...tempForm
      },
      dataRule: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        parentAuthName: [
          // { required: true, message: '上级菜单不能为空', trigger: 'change' }
          { validator: validateParent, trigger: 'blur' }
        ],
        url: [
          { validator: validateUrl, trigger: 'blur' }
        ]
      },
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      iconList: [],
      parentList: [],
    }
  },
  computed: {
    isUpdate() {
      return !!this.dataForm.authNo
    }
  },
  created () {
    this.iconList = Icon.getNameList()
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0

      this.$http({
        url: '/sys/menu/select',
        method: 'get'
      }).then(({ data }) => {
        this.menuList = this.treeDataTranslate(data.menuList, 'authNo')
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }).then(() => {
        if (!this.dataForm.id) {
          // 新增
          this.menuListTreeSetCurrentNode()
        } else {
          // 修改
          this.setAuth({
            ...this.dataForm
          }).then(({ data }) => {
            this.dataForm.auth = data.menu.authNo
            this.dataForm.type = data.menu.type
            this.dataForm.authName = data.menu.authName
            this.dataForm.parentAuthNo = data.menu.parentAuthNo
            this.dataForm.url = data.menu.url
            this.dataForm.perms = data.menu.perms
            this.dataForm.sortNum = data.menu.sortNum
            this.dataForm.icon = data.menu.icon
            this.menuListTreeSetCurrentNode('mod')
          })
        }
      })
    },
    open(props) {
      if (props && props.authNo) { // 修改
        console.log(props)
        this.dataForm = { ...props, back: props.back === 'Y' && props.type !== 'CATA' }
      }
      this.getParentList()
      this.visible = true
    },
    close() {
      this.$refs.dataForm.resetFields()
      this.dataForm = { ...tempForm }
      this.visible = false
    },
    getParentList() {
      SuperApi.simplifyAuthList({
        roleType: this.roleType
      }).then(res => {
        this.parentList = res.data.filter(i => i.type === 'CATA')
      })
    },
    selectParent(data) {
      console.log('DATA', data)
      this.dataForm.parentAuthNo = data
      this.dataForm.parentAuthName = data
    },
    // 菜单树选中
    menuListTreeCurrentChangeHandle (data, node) {
      this.dataForm.parentAuthNo = data.authNo
      this.dataForm.parentAuthName = data.authName
    },
    // 菜单树设置当前选中节点
    menuListTreeSetCurrentNode (type) {
      if (type === 'CATA') {
        this.$refs.menuListTree.setCurrentKey(this.dataForm.parentAuthNo)
        this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
      }
    },
    // 图标选中
    iconActiveHandle (iconName) {
      this.dataForm.icon = iconName
    },
    resetField() {
      this.$refs['dataForm'].clearValidate()
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const api = this.isUpdate ? SuperApi.updAuth : SuperApi.addAuth
          const dataForm = this.dataForm
          api({
            authNo: dataForm.authNo || '',
            type: dataForm.type,
            authName: dataForm.authName,
            parentAuthNo: dataForm.parentAuthNo,
            url: dataForm.url,
            component: dataForm.component,
            perms: dataForm.perms,
            sortNum: dataForm.sortNum,
            icon: dataForm.icon,
            visible: dataForm.visible,
            back: (dataForm.type === 'MENU' && dataForm.back) ? 'Y' : 'N',
            remarks: dataForm.remarks,
            roleType: this.roleType
          }).then(({ data }) => {
            this.$message.success('操作成功')
            this.visible = false
            this.$emit('success')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">

  .menu-list__input,
  .icon-list__input {
    font-size: 0;
    > .el-input__inner {
      cursor: pointer;
    }

  }

  .mod-menu__icon-popover {
    max-width: 350px;
  }

  .mod-menu__icon-list {
    max-height: 380px;
    padding: 0;
    margin: -8px 0 0 -8px;

    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;

      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }

    }
  }
  .pos-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .icon-list__tips {
    font-size: 18px;
    text-align: center;
    color: #e6a23c;
    cursor: pointer;
  }
</style>
