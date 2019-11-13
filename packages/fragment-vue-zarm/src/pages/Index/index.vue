<template>
  <div class="p-index-container">
    <za-button theme="primary" class="test">hello world</za-button>
  </div>
</template>

<script>
import CtrlApps from '../../global'

export default {
  name: 'Index',
  data() {
    return {
      name: CtrlApps.classNamespace
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style>
.test {
  margin-top: 100px;
  margin-left: 100px;
}
</style>
