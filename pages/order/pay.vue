<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
          <div class="pay-info">
              <p class="pay-text">订单提交成功，请尽快付款！订单号：<span>20100418007</span></p>
              <p class="urge">请您在1小时内完成支付，否则订单会被自动取消。</p>
              <div class="actual-pay">
                  <span>实付：</span> ￥ 35元
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
                  <a-button type="primary" :size="size" @click="toPayment()">立即支付</a-button>
              </p>
              <p class="surplus-time">剩余付款时间：<span>1</span>小时<span>23</span>分钟<span>59</span>秒</p>
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
