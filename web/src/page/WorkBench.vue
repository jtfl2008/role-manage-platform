<template>
  <div id="app" v-cloak>
    <el-header class="header">
      <div class="header__logo" :class="{'el-header--collapse': isCollapse}">
        角色管理平台
      </div>
      <div class="header__content">
        <el-dropdown class="header__dropdown" :show-timeout="0">
          <div>
            {{ $store.state.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户中心</el-dropdown-item>
            <el-dropdown-item>说明文档</el-dropdown-item>
            <el-dropdown-item>设置选项</el-dropdown-item>
            <el-dropdown-item disabled>产品服务</el-dropdown-item>
            <a @click="logout">
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </a>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-menu class="nav" :default-active="activeIndex" :collapse="isCollapse">
      <div class="nav__button" @click="isCollapse = !isCollapse">
        <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      </div>
      <router-link to="/workbench/system">
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">系统管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/workbench/role">
        <el-menu-item index="2">
          <i class="el-icon-star-on"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/workbench/resource">
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
      </router-link>
    </el-menu>
    <el-main class="content" :class="{'el-main--collapse': isCollapse}">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
  import router from '@/router';
  export default {
    name: 'app',
    data: () => {
      return {
        isCollapse: false,
        userName: '游客',
      };
    },
    methods: {
      logout() {
        const that = this;
        this.$http.get('/role-manage/logout').then(res => {
          if (res.data.code === 1) {
            const payload = {
              logState: false,
              username: '',
              user_id: '',
              role: [],
              activeIndex: '',
            };
            that.$store.commit('setLogState', payload);
            that.$router.push('/login');
          }
        }).catch(err => {
          console.warn(err);
          that.$message.error('系统错误');
        });
      },
      logstate() {
        const that = this;
        this.$http.get('/role-manage/logstate').then(res => {
          if (res.data.code === 1 && res.data.logState === true) {
            that.$store.commit('setLogState', {
              logState: true,
              username: res.data.username,
              user_id: res.data.user_id,
              role: res.data.role,
              token: res.data.token,
            });
            console.log('logState');
          } else {
            that.$store.commit('setLogState', {
              logState: false,
              username: '',
              user_id: '',
              role: [],
              token: '',
            });
            router.push('/login');
          }
        }).catch(err => {
          console.warn(err);
          that.$message.error('系统错误');
        });
      },
    },
    computed: {
      activeIndex() {
        return this.$store.state.activeIndex;
      },
    },
    mounted() {
      this.logstate();
    },
  };
</script>

<style lang="less" scoped>
  [v-cloak] {
    display: none !important;
  }
  .header,
  .header__logo,
  .nav,
  .content {
    box-sizing: border-box;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: #4E7AEC;
    border-bottom: 1px solid #e6e6e6;
  }

  .header__logo {
    transition: width 0.3s;
    position: absolute;
    left: 0;
    top: 0;
    width: 190px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 1px solid transparent;
    border-left: none;
    color: #fff;
    font-size: 22px;
    &.el-header--collapse {
      width: 60px;
    }
  }

  .header__content {
    height: 59px;
    line-height: 59px;
    float: right;
  }

  .header__dropdown {
    vertical-align: top;
    cursor: pointer;
    padding: 0 10px;
    &:hover {
      background-color: #e6e6e6;
    }
  }

  .content {
    transition: margin-left 0.3s;
    padding-left: 190px;
    padding-top: 60px;
    &.el-main--collapse {
      margin-left: 60px;
    }
  }

  .nav {
    position: fixed;
    left: 0;
    top: 60px;
    z-index: 999;
    height: calc(100vh - 60px);
    width: 190px;
    overflow: scroll;
    background: #191862;
    color: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    &.el-menu--collapse {
      width: 60px;
      overflow: visible;
      span {
        display: none;
      }
    }
    .nav__button {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: #eee;
        color: #191862;
      }
    }
    .columnRouter {
      display: block;
      width: 100%;
      height: 100%;
    }
    .el-submenu__title {
      color: #fff !important;
    }
  }

  .el-menu {
    position: fixed;
    left: 0;
    top: 60px;
    z-index: 999;
    height: calc(100vh - 60px);
    width: 11.5%;
    height: 100%;
    background: #191862;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    &.el-menu--collapse {
      width: 60px;
      overflow: visible;
      span {
        display: none;
      }
    }
    .el-menu-item {
      height: 46px;
      line-height: 46px;
      color: #fff;
      &:focus,
      &:hover {
        background-color: #0F0F48;
        color: #4E7AEC;
      }
    }
  }
  .el-dropdown {
    color: #fff;
    &:focus,
    &:hover {
      color: #606266
    }
  }
</style>