<template>
  <div class="login d-flex a-i-c bgc-fff">
    <div class="login-left d-flex a-i-c j-c-c f-b-c">
      <img src="@/assets/images/login.svg" alt="" />
      <p class="f20 b wh">欢迎使用本系统</p>
      <p class="f20 b wh">祝您生活愉快</p>
    </div>
    <div class="login-right">
      <h2 class="f20 b c0 tc">登 录</h2>
      <div class="form-box">
        <el-form size="mini" :model="params" :rules="rules" ref="login">
          <el-form-item label="账户" prop="username">
            <el-input
              clearable
              v-model="params.username"
              placeholder="请输入账户"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              clearable
              type="password"
              show-password
              v-model="params.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="f16 wh w100" @click="login"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      params: {
        username: "",
        password: "",
      },

      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    async login() {
      const valid = await this.$isValid(this, "login");
      if (!valid) return;
      this.$store.commit("user/login", this.params);
    },
  },
};
</script>

<style lang="less">
.login {
  height: 100vh;
  &-left {
    height: 100%;
    width: 50%;
    background-color: #353e54;
    img {
      width: 350px;
      height: 350px;
    }
  }
  &-right {
    width: 50%;
    .form-box {
      width: 50%;
      margin: auto;
    }
  }
}
</style>
