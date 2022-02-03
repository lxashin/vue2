<template>
  <div class="wish">
    <el-card class="card" v-for="(wish, index) in myWishData" :key="index">
      <div class="content">
        <div>{{ wish.content }}</div>
      </div>
      <div class="footer">
        <span class="time">{{ dateFormat(wish.post_time) }}</span>
        <span class="author">作者：{{ wish.user_username }}</span>
      </div>
      <div class="del">
        <el-button  @click="open(wish.id)">
        <i class="el-icon-delete-solid"></i>
      </el-button>
      </div>
      
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myWishData: [],
    };
  },
  methods: {
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day =
        date.getDate() + 1 < 10
          ? "0" + (date.getDate() + 1)
          : date.getDate() + 1;
      var hours =
        date.getHours() < 10
          ? "0" + (date.getHours() + 1)
          : date.getHours() + 1;
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    },
    getWishData() {
      this.$axios.get("user/hope/").then((res) => {
        this.myWishData = res.data.data;
      });
    },
    open(id) {
      this.$confirm("是否删除该心愿", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.delete("user/hope/" + id + "/").then(() => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getWishData();
          });
        })
        .catch(() => {
          console.log(id)
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getWishData();
    this.$bus.$on("updateWish", () => {
      this.getWishData();
    });
  },
};
</script>

<style lang="less">
.wish {
  display: flex;
  flex-wrap: wrap;

  .card {
    margin-left: 20px;
    margin-bottom: 20px;
    width: 30%;
    height: 300px;
    .title {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: 700;
    }
    .content {
      display: table;
      word-break: break-all;
      word-wrap: break-word;
      height: 200px;
      line-height: 50px;

      div {
        display: table-cell;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
    .footer {
      height: 50px;
      line-height: 30px;
      float: right;
      font-size: 12px;
      color: #ccc;
      .author {
        padding-left: 10px;
      }
    }
    .del {
      width: 20px;
      height: 20px;
      position: relative;
      top: -20px;
      left: 200px;
      
      button{
        border: none;
      }
    }
  }
}
</style>