<template>
  <div class="big_box">
    <div class="logo">
      <img class="soul_logo" src="../assets/soul_logo.jpg"  width="80px" height="80px" >
    </div>
    <div class="background">
      <video class="vid" autoplay loop muted playsinline preload="auto">
        <source src= "http://qmg8d7vbk.hb-bkt.clouddn.com/%E6%91%84%E5%9B%BE%E7%BD%91_84969_1080p.mp4" type= "video/mp4" />
      </video>
    </div>

    <div class="topic">
      <el-form :model="user" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width: 400px"
               class="demo-ruleForm">
        <p style="color:black;font-size: 30px;">账号注册</p>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" v-model="user.repassword"></el-input>
        </el-form-item>
        <!--<el-form-item label="验证码" prop="code">-->
          <!--<el-input v-model="user.code"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item>

          <el-button type="primary" @click="registry('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "registry",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.user.repassword !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.user.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        }

        return{
          user:{
            userName:'',
            password:'',
            email:'',
            pic:'',
            repassword:''
          },
          rules: {
            userName: [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            email: [
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],

            repassword: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        registry: function (formName) {
          console.log(formName)
          this.$refs[formName].validate((valid) => {
            console.log(valid);
            if (valid) {
              axios.post("http://10.12.154.95:8007/user/registry", this.user).then(res => {
                if (res.data.code == 200) {
                  alert("注册成功,请到该邮箱激活账号")
                  this.$router.push("/login")
                }
                if(res.data.code==101){
                  alert(res.data.message)
                }
                if(res.data.code==102){
                  alert(res.data.message)
                }
                if(res.data.code==103){
                  alert(res.data.message)
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });


        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
      }

    }
</script>

<style scoped>
  .big_box{
    position: relative;
    width: 100%
  }
.soul_logo{
  position: absolute;
  left: 50px;
  top: 0;
}
.topic{
  position: absolute;
  right: 80px;
  top: 300px;
}

  video{

    position: fixed;
    right: 0px;
    bottom: 0px;
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
    /*加滤镜*/
    /*filter: blur(15px); //背景模糊设置*/
    /*-webkit-filter: grayscale(100%);*/
    /*filter:grayscale(100%); //背景灰度设置*/
    z-index:-11
  }
  source{
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
  }
</style>
