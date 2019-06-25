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
      this.$http.get(`threads?page=${page}`).then(resp => {
        this.posts = resp.data.data;
        let length = resp.data.total;
        this.totalPage = Math.ceil(length / 15);
        for (let i = 0; i < this.posts.length; i++) {
          let time = this.posts[i].created_at;
          this.posts[i].created_at = this.$moment(time).fromNow();
        };
        if (this.totalPage == 1) {
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

<style>
.post-box {
  min-height: 50px;
  padding: 10px;
  overflow: hidden;
  border-bottom: 0.5px solid #e3e4e5;
}

.content-box {
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  color: #000;
}
.user {
  font-size: 14px;
  font-weight: 1000;
  line-height: 1.5;
}
.title {
  font-size: 16px;
  margin: 0;
  letter-spacing: 0.5px;
  overflow: hidden;
  line-height: 1.5;
  margin: 5px 0 13px;
}
.normal {
  color: #999;
}
.reply {
  float: right;
  margin-right: 10px;
  color: #999;
  display: flex;
}
.van-icon-comment-o{
  margin-right: 5px;
}
.page-ban {
  float: left;
  color: #7d7e80;
  background: #f8f8f8;
  opacity: 0.6;
  width: 18%;
  height: 40px;
  margin: 10px 0 10px 10px;
  font-size: 14px;
  border: 0.5px solid #ebedf0;
}
.page-active {
  float: left;
  color: #1989fa;
  width: 18%;
  height: 40px;
  margin: 10px 0 10px 10px;
  font-size: 14px;
  border: 0.5px solid #ebedf0;
}
.last-active {
  color: #1989fa;
  width: 18%;
  height: 40px;
  margin: 10px 2.5px 10px 0;
  font-size: 14px;
  border: 0.5px solid #ebedf0;
}
.last-ban {
  color: #7d7e80;
  background: #f8f8f8;
  opacity: 0.6;
  width: 18%;
  height: 40px;
  margin: 10px 2.5px 10px 0;
  font-size: 14px;
  border: 0.5px solid #ebedf0;
}
.page {
  float: left;
  width: 60%;
  margin: 10px 0;
}
</style>
