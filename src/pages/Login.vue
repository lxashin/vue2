<template>
   <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a class='current' @click="userLogin">用户登录</a>
            </li>
          </ul>

          <div class="content">
            <form>
              <div class="input-text clearFix">
                <span></span>
                <input
                  type="text"
                  placeholder="邮箱/用户名/手机号"
                  v-model="loginUser.username"
                />
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input
                  type="password"
                  placeholder="请输入密码"
                  v-model="loginUser.password"
                />
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="" />
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent="userLogin">
                登&nbsp;&nbsp;录
              </button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="../assets/images/login/qq.png" alt="" /></li>
                <li><img src="../assets/images/login/sina.png" alt="" /></li>
                <li><img src="../assets/images/login/ali.png" alt="" /></li>
                <li><img src="../assets/images/login/weixin.png" alt="" /></li>
              </ul>
              <div>还没有账号？<router-link class="register" to="/register"
                >立即注册</router-link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Login',
    data() {
        return {
            loginUser:{
            username:'',
            password:''
            },
           
        }
    },
    methods: {
        userLogin(){
            this.$axios.post('user/login/',this.loginUser).then((res)=>{
              const token = res.data.data;
            localStorage.setItem("eleToken", token);
             this.$router.replace('/main'); //登录成功跳转到首页
            this.$message({
              message:'登录成功',
              type:'success'
            })
            }).catch((error)=>{
                this.$message({
                    message:error,
                    type:'error'
                })
            })
        },
    },
}
</script>

<style lang="less">
.login-container {
    ul{
        padding: 0;
        margin: 0;
        li{
            list-style: none;
        }
    }
  .login-wrap {
    height: 487px;
     

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      background: #fff;
      top: 45px;
      margin: 0 auto;
      position: relative;
      padding: 20px;

      .tab {
        li {
          width: 100%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;
        margin-top: 50px;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              background: url(../assets/images/icons.png) no-repeat -10px -201px;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #e1251b;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
           
            font-size: 15px;
            line-height: 38px;
            color: #e1251b;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
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
}
</style>