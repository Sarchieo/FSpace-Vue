<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content class="base">
        <a-breadcrumb separator=">" class="crumbs">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>我的一块</a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 头部内容 -->
        <div class="header-personal">
          <div class="left">
            <p>
              <a-icon type="profile"/>
              {{ storeInfo.comp.storeName }}
            </p>
            <p>
              <a-icon type="environment"/>
              {{ storeInfo.comp.addressCodeStr }} {{storeInfo.comp.address}}
            </p>
            <p>
              <a-icon type="mobile"/>
              {{ storeInfo.phone }}
            </p>
            <p>
              <a-icon type="team" />
              会员等级:
              {{ gradeNumber }}
            </p>
          </div>
          <div class="right">
            <!-- <p class="right-title">优惠信息</p> -->
            <p>
              <span>优惠券</span>{{ countList[0] }}
            </p>
            <p>
              <span>积分</span>{{ countList[1] }}
            </p>
            <p>
              <span>余额</span>{{ balamt }}
            </p>
          </div>
          <div class="order-info">
            <!-- <p class="order-title">订单信息</p> -->
            <p>
              <span>待付款</span>{{ countList[2] }}张
              <span class="left65">待评价</span> {{ countList[5] }}单
            </p>
            <p>
              <span>待发货</span>{{ countList[3] }}单
              <span class="left65">退货</span> {{ countList[6] }}单
            </p>
            <p>
              <span>待收货</span>{{ countList[4]  }}单
            </p>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <a-menu
              :selectedKeys="[selectedKeys]"
              style="width: 194px;height:500px;"
              mode="vertical"
              @click="handleClick"
            >
              <a-menu-item key="/user/personal" class="left-menu">
                <a-icon type="mail"/>我的药店
              </a-menu-item>
              <a-menu-item key="/user/personal/myorder" class="left-menu">
                <a-icon type="mail"/>我的订单
              </a-menu-item>
              <a-menu-item key="/user/personal/invoice" class="left-menu">
                <a-icon type="calendar"/>我的发票
              </a-menu-item>
              <a-menu-item key="/user/personal/receiver" class="left-menu">
                <a-icon type="mail"/>我的收货人
              </a-menu-item>
              <a-menu-item key="/user/personal/collection" class="left-menu">
                <a-icon type="calendar"/>我的收藏
              </a-menu-item>
              <a-menu-item key="/user/personal/footprint" class="left-menu">
                <a-icon type="calendar"/>我的足迹
              </a-menu-item>
              <a-menu-item key="/user/personal/coupon" class="left-menu">
                <a-icon type="calendar"/>我的优惠券
              </a-menu-item>
              <a-menu-item key="/user/personal/integral" class="left-menu">
                <a-icon type="calendar"/>我的积分
              </a-menu-item>
              <a-menu-item key="/user/personal/information" class="left-menu">
                <a-icon type="calendar"/>我的消息
              </a-menu-item>
              <a-menu-item key="/user/personal/service" class="left-menu">
                <a-icon type="calendar"/>售后记录
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
  middleware: "personal",
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
          if (result.code == 200) {
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
          if (result.code == 200) {
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
          if (result.code == 200) {
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
    // height: 1022px;
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