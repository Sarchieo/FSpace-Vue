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
              <a-step title="完成"></a-step>
            </a-steps>
          </div>
          <div class="reason-box">
            <p class="reason-p">补开原因</p>
            <div class="reason-right">
              <a-form-item label="补开原因" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
                <a-select
                  v-model="reasonType"
                  style="width: 200px;margin-bottom: 10px;"
                  @change="handleChange"
                >
                  <a-select-option v-for="i in reprreason" :key="i.value">{{i.label}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="原因描述" :label-col="{ span: 2 }" :wrapper-col="{ span: 16 }">
                <a-textarea v-model="content" class="evaluate-text" maxlength="300"/>
              </a-form-item>
              <!-- <p class="limit">{{content.length}}/300</p>
              <p class="upload">上传相片</p>
              <a-upload
                style="position: relative;top: 0px;left: 10px;"
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 3">
                  <a-icon type="plus"/>
                  <div class="ant-upload-text">最多三张</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage">
              </a-modal>-->
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
      steps: 0,
      reasonType: 1
    };
  },
  mounted() {},
  methods: {
    handleChange(value) {
      this.reasonType = value;
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
    .container-size(block, 1190px, 550px, 0 auto, 0px);
    border: 1px solid #f2f2f2;
    .reason-p {
      .p-size(50px, 50px, 16px, left, 20px, #999999);
      background: #f2f2f2;
    }
    .reason-right {
      .container-size(inline-block, 1155px, 350px, 30px 0px 0px 30px, 0px);
      float: left;
      .evaluate-text {
        width: 500px;
        height: 150px;
        border: 1px solid #e0e0e0;
      }
    }
  }
}
.ant-input {
  border-radius: 0px !important;
  -moz-border-radius: 0px !important;
  -webkit-border-radius: 0px !important;
}
</style>
