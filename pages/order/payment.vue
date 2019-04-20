<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-content>
          <div class="payment-header">
              第三方支付
          </div>
          <div class="qr-code">
              <p class="scan">
                  扫一扫付款
              </p>
              <p class="pay-num">
                  人民币：{{ payamt }}元
              </p>
              <img :src="url" alt="" class="payment-pic">
              <!-- <a-button type="primary" class="cancel-btn">取消支付</a-button> -->
              <p class="p-btn"><a-button type="primary" @click="toSuccess()">我已付款成功,下一步</a-button></p>
          </div>
          <button @click="toSuccess()">下单成功</button>
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
     payamt: ''
    };
  },
  mounted() {
    this.url = this.$route.query.url
    this.payamt = this.$route.query.payamt
    this.orderno = this.$route.query.orderno
    this.payResult()
  },
  methods: {
    payResult() {
      let _this = this
      let ice_callback = new Ice.Class(inf.PushMessageClient, {
        receive: function(message, current) {
          let result = JSON.parse(message)
          if(result.event == 1 && result.body.tradeStatus == 1) {
            _this.$router.push({
              path: '/order/pay-complete',
              query: {
                orderno: result.body.orderNo
              }
            })
          } else {
            _this.$message.error('订单支付异常')
          }
        }
      })
      this.$initIceLong('orderServer', this.storeInfo.storeId, new ice_callback());
    },
      // 监听单选框的值发生变化
    onChange (e) {
      console.log(e)
    },
    toSuccess() {
      this.$router.push({
        path: '/order/pay-complete',
        query: {
          orderno: this.orderno
        }
      })
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
.payment-header{
    .container-size(block,100%,100px,0,0px);
    text-align: center;
    line-height: 100px;
    font-size: 20px;
    color: #333333;
    font-weight: bold;
}
.qr-code{
    .container-size(block,1000px,500px,0 auto,0px);
    padding: 70px 350px;
    border:1px solid #e0e0e0;
    margin-bottom: 20px;
    .scan{
        text-align: center;
        margin-bottom: 20px;
        font-size: 16px;
    }
    .pay-num{
        .p-size(50px, 50px, 18px, center, 0px, #ed2f26);
        margin-bottom: 20px;
        font-weight: bold;
    }
    .payment-pic{
         .container-size(block,220px,220px,0 auto,0px);
         background: pink;
    }
    .p-btn{
  width: 100%;
  padding: 0px 20%;
  button{
    border-radius: 3px;
   -moz-border-radius:3px;
   -webkit-border-radius:3px;
  }
  .cancel-btn{
  float: left;
  border: none;
  background: #999999;
  color: #333333;
}
}
}
</style>
