<template>

  <div class="page-index">
    <!-- 项目content部分 -->
    <el-row>
      <!-- 项目侧边导航栏 -->
      <el-col :span="5">
        <Menu></Menu>
      </el-col>
      <!-- 项目轮播及图片展示栏 -->
      <el-col :span="19">
        <Life></Life> 
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <artistic></artistic>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Menu from '@/components/index/menu'
import Life from '@/components/index/life'
import Artistic from '@/components/index/artistic'
export default {
  components:{
    Menu,
    Life,
    Artistic
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/index/index.scss'
</style>
