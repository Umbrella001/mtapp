<template>
    <div class="m-nav">
        <ul class="nav">
            <li class="list">
                <nuxt-link to="/my">我的美团</nuxt-link>
                <dl>
                    <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
                    <dd><nuxt-link to="/order">我的收藏</nuxt-link></dd>
                    <dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
                    <dd><nuxt-link to="/order">账户设置</nuxt-link></dd>
                </dl>
            </li>
            <li>
                <nuxt-link to="/order">手机APP</nuxt-link>
            </li>
            <li class="list bd">
                <nuxt-link to="/center">商家中心</nuxt-link>
                <dl>
                    <dd><nuxt-link to="/userCenter">登录商家中心</nuxt-link></dd>
                    <dd><nuxt-link to="/coop">我想合作</nuxt-link></dd>
                    <dd><nuxt-link to="/wap">免费手机开店</nuxt-link></dd>
                    <dd><nuxt-link to="/kaipiao">商家申请开票</nuxt-link></dd>
                </dl>
            </li>
            <li class="list site">
                <nuxt-link to="/site">网站导航</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>

</style>
