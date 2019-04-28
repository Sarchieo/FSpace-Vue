<template>
    <div>
        <a-layout>
            <f-space-header type="home"></f-space-header>
            <a-layout-content>
                <div>
                    <div class="step-right">
                        <a-steps class="setps-box" :current="steps">
                            <a-step title="买家申请换货">

                            </a-step>
                            <a-step title="卖家处理换货">

                            </a-step>
                            <a-step title="换货完成">

                            </a-step>
                        </a-steps>
                    </div>
                    <div class="reason-box">
                        <p class="title">退货原因</p>

                        <div class="reason-content">
                            <div class="reason-left">
                                <img src="//img.alicdn.com/imgextra/i3/TB1uSnvNFXXXXb8aXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg"/>
                                <p>汇仁牌肾宝片 200片/瓶</p>
                                <p>￥ 38</p>
                            </div>
                            <div class="reason-right">
                                <a-form-item
                                        label="退货原因"
                                        :label-col="{ span: 2 }"
                                        :wrapper-col="{ span: 12 }">
                                    <a-select v-model="reasonType" style="width: 200px;margin-bottom: 10px;" @change="handleChange">
                                        <a-select-option v-for="i in reprreason" :key="i.value">
                                            {{i.label}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item
                                        label="原因描述"
                                        :label-col="{ span: 2 }"
                                        :wrapper-col="{ span: 16 }">
                                    <a-textarea v-model="content" class="evaluate-text" maxlength="300"/>
                                    <!-- <a-textarea v-model="content" class="evaluate-text" maxlength="300"/> -->

                                </a-form-item>
                                <p class="limit">{{content.length}}/300</p>

                                <!-- <a-upload
                                  style="display: inline-block;margin-top:10px;"
                                  action="//jsonplaceholder.typicode.com/posts/"
                                  listType="picture-card"
                                  :fileList="fileList"
                                  @preview="handlePreview"
                                  @change="handleChange"
                                >

                                  <div>
                                    <a-icon type="plus" />
                                    <div class="ant-upload-text">上传照片,最多八张</div>
                                  </div>
                                </a-upload>
                                 <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                    <img alt="example" style="width: 100%" :src="previewImage" />
                                  </a-modal> -->
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
                                </a-upload>
                                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                    <img alt="example" style="width: 100%" :src="previewImage"/>
                                </a-modal>
                            </div>
                        </div>
                        <div class="submission-box">
                            <a-button class="back-btn">返回</a-button>
                            <a-button class="submission-btn" @click="afterSaleApp">提交</a-button>
                        </div>
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
        loading: false,
        uploadInfo: {},
        steps: 0,
        content: '',
        previewVisible: false,
        previewImage: '',
        fileList: [],
        reprreason: [],
        goodsArr: [],
        orderno: 0,
        reasonType: 70,
        asType: 0,
        headers: {
          "specify-path": "",
          "specify-filename": ""
        },
    };
  },
  mounted() {
    this.asType = this.$route.query.asType;
    this.orderno = this.$route.query.orderno;
    this.goodsArr = JSON.parse(sessionStorage.getItem('fillOrderReason'));
    console.log("goodsArrqweqweqw1111--- " + JSON.stringify(this.goodsArr))
    // 获取字典
    this.queryDictList()
    this.getFilePathPrev()
  },
  methods: {
      queryDictList() {
          let _this = this
          let iRequest = new inf.IRequest();
          iRequest.cls = "CommonModule";
          iRequest.method = "getDicts";
          this.$refcallback(
              this,
              "globalServer",
              iRequest,
              new this.$iceCallback(
                  function result(result) {
                      if (result.code === 200) {
                          _this.reprreason = JSON.parse(result.data).reprreason
                          // console.log("dict---  " + JSON.stringify(_this.reprreason))
                      }
                  }
              )
          );
      },
      //提交售后
      afterSaleApp() {
          let _this = this
          let iRequest = new inf.IRequest();
          iRequest.cls = "OrderOptModule";
          iRequest.method = "afterSaleApp";
          iRequest.param.token = localStorage.getItem("identification");
          let arr = this.goodsArr.map(value => {
                  return {
                      gstatus: 0,
                      asnum: value.pnum,
                      pdno: value.pdno,
                      orderno: value.orderno,
                      compid: value.compid,
                      reason: this.reasonType,
                      apdesc: this.content,
                      astype: this.asType
                  };
          });
          iRequest.param.json = JSON.stringify({
              orderno: this.orderno,
              asAppArr: arr,
              asType: this.asType
          });
          this.$refcallback(
              this,
              "orderServer" +
              Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
              iRequest,
              new this.$iceCallback(
                  function result(result) {
                      if (result.code === 200) {
                          _this.$message.success(result.data);
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
                debugger
                _this.headers["specify-filename"] = _this.fileList.length + ".jpg";
                _this.headers["specify-path"] = _this.uploadInfo.orderFilePath;
                _this.headers["tailor-list"] = "200x200,400x400,600x600";
              } else {
                _this.$message.error("文件地址获取失败, 请稍后重试");
              }
            },
            function error(error) {
              debugger;
            }
          )
        );
      },
      beforeUpload(file) {
        const isJPG = file.type
        if (isJPG !== 'image/jpeg' &&  isJPG !== 'image/png') {
          this.$message.error('图片支持只jpg，png两种格式。!')
          return false
        }
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!isLt2M) {
          this.$message.error('图片大小不能超过5M!')
        }
        return isJPG && isLt2M
      },
      remove(file) {
        this.fileList = [];
      },
      handleChange(value) {
        this.reasonType = value
      },
      handleCancel() {
          this.previewVisible = false
      },
      handlePreview(file) {
          this.previewImage = file.url || file.thumbUrl
          this.previewVisible = true
      },
      handleChangeUpload({ file, fileList, event }) {

          this.fileList = fileList;
          // console.log("value-- " + this.reasonType)
      }
  }
};
</script>
<style lang="less" scoped>
    @import "../../components/fspace-ui/container/index.less";
    @import "../../components/fspace-ui/button/index.less";

    #components-layout-demo-basic .ant-layout-footer {
        /* background: deeppink; */
        color: #ffffff;
    }

    .ant-layout-content {
        background: #ffffff;
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
        background: rgb(255, 255, 255);
        /* min-height: 1000px; */
        color: #000000;
    }

    #components-layout-demo-basic > .ant-layout {
        /* margin-bottom: 48px; */
    }

    #components-layout-demo-basic > .ant-layout:last-child {
        margin: 0;
    }

    .step-right {
        .container-size(block, 879px, 75px, 0 auto, 0px);
        margin-top: 40px;
        padding: 0px 20px;

        .setps-box {
            //   .position(relative, -120px, 0px);
        }
    }

    .reason-box {
        .container-size(block, 1190px, 550px, 0 auto, 0px);
        margin-bottom: 20px;
    }

    .title {
        .p-size(50px, 50px, 18px, left, 20px, #333333);
        background: #f2f2f2;
    }

    .reason-content {
        .container-size(inline-block, 1190px, 405px, 0, 0px);
        border: 1px solid #f2f2f2;

        .reason-left {
            .container-size(inline-block, 200px, 260px, 30px 0px 0px 30px, 0px);
            float: left;
            //   background: black;
            img {
                width: 180px;
                height: 180px;
                margin-bottom: 10px;
            }

            p {
                .p-size(30px, 30px, 13px, left, 0px, #333333);
            }
        }

        .reason-right {
            .container-size(inline-block, 900px, 350px, 30px 0px 0px 30px, 0px);
            float: right;
        }
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

    .ant-input {
        border-radius: 0px !important;
        -moz-border-radius: 0px !important;
        -webkit-border-radius: 0px !important;
    }

    .evaluate-text {
        width: 500px;
        height: 150px;
        border: 1px solid #e0e0e0;
    }

    .ant-form-item {
        margin-bottom: 5px;
    }

    .limit {
        width: 577px;
        text-align: right;
    }

    .upload {
        .p-size(30px, 30px, 13px, left, 10px, #333333);
        margin-bottom: 5px;
    }

</style>
