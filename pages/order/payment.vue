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
                  人民币：9527元
              </p>
              <img src="" alt="" class="payment-pic">
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
  data() {
    return {
     value: 1
    };
  },
  methods: {
      // 监听单选框的值发生变化
    onChange (e) {
      console.log(e)
    },
    toPayment() {
        this.$router.push({
        path: '/order/payment'
      })
    },
    toSuccess() {
        this.$router.push({
            path: '/order/pay-complete'
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
}
</style>
