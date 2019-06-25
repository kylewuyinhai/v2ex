<template>
  <div>
    <van-tabs @click="onClick" v-model="$store.state.active">
      <van-tab title="全部"/>
      <van-tab title="后端"/>
      <van-tab title="前端"/>
      <van-tab title="Android"/>
      <van-tab title="IOS"/>
      <van-tab title="人工智能"/>
      <van-tab title="开发工具"/>
      <van-tab title="阅读"/>
    </van-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    onClick(index, title) {
      switch(index)
      {
        case 0:
        this.$router.push('/posts');
        this.$store.commit("setHidF");
        break;
        case 1:
        this.$router.push('/posts/backend');
        this.$store.commit("setHidF");
        break;
        case 2:
        this.$router.push('/posts/frontend');
        this.$store.commit("setHidF");
        break;
        case 3:
        this.$router.push('/posts/android');
        this.$store.commit("setHidF");
        break;
        case 4:
        this.$router.push('/posts/ios');
        this.$store.commit("setHidF");
        break;
        case 5:
        this.$router.push('/posts/ai');
        this.$store.commit("setHidF");
        break;
        case 6:
        this.$router.push('/posts/tool');
        this.$store.commit("setHidF");
        break;
        case 7:
        this.$router.push('/posts/read');
        this.$store.commit("setHidF");
        break;
      };
    }
  }
};
</script>

<style>
</style>
