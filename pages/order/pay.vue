<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
          <div class="pay-info">
              <p class="pay-text">订单提交成功，请尽快付款！订单号：<span>{{ orderno }}</span></p>
              <p class="urge">请您在1小时内完成支付，否则订单会被自动取消。</p>
              <div class="actual-pay">
                  <span>实付：</span> ￥ {{ payamt }}元
              </div>
          </div>
          <div class="pay-type">
              <p class="pay-title">请选择支付方式</p>
              <div class="pay-pick">
                  <p>
                    <a-radio-group @change="onChange" v-model="value">
                      <a-radio :value="1"><a-icon type="alipay-circle" class="blue"/></a-radio>
                      <a-radio :value="2"><a-icon type="wechat" class="green"/></a-radio>
                    </a-radio-group>
                  </p>
              </div>
          </div>
          <div class="pay-btn">
              <p class="btn-box">
                  <a-button type="primary" @click="prePay()">立即支付</a-button>
              </p>
              <p class="surplus-time">剩余付款时间：<span>{{ h }}</span>小时<span>{{ m }}</span>分钟<span>{{ s }}</span>秒</p>
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
     orderno: '',
     isPay: false
    };
  },
  mounted() {
    this.orderno = this.$route.query.orderno
    this.showPayInfo()
  },
  methods: {
    showPayInfo() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "showPayInfo";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        compid: this.storeInfo.storeId
      });
      debugger
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        "orderServer" + Math.floor((this.storeInfo.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            debugger
            if (result.code === 200) {
              _this.payamt = result.data.payamt
              _this.isPay = true
              _this.secondKill(
              _this.stringToDate(result.data.now),
                result.data.otime
              );
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {
            debugger;
          }
        )
      );
    },
    prePay() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "prePay";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        compid: this.storeInfo.storeId,
        paytype: "alipay"
      });
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        "orderServer" + Math.floor((this.storeInfo.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.$router.push({
                path: '/order/payment',
                query: {
                  url: result.data,
                  payamt: _this.payamt
                }
              })
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {
            debugger;
          }
        )
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
      let times = Math.floor((endDate - date)/1000);
      let _this = this;
      if (times >= 0) {
        let timer;
        timer = setInterval(function() {
          times --;
          _this.h = Math.floor(times/60/60);
          _this.m = Math.floor(times/60)%60;
          _this.s = times%60;
          if (times <= 0) {
            clearInterval(timer);
            _this.isPay = false
          }
        }, 1000);
        if (times >= 0) {
          _this.isPay = true
        } else {
          _this.isPay = false
        }
      }
    },
      // 监听单选框的值发生变化
    onChange (e) {
      console.log(e)
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
.pay-info{
  .container-size(block,1190px,120px,0 auto,0px);
  border: 1px solid #e0e0e0;
  padding:30px;
  margin-bottom: 20px;
  .pay-text{
      display:inline-block;
      width: 600px;
      .p-size(30px,30px,16px,left,0px,#333333);
      span{
          color: #ed2f26;
      }
  }
  .urge{
      display:inline-block;
      width: 600px;
      .p-size(30px,30px,14px,left,0px,#999999);
  }
  .actual-pay{
      .container-size(inline-block,300px,50px,0 auto,0px);
      float:right;
      text-align: right;
      font-size: 16px;
      color: #ed2f26;
      span{
          color: #333333;
      }
  }
}
.pay-type{
  .container-size(block,1190px,175px,0 auto,0px);
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
  .pay-title{
      .p-size(50px,50px,18px,left,30px,#666666);
      background: #e0e0e0;
  }
  .pay-pick{
    .container-size(block,1190px,125px,0 auto,0px);
    p{
        .p-size(125px,125px,18px,left,0px,#666666);
        padding-left: 30px;
        i{
            text-align: left;
            font-size: 30px;
        }
    }
  }
}
.pay-btn{
    .container-size(block,1190px,140px,0 auto,0px);
    padding-top: 35px;
    .btn-box{
        .p-size(50px,50px,16px,right,0px,#666666);
        padding-left: 990px;
      button{
        display: block;
        .button-size(200px,50px,50px,16px,0px,5px);
        .button-color(1px solid transparent,#ed2f26,#ffffff);
      }
    }
}
.blue{
    margin-right: 40px;
    color: #3189f5;
}
.green{
    color: #09BB07;
}
.surplus-time{
    display: block;
    .p-size(40px,40px,16px,right,0px,#666666);
}
</style>
