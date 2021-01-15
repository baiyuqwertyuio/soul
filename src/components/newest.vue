<template>
  <el-main class="main">
    <el-main v-for="(friend,index) in circlefriendList " :key="index">
      <!--头像和名字-->
      <el-main class="first-auto">
        <el-main class="head" >
          <el-row class="demo-avatar demo-basic">
            <el-col :span="1">
              <div class="sub-title"></div>
              <div class="demo-basic--circle">
                <div class="block"><el-avatar :size="50" :src="friend.pic1" style="cursor: pointer"></el-avatar></div>
                <div class="block" v-for="size in sizeList" :key="size">
                  <el-avatar :size="size" :src="circleUrl"></el-avatar>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <el-main class="name" v-model="follow">
          <span>{{friend.message}}</span>
           <span> <el-button type="warning "  size="mini" @click="followa(friend.message,friend.cfId)">关注</el-button></span>
        </el-main>
        <el-main class="time" >{{friend.commentDate}}</el-main>
      </el-main>
      <!--评论内容-->
      <el-main class="content">
        {{friend.comment}}
      </el-main>

      <!--点赞和收藏-->
      <el-main class="button">
        <el-badge  class="item">
          <el-button size="small" class="el-icon-s-comment" @click="addComment(friend.cfId)" ></el-button>
        </el-badge>
        &nbsp;&nbsp;&nbsp;
        <el-badge :value="friend.zanNums" class="item">
          <el-button size="small" class="el-icon-thumb"@click="addZan(friend.cfId,index)":disabled="cindex == index && able"></el-button>
        </el-badge>
        <!--<el-main></el-main>-->
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </el-main>

      <!--查看评论-->
      <el-main >
        <el-main class="remark">
          <el-collapse   accordion @change="findAllRemarkByCfId(friend.cfId)">
              <el-collapse-item title="点击查看评论" >
                <el-main v-for="(re,index) in remarkList" :key="index">
                  <el-main class="head" >
                    <el-row class="demo-avatar demo-basic">
                      <el-col :span="1">
                        <div class="sub-title"></div>
                        <div class="demo-basic--circle">
                          <div class="block"><el-avatar :size="50" :src="re.pic1" style="cursor: pointer"></el-avatar></div>
                          <div class="block" v-for="size in sizeList" :key="size">
                            <el-avatar :size="size" :src="circleUrl"></el-avatar>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-main>
                    <el-main class="remarkName">{{re.remarkUser}}:</el-main>
                    <el-main class="remarkDesc">{{re.commentDesc}}</el-main>
                    <el-main class="date">{{re.remarkDate}}</el-main>
                </el-main>
              </el-collapse-item>
          </el-collapse>
        </el-main>
      </el-main>

    </el-main>
  </el-main>

</template>

<script>

  import axios from 'axios'
    export default {
        name: "new",
      data(){
        return{
          sizeList:[],
          circlefriendList:[],
          remarkList:[],
          remark:{
            commentDesc:'',
            cfId:'',
            uid:'',
            remarkDate:'',
            remarkUser:''
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
            followUser:'',
            cid:''
          },
          able:false,
          cindex: -1
        }
      },
      methods:{
        followa:function(user,id){
          this.follow.uid = this.user.id
          this.follow.followUser = user
          this.follow.cid = id
          console.log(this.follow)
          axios.post("http://localhost:7000/s-circle of friend/circleFriend/follow",this.follow).then(res=>{
            if (res.data.code == 200){
              alert(res.data.message)
              location.reload()
            }
            if (res.data.code == 201){
              alert(res.data.message)
            }
            if (res.data.code == 202){
              alert(res.data.message)
            }
          })
        },
        findUserById:function () {
          axios.post("http://localhost:7000/s-circle of friend/circleFriend/findUserById").then(res=>{
            if (res.data.code==200){
              this.user = res.data.data
              this.remark.uid = this.user.id
              this.remark.remarkUser = this.user.message
            }
          })
        },
        findAllRemarkByCfId:function(id){
          console.log(id)
          axios.get("http://localhost:7000/s-circle of friend/circleFriend/findAllRemarkByCfId?cfId="+ id).then(res=>{
            if (res.data.code == 200){
              this.remarkList = res.data.data
              console.log(this.remarkList)
            }
          })
        },
        setNowTimes(){
          let myDate = new Date();
          let yy = myDate.getFullYear();
          let mm = myDate.getMonth()+1;
          let dd = String(myDate.getDate()<10?'0'+ myDate.getDate(): myDate.getDate()) ;
          this.nowTimes = yy + "-" + mm + "-" + dd;
          this.remark.remarkDate = this.nowTimes
        },
        addZan:function(id,i){
          axios.post("http://localhost:7000/s-circle of friend/circleFriend/addZanNums?cfId="+id ).then(res=>{
            if (res.data.code == 200) {
              this.findAllByNew()
              this.$message({
                message: '点赞成功',
                type: 'success'
              });
              this.able = !this.able
              this.cindex = i

            }
            if (res.data.code == 201){
              alert(res.data.message)
            }
          })
        },
        addComment:function(cfId){
            this.$prompt('请输入评论', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,100}$/,
              inputErrorMessage: '不能为空',
            }).then(({ value }) => {
              this.setNowTimes()
              this.findUserById()
              this.remark.commentDesc = value
              this.remark.cfId = cfId
                axios.post("http://localhost:7000/s-circle of friend/circleFriend/insertRemark",this.remark).then(res=>{
                  if (res.data.code == 200){
                    this.$message({
                      type: 'success',
                      message: '发表评论成功 ',
                    });
                  }
                  if (res.data.code == 201){
                    alert(res.data.message)
                  }
                })
            })
        },
        findAllByNew:function(){
          axios.get("http://localhost:7000/s-circle of friend/circleFriend/circleFriendFindAllByNew").then(res=>{
            if (res.data.code==200){
              console.log(res.data.data)
              this.circlefriendList = res.data.data
            }
          })
        },
      },
      mounted(){
        this.findAllByNew()
        this.findUserById()
      }
    }
</script>

<style scoped>

  .remarkDesc{
    float: left;
  }
  .remarkName{
    float: left;
  }
  .main{
    padding: 0;
    width:100%;
    height:100%
  }

  .first-auto{
    padding:0;
    height:auto;
    overflow: hidden;
    /*border:1px solid red;*/
    width: 100%;
  }

  .head{
    margin:0;
    padding:0;
    width:9%;
    float: left;
    /*margin-top: 375px;*/
    /*margin-left: 350px;*/
  }

  .name{
    overflow: hidden;
    float: left;
    margin:0;
    text-align: left;
    padding:0;
    width:78%;
    height:50px;
    line-height: 50px;
    /*border:1px solid red;*/
    color: black;
    /*position: relative;*/
    /*margin-left: -760px;*/
    /*top: -40px;*/
    font-size:15px;
  }

  .time{
    padding:0;
    overflow: hidden;
    height:50px;
    line-height: 50px;
    margin:0;
    /*border:1px solid red;*/
    width:12%;
    /*border:1px solid red;*/
    /*margin-top: -81.25px;*/
    /*margin-right: 112.5px;*/
    /*position: relative;*/
    color: black;
  }

  .content{
    padding:0;
    /*border:1px solid red;*/
    /* position: absolute;*/
    width: 100%;
    /*top: 450px;*/
    /*margin-left: 262.5px;*/
    text-align: center;
    color: black;
    height:50px;
    line-height: 50px;
  }
  .button{
    /*border:1px solid red;*/
    text-align: right;
    padding:0;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    overflow: hidden;
    /*margin-bottom: 10px;*/
    /*height:60px;*/
    /*line-height: 60px;*/
    /*height:30px;*/
    /*position: absolute;*/
    /*margin-left: 912px;*/
    /*margin-top: 65px;*/
  }

  .item{
    padding:0
  }


  .remark{
    padding:0;
    /*border:1px solid red;*/
    /*text-align: center;*/
    /*position: absolute;*/
    /*margin-left: 350px;*/
    /*margin-top: 100px;*/
  }
</style>
