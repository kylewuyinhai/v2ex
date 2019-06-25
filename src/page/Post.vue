<template>
  <div>
    <div class="header">
      <h1 class="title">{{ post.title }}</h1>
      <div class="artical-info">
        <span class="time">{{ post.created_at }}</span>
        <span>阅读17777</span>
      </div>
    </div>
    <div v-if="post.user">
      <div class="detail-author">
        <van-image width="45" height="45" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
        <router-link :to="'/otheruser/'+post.user_id" @click.native="goOtherUser">
          <span class="author-name">{{ post.user.username}}</span>
        </router-link>
      </div>
      <p class="article-content">{{ post.content }}</p>
    </div>
    <div v-if="comments.length>0">
    <div class="comment-logo">
      <p class="total-comment">全部评论</p>
    </div>
    <div class="comment" v-for="item in comments" :key="item.id">
      <div class="comment-user">
        <van-image
          class="user-logo"
          width="30"
          height="30"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="content-box">
        <div class="user-info">
          <router-link :to="'/otheruser/'+item.user_id" @click.native="goOtherUser">
            <span class="user-name">{{item.user.username}}</span>
          </router-link>
          <br>
          <div class="user-other">
            <span class="floor">{{ item.id }}楼</span>
            <small>{{ item.created_at }}</small>
          </div>
        </div>
        <div class="love">
          <van-icon
            v-bind:class="{'touch-active':touchActive}"
            @click="humbsUp"
            size="14"
            name="like-o"
          ></van-icon>
          <small class="love-text">{{ thumbsUp }}</small>
        </div>
        <p class="comment-content">{{ item.content}}</p>
        <p class="viewreoly" @click="seeReply">查看回复（100）</p>
      </div>
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
      <div v-else>
        <p class="no-reply">暂时还没有回复</p>
      </div>
      <van-field
        v-model="content"
        type="textarea"
        placeholder="请输入内容"
        rows="5"
        :autosize="{ maxHeight: 100}"
        :clearable="true"
      />


    <div class="up-box">
      <van-uploader v-model="fileList" :max-count="6" multiple :preview-image="false">
        <div class="up-image">
          <van-image
            width="28"
            height="28"
            src="//assets-m.hoopchina.com.cn/touch/static/common/widget/ui/upload-image/upload_pic_btn_3a0080b.png"
            slot="title"
          />
        </div>
      </van-uploader>
      <span class="up-tip">最多上传6张图片</span>
      <van-button class="sent" type="danger" @click="setreply">发表</van-button>
    </div>
    <div v-if="fileList.length !== 0">
      <van-uploader v-model="fileList" multiple :max-count="6" preview-size="98px"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      currentPage: 1,
      totalPage: 1,
      content: "",
      isActive: false,
      hasError: true,
      lastError: false,
      lastActive: true,
      post: {},
      postNmae: "",
      comments: [],
      thumbsUp: "999+",
      touchActive: false
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
    seeReply() {
      console.log("reply");
    },
    homePage() {
      this.currentPage = 1;
      this.getcomments();
    },
    lastPage() {
      this.currentPage = this.totalPage;
      this.getcomments();
    },
    getPost() {
      let postId = this.$route.params.id;
      this.$http.get(`threads/${postId}`).then(resp => {
        this.post = resp.data;
        console.log(this.post);
          let time = this.post.created_at;
          this.post.created_at = this.$moment(time).fromNow();

      });
    },
    getcomments() {
      let page = this.currentPage;
      let postId = this.$route.params.id;
      this.$http.get(`comments?thread_id=${postId}&page=${page}`).then(resp => {
        this.comments = resp.data.data;
        let length = resp.data.total;
        this.totalPage = Math.ceil(length / 15);
        for (let i = 0; i < this.comments.length; i++) {
          let time = this.comments[i].created_at;
          this.comments[i].created_at = this.$moment(time).fromNow();
        }
        if (this.totalPage == 1) {
          this.lastError = true;
          this.lastActive = false;
        }
      });
    },
    setreply() {
      let postId = this.$route.params.id;
      this.$http
        .post("comments", {
          thread_id: postId,
          content: this.content
        })
        .then(resp => {
          let postId = this.$route.params.id;
          this.content = "";
        });
    },
    changePage() {
      this.getcomments();
    },
    humbsUp() {
      this.touchActive = !this.touchActive;
    },
    goOtherUser() {
      this.$store.commit("setHidT");
    }
  },
  created() {
    this.getPost();
    this.getcomments();
  }
};
</script>

<style scoped>
.body {
  padding: 0;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, "Heiti SC", sans-serif;
}

.header {
  min-height: 20px;
  padding: 15px 10px 10px;
  border-bottom: 0.5px solid #e3e4e5;
}

.title {
  font: 20px Helvetica Neue;
  margin: 0 0 5px;
  font-weight: 700px;
  line-height: 1.3;
}
.artical-info {
  display: flex;
  line-height: 22px;
  font-size: 14px;
  color: #999;
}
.time {
  margin-right: 6px;
}
.detail-author {
  margin: 0;
  padding: 10px 0 0 10px;
  display: flex;
}
.author-name {
  line-height: 45px;
  margin-left: 10px;
  font-size: 15px;
  color: #444;
}
.article-content {
  font-size: 17px;
  word-wrap: break-word;
  margin: 10px;
  color: #444;
}
.comment-logo {
  height: 35px;
  background: #f3f3f3;
  border-left: 4px solid #c80c00;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.comment {
  box-sizing: border-box;
  border-bottom: 1px solid #e3e4e5;
  padding: 10px;
  width: 100%;
  min-height: 10px;
  overflow: hidden;
  display: flex;
}

.total-comment {
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #c80c00;
}
.comment-user {
  float: left;
  margin-right: 10px;
}
.user-info {
  float: left;
  margin-bottom: 10px;
}
.user-name {
  color: #444;
  font-size: 14px;
  vertical-align: middle;
  line-height: 1.5;
  letter-spacing: 0.1em;
}
.user-other {
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}
.floor {
  margin-right: 5px;
}
.content-box {
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  flex-grow: 1;
}
.comment-content {
  display: block;
  width: 100%;
  min-height: auto;
  overflow: hidden;
  word-break: break-all;
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}
.love {
  float: right;
  display: flex;
}
.love-text {
  margin-left: 5px;
  font-size: 14px;
  color: #999;
}
.touch-active {
  color: #c80c00;
}
.viewreoly {
  float: right;
  font-size: 14px;
  color: #999;
  margin: 0px;
  line-height: 1.5;
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
.page {
  float: left;
  width: 60%;
  margin: 10px 0;
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
.push {
  position: absolute;
  right: 20px;
  font-size: 14px;
  width: 100px;
}
.no-reply{
  color: #999;
  line-height: 1.5;
  text-align: center;
}
.sent{
  position: absolute;
  right: 20px;
  width: 80px;
  height: 40px;
  border-radius: 10px;
  line-height: 1.5;
}
</style>
