<template>
  <div>
    <van-nav-bar title="个人主页" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="personal-user">
      <div class="personal-logo">
        <van-uploader>
          <van-image width="60" height="60" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
        </van-uploader>
      </div>
      <div class="personal-username">
        <span>{{$store.state.username}}</span>
        <br>
        <small class="data">点击修改个人资料</small>
      </div>
    </div>
    <div>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="我的消息" name="0">
          <div v-for=" post in posts" :key="post.id">
            <div class="post-list">
              发表了帖子
              <router-link class="title" :to="'/posts/'+post.id">{{ post.title }}</router-link>
            </div>
            <p class="post-time">{{ post.created_at }}</p>
          </div>
        </van-collapse-item>
        <van-collapse-item title="我的主题帖" name="1">
          <div v-for=" post in posts" :key="post.id">
            <div class="post-list">
              发表了帖子
              <router-link class="title" :to="'/posts/'+post.id">{{ post.title }}</router-link>
            </div>
            <p class="post-time">{{ post.created_at }}</p>
          </div>
        </van-collapse-item>
        <van-collapse-item title="我的回复" name="2">
          <div v-for=" reply in replys" :key="reply.id">
            <div class="post-list">
              回复了
              <router-link class="post-title" :to="'/posts/'+reply.thread_id">{{ reply.content }}</router-link>
            </div>
            <p class="post-time">{{ reply.created_at }}</p>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <van-button class="sign-out" type="default" @click="signOut">退出登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],
      posts: [],
      replys: [],
      id: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go("-1");
      this.$store.commit("setHidF");
    },
    signOut() {
      this.$router.push("/");
      this.$store.commit("setUserT");
      this.$store.commit("setHidF");
    },
    getUser() {
      this.$http.get("users/me").then(resp => {
        let id = resp.data.id;
        this.$http.get(`threads?user_id=${id}`).then(resp => {
          this.posts = resp.data.data;
          for (let i = 0; i < this.posts.length; i++) {
            let time = this.posts[i].created_at;
            this.posts[i].created_at = this.$moment(time).fromNow();
          }
        });
        this.$http.get(`comments?user_id=${id}`).then(resp => {
          this.replys = resp.data.data;
          for (let i = 0; i < this.replys.length; i++) {
            let time = this.replys[i].created_at;
            this.replys[i].created_at = this.$moment(time).fromNow();
          }
        });
      });
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style >
.personal-user {
  margin: 10px;
  min-height: 60px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.personal-logo {
  float: left;
  margin: 0;
  min-height: 10px;
}
.van-image__img {
  margin: 0;
  padding: 0;
  border-radius: 50%;
}
.personal-username {
  display: block;
  box-sizing: border-box;
  margin-left: 10px;
  overflow: hidden;
  font-size: 24px;
}
.data {
  font-size: 16px;
  color: #ccc;
}
.title {
  font-size: 16px;
}
.sign-out {
  display: block;
  margin: 35px auto;
}
</style>
