<template>
  <div>
    <a-layout>
      <f-space-header type="register"></f-space-header>
      <div class="register-box">
        <div class="from-box">
          <p>用户注册</p>
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item
              v-bind="formItemLayout"
              label="手机号"
              has-feedback
            >
              <a-input
                v-decorator="[
                  'phone',
                  {
                    rules: [ {
                      validator: validatePhone,
                    }],
                  }
                ]"
                id="validating"
                placeholder="请输入您的手机号码"
              >
              </a-input>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="设置密码">
              <a-input
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
            <a-form-item v-bind="formItemLayout" label="再次设置密码">
              <a-input
                v-decorator="[
                  'password2',
                  {
                    rules: [{
                      validator: validatePwd2,
                    }],
                  }
                ]"
                type="password"
                placeholder="请再次输入密码"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="短信验证码">
              <a-row :gutter="8">
                <a-col :span="14">
                  <a-input
                    v-decorator="[
                      'smsCode',
                      {rules: [{ required: true, message: '请填写短信验证码', min:6 }]}
                    ]"
                  />
                </a-col>
                <a-col :span="4">
                  <a-button class="captcha" :disabled='!sendAuthCode' :loading="sendAuthCodeLoading" @click='getAuthCode'> {{sendAuthCodeText}} </a-button>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
              <a-button type="primary" html-type="submit" class="register-btn">注册</a-button>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
              <a-checkbox v-decorator="['agreement', {valuePropName: 'checked'}]">
                注册账号即表示您已阅读并同意
                <a href>用户服务协议</a> 和
                <a href>用户隐私协议</a>
              </a-checkbox>
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
      sendAuthCode: false, // 控制验证码按钮
      sendAuthCodeText: '获取验证码',
      sendAuthCodeLoading: false,
      auth_time: 60,
      isSubmitFrom: false,
      confirmDirty: false,
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
      }
    };
  },
  mounted() {
    this.vueTest()
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // 提交表单
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    validatePhone(rule, value, callback) {
      const form = this.form;
      if (value && value.length === 11) {
        // 调用后台接口, 验证手机是否允许注册
        setTimeout(() => {
          if(value === '17621503668'){
            callback('手机号码已注册')
            this.sendAuthCode = false
          } else {
            this.sendAuthCode = true
            callback()
          }
        },1500)
      } else {
        this.sendAuthCode = false
        callback('请输入手机正确的手机号码');
      }
    },
    validatePwd(rule, value, callback) {
      const form = this.form;
      if (value && value.length > 5) {
        callback();
      } else {
        callback("请设置密码");
      }
    },
    validatePwd2(rule, value, callback) {
      const form = this.form;
      if (value && value === form.getFieldValue("password")) {
        callback();
      } else {
        callback('密码不一致, 请重新输入');
      }
    },
    getAuthCode() {
      this.sendAuthCodeText = '请稍后'
      this.sendAuthCodeLoading = true
      // 发送验证码
      setTimeout(()=> {
        this.auth_time = 60;
        this.$message.success('短信发送成功');
        let auth_timetimer =  setInterval(()=>{
          this.sendAuthCodeLoading = false
          this.sendAuthCode = false;
          this.auth_time--;
          this.sendAuthCodeText = this.auth_time + 's'
          if(this.auth_time<=0){
            this.sendAuthCode = true;
            this.sendAuthCodeText = '获取验证码'
            clearInterval(auth_timetimer);
          }
        }, 1000);
      },1500)
    },
    vueTest() {
      this.$store.dispatch('setUser', {
        userName: '11111',
        userPhone: '22222'
      })
      console.log(this.$store.state.user)
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.register-box {
  .container-size(block, 1190px, 734px, 20px auto, 0px);
  background: #ffffff;
}
.from-box {
  .container-size(block, 700px, 734px, 0 auto, 0px);
}
.from-box p {
  .p-size(50px, 50px, 18px, center,0px, #000000);
}
.ant-input {
  border: 1px solid rgb(238, 238, 238);
  border-radius: 0;
}
.register-btn {
  .button-size(390px, 45px, 45px, 18px, 0px, 5px);
  .button-color(1px solid transparent, #ed2f26, #ffffff);
}
.register-btn:hover {
  opacity: 0.8;
}
.captcha {
  .button-size(115px, 40px, 40px, 14px, 0px, 5px);
  .button-color(1px solid transparent, #ed2f26, #ffffff);
  .button-disabled(#D3D3D3, #ffffff)
}
.captcha:hover {
  opacity: 0.8;
}
</style>