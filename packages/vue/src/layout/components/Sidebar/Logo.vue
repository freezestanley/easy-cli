<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo1" :src="logo1" class="sidebar-logo1">
        <!-- <h1 v-else class="sidebar-title">{{ title }} biaoti </h1> -->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <h1 class="sidebar-title">{{ title }} </h1> -->
        <img v-if="logo2" :src="logo2" class="sidebar-logo2">
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo1 from '@/assets/logo1.png'
import logo2 from '@/assets/logo.png'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '众企安链',
      logo1,
      logo2
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 64px;
  line-height: 50px;
  background: $navBg;
  text-align: left;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    .sidebar-logo1 {
      height: 28px;
      margin-left: 9px;
      margin-bottom: 4px;
      vertical-align: bottom;
    }
    .sidebar-logo2 {
      // width: 170px;
      height: 28px;
      vertical-align: bottom;
      margin-left: 24px;
      margin-bottom: 4px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
