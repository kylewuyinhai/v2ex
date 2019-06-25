<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <span class="logo" slot="title">YIHI</span>
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="phone" required clearable label="手机号" placeholder="请输入手机号"/>
      <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名"/>
      <van-field v-model="passwordOne" label="密码" placeholder="请输入密码" required/>
      <van-field v-model="passwordTwo" label="密码" placeholder="请再次确认密码" required/>
      <p class="login-tip">{{ this.passwordTip }}</p>
    </van-cell-group>
    <div style="display:flex;justify-content:center;margin-top:30px">
      <van-button style="width:80px" type="default" round to="/user/register" size="small" @click="register">注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      username: "",
      passwordOne: "",
      passwordTwo: "",
      passwordTip: ""
    };
  },
  watch: {
    passwordTwo() {
      if (this.passwordTwo !== this.passwordOne) {
        this.passwordTip = "两次密码输入不一致";
      } else {
        this.passwordTip = "";
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go("-1");
      this.$store.commit("setHidF");
    },
    register() {
      this.$http
        .post("users", {
          phone: this.phone,
          username: this.username,
          password: this.passwordTwo
        })
        .then(resp => {
          this.$router.push("/user");
          console.log("1");
        })
        .catch(err => {
          this.passwordTip = err.response.data.message;
        });
    }
  },
  created() {
    this.$store.commit("setHidT");
  }
};
</script>

<style>
.van-hairline--bottom {
  margin: 10px 0;
}
.van-image__img {
  margin: 0px;
}
.van-cell--required {
  margin-bottom: 15px;
}
.van-row {
  margin-top: 15px;
}
.login-tip {
  text-align: center;
  font-size: 14px;
  color: red;
  margin: 0 0 10px;
}
.van-field__control {
  border: 1px solid #fff;
}
</style>
