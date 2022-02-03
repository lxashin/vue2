<template>
  <div class="register">
    <h3>
      注册新用户
      <span class="go"
        >我有账号，去 <router-link to="/">登录</router-link>
      </span>
    </h3>
    <div class="content">
      <label>用户名:</label>
      <input
        type="text"
        name="user_name"
        id="user_name"
        v-model="form.username"
        @blur="check_username"
        placeholder="请输入用户名"
      />
      <span class="error_tip" v-show="error_username">{{
        error_username_message
      }}</span>
    </div>
    <div class="content">
      <label>手机号:</label>
      <input
        type="text"
        name="phone"
        id="phone"
        v-model="form.phone"
        @blur="check_mobile"
        placeholder="请输入手机号"
      />
      <span class="error_tip" v-show="error_mobile">{{
        error_mobile_message
      }}</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input
        type="password"
        name="pwd"
        id="pwd"
        v-model="form.password"
        @blur="check_password"
        placeholder="请输入密码"
      />
      <span class="error_tip" v-show="error_password">{{
        error_password_message
      }}</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input
        type="password"
        name="cpwd"
        id="cpwd"
        v-model="password2"
        @blur="check_confirm_password"
        placeholder="请确认密码"
      />
      <span class="error_tip" v-show="error_confirm">{{
        error_confirm_message
      }}</span>
    </div>
    <div style="margin-bottom:20px;text-align:center">
       <span style="padding-right:20px;font-weight:700">性别：</span>
    <el-radio-group v-model="form.gender" style="margin:0">
      <el-radio label="1" v-model="form.gender">男</el-radio>
      <el-radio label="0" v-model="form.gender">女</el-radio>
      
    </el-radio-group>
  </div>
    <div class="controls">
      <input name="m1" type="checkbox" />
      <span>同意协议并注册《抗疫网站用户协议》</span>
      <span class="error_tip" v-show="error_allow">{{
        error_allow_message
      }}</span>
    </div>
    <div class="btn">
      <button @click="submit">完成注册</button>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        phone: "",
        password: "",
        gender:'1'
      },
      password2: "",
      error_username: false,
      error_password: false,
      error_confirm: false,
      error_mobile: false,
      error_allow: false,
      //错误信息展示
      error_username_message: "",
      error_password_message: "",
      error_confirm_message: "",
      error_mobile_message: "",
      error_allow_message: "",
    };
  },
  methods: {
    //检测用户名
    check_username:function () {
            let re = /^[a-zA-Z0-9_\u4e00-\u9fa5]{5,20}$/;
            if(re.test(this.form.username)){
                this.error_username=false;
            }else {
                this.error_username_message='请输入5-20个字符的用户';
                this.error_username=true;
            }
        },
    //检测密码
    check_password:function() {
      let re = /^[a-zA-Z0-9]{3,20}$/;
      if (re.test(this.form.password)){
        this.error_password = false;
      } else {
        this.error_password = true;
        this.error_password_message = "请输入3-20个字符密码";
        
      }
    },
    //检测确认密码
    check_confirm_password:function(){
      if (this.password2 != this.form.password) {
        this.error_confirm = true;
        this.error_confirm_message = "两次输入的密码不一致";
      } else {
        this.error_confirm = false;
      }
    },
    //检测手机号
    check_mobile:function(){
      let re = /^1[3-9]\d{9}$/;
      if (re.test(this.form.phone)) {
        this.error_mobile = false;
      } else {
        this.error_mobile = true;
        this.error_mobile_message = "请输入正确的手机号码";
      }
    },
    //提交注册按钮
    submit(){
      console.log(111)
      this.check_username();
      this.check_password();
      this.check_confirm_password();
      this.check_mobile();

      if (
        this.error_username == true ||
        this.error_password == true ||
        this.error_confirm == true ||
        this.error_mobile == true
      ) {
        alert("注册失败");
      } else {
        this.$axios({
          method: "post",
          url: "user/register/",
          data: this.form,
          headers: { "Content-Type": "application/json" }
        }).then(() => {
          console.log(this.form)
          this.$message({
            message:'注册成功',
            type:'success'
          })
          this.$router.push("/");
        });
      }
    },
  },

};
</script>
<style scoped lang="less">
.register {
  width: 100%;
  height: 100%;
  .error_tip {
    
    color: #e1251b;
  }
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}

.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;

  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>