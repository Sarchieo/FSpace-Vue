<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <div class="inte-coupon">
        <div class="coupon-header"></div>
        <div class="sign-in">
          <p class="keep-sign">
            <!-- accupoints -->
            <span class="inte-total">当前累计积分：{{integralNumber}}</span>
            <!-- times -->
            <span class="keep-text">{{ signDays.times }}</span>
          </p>
          <!-- 根据签到状态循环不同图片 -->
          <div class="sign-pic">
            <div v-for="(item,index) in signDays.dates" :key="index">
              <!-- 已签到图片 -->
              <img v-if="item.status == 1" src="../../assets/img/jifen-signed.png" alt>
              <!-- 未签到图片 -->
              <img v-else src="../../assets/img/jifen-unsigned.png" alt>
              <!-- dates日期 -->
              <span>{{item.date}}</span>
            </div>
            <!-- <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-unsigned.png" alt>
              <span>04.23</span>
            </div>-->
          </div>
          <p class="img-btn">
            <img src="../../assets/img/jifen-imme.png" alt @click="signIn()">
          </p>
          <!-- 6746 -->
          <!-- <p class="moon-data"> <span>4.23</span><span>4.24</span><span>4.25</span><span>4.26</span><span>4.27</span><span>4.28</span><span>4.29</span></p> -->
          <div class="coupon-box">
            <p v-if="exchangeList.length == 0" class="no-data">暂无优惠券！</p>
            <div
              class="coupon-card"
              v-for="(item,index) in exchangeList"
              :key="index"
              @click="receiveCoupon(item)"
            >
              <div class="coupon-left" v-if="item.brulecode == 2110">
                <div v-for="(items,index1) in item.ladderVOS" :key="index1">
                  <p class="coupon-type">
                    <span class="float-left">{{item.rulename}}</span>
                    <span class="float-right">永久有效</span>
                  </p>
                  <span class="fuhao">￥</span>
                  <span class="offer">{{items.offer}}</span>
                  <span class="text">无门槛通用券</span>
                  <p class="every-text">选购商城任意商品可使用</p>
                  <p class="counts">
                    <span class="jifen">{{items.offer*1000}}</span>
                    <span class="exchange">积分兑换</span>
                  </p>
                </div>
              </div>
              <div class="coupon-left" v-if="item.brulecode == 2120">
                <div
                  v-for="(items,index1) in item.ladderVOS"
                  :key="index1"
                  @click="receiveCoupon(item)"
                >
                  <p class="coupon-type">
                    <span class="float-left">{{item.rulename}}</span>
                    <span class="float-right">永久有效</span>
                  </p>
                  <span class="fuhao">￥</span>
                  <span class="offer">{{items.offer}}</span>
                  <span class="text">无门槛通用券</span>
                  <p class="every-text">邮费根据系统计算自动得出</p>
                  <p class="counts">
                    <span class="jifen">{{items.offer*1000}}</span>
                    <span class="exchange">积分兑换</span>
                  </p>
                </div>
              </div>
              <div class="coupon-right">
                <img class="state-pic" src="../../assets/img/imme.png" alt>
              </div>
            </div>
          </div>
          <div class="whole-coupon" id="navBar">
            <p class="title">领券中心</p>
            <div class="whole-box">
              <p v-if="couponPub.length == 0" class="no-data">暂无优惠券！</p>
              <div
                class="coupon-boxs"
                v-for="(item, index) in couponPub"
                :key="index"
                @click="revCoupon(item)"
              >
                <div class="discount" v-if="item.brulecode == 2130">
                  <p class="discount-count">{{ item.rulename }}</p>
                  <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">
                    满
                    <span>{{ j.ladamt }}</span> 打
                    <span>{{ j.offer/10}}</span>折
                  </p>
                  <p class="validity">有效期:{{item.validday}}天</p>
                </div>
                <div class="discount" v-if="item.brulecode == 2110">
                  <p class="discount-count">{{ item.rulename }}</p>
                  <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">
                    满
                    <span>{{ j.ladamt }}</span> 减
                    <span>{{ j.offer}}</span>
                  </p>
                  <p class="validity">有效期:{{item.validday}}天</p>
                </div>
                <div class="discount" v-if="item.brulecode == 2120">
                  <p class="discount-count">{{ item.rulename }}</p>
                  <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">
                    满
                    <span>{{ j.ladamt }}</span>包邮
                  </p>
                  <p class="validity">有效期:{{item.validday}}天</p>
                </div>
                <img class="right-img" src="../../assets/img/receive.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div class="text-box"></div>
      </div>
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
  middleware: "authenticated",
  data() {
    return {
      couponPub: [], // 更多优惠券
      exchangeList: [],
      userIntergral: [],
      signNumber: 0, // 连续签到天数
      integralNumber: 0, // 累积积分
      signDays: [] // 日期数组
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollTop = Number(this.$route.query.scrollTop);
      this.toCouponScroll();
    });
    this.getIntegralNum();
    this.getMember();
    this.getQueryCouponExcgPub();
    this.queryCouponPub();
  },
  methods: {
    toCouponScroll() {
      if (this.scrollTop == 1) {
        document.body.scrollTop = document.documentElement.scrollTop = 2100;
      }
    },
    // 点击签到
    signIn() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "IntegralModule";
      iRequest.method = "signIn";
      // iRequest.param.pageIndex = 1;
      // iRequest.param.pageNumber = 20;
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.userIntergral = result.data;
            _this.getIntegralNum();
          }
        })
      );
    },
    // 获取签到天数以及日期。
    getIntegralNum() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "IntegralModule";
      iRequest.method = "getHisSignIn";
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.signNumber = result.data.times;
            result.data.dates = result.data.dates.reverse();
            _this.signDays = result.data;
          }
        })
      );
    },
    // 获取当前积分
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
            _this.integralNumber = result.data.accupoints;
          }
        })
      );
    },
    // 积分兑换优惠券
    getQueryCouponExcgPub() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "CouponManageModule";
      iRequest.method = "queryCouponExcgPub";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "discountServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.exchangeList = result.data;
          }
        })
      );
    },
    // 领取兑换券
    receiveCoupon(item) {
      item.compid = this.storeInfo.comp.storeId;
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "CouponManageModule";
      iRequest.method = "revExcgCoupon";
      iRequest.param.json = JSON.stringify(item);
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "discountServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.$message.success(result.message);
            this.getQueryCouponExcgPub();
          }
        })
      );
    },
    // 更多优惠券
    queryCouponPub() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponManageModule";
      iRequest.method = "queryCouponPub";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        gcode: -1,
        compid: _this.storeInfo.comp.storeId, // 企业id
        pageSize: 100,
        pageNo: 1
      });
      this.$refcallback(
        this,
        "discountServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.couponPub = result.data;
          }
        })
      );
    },
    // 领取优惠券
    revCoupon(item) {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "revCoupon";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify(item);
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.$message.success(result.message);
            _this.queryCouponPub();
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
.ant-layout {
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
  background: rgb(255, 255, 255);
  /* min-height: 1000px; */
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
  background: #ffffff;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.inte-coupon {
  .container-size(block, 100%, auto, 0 auto, 0px);
  background: url("../../assets/img/jifen-bg.png") no-repeat;
  background-size: 100% 100%;
  .coupon-header {
    .container-size(block, 100%, 718px, 0 auto, 0px);
    background: url("../../assets/img/jifen-banner.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 100px;
  }
  .sign-in {
    .container-size(block, 1255px, 2120px, 0 auto, 0px);
    padding-top: 160px;
    background: url("../../assets/img/bg1.png") no-repeat;
    margin-bottom: 75px;
    .keep-sign {
      width: 100%;
      .p-size(45px, 45px, 30px, center, 0px, #a04e3b);
      margin-bottom: 50px;
      .keep-text {
        float: right;
        width: 220px;
        height: 40px;
        margin-right: 235px;
        line-height: 22px;
        text-indent: 97px;
        background: url("../../assets/img/jifen-sign.png") no-repeat;
      }
      .inte-total {
        float: right;
        height: 40px;
        line-height: 22px;
        margin-right: 70px;
        font-size: 24px;
      }
    }
    .sign-pic {
      .container-size(inline-block, 100%, 100px, 0, 0px);
      text-align: center;
      margin-bottom: 50px;
      div {
        .container-size(inline-block, 38px, 80px, 0, 0px);
        margin-right: 40px;
        text-align: center;
        span {
          display: inline-block;
          width: 38px;
          text-align: center;
          margin-top: 20px;
        }
      }
      img {
        display: inline-block;
        margin-right: 50px;
      }
    }
    .img-btn {
      .p-size(75px, 75px, 16px, center, 0px, #a04e3b);
      margin-bottom: 100px;
      img {
        width: 300px;
        height: 100px;
      }
    }
    .img-btn img:hover {
      cursor: pointer;
    }
    .moon-data {
      width: 100%;
      .p-size(45px, 45px, 16px, center, 0px, #a04e3b);
      span {
        display: inline-block;
        width: 60px;
        margin-left: 18px;
        text-align: center;
      }
    }
    .coupon-box {
      .container-size(block, 845px, 661px, 0 auto, 0px);
      background: url("../../assets/img/jifen-coupon.png") no-repeat;
      background-size: 100% 78%;
      padding-top: 50px;
      padding-left: 25px;
      .coupon-card {
        display: inline-block;
        width: 340px;
        height: 190px;
        margin: 20px 20px 0px 30px;
      }
      .coupon-card:hover {
        cursor: pointer;
      }
      .coupon-left {
        float: left;
        width: 280px;
        height: 160px;
        border: 1px solid #fdddc5;
        background: #fffbf3;
        padding-bottom: 20px;
        .position(relative, 0px, 0px);
      }
      .coupon-type {
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #666666;
        margin-bottom: 5px;
        font-size: 16px;
        padding: 0px 15px;
        color: #ffffff;
      }
      .coupon-left span {
        color: #ffffff;
      }
      .coupon-left .fuhao {
        .position(absolute, 65px, 25px);
        font-size: 18px;
        font-weight: bold;
        color: #ed3025;
      }
      .coupon-left .offer {
        .position(absolute, 40px, 45px);
        font-size: 46px;
        font-weight: bold;
        color: #ed3025;
      }
      .coupon-left .text {
        .position(absolute, 55px, 105px);
        width: 108px;
        height: 38px;
        line-height: 38px;
        border: 1px solid transparent;
        border-radius: 3px;
        text-align: center;
        font-weight: bold;
        background: #feeada;
        color: #ed3025;
      }
      .coupon-left .every-text {
        .position(absolute, 120px, 0px);
        width: 100%;
        text-indent: 30px;
        color: #c2c3be;
      }
      .coupon-right {
        float: right;
        width: 60px;
        height: 160px;
      }
      .coupon-right img {
        width: 100%;
        height: 100%;
      }
      .post-span {
        margin-bottom: 30px;
      }
    }
  }
  .rule-box {
    .container-size(block, 1255px, 790px, 0 auto, 0px);
    background: url("../../assets/img/jifen-rule.png") no-repeat;
  }
}
.postage {
  left: 85px !important;
  top: 65px !important;
}
.whole-coupon {
  .container-size(block, 844px, 735px, 0 auto, 0px);
  border: 1px solid #ef6846;
  .title {
    .p-size(50px, 50px, 18px, left, 20px, #ffffff);
    background: #ef6846;
  }
  .whole-box {
    .container-size(block, 844px, auto, 0 auto, 0px);
    min-height: 215px;
    padding-top: 20px;
    padding-left: 50px;
    .coupon-boxs {
      .container-size(inline-block, 346px, auto, 0, 0px);
      min-height: 175px;
      margin-right: 40px;
      margin-bottom: 40px;
      .right-img {
        float: right;
        width: 55px;
        height: 175px;
      }
      .discount {
        float: left;
        .container-size(inline-block, 290px, 175px, 0, 0px);
        // .position(relative, 0px, 0px);
        border: 1px solid #fdddc5;
        background: #fffbf3;
        .state-pic {
          .position(relative, -46px, 176px);
        }
        .discount-count {
          .container-size(inline-block, 100%, 50px, 0, 0px);
          .p-size(40px, 40px, 20px, center, 0px, #ffffff);
          margin-bottom: 10px;
          background: #666666;
        }
        .discount-str {
          .position(absolute, 12px, 3px);
          font-size: 20px;
          color: #ed3025;
        }
        .discount-text {
          .container-size(inline-block, 100px, 20px, 0, 0px);
          .p-size(20px, 20px, 14px, left, 0px, #ed3025);
          .position(absolute, 20px, 105px);
        }
        .satisfy {
          display: inline-block;
          .p-size(30px, 30px, 14px, left, 0px, #ed3025);
          .position(absolute, 40px, 105px);
          .p-color(#fdf3e8, none, #ed3025);
          padding: 0 8px;
          box-sizing: border-box;
        }
        // p {
        //   .p-size(20px, 20px, 14px, left, 13px, #666666);
        // }
      }
    }
  }
}
.discount-coupon,
.validity {
  .p-size(30px, 30px, 14px, left, 20px, #666666);
}
.counts {
  .position(absolute, 165px, 0px);
  width: 100%;
  text-align: center;
  color: #333333 !important;
  .exchange {
    color: #a14e37 !important;
  }
  .jifen {
    font-size: 16px !important;
    color: #eea30d !important;
  }
}
.no-data {
  .p-size(50px, 50px, 18px, center, 0px, #333333);
}
.text-box {
  .container-size(block, 1255px, 780px, 0 auto, 0px);
  background: url("../../assets/img/jifen.png") no-repeat;
  margin-bottom: 50px;
}
</style>
