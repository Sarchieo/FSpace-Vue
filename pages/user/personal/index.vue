<template>
  <div>
    <a-layout>
    
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../../../components/fspace-ui/header/header";
import FSpaceFooter from "../../../components/fspace-ui/footer";

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
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";

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