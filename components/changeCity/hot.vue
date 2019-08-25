<template>
  <div class="m-hcity">
    <dl>
      <dd>热门城市：</dd>
      <dt 
        v-for="item in list" 
        :key="item.id"
      >{{item.name === '市辖区'? item.province: item.name}}</dt>
    </dl>
  </div>
</template>
<script>
export default {
    data(){
        return{
            list: []
        }
    },
    async mounted(){
        let self = this;
        let {status,data:{hots}} = await self.$axios.get('/geo/hotCity')
        if(status === 200){
            self.list = hots;
        }
    }
};
</script>
<style lang="scss">
    @import '@/assets/css/changeCity/hot.scss'
</style>