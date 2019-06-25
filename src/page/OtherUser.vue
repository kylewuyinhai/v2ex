<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="personal-user">
      <div class="personal-logo">
        <van-uploader>
          <van-image width="60" height="60" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
        </van-uploader>
      </div>
      <div class="personal-username">
        <span>{{username}}</span>
        <br>
      </div>
    </div>
    <div>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="他的主题帖" name="1">
          <div v-for=" post in posts" :key="post.id">
            <div class="post-list">
              发表了帖子
              <router-link class="title" :to="'/posts/'+post.id">{{ post.title }}</router-link>
            </div>
            <p class="post-time">{{ post.created_at }}</p>
          </div>
        </van-collapse-item>
        <van-collapse-item title="他的回复" name="2">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      title: "",
      activeNames: [],
      posts: [],
      replys: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go("-1");
      this.$store.commit("setHidF");
    },
    getUser() {
      let postId = this.$route.params.id;
      this.$http.get(`threads?user_id=${postId}`).then(resp => {
        this.username = resp.data.data[0].user.username;
        this.title = this.username + "的个人主页";
        this.posts = resp.data.data;
        for (let i = 0; i < this.posts.length; i++) {
          let time = this.posts[i].created_at;
          this.posts[i].created_at = this.$moment(time).fromNow();
        }
      });
    },
    getReply() {
      let postId = this.$route.params.id;
      this.$http.get(`comments?user_id=${postId}`).then(resp => {
        this.replys = resp.data.data;
        for (let i = 0; i < this.replys.length; i++) {
          let time = this.replys[i].created_at;
          this.replys[i].created_at = this.$moment(time).fromNow();
        }
      });
    }
  },
  created() {
    this.getUser();
    this.getReply();
  }
};
</script>

<style>
.post-list {
  background: #f9f9f9;
  padding: 8px 10px;
}
.post-title {
  color: #005eac;
}
.post-time {
  margin: 3px 10px 10px;
}
</style>
