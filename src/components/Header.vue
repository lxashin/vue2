<template>
  <header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#8590a6"
      active-text-color="#06f"
    >
      <el-menu-item><img :src="imgUrl2" alt="" class="img1" /></el-menu-item>
      <el-menu-item><h3>抗疫网站</h3></el-menu-item>
      <el-menu-item index="1"
        ><router-link to="/main">首页</router-link></el-menu-item
      >
      <el-menu-item index="2"
        ><router-link to="/video">视频</router-link></el-menu-item
      >
      <el-menu-item index="3"
        ><router-link to="/picture">图片专栏</router-link></el-menu-item
      >
      <el-menu-item index="4"
        ><router-link to="/wish">心愿</router-link></el-menu-item
      >

      <input type="text" placeholder="请输入内容" v-model="keyword"/>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="sou"
        size="small"
        @click="search"
        >搜索</el-button
      >

      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="baseUrl+userInfo.profile_photo" class="img2" />
          <span>{{userInfo.username}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="font-size: 16px" 
            ><span
              @click="toPerson"
              style="text-decoration: none; color: #000"
              >个人中心</span
            ></el-dropdown-item
          >
          <el-dropdown-item style="font-size: 16px"
            ><router-link to="" style="text-decoration: none; color: #000"
              >帮助</router-link
            ></el-dropdown-item
          >
          <el-dropdown-item style="font-size: 16px" 
            ><span @click="unLogin" style="text-decoration: none; color: #000" 
              >退出</span
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </header>
</template>

<script>
export default {
  name:'Header',
  data() {
    return {
      imgUrl2: require("../assets/images/抗疫icon.png"),
      activeIndex: "1",
      keyword: "",
      article: [],
      userInfo:{},
      baseUrl:'http://192.168.1.103:8000'
    };
  },
  methods: {
    search() {
      this.$axios
        .get(`article/article/search/${this.keyword}/`)
        .then((res) => {
          this.$router.push('/main')
          this.activeIndex=1
          this.article = res.data.data;
          setTimeout(()=>{
             this.$bus.$emit("update", this.article);
             
          },500)
          
         this.$message({
          message: "搜索成功！",
          type: "success",
          
        });
        });
        setTimeout(()=>{
          if (this.article.length === 0) {
        this.$message({
          message: "搜索失败！",
          type: "error",
        });
      }
        },500)
      
      this.keyword = "";
    },
    unLogin(){
      localStorage.removeItem('eleToken')
      this.$router.push('/')
    },
    toPerson(){
      this.activeIndex = ''
      this.$router.push('/person')
      
    }
  },
  created() {
    this.$axios.get('user/user/').then((res)=>{
      this.userInfo = res.data.data
    })
  },
};
</script>

<style lang="less">
header {
  a {
    display: inline-block;
    width: 100%;
    text-decoration: none;
  }
  .img1 {
    height: 60px;
  }
  h3 {
    font-size: 25px;
    margin-left: -24px;
    margin-top: -1px;
    color: #000;
  }
  .el-menu-item {
    font-size: 16px;
  }
  input {
    width: 300px;
    height: 26px;
    margin-left: -254px;
    outline: none;
  }
  .el-button {
    margin-left: 15px;
  }
  .el-dropdown {
    float: right;
    padding-right: 16px;
    span {
      padding-left: 10px;
    }
  }
}

.img2 {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>