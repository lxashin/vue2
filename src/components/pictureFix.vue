<template>
  <div class="pictureFix">
      <div class="fix">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" text-color="#000" active-text-color="#06f">
              <el-menu-item index="1" @click="news">最新图片</el-menu-item>
  <el-menu-item index="2" @click="hots">最热图片</el-menu-item>
  <el-submenu index="3">
    <template slot="title">图片分类</template>
    <el-menu-item index="3-1" @click="yx">一线现场</el-menu-item>
    <el-menu-item index="3-2" @click="xc">抗疫宣传</el-menu-item>
    <el-menu-item index="3-3" @click="mh">抗疫漫画</el-menu-item>
  </el-submenu>
            </el-menu>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex:'1'
    }
  },
  methods: {
      news(){
          this.$bus.$emit('news')
      },
      hots(){
          this.$bus.$emit('hots')
      },
      yx(){
          this.$bus.$emit('yx') 
      },
      xc(){
          this.$bus.$emit('xc')
      },
      mh(){
          this.$bus.$emit('mh')
      }
  },
}
</script>

<style>
.fix{
    width: 200px;
    height: 200px;
    /* border: 2px solid #ccc; */
    background-color: #fff;
}
</style>