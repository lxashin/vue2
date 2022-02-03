<template>
  <div class="article">
      <div class="articleItem">
          <div class="item" v-for="(item, index) in article" :key="index">
        <div class="tit">
          <a href="#">{{ item.title }}</a>
        </div>
        <div class="content">
          <span v-html="item.content" @click="tit(item.id)"></span>
        </div>
        <div class="footer">
          <span @click="like(item.id)"
            ><button
              class="btn"
              :style="{
                background: item.is_like == true ? '#06f' : '',
                color: item.is_like == true ? '#fff' : '',
              }"
            >
              <i class="el-icon-caret-top"></i> 赞同 {{ item.like_count }}
            </button></span
          >
          <span @click="comment(item.id)"
            ><button class="btn2">
              <i class="el-icon-s-comment"></i> 评论{{ item.comment_count }}
            </button></span
          >
          <span
            ><button class="btn3">
              <i
                class="el-icon-star-off"
                v-show="!item.is_collect"
                @click="collect(item.id)"
              >
                收藏 {{ item.collect_count }}</i
              >
              <i
                class="el-icon-star-on"
                v-show="item.is_collect"
                style="color: red"
                @click="delCollect(item.id)"
              >
                收藏 {{ item.collect_count }}</i
              >
            </button></span
          >
          <span>阅读数 {{ item.read_count }}</span>
        </div>
      </div>
      <div class="fix">
      <Fix>
        <h4 slot="first" @click="kangyi">抗疫故事</h4>
        <h4 slot="second" @click="pingfan">平凡英雄</h4>
        <h4 slot="third" @click="fangyi">防疫资讯</h4>
      </Fix>
    </div>
    <Dialog :dialog="dialog" :id="id" v-if="mode"></Dialog>
      </div>
  </div>
</template>

<script>
import Fix from "../components/fix.vue";
import Dialog from "../components/Dialog.vue";
export default {
  name: "Title",
  components: {
    Fix,
    Dialog,
  },
  data() {
    return {
      article: [],
      isShow: true,
      mode: false,
      id: "",
      dialog: {
        show: false,
        title: "",
      },
    };
  },
  methods: {
    //点击评论时获取id，然后传递给评论弹出框
    comment(id) {
      this.mode = true;
      this.id = id;
      console.log("我要传递的id为：", this.id);
      this.dialog = {
        show: true,
        title: "评论区",
      };
    },

    collect(id) {
      this.$axios
        .post(`user/collect/${id}/`, id, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then(() => {
          this.getData();
        });
    },
    delCollect(id) {
      this.$axios
        .post(`user/collect/${id}/`, id, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then(() => {
          this.getData();
        });
    },
    like(id) {
      this.$axios
        .post(`/user/like/${id}`, id, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then(() => {
          this.getData();
        });
    },
    //获取首页文章所有数据
    getData() {
      this.$axios.get("/article/article/").then((res) => {
        this.article = res.data.data;
        //  console.log(res.data.data)
      });
    },
    tit(id) {
      this.$router.push("articleitem");
      setTimeout(() => {
        this.$bus.$emit("sendId", id);
      }, 300);
    },
    kangyi() {
      this.$axios.get("article/article/type/1").then((res) => {
        this.article = res.data.data;
      });
    },
    pingfan() {
      this.$axios.get("article/article/type/2").then((res) => {
        this.article = res.data.data;
      });
    },
    fangyi() {
      this.$axios.get("article/article/type/3").then((res) => {
        this.article = res.data.data;
      });
    },
  },
  created() {
    this.$bus.$on("update", (data) => {
      this.article = data;
      console.log(this.article);
    });
    this.getData();
  },
  mounted() {},
};
</script>

<style lang="less">
.article {
  .articleItem {
    .item {
      width: 80%;
      background-color: #fff;
      height: 200px;
      border-bottom: 1px solid #ccc;
      .tit {
        padding-left: 30px;
        height: 50px;
        line-height: 50px;
        font-size: 26px;
        font-weight: 800;
        text-align: left;
        a {
          text-decoration: none;
          color: #000;
        }
      }
      .content {
        padding-left: 30px;
        max-height: 73px;
        line-height: 30px;
        text-align: left;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .footer {
        height: 50px;
        line-height: 50px;
        text-align: left;
        margin-top: 25px;
        .btn {
          width: 80px;
          height: 30px;
          color: #06f;
          background-color: rgb(217, 232, 255);
          border-color: transparent;
        }
        .btn2,
        .btn3 {
          border: none;
          background-color: none;
        }
        span {
          padding-left: 20px;
          &:nth-child(4) {
            margin-right: 48px;
            float: right;
          }
        }
      }
    }
  }
  .fix {
    position: fixed;
    top: 88px;
    right: 176px;
  }
}
</style>