<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <a-breadcrumb class="bread">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>网站公告</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div>
          <div class="notice-box">
            <h1></h1>
          </div>
          <p class="time">发布时间：</p>
          <div>
            <img src alt class="notice-pic">
          </div>
          <p class="step">
            <span class="previous">上一条</span>
            <span class="next">下一条</span>
          </p>
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
     notice: {}
    };
  },
  mounted() {
  
    
  },
  methods: {

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
.ant-layout-content {
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
.bread {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  .p-size(50px, 50px, 14px, left, 0px, #333);
}
.notice-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #ffffff;
  h1 {
    .p-size(100px, 100px, 30px, center, 0px, #333);
    border-top: 1px solid #e0e0e0;
  }
}
.time {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  .p-size(40px, 40px, 14px, left, 10px, #999);
  background: #f8f8f8;
}
.notice-pic {
  .container-size(block, 1190px, 600px, 0 auto, 0px);
  img {
    width: 100%;
    height: 100%;
  }
}
.step {
  .container-size(block, 1190px, 40px, 0 auto, 0px);
  margin-bottom: 100px;
  .previous {
    float: left;
    .container-size(inline-block, auto, 40px, 0, 0px);
    text-align: left;
    line-height: 40px;
  }
  .next {
    float: right;
    .container-size(inline-block, auto, 40px, 0, 0px);
    text-align: right;
    line-height: 40px;
  }
}
.previous:hover {
  color: #ed3025;
  cursor: pointer;
}
.next:hover {
  color: #ed3025;
  cursor: pointer;
}
</style>
