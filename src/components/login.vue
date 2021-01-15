<template>
  <div class="big_box">
    <div class="background">
      <video class="vid" autoplay loop muted playsinline preload="auto">
        <source src= "http://qmg8d7vbk.hb-bkt.clouddn.com/%E6%91%84%E5%9B%BE%E7%BD%91_70658_1080p.mp4" type= "video/mp4" />
      </video>
    </div>
    <div class="logo">
      <img class="soul_logo" src="/static/image/b4fbcc9730c6295276ce896e36ea675.jpg"  width="80px" height="80px" >
    </div>
    <div class="topic">
      <p style="color:black;font-size: 30px;">账号登录</p>
    <el-form :model="user" ref="user" label-width="100px" class="demo-dynamic"  style="width: 400px">
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
      { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码"
        :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]"
      >
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="registry">注册</el-button>
        <el-button type="primary" @click="submitForm('user')">提交</el-button>
        <el-button @click="resetForm('user')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "login",
    data() {
      return {
        user: {
          password:'',
          email: ''
        },

      };
    },
    methods: {
      registry:function () {
        this.$router.push("/registry");
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.user)
          if (valid) {
            axios.post("http://localhost:7000/s-user/user/login",this.user).then(res =>{
              if(res.data.code==401){
                alert(res.data.message)
              }else {
                if (res.data.code == 200) {
                  alert(res.data.message)
                  this.cookie.set("token", res.data.data);
                  this.$router.push("/");
                }
                if (res.data.code == 404) {
                  alert(res.data.message)
                }
                if (res.data.code == 500) {
                  alert(res.data.message)
                }
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
      }
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
    right: 0px;bottom: 0px;
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

