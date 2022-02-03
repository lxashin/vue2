<template>
  <div class="myFriend">
    <header>
      <input placeholder="输入用户名" v-model="username">
      <el-button type="primary" size="small" @click="search">搜索</el-button>
    </header>
    <div class="friend" v-for="friend in myFriends" :key="friend.friend_id">
      <ui>
        <li>
          <img :src="baseUrl+friend.friend_profile" alt="">
          <span>{{friend.friend_name}}</span>
        </li>
      </ui>
    </div>
    <!-- 搜索弹出窗口 -->
    <el-dialog
    width="400px"
    title="搜索好友"
    :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
    <div class="tip">
      <span>请求添加{{username}}好友</span>
      <div class="btn">
        <!-- <i class="el-icon-check" @click="addFriend"></i>
        <i class="el-icon-close" @click="cancelAdd"></i> -->
        <button type="success" @click="addFriend">添加</button>
        <button type="info" @click="cancelAdd">取消</button>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'MyFriend',
  data() {
    return {
      dialogVisible:false,
      username:'',
      baseUrl:'http://192.168.1.103:8000',
      myFriends:[]
    }
  },
  methods: {
    getMyFriends(){
      this.$axios.get('user/friendRelation/').then((res)=>{
        this.myFriends = res.data.data
        console.log(res.data.data)
      })
    },
    search(){
      this.dialogVisible = true
    },
    addFriend(){
      this.$axios({
        method:'post',
        url:'user/friendRequest/',
        params:{username:this.username}
      }).then(()=>{
        this.dialogVisible = false
        this.$message({
          message:'发送成功',
          type:'success'
        })
      }).catch(()=>{
        this.$message({
          message:'添加失败',
          type:'error'
        })
      })
    },
    cancelAdd(){
      this.dialogVisible = false
      this.username = ''
    }
  },
  mounted() {
    this.getMyFriends()
  },
}
</script>

<style lang="less">
.myFriend{
  background-color:rgb(245,245,245);
 header{
   height: 100px;
   line-height: 100px;

 }
 .friend{
   li{
     height: 50px;
     line-height: 50px;
     text-align: left;
     margin-left: 30px;
     list-style: none;
     img{
       vertical-align: middle;
    margin-right: 10px;
       width: 40px;
       height: 40px;
     }
   }
 }
 .tip{
   display: flex;
   line-height: 25px;
   float: right;
   span{
     font-size: 16px;
     padding-right:10px ;
   }
   .btn{
     font-size: 16px;
     padding-right: 5px;
     button:nth-child(1){
       border: 1px solid rgb(133, 206, 97);
    background: rgb(133, 206, 97);
    border-radius: 5px;
    margin-right: 10px;
     }
      button:nth-child(2){
       border: 1px solid rgb(166, 169, 173);
    background: rgb(166, 169, 173);
    border-radius: 5px;
    margin-right: 10px;
     }
   }
 }
}
</style>