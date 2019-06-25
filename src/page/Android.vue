<template>
  <div>
    <div class="post-box" @click="goPost" v-for="post in posts" :key="post.id">
      <router-link :to="'/posts/'+post.id">
        <div class="content-box">
          <span class="user">{{ post.user.username}}</span>
          <p class="title">{{ post.title }}</p>
          <small class="normal">{{ post.created_at }}</small>
          <van-icon class="normal" size="8" name="eye"/>

          <small class="normal" v-if="post.last_comment !==null">最后回复</small>
          <small v-if="post.last_comment !==null">{{ post.last_comment.user.username }}</small>
          <small class="normal" v-else>暂时还没有回复哦</small>
          <div class="reply">
            <van-icon name="comment-o"/>
            <small>{{ post.comments_count }}</small>
          </div>
        </div>
      </router-link>
    </div>
    <div>
      <van-button
        v-bind:class="{'page-active':isActive, 'page-ban':hasError}"
        @click="homePage"
        type="default"
      >首页</van-button>
      <van-pagination
        class="page"
        @change="changePage"
        v-model="currentPage"
        :page-count="totalPage"
        mode="simple"
      />
      <van-button
        v-bind:class="{'last-active':lastActive , 'last-ban':lastError}"
        @click="lastPage"
        type="default"
      >末页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      otherInfo: [],
      isActive: false,
      hasError: true,
      lastError: false,
      lastActive: true,
      currentPage: 1,
      totalPage: 1
    };
  },
  watch: {
    currentPage() {
      if (this.currentPage !== 1 && this.currentPage !== this.totalPage) {
        this.isActive = true;
        this.hasError = false;
        this.lastError = false;
        this.lastActive = true;
      } else if (this.currentPage == 1) {
        this.isActive = false;
        this.hasError = true;
        this.lastError = false;
        this.lastActive = true;
      } else if (this.currentPage == this.totalPage) {
        this.lastError = true;
        this.lastActive = false;
        this.isActive = true;
        this.hasError = false;
      }
    }
  },
  methods: {
    goPost() {
      this.$store.commit("setAddT");
    },
    getPost() {
      let page = this.currentPage;
      this.$http.get(`threads?page=${page}&node_id=3`).then(resp => {
        this.posts = resp.data.data;
        let length = resp.data.total;
        this.totalPage = Math.ceil(length / 15);
        for (let i = 0; i < this.posts.length; i++) {
          let time = this.posts[i].created_at;
          this.posts[i].created_at = this.$moment(time).fromNow();
          if(this.posts[i].last_comment !==null){
          console.log(this.posts[i].last_comment.user.username)
          }
        };
        if (this.totalPage == 1 ||this.totalPage==0 ) {
          this.lastError = true;
          this.lastActive = false;
        }
      });
    },
    homePage() {
      this.currentPage = 1;
      this.getPost();
    },
    lastPage() {
      this.currentPage = this.totalPage;
      this.getPost();
    },
    changePage() {
      this.getPost();
    }
  },
  created() {
    this.getPost();
  }
};
</script>
