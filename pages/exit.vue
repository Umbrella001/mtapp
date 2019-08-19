<template>
  <div class="login-exit"></div>
</template>
<script>
/**
 * 使用中间件middleware完成退出的操作
 * 原因：因为用户点退出的时候并不是立即就改变这个页面的状态,此时应该使用中间件完成这个步骤
 * 步骤：用户点击 → 中间件开始 → axios退出路由执行执行开始 → axios退出路由执行结束 → 判断code执行跳转 → 中间件结束
 */
export default {
  layout: "blank",
  middleware: async ctx => {
    let { status, data } = await ctx.$axios.get("/users/exit");
    if (status === 200 && data && data.code === 0) {
      window.location.href = "/";
    }
  }
};
</script>
<style scoped>
</style>