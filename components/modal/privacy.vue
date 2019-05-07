<template>
  <a-modal
    title="用户隐私协议"
    cancelText="取消"
    okText="确定"
    width="1190px"
    v-model="isPrivacy"
    @cancel="handleCancelPrivacy"
  >
    <div class="privacy-box">
      <h2>用户注册及隐私协议</h2>
      <p class="content">欢迎访问一块医药！</p>
      <p
        class="content"
      >本网站（www.onekdrug.com）由一块医药（以下简称“我们”）运营并提供各种支持，对访问者隐私权的保护作出以下声明（以下简称“隐私声明”或“本声明”）。本隐私声明适用于本网站的所有相关服务。在同意一块医药服务协议（“协议”）之时，您已经同意我们按照本隐私声明来使用和披露您的个人信息。本隐私声明的全部条款属于该协议的一部份。</p>
      <p class="title">一、注意事项</p>
      <p class="content">1、如果您未满18周岁，您无权单独使用本网站服务，您只能在父母或其他法定监护人的陪同下才可以提供您的个人信息和使用本网站服务。</p>
      <p class="title">二、用户名和密码</p>
      <p class="content">1、您申请注册会员时，本网站将要求您选择一个手机号和密码，以便在您丢失密码后，本网站可以据此确认您的身份，帮助您找回密码。</p>
      <p
        class="content"
      >2、您只能通过您的密码来使用您的帐号。如果您忘记或丢失了密码或者您的个人识别信息，将可能危及您的帐号安全，并可能对您的人身和财产安全造成不利后果。因此，无论任何原因危及您的密码安全，您应该立即通过本网站官方客服热线或在线客服与本网站取得联系，以便本网站及时帮助您冻结账号和找回密码。</p>
      <p class="title">三、信息的使用</p>
      <p
        class="content"
      >1、除本声明另有规定的情况外，本网站不会向任何无关第三方提供、披露、出售、出租、分享和交易您的个人信息，但为方便您使用本网站的服务及本公司的关联公司或其他组织的服务（以下称“其他服务”），您在此同意并授权本网站将您的个人信息传递给您同时接受其他服务的我本公司的关联公司或其他组织，或从为您提供其他服务的本公司的关联公司或其他组织处获取您的个人信息。</p>
      <p class="content">2、我们可能会利用我们获取的顾客信息：</p>
      <p class="detail">（1）● 向您提供所需要的产品或服务（如，定向采购、货物配送）</p>
      <p class="detail">（2）● 处理和收取款项</p>
      <p class="detail">（3）● 就您的要求向您提供咨询服务，或向您做出回应或与您沟通</p>
      <p class="detail">（4）● 向您提供我们认为您可能会感兴趣的产品或服务</p>
      <p class="detail">（5）● 为提升我们的服务，联系您进行调研</p>
      <p class="detail">（6）● 管理或认可您参加各种活动的资格，如线上或线下活动、优惠或促销活动</p>
      <p class="detail">（7）● 在事先获得您同意的情况下，向您指定的联系人发送信息</p>
      <p class="detail">（8）● 防止各种违法或犯罪活动和其他法律责任</p>
      <p class="detail">（9）● 遵守法律规定和我们的政策规则</p>
      <p class="content">3、在访问任何所链接的网站时查看该等隐私政策或声明。对于非由我们运营之任何网站的内容、对该等网站的任何使用或该等网站的隐私政策，我们概不负责。</p>
      <p class="title">四、在中国法律允许的范围内，我们可能会不时更新本《隐私声明》，恕不提前通知。我们将在本网站上醒目位置发布公告，告知您我们《隐私声明》的任何重大变动。</p>
      <p class="title">五、如果您对本隐私声明或隐私保护措施以及您在使用中的问题有任何意见和建议请和我们联系。</p>
    </div>
  </a-modal>
</template>
<script>
export default {
  name: "f-space-privacy",
  props: ["isPrivacy"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleCancelPrivacy() {
      this.$emit("handleCancelPrivacy");
    }
  }
};
</script>
<style scoped lang="less">
.privacy-box {
  height: 600px;
  overflow: auto;
}
h2 {
  text-align: center;
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

