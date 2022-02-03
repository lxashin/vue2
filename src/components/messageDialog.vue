<template>
   <div class="logFund">
    <el-dialog
    width="300px"
    center
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
    <div v-for="m in message" :key="m.friendRequest_id">
        <div class="message">{{m.username}}请求添加你为好友 <span v-if="m.result==0"><i class="el-icon-check" @click="agree(m.friendRequest_id)"></i> <i class="el-icon-close" @click="disagree(m.friendRequest_id)"></i></span><span  v-if="m.result==2" class="reject">已拒绝</span></div>
       
    </div>
      
      
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:'MessageDialog',
    data() {
        return {
            activeIndex:'1',
            message:[]
        }
    },
    props:{
        dialog:Object
    },
    methods: {
       agree(id){
           this.$axios({
               method:'put',
               url:'user/friendRequest/',
               data:{friendRequest_id:id,result:1}
           }).then(()=>{
               this.dialog.show=false

           })
       },
       disagree(id){
           this.$axios({
               method:'put',
               url:'user/friendRequest/',
               data:{friendRequest_id:id,result:2}
           }).then(()=>{
               this.dialog.show=false
           })
       }
    },
    created() {
        this.$bus.$on('sendMessageData',(data)=>{
            this.message = data
        })
    },
    mounted() {
        console.log(this.message)
    },

}
</script>

<style lang="less" scoped>
.logFund{
     .el-dialog__wrapper{
         position: fixed;
         top: 69px;
         right: -880px;
     }
      
        .message{
            line-height: 45px;
            i:nth-child(1){
                padding-left: 20px;
                padding-right: 15px;
                font-size: 18px;
                color:rgb(103, 194, 58);
            }
            i:nth-child(2){
                color: rgb(166, 169, 173);
                font-size: 18px;
            }
            .reject{
            border: 1px solid #ccc;
    margin-left: 22px;
    color: red;
        }
        }
        
    
}

</style>