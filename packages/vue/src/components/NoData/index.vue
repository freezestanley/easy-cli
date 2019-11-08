<template>
  <div class="no-data" :class="{'no-result': isNoResult}">
    {{ title }}
  </div>
</template>

<script>
// 全局组件
export default {
  name: 'NoData',
  props: {
    title: {
      type: String,
      default: '暂无数据'
    },
    isNoResult: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.no-data {
  height: 100%;
  overflow: hidden;
  padding-top: 160px;
  padding-bottom: 40px;
  color: #889099;
  text-align: center;
  font-size: 14px;
  background-image: url('../../assets/images/no-data.png');
  background-color: #fff;
  background-size: 135px 135px;
  background-position: center 10px;
  background-repeat: no-repeat;
  &.no-result {
    background-image: url('../../assets/images/no-result.png');
  }
}
</style>
