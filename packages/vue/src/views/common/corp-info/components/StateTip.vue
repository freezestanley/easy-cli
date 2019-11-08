<template>
  <div>
    <!-- info -->
    <div v-if="type === 'info'" class="state-container info-status">
      <i class="el-icon-warning icon icon-info" />
      <div class="tips">{{ tips }}</div>
    </div>
    <!-- error -->
    <div v-if="type === 'error'" class="state-container error-status">
      <i class="el-icon-error icon icon-error" />
      {{ '审核失败，失败原因：' + tips }}
    </div>
    <!-- success -->
    <div v-if="type === 'success'" class="state-container success-status">
      <i class="el-icon-success icon icon-success" />
      {{ '企业信息已认证' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StateTip',
  props: {
    type: {
      type: String,
      required: true
    },
    tips: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
$authErrorBg: #feebe9;
$authInfoBg: #ebf5ff;

.state-container {
  padding: 10px 10px;
  line-height: 20px;
  border-radius:4px;
  color: $titleColor;
}
.info-status {
  background: $authInfoBg;
}
.error-status {
  background: $authErrorBg;
}
.error-status {
  background: $authErrorBg;
}
.success-status {
  background-color: #e9f9ea;
}
.tips {
  display: inline-block;
}
.icon {
  font-size: 20px;
}
.icon-info {
  color: $wait;
}
.icon-error {
  color: $error;
}
.icon-success {
  color: $success;
}
</style>

