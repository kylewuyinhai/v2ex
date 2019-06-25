<template>
  <div>
    <div :hidden="$store.state.hid">
      <span class="logo" @click="goHome">YIHI</span>
      <van-icon class="user-style" name="user-circle-o" color="red" size="30px" @click="goUser"/>
      <div :hidden="$store.state.add">
      <van-icon  name="add" size="60px" color="red" @click="goNewPost"/>
      </div>
    </div>
    <router-view></router-view>
    <div></div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
      this.$store.commit("setAddF");
      this.$store.commit("setActive");
    },
    goUser() {
      if (this.$store.state.user) {
        this.$router.push("/user");
        this.$store.commit("setHidT");
      } else {
        this.$router.push("/personal");
        this.$store.commit("setHidT");
      };
    },
    goNewPost() {
      this.$router.push("/newpost");
      this.$store.commit("setHidT");
    }
  }
};
</script>

<style>
body{
  font-family:"Helvetica Neue",Helvetica,"Heiti SC",sans-serif;
}
.logo{
  width: 80px;
  height: 40px;
  margin-top: 20px;
  font-size: 30px;
  font-weight: 500;
  color: red;
  font-style: italic;
  letter-spacing: 5px;
  margin: 10px;

}
.van-icon-user-circle-o {
  float: right;
  margin: 5px 10px;
}
.van-icon-add {
  position: fixed;
  bottom: 80px;
  right: 50px;
  z-index: 100;
}
</style>
