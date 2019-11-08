<template>
  <div>

    <div v-clickoutside="handleClose" class="d3-container" @click="hideSet">
      <!-- 绘图部分 -->
      <svg :id="copyData.flowType + '_' + commonFlowId" ref="svg">
        <g ref="g" />
      </svg>

      <!-- 操作按钮 -->
      <div v-show="showOption" ref="box" :class="['sign-option','show-' + btnNub]">
        <div class="item">
          <el-tooltip effect="dark" content="新增" placement="top">
            <el-button :disabled="!canAdd" type="primary" icon="el-icon-plus" circle @click="handleAddNode" />
          </el-tooltip>
        </div>
        <div class="item">
          <el-tooltip effect="dark" content="删除" placement="right">
            <el-button :disabled="!canDel" type="primary" icon="el-icon-delete" circle @click="handleDelNode" />
          </el-tooltip>
        </div>
        <div class="item">
          <el-tooltip effect="dark" content="配置" placement="right">
            <el-button :disabled="!canModify" type="primary" icon="el-icon-edit" circle @click="handleModifyNode" />
          </el-tooltip>
        </div>
      </div>

    </div>

    <div class="btn-block">
      <el-button type="primary" @click="delAllConfig">删除全部</el-button>
      <el-button :loading="saveLoding" type="primary" @click="updataConfig">保存</el-button>
    </div>

    <!-- 添加/编辑节点 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="选择人员"
      width="500px"
      :before-close="close"
    >
      <el-form ref="basicForm" :model="basicForm" :rules="ruleBasic" label-position="left" label-width="55px">
        <el-form-item label="角色" prop="choosedRole">
          <el-select v-model="basicForm.choosedRole" value-key="roleNo" class="select-class" @change="handleRoleChange">
            <el-option
              v-for="item in roleData"
              :key="item.roleNo"
              :label="item.roleName || ''"
              :value="item"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="人员" prop="choosedUser">
          <el-select
            v-model="basicForm.choosedUser"
            value-key="operNo"
            multiple
            :multiple-limit="limit"
            filterable
            placeholder="请选择"
            class="select-class"
            :disabled="!basicForm.choosedRole"
          >
            <el-option
              v-for="item in basicForm.choosedRole.roleUserList"
              :key="item.operNo"
              :label="item.loginName || ''"
              :value="item"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'

import { mapGetters } from 'vuex'
import { CommonApi } from '@/api'

export default {
  inject: ['indexData'],
  props: {
    processData: {
      type: Object,
      required: true,
    },
    commonFlowId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      softFocus: false,
      hoverIndex: null, // 鼠标hover节点的index
      showOption: false,
      // 对初始值拷贝作为初始化，后续内部都用这个拷贝
      copyData: JSON.parse(JSON.stringify(this.processData)),
      flowData: [],
      btnNub: 3,
      canAdd: true,
      canDel: true,
      canModify: true,
      limit: 0,
      dialogVisible: false,
      dialogType: 'add',
      basicForm: {
        choosedRole: '',
        choosedUser: [], // 选中的用户
      },
      ruleBasic: {
        choosedRole: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        choosedUser: [
          { type: 'array', required: true, message: '请选择', trigger: 'change' },
        ]
      },
      roleData: [],
      saveLoding: false,
      firstData: [], // 第一次的flowData，用来判断数据是否被修改
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
  },
  watch: {
    // 现在貌似没有这个场景了，传入的processData现在不会变
    processData: {
      // immediate: true,
      deep: true,
      handler: function (val) {
        this.copyData = JSON.parse(JSON.stringify(this.processData))
        this.flowData = this.handlerGetData(val)
        this.firstData = JSON.parse(JSON.stringify(this.flowData))
        this.draw()
      }
    },
    hoverIndex: function(val) { // watch这个判断要显示几个按钮和一些配置逻辑
      if (Number.isInteger(val)) {
        this.handleBtnDisable()
      }
    },
    softFocus: function(val) {
      if (val) {
        this.showOption = true
      } else {
        // this.hoverIndex = null
        this.showOption = false
      }
    }
  },
  mounted() {
    // 因为这里涉及到了获取元素节点
    this.$nextTick(() => {
      this.svg = d3.select('svg#' + this.copyData.flowType + '_' + this.commonFlowId)
      this.inner = this.svg.select('g')
      this.render = new dagreD3.render() // eslint-disable-line
      // this.g = new dagreD3.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(function() { return {} })
      this.zoom = d3.zoom().on('zoom', () => {
        this.inner.attr('transform', d3.event.transform)
      })

      this.flowData = this.handlerGetData(this.copyData)
      this.firstData = JSON.parse(JSON.stringify(this.flowData))
      this.draw()
    })
  },
  methods: {
    handlerGetData(val) {
      const result = []
      if (val.flowType && val.nodeName) {
        result.push({
          nodeType: 'start', // 表示开始节点，只能往下新增
          nodeCode: val.flowType + '_' + this.commonFlowId + '_node_0',
          nodeName: val.nodeName,
          flowType: val.flowType,
        })
      }
      if (Array.isArray(val.activityModelChildDtos) && val.activityModelChildDtos.length) {
        val.activityModelChildDtos.forEach((item, index) => {
          result.push({
            nodeType: 'sub', // 表示子节点，这些是我们添加的
            nodeCode: val.flowType + '_' + this.commonFlowId + '_node_' + (index + 1),
            nodeName: this._getUserNameStr(item.roleName || 'ADMIN', item.modelUser),
            flowType: val.flowType,
            modelUser: item.modelUser || [],
            // 角色信息
            roleNo: item.roleNo || 'ADMIN',
            roleName: item.roleName || 'ADMIN',
          })
        })
      }
      return result
    },
    draw() {
      this.g = new dagreD3.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(function() { return {} })

      // 设置节点到 graph
      this.flowData.forEach((item, index) => {
        this.g.setNode(item.nodeCode, { // 这个值作为唯一标示，到时候事件中返回的 d 就是这个值
          id: item.nodeCode,
          label: item.nodeName,
          rx: 5,
          ry: 5,
        })
      })
      // 设置线
      for (let i = 0; i <= this.flowData.length - 2; i++) {
        this.g.setEdge(this.flowData[i].nodeCode, this.flowData[i + 1].nodeCode)
      }
      // 绘制
      this.render(this.inner, this.g)
      // 调整大小
      this.$refs.svg.style.width = this.g.graph().width + 'px'
      this.$refs.g.style.height = this.g.graph().height + 'px'
      this.$refs.svg.style.height = this.g.graph().height + 'px'
      // 添加事件
      d3.selectAll('svg#' + this.copyData.flowType + '_' + this.commonFlowId + ' g.node').on('click', this.nodeclick)
    },
    nodeclick(d, i) {
      this.hoverIndex = i

      const rect = document.getElementById(d).getBoundingClientRect()

      this.$refs.box.style.top = rect.bottom - 40 + 'px'
      this.$refs.box.style.left = rect.right + 'px'

      this.softFocus = true
    },
    hideSet(e) {
      if (e.target.tagName === 'rect' || e.target.tagName === 'tspan') {
        return false
      } else {
        this.softFocus = false
      }
    },
    handleBtnDisable() {
      /**
       * 其他节点，审核CHECK、签约SEAL、操作OPERATE
       * 审核最多5层，每一层最多5人
       * 签约最多2层，每一层最多2人
       * 操作最多1层，每一层最多20人
       */
      const nodeData = this.flowData[this.hoverIndex]
      if (nodeData.flowType === 'CHECK') {
        this._handleCheckFlow()
      } else if (nodeData.flowType === 'SEAL') {
        this._handleSealFlow()
      } else if (nodeData.flowType === 'OPERATE') {
        this._handleOperateFlow()
      }
    },
    _handleCheckFlow() {
      this.canAdd = this.hoverIndex < 5 && this.flowData.length < 6
      this.canDel = this.hoverIndex !== 0
      this.canModify = this.hoverIndex !== 0
      this.limit = 5
    },
    _handleSealFlow() {
      this.canAdd = this.hoverIndex < 2 && this.flowData.length < 3
      this.canDel = this.hoverIndex !== 0
      this.canModify = this.hoverIndex !== 0
      this.limit = 2
    },
    _handleOperateFlow() {
      this.canAdd = this.hoverIndex < 1 && this.flowData.length < 2
      this.canDel = this.hoverIndex !== 0
      this.canModify = this.hoverIndex !== 0
      this.limit = 20
    },
    _getUserNameStr(roleName, arr) {
      const result = []
      arr.forEach(item => {
        if (item.name) {
          result.push(item.name)
        }
      })
      return roleName + ': ' + result.join('、')
    },
    handleAddNode() {
      this.softFocus = false

      this.dialogVisible = true
      this.dialogType = 'add'
      this._getRoleUserList()
      this._getChoosedUser()
    },
    handleDelNode() {
      this.softFocus = false

      this.copyData.activityModelChildDtos.splice(this.hoverIndex - 1, 1)
      this.flowData = this.handlerGetData(this.copyData)
      this.draw()
    },
    handleModifyNode() {
      this.softFocus = false

      this.dialogVisible = true
      this.dialogType = 'edit'
      this._getRoleUserList()
      this._getChoosedUser()
    },
    _getChoosedUser() {
      if (this.dialogType === 'add') {
        this.basicForm.choosedUser = []
      } else if (this.dialogType === 'edit') {
        const nodeData = this.flowData[this.hoverIndex]
        // 选中角色
        for (let i = 0; i < this.roleData.length; i++) {
          if (this.roleData[i].roleNo === nodeData.roleNo) {
            this.basicForm.choosedRole = this.roleData[i]
            break
          }
        }

        // 对用户数据处理
        const result = []
        if (nodeData.modelUser && Array.isArray(nodeData.modelUser)) {
          nodeData.modelUser.forEach(item => {
            result.push({
              loginName: item.name,
              operNo: item.id,
            })
          })
        }
        this.basicForm.choosedUser = result
      }
    },
    close() {
      this.dialogVisible = false
      this.basicForm = {
        choosedRole: '',
        choosedUser: [],
      }
      this.$refs.basicForm.resetFields()
    },
    handleDialogSubmit() {
      this.$refs.basicForm.validate(valid => {
        if (valid) {
          if (this.dialogType === 'add') {
            if (!this.copyData.activityModelChildDtos || !Array.isArray(this.copyData.activityModelChildDtos)) {
              this.copyData.activityModelChildDtos = []
            }
            this.copyData.activityModelChildDtos.splice(this.hoverIndex, 0, {
              modelUser: this._formatterUserData1(this.basicForm.choosedUser),
              roleNo: this.basicForm.choosedRole.roleNo,
              roleName: this.basicForm.choosedRole.roleName,
            })
            this.flowData = this.handlerGetData(this.copyData)
            this.draw()
          } else if (this.dialogType === 'edit') {
            this.copyData.activityModelChildDtos.splice(this.hoverIndex - 1, 1, {
              modelUser: this._formatterUserData1(this.basicForm.choosedUser),
              roleNo: this.basicForm.choosedRole.roleNo,
              roleName: this.basicForm.choosedRole.roleName,
            })
            this.flowData = this.handlerGetData(this.copyData)
            this.draw()
          }
          this.close()
        }
      })
    },
    // 把dialog选中的用户数据格式化成后端给的
    _formatterUserData1(arr) {
      const result = []
      arr.forEach(item => {
        result.push({
          id: item.operNo,
          name: item.loginName,
        })
      })
      return result
    },
    delAllConfig() {
      this.copyData.activityModelChildDtos = []
      this.flowData.splice(1)
      this.draw()
    },
    updataConfig() {
      if (this.saveLoding) {
        return
      }

      const data = this._getSaveData()
      if (!data.activityModelChildDtos.length) {
        this.$message({
          message: '至少要配置一个节点',
          type: 'warning'
        })
        return
      }

      this.$securityCode().then((code) => {
        this.saveLoding = true
        CommonApi.createChildFlowTemplate({
          ...data,
          securityCode: code,
        }).then(res => {
          this.$message({
            message: `${this.processData.nodeName} 配置成功`,
            type: 'success'
          })
          this.firstData = JSON.parse(JSON.stringify(this.flowData))
          this.copyData.activityModelChildDtos = data.activityModelChildDtos
        }).finally(() => {
          this.saveLoding = false
        })
      })
    },
    _getSaveData() {
      return {
        corpNo: this.userInfo.corpNo,
        corpType: this.userInfo.roleType,
        commonFlowId: this.commonFlowId,
        flowType: this.processData.flowType,
        activityModelChildDtos: this._getModelChildDtos(),
      }
    },
    _getModelChildDtos() {
      const result = []
      for (let i = 1; i < this.flowData.length; i++) {
        result.push({
          modelIndex: i,
          modelUser: this.flowData[i].modelUser,
          roleNo: this.flowData[i].roleNo,
          roleName: this.flowData[i].roleName,
        })
      }
      return result
    },
    // 对其他层所选中的用户disabled
    _getRoleUserList() {
      const allUserData = JSON.parse(JSON.stringify(this.indexData.userData))

      if (this.dialogType === 'add') {
        this.flowData.forEach((item, index) => {
          if (item.modelUser) {
            for (let i = 0; i < allUserData.length; i++) {
              if (allUserData[i].roleNo === item.roleNo) {
                this._disableUser(allUserData, i, item.modelUser)
                break
              }
            }
          }
        })
      } else if (this.dialogType === 'edit') {
        this.flowData.forEach((item, index) => {
          if (item.modelUser && index !== this.hoverIndex) {
            for (let i = 0; i < allUserData.length; i++) {
              if (allUserData[i].roleNo === item.roleNo) {
                this._disableUser(allUserData, i, item.modelUser)
                break
              }
            }
          }
        })
      }

      this.roleData = allUserData
    },
    _disableUser(allUserData, index, modelUser) {
      for (let i = 0; i < modelUser.length; i++) {
        for (let j = 0; allUserData[index].roleUserList.length; j++) {
          if (allUserData[index].roleUserList[j].operNo === modelUser[i].id) {
            allUserData[index].roleUserList[j].disabled = true
            break
          }
        }
      }
    },
    handleRoleChange() {
      this.basicForm.choosedUser = []
    },
    handleClose() {
      this.softFocus = false
    },
    hasChanged() {
      // console.log(this.firstData[0].flowType)
      const str1 = JSON.stringify(this.firstData)
      const str2 = JSON.stringify(this.flowData)

      return str1 !== str2
    },
    reset() {
      this.flowData = JSON.parse(JSON.stringify(this.firstData))
      this.draw()
    }
  },
}
</script>

<style lang="scss" scoped>
.d3-container {
  display: flex;
  justify-content: center;
  position: relative;

  /deep/ g.new > rect {
    fill: $theme;
  }
  /deep/ text {
    font-weight: 300;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
    font-size: 14px;
    color: $theme;
  }

  /deep/ .node rect {
    stroke: $theme;
    fill: #fff;
    stroke-width: 1.5px;
  }

  /deep/ .edgePath path {
    stroke: $theme;
    stroke-width: 1.5px;
  }
}
.sign-option{
  position: fixed;
  width: 50px;
  height: 40px;
  .item{
    position: absolute;
    top: 0px;
    left: 0px;
    transition: top left 0.4s;
  }
  &.show-3{
    .item:nth-child(1){
      top: -27px;
      left: 8px;
    }
    .item:nth-child(2){
      top: 7px;
      left: 18px;
    }
    .item:nth-child(3){
      top: 40px;
      left: 8px;
    }
  }
  .el-button--medium.is-circle{
    padding:6px;
  }
}
.select-class {
  width: 100%;
}
.btn-block {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
