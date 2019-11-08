<template>
  <div v-if="url" class="flex">
    <div class="flex-1 ellipsis cursor_pointer">{{ getUrlFileName(url) }}</div>
    <Download class="marl-6 theme cursor_pointer" :direct="direct" :url="url">下载</Download>
  </div>
</template>

<script>
import { getUrlFileName } from '@/utils/'

export default {
  props: {
    url: {
      type: String,
      required: true
    },
    direct: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // url: 'http://za-charity-tst.oss-cn-hzfinance-internal.aliyuncs.com/开发流程_1561430710521.pdf'
    }
  },
  methods: {
    getUrlFileName,
  }
}
</script>

<style lang="scss" scoped>
.name {
  font-size: 14px;
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.marl-6 {
  margin-left: 6px;
}
.cursor_pointer {
  cursor: pointer;
}
</style>
