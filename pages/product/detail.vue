<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout>
        <!-- 头部组件 -->
        <f-space-header></f-space-header>
        <a-layout-content>
          <div class="goods-exhibition">
            <a-breadcrumb class="crumbs">
              <a-breadcrumb-item>首页</a-breadcrumb-item>
              <a-breadcrumb-item><a href="">限时抢购</a></a-breadcrumb-item>
              <a-breadcrumb-item><a href="">汇仁牌 肾宝片</a></a-breadcrumb-item>
            </a-breadcrumb>
            <div class="goods-big-pic">
              <!-- 图片数量根据下面li数量循环 -->
              <img src="https://img.alicdn.com/imgextra/i4/2928278102/O1CN01lrOUgK29ilPBeKXIk_!!2928278102.jpg_430x430q90.jpg" alt="">
              <ul class="small-pic">
                <!-- li数量由后台数据决定 -->
                <li>
                  <img src="//img.alicdn.com/imgextra/i1/2928278102/O1CN016PrL3z29ilQVDMXxK_!!0-item_pic.jpg_60x60q90.jpg" alt="">
                </li>
                <li></li>
                <li></li>
                 <li></li>
                  <li></li>
              </ul>
            </div>
            <div class="goods-info">
              <p class="goods-name">思密达 蒙脱石散</p>
              <p class="rush-time">限时抢购 距离结束还剩 12 小时 15 分钟 52 秒 56</p>
              <div class="price-server">
                <p class="price"> <span class="price-title">价格</span> <span class="money-count">￥34</span> <del>￥32</del></p>
                <p class="price"> <span class="integral">积份</span> <span>购买得50积分</span></p>
                <p class="price indent"> <a-icon type="check-circle"/> <span>30天无忧退换货</span> <a-icon type="check-circle" /> <span>48小时快速退款</span> <a-icon type="check-circle" /> <span>满88元免邮费</span></p>
              </div>
              <div class="manufacturer">
                <p class="packing"> <span>规格/包装：</span> <span class="margin-right190">5g*15袋</span><span>剂  型：</span> <span>瓶装</span></p>
              </div>
            </div>
          </div>
        </a-layout-content>
        <!-- 页脚 -->
        <a-layout-footer>
          <div class="page-footer">
            <div class="server-list">
              <ul class="server-ui">
                <li>
                  <a href="">
                    <span>优</span>
                    <h3>品质保障</h3>
                    <p>品质护航 购物无忧</p>
                  </a>
                </li>
                <li>
                   <a href="">
                    <span> 七</span>
                    <h3>七天无理由退换货</h3>
                    <p>为您提供售后无忧保障</p>
                  </a>
                </li>
                <li>
                    <a href="">
                    <span>特</span>
                    <h3>特色服务体验</h3>
                    <p>为您呈现不一样的服务</p>
                  </a>
                </li>
                <li>
                   <a href="">
                    <span>帮</span>
                    <h3>帮助中心</h3>
                    <p>您的购物指南</p>
                  </a>
                </li>
              </ul>
            </div>
            <div class="shoping-guide">
              <ul class="shoping-list">
                <li>
                  <ul class="shoping-ui">
                    <li class="first-server">购物指南</li>
                    <li><a href="">免费注册</a></li>
                    <li><a href="">开通支付宝</a></li>
                    <li><a href="">支付宝充值</a></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
                <li>
                  <ul class="shoping-ui">
                    <li class="first-server">一块医药保障</li>
                    <li><a href="">发票保障</a></li>
                    <li><a href="">售后规则</a></li>
                    <li><a href="">缺货赔付</a></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
                <li>
                  <ul class="shoping-ui">
                    <li class="first-server">支付方式</li>
                    <li><a href="">快捷支付</a></li>
                    <li><a href="">信用卡</a></li>
                    <li><a href="">余额宝</a></li>
                    <li><a href="">蚂蚁花呗</a></li>
                    <li><a href="">货到付款</a></li>
                    <li></li>
                  </ul>
                </li>
                <li>
                  <ul class="shoping-ui">
                    <li class="first-server">商家服务</li>
                    <li><a href="">一块医药规则</a></li>
                    <li><a href="">商家入驻</a></li>
                    <li><a href="">商家中心</a></li>
                    <li><a href="">一块智库</a></li>
                    <li><a href="">物流服务</a></li>
                    <li><a href="">运营服务</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="black-footer">
            <div>
              <p class="footer-record">
                <a href="">关于一块医药</a>
                <a href="">帮助中心</a>
                <a href="">开放平台</a>
                <a href="">诚聘英才</a>
                <a href="">联系我们</a>
                <a href="">网站合作</a>
                <a href="">法律声明</a>
                <a href="">隐私权政策</a>
                <a href="">知识产权</a>
                <a href="">廉政举报</a></p>
              <p class="footer-record">
                <a href="">湖南空间折叠 |</a>
                <a href="">淘宝网 |</a>
                <a href="">天猫 |</a>
                <a href="">聚划算 |</a>
                <a href="">全球速卖通 |</a>
                <a href="">阿里巴巴国际交易市场 |</a>
                <a href="">1688 |</a>
                <a href="">阿里妈妈 |</a>
                <a href="">飞猪 |</a>
                <a href="">阿里云计算 |</a>
                <a href="">AliOS |</a>
                <a href="">阿里通信 |</a>
                <a href="">万网 |</a>
                <a href="">高德 |</a>
                <a href="">UC |</a>
                <a href="">友盟 |</a>
                <a href="">虾米 |</a>
                <a href="">钉钉 |</a>
                <a href="">支付宝</a>
              </p>
              <p class="licence">
                <span>增值电信业务经营许可证：</span> <a href="">湘A2-20110446</a>
                <span>市场名称登记证：</span>  <span class="gongshang">工商网市字3301004119号</span>
                <span>出版物网络交易平台服务经营备案证：</span> <span>新出发湘备字第001号</span>
              </p>
              <p class="licence">
                <span class="gongshang">互联网违法和不良信息举报电话： 0571-81683755 blxxjb@alibaba-inc.com</span>
                <span>互联网药品信息服务资质证书编号： </span> <a href="">湘- (经营性) -2017-0005</a>
                <span><img v-lazy="'//img.alicdn.com/tps/TB1yEqRPXXXXXXPXpXXXXXXXXXX-20-20.png'" alt=""></span> <a href=""> 湘公网安备33010002000120号</a>
              </p>
              <p class="licence">
                <span>医疗器械网络交易服务第三方平台备案： (湘) 网械平台备字[2018]第00002号</span>
                <span>互联网药品交易服务资格证书： 国A20150001</span></p>
              <p class="licence">
                <span  class="gongshang">湖南省网络食品销售第三方平台提供者备案： 湘网食A33010002</span> <a>12318举报</a>
              </p>
              <p class="licence">
                <span>© 2003-2018 TMALL.COM 版权所有</span>
              </p>
            </div>
          </div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../../components/fspace-ui/header";
export default {
  components: {
    FSpaceHeader,
  },
  data() {
    return {

    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      this.$queryIce(
        InfoModule.OrderServerPrx,
        "osB",
        "queryByUserId",
        new this.$iceCallback(
          function result(result) {
            console.log(result)
          }
        ),
        10000, this.$commom.num2jlong(1000010000)
      );
    }
  }
};
</script>

<style scoped>
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
.greenColor {
  color: #10b68c !important;
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
  background: rgb(255, 255, 255);
  /* min-height: 1000px; */
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
/* 商品展示 */
.goods-exhibition {
  width: 1190px;
  height: 690px;
  margin: 0 auto;
  background:cornflowerblue;
  padding-top: 20px;
}
.goods-exhibition .crumbs {
  margin: 0 0 20px 0;
}
.goods-big-pic {
  display: inline-block;
  width: 490px;
  height: 530px;
  background: burlywood;
}
.goods-big-pic img {
  width: 490px;
  height: 430px;
}
.small-pic {
  display:inline-block;
  width: 490px;
  height: 100px;
  overflow: hidden;
  padding-bottom: 10px;
}
.small-pic li {
  display:inline-block;
  position: relative;
  top: 10px;
  width: 80px;
  height: 80px;
  background:brown;
}
.small-pic li img {
  display:inline-block;
  position: absolute;
  top:0px;
  width: 80px;
  height: 80px;
}
.goods-info {
  float: right;
  width: 657px;
  height: 530px;
  border: 1px solid brown;
}
.goods-name {
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  font-weight: bold;
}
.rush-time {
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
  background: rgb(247,37,38);
  font-size: 20px;
  color: #ffffff;
}
.price-server {
  height: 129px;
  background: rgb(246,246,246);
}
.price-server .price {
  height: 42px;
  line-height: 42px;
  text-indent: 20px;
  font-size: 16px;
  color: #666666;
}
.price-server .price del{
  font-weight: bold;
}
.price-server .price .integral {
  margin-right: 5px;
}
.money-count {
  margin-right: 5px;
  font-size: 24px;
  font-weight: bold;
  color: rgb(247,37,38);
}
.indent {
  text-indent: 10px!important;
}
.manufacturer {
  display: inline-block;
  width: 657px;
  height: 150px;
  font-size: 16px;
  color: #666666;
}
.manufacturer .packing {
  height: 36px;
  text-indent: 20px;
  line-height: 36px;
}
.margin-right190{
  margin-right: 190px;
}
/* 页脚 */
.page-footer {
  width: 1190px;
  height: 340px;
  margin: 0 auto;
  border: 1px solid brown;
}
.server-list {
  width: 1190px;
  height: 140px;
  background: #ffffff;
}
.server-ui {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1190px;
  height: 140px;
}
.server-ui li {
  width: 297px;
  height: 100px;
}
.server-ui li a {
  position: relative;
  display: inline-block;
  top: 0px;
  width: 297px;
  height: 100px;
}
.server-ui li a span {
  position: absolute;
  top: 15px;
  left: 45px;
  width: 70px;
  height: 70px;
  border: 3px solid rgb(255,0,58);
  border-radius: 50%;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  color: rgb(255,0,58);
}
.server-ui li a h3 {
  position: absolute;
  top: 20px;
  left: 135px;
  font-weight: bold;
}
.server-ui li a p {
  position: absolute;
  top: 45px;
  left: 135px;
  color: #999999;
  font-size: 16px;
}
.shoping-guide {
  width: 1190px;
  height: 200px;
  margin: 0 auto;
  border-top: 1px solid rgb(237,237,237);
  background: #ffffff;
  padding-top: 20px;
}
.shoping-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url('//img.alicdn.com/tfs/TB1dl28RXXXXXbzaFXXXXXXXXXX-136-50.png');
  background-repeat: no-repeat;
  background-size: 68px 25px;
  background-position: 12px bottom;
  padding-left: 50px;
  padding-right: 50px;
}
.shoping-list li .shoping-ui li {
  width: 100px;
  height: 20px;
  margin-bottom: 3px;
}
.shoping-ui li a:hover {
  border-bottom: 1px solid #666666;
}
.first-server {
  font-size: 16px;
  color: #666666!important;
}
.first-serve a {
  color: #000000!important;
}
.black-footer {
  width: 100%;
  /* height: 175px; */
  background: #000000;
  border-top: 2px solid rgb(255,0,54)
}
.black-footer div {
  display: block;
  width: 1190px;
  height: 175px;
  margin: 0 auto;
  padding-top: 10px;
}
.footer-record {
  height: 30px;
  line-height: 20px;
}
.footer-record a {
  font-weight: 300;
  font-size: 12px;
  color: rgb(255,255,255);
}
.footer-record a:hover {
  border-bottom: 1px solid #ffffff;
}
.licence {
  font-size: 12px;
  color: rgb(136, 134, 134);
}
.licence a {
  margin-right: 40px;
  font-size: 12px;
  color: rgb(164,164,164);
}
.licence a:hover {
  border-bottom: 1px solid rgb(164,164,164);
}
.gongshang {
  margin-right: 40px;
}
/* ui框架样式 */
.ant-input {
  width: 84% !important;
  border: none;
  border-radius: 0%;
}
.ant-btn {
  background-color: rgb(255, 0, 54);
  border: none;
  color: #ffffff;
}
.ant-layout-footer {
  padding: 0px;
}
</style>
