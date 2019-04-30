<template>
  <div class="certificates-box">
    <div class="certificates-content">
      <h2 class="pharmacy-info">药店信息</h2>
      <a-form class="form-box" :form="form" @submit="handleSubmit">
        <a-form-item label="所属药店：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            :disabled="!isEditor"
            v-decorator="[
                'storeName',
                {rules: [{ required: true, message: '请填写营业执照上一致的药店名!' }]}
              ]"
          />
        </a-form-item>
        <a-form-item label="地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-cascader
            class="city"
            :disabled="!isEditor"
            :options="cascaderData" 
            @change="onChange" 
            :loadData="loadData" 
            placeholder="请选择省市区" 
            v-decorator="[
              'aCode',
              {rules: [{ required: true, message: '请选择省市区' }]}
            ]"
          />
        </a-form-item>
        <a-form-item label="药店详细地址：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea
            :disabled="!isEditor"
            placeholder="请填写营业执照上一致的药店地址"
            v-decorator="[
              'address',
              {rules: [{ required: true, message: '请填写药店详细地址' }]}
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button v-if="isEditor" class="save-btn" html-type="submit">保存</a-button>
        </a-form-item>
        <p class="authentication">
          认证状态:
          <a-icon type="profile"/>
          <span>{{ authenticationMessage }}</span>
        </p>
        <div v-if="authenticationStatus > 64">
          <h2 class="certificate-title">药店资质</h2>
          <a-form-item
            v-bind="formItemLayout"
            class="upload"
            v-for="(item, index) in uploadList"
            :key="index"
           
          >
            <div @click="setUploadIndex(index)">
              <a-upload
                :disabled="!isEditor"
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
          </a-form-item>
        </div>
    
      </a-form>
      <ul class="user-info">
        <li class="two-line">
          <a-checkbox checked>已设置</a-checkbox>
          <span>登录密码</span>
          <p>安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码</p>
          <a class="one-updata" @click="isChangePwd = true">修改</a>
        </li>
        <li class="one-line">
          <a-checkbox checked>已设置</a-checkbox>
          <span>手机绑定</span>
          <p>绑定手机后，您即可享受丰富的手机服务，如手机找回密码等。</p>
          <a @click="isChangePhone = true">修改</a>
        </li>
        <li class="one-line">
          <a-checkbox :checked="!isEditor">已设置</a-checkbox>
          <span>所属药店</span>
          <p>加入药店通过资质认证后可享受平台丰富的优惠活动</p>
          <a @click="setEditor">{{ isEditor ? '取消' : '修改' }}</a>
        </li>
      </ul>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage">
    </a-modal>
    <f-space-modal-pwd :visible="isChangePwd" @handleCancel="changePwdCancel()"></f-space-modal-pwd>
    <f-space-modal-phone :visible="isChangePhone" @handleCancel="changePhoneCancel()" @handleSussece="changePhoneSussece"></f-space-modal-phone>
  </div>
</template>
<script>
import FSpaceModalPwd from "../../../components/modal/changePwd";
import FSpaceModalPhone from "../../../components/modal/changePhone";
import * as types from '../../../store/mutation-types'

export default {
  components: { FSpaceModalPwd, FSpaceModalPhone },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  middleware: 'authenticated',
  watch: {
    storeInfo(val) {
      if (val.comp.addressCode) {
        let code = val.comp.addressCode.toString();
        val.comp.aCode = [
          code.substr(0, 2) + "0000",
          code.substr(0, 4) + "00",
          code
        ].map(Number);
      }
      this.form.setFieldsValue(val.comp);
    }
  },
  data() {
    return {
      cascaderData: [],
      fieldNames: {
        label: 'arean', 
        value: 'areac', 
        children: 'cities' 
      },
      changePwdForm: {
        oldPwd: "",
        newPwd: "",
        newPwd2: ""
      },
      isRelated: false,
      isChangePhone: false,
      isChangePwd: false,
      showUpload: {
        showPreviewIcon: true,
        showRemoveIcon: false
      },
      fileList: [],
      isEditor: true,
      companyFileDir: "",
      previewVisible: false,
      previewImage: "",
      businessImg: "",
      GSPImg: "",
      DrugImg: "",
      authenticationStatus: 0,
      authenticationMessage: "",
      areaMax: 2,
      headers: {
        "specify-path": "",
        "specify-filename": ""
      },
      code: [],
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
      isSeting: true,
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
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: "",
      uploadIndex: 0
    };
  },
  mounted() {
    // this.form.setFieldsValue({
    //   storeName: "",
    //   address: "",
    //   addressCode: ""
    // });
    this.getBasicInfo();
    this.getNodes();
    this.$store.commit(types.SELECTED_KEYS, '/user/personal')
  },
  methods: {
    getAncestors(code) {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CommonModule";
      iRequest.method = "getAncestors";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.arrays = [code];
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.setArea(_this.cascaderData, result.data, 0)
            }
          }
        )
      );
    },
    setArea(area, data, index) {
      this.code.push(data[index].areac)
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CommonModule";
      iRequest.method = "getChildren";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.arrays = [data[index].areac];
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              let Items = result.data;
              area.map((value, i) => {
                if(value.value === data[index].areac) {
                  let arr = Items.map((value, i) => {
                    return {
                      value: value.areac,
                      label: value.arean,
                      isLeaf: false
                    };
                  });
                  if(index < _this.areaMax) {
                    index++
                    _this.$set(value, 'children', arr)
                    _this.setArea(value.children, data, index)
                  }else {
                    _this.form.setFieldsValue({
                      aCode: _this.code
                    })
                  }
                }
              });
            }
          }
        )
      );
    },
    setEditor() {
      this.isEditor = !this.isEditor;
      this.showUpload.showRemoveIcon = this.isEditor;
    },
    setUploadIndex(index) {
      this.headers["specify-filename"] = index + ".jpg";
      this.headers["specify-path"] =  this.uploadInfo.companyFilePath
      this.uploadIndex = index;
    },
    remove(file) {
      this.uploadList[file.uid].fileList = [];
      this.uploadList[file.uid].url = "";
    },
    onChange(value) {
      console.log(value);
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
    beforeUpload(file) {
      // 修改uid 便于删除～
      file.uid = this.uploadIndex;
    },
    changePhoneCancel() {
      this.isChangePhone = false;
    },
    changePhoneSussece() {
      this.isChangePhone = false;
      this.getBasicInfo()
    },
    changePwdCancel() {
      this.isChangePwd = false;
    },
    getBasicInfo() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "LoginRegistrationModule";
      iRequest.method = "getStoreSession";
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.$store.dispatch("setUser", {
              context: _this,
              user: result.data
            });
            _this.authenticationStatus = result.data.comp.authenticationStatus
            _this.code = []
            _this.getFilePathPrev();
            _this.authenticationMessage = result.data.comp.authenticationMessage;
            _this.isEditor = !_this.isRelated
            // 获取地区数据
            if(result.data.comp.addressCode) {
              _this.getAncestors(result.data.comp.addressCode)
            }
          }
        })
      );
    },
    getFilePathPrev() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        compid: this.$store.state.user.comp.storeId
      })
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.uploadInfo = result.data;
            // 获取默认图片
              var path = result.data.ergodicUrl;
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  _this.uploadList = [
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
                  ]
                  var data = xhr.responseText;
                  data = JSON.parse(data).data.sort();
                  for (var i in data) {
                    if (i !== 7) {
                       _this.uploadList[i].fileList.push({
                        uid: i,
                        name: data[i],
                        status: 'done',
                        url: result.data.downPrev + result.data.companyFilePath + data[i] + "?" + new Date().getSeconds(),
                      })
                      _this.uploadList[i].url = result.data.downPrev + result.data.companyFilePath + data[i] + "?" + new Date().getSeconds()
                    }
                  }
                }
              };
              xhr.open("POST", path, true);
              xhr.setRequestHeader("specify-path", result.data.companyFilePath);
              xhr.setRequestHeader("ergodic-sub", "false");
              xhr.send(null);
          }
        })
      );
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let _this = this;
          let flag = true
          let message = ''
          _this.uploadList.forEach((item) => {
            item.fileList.length === 0 ? flag = false : flag = true
            message = item.message
          })
          if(!flag && _this.authenticationStatus > 64) {
            _this.$message.error('请提交药店资质图片')
            return 
          }
          let iRequest = new inf.IRequest();
          iRequest.cls = "StoreManageModule";
          iRequest.method = "updateStoreInfo";
          iRequest.param.token = localStorage.getItem("identification");
          iRequest.param.json = JSON.stringify({
            storeName: values.storeName,
            addressCode: values.aCode[values.aCode.length - 1],
            address: values.address,
            longitude: 0,
            latitude: 0
          });
          this.$refcallback(
            this,
            "userServer",
            iRequest,
            new this.$iceCallback(function result(result) {
              if (result.code === 200) {
                _this.getBasicInfo();
                _this.setEditor();
                _this.$success({
                  title: "提交成功",
                  content: (
                    <div>
                      <p>您的门店信息已提交成功</p>
                      <p>我们将会在1-3个工作日内处理您的申请</p>
                      <p>如有疑问请拨打客服电话: 0731-88159987</p>
                    </div>
                  )
                });
              }
            })
          );
        }
      });
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CommonModule";
      iRequest.method = "getChildren";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.arrays = [targetOption.value];
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              let Items = result.data;
              targetOption.loading = false;
              let arr = Items.map((value, i) => {
                return {
                  value: value.areac,
                  label: value.arean,
                  isLeaf: selectedOptions.length >= _this.areaMax ? true : false
                };
              });
              _this.$set(targetOption, 'children', arr)
            }
          }
        )
      );
    },
    getNodes() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CommonModule";
      iRequest.method = "getChildren";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.arrays = [0];
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              let Items = result.data;
              _this.cascaderData = Items.map((value, i) => {
                return {
                  value: value.areac,
                  label: value.arean,
                  isLeaf: false
                };
              });
            }
          }
        )
      );
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.upload-list-inline > .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.certificates-box {
  .container-size(block, 985px, 1015px, 0, 0px);
  padding: 40px 0;
  .certificates-content {
    .container-size(block, 730px, 935px, 0 auto, 0px);
    .pharmacy-info {
      .p-size(60px, 60px, 20px, left, 0px, #333333);
    }
    .photo-box {
      .container-size(inline-block, 730px, 170px, 0, 0px);
      .adress {
        width: 200px;
        text-align: left !important;
      }
      div {
        .container-size(inline-block, 150px, 150px, 0, 0px);
        .position(relative, 0px, 0px);
        float: left;
      }
      .business-license,
      .management {
        margin-right: 130px;
      }
    }
    .certificate-title {
      .p-size(60px, 60px, 20px, left, 0px, #333333);
      margin-bottom: 10px;
    }
    .certificate-text {
      .p-size(50px, 50px, 20px, center, 0px, #333333);
      span {
        .container-size(inline-block, 239px, 50px, 0, 0px);
      }
    }
    .certificate-fill {
      .p-size(50px, 50px, 16px, center, 0px, #ed3025);
      span {
        .container-size(inline-block, 239px, 50px, 0, 0px);
      }
    }
    .save-btn {
      .button-display(block, 15px auto 0 auto);
      .button-size(120px, 48px, 48px, 18px, 0px, 5px);
      .button-color(1px solid transparent, #ed3025, #ffffff);
    }
  }
}
.ant-form-item-label {
  text-align: left !important;
}
.authentication {
  font-size: 16px;
  span {
    color: #3189f5;
  }
}
.user-info {
  .container-size(inline-block, 730px, 325px, 0, 0px);
  li {
    .container-size(inline-block, 730px, 108px, 0, 0px);
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 0　18px !important;
    p {
      .container-size(inline-block, 450px, auto, 0 40px 0 45px, 0px);
    }
  }
  .one-line {
    line-height: 100px;
  }
  .two-line {
    line-height: 37px;
    .one-updata {
      .position(relative, 0px, 86px);
    }
    p {
      .position(relative, 17px, 45px);
      margin: 0;
      height: auto;
    }
  }
}
.ant-input {
  border: 1px solid #e0e0e0;
  border-radius: 0px !important;
  font-size: 16px;
}
.city {
  width: 460px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
}
.ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {
  color: #999999;
}
.upload {
  display: inline-block;
  width: 240px;
  height: 200px;
}
</style>


