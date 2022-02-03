<template>
  <div class="fix">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" text-color="#000" active-text-color="#06f">
              <el-menu-item index="1"><slot name="first"></slot></el-menu-item>
  <el-menu-item index="2"><slot name="second"></slot></el-menu-item>
  <el-menu-item index="3"><slot name="third"></slot></el-menu-item>
              </el-menu>
  </div>

</template>

<script>
export default {
  data() {
    return {
      activeIndex:'1'
    }
  },
}
</script>

<style>
.fix{
    width: 200px;
    height: 200px;
    border: 2px solid #ccc;
    background-color: #fff;
}
</style>