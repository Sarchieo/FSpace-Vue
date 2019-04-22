<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <a-breadcrumb class="bread">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>我的一块</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>我的订单</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>评价</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-content>
      <div class="evaluate-box">
        <p class="evaluate-text">
          <span class="goods">商品</span>
          <span class="evaluate">评价</span>
        </p>
      </div>
      <ul class="evaluate-ui">
        <li>
          <div class="goods-pic">
            <img src="https://img.ysbang.cn/uploads/sale/2015/09/03/55e7a30dc3f92.jpg" alt>
            <p class="goods-name">香港原装黄道益活络油</p>
            <p class="spec">200g/瓶</p>
          </div>
          <div class="evaluate-star">
            <p class="evaluate-num">
              <span>评分：</span>
              <span>
                <a-rate v-model="value"/>
                <span class="ant-rate-text">{{evaluateNum(value)}}</span>
              </span>
            </p>
            <div>
               <a-textarea placeholder="请对您购买的药品进行评价" :rows="5" v-model="evaluateText" class="evaluate-text" maxlength="300" @input="descInput"/>
             <span class="float-right">{{txtVal}}/300</span>
            </div>
<!--             
            <a-upload
              style="display: inline-block;margin-top:10px;"
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传照片,最多八张</div>
              </div>
            </a-upload>
             -->
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
           <button class="comm-btn">提交</button>
          </div>
          <div style="clear: both;"></div>
        </li>
      </ul>
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
      evaluateText: '',
      txtVal: 0,
      value: 5,
       previewVisible: false,
      previewImage: '',
      fileList: [],
      orderno: '',
      goods: []
    };
  },
  mounted() {
    this.orderno = this.$route.query.orderno
    this.goods = this.$route.query.goods
    console.log(this.orderno,this.goods )
  },
  methods: {
     handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    evaluateNum(value) {
      let text = "";
      switch (value) {
        case 1:
          text = "非常差";
          break;
        case 2:
          text = "差";
          break;
        case 3:
          text = "一般";
          break;
        case 4:
          text = "满意";
          break;
        case 5:
          text = "非常满意";
          break;
      }
      return text
    },
     descInput(){
        this.txtVal = this.evaluateText.length;
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
.evaluate-text{
  display: block;
  margin-bottom: 10px;
}
.ant-input{
  width: 90%;
  border: 1px solid #e0e0e0;
  border-radius: 0px!important;
  margin-top: 20px;
}
.ant-rate-star,.ant-rate-star-full{
  width: 20px;
}
.ant-layout {
  background: #ffffff;
}
.bread {
  .container-size(block, 1190px, 50px, 0 auto, 0px);
  line-height: 50px;
}
.evaluate-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  .evaluate-text {
    .p-size(55px, 55px, 18px, left, 20px, #666666);
    background: #f6f6f6;
    .goods {
      float: left;
      display: inline-block;
      width: 265px;
      text-align: center;
    }
    .evaluate {
      float: right;
      display: inline-block;
      width: 925px;
      text-align: center;
    }
  }
}
.evaluate-ui {
  .container-size(block, 1190px, 800px, 0 auto, 0px);
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
  li {
    .container-size(block, 1150px, auto, 0 auto, 0px);
    // border-bottom: 1px solid #e0e0e0;
    padding: 30px 30px 30px 10px;
    .goods-pic {
      float: left;
      width: 180px;
      height: 250px;
      img {
        width: 180px;
        height: 180px;
      }
      .goods-name,
      .spec {
        .p-size(30px, 30px, 14px, center, 0px, #999999);
      }
    }
    .evaluate-star {
      float: right;
      width: 800px;
      height: auto;
      border: 1px solid #e0e0e0;
      padding-left: 20px;
      padding-bottom: 10px;
      .evaluate-num {
        .p-size(40px, 40px, 16px, left, 0px, #666666);
      }
    }
  }
}
.comm-btn{
 display: block;
  .button-size(150px,40px,40px,16px,0px,5px);
  .button-color(1px solid transparent,#ed3025,#ffffff);
  margin: 0 auto;
}
</style>