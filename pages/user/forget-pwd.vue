<template>
  <div>
    <a-layout>
      <f-space-header type="register"></f-space-header>
      <div class="register-box">
        <div class="forget-box">
          <p class="forget-p">找回密码</p>
           <a-form :form="form" @submit="updataPwd" v-show="!isShowNewPhone">
          <!-- <a-form-item v-bind="formItemLayout" label="手机号" has-feedback>
        <a-input v-model="oldPhone" id="validating"></a-input>
          </a-form-item>-->
          <a-row :gutter="8">
            <a-col :span="24">
              <a-form-item v-bind="formItemLayout" label="手机号码">
                <a-input
                  v-model="oldPhone"
                  v-decorator="[
                  'phone',
                  {
                    rules: [{
                      validator: validatePhone,
                    }],
                  }
                ]"
                  type="text"
                  placeholder="请输入手机号码"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :span="24">
              <a-form-item v-bind="formItemLayout" label="短信验证码">
                <a-input
                  v-model="verification"
                  v-decorator="[
                'smsCode',
                {rules: [{ required: true, message: '请填写短信验证码', min:6 }]}
              ]"
                />
                <a-button
                  :disabled="sendAuthCode"
                  class="captcha"
                  :loading="sendAuthCodeLoading"
                  @click="getAuthCode()"
                >{{sendAuthCodeText}}</a-button>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :span="24">
              <a-form-item v-bind="formItemLayout" label="新登录密码" has-feedback>
                <a-input
                  v-model="newPwd"
                  v-decorator="[
                  'password',
                  {
                    rules: [{
                      validator: validatePwd,
                    }],
                  }
                ]"
                  type="password"
                  placeholder="请输入密码"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit" class="register-btn" block>确定</a-button>
          </a-form-item>
        </a-form>
        </div>
       
      </div>
      <f-space-footer></f-space-footer>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceFooter from "../../components/fspace-ui/footer";
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter
  },
  data() {
    return {
      isPhone: false,
      newPwd: "",
      isDisabled: true,
      oldPhone: "",
      newPhone: "",
      verification: "",
      isShowNewPhone: false,
      sendAuthCode: true, // 控制验证码按钮
      sendAuthCodeText: "获取验证码",
      sendAuthCodeLoading: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      },
      form: this.$form.createForm(this)
    };
  },
  mounted() {},
  methods: {
    updataPwd(e) {
      debugger;
      e.preventDefault();
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "LoginRegistrationModule";
      iRequest.method = "forgetPassword";
      iRequest.param.json = JSON.stringify({
        oldPhone: this.oldPhone,
        smsCode: this.verification,
        newPassword: this.newPwd
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.$message.success(result.message);
            setTimeout(() => {
              _this.$router.push({
                path: "/user/login"
              });
            }, 2000);
          }
        })
      );
    },
    validatePwd(rule, value, callback) {
      const form = this.form;
      if (value && value.length > 5 && value.length <= 19) {
        callback();
      } else {
        callback("请输入正确的密码, 要求6-18位大小写字母数字加字符组合");
      }
    },
    handleOk() {},
    handleCancel() {
      this.$emit("handleCancel");
    },
    // 验证手机号码是否已被注册
    validatePhone(rule, value, callback) {
      let _this = this;
      const form = this.form;
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback("请输入手机正确的手机号码");
      } else {
        this.sendAuthCode = false;
      }
    },
    // 获取手机号的短信验证码
    getAuthCode() {
      debugger;
      this.sendAuthCodeText = "请稍后";
      this.sendAuthCodeLoading = true;
      // 发送验证码
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "LoginRegistrationModule";
      iRequest.method = "obtainVerificationCode";
      iRequest.param.json = JSON.stringify({
        type: 4,
        phone: this.oldPhone
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            debugger;
            _this.auth_time = 60;
            _this.$message.success("短信发送成功");
            let auth_timetimer = setInterval(() => {
              _this.sendAuthCodeLoading = false;
              _this.sendAuthCode = false;
              _this.auth_time--;
              _this.sendAuthCodeText = _this.auth_time + "s";
              if (_this.auth_time <= 0) {
                _this.sendAuthCode = true;
                _this.sendAuthCodeText = "获取验证码";
                clearInterval(auth_timetimer);
              }
            }, 1000);
          }
        })
      );

      // setTimeout(()=> {
      //   this.auth_time = 60;
      //   this.$message.success('短信发送成功');
      //   let auth_timetimer =  setInterval(()=>{
      //     this.sendAuthCodeLoading = false
      //     this.sendAuthCode = false;
      //     this.auth_time--;
      //     this.sendAuthCodeText = this.auth_time + 's'
      //     if(this.auth_time<=0){
      //       this.sendAuthCode = true;
      //       this.sendAuthCodeText = '获取验证码'
      //       clearInterval(auth_timetimer);
      //     }
      //   }, 1000);
      // },1500)
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.ant-input {
  width: 200px !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 0px !important;
  font-size: 14px;
}
.register-btn {
  display: block;
  width: 98px;
  height: 36px;
  margin-left: 0px;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
}
.captcha {
  height: 38px;
  // margin-top: 10px;
  margin-left: 4px;
}
.register-box {
  .container-size(block, 1190px, 734px, 20px auto, 0px);
  background: #ffffff;
  padding-top: 8%;
}
.forget-box{
  .container-size(block, 600px, 600px, 0 auto, 0px);
}
.forget-p{
  .p-size(50px, 50px, 18px, center,0px, #333333);
  font-weight: bold;
}
</style>
