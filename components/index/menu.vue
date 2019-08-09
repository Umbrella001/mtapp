<template>
    <div class="m-menu">
        <!-- 全部分类类型部分 -->
        <dl 
        class="nav" 
        @mouseleave="mouseleave">
            <dt>全部分类</dt>
            <dd 
            v-for="(item,index) in menu" 
            :key="index"
            @mouseenter="enter">
                <i :class="item.type"/>{{item.name}}<span class="arrow"></span>
            </dd>
        </dl>
        <!-- 制定分类弹出部分 -->
        <div 
        class="detail" 
        v-if="kind"
        @mouseenter="sover"
        @mouseleave="sout">
            <template v-for="(item,index) in curdetail.child">
                <h4 :key="index">{{ item.title }}</h4>
                <span v-for="v in item.child" :key="v">{{ v }}</span>
            </template> 
        </div> 
    </div>    
</template>
<script>
export default {
    data(){
        return{
            kind:'',
            menu:[{
                type:'food',
                name:'美食',
                child:[{
                    title:'美食',
                    child:['代金券','甜品饮品','火锅','海底捞']
                }]
            },{
                type:'takeout',
                name:'外卖',
                child:[{
                    title:'外卖商铺',
                    child:['美团','饿了吗','火锅','海底捞']
                }]
            },{
                type:'hotel',
                name:'酒店',
                child:[{
                    title:'五星级酒店',
                    child:['维也纳','富华','七日酒店','海底捞']
                }]
            },{
                type:'twohand',
                name:'二手闲置',
                child:[{
                    title:'二手闲置',
                    child:['手机','相机单反','火锅','海底捞']
                }]
            },{
                type:'movie',
                name:'电影院',
                child:[{
                    title:'电影院',
                    child:['妙言','领情','火锅','哪吒']
                }]
            },]
        }
    },
    computed:{
        curdetail:function(){
            return this.menu.filter((item) => item.type===this.kind)[0]
        }
    },
    methods:{
        mouseleave:function(){
            let self = this;
            self._timer = setTimeout(function(){
                self.kind = ''
            },100)
        },
        enter:function(e){
            this.kind = e.target.querySelector('i').className;
        },
        sover:function(){
            clearTimeout(this._timer);
        },
        sout:function(){
            this.kind = ''
        }
    }
}
</script>
<style>

</style>
