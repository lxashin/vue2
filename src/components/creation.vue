<template>
  <div class="creation">
    <div class="first">
      <h3>创作中心</h3>
    <div>我的文章 ({{article.length}})</div>
    </div>
      
    <div class="second">
        <div class="publish" @click="publishArticle">分享你身边的抗疫故事<el-button type="primary" size="mini">发布文章</el-button></div>
        <div class="wish" @click="publishWish"><div class="mood"> 说出你的心情</div><div class="btn"><el-button type="primary" size="mini">发布心愿</el-button></div></div>
    </div>
  <PublishWish :dialog=dialog2></PublishWish>
  </div>
</template>

<script>
import PublishWish from '../pages/publishWish.vue'
export default {
  components:{PublishWish},
  data() {
    return {
      dialog2:{
        show:false
      },
      article:[]
    }
  },
  methods: {
    publishArticle(){
     this.$router.push('/publish')
    },
    publishWish(){
      this.dialog2={
        show:true
      }
    }
  },
  mounted() {
    this.$axios.get('user/article/').then((res)=>{
      this.article = res.data.data
    })
  },
}
</script>

<style lang="less">
.creation{
    width: 200px;
    height: 200px;
    background-color: #fff;
    border: 2px solid #ccc;
    .first{
      display: flex;
      h3{
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      font-weight: 600;
      text-align: left;
    }
    div{
       height: 20px;
       line-height: 20px;
       font-size: 15px;
       padding:21px 0 0 24px
    }
    }
    .second{
      .publish{
        margin-top: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: normal;
        
      }
      .wish{
        display: block;
        height: 40px;
        .mood{
          margin-top: 46px;
        height: 20px;
        line-height: 20px;
        size: 14px;
       
        }
         .btn{
           height: 20px;
           line-height: 20px;
         }
        
      }
    }
    
    
  
    

}
</style>