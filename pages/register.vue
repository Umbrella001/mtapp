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
                <!-- 昵称 -->
                <el-form-item 
                  label="昵称" 
                  prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <!-- 邮箱 -->
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
                <!-- 验证码 -->
                <el-form-item 
                  label="验证码" 
                  prop="code">
                  <el-input
                    v-model="ruleForm.code" 
                    maxlength="4"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item 
                  label="密码" 
                  prop="pwd">
                  <el-input
                    v-model="ruleForm.pwd" 
                    type="password"></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item 
                  label="确认密码" 
                  prop="cpwd">
                  <el-input
                    v-model="ruleForm.cpwd" 
                    type="password"></el-input>
                </el-form-item>
                <!-- 协议按钮 -->
                <el-form-item>
                    <el-button 
                      type="primary" 
                      @click="register">同意以下协议并注册</el-button>
                    <div class="error">{{ error }}</div>
                </el-form-item>
                <!-- 协议 -->
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
            },
            rules:{
                name:[{
                    require:true,
                    type:'string',
                    message:'请输入昵称',
                    trigger:'blur'
                }],
                email:[{
                    require:true,
                    type:'email',
                    message:'请输入邮箱',
                    trigger:'blur'
                }],
                pwd:[{
                    require:true,
                    message:'创建密码',
                    trigger:'blur'
                }],
                cpwd:[{
                    require:true,
                    message:'确认密码',
                    trigger:'blur'
                },{
                    validator:(rule,value,callback)=>{
                        if(value===''){
                            callback(new Error('请再次输入密码'));
                        }else if(value!==this.ruleForm.pwd){
                            callback(new Error('两次输入的密码不一致'));
                        }else{
                            callback();
                        }
                    },
                    trigger:'blur'
                }]
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
