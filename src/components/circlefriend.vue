<template>
  <el-main class="main" >
    <el-main class="headers">
      <top></top>
    </el-main>
    <el-main class="background">
      <img src="https://i.gtimg.cn/qzone/space_item/orig/3/72019_top.jpg">
     <!-- <video class="vid" autoplay loop muted playsinline preload="auto">
        <source src= "http://qmg8d7vbk.hb-bkt.clouddn.com/%E6%91%84%E5%9B%BE%E7%BD%91_70658_1080p.mp4" type= "video/mp4" />
      </video>-->
    </el-main>
    <el-main class="send-auto">
      <el-main class="send">
        <el-input
          type="textarea"
          :rows="7"
          placeholder="记录这一刻,晒给懂你的人...."
          v-model="circlefriend.comment">
        </el-input>
      </el-main>
    </el-main>

    <el-main class="emoji" v-show="isShow">
      <picker
        :include="['people']"
      :showSearch="false"
      :showPreview="false"
      :showCategories="false"
       @select="addEmoji"
      />
    </el-main>

    <el-main class="button">
      <el-button class="el-icon-chat-line-round" @click="emoji"></el-button>
      <el-button type="warning" @click="release(circlefriend)">发布</el-button>
    </el-main>
    <el-main class="catalog">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="关注" name="first" ></el-tab-pane>
        <el-tab-pane label="推荐" name="second"></el-tab-pane>
        <el-tab-pane label="最新" name="third"></el-tab-pane>
      </el-tabs>
    </el-main>
    <el-main class="content">
      <router-view></router-view>
    </el-main>

    <el-main class="user">
      <el-main class="head" >
        <el-row class="demo-avatar demo-basic">
          <el-col :span="24">
            <!--<el-main class="sub-title"></el-main>-->
            <el-main class="demo-basic--circle">
              <el-main class="block"><el-avatar :size="80" :src="user.pic1" style="cursor: pointer"></el-avatar></el-main>
              <el-main class="block" v-for="size in sizeList" :key="size">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
              </el-main>
            </el-main>
          </el-col>
        </el-row>
      </el-main>
      <el-main class="msg" v-model="user">
        <span>昵称:{{user.message}}</span><br>
        <span>星座:{{user.constellation}}</span><br>
        <span>粉丝:{{FanNums}}</span><br>
        <span v-model="follow">关注:{{nums}}</span>
      </el-main>
      <el-main class="signature">
        个性签名:<span>{{user.word}}</span>
      </el-main>
    </el-main>


  </el-main>
</template>

<script>
  import { Picker } from "emoji-mart-vue";
  import axios from 'axios'
  import top from '@/components/top'
  axios.defaults.withCredentials=true;
  export default {
    components:{
      top
    },
    data() {
      return {
        isShow:true,
        activeName: 'first',
        sizeList:'',
        circlefriend:{
          uid:'',
          comment:'',
          commentDate:'',
          commentUser:''
        },
        nowTimes:'',
        user:{
          id:'',
          userName:'',
          pic1:'',
          constellation:'',
          word:'',
          message:''
        },
        follow:{
          fid:'',
          uid:'',
          followUser:''
        },
        nums:'',
        FanNums:''
      }
    },
    methods: {
      emoji:function(){
        this.isShow = !this.isShow
      },
      addEmoji(e) {
        this.circlefriend.comment += e.native;
      },
      FansNums:function(name){
        console.log(name)
        axios.post("http://localhost:7000/s-circle of friend/circleFriend/findFollowByFollowUser?followUser="+ name ).then(res=>{
          if (res.data.code == 200){
            this.FanNums = res.data.data
          }
        })
      },
      findFollowNums:function(id){
        console.log(id)
        axios.post("http://localhost:7000/s-circle of friend/circleFriend/findFollowByUid?uid="+ id ).then(res=>{
          if (res.data.code == 200){
            this.nums = res.data.data
            console.log(this.nums)
          }
        })
      },
      setNowTimes(){
        let myDate = new Date();
        let yy = myDate.getFullYear();
        let mm = myDate.getMonth()+1;
        let dd = String(myDate.getDate()<10?'0'+ myDate.getDate(): myDate.getDate()) ;
        this.nowTimes = yy + "-" + mm + "-" + dd;
      },
      release:function(circlefriend){
        this.circlefriend.commentDate = this.nowTimes
        this.circlefriend.uid = this.user.id
        this.circlefriend.commentUser = this.user.message
          axios.post("http://localhost:7000/s-circle of friend/circleFriend/insertComment",this.circlefriend).then(res=>{
            if (res.data.code == 200) {
              alert(res.data.message)
              location.reload()
            }else {
              alert(res.data.message)
            }
          })
      },
      handleClick(tab, event) {

          if (this.activeName == "first"){

            this.$router.push("/follow")
          }
          if (this.activeName == "second"){

          this.$router.push("/recommend")
         }
          if (this.activeName == "third"){

          this.$router.push("/newest")
         }
      },
      handleClicka(row) {
        console.log(row);
      },
      findUserById:function () {
        axios.post("http://localhost:7000/s-circle of friend/circleFriend/findUserById").then(res=>{
          if (res.data.code==200){

            this.user = res.data.data
            this.follow.uid = this.user.id;
            this.follow.followUser = this.user.message
            this.FansNums(this.follow.followUser)
            this.findFollowNums(this.follow.uid)
          }
        })
      }
    },
    mounted(){
      this.isShow = false
      this.findUserById();
      // this.findFollowNums()

      setInterval( ()=>{
        this.setNowTimes();
      },1000)
      this.$router.push("/newest")
    },
    components: {
      Picker,
      top
    }
  }
</script>

<style scoped>

  .emoji [data-v-7bc71df8] {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 400px;
    color: #ffffff !important;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    background: #fff;
    position: absolute;
    left: 71%;
    top: 14%;
  }

  .main{
    overflow: auto;
    position: fixed;
   /* background-color: beige;*/
    /*border:1px solid red;*/
    width:100%;
    height:100%
  }

  .headers{
    /*border:1px solid red;*/
    height: auto;
    width:100%;
  }

  .send-auto{
    overflow: auto;
    /*border:1px solid red;*/
    position: absolute;
    left:50%;
    top:14%;
    transform: translate(-50%);
    width: 40%;
    padding:0;
    z-index: 10;
    /*margin-left: 550px;*/
  }
  .send{
    padding:0;
  }

  .button{
    z-index: 10;
    position: absolute;
    left: 66.5%;
    top:31%;
    transform: translate(-50%);
  }

  .catalog{
    position: absolute;
    top:36%;
    left: 29%;
  }

  .content{
    height:100%;
    padding:0;
    position: absolute;
    left:50%;
    transform: translate(-50%);
    top:50%;
    width:40%;
    /*border:1px solid red;*/
    overflow: hidden;
  }

  .user{
    overflow:hidden;
    /*border:1px solid red;*/
    position: absolute;
    background-image: url("/static/image/user.png");
    background-size:100% 100%;
    width: 13vw;
    height: 26vh;
    left:12%;
    top:14%;
  }

  .head {
    padding:0;
    width: 40%;
    /*border:1px solid red;*/
    float: left;
    margin-top: 2.6vh;
  }

  /*.demo-avatar{*/
    /*padding: 0;*/
  /*}*/

  .demo-basic--circle{
    padding: 0;
  }

  .msg{
    text-align: left;
    float: left;
    margin-right: 0.4vw;
    /*border:1px solid red;*/
    /*position: relative;*/
    /*margin-left: 50px;*/
    /*padding-top: 31.25px;*/
    font-weight: bold;
    color: black;

  }

  .block{
    padding:0;
    /*border:1px solid greenyellow;*/
    width: 100%;
    overflow: hidden;
  }


  .signature{
    padding: 0;
    text-align: left;
    padding-left: 1vw;
    /*position: absolute;*/
    clear: both;
    font-weight: lighter;
    font-size: 6.25px;
    color: black;
  }

  /*.block{*/
    /*position: absolute;*/
    /*!*margin-top: -387.5px;*!*/
  /*}*/
  /*.main{*/
    /*margin-left: 187.5px;*/
  /*}*/




 .background img{
   /*background-color: beige;*/
    position: fixed;
    right: 0px;
    bottom: 0px;
    min-width: 100%;
    min-height: 100%;
    height: 120%;
    width: 100%;
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
