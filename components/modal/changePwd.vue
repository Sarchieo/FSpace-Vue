<template>
  <a-modal title="修改密码" v-model="visible" :footer="null" @cancel="handleCancel">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="输入旧密码">
        <a-input
          v-decorator="[
            'oldPassword',
            {
              rules: [{
                required: true,
                validator: validatePwd,
              }],
            }
          ]"
          type="password"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="设置新密码">
        <a-input
          v-decorator="[
            'newPassword',
            {rules: [{ required: true, message: '请输入新密码', min:6 }]}           
          ]"
          type="password"
          placeholder="请再次输入密码"
        />
      </a-form-item>
       <a-form-item v-bind="formItemLayout" label="再次设置新密码">
        <a-input
          v-decorator="[
            'newPassword2',
             {
              rules: [{
                required: true,
                validator: validatePwd2,
              }],
            }
            
          ]"
          type="password"
          placeholder="请再次输入密码"
        />
      </a-form-item>
       <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit" class="register-btn" block>提交修改</a-button>
          
        </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: "f-space-modal-pwd",
  props: ["visible"],
  data() {
    return {
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          debugger
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

