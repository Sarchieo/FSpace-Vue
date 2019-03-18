<template>
  <div>
    <a-layout>
      <f-space-header type="login"></f-space-header>
      <div class="login-box">
        <!-- <div class="right-float"> -->
          <div class="login-input">
            <p class="user-login">用户登录</p>
            <a-form :form="form">
              <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="用户名"
              >
                <a-input
                  v-decorator="[
                    'username',
                    {
                      rules: [ {
                        validator: validateUserName,
                      }],
                    }
                    
                  ]"
                  placeholder="请输入用户名"
                />
              </a-form-item>
              <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="密码"
              >
                <a-input
                  type="password"
                  v-decorator="[
                    '',
                    {
                      rules: [{
                        validator: validatePwd,
                      }],
                    }
                  ]"
                  placeholder="请输入密码"
                />
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="验证码"
              >
                <a-row :gutter="8">
                  <a-col :span="12">
                    <a-input
                      v-decorator="[
                        'captcha',
                        {rules: [{ required: true, message: 'Please input the captcha you got!' }]}
                      ]"
                    />
                  </a-col>
                  <a-col :span="12">
                    <img :src="'http://192.168.1.241:8888/image_verification_code/64F2FFBC64CD46DD1473280790B9D105'">
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
              >
                <a-checkbox
                  style="display: inline-block;"
                  :checked="checkNick"
                  @change="handleChange"
                >记住密码</a-checkbox>
                <a href>忘记密码？</a>
              </a-form-item>
              <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
              >
                <button class="login-btn" @click="check">登录</button>
              </a-form-item>
            </a-form>
            <p class="to-register">还没有账号？立即去
              <nuxt-link to="/user/register">注册</nuxt-link>
            </p>
          </div>
        <!-- </div> -->
      </div>
      <f-space-footer></f-space-footer>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceFooter from "../../components/fspace-ui/footer";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 4 }
};
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter
  },
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this)
    };
  },
  mounted() {
    this.submitFrom;
  },
  methods: {
    submitFrom() {
      this.$store
        .dispatch("login")
        .then(res => {
          // 保存用户信息
          this.$store.commit("SET_USER", 1);
        })
        .catch(err => {
          console.log("登录失败");
        });
    },
    check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info("success");
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    },
    // 获取图形验证码
    getCaptcha() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "UserServerImp";
      iRequest.method = "obtainVerificationCode";
      iRequest.param.json = JSON.stringify({
        type: type
      }) 
      iRequest.param.token = '1234'
      this.$refcallback(
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if(result.code === 200) {
              
            }else {
              
            }
          }
        )
      );
    },
    validateUserName() {},
    validatePwd() {}
  }
};
</script> 
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";

.login-box {
  .container-size(block, 100%, 560px, 0 auto);
  background: #fafafa;
}
// .right-float {
//   .container-size(block, 1190px, 400px, 0 auto);
//   margin-top: 20px;
// }
.login-input {
  float: right;
  .container-size(inline-block, 450px, 450px, 0 auto, 5px);
  background: #ffffff;
  padding: 20px 10px;
}
.user-login {
  height: 50px;
  line-height: 50px;
  text-indent: 12px;
}
.login-btn {
  .button-size(280px, 40px, 40px, 18px, 0px, 5px);
  .button-color(1px solid transparent, rgb(237, 47, 38), #ffffff);
}
.login-btn :hover {
  opacity: 0.8;
}
.register {
  text-align: center;
}
.ant-input {
  border: 1px solid rgb(238, 238, 238);
  border-radius: 0px;
}
.to-register {
  text-align: center;
}
</style>