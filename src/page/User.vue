<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <span class="logo" slot="title">YIHI</span>
    </van-nav-bar>
    <van-cell-group>
      <van-field class="input" v-model="phone" required clearable label="手机" placeholder="请输入手机号"/>
      <van-field class="input" v-model="password" label="密码" placeholder="请输入密码" required/>
    </van-cell-group>
    <p class="login-tip">{{ message }}</p>
    <div class="but">
      <van-button type="default" round to="/user/register" size="small">注册</van-button>
      <van-button type="danger" round @click="login" size="small">登录</van-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      phone: "",
      password: "",
      message: "",
      show: false,
    };
  },
  filters: {
    formatDate(value) {
     return moment.unix(value).format('dddd')
    }
  },
  methods: {
    login() {
      this.$http
        .post("tokens", {
          phone: this.phone,
          password: this.password
        })
        .then(resp => {
          console.log(resp.data);
          let apiToken = resp.data.token;
          this.$http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${apiToken}`;
          this.$http.get("users/me").then(resp => {
            this.$store.commit("setUsername", resp.data.username);
            console.log(resp.data);
          });
          this.$store.commit("setApiToken", apiToken);
          this.$router.push("/");
          this.$store.commit("setHidF");
          this.$store.commit("setUserF");
        })
        .catch(err => {
          this.message = err.response.data.message;
        });
    },
    onClickLeft() {
      this.$router.go("-1");
      this.$store.commit("setHidF");
    }
  },
  created() {
    this.$store.commit("setHidT");
  }
};
</script>

<style scoped>
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
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
.but {
  display: flex;
  justify-content: space-around;
}
.van-button--default {
  margin-left: 50px;
}
.van-button--danger {
  margin-right: 50px;
}
.login-tip {
  text-align: center;
  font-size: 14px;
  color: red;
  margin: 0 0 10px;
}
</style>
