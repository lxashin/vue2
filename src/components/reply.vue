<template>
  <div class="reply">
      <el-dialog
    width="500px"
      :visible.sync="dialog2.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <div class="top">
            <input type="text" placeholder="回复..." v-model="replyMessage">
            <el-button type="primary" size="small" @click="reply">回复</el-button>
        </div>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'Reply',
    props:{
        dialog2:Object,
        id:Number
    },
    data() {
      return {
        replyMessage:''
      }
    },
    methods: {
      getReply(){
         this.$axios({
          method:'post',
          url:'article/reply/',
          params: { comment_id: this.id, reply: this.replyMessage },
      }).then(()=>{
        
      })
      },
      reply(){
        this.getReply()
        this.dialog2.show=false
        this.$bus.$emit('updateComment')
      }
    },
   
}
</script>

<style>

</style>