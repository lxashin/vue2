<template>
  <div class="editPerson">
    <h2>个人信息</h2>
    <div class="main">
      <div class="tx">
        <a href="#">
          <img :src="avatar" alt="">
          <p class="avatar" @click.stop="uploadHeadImg">修改头像</p>
           <input type="file" accept="image/*" style="display:none" @change="handleFile" ref="hiddenInput"/>
        </a>
      </div>
      <div class="xx">
        <h3 class="base">
          <strong>基础资料</strong>
          <span @click="dialogVisible = true">编辑</span>
        </h3>
        <div>姓名：{{userInfo.username}}</div>
        <div>电话：{{userInfo.phone}}</div>
        <div>性别：{{userInfo.gender==1?'女':'男'}}</div>
      <h3 class="high">高级设置</h3>
      <div>
        <span>账号地区：{{address}}</span>
        <span class="modify" @click="dialogTableVisible = true">修改</span>
        </div>
      </div>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog
    width="400px"
    title="编辑个人信息"
    :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
    <form action="">
      <p>
        <label>姓名:</label>
        <input type="text">
      </p>
      <p>
         <label>生日:</label>
        <input type="date">
      </p>
      <p>
        <label>性别:</label>
        <span>
          <input type="radio" class="radio" name="sex">男
          <input type="radio" class="radio" name="sex">女
        </span>
       
      </p>
      <div class="btn">
        <input type="button" value="保存">
         <input type="button" value="取消" @click="dialogVisible = false">
      </div>
    </form>
    </el-dialog>

    <!-- 修改窗口 -->
    <el-dialog
    width="400px"
    title="切换账号地区"
    :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
    <form action="">
      <p>
        <label>地区:</label>
        <input type="text" v-model="address">
      </p>
      <div class="btn">
        <input type="button" value="保存" @click="save">
         <input type="button" value="取消" @click="dialogTableVisible = false">
      </div>
    </form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'EditPerson',
  data() {
    return {
      dialogVisible: false,
      dialogTableVisible:false,
      userInfo:{},
      baseUrl:'http://192.168.1.103:8000',
      address:'深圳',
     avatar:require('../../assets/images/tx.png')
    }
  },
  methods: {
    uploadHeadImg(){
      this.$refs.hiddenInput.dispatchEvent(new MouseEvent('click'))
    },
     // 将头像显示
    handleFile(e) {
      let $target = e.target || e.srcElement   // e.srcElement是ie的
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {   //文件完成读取时触发
        let res = data.target
        this.avatar = res.result
        console.log(this.avatar)
        // this.$axios({
        //   method:'post',
        //   url:'user/updateProfile/',
        //   data:{profile:this.avatar},
        //   headers:{'Content-Type': 'multipart/form-data'}
        // }).then(()=>{
        //   this.$message({
        //     message:'修改成功',
        //     type:'success'
        //   })
        // })
        reader.readAsDataURL(file)
      }
      
    },
    save(){
      this.dialogTableVisible = false

    }
  },
  mounted() {
    this.$axios.get('user/user/').then((res)=>{
      this.userInfo = res.data.data
    })
  },
}
</script>

<style lang="less">
.editPerson{
  width: 840px;
  
  padding: 50px;
  margin: 20px 0;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  h2{
    height: 28px;
    line-height: 28px;
    font-size: 22px;
    font-weight: normal;
    padding-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
    margin-bottom: 30px;
  }
  .main{
    display: flex;
  .tx{
      flex: 1;
    text-align: center;
    margin-top: 10%;
    img{
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
    a{
          display: block;
    width: 90px;
    height: 90px;
    border-radius: 45px;
    border: 1px solid #e3e3e3;
    padding: 1px;
    }
    .avatar{
      margin-top: -50px;
    }
    p{
      height: 16px;
      line-height: 16px;
      color: #A10000;
    margin-top: 5px;
    }
  }
  .xx{
    flex: 3;
    .base{
      line-height: 21px;
      height: 21px;
      text-align: left;
      padding-bottom: 15px;
      border-bottom: 1px solid #e6e6e6;
      strong{
       
      }
      span{
        float: right;
        font-size: 12px;
        color: #A10000;
        
      }
    }
    div{
      text-align: left;
      height: 41px;
      line-height: 41px;
      font-size: 12px;

      border-bottom: 1px solid #e6e6e6;
    font-family: "微软雅黑", "arial";
    .modify{
      float: right;
          color: #A10000;
          font-weight: 700;
    }
    }
  .high{
    padding: 25px 0 15px;
    text-align: left;
    height: 21px;
    line-height: 21px;
    
  }
  }
  }
  .el-dialog{
    .el-dialog__header{
      height: 20px;
      line-height: 20px;
      text-align: left;
    }
    form{
      p{
        height: 42px;
        line-height: 42px;
        margin-bottom: 10px;
         text-align: left;
        
    color: #666666;
    label{
      cursor: pointer;
    }
    input{
      outline: none;
      margin-left: 20px;
      border: 1px solid #e8e8e8;
    width: 250px;
    height: 40px;
    line-height: 40px;
    text-indent: 5px;
    }
    .radio{
      height: 20px;
      width: 20px;
    }
      }
      .btn{
        height: 36px;
        line-height: 36px;
        margin-top: 30px;
    display: flex;
    justify-content: space-around;
    input{
      &:nth-child(1){
        width: 120px;
    height: 36px;
        background: #A10000;
    color: #FFFFFF;
      }
      &:nth-child(2){
        display: inline-block;
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #fff;
    border: 1px solid #e6e6e6;
      }
    }
      }
    }
  }
}
</style>