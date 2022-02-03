<template>
  <div class="logFund">
    <el-dialog
      width="500px"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <div class="top">
          <input type="text" placeholder="写评论..." v-model="commentMessage" />
          <el-button type="primary" size="small" @click="comment"
            >评论</el-button
          >
        </div>
        <div class="person" v-for="pl in pinglun" :key="pl.id">
          <div class="content">
            <img :src="baseUrl+pl.user_profile" alt="" />
            <span>{{pl.username}}:</span>
            <span>{{pl.comment}}</span>
            <div class="icon" @click="reply(pl.id)">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <div class="time">{{dateFormat(pl.comment_time)}}</div>
          </div>

          <div class="answer" v-for="reply in pl.reply" :key="reply.id">
            <div class="shu"></div>
            <div class="content">
              <img :src="baseUrl+reply.user_profile" alt="" />
              <span>{{reply.username}}:</span>
              <span>{{reply.reply}}</span>
              <!-- <div class="icon"><i class="el-icon-chat-dot-round"></i></div> -->
              <div class="time">{{dateFormat(reply.reply_time)}}</div>
            </div>
            <div class="btn">
             <button class="more" v-show="isMore" @click="moreData(pl.id)">查看更多 <i class="el-icon-arrow-down"></i></button>
          </div>
          </div>
          
         
        </div>
        
      </div>
    </el-dialog>
    <Reply :dialog2="dialog2" :id='replyId'></Reply>
  </div>
</template>

<script>
import Reply from "../components/reply.vue";
export default {
  components: { Reply },
  data() {
    return {
      dialog2: { show: false },
      pinglun: [],
      commentMessage: "",
      baseUrl:'http://192.168.1.103:8000',
      replyId:0,
    isMore:true
      // isLoading:false //默认没有在加载数据

    };
  },
  props: {
    dialog: Object,
    id: Number,
  },
  methods: {
    dateFormat(time){
      var date = new Date(time)
      var year = date.getFullYear()
      var month = date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1
      var day = date.getDate()+1<10?'0'+(date.getDate()+1):date.getDate()+1
      var hours = date.getHours()<10?'0'+(date.getHours()+1):date.getHours()+1
      var minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    },
    reply(id) {
      this.dialog2.show = true;
     this.replyId = id
    },
    //获取前三条评论
    getPingLun() {
      this.$axios.get(`article/comment/${this.id}/`).then((res) => {
        this.pinglun = res.data.data;
        
      });
    },
    moreData(id){
      this.$axios.get(`article/reply/${id}/`).then((res)=>{
        this.pinglun[0].reply = this.pinglun[0].reply.concat(res.data.data)
        console.log(this.pinglun[0].reply)
      })
      this.isMore = false
    },

    //发布评论
    comment() {
      this.$axios({
        method: "post",
        url: "article/comment/",
        params: { article_id: this.id, comment: this.commentMessage },
      }).then(() => {
        this.getPingLun();
        this.commentMessage=''
      });
    },

  },
  

  created() {
    this.getPingLun();
    this.$bus.$on('updateComment',()=>{
      console.log(1111)
      this.getPingLun()
    })
  },

  //监听id的变化，发请求
  watch:{
    id(){
      this.getPingLun();
    }

  }
};
</script>

<style lang="less">
.el-dialog__wrapper {
  position: fixed;
  top: 65px;
  right: -47px;
}
.form {
  .top {
    height: 50px;
    line-height: 50px;
    input {
      width: 300px;
      height: 26px;
      margin-right: 20px;
    }
  }
  .person {
    position: relative;

    margin-top: 20px;
    img {
      width: 60px;
      height: 60px;
      padding-right: 10px;
      vertical-align: middle;
    }
    .content {
      max-height: 100px;
      line-height: 100px;
      margin-left: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      .icon {
        position: absolute;
        width: 10px;
        height: 10px;
        top: -3px;
        right: 10px;
        font-size: 20px;
      }
      .time {
        height: 20px;
        line-height: 20px;
        margin-top: -27px;
        font-size: 12px;
        color: #ccc;
        text-align: left;
        padding-left: 67px;
      }
    }
    .answer {
      margin-left: 62px;
      position: relative;
      display: flex;
      margin-top: 20px;
      .shu {
        width: 2px;
        height: 50px;
        border: 2px solid #ccc;
        background-color: #ccc;
      }
      .content {
        max-height: 100px;
        line-height: 100px;
        margin-top: -35px;
        margin-left: 10px;
        padding-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .icon {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -20px;
          right: 10px;
          font-size: 20px;
        }
        .time {
          height: 20px;
          line-height: 20px;
          margin-top: -35px;
          font-size: 12px;
          color: #ccc;
          text-align: left;
        }
        
      }
      .btn{
          height: 22px;
          line-height: 18px;
          margin-top: 78px;
          margin-left: -99px;
          button{
            border: none;
            color: #175199;
            width: 100%;
          }
        
        }
    }
  }
}
</style>