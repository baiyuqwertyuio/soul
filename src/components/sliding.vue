<template>

    <div>
      <top></top>
      <div class="background">
        <video class="vid" autoplay loop muted playsinline preload="auto">
          <source src= "http://china-img.soulapp.cn/admin/2020-06-24/302e6662-a360-4cdd-8a87-966ed18c4554.mp4" type= "video/mp4" />
        </video>
      </div>

      <el-carousel :interval="4000" type="card" height="450px">
        <el-carousel-item v-for="item in 3" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    <div>
      <el-tabs class="tabs" style="width: 400px;" v-model="user" type="card" @tab-click="handleClick">
        <el-tab-pane style="text-align: left;" label="个人信息" name="first">
          个人信息
        </el-tab-pane>
        <el-tab-pane style="text-align: left;" label="个性签名" name="second">
          配置管理
        </el-tab-pane>
        <el-tab-pane style="text-align: left;" label="交友宣言" name="third">
          角色管理
        </el-tab-pane>
        <el-tab-pane style="text-align: left;" label="爱好" name="fourth">
          爱好
        </el-tab-pane>
      </el-tabs>
    </div>
      <div>
        <el-button type="danger">加入喜欢</el-button><el-button type="primary" @click="next">下一个</el-button>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  axios.defaults.withCredentials=true
    export default {
      name: "",
      data(){
          return{
              user:{
                userName:'',
                age:'',
                constellation:'',
                hobby:'',
                student:''
              }
          }
      },
      methods:{
        handleClick(tab, event) {
          console.log(tab, event);
        },
        next:function () {
          axios.post("")
        },
        findAll:function () {
          axios.post("http://localhost:8030/like/findRandom").then(res=>{
              if (res.data.code==200){
                console.log(res.data.data)
              }
          })
        }
      },
      mounted(){
        this.findAll()
      }
    }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
