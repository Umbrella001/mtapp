<template>
    <!-- 字母导航栏 -->
    <div>
        <dl class="m-categroy">
            <dt>按拼音首字母选择：</dt>
            <dd
              v-for="item in list"
              :key="item"
            >
                <a :href="'#city-' + item">{{ item }}</a>
            </dd>
        </dl>
        <!-- 字母城市展示栏 -->
        <dl 
          v-for="item in block" 
          :key="item.title" 
          class="m-categroy-section">
            <dt :id="'city-' + item.title">{{item.title}}</dt>
            <dd>
                <span
                  v-for="c in item.city"
                  :key="c"
                >
                {{ c }}
                </span>
            </dd>
        </dl>
    </div>
</template>
<script>
import pyjs from 'js-pinyin'
export default {
    data(){
        return{
            list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            block: []
        }
    },
    async mounted(){
        let self = this;
        let blocks = [];
        let {status,data:{city}} = await self.$axios.get('/geo/city');
        if(status === 200){
            let cityChar;
            let cityAscll;
            let cityCharAll = {};     
            city.forEach(item => {
                cityChar= pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1);              
                cityAscll = cityChar.charCodeAt(0);
                if(cityAscll >= 97 && cityAscll <= 124){
                    if(!cityCharAll[cityChar]){
                        cityCharAll[cityChar] = []
                    }
                    cityCharAll[cityChar].push(item.name)
                }
            })
            for(let [key,value] of Object.entries(cityCharAll)){
                blocks.push({
                    title: key.toUpperCase(),
                    city: value
                })
            }
            blocks.sort((x,y) => x.title.charCodeAt(0) - y.title.charCodeAt(0));
            self.block = blocks;
        }
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/changeCity/categroy.scss';
</style>