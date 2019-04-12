<template>
  <a-modal title="修改绑定手机" v-model="visible" :footer="null"  @cancel="handleCancel">
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
      <a-form-item v-bind="formItemLayout" label="短信验证码">
        <a-row :gutter="8">
          <a-col :span="14">
            <a-input
              v-decorator="[
                'smsCode',
                {rules: [{ required: true, message: '请填写短信验证码', min:6 }]}
              ]"
            />
            <a-col :span="4">
              <a-button class="captcha" :disabled='!sendAuthCode' :loading="sendAuthCodeLoading" @click='getAuthCode(1)'> {{sendAuthCodeText}} </a-button>
            </a-col>
          </a-col>
        </a-row>
        </a-form-item>
       <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit" class="register-btn" block>下一步</a-button>
        </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: "f-space-modal-phone",
  props: ["visible"],
  data() {
    return {
      sendAuthCode: true, // 控制验证码按钮
      sendAuthCodeText: '获取验证码',
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
    }
  },
  methods: {
    handleOk() {},
    handleCancel() {
      this.$emit('handleCancel')
    },
    validatePhone(rule, value, callback) {
      let _this = this;
      const form = this.form;
      if (value && value.length === 11) {
        // 调用后台接口, 验证手机是否允许注册
        let iRequest = new inf.IRequest();
        iRequest.cls = "LoginRegistrationModule";
        iRequest.method = "checkPhoneExist";
        iRequest.param.json = JSON.stringify({
          phone: value
        })
        this.$refcallback(
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if(result.code === 200) {
              _this.sendAuthCode = true
              callback()
            }else {
              _this.sendAuthCode = false
              callback('手机号码已注册')
            }
          }
        )
      );
      } else {
        this.sendAuthCode = false
        callback('请输入手机正确的手机号码');
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let _this = this;
          let iRequest = new inf.IRequest();
          iRequest.cls = "LoginRegistrationModule";
          iRequest.method = "changeUserInfo";
          iRequest.param.json = JSON.stringify({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            oldPhone: '',
            newPhone: '',
            smsCode: ''
          });
          iRequest.param.token = localStorage.getItem("identification");
          this.$refcallback(
            "userServer",
            iRequest,
            new this.$iceCallback(
              function result(result) {
                if (result.code === 200) {
                  _this.$message.success(result.message)
                  _this.$emit('handleCancel')
                } else {
                  // 文件地址获取失败 .
                  _this.$message.error(result.message)
                }
              },
              function error(error) {
                _this.$message.error(error)
              }
            )
          );
        }
      });
    },
    getAuthCode(type) {
      if(type === 1) {

      }
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
    validatePwd(rule, value, callback) {
      const form = this.form;
      if (value && value.length > 5) {
        callback();
      } else {
        callback("请输入旧密码");
      }
    },
    
    validatePwd2(rule, value, callback) {
      const form = this.form;
      if (value && value === form.getFieldValue("newPassword")) {
        callback();
      } else {
        callback("密码不一致, 请重新输入");
      }
    }
  }
};
</script>
<style>
</style>

