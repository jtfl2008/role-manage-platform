<template>
  <div class="content bg">
    <div class="logo">
      <router-link to="/">
        LOGO (Click to go back home)
      </router-link>
    </div>
    <el-form class="form" :model="form">
      <el-form-item prop="uid">
        <el-input placeholder="请输入UM账户" prefix-icon="el-icon-search" v-model="form.username">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" prefix-icon="el-icon-search" v-model="form.password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import router from '@/router';

  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      onSubmit() {
        const that = this;
        if (!this.form.username || !this.form.password) {
          const msg = !this.form.username ? '请输入用户名' : '请输入密码';
          this.$message.error(msg);
          return;
        }
        if (this.$route.params.env) {
          this.form.env = this.$route.params.env;
        }
        this.$http({
          url: '/role-manage/login',
          data: that.form,
          method: 'post',
          // auth: {
          //   username: _SYSTEM_NAME,
          //   password: _SYSTEM_PASSWORD,
          // },
        }).then(res => {
          if (res.data.code === 1) {
            if (res.data.encrypted) {
              window.location.href = `${this.utils.urlMap[this.form.env]}#/redirectHome/${res.data.encrypted}`;
            } else {
              router.push('/workbench');
            }
            // 写入store
            that.$store.commit('setLogState', {
              logState: true,
              user_id: res.data.user_id,
              username: res.data.username,
              role: res.data.role,
              // token: res.data.token,
            });
            sessionStorage.setItem('logState', 'true');
            console.log('login:' + sessionStorage.getItem('logState'));
          } else {
            that.$message.error('登录失败！');
            sessionStorage.setItem('logState', 'false');
          }
        }).catch(err => {
          that.$message.error('登录失败！' + err.toString());
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bg {
    background-color: #bbb;
  }

  .logo {
    position: absolute;
    top: 0;
    left: 0;
  }

  .form {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 50px;
    border-radius: 15px;
  }
</style>