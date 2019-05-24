<template>
  <div>
    <a-layout>
      <f-space-header type="register"></f-space-header>

      <div class="register-box">
        <div>
           <a-steps :current="stepNum" class="steps">
            <a-step class="margin-right150">
              <!-- <span slot="title">Finished</span> -->
              <template slot="title">用户注册</template>
              <span slot="description">完善资料</span>
            </a-step>
            <a-step title="提交药店资质" description="上传营业执照、GSP等"  class="margin-right150"/>
            <a-step title="注册完成" description="注册完成" class="float-right"/>
         </a-steps>
        </div>
        <!-- 用户注册 -->
        <div class="from-box" v-if="stepNum === 0">
          <!-- <p>用户注册</p> -->
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item v-bind="formItemLayout" label="手机号" has-feedback>
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
              ></a-input>
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
                  <a-button
                    class="captcha"
                    :disabled="!sendAuthCode"
                    :loading="sendAuthCodeLoading"
                    @click="getAuthCode"
                  >{{sendAuthCodeText}}</a-button>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="药店名称">
              <a-input
                v-decorator="[
                  'storeName',
                  {rules: [{ required: true, message: '请填写营业执照上一致的药店名!' }]}
                ]"
                type="text"
                placeholder="请输入药店名称"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="药店地址">
              <a-cascader
                class="city"
                :options="cascaderData"
                :loadData="loadData"
                placeholder="请选择省市区"
                v-decorator="[
                  'aCode',
                  {rules: [{ required: true, message: '请选择省市区' }]}
                ]"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="收货地址">
              <a-input
                v-decorator="[
                  'address',
                  {rules: [{ required: true, message: '请填写药店详细地址' }]}
                ]"
                type="text"
                placeholder="收货地址需要与营业执照地址保持一致"
              />
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
              <!-- <a-button type="primary" html-type="submit" class="register-btn" >注册</a-button> -->
              <a-button
                type="primary"
                html-type="submit"
                class="register-btn"
                :disabled="!isChecked"
              >下一步</a-button>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
              <a-checkbox
                v-decorator="['agreement', {valuePropName: 'checked'}]"
                :checked="isChecked"
                @change="checkedChange"
              >
                注册账号即表示您已阅读并同意
                <a href="javascript:;" @click="isShowService()">服务协议</a> 和
                <a href="javascript:;" @click="isShowPrivacy()">隐私协议</a>
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
        <!-- 提交资质 -->
        <div v-if="stepNum === 1">
          <p class="tip">温馨提示：为确保您药店认证通过，请填写药店名称、 药店地址时请保持与《营业执照》一致</p>
          <div class="upload-box">
            <h2 class="certificate-title">药店资质</h2>
           
            <a-form-item
              v-bind="formItemLayout"
              class="upload"
              v-for="(item, index) in uploadList"
              :key="index"
            >
              <div @click="setUploadIndex(index)" class="card-box">
                <a-upload
                  :fileList="item.fileList"
                  :headers="headers"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="showUpload"
                  :action="uploadInfo.upUrl"
                  :beforeUpload="beforeUpload"
                  :supportServerRender="true"
                  :remove="remove"
                  @change="handleChange"
                  @preview="handlePreview"
                >
                  <div v-if="item.fileList.length < 1">
                    <a-icon :type="loading ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">{{ item.name }}</div>
                  </div>
                </a-upload>
              </div>
              <p class="upload-p">{{ item.name }}</p>
            </a-form-item>
          </div>
          <a-button @click="completed()" class="complete-btn">完成注册</a-button>
        </div>
      </div>
      <f-space-footer></f-space-footer>
      <f-space-privacy
        v-if="isPrivacy"
        :isPrivacy="isPrivacy"
        @handleCancelPrivacy="handleCancelPrivacy()"
      ></f-space-privacy>
      <f-space-service
        v-if="isService"
        :isService="isService"
        @handleCancelService="handleCancelService()"
      ></f-space-service>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage">
      </a-modal>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceFooter from "../../components/fspace-ui/footer";
import FSpacePrivacy from "../../components/modal/privacy";
import FSpaceService from "../../components/modal/service";
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter,
    FSpacePrivacy,
    FSpaceService
  },
  data() {
    return {
      loading: false, // 图片上传加载条
      stepNum: 1,
      headers: {
        "specify-path": "",
        "specify-filename": ""
      },
      showUpload: {
        showPreviewIcon: true,
        showRemoveIcon: true
      },
      uploadList: [
        {
          fileList: [],
          url: "",
          name: "营业执照",
          message: "请上传营业执照"
        },
        {
          fileList: [],
          url: "",
          name: "药店经营许可证",
          message: "请上传药店经营许可证"
        },
        {
          fileList: [],
          url: "",
          name: "GSP认证",
          message: "请上传GSP认证"
        }
      ],
      uploadInfo: {},
      cascaderData: [],
      previewVisible: false,
      previewImage: "",
      areaMax: 2, // 省市区层级
      isChecked: false,
      isService: false, // 用户服务协议
      isPrivacy: false, // 用户隐私协议
      sendAuthCode: false, // 控制验证码按钮
      sendAuthCodeText: "获取验证码",
      sendAuthCodeLoading: false,
      compid: '',
      uphone: '',
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
    this.form = this.$form.createForm(this);
    this.getNodes();
  },
  methods: {
    async getAuthCode() {
      this.sendAuthCodeText = "请稍后";
      this.sendAuthCodeLoading = true;
      this.fsGeneralMethods
        .request(
          this,
          "userServer",
          "LoginRegistrationModule",
          "obtainVerificationCode",
          {
            type: 2,
            phone: this.form.getFieldValue("phone")
          }
        )
        .then(result => {
          if (result.code == 200) {
            this.auth_time = 60;
            this.$message.success("短信发送成功");
            let auth_timetimer = setInterval(() => {
              this.sendAuthCodeLoading = false;
              this.sendAuthCode = false;
              this.auth_time--;
              this.sendAuthCodeText = this.auth_time + "s";
              if (this.auth_time <= 0) {
                this.sendAuthCode = true;
                this.sendAuthCodeText = "获取验证码";
                clearInterval(auth_timetimer);
              }
            }, 1000);
          }
        });
    },
    async register(values, type) {
      this.fsGeneralMethods
        .request(this, "userServer", "LoginRegistrationModule", "register", {
          phone: values.phone,
          password: values.password,
          password2: values.password2,
          smsCode: values.smsCode,
          type: type,
          storeName: values.storeName,
          addressCode: values.aCode[values.aCode.length - 1],
          address: values.address
        })
        .then(result => {
          if (result.code == 200) {
            this.stepNum = 1;
            this.compid = result.map.compid
            this.getFilePathPrev();
          }
        });
    },
    async loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      this.fsGeneralMethods
        .request(this, "globalServer", "CommonModule", "getChildren", {}, [targetOption.value])
        .then(result => {
          if (result.code == 200) {
            let Items = result.data;
            targetOption.loading = false;
            let arr = Items.map((value, i) => {
              return {
                value: value.areac,
                label: value.arean,
                isLeaf: selectedOptions.length >= this.areaMax ? true : false
              };
            });
            this.$set(targetOption, "children", arr);
          }
        });
    },
    async getNodes() {
      this.fsGeneralMethods
        .request(this, "globalServer", "CommonModule", "getChildren",{}, [0])
        .then(result => {
          if (result.code == 200) {
            let Items = result.data;
            this.cascaderData = Items.map((value, i) => {
              return {
                value: value.areac,
                label: value.arean,
                isLeaf: false
              };
            });
          }
        });
    },
    async getFilePathPrev(compid) {
      this.fsGeneralMethods
        .request(this, "globalServer", "FileInfoModule", "fileServerInfo", {
          compid: this.compid
        })
        .then(result => {
          if (result.code == 200) {
            this.uploadInfo = result.data;
          }
        });
    },
    // 校验地推员
    validateBDPhone(rule, value, callback) {
      let _this = this;
      const form = this.form;
      if (value && value.length == 11) {
        this.fsGeneralMethods
          .request(this, "userServer", "LoginRegistrationModule", "updateStoreCustomer", {
            uphone: this.uphone,
            compid: this.compid
          })
          .then(result => {
            if (result.code == 200) {
              
            } else {
              callback("当前邀请人不正确");
            }
          });
      } else {
        this.sendAuthCode = false;
        callback("请输入手机正确的手机号码");
      }
    },
    validatePhone(rule, value, callback) {
      let _this = this;
      const form = this.form;
      if (value && value.length == 11) {
        this.fsGeneralMethods
          .request(this, "userServer", "LoginRegistrationModule", "checkPhoneExist", {
            phone: value
          })
          .then(result => {
            if (result.code == 200) {
              this.sendAuthCode = true;
              callback();
            } else {
              this.sendAuthCode = false;
              callback("手机号码已注册");
            }
          });
      } else {
        this.sendAuthCode = false;
        callback("请输入手机正确的手机号码");
      }
    },
    // 设置上传路片index
    setUploadIndex(index) {
      this.headers["specify-filename"] = index + ".jpg";
      this.headers["specify-path"] = this.uploadInfo.companyFilePath;
      this.uploadIndex = index;
    },
    // 用户协议
    checkedChange(val) {
      this.isChecked = !this.isChecked;
    },
    // 表单验证
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.register(values, 3);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    beforeUpload(file) {
      file.uid = this.uploadIndex;
    },
    completed() {
      this.fsGeneralMethods.request(this, "userServer", "StoreManageModule", "updateStoreCustomer", {
            uphone: this.uphone,
            compid: this.compid
          })
          .then(result => {
            if (result.code == 200) {
              if(!result.data) {
                this.$message.error(result.message)
              }
              this.$router.push({
                path: '/user/login'
              })
            } else {
              this.$message.error(result.message)
            }
          });
    },
    remove(file) {
      this.uploadList[file.uid].fileList = [];
      this.uploadList[file.uid].url = "";
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handleChange({ file, fileList, event }) {
      if (file && file.response) {
        this.uploadList[this.uploadIndex].url = file.response.data[0].httpUrl;
      }
      fileList.uid = this.uploadIndex;
      this.uploadList[this.uploadIndex].fileList = fileList;
    },
    isShowPrivacy() {
      this.isPrivacy = true;
    },
    isShowService() {
      this.isService = true;
    },
    handleCancelPrivacy() {
      this.isPrivacy = false;
    },
    handleCancelService() {
      this.isService = false;
    },
    validatePwd(rule, value, callback) {
      const form = this.form;
      if (value && value.length > 5 && value.length <= 19) {
        callback();
      } else {
        callback("请输入正确的密码, 要求6-18位大小写字母数字加字符组合");
      }
    },
    validatePwd2(rule, value, callback) {
      const form = this.form;
      if (value && value == form.getFieldValue("password")) {
        callback();
      } else {
        callback("密码不一致, 请重新输入");
      }
    },
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
  // padding-top: 10%;
}
.from-box p {
  .p-size(50px, 50px, 18px, center, 0px, #000000);
}
.ant-input {
  border: 1px solid rgb(238, 238, 238);
  border-radius: 0px !important;
}
.register-btn {
  .button-size(390px, 45px, 45px, 18px, 0px, 5px);
  .button-color(1px solid transparent, #ed2f26, #ffffff);
  .button-disabled(#d3d3d3, #ffffff);
}
.register-btn:hover {
  opacity: 0.8;
}
.captcha {
  .button-size(115px, 40px, 40px, 14px, 0px, 5px);
  .button-color(1px solid transparent, #ed2f26, #ffffff);
  .button-disabled(#d3d3d3, #ffffff);
}
.captcha:hover {
  opacity: 0.8;
}
.steps {
  .container-size(block, 800px,80px, 30px auto, 0px);
  // padding: 10px 80px;
}
.margin-right150{
  margin-right: 198px!important;
}
.float-right {
  float: right;
}
.city{
  width: 392px;
  border: 1px solid #e0e0e0;
}
.ant-input {
  border: 1px solid #e0e0e0;
  border-radius: 0px !important;
}
.tip{
  .p-size(50px, 50px, 18px, left, 195px, #000000);
}
.certificate-title{
   .p-size(50px, 50px, 18px, left, 0px, #333333);
   margin-bottom: 30px;
}
.upload-box{
  .container-size(block, 800px,260px, 30px auto, 0px);
}
.upload {
  display: inline-block;
  width: 150px;
  height: 150px;
  margin-right: 100px;
}
.upload-p{
  text-align: center;
}
.complete-btn{
   .button-display(block, 15px auto 0 auto);
   .button-size(120px, 48px, 48px, 18px, 0px, 5px);
   .button-color(1px solid transparent, #ed3025, #ffffff);
}
</style>