<template>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">记账宝</h3>
      <el-form-item prop="user">
        <el-input type="text" auto-complete="off" prefix-icon="el-icon-user" placeholder="用户名" v-model="loginForm.user"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input  type="password" auto-complete="off" prefix-icon="el-icon-key" placeholder="密码" v-model="loginForm.pass">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="remenber">记住用户名</el-checkbox>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submit('loginForm')">登 录</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
  export default {
    data() {
        var validateUser = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入用户名'));
          } else {
            callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
        };

        return {
          loginForm: {
            user: '',
            pass: ''
          },
          remenber: true,
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            user: [
              { validator: validateUser, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      }
    }
</script>

<style>
  .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 10px auto;
    text-align: center;
    color: #505458;
  }

  .el-form-item{
    margin-bottom:5px;
    }
  }
</style>