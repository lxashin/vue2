<template>
  <div class="person">
      <div class="header">
          <div><img :src="baseUrl+userInfo.profile_photo" alt=""></div>
          
        <div class="name">{{userInfo.username}}</div>

        <div class="fr">
           <div class="message" @click="message"><el-badge :value="messageLength" class="item">
  <el-button size="mini"><i class="el-icon-bell"></i>消息</el-button>
</el-badge></div>
            <a :href="[tokenUrl+token+'/']"><button class="advice">意见反馈</button></a>

            <button @click="edit">编辑个人资料</button>
        </div>
      </div>
      <div class="list">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#000" active-text-color="#06f">
              <el-menu-item index="1"><router-link to="/person/">我的文章</router-link></el-menu-item>
  <el-menu-item index="2"><router-link to="/mywish">我的心愿</router-link></el-menu-item>
  <el-menu-item index="3"><router-link to="/collection">收藏</router-link></el-menu-item>
  <el-menu-item index="4"><router-link to="/praise">点赞</router-link></el-menu-item>
  <el-menu-item index="5"><router-link to="/myfriend">我的好友</router-link></el-menu-item>
  <el-menu-item index="6"><router-link to="/friendcollect">好友收藏</router-link></el-menu-item>
              </el-menu>
      </div>
      <div class="content">
          <div class="art-left">
              <router-view></router-view>
          </div>
          
          <div class="creation">
              <Creation></Creation>
          </div>
      </div>
<MessageDialog :dialog=dialog></MessageDialog>
  </div>
</template>

<script>
import Creation from '../../components/creation.vue'
import MessageDialog from '../../components/messageDialog.vue'
export default {
    name:'Person',
    data() {
        return {
            activeIndex:'1',
            baseUrl:'http://192.168.1.103:8000',
            tokenUrl:'http://192.168.1.103:8000/user/feedback/',
            token:'',
            userInfo:{},
           dialog:{
        show:false,
      },
        messageDate:[],
        messageLength:''
        }
    },
    components:{Creation,MessageDialog},
    methods: {
        edit(){
            this.$router.push('/edit')
        },
        message(){
            this.dialog={
                show:true,
            }
        },
        location(){

        }
    },
    watch:{
        userInfo(){

        }
    },
    created() {
       this.$axios.get('user/user/').then((res)=>{
           this.userInfo = res.data.data
       })
        this.$axios.get('user/friendRequest/').then((res)=>{
            this.messageData = res.data.data
            this.messageLength = this.messageData.length
            this.$bus.$emit('sendMessageData',res.data.data)
            
        })
    },
    mounted() {
      this.token = localStorage.getItem('eleToken')
      console.log(this.token)
    },
}
</script>

<style lang="less">
.person{
  
    .header{
    width: 100%;
    height: 200px;
    display: flex;
    
        
        a{
            display: block;
            height: 35px;
            line-height: 35px;
            .advice{
                position: absolute;
                top: 78px;
                right: 0;
            }
        }
    
    img{
        width: 100px;
        height: 100px;
        vertical-align: middle;
    }
    .name{
        font-size: 28px;
        color: #000;
        margin-left: 20px;
    }
    .fr{
        position: relative;
        left: 800px;
        display: flex;
        flex-direction: column;
        .message{
            height: 30px;
            line-height: 30px;
            margin-bottom: 100px;
            &:hover{
                cursor: pointer;
            }
        }
        button{
           color: #06f;
           border-color: #06f;
           width: 113px;
           height: 36px;
        }
    }
    
}
.list{
        a{
            text-decoration: none;
            color: #000;
            font-size: 16px;
             display: inline-block;
        width: 100%;
        }
    }
    .content{
        width: 100%;
        height: 400px;
        .art-left{
            width: 80%;
            background-color: #fff;
        }
        .creation{
            position: fixed;
           top: 374px;
           right: 183px;
           
        }
        
    }
}

</style>