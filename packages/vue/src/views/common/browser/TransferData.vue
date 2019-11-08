<template>
  <div class="com-transfer-data">
    <el-form label-width="84px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="区块高度">
            {{ hashData.height }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转出方">
            {{ hashData.fromAddress }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="转入方">
            {{ hashData.toAddress }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交易时间">
            {{ hashData.transDate }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="交易数量">
            {{ hashData.amount }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="通证名称">
            {{ hashData.tokenName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="交易类型">
            {{ hashData.transType }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注说明">
            {{ hashData.memo }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="hashData.tokenRecordDto" :gutter="2">
        <el-col :span="24">
          <el-form-item label="流转图" />
          <div :style="{height: height * 90 + 'px', minHeight: '200px', width: depth * 300 + 'px', minWidth: '90%', margin: '0 auto'}" class="shadow">
            <!-- <Tree :data="hashData.tokenRecordDto" /> -->
            <org-chart :ds="hashData.tokenRecordDto" />
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// import Tree from '@/components/Charts/Tree'
import { getDepth, getMaxLength } from '@/utils/'
import OrgChart from '@/components/Charts/OrgChart'
export default {
  name: 'TransferData',
  components: {
    OrgChart
  },
  props: {
    hashData: {
      type: Object,
      default() {
        return {
          tokenRecordDto: {
            children: []
          }
        }
      }
    }
  },
  computed: {
    firstChildren() {
      return this.hashData.tokenRecordDto && this.hashData.tokenRecordDto.children
    },
    depth() {
      return Math.max(...getDepth(this.firstChildren))
    },
    height: {
      get() {
        return getMaxLength(this.firstChildren)
      },
      // set(h) {
      //   this.height = h
      // }
    }
  },
  // data() {
  //   return {
  //     height: 4
  //   }
  // },
  // watch: {
  //   'hashData': {
  //     handler: function(val, old) {
  //       this.height = getMaxLength(val.tokenRecordDto.children)
  //     },
  //     deep: true
  //   }
  // },
}
</script>
<style lang="scss" scoped>
.shadow {
  box-shadow: 0px 0px 12px 0px rgba(101, 85, 246, 0.2);
}
</style>
