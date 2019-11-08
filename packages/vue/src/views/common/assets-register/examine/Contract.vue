<template>
  <div class="block">
    <slot />
    <div class="item">
      <p>
        <label>合同名称</label>
        <span>{{ info.contractName }}</span>
      </p>
      <p>
        <label>合同编号</label>
        <span>{{ info.contractNo }}</span>
      </p>
      <p>
        <label>合同有效期</label>
        <span>{{ info.contractEffectDate }} ~ {{ info.contractExpireDate }}</span>
      </p>
    </div>
    <div class="item">
      <p>
        <label>总金额</label>
        <span>{{ info.contractAmount | formatWan }} 万</span>
      </p>
      <p>
        <label>付款周期</label>
        <span>{{ info.paymentCycle }} 天</span>
      </p>
      <p>
        <label>付款方式</label>
        <span>{{ info.paymentMethod }}</span>
      </p>
    </div>
    <div class="item">
      <p>
        <label>付款日期</label>
        <span>{{ info.paymentDate }}</span>
      </p>
      <p>
        <label>合同内容</label>
        <span>{{ info.contracServiceContent }}</span>
      </p>
      <p>
        <label>合约附件</label>
        <span>
          <div v-for="(file,index) in assetAttachFiles" :key="index" class="download">
            {{ file.fileName }}
            <Download :url="file.fileUrl" direct>
              <el-link style="width:50px" type="primary">下载</el-link>
            </Download>
          </div>
        </span>
      </p>
    </div>
    <div class="item">
      <p>
        <label>违约处理</label>
        <span>{{ info.breakPromiseHandle }}</span>
      </p>
      <p>
        <label />
        <span />
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Contract',
  props: {
    param: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      info: {},
      assetAttachFiles: []
    }
  },
  created() {
    this.info = { ...this.param.attachParam }
    this.assetAttachFiles = this.param.assetAttachFiles
  }
}
</script>

