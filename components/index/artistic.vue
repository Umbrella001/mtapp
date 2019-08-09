<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: [{
        all: [{
          type:"景点",
          child:[{
            title:"长隆世界",
            img: "https://p1.meituan.net/wedding/8d26f93de654d433b17774e60a1fc5bd1028431.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c",
            pos: "好玩五星级体验AAA",
            price: 688
          }]
        }],
        part: [{
          type:"美食",
          child:[{
            title:"重庆火锅",
            img: "https://p1.meituan.net/wedding/8d26f93de654d433b17774e60a1fc5bd1028431.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c",
            pos: "麻辣劲爽，回头客",
            price: 246
          }]
        }],
        spa: [{
          type:"丽人",
          child:[{
            title:"LV宝宝",
            img: "https://p1.meituan.net/wedding/8d26f93de654d433b17774e60a1fc5bd1028431.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c",
            pos: "好看好玩体验一下",
            price: 188
          }]
        }],
        movie: [{
          type:"电影",
          child:[{
            title:"烈火英雄",
            img: "https://p1.meituan.net/wedding/8d26f93de654d433b17774e60a1fc5bd1028431.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c",
            pos: "热血无敌，中国强大",
            price: 49.9
          }]
        }],
        travel: [{
          type:"旅游",
          child:[{
            title:"刚果盆地",
            img: "https://p1.meituan.net/wedding/8d26f93de654d433b17774e60a1fc5bd1028431.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c",
            pos: "体验非洲盆地生活",
            price: 68
          }]
        }]
      }]
    }
  },
  computed:{
    cur: function(){
      console.log("list",this.list)
    },
  },
  methods:{
    over: function(e){
      try{
        return this.kind = e.target.attributes[0].textContent;
      }catch(e){
        console.log(e);
      }
      
    }
  }
  // computed: {
  //   cur: function () {
  //     return this.list[this.kind]
  //   }
  // },
  // async mounted(){
  //   let self=this;
  //   let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
  //     params:{
  //       keyword:'景点',
  //       city:self.$store.state.geo.position.city
  //     }
  //   })
  //   if(status===200&&count>0){
  //     let r= pois.filter(item=>item.photos.length).map(item=>{
  //       return {
  //         title:item.name,
  //         pos:item.type.split(';')[0],
  //         price:item.biz_ext.cost||'暂无',
  //         img:item.photos[0].url,
  //         url:'//abc.com'
  //       }
  //     })
  //     self.list[self.kind]=r.slice(0,9)
  //   }else{
  //     self.list[self.kind]=[]
  //   }
  // },
  // methods: {
  //   over: async function (e) {
  //     let dom = e.target
  //     let tag = dom.tagName.toLowerCase()
  //     let self = this
  //     if (tag === 'dd') {
  //       this.kind = dom.getAttribute('kind')
  //       let keyword = dom.getAttribute('keyword')
  //       let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
  //         params:{
  //           keyword,
  //           city:self.$store.state.geo.position.city
  //         }
  //       })
  //       if(status===200&&count>0){
  //         let r= pois.filter(item=>item.photos.length).map(item=>{
  //           return {
  //             title:item.name,
  //             pos:item.type.split(';')[0],
  //             price:item.biz_ext.cost||'暂无',
  //             img:item.photos[0].url,
  //             url:'//abc.com'
  //           }
  //         })
  //         self.list[self.kind]=r.slice(0,9)
  //       }else{
  //         self.list[self.kind]=[]
  //       }
  //     }
  //   }
  // },

}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
