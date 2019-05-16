<template>
  <a-layout-footer class="footer">
    <div class="footer-message">
      <div class="footer-content">
        <ul class="footer-left">
          <li class="law">
            <p class="title">法律服务</p>
            <span @click="toLaw()">法律声明</span>
            <span @click="toService()">服务协议</span>
            <span @click="toPrivacy()">隐私协议</span>
          </li>
          <li class="help">
            <p class="title">帮助</p>
            <span @click="web()">网站操作流程</span>
            <span @click="app()">APP操作流程</span>
            <span>售后服务</span>
          </li>
          <li class="sale">
            <p class="title">售后投诉</p>
            <span>固定电话: 0731-88159987</span>
            <span>药监局投诉电话：12331</span>
          </li>
          <li class="service">
            <p class="title">售后客服</p>
            <span>客服电话：0731-88159987</span>
          </li>
        </ul>
        <div class="footer-right">
          <div>
            <img src="http://119.23.203.132/download/wlq_app.png" alt>
            <p>一块物流APP</p>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <!-- <div class="footer-message-item">
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
      </div>-->
    </div>
    <div class="footer-box">
      <p>
        <img src="../../assets/img/zhengpin.png" alt>
        正品保证,带票销售
      </p>
      <p>
        <img src="../../assets/img/pinzhong.png" alt>
        品类丰富，搭配自由
      </p>
      <p>
        <img src="../../assets/img/yunshu.png" alt>
        舒心采购，准时送达
      </p>
      <p>
        <img src="../../assets/img/fuwu.png" alt>
        专业服务，开店无忧
      </p>
    </div>

        <h4 class="footer-copyright">Copyright@2015-2019 一块医药v1.0.0.2019051501 湖南空间折叠互联网科技有限公司版权所有</h4>

    </a-layout-footer>
</template>
<script>
export default {
  name: "f-space-footer",
  data() {
    return {};
  },
  methods: {
    toLaw() {
      this.$router.push({
        path: "/user/help/law"
      });
    },
    toService() {
      this.$router.push({
        path: "/user/help/service"
      });
    },
    toPrivacy() {
      this.$router.push({
        path: "/user/help/privacy"
      });
    },
    web() {
       this.$router.push({
        path: "/user/help/web-operation"
      });
    },
    app() {
       this.$router.push({
        path: "/user/help/app-operation"
      });
    }
  }
};
</script>
<style lang='less' scoped>
.law span:hover {
  cursor: pointer;
}
.help span:hover {
  cursor: pointer;
}
.footer {
  background: #414141;
  border-top: 1px #000;
}
.footer-message {
  color: #000;
  height: 220px;
  background: #ffffff;
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
  width: 300px !important;
}
.footer-message-box-item i {
  width: 50%;
  margin-top: 11%;
  margin-bottom: 12%;
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
  width: 25%;
  font-size: 20px;
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
.footer-content{
  width: 1190px;
  height: 220px;
  margin: 0 auto;

  .footer-left{
    float: left;
    width: 720px;
    height: 220px;
    padding: 40px 0px;
    li .title{
      height: 50px;
      line-height: 50px;
      text-align: left;
      font-size: 15px;
      font-weight: bold;
      color: #333333;
    }
    li span{
      display: inline-block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: left;
      color: #999999;
    }
    .law{
      float: left;
      width: 140px;
      height: 140px;
    }
    .help{
      float: left;
      width: 140px;
      height: 140px;

    }
    .sale{
      float: left;
      width: 200px;
      height: 140px;

    }
    .service{
      float: left;
      width: 200px;
      height: 140px;

    }
  }
  .footer-right{
    float: right;
    width: 440px;
    height: 220px;
    padding: 50px 0px;
    div{
      float: right;
      width: 90px;
      height: 125px;
      img{
        width: 90px;
        height: 90px;
      }
      p{
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>


