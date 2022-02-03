<template>
   <div class="article">
      <div class="articleItem">
          <div class="item" v-for="article in myArticle" :key="article.id">
      <div class="tit"><a href="#">{{article.title}}</a></div>
      <div class="content">
        <span v-html="article.content"></span>
      </div>
      <div class="footer">
        <span
          ><button class="btn">
            <i class="el-icon-caret-top"></i> 赞同 {{article.like_count}}
          </button></span
        >
        <span @click="comment"
          ><button class="btn2">
            <i class="el-icon-s-comment"></i> 评论 {{article.comment_count}}
          </button></span
        >
        <span @click='collect(1)'
          ><button class="btn3" >
            <i class="el-icon-star-off" v-if="isShow"> 收藏 {{article.collect_count}}</i>
            <i class="el-icon-star-on" v-else style="color:red"> 收藏 {{article.collect_count}}</i>
          </button></span
        >
        <span>阅读数 {{article.read_count}}</span>
      </div>
       </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name:'MyArticle',
    data() {
    return {
      isShow:true,
      dialog:{
        show:false,
        title:'',
      },
      myArticle:[]
    }
  },
  methods: {
    comment(){
        this.dialog={
      show:true,
      title:'评论区',
      
    }
      },
      getMyArticle(){
        this.$axios.get('user/article/').then((res)=>{
          this.myArticle = res.data.data
        })
      },
       collect(id){
        console.log(id)
        this.isShow=!this.isShow
      }
  },
  mounted() {
    this.getMyArticle()
  },
}
</script>

<style lang="less">
.article {
    .articleItem{
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
      height: 80px;
      line-height: 30px;
      text-align: left;
      font-size: 18px;
      span{
        overflow:hidden;
					text-overflow:ellipsis;
					display:-webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical
      }
      
      
      
    }

    .footer {
      height: 50px;
      line-height: 50px;
      text-align: left;
      margin-top: 23px;
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
 
}
</style>