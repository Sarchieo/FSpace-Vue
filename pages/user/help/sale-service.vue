<template>
  <div class="privacy-box">
    <p class="title">一、售后问题</p>
    <p class="content">1.不小心买错药品了，该如何取消订单？</p>
    <p class="content">您好，”线上即付“、线下即付”的订单在”待付款”状态前可通过“我的订单”自行取消订单，在“待发货”状态前可致电一块医药平台客服取消订单；“线下到付”提交订单30分钟内可自行取消订单，超时指点一块医药平台客服取消订单；“配送中”、“已签收”、“交易完成”的订单可通过一块医药平台“我的订单”中自行提交退货申请。</p>
    <p class="content">2.收货后，商品数量不对或商品有破损或缺陷，如何处理？</p>
    <p class="content">您好，您可登陆平台进入我的一块，在我的药店页面手机绑定栏点击修改，通过手机验证后即可修改注册手机。</p>
    <p class="content">3.如何办理退货？</p>
    <p class="content">在符合我司无忧售后政策下，您可在一块医药平台“我的订单”中自行发起退货需求，我司会由售后客服24小时内与您取得联系。详情可咨询：一块医药客服或热线0731-88159987。</p>
    <p class="content">4.怎么验明药品真伪呢？</p>
    <p class="content">请您放心，一块医药承诺所有出售商品都是正规渠道进货，保证正品，并且都是带票销售。您可以在国家食品药品监管局网站数据查询界面输入药品批准文号查询真伪，也可联系平台客服为您提供质检报告。</p>
    <p class="content">5.为什么收到的产品包装跟我在平台上看到的不一样？</p>
    <p class="content">您好，由于产品包装会有更替，网站上未能及时更新，真的很抱歉。但是您放心，我们网站的商品都是正规渠道进货，如只是外包装不同，其功能不受影响。正品有保证。详情可咨询：一块医药客服热线0731-88159987。</p>
    <p class="title">其他问题</p>
    <p class="content">1.如何查看品种的批号？</p>
    <p class="content">在商品详情页有近效期和远效期供您参考，您下单后我们物流中心会根据产品先进先出原则出库。且近效期半年内的商品，平台会在商品详情页标注提醒顾客。请您放心购买。</p>
    <p class="content">2.我想采购的药品，但你们平台没有，该如果反馈？</p>
    <p class="content">您可致电一块医药客服热线0731-88159987反馈您想要采购的商品到平台，我司会定期针对您反馈的商品进行跟进，丰富商城品类。</p>
  </div>
</template>
<script>
import * as types from "../../../store/mutation-types";
export default {
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.privacy-box {
  padding: 20px;
}
h2 {
  text-align: center;
  margin-bottom: 30px;
}
p {
  margin-bottom: 10px;
  text-indent: 30px;
}
.title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.content {
  font-size: 14px;
  color: #666666;
}
.detail {
  text-indent: 42px !important;
}
</style>








