<template>
  <a-layout-footer class="footer">
    <div class="footer-message">
      <div class="footer-message-item">
        <p class="footer-message-p">客户服务</p>
        <div class="footer-message-box">
          <div class="footer-message-box-item">
            <a-icon type="smile"/>
            <p class="p-left">在线客服</p>
          </div>
          <div class="footer-message-box-item">
            <a-icon type="message"/>
            <p class="p-left">用户反馈</p>
          </div>
        </div>
      </div>
      <div class="footer-message-item">
        <p class="footer-message-p">一块医药公众号</p>
        <div class="footer-message-box width250">
          <img src="../../assets/img/u608.jpg">
          <p>扫描二维码</p>
          <p>关注一块医药</p>
          <p>微信公众号</p>
        </div>
      </div>
      <div class="footer-message-item">
        <p class="footer-message-p">一块物流公众号</p>
        <div class="footer-message-box width250">
          <img src="../../assets/img/u606.png">
          <p>扫描二维码</p>
          <p>关注一块物流</p>
          <p>微信公众号</p>
        </div>
      </div>
    </div>
    <div class="footer-box">
      <p>
        <a-icon type="safety-certificate" />
          正品保证
      </p>
      <p>
        <a-icon type="appstore" />
          品类丰富
      </p>
      <p>
        <a-icon type="heart"/>
          运输无忧
      </p>
    </div>
    <h4 class="footer-copyright">Copyright@2015-2019 一块医药v1.0.0.2019050601 湖南空间折叠互联网科技有限公司版权所有</h4>
  </a-layout-footer>
</template>
<script>
export default {
  name: "f-space-footer"
};
</script>
<style lang='less'>
.footer {
  background: #414141;
  border-top: 1px #000;
}
.footer-message {
  padding-left: 10%;
  padding-right: 10%;
  color: #000;
  height: 240px;
  background: white;
  border-top: 1px solid #f2f2f2;
}
.footer-message-item {
  text-align: center;
  float: left;
  width: 33.3%;
  font-size: 18px;
  color: black;
}
.footer-message-p {
  width: 100%;
  height: 100px;
  line-height: 100px;
}
.footer-message-box {
  height: 120px;
  // line-height: 120px;
}
.footer-message-box-item {
  display: inline-block;
  width: 90px;
  height: 100px;
  line-height: 80%;
  border: 0.5px solid #dddddd;
  padding-top: 5px;
}
.footer-message-box img {
  float: left;
  width: 100px;
  height: 100px;
  margin-left: 45px;
  // vertical-align: top;
}
.footer-message-box p {
  float: right;
  width: 150px;
  height: 35px;
  text-align: left;
  line-height: 35px;
  text-indent: 5px;
  // vertical-align: top;
}
.width250 {
  display: block;
  margin: 0 auto;
  width: 300px!important
}
.footer-message-box-item i {
  width: 50%;
  margin-top: 10%;
  margin-bottom: 10%;
  font-size: 40px;
}
.footer-box {
  padding-left: 10%;
  padding-right: 10%;
  text-align: center;
  margin: 0 auto;
  border-bottom: 1px solid #555555;
  height: 120px;
}
.footer-box p {
  float: left;
  width: 33.3%;
  font-size: 22px;
  color: white;
  height: 120px;
  line-height: 120px;
}
.footer p i {
  vertical-align: middle;
  font-size: 50px;
  color: white;
}
.footer-copyright {
  display: block;
  line-height: 50px;
  height: 50px;
  width: 1190px;
  margin: 0 auto;
  text-align: center;
  color: #555555;
}
.p-left {
  width: 90px!important;
  text-align: center!important;
}
.ant-layout-footer {
  padding: 0px!important;
}
.footer-message-box-item:hover{
  cursor: pointer;
}
</style>


