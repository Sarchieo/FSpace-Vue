<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <a-breadcrumb separator=">" class="crumbs">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>我的订单</a-breadcrumb-item>
          <a-breadcrumb-item>申请售后</a-breadcrumb-item>
          <a-breadcrumb-item>补开发票</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="supp-box">
          <div class="supp-steps">
            <a-steps class="setps-box" :current="steps">
              <a-step title="发票补开原因"></a-step>
              <a-step title="填定发票信息"></a-step>
              <a-step title="选择邮寄地址"></a-step>
              <a-step title="支付邮费"></a-step>
              <a-step title="完成"></a-step>
            </a-steps>
          </div>
          <!-- 第一步 -->
          <div class="reason-box" v-if="steps === 0">
            <p class="reason-p">补开原因</p>
            <div class="reason-right">
              <a-form-item label="补开原因" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
                <a-select
                  v-model="reasonType"
                  style="width: 200px;margin-bottom: 10px;"
                  @change="handleChangePatch"
                >
                  <a-select-option v-for="i in mireason" :key="i.value">{{i.label}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="原因描述" :label-col="{ span: 2 }" :wrapper-col="{ span: 16 }">
                <a-textarea v-model="content" class="evaluate-text" maxlength="200"/>
              </a-form-item>
              <!-- <p class="limit">{{content.length}}/300</p>
              <p class="upload">上传相片</p>
                <a-upload
                  :fileList="fileList"
                  listType="picture-card"
                  class="avatar-uploader"
                  :headers="headers"
                  :showUploadList="showUpload"
                  :action="uploadInfo.upUrl"
                  :beforeUpload="beforeUpload"
                  :supportServerRender="true"
                  :remove="remove"
                  @change="handleChangeUpload"
                  @preview="handlePreview"
                >
                  <div v-if="fileList.length < 3">
                    <a-icon :type="loading ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">商品图片</div>
                  </div>
                </a-upload> -->
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage">
              </a-modal>
              <div class="submission-box">
                <a-button class="back-btn" @click="backOne()">返回</a-button>
                <a-button class="submission-btn" @click="setStep(1)">下一步</a-button>
              </div>
            </div>
          </div>
          <!-- 第二步 -->
          <div class="reason-box" v-if="steps === 1">
            <p class="reason-p">填写发票信息</p>
            <a-tabs v-model="invoiceType" defaultActiveKey="1" @change="changeType">
              <a-tab-pane tab="普通发票" key="1"></a-tab-pane>
              <a-tab-pane tab="增值税专用发票" key="2"></a-tab-pane>
            </a-tabs>
            <div class="two-box">
              <p class="comp-name-address">
                <span>公司名称：</span>
                {{ storeInfo.comp.storeName }}
              </p>
              <p class="comp-name-address">
                <span>公司注册地址：</span>
                {{ storeInfo.comp.addressCodeStr + storeInfo.comp.address }}
              </p>

              <a-form :form="form" @submit="handleSubmit">
                <a-form-item label="纳税人识别号：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                  <a-input
                    v-model="taxpayer"
                    placeholder="纳税人识别号或社会信用代码"
                    v-decorator="[
                      'taxpayer',
                      {rules: [{ required: true, message: '纳税人识别号有误'}, { validator: validateTaxID }]}
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  v-if="invoiceType != 1"
                  label="注册电话："
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-input
                    v-model="tel"
                    placeholder="专票要求的公司电话"
                    v-decorator="[
                      'tel',
                      {rules: [{ required: true, message: '请填写注册电话' }]}
                    ]"
                  />
                </a-form-item>
                <a-form-item label="开户银行：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                  <a-input
                    v-model="bankers"
                    placeholder="xx银行xx支行"
                    v-decorator="[
                      'bankers',
                      {rules: [{ required: true, message: '请填写开户银行' }]}
                    ]"
                  />
                </a-form-item>
                <a-form-item label="银行账号：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                  <a-input
                    v-model="account"
                    placeholder="开户许可证或法人的私人账户"
                    v-decorator="[
                      'account',
                      {rules: [{ required: true, message: '请填写银行账号：' }]}
                    ]"
                  />
                </a-form-item>
                <div class="submission-box">
                  <a-button class="back-btn" @click="back(0)">返回</a-button>
                  <a-button class="submission-btn" type="primary" html-type="submit">下一步</a-button>
                </div>
              </a-form>
            </div>
          </div>
          <!-- 第三步 -->
          <div class="reason-box" v-if="steps === 2">
            <p class="reason-p">填写邮寄信息</p>
            <div class="mail-box">
              <p class="title">取件地址</p>
              <p class="mail-p">
                <span class="mail-title">收件人：</span>
                <span>{{consignee}}</span>
              </p>
              <p class="mail-p">
                <span class="mail-title">联系方式:</span>
                <span>{{contact}}</span>
              </p>
              <p class="mail-p">
                <span class="mail-title">收货门店:</span>
                <span>{{comp.storeName}}</span>
              </p>
              <p class="mail-p">
                <span class="mail-title">门店地址:</span>
                <span>{{comp.address}}</span>
              </p>
              <!--<p class="freight">-->
              <!--<span>运费：</span>-->
              <!--<span class="price">￥10</span>-->
              <!--</p>-->
              <!--<p class="text">*运费根据门店地址的里程计算，系统自动生成运费。</p>-->
              <div class="submission-box">
                <a-button class="back-btn" @click="back(1)">返回</a-button>
                <a-button class="submission-btn" @click="afterSaleApp">提交</a-button>
              </div>
            </div>
          </div>
          <!-- 第四步 -->
          <div class="reason-box" v-if="steps === 3">
            <div class="payment-header">第三方支付</div>
            <div class="qr-code">
              <p class="scan">扫一扫付款</p>
              <p class="pay-num">人民币：{{ payamt }}元</p>
              <img :src="url" alt class="payment-pic">
            </div>
          </div>
          <!-- 第五步 -->
          <div class="reason-box" v-if="steps === 3">
            <p class="reason-p">发票详情</p>
            <p class="reason-wait">您的订单号为{{orderno}}的补开发票申请商家正在审核并制票，请耐心等待</p>
            <!-- <table>
              <thead>订单号: {{orderno}}</thead>
              <tbody>
                <tr>
                  <td>发票类型</td>
                  <td>{{invoiceStr}}</td>
                </tr>
                <tr>
                  <td>发票内容</td>
                  <td>商品明细</td>
                </tr>
                <tr>
                  <td>发票抬头</td>
                  <td>湖南空间折叠互联网科技有限公司</td>
                </tr>
              </tbody>
            </table> -->
          </div>
        </div>
      </a-layout-content>
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
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      showUpload: {
        showPreviewIcon: true,
        showRemoveIcon: true
      },
      headers: {
        "specify-path": "",
        "specify-filename": ""
      },
      loading: false,
      uploadInfo: {},
      form: this.$form.createForm(this),
      orderno: 0,
      comp: {},
      consignee: "",
      contact: "",
      reprreason: [],
      content: "",
      steps: 0,
      reasonType: '',
      asType: 0,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      url: "",
      payamt: "",
      afsano: 0, //售后单号
      oneStep: true,
      twoStep: false,
      mireason: [],
      invoiceType: "1",
      invoiceStr: "普通发票",
      bankers: "", //开户行
      account: "", //开户行账号
      taxpayer: "", //纳税人识别号
      tel: "", //注册电话
      invoice: {}
    };
  },
  mounted() {
    this.orderno = this.$route.query.orderno;
    this.comp = this.storeInfo.comp;
    this.queryDictList();
    this.queryMyConsignee();
    this.showFeePayInfo();
    // 支付结果监听
    this.payResult();
    this.getFilePathPrev();
    this.getInvoice()
  },
  methods: {
    getInvoice(){
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyInvoiceModule";
      iRequest.method = "getInvoice";
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if(result.code === 200 && result.data.length > 0) {
              _this.invoice = result.data[0]
            }
          }
        )
      );
    },
     getFilePathPrev() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        orderid: this.orderno,
        compid: this.storeInfo.comp.storeId
      });
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.uploadInfo = result.data;
              _this.headers["specify-filename"] =
                _this.fileList.length + ".jpg";
              _this.headers["specify-path"] = _this.uploadInfo.orderFilePath;
              _this.headers["tailor-list"] = "200x200,400x400,600x600";
            }
          }
        )
      );
    },
    //运费
    showFeePayInfo() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "showFeePayInfo";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        compid: this.storeInfo.comp.storeId,
        paytype: "alipay"
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.payamt = result.data.payamt;
          }
        })
      );
    },
    changeType(val) {
      if (this.invoiceType == 1) {
        this.invoiceStr = "普通发票";
      } else {
        this.invoiceStr = "增值税专用发票";
      }
      setTimeout(() => {
        this.form.setFieldsValue(this.invoice);
      }, 500)
    },
    prePay() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "preFeePay";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        compid: this.storeInfo.comp.storeId,
        paytype: "alipay",
        afsano: this.afsano //  这是啥?
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.url = result.data;
            _this.steps = 3;
          }
        })
      );
    },
    payResult() {
      let _this = this;
      let ice_callback = new Ice.Class(inf.PushMessageClient, {
        receive: function(message, current) {
          try{
            let result = JSON.parse(message);
            // event tradeStatus 需要跟蒋文广确认
            if (result.event == 1 && result.body.tradeStatus == 1) {
              _this.steps = 4;
              // 支付结果页面数据
            }
          } catch(err){
            console.log(message)
          }
        }
      });
      this.$initIceLong(
        "orderServer",
        this.storeInfo.comp.storeId,
        new ice_callback()
      );
    },
    queryMyConsignee() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyDrugStoreInfoModule";
      iRequest.method = "queryMyConsignee";
      iRequest.param.json = JSON.stringify({
        compid: _this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            if (result.data && result.data.length > 0) {
              _this.receiverList = result.data;
              _this.consignee = _this.receiverList[0].contactname;
              _this.contact = _this.receiverList[0].contactphone;
            } else {
              _this.visible = true;
            }
          } else {
            _this.visible = true;
          }
        })
      );
    },
    //提交售后
    afterSaleApp() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderOptModule";
      iRequest.method = "afterSaleApp";
      iRequest.param.token = localStorage.getItem("identification");
      if (this.invoiceType == 1) {
        this.asType = 3;
      } else {
        this.asType = 4;
      }
      this.invoice = {
        invoiceInfo: {
          compName: this.comp.storeName,
          address: this.comp.address,
          bankers: this.bankers, //开户行
          account: this.account, //开户行账号
          taxpayer: this.taxpayer, //纳税人识别号
          tel: this.tel //注册电话
        },
        address: {
          consignee: this.consignee,
          contact: this.contact,
          compName: this.comp.storeName,
          address: this.comp.address
        }
      };
      let arr = [
        {
          gstatus: 0,
          orderno: this.orderno,
          compid: this.storeInfo.comp.storeId,
          reason: this.reasonType,
          invoice: JSON.stringify(this.invoice),
          apdesc: this.content,
          astype: this.asType
        }
      ];
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        asAppArr: arr,
        asType: this.asType
      });
      // console.log("json-- " + iRequest.param.json);
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.afsano = result.data;
              // console.log("afsano--- " + _this.afsano)
              _this.setStep(3);
              // _this.$message.success(result.data);
            } else {
              console.log("result--- " + JSON.stringify(result));
            }
          },
          function error(error) {}
        )
      );
    },
    queryDictList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "CommonModule";
      iRequest.method = "getDicts";
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.mireason = JSON.parse(result.data).mireason;
          }
        })
      );
    },
    handleChangePatch(value) {
      this.reasonType = value;
    },
    beforeUpload(file) {
      const isJPG = file.type;
      if (isJPG !== "image/jpeg" && isJPG !== "image/png") {
        this.$message.error("图片支持只jpg，png两种格式。!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("图片大小不能超过5M!");
      }
      return isJPG && isLt2M;
    },
    remove(file) {
      for(let i = 0; i< this.fileList.length; i++) {
        if(this.fileList[i].uid === file.uid) {
          this.fileList.splice(i,1);
        }
      }
    },
    handleChange(value) {
      this.reasonType = value;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChangeUpload({ file, fileList, event }) {
      this.fileList = fileList;
      // console.log("value-- " + this.reasonType)
    },
    setStep(index) {
      if (index === 1) {
        if (this.reasonType === '') {
            this.$message.warning("请选择补开发票原因")
            return
        }
        setTimeout(() => {
          this.form.setFieldsValue(this.invoice);
        }, 500)
      }
      if (index === 3) {
        this.prePay();
        return;
      }
      this.steps = index;
    },
    back(index) {
      this.steps = index;
    },
    backOne() {
      this.$router.push({
        path: "/user/personal/myorder"
      });
    },
    validateTaxID(rule, value, callback) {
      const form = this.form;
      if (value && (value.length === 15 ||value.length === 18 || value.length === 20)) {
        callback();
      } else {
        callback("纳税人识别号有误");
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
           this.steps = 2;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.ant-layout-content {
  background: #ffffff;
}
#components-layout-demo-basic .ant-layout-footer {
  /* background: deeppink; */
  color: #ffffff;
}
#components-layout-demo-basic .ant-layout-footer {
  /* height: 175px; */
  /* line-height: 1.5; */
  color: #000000;
}
#components-layout-demo-basic .ant-layout-sider {
  width: 30px !important;
  background: #000000;
}
#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  /* min-height: 1000px; */
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.crumbs {
  .p-size(50px, 50px, 14px, left, 244px, #999999);
  margin-top: 20px;
}
.supp-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  .supp-steps {
    .container-size(block, 1190px, 70px, 0 auto, 0px);
    margin-top: 14px;
  }
  .reason-box {
    .container-size(block, 1190px, 600px, 0 auto, 0px);
    border: 1px solid #f8f8f8;
    margin-bottom: 40px;
    .reason-p {
      .p-size(50px, 50px, 16px, left, 20px, #999999);
      background: #f8f8f8;
    }
    .reason-right {
      .container-size(inline-block, 1155px, 350px, 30px 0px 0px 30px, 0px);
      float: left;
      .evaluate-text {
        width: 500px;
        height: 150px;
        border: 1px solid #e0e0e0;
      }
      .limit {
        .position(relative, -20px, 0px);
        width: 743px;
        text-align: right;
      }
      .upload {
        .p-size(30px, 30px, 16px, left, 25px, #999999);
      }
    }
  }
}
.ant-input {
  border-radius: 0px !important;
  -moz-border-radius: 0px !important;
  -webkit-border-radius: 0px !important;
}

.submission-box {
  .container-size(block, 1190px, 90px, 0 auto, 0px);
  padding: 22px 37%;

  button {
    .button-size(150px, 45px, 45px, 16px, 0px, 5px);
  }

  .submission-btn {
    .button-color(1px solid #e0e0e0, #ed3025, #ffffff);
  }
}
//邮寄信息
.mail-box {
  .container-size(block, 1190px, 418px, 0 auto, 0px);
  padding-left: 20px;
  .title {
    .p-size(60px, 60px, 18px, left, 0px, #333333);
  }
  .mail-p {
    .p-size(40px, 40px, 16px, left, 0px, #333333);
    .mail-title {
      display: inline-block;
      color: #999999;
    }
  }
  .freight {
    .p-size(40px, 40px, 16px, left, 0px, #333333);
    margin-top: 50px;
    margin-bottom: 20px;
    .price {
      font-weight: bold;
      color: #ed3025;
    }
  }
  .text {
    .p-size(30px, 30px, 14px, left, 0px, #999999);
  }
}
.comp-name-address {
  .p-size(50px, 50px, 15px, left, 0px, #bfbfbf);
  margin-left: 140px;
  span {
    display: inline-block;
    width: 108px;
    height: 50px;
    text-align: right;
    margin-right: 5px;
    font-size: 14px;
    color: #333333;
  }
}
.two-box {
  padding-top: 50px;
}
.height600 {
  height: 600px !important;
}
table {
  .container-size(block, 800px, 205px, 0 auto, 0px);
  margin-top: 50px;
}
thead {
  display: inline-block;
  width: 800px;
  height: 50px;
  line-height: 50px;
  text-indent: 10px;
}
tr {
  display: inline-block;
  width: 800px;
  height: 50px;
  line-height: 50px;
  td {
    display: inline-block;
    width: 395px;
    height: 50px;
    line-height: 50px;
  }
}
.payment-header {
  .container-size(block, 100%, 100px, 0, 0px);
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  color: #333333;
  font-weight: bold;
}
.qr-code {
  .container-size(block, 1000px, 500px, 0 auto, 0px);
  padding: 70px 350px;
  margin-bottom: 20px;
  .scan {
    text-align: center;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .pay-num {
    .p-size(50px, 50px, 18px, center, 0px, #ed2f26);
    margin-bottom: 20px;
    font-weight: bold;
  }
  .payment-pic {
    .container-size(block, 220px, 220px, 0 auto, 0px);
  }
  .p-btn {
    width: 100%;
    padding: 0px 20%;
    button {
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
    }
    .cancel-btn {
      float: left;
      border: none;
      background: #999999;
      color: #333333;
    }
  }
}
.reason-wait{
   .p-size(50px, 50px, 16px, center, 0px, #666666);
    background: #f8f8f8;
    font-weight: bold;
}
</style>
