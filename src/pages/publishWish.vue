<template>
  <div class="publishWish">
       <el-dialog
    width="500px"
    title='发布心愿'
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
     <el-form label-width="80px">
  <el-form-item label="内容:">
    <el-input v-model="content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即发布</el-button>
    <el-button @click="reset">取消</el-button>
  </el-form-item>
</el-form>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:'PublishWish',
    data() {
        return {
           content:''
        }
    },
    props:{
        dialog:Object
    },
    methods: {
      onSubmit(){
        this.$axios({
          method:'post',
          url:'hope/hope/',
          params:{content:this.content}
        }).then(()=>{
          this.$message({
            message:'发布成功',
            type:'success'
          })
          this.content = ''
        this.dialog.show = false
        this.$bus.$emit('updateWish')
        })
      },
      reset(){
        this.content = ''
        this.dialog.show = false

      },
    }
    
}
</script>

<style>
.el-dialog__header{
    height: 20px;
    line-height: 20px;
    text-align: left;
    color:#000;
    font-weight: 700;
}
</style>