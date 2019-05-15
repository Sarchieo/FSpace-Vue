<template>
  <div class="privacy-box">
      <h2>常见问题</h2>
      <p class="title">一、账户指引</p>
      <p class="content">1.忘记密码，如何处理？</p>
      <p>您好，您在登录页面点击“忘记密码”，系统会给您发送一条验证码，您输入“验证码”后即可重新设置新的密码</p>
      <p class="content">2.如何修改注册手机号？</p>
      <p>您好，您可登陆平台进入我的一块，在我的药店页面手机绑定栏点击修改，通过手机验证后即可修改注册手机。</p>
      <p class="content">3.在哪里领取优惠券？</p>
      <p>您好，平台会不定期有优惠券领取活动，您可进入领券中心领取优惠券；针对部分商品发放的优惠券您可在浏览商品详情页中领取；也可以在积分兑换页面兑换相应的优惠券；领取成功后可在“我的优惠券”中查看领取明细。</p>
      <p class="content">4.余额是如何使用的？</p>
      <p>您好，余额是一块医药用户在参加网站活动或购物后，根据一块医药平台所公示的情况给予的优惠。余额仅可在一块医药平台上使用，不可提取或兑换为现金。用户通过一块医药平台下单后，可用余额直接支付，具体可支付的额度以页面显示的最高可使用额度为准</p>
      <p class="title">二、资质指引</p>
      <p class="content">1.为何已注册成功却无法下单？</p>
      <p>您好，您注册成功后，需尽快将相关资质进行上传提交，我司工作人员审核通过后方可下单，详情可联系您的区域经理或咨询“一块医药”客服热线0731-88159987。</p>
      <p class="content">2.下单前药店必须提交的资料有哪些？</p>
      <p class="title">必须提交的资料：</p>
      <p class="detail">(1)《营业执照》（必须三证合一，即印有“统一社会信用代码”字样）</p>
      <p class="detail">(2)《药品经营许可证》（最新正本或副本及变更记录页）</p>
      <p class="detail">(3)《药品经营质量管理规范》（GSP）认证证书</p>
      <p class="detail">(4)开票信息</p>
      <p class="detail">备注：以上资料必须是清晰完整复印件并加盖客户鲜章。</p>
      <p class="title">三、订单问题</p>
      <p class="content">1.未支付的订单保留多久后会自动取消？</p>
      <p>您好，支付渠道为“在线支付”，则订单会保留30分钟；支付渠道为“线下转账”，则订单会保留1小时。 为避免订单自动取消，建议您提交订单后及时支付。</p>
      <p class="content">2.下单后，多长时间可以收到货？</p>
      <p>您好，一块医药收到订单后会及时发货，会根据您所在区域的配送周期送货。详情可咨询：一块医药客服热线0731-88159987。</p>
      <p class="content">3.如何查询物流信息？</p>
      <p>您好，您可登录官网，在"我的订单"中查询您对应订单的配送信息。</p>
      <p class="content">4.你们都发什么快递呢？</p>
      <p>您好，自配区域订单会由司机给您安排配送，非自配区域会安排顺丰、邮政、德邦等快递配送，为了让您更快收到货品，系统会在您完成下单后，安排最优配送方式，具体以您实际收到的配送方式为准。</p>
  </div>
</template>
<script>
import * as types from '../../../store/mutation-types'
export default {
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
     
    };
  },
  mounted() {
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.privacy-box{
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








