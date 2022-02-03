<template>
  <div class="wish">
      <el-card class="card" v-for="(wish,index) in wishData" :key="index">
              <div class="content"><div>{{wish.content}}</div> </div>
             <div class="footer">
                <span class="time">{{dateFormat(wish.post_time)}}</span> 
                <span class="author">作者：{{wish.user_username}}</span>
              </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wishData:[],
    }
  },
  methods: {
    getWishData(){
      this.$axios.get('hope/hope/').then((res)=>{
        this.wishData = res.data.data
      })
    },
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
  created() {
    this.getWishData()
  },
}
</script>

<style lang="less">
.wish{
  
  display: flex;
  flex-wrap: wrap;
  
  .card{
    margin-left: 20px;
    margin-bottom: 20px;
   width: 30%;
   height: 300px;
    .title{
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: 700;
    }
    .content{
      display: table;
      word-break: break-all;
      word-wrap: break-word;
      height: 200px;
      line-height: 50px;
      
      div{
        display: table-cell;
        vertical-align: middle;
        overflow:hidden;
					text-overflow:ellipsis;
					display:-webkit-box;
					-webkit-line-clamp:4;
					-webkit-box-orient:vertical
      }
    }
    .footer{
      height: 50px;
      line-height: 30px;
      float: right;
      font-size: 12px;
      color:#ccc;
      .author{
        padding-left: 10px;
      }
    }
  }
}

</style>