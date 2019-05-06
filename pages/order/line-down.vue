<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-content>
        <div class="stets">
          <a-steps :current="2">
            <a-step>
              <template slot="title">
                我的采购单
              </template>
              <span slot="description"></span>
            </a-step>
            <a-step title="采购单信息" />
            <a-step title="采购单完成" />
          </a-steps>
        </div>
        <div class="qr-code">
            <h2 v-if="type == 'zz'">您的订单已收到，请耐心等待客服审核！</h2>
            <h2 v-if="type == 'hdfk'">下单成功！</h2>
            <p><span class="title">订单号</span><span class="order-no bold">{{ orderno }}</span><span class="title">下单时间</span><span class="bold">{{ info.odate }}{{ info.otime }}</span></p>
            <p><span class="title">订单金额</span><span class="price">￥{{ info.payamt }}</span><span class="title">支付方式</span><span class="bold">{{ type == 'zz' ? '线下支付' : '线下到付' }}</span></p>
        </div>
        <div class="invo-box" v-if="type == 'zz'">
            <img src="../../assets/img/invo.jpg" alt="">
        </div>
        <div class="invo-text" v-if="type == 'zz'">
            <p class="invo-title"><span class="text">转账说明</span></p>
            <p class="invo-content"><span class="circle"></span>请您在汇款时备注药帮忙订单编号，这将会很大程度上缩短我们的核款时间并能尽快为您安排发货。</p>
            <p class="invo-content"><span class="circle"></span>请于24小时内汇款并确保汇款金额与订单总金额一致，到账时间为1-3个工作日。</p>
            <p class="invo-content"><span class="circle"></span>从下单之日起5天内如果还未付款并到账，系统将自动取消该订单。</p>
            <p class="invo-content"><span class="circle"></span>我们将在收到款项后及时确认收款并安排发货，若款项汇出2天后未帮您收款确认，请及时拨打底部客服热线。</p>
        </div>
        <p class="order-detail">
          <a-button
            type="primary"
            class="order-detail-btn"
            @click="toOrderDetail()"
          >订单详情</a-button>
          <span class="keep-shoping" @click="toIndex()">继续逛逛</span>
        </p>
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
     payamt: '',
     info: {}
    };
  },
  mounted() {
    this.type = this.$route.query.type
    this.orderno = this.$route.query.orderno
    this.getPayResult()
  },
  methods: {
    // 获取订单详情
    getPayResult() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "getPayResult";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        compid: this.storeInfo.comp.storeId
      })
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "orderServer" + Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.info = result.data
            }
          }
        )
      );
    },
    toOrderDetail() {
      this.$router.push({
        path: "/user/order-detail",
        query: {
          orderno: this.orderno,
          cusno: this.storeInfo.comp.storeId
        }
      });
    },
    toIndex() {
      this.$router.push({
        path: "/"
      });
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
    .container-size(block,1190px,227px,0 auto,0px);
    border:1px solid #e0e0e0;
    margin-bottom: 20px;
    padding-top: 30px;
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
h2{
    text-align: center;
    color: #ed2f26;
}
p{
    height: 50px;
    line-height: 50px;
    padding-left: 50px;
    font-size: 16px;
    .price{
        display: inline-block;
        width: 180px;
        text-align: left;
        font-weight: bold;
        color: #ed2f26;
    }
    .bold{
        display: inline-block;
        width: 180px;
        font-weight: bold;
        color: #333333;
    }
    .order-no{
          display: inline-block;
        width: 180px;
    }
    .title{
        display: inline-block;
        width: 80px;
        text-align: left;
    }
}
}
.stets{
  .container-size(block, 600px, 100px, 0 auto, 0);
  margin-top: 30px;
}
.invo-box{
    .container-size(block,1190px,500px,0 auto,0px);
    img{
        display: block;
        width: 977px;
        height: 483px;
        margin: 0 auto;
    }
}
.invo-text{
   .container-size(block,977px,250px,0 auto,0px);
   margin-bottom: 20px;
   .invo-title{
       .p-size(50px, 30px, 20px, left, 27px, #ed2f26);
       font-weight: bold;
       .text{
            display: inline-block;
            width: 135px;
            height:30px;
            margin-bottom: 10px;
            border-left: 2px solid #ed2f26;
            text-align:left;
            text-indent: 10px;
       }
   }
   .invo-content{
       .position(relative,0px,0px);
       .p-size(50px, 50px, 18px, left, 27px, #666666);
       padding-left: 30px;
       .circle{
           .position(absolute,16px,30px);
           width: 20px;
           height: 20px;
           border-radius: 50%;
           background: pink;
       }
   }
   .order-detail {
    .p-size(60px, 60px, 16px, center, 0px, #666666);
    .order-detail-btn {
      .button-size(150px, 45px, 45px, 16px, 0px, 5px);
      .button-color(1px solid transparent, #ed2f26, #ffffff);
    }
    span {
      margin-left: 30px;
      color: #3189f5;
    }
  }
}
</style>
