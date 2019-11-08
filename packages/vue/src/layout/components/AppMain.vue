<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*147 = navbar 64 + title 43 + margin 40 */
  min-height: calc(100vh - 148px);
  width: calc(100% - 40px);
  /* position: relative; */
  overflow: hidden;
  margin: 0 20px 20px;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
