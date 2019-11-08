<template>
  <div class="block">
    <slot />
    <div class="item">
      <p>
        <label>结算金额</label>
        <span>{{ info.settlementAmount | formatWan }} 万</span>
      </p>
      <p>
        <label>结算日期</label>
        <span>{{ info.settlementDate }}</span>
      </p>
      <p>
        <label>结算编号</label>
        <span>{{ info.settlementNo }}</span>
      </p>
    </div>
    <div class="item">
      <p>
        <label>结算附件</label>
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
  </div>
</template>
<script>
export default {
  name: 'Settlement',
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

