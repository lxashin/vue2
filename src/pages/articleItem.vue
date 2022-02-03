<template>
  <div class="articleItem">
    <div class="header">
      <div class="title">
        {{ article.title }}
      </div>
      <div class="article-info">
        <div class="bar_top">
          <span class="type">{{ article.article_type }}</span>
          <span class="time">{{dateFormat(article.post_time)}}</span>
          <i class="el-icon-view"></i>
          <span class="read_count">{{article.read_count}}</span>
          <i class="el-icon-star-on" v-show="article.is_collect"></i>
          <i class="el-icon-star-off" v-show="article.is_collect"></i>
          <span class="collect_name">收藏 </span>
          <span class="collect_num">{{ article.collect_count }}</span>
        </div>
        <div class="bar-tag">
          <span class="label">分类专栏：</span>
          <span class="tag_link">{{ article.article_type }}</span>
        </div>
      </div>
    </div>
    <div class="content" v-html="article.content"></div>

    <div class="footer">
      <div class="box-left">
        <img :src="baseUrl+article.user_profile" alt="" />
        <span class="name">{{article.username}}</span>
        <div class="guanzhu">
          <a v-show="isShow">收藏</a>
          <a v-show="!isShow">已收藏</a>
        </div>
      </div>
      <div class="box-right">
        <ul>
          <li>
            <img src="../assets/images/zan.png" alt="" />
            <span>{{article.like_count}}</span>
            <img src="../assets/images/pinglun.png" alt="" />
            <span>{{article.comment_count}}</span>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      article: {},
      id: "",
      baseUrl:'http://192.168.1.103:8000'
    };
  },
  methods: {
    dateFormat(time){
      var date = new Date(time)
      var year = date.getFullYear()
      var month = date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1
      var day = date.getDate()+1<10?'0'+(date.getDate()+1):date.getDate()+1
      var hours = date.getHours()<9?'0'+(date.getHours()+1):date.getHours()+1
      var minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    }
  },
  beforeCreate() {},
  created() {
    this.$bus.$on("sendId", (data) => {
      this.id = data;
      setTimeout(() => {
        this.$axios.get("article/article/" + this.id+'/').then((res) => {
          this.article = res.data.data;
          
        });
      }, 500);
    });
  },
  mounted() {
    // setTimeout(()=>{
    //   console.log('数据',this.article)
    //   console.log('id值：',this.id)
    // },1000)
  },
  beforeDestroy() {
    this.$bus.$off("sendId");
  },
};
</script>

<style lang='less'>
.articleItem {
  .header {
    .title {
      height: 45px;
      line-height: 45px;
      text-align: left;
      font-size: 28px;
      word-wrap: break-word;
      color: #222226;
      font-weight: 600;
    }
    .article-info {
      font-size: 12px;
      position: relative;
      background: #f8f8f8;
      border-radius: 4px;
      .bar_top {
        color: #999aaa;
        width: 88%;
        display: flex;
        .type {
          color: #bb9444;
          margin-right: 20px;
          line-height: 33px;
        }
        .time {
          vertical-align: top;
          margin-right: 12px;
          line-height: 32px;
        }
        i {
          width: 24px;
          height: 24px;
          line-height: 26px;
          margin-top: 4px;
        }
        .read_count {
          vertical-align: top;
          margin-right: 12px;
          line-height: 32px;
        }
        .collect_name {
          vertical-align: top;
          margin-right: 12px;
          line-height: 32px;
        }
        .collect_num {
          vertical-align: top;
          margin-right: 12px;
          line-height: 32px;
        }
      }
      .bar-tag {
        text-align: left;
        font-size: 12px;
        line-height: 24px;
        margin-bottom: 4px;
        margin-right: 8px;
        .label {
          display: inline-block;
          color: #999aaa;
        }
        .tag_link {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin-right: 8px;
          padding: 3px 6px;
          font-size: 12px;
          background-color: #fff;
          color: #5094d5;
          border: 1px solid #eaeaef;
          height: 24px;
          line-height: 17px;
          border-radius: 2px;
          display: inline-block;
        }
      }
    }
  }
  .content {
    position: relative;
    min-height: 70px;
    font-size: 16px !important;
    word-wrap: break-word;
    p{
    color: #4d4d4d;
    font-weight: 400;
    line-height: 26px;
    margin: 0 0 16px;
    overflow: hidden;
    overflow-x: auto;
    text-align: left;
    }
  }
  .footer {
    display: flex;
    .box-left {
      display: flex;
      img {
        vertical-align: middle;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        border: 1px solid #f5f6f7;
        margin-right: 8px;
      }
      .name {
        max-width: 160px;
        height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-weight: 600;
        color: #222226;
        line-height: 32px;
        margin-right: 10px;
      }
      .guanzhu {
        display: block;
    min-width: 60px;
    height: 28px;
    background: #fff;
    border-radius: 16px;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    margin-top: 3px;
        a {
         display: block;
    min-width: 60px;
    height: 28px;
    background: #fff;
    border-radius: 16px;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
        }
      }
    }
    .box-right{
    width: 100%;
    height: 30px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
    li{
      list-style: none;
       img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
    }
    }
  }
 
}
</style>