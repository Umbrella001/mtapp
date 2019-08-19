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
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <!-- 登录注册验证表单结构 -->
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <!-- 协议按钮 -->
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <a href="http://www.meituan.com/about/terms" class="f1" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import CryptoJS from "crypto-js";
export default {
  layout: "blank",
  data() {
    return {
      statusMsg: "",
      error: "",
      ruleForm: {
        name: "",
        email: "",
        code: "",
        pwd: "",
        cpwd: ""
      },
      rules: {
        name: [
          {
            require: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            require: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            require: true,
            message: "创建密码",
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            require: true,
            message: "确认密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error("两次输入的密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * sendMsg发送验证码
     * 使用elementUI提供的validateField拿到用户名和邮箱输入错误时的提示信息
     * 当namePass和emailPass都没有报错信息时,此时进行axios执行发送邮件的操作
     * 注意点：
     * ① 这里直接可以使用this.$axios引用而不需要每个实例的vue都import的原因在
     *    于nuxt.config.js中通过modules进行全局导出了axios
     * ② 注意对于用户名中有中文的话,要使用encodeURIComponent对中文转码
     */
    sendMsg: function() {
      const self = this;
      let namePass;
      let emailPass;
      if (self.timerid) {
        return false;
      }
      this.$refs["ruleForm"].validateField("name", valid => {
        namePass = valid;
      });
      self.statusMsg = "";
      if (namePass) {
        return false;
      }
      this.$refs["ruleForm"].validateField("email", valid => {
        emailPass = valid;
      });
      if (!namePass && !emailPass) {
        self.$axios
          .post("/users/verify", {
            username: window.encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60;
              self.statusMsg = `验证码已发送,剩余${count--}秒`;
              self.timerid = setInterval(function() {
                self.statusMsg = `验证码已发送,剩余${count--}秒`;
                if (count < 0) {
                  self.statusMsg = "";
                  clearInterval(self.timerid);
                }
              }, 1000);
            } else {
              self.statusMsg = data.msg;
            }
          });
      }
    },
    /**
     * register注册登录
     * 通过element的validate拿到valid，如果改值为true则说明表单校验通过,进而进行跳转登录操作
     * 注意点：
     * ① 用户密码要使用crypto-js这个库进行MD5加密,crypto-js参考文档：https://www.npmjs.com/package/crypto-js
     * ② 注意要定时清空error的值
     */
    register: function() {
      let self = this;
      this.$refs["ruleForm"].validate( (valid) => {
        if (valid) {
          self.$axios.post("/users/signup", {
              username: window.encodeURIComponent(self.ruleForm.name),
              password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.code
            }).then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = "/login";
                } else {
                  self.error = data.msg;
                }
              } else {
                self.error = `服务器出错，错误码：${status}`;
              }
              setTimeout(function() {
                self.error = "";
              }, 1800);
            });
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
