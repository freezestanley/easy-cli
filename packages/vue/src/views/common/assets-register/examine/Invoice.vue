<template>
  <div class="block">
    <slot />
    <div class="item">
      <p>
        <label>发票代码</label>
        <span>{{ info.invoiceCode }}</span>
      </p>
      <p>
        <label>发票编号</label>
        <span>{{ info.invoiceNo }}</span>
      </p>
      <p>
        <label>发票金额</label>
        <span>{{ info.invoiceAmount | formatWan }} 万</span>
      </p>
    </div>
    <div class="item">
      <p>
        <label>开票时间</label>
        <span>{{ info.startDate }}{{ info.endDate ? ` - ${info.endDate}` : '' }}</span>
      </p>
      <p>
        <label>发票附件</label>
        <span>
          <div v-for="(file,index) in assetAttachFiles" :key="index" class="download">
            {{ file.fileName }}
            <Download :url="file.fileUrl" direct>
              <el-link style="width:50px" type="primary">下载</el-link>
            </Download>
          </div>
        </span>
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
  name: 'Invoice',
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

