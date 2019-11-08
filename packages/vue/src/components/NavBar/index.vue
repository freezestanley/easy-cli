<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <router-link class="sidebar-logo-link" to="/">
      <!-- <h1 class="sidebar-title">{{ title }} </h1> -->
      <img v-if="logo2" :src="logo2" class="sidebar-logo2">
    </router-link>
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="right-menu">
      <!-- <div class="nav-item">你好，{{ name }}</div> -->
      <!-- <router-link :to="(role === ROLE_MAP.PLATFORM ? '/paccount' : '/account') + '/message'">
        <div class="nav-item">
          <el-badge :is-dot="messageCount !== 0" class="badge-dot">
            <el-button icon="el-icon-message" type="text" />
            <svg-icon icon-class="message" class="dot-btn" />
          </el-badge>
          <span class="msg-text">消息中心</span>
        </div>
      </router-link> -->
      <!-- <div class="nav-item" @click="logout">
        <i class="el-icon-switch-button" /> 注销
      </div> -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <span class="el-dropdown-link user-name">
            {{ '您好, ' + loginName }}
          </span>
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/setting">
            <el-dropdown-item>
              账号设置
            </el-dropdown-item>
          </router-link> -->
          <el-dropdown-item>
            <span style="display:block;min-width:60px;text-align:center;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ROLE_MAP } from '@/utils/constant/index'
import logo2 from '@/assets/logo2.png'
export default {
  components: {
  },
  data() {
    return {
      userInfo: {
        name: '这里是用户名'
      },
      ROLE_MAP,
      logo2,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'loginName',
      'role',
      'messageCount'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  color: #fff;
  background: $navBg;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .sidebar-logo-link {
    position: relative;
    width: 100%;
    height: 64px;
    line-height: 50px;
    background: #1a202e;
    text-align: left;
    overflow: hidden;
  }

  .sidebar-logo2{
    height: 28px;
    vertical-align: bottom;
    margin-left: 24px;
    margin-bottom: 4px;
  }

  .hamburger-container {
    line-height: $nav-height;
    margin-top: -2px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    color: $theme;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    /deep/ .el-breadcrumb__inner {
      a {
        color: $theme;
      }
      .no-redirect {
        color: #fff;
      }
    }
  }

  .right-menu {
    display: flex;
    float: right;
    height: 100%;
    line-height: $nav-height;
    align-items: center;
    font-size: 14px;
    color: #fff;

    &:focus {
      outline: none;
      color: $theme;
    }
    .nav-item {
      padding: 10px;
      color: #fff;
      display: flex;
      align-items: center;
      .badge-dot {
        line-height: 1;
        vertical-align: baseline;
        vertical-align: -webkit-baseline-middle;
      }
      .dot-btn {
        font-size: 18px;
        margin-top: 2px;
        color: currentColor;
      }
      .msg-text {
        margin-left: 4px;
      }
      &:hover {
        color: $hover;
        cursor: pointer;
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      color: #fff;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          vertical-align: middle;
        }
        .user-name {
          padding-left: 10px ;
          cursor: pointer;
        }
        .el-icon-caret-bottom {
          // position: absolute;
          // right: -20px;
          // top: 25px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
