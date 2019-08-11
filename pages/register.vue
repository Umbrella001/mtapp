<template>
<!-- 登录注册界面 -->
    <div class="page-register">
        <!-- 登录注册头部结构 -->
        <article class="header">
            <header>
                <a href="/" class="site-logo"></a>
                <span class="login">
                    <em class="bold">已有美团帐号？</em>
                    <a href="/login">
                        <el-button type="primary" size="small">
                            登录
                        </el-button>
                    </a>
                    </span>
            </header>
        </article>
        <!-- 登录注册验证表单结构 -->
        <section>
            <el-form 
              :model="ruleForm" 
              :rules="rules" 
              ref="ruleForm" 
              label-width="100px" 
              class="demo-ruleForm">
                <el-form-item 
                  label="昵称" 
                  prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item 
                  label="邮箱" 
                  prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
                  <el-button 
                    size="mini" 
                    round 
                    @click="sendMsg">发送验证码</el-button>
                    <span class="status">{{ statusMsg }}</span>
                </el-form-item>
                <el-form-item 
                  label="邮箱" 
                  prop="code">
                  <el-input
                    v-model="ruleForm.code" 
                    maxlength="4"></el-input>
                </el-form-item>
                <el-form-item 
                  label="密码" 
                  prop="pwd">
                  <el-input
                    v-model="ruleForm.pwd" 
                    type="password"></el-input>
                </el-form-item>
                <el-form-item 
                  label="确认密码" 
                  prop="cpwd">
                  <el-input
                    v-model="ruleForm.cpwd" 
                    type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                      type="primary" 
                      @click="register">同意以下协议并注册</el-button>
                    <div class="error">{{ error }}</div>
                </el-form-item>
                <el-form-item>
                    <a 
                      href="http://www.meituan.com/about/terms" 
                      class="f1"
                      target="_blank">《美团网用户协议》</a>
                </el-form-item>
            </el-form>
        </section> 
    </div>  
</template>
<script>
export default {
    layout: 'blank',
    data(){
        return{
            statusMsg: '',
            error:'',
            ruleForm:{
               name:'',
               email:'',
               code:'',
               pwd:'',
               cpwd:''
            }
        }
    },
    methods:{
        sendMsg:function(){

        },
        register:function(){

        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/register/index.scss";
</style>
