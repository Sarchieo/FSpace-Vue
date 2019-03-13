<template>
  <div>
    <a-layout>
      <f-space-header type="register"></f-space-header>
      <div class="register-box">
        <div class="from-box">
          <p>用户注册</p>
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item v-bind="formItemLayout" label="手机号">
              <a-input
                v-decorator="[
          'number',
          {
            rules: [{
              type: 'number', message: '输入手机号',
            }, {
              required: true, message: '请填写手机号',
            }]
          }
        ]"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="短信验证码">
              <a-row :gutter="8">
                <a-col :span="14">
                  <a-input
                    v-decorator="[
              'captcha',
              {rules: [{ required: true, message: '请填写短信验证码' }]}
            ]"
                  />
                </a-col>
                <a-col :span="4">
                  <a-button class="captcha">获取验证码</a-button>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="图形验证码">
              <a-input
                v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: '请填写图形验证码',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
                type="text"
                @blur="handleConfirmBlur"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="设置密码">
              <a-input
                v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: '请设置密码',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
                type="password"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="再次设置密码">
              <a-input
                v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: '请再次设置密码',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
                type="password"
                @blur="handleConfirmBlur"
              />
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
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceFooter from "../../components/fspace-ui/footer";
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter
  },
  data() {
    return {
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
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
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          domain => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
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
  .p-size(50px, 50px, 18px, center, #000000);
}
.ant-input {
  border: 1px solid rgb(238, 238, 238);
  border-radius: 0;
}
.register-btn {
  // .button-size(@width;@height;@line-height;@font-size;@padding;@border-radius;); @border:1px solid transparent;@background-color;@color;
  .button-size(390px,45px,45px,18px,0px,5px);
  .button-color(1px solid transparent,#ED2F26,#ffffff);
}
.register-btn:hover {
  background: #ED2F26;
}
.captcha {
  .button-size(100px,40px,40px,14px,0px,5px);
  .button-color(1px solid transparent,#ED2F26,#ffffff);
}
.captcha:hover {
  background: #ED2F26;
  color: #ffffff;
  border: 1px solid transparent;
}
</style>