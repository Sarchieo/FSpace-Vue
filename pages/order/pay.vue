<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="stets">
          <a-steps :current="2">
            <a-step>
              <template slot="title">我的采购单</template>
              <span slot="description"></span>
            </a-step>
            <a-step title="采购单信息"/>
            <a-step title="订单付款"/>
            <a-step title="订单完成"/>
          </a-steps>
        </div>
        <div>
          <div class="pay-info">
            <p class="pay-text">
              订单号：
              <span>{{ orderno }}</span>
            </p>

            <p class="actual-pay">
              <span>实付金额:</span>
              ￥ {{ payamt }}元
            </p>
            <p class="invo-p">
              <span>发票信息：</span> 普通发票
            </p>
            <p class="time-p">
              <span>下单时间：{{payInfo.odate}} {{payInfo.otime}}</span>
            </p>
          </div>
          <div class="pay-type">
            <p class="pay-title">请选择支付方式</p>
            <div class="pay-pick">
              <p>
                <a-radio-group v-model="value">
                  <a-radio :value="1">
                    <a-icon type="alipay-circle" class="blue"/>
                  </a-radio>
                  <a-radio :value="2">
                    <a-icon type="wechat" class="green"/>
                  </a-radio>
                  <a-radio :value="3" class="line-down">线下即付</a-radio>
                  <a-radio :value="4" class="line-down">线下到付</a-radio>
                </a-radio-group>
              </p>
            </div>
          </div>
          <div class="pay-btn">
            <p class="btn-box">
              <a-button
                :disabled="!isPay"
                type="primary"
                @click="prePay()"
                v-if="this.value == 1 || this.value == 2"
              >立即支付</a-button>
              <a-button
                :disabled="!isPay"
                type="primary"
                @click="offlinePay('4')"
                v-if="this.value == 3"
              >立即支付</a-button>
              <a-button
                :disabled="!isPay"
                type="primary"
                @click="offlinePay('5')"
                v-if="this.value == 4"
              >确定购买</a-button>
            </p>
            <p class="surplus-time">
              剩余付款时间：
              <span>{{ h }}</span>小时
              <span>{{ m }}</span>分钟
              <span>{{ s }}</span>秒
            </p>
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
      value: 1,
      payamt: 0,
      h: 0,
      m: 0,
      s: 0,
      orderno: "",
      isPay: false,
      payInfo: {}
    };
  },
  mounted() {
    this.orderno = this.$route.query.orderno;
    this.showPayInfo();
    this.$router.beforeEach((to, from, next) => {
      
    })
  },
  methods: {
    showPayInfo() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "showPayInfo";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
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
            _this.payInfo = result.data;
            // 余额完全支付
            if (result.data.balflag == 1) {
              _this.balAllPay();
            } else {
              _this.payamt = result.data.payamt;
              _this.isPay = true;
              _this.secondKill(
                _this.stringToDate(result.data.now),
                result.data.otime
              );
            }
          }
        })
      );
    },
    balAllPay() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "balAllPay";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
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
            _this.$router.push({
              path: "/order/pay-complete",
              query: {
                orderno: _this.orderno
              }
            });
          }
        })
      );
    },
    // 线上支付
    prePay() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "prePay";
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
          if (result.code == 200) {
            _this.$router.push({
              path: "/order/payment",
              query: {
                url: result.data,
                payamt: _this.payamt,
                orderno: _this.orderno
              }
            });
          }
        })
      );
    },
    // 线下
    offlinePay(type) {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "offlinePay";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        compid: this.storeInfo.comp.storeId,
        paytype: type
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.$router.push({
              path: "/order/line-down",
              query: {
                type: type,
                orderno: _this.orderno
              }
            });
          }
        })
      );
    },
    stringToDate(str) {
      var tempStrs = str.split(" ");
      var dateStrs = tempStrs[0].split("-");
      var year = parseInt(dateStrs[0], 10);
      var month = parseInt(dateStrs[1], 10) - 1;
      var day = parseInt(dateStrs[2], 10);
      var timeStrs = tempStrs[1].split(":");
      var hour = parseInt(timeStrs[0], 10);
      var minute = parseInt(timeStrs[1], 10);
      var second = parseInt(timeStrs[2], 10);
      var date = new Date(year, month, day, hour, minute, second);
      return date;
    },
    // 设置倒计时
    secondKill(date, eDate) {
      let endDate = this.stringToDate(
        date.getFullYear() +
          "-" +
          (Number(date.getMonth()) + 1) +
          "-" +
          date.getDate() +
          " " +
          eDate
      );
      let times = Math.floor((endDate - date) / 1000) + 1800;
      let _this = this;
      if (times >= 0) {
        let timer;
        timer = setInterval(function() {
          times--;
          _this.h = Math.floor(times / 60 / 60);
          _this.m = Math.floor(times / 60) % 60;
          _this.s = times % 60;
          if (times <= 0) {
            clearInterval(timer);
            _this.isPay = false;
          }
        }, 1000);
        if (times >= 0) {
          _this.isPay = true;
        } else {
          _this.isPay = false;
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
* {
  margin: 0;
}
a {
  text-decoration: none;
  color: #000000;
}
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
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
.pay-explain {
  .container-size(block, 1190px, 60px, 0 auto, 0px);
  line-height: 60px;
  background: #f2f2f2;
  text-align: center;
  font-size: 20px;
  color: #666;
}
.pay-info {
  .container-size(block, 1190px, 120px, 0 auto, 0px);
  border: 1px solid #e0e0e0;
  padding: 20px;
  padding-left: 30px;
  margin-bottom: 20px;
  .invo-p,.time-p{
    float: left;
    width: 300px;
    font-size: 16px;
    color: #333;
  }
  .pay-text {
    display: inline-block;
    float: left;
    width: 300px;
    .p-size(30px, 30px, 16px, left, 0px, #333333);
    span {
      color: #ed2f26;
    }
  }
  .urge {
    display: inline-block;
    width: 600px;
    .p-size(30px, 30px, 14px, left, 0px, #999999);
  }
  .actual-pay {
    .container-size(inline-block, 800px, 30px, 0 auto, 0px);
    float: left;
    line-height: 30px;
    text-align: left;
    font-size: 16px;
    color: #ed2f26;
    span {
      color: #333333;
    }
  }
}
.pay-type {
  .container-size(block, 1190px, 175px, 0 auto, 0px);
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
  .pay-title {
    .p-size(50px, 50px, 18px, left, 30px, #666666);
    background: #e0e0e0;
  }
  .pay-pick {
    .container-size(block, 1190px, 125px, 0 auto, 0px);
    p {
      .p-size(125px, 125px, 18px, left, 0px, #666666);
      padding-left: 30px;
      i {
        text-align: left;
        font-size: 30px;
      }
    }
  }
}
.pay-btn {
  .container-size(block, 1190px, 140px, 0 auto, 0px);
  padding-top: 35px;
  .btn-box {
    .p-size(50px, 50px, 16px, right, 0px, #666666);
    padding-left: 990px;
    button {
      display: block;
      .button-size(200px, 50px, 50px, 16px, 0px, 5px);
      .button-color(1px solid transparent, #ed2f26, #ffffff);
    }
  }
}
.blue {
  margin-right: 40px;
  color: #3189f5;
}
.green {
  color: #09bb07;
}
.surplus-time {
  display: block;
  .p-size(40px, 40px, 16px, right, 0px, #666666);
}
.stets {
  .container-size(block, 600px, 100px, 0 auto, 0);
  margin-top: 30px;
}
.line-down {
  margin-left: 30px;
}
</style>
