<template>
<!-- 固定默认组件部分 -->
  <el-container class="layout-default">
    <!-- 项目header部分 -->
    <el-header>
      <my-header></my-header>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <!-- 项目footer部分 -->
    <el-footer height="100%">
      <my-footer></my-footer>
    </el-footer>
  </el-container>
</template>

<script>
  import MyHeader from '@/components/public/header/index.vue'
  import MyFooter from '@/components/public/footer/index.vue'
  export default {
    components:{
      MyHeader,
      MyFooter
    }
  }
</script>

<style>
</style>