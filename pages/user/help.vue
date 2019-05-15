<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content class="base">
        <a-breadcrumb separator=">" class="crumbs">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>帮助中心</a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 头部内容 -->
        
        <div class="content">
          <div class="left">
            <a-menu
              :selectedKeys="[selectedKeys]"
              style="width: 194px;height:500px;"
              mode="vertical"
              @click="handleClick"
            >
              <a-menu-item key="/user/help/law" class="left-menu">
                <a-icon type="mail"/>法律声明
              </a-menu-item>
              <a-menu-item key="/user/help/service" class="left-menu">
                <a-icon type="mail"/>服务协议
              </a-menu-item>
              <a-menu-item key="/user/help/privacy" class="left-menu">
                <a-icon type="mail"/>隐私协议
              </a-menu-item>
              <a-menu-item key="/user/help/web-operation" class="left-menu">
                <a-icon type="mail"/>网站操作流程
              </a-menu-item>
              <!-- <a-menu-item key="/user/help/app-operation" class="left-menu">
                <a-icon type="calendar"/>app操作流程
              </a-menu-item> -->
              <a-menu-item key="/user/help/sale-service" class="left-menu">
                <a-icon type="mail"/>售后服务
              </a-menu-item>
            </a-menu>
          </div>
          <div class="right">
            <nuxt-child></nuxt-child>
          </div>
        </div>
      </a-layout-content>
      <f-space-footer class="footer"></f-space-footer>
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
    },
    selectedKeys() {
      return this.$store.state.selectedKeys;
    }
  },
  middleware: "authenticated",
  data() {
    return {
      countList: [0, 0, 0, 0, 0, 0, 0],
      gradeNumber: 0,
      balamt: 0
    };
  },
  mounted() {
    this.countCompInfo()
    this.getMember()
    this.queryCompAllBal()
  },
  methods: {
    handleClick(e) {
      this.$router.push({
        path: e.key
      });
      console.log("click ", e);
    },
    queryCompAllBal() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "CouponManageModule";
      iRequest.method = "queryCompAllBal";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "discountServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
          if (result.code === 200) {
            _this.balamt = result.data.balamt
          }
        })
      );
    },
     /** 统计信息 */
    countCompInfo() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderInfoModule";
      iRequest.method = "countCompInfo";
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" + Math.floor(this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
          if (result.code === 200) {
            _this.countList = result.data
          }
        })
      );
    },
    // 获取会员等级
    getMember() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MemberModule";
      iRequest.method = "getMember";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.gradeNumber = result.data.levelname
          }
        })
      );
    }
  }
};
</script> 
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";

.crumbs {
  .p-size(50px, 50px, 16px, left, 5px, #999999);
}
.base {
  width: 1200px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: #f0f2f5;
}
.footer {
  margin-top: 20px;
}
.header-personal {
  width: 1200px;
  height: 140px;
  background: white;
  border: solid 1px #e0e0e0;
  .left {
    float: left;
    width: 36%;
    height: 120px;
    text-align: center;
    margin-top: 10px;
    p {
      .p-size(30px, 30px, 14px, left, 20px, #333333);
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
      i {
        margin-right: 15px;
        color: #ed3025;
      }
    }
  }
  .right {
    float: left;
    width: 25%;
    height: 120px;
    margin-top: 10px;
    margin-left: 80px;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    .right-title {
      text-align: center;
      font-size: 16px;
      color: #666666;
    }
    p {
      .p-size(40px, 40px, 14px, left, 20px, #ed3025);
      span {
        .container-size(inline-block, 155px, auto, 0, 0);
        text-align: center;
        color: #333333;
      }
    }
  }
  .order-info {
    float: left;
    width: 32%;
    height: 120px;
    margin-top: 10px;
    .order-title {
      text-align: center;
      font-size: 16px;
      color: #666666;
    }
    p {
      .p-size(40px, 40px, 14px, left, 20px, #ed3025);
      span {
        display: inline-block;
        width: 100px;
        color: #666666;
      }
      .left65 {
        margin-left: 65px !important;
      }
    }
  }
}
.content {
  margin-top: 20px;
  .left {
    float: left;
    border-top: 5px solid #ed3025;
  }
  .right {
    width: 985px;
    // height: 504px;
    float: left;
    margin-left: 20px;
    background: white;
    border: 1px solid #e0e0e0;
  }
}
.ant-menu-item-selected {
  color: #ed3025;
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  border-left: 2px solid #ed3025;
  background-color: #ffffff;
  color: #ed3025;
}
.left-menu:hover {
  color: #ed3025;
}
</style>