<template>
  <div>
    <van-nav-bar
      title="发新帖"
      left-text="返回"
      right-text="发送"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="input">
      <van-cell-group>
        <van-field
          v-model="title"
          type="textarea"
          placeholder="请输入标题"
          rows="2"
          :autosize="{ maxHeight: 60}"
          :clearable="true"
        />
        <van-field
          v-model="content"
          type="textarea"
          placeholder="请输入内容"
          rows="5"
          :autosize="{ maxHeight: 100}"
          :clearable="true"
        />
      </van-cell-group>
    </div>
    <div>
      <van-field
        v-model="node"
        type="textarea"
        placeholder="请选择分类"
        :autosize="{ maxHeight: 30}"
        @focus="choose"
        :clearable="true"
      />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect"/>
    </div>
    <div class="up-box">
      <van-uploader v-model="fileList" multiple :preview-image="false">
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
      title: "",
      content: "",
      fileList: [],
      upIamge: [],
      show: false,
      actions: [],
      node: "",
      nodeId: ""
    };
  },
  watch: {
    fileList() {
      if (this.fileList.length > 6) {
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
        alert("1");
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go("-1");
      this.$store.commit("setHidF");
    },
    onClickRight() {
      this.$http
        .post("threads", {
          node_id: this.nodeId,
          title: this.title,
          content: this.content
        })
        .then(resp => {
          this.$router.push("/");
          this.$store.commit("setHidF");
          this.$store.commit("setAddF");
        }).catch(err =>{
          console.log(err)
        });
    },
    onSelect(item) {
      this.show = false;
      this.node = item.name;
      this.nodeId = item.id;
    },
    choose() {
      this.show = true;
    },
    getNodes() {
      this.$http.get("nodes").then(resp => {
        this.actions = resp.data.data;
      });
    }
  },
  created() {
    this.$store.commit("setHidT");
    this.getNodes();
  }
};
</script>

<style>
body {
  padding: 1px;
}
.van-field {
  margin-bottom: 15px;
  width: 90%;
  margin: 0 auto;
}
.van-field__body {
  box-sizing: border-box;
  border: 1px solid #fff;
}
input:focus {
  border: 1px solid #ff4500;
}
textarea:focus {
  outline: none;
  border: 1px solid #ff4500;
}
.up-box {
  min-width: 93%;
  min-height: 15px;
  display: flex;
  float: left;
  margin: 15px;
  padding-bottom: 10px;
  align-items: center;
  text-align: justify;
  border-bottom: 1px solid #e3e4e5;
}
.up-image {
  display: flex;
  float: left;
  align-items: center;
  text-align: justify;
  font-size: 14px;
  padding: 0 -5px;
}
.van-uploader__wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.up-tip {
  color: #999;
  font-size: 14px;
}
</style>
