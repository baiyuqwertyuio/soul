<template>
  <div class="tp">
    <!--<img style="height: 30px" src="../assets/logo.png" class="logo"/>-->
    <p class="brand">探探</p>
    <p>
      <el-input v-model="input" placeholder="根据昵称搜索附近人"></el-input>
      <el-button @click="like()" type="primary" icon="el-icon-search">搜索</el-button>
    </p>
    <p>
      <i  class="el-icon-s-home">探探</i>
      <i  class="el-icon-mobile">直播</i>
      <i  class="el-icon-s-custom">消息</i>
      <i  class="el-icon-magic-stick">社区</i>
      <i v-if="user.userName==null||user.userName==''" @click="login()" class="el-icon-s-custom">登录</i>
      <i v-if="user.userName!=null&&user.userName!=''" style="font-size: 20px;color: #409EFF">{{user.userName}}</i>
      <i v-if="user.userName==null||user.userName==''" @click="registry()" class="el-icon-thumb">注册</i>
      <i v-if="user.userName!=null&&user.userName!=''"></i>
    </p >
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "top",
      data(){
          return{
            user: {}
          }
      },
      methods:{
        like:function () {

        },
        login:function () {

        },
        registry:function () {

        },

      }
    }
</script>

<style scoped>
  .tp {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    height: 50px;
    align-items: center;
  }

  .brand{
    font-family: Consolas;
    font-style: italic;
    font-size: 18px;
    color: #409EFF;
    cursor: pointer
  }

  .el-icon-s-custom{
    margin-right: 20px;
    cursor: pointer;
  }
  .el-icon-upload{
    margin-right: 20px;
    cursor: pointer;
  }
  .el-icon-thumb{
    cursor: pointer;
  }
  .el-icon-mobile{
    margin-right: 20px;
    cursor: pointer;
  }

  .el-input{
    width: 300px;
  }


</style>
