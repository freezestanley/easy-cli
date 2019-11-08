<template>
  <div class="block">
    <slot />
    <div class="item">
      <p>
        <label>附件名称</label>
        <span>{{ info.attachName }}</span>
      </p>
      <p>
        <label>合约附件</label>
        <span>
          <div v-for="(file,index) in assetAttachFiles" :key="index" class="download">
            {{ file.fileName }}
            <Download :url="file.fileUrl" direct>
              <el-link
                style="width:50px"
                type="primary"
              >下载</el-link>
            </Download>
          </div>
        </span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Other',
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

