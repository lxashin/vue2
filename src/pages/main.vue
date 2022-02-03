<template>
 <el-container>
  <el-header><Header></Header></el-header>
  <el-main><router-view></router-view></el-main>
</el-container>
</template>

<script>
import Header from '../components/Header.vue'
export default {
    name:'Main',
    components:{Header}
    
}
</script>

<style>
 .el-main {
    background-color: #f5f5f5;
    color: #333;
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 160px;
  }
    .el-header {
    background-color: #fff;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
</style>