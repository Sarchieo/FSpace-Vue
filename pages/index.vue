<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout>
        <f-space-header></f-space-header>
        <!-- 左侧菜单，轮播，广告位及物价区 -->
        <a-layout-content>
          <div class="goods-nav-box">
            <f-space-menu></f-space-menu>
            <div class="binnar-box">
              <a-carousel autoplay>
                <div>
                  <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" >
                </div>
                <div>
                  <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" >
                </div>
                <div>
                  <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" >
                </div>
                <div>
                  <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" >
                </div>
              </a-carousel>
              <div class="sale">
                <h2>
                  <a-icon type="clock-circle" style="margin-right: 10px;"/>限时特价
                </h2>
                <div class="binnar-sale">
                  <a href>
                    <div>
                      <p>美国进口now foods玛卡秘</p>
                      <p></p>
                      <p class="price">￥21.3元</p>
                    </div>

                    <img v-lazy="'//img.alicdn.com/imgextra/i3/1902685596/O1CN01vvrsd81rD0sDn5A8o_!!0-item_pic.jpg_q90.jpg'" alt>
                  </a>
                  <a href>
                    <div>
                      <p>进口无针注射针器胰岛素</p>
                      <p></p>
                      <p class="price">￥21.3元</p>
                    </div>
                    <img src="//img.alicdn.com/imgextra/i2/2255157576/O1CN01dAxJAz25pr62D8NDd_!!0-item_pic.jpg_q90.jpg" alt>
                  </a>
                  <a href>
                    <div>
                      <p>满赠发礼】云南白药三七</p>
                      <p></p>
                      <p class="price">￥21.3元</p>
                    </div>
                    <img src="//img.alicdn.com/imgextra/i4/772458181/O1CN01nczH7S2AIwiKUl1NB_!!0-item_pic.jpg_q90.jpg" alt>
                  </a>
                  <a href>
                    <div>
                      <p>益捷德国进口胰岛素无针</p>
                      <p></p>
                      <p class="price">￥21.3元</p>
                    </div>
                    <img src="//img.alicdn.com/imgextra/i4/911757567/O1CN01hJ3I7b25ljWuhSGYJ_!!0-item_pic.jpg_q90.jpg" alt>
                  </a>
                </div>
              </div>
            </div>
            <div class="binnar-position">
              <div class="binnar-img">
                <a href="">
                  <img src="//img.alicdn.com/tps/TB16TwaKVXXXXauXVXXXXXXXXXX-190-160.png_q90.jpg" alt="">
                </a>
              </div>
              <div class="binnar-img">
                <a href="">
                  <img src="//img.alicdn.com/tps/i1/TB1oT0WHpXXXXXHaXXXEeH32pXX-190-160.jpg_q90.jpg" alt="">
                </a>
              </div>
              <p>下期预告</p>
              <a href class="next-binnar">
                <span>同仁堂麻仁丸60克</span>
                <img src="//img.alicdn.com/imgextra/i3/1588915138/TB2Oz3baXXXXXadXpXXXXXXXXXX_!!1588915138.jpg_70x70q90.jpg" alt="">
              </a>
              <a href class="next-binnar">
                <span>白云山 风油精3ml</span>
                <img src="//img.alicdn.com/imgextra/i2/2110807016/TB2N6i1cVXXXXbsXpXXXXXXXXXX_!!2110807016.jpg_70x70q90.jpg" alt="">
              </a>
              <a href class="next-binnar">
                <span>金寿 麝香壮骨膏</span>
                <img src="//img.alicdn.com/imgextra/i3/2029339133/TB2SeS5bBLzQeBjSZFCXXXmtXXa_!!2029339133.jpg_70x70q90.jpg" alt="">
              </a>
              <a href class="next-binnar">
                <span>上海龙虎牌 清凉鼻</span>
                <img src="//img.alicdn.com/imgextra/i3/2643613580/TB2patTqFXXXXcAXXXXXXXXXXXX_!!2643613580.jpg_70x70q90.jpg" alt="">
              </a>
            </div>
            <div class></div>
          </div>
          <div class="brand-hall">
            <p class="brand-hall-title">品牌馆</p>
            <div class="brand-div">
              <div class="brand-left">
                <a href>
                  <img
                    src="//img.alicdn.com/imgextra/i2/757937135/TB2jOg4X9FjpuFjSspbXXXagVXa_!!757937135.jpg"
                    alt
                  >
                </a>
              </div>
              <div class="brand-right">
                <ul class="bt">
                  <li>热门品牌</li>
                </ul>
                <ul class="logo-box">
                  <li v-for="(item,index) in hotList" :key="index">
                    <img :src="item.src" alt>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 健康馆 -->
          <div class="healthy">
            <p class="healthy-title">健康热点</p>
            <div class="upper" v-for="(item,index) in imgPath" :key="index">
              <a href class="healthy-left">
                <img :src="item.src" alt>
                <!-- <img :src="item.src" alt=""> -->
              </a>
              <!-- 健康热点 -->
              <ul class="upper-ul">
                <li
                  class="border-right border-bottom"
                  v-for="(items,index) in item.list"
                  :key="index"
                >
                  <a href>
                    <div>
                      <p class="desc-text">{{items.title}}</p>
                      <p class="desc-price">
                        ￥{{items.new}}
                        <del>￥{{items.old}}</del>
                      </p>
                    </div>
                    <img :src="items.url" alt>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 春夏常见疾病 -->
          <div class="summer-spring">
            <h2>春夏常见疾病</h2>
            <div class="summer-pic">
              <a href class="cold">
                <img src="//img.alicdn.com/tps/i3/TB1Q7GxGVXXXXc7XXXXSutbFXXX.jpg" alt>
              </a>
              <a href class="skin">
                <img src="//img.alicdn.com/tps/i1/TB13H5sGVXXXXaiXFXXSutbFXXX.jpg" alt>
              </a>
              <a href class="uphot">
                <img src="//img.alicdn.com/tps/i4/TB1PbWoGVXXXXXxXVXXSutbFXXX.jpg" alt>
              </a>
              <a href class="bianmi">
                <img src="//img.alicdn.com/tps/i3/TB1lVmiGVXXXXakaXXXSutbFXXX.jpg" alt>
              </a>
              <a href class="jianfei">
                <img src="//img.alicdn.com/tps/i4/TB19yasGVXXXXX4XFXXSutbFXXX.jpg" alt>
              </a>
              <a href class="shenxu">
                <img src="//img.alicdn.com/tps/i4/TB1CASoGVXXXXbDXFXXSutbFXXX.jpg" alt>
              </a>
              <a href class="yanyan">
                <img src="//img.alicdn.com/tps/i3/TB1ieKyGVXXXXaOXXXXSutbFXXX.jpg" alt>
              </a>
              <a href class="weibing">
                <img src="//img.alicdn.com/tps/i1/TB1GmWrGVXXXXasXFXXSutbFXXX.jpg" alt>
              </a>
              <a href class="shimian">
                <img src="//img.alicdn.com/tps/i1/TB1cpaoGVXXXXXTXVXXSutbFXXX.jpg" alt>
              </a>
            </div>
          </div>


          <!-- 中西药品，医疗器械，营养保健 -->
          <div class="medicine" v-for="(item,index) in medicineList" :key="index">
            <h2>{{item.title}}</h2>
            <a href="" class="medicine-left">
              <img :src="item.src" alt="">
            </a>
            <ul class="medicine-ui">
              <li v-for="(items,index) in item.list" :key="index" class="border-right border-bottom">
                <a href="">
                  <img :src="items.src" alt="">
                  <div class="goods-info">
                    <p class="goods-text">{{items.text}}</p>
                    <p class="goods-price">￥{{items.new}}  <del>￥{{items.old}}</del></p>
                  </div>
                </a>
              </li>
            </ul>
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
                <span><img src="//img.alicdn.com/tps/TB1yEqRPXXXXXXPXpXXXXXXXXXX-20-20.png" alt=""></span> <a href=""> 湘公网安备33010002000120号</a>
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
      <a-layout-sider width="30"></a-layout-sider>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../components/fspace-ui/header";
import FSpaceMenu from "../components/fspace-ui/menu";
export default {
  components: {
    FSpaceHeader,
    FSpaceMenu
  },
  data() {
    return {
      testList: [],
      hotList: [
        {
          src:
            "//img.alicdn.com/imgextra/i3/2653032020/TB2b4gWgXXXXXaKXpXXXXXXXXXX_!!2653032020.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i4/871886077/TB2rEPlcXXXXXXtXXXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i1/2957611790/TB2SW_EcNdkpuFjy0FbXXaNnpXa_!!2957611790.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i3/871886077/TB2tZC9cXXXXXc7XXXXXXXXXXXX-871886077.jpg"
        }],
       medicineList: [
         {
           title: '中西药品',
           src: '//img.alicdn.com/imgextra/i3/2071216161/TB24cRnbFXXXXXmXpXXXXXXXXXX_!!2071216161.jpg',
           list: [
             {
               src: '//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
               text: '领券减+六叶】汇仁牌肾宝片',
               old: 322,
               new: 322
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1srwPPVXXXXaIaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
               text: '买2得理疗包】白云山陈李济',
               old: 790,
               new: 711
             },
              {
               src: '//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '山东东阿阿胶250g铁盒阿胶块',
               old: 1350,
               new: 1350
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
               text: '礼袋装】东阿阿胶复方阿胶浆',
               old: 468,
               new: 468
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1eAO_PXXXXXbtXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '买3盒立减+包邮】九芝堂六味',
               old: 32,
               new: 32
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1vpUaOFXXXXbxXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '包邮2得六味】太极五子衍宗',
               old: 49,
               new: 49
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
               text: '买1得好礼】盘龙云海排毒养',
               old: 99,
               new: 99
             },
              {
               src: '//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '买2得高级毛巾】善存多维元',
               old: 115,
               new: 99
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1A6cwPVXXXXbJaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '辅舒良丙酸氟替卡松鼻喷雾剂',
               old: 75,
               new: 63
             },
              {
               src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '买3得3好礼】斯利安叶酸片',
               old: 56,
               new: 52
             }
           ]
         },
          {
           title: '医疗器械',
           src: '//img.alicdn.com/imgextra/i3/2807849288/TB2ikxWrVXXXXaAXpXXXXXXXXXX_!!2807849288.jpg',
           list: [
             {
               src: '//img.alicdn.com/imgextra/i2/TB1MbEyJVXXXXXSXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '欧姆龙电子血压计HEM-7052',
               old: 580,
               new: 399
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1AoDTLXXXXXc3XFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '【顺丰无辐射】邦力健多普勒',
               old: 308,
               new: 178
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1UKsnMVXXXXXoXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '冠昌医用儿童温度计电子体温',
               old: 198,
               new: 45
             },
              {
               src: '//img.alicdn.com/imgextra/i3/TB11ct_JVXXXXaEXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '刮痧板】康祝拔罐器24罐真空',
               old: 157.8,
               new: 64.9
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB11nltKFXXXXchXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '衡互邦轮椅折叠带坐便半躺',
               old: 1500,
               new: 348
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1gclOKFXXXXalXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '鱼跃空气压缩式雾化器可调雾',
               old: 588,
               new: 289
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
               text: '德国博朗耳温枪IRT6520耳温',
               old: 998,
               new: 328
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1KFFEKFXXXXclXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '三诺安稳血糖试纸血糖仪试纸',
               old: 183,
               new: 62
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1XvJvNXXXXXcDXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: 'Panasonic/松下电子血压计',
               old: 469,
               new: 269
             },
              {
               src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '鱼跃制氧机8F-3W带雾化医用',
               old: 7200,
               new: 2880
             }
           ]
         },
         {
           title: '营养保健',
           src: '//img.alicdn.com/tps/i2/TB1C_JAHXXXXXc7XpXXef7H2pXX-190-520.jpg',
           list: [
             {
               src: '//img.alicdn.com/imgextra/i6/TB1vNRiLXXXXXXmXXXX02ZE_VXX_065725.jpg_160x160q90.jpg',
               text: '汤臣倍健R液体钙软胶囊',
               old: 98,
               new: 88
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1vHlSIXXXXXXTXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: 'Lumi胶原蛋白粉20包 进口',
               old: 298,
               new: 228
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1L37TMpXXXXbnXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: 'Lumi胶原蛋白口服液6瓶 进口',
               old: 266,
               new: 149
             },
              {
               src: '//img.alicdn.com/imgextra/i7/TB1Q0tiGFXXXXamXVXXHSxV_FXX_060806.jpg_160x160q90.jpg',
               text: '绿A天然螺旋藻精片 0.5g*200',
               old: 98,
               new: 92
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1RFl8JFXXXXcBXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '[买2送5]康比特 果蔬纤维代餐',
               old: 195,
               new: 74
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1qgvDKFXXXXX.XXXXvspi_XXX_051614.jpg_160x160q90.jpg',
               text: '程海牌螺旋藻片 0.5g/片*100',
               old: 136,
               new: 135
             },
              {
               src: '//img.alicdn.com/imgextra/i7/TB1kLY0MXXXXXXKXXXXhFn4.FXX_110224.jpg_160x160q90.jpg',
               text: '养生堂牌天然维生素E软胶囊',
               old: 238,
               new: 128
             },
              {
               src: '//img.alicdn.com/imgextra/i8/TB1MdNnGFXXXXbjXpXXmI2p_FXX_061850.jpg_160x160q90.jpg',
               text: '绿A天然螺旋藻精片 0.5g*12',
               old: 335,
               new: 318
             },
              {
               src: '//img.alicdn.com/imgextra/i3/TB1_09BLVXXXXX1XpXXzGCz.VXX_112116.jpg_160x160q90.jpg',
               text: '红桃K维生素C加E咀嚼片',
               old: 148,
               new: 39
             },
              {
               src: '//img.alicdn.com/imgextra/i3/TB1C289GFXXXXX2XpXXktFl_XXX_051632.jpg_160x160q90.jpg',
               text: '汤臣倍健牌蛋白质粉 455g/罐',
               old: 391.25,
               new: 313
             }
           ]
         },
         {
           title: '滋补养生',
           src: '//img.alicdn.com/tps/i1/TB1MQV.IpXXXXb4XXXXef7H2pXX-190-520.jpg',
           list: [
             {
               src: '//img.alicdn.com/imgextra/i1/TB1YCrCKVXXXXchXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: 'Beryl/百瑞源 枸杞，中宁枸杞',
               old: 98,
               new: 39.9
             },
              {
               src: '//img.alicdn.com/imgextra/i3/TB1fKKIJXXXXXcaXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '【五月新货】山东东阿阿胶桃',
               old: 150,
               new: 150
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1EpYsKpXXXXbDXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: 'Beryl/百瑞源 中宁枸杞 500g',
               old: 139,
               new: 37.9
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1YUDFJpXXXXbnXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '康美',
               old: 388,
               new: 128
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1hoQsKFXXXXcFXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '老字号 百花牌纯天然蜂蜜',
               old: 159,
               new: 59.9
             },
              {
               src: '//img.alicdn.com/imgextra/i3/TB1q0YVKpXXXXXdXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '寿仙谷 破壁灵芝孢子粉',
               old: 4050,
               new: 4050
             },
              {
               src: '//img.alicdn.com/imgextra/i2/TB1zFmZLXXXXXcVXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '金诃 藏红花 5克',
               old: 160,
               new: 79.2
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB195qYLXXXXXb2XFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '贯康 冬虫夏草 4条/克',
               old: 258.88,
               new: 258
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1sej.KFXXXXXpXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '桃花姬135*2',
               old: 269,
               new: 268
             },
              {
               src: '//img.alicdn.com/imgextra/i2/TB1gpgYKpXXXXb8XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '敖东城 西洋参 80g',
               old: 420,
               new: 69
             }
           ]
         },
         {
           title: '保健食品',
           src: '//img.alicdn.com/tps/i3/TB1RfxIHXXXXXb7aXXXef7H2pXX-190-520.jpg',
           list: [
             {
               src: '//img.alicdn.com/imgextra/i2/TB1RMTfIFXXXXX.XVXXLJcJ8VXX_033554.jpg_160x160q90.jpg',
               text: '斯强牌乳酸营养颗粒 3g/袋',
               old: 42,
               new: 42
             },
              {
               src: '//img.alicdn.com/imgextra/i5/TB1YqVlLpXXXXakXpXX9fLt8XXX_020819.jpg_160x160q90.jpg',
               text: '程海牌螺旋藻片 0.5g/片* 300',
               old: 189,
               new: 89
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1fOw2LpXXXXc0XFXXY34r9VXX_045741.jpg_160x160q90.jpg',
               text: 'Dr. Herbs/禾博士 维生素C咀',
               old: 196,
               new: 39
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1LCwGKVXXXXbFXVXXrbwl8VXX_033358.jpg_160x160q90.jpg',
               text: '千泉 威莱斯牌左旋肉碱绿茶',
               old: 298,
               new: 138
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1hoQsKFXXXXcFXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '沛元 蜂胶胶囊 500mg/粒*90',
               old: 198,
               new: 129
             },
              {
               src: '//img.alicdn.com/imgextra/i5/TB19qVpGpXXXXbjXVXXi5Ck.pXX_102824.jpg_160x160q90.jpg',
               text: '泰尔牌膳通片 750mg/片*50',
               old: 128,
               new: 128
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB15ffEKFXXXXXcXXXXLCqm8pXX_023204.jpg_160x160q90.jpg',
               text: 'Health care/一品康',
               old: 158,
               new: 108
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB195qYLXXXXXb2XFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '康纽莱联合邦利牌天然胡萝卜素',
               old: 90,
               new: 41.8
             },
              {
               src: '//img.alicdn.com/imgextra/i5/TB13WoBMpXXXXbIXVXXD9FsFVXX_095711.jpg_160x160q90.jpg',
               text: '修正破壁灵芝孢子粉 0.99g/片',
               old: 398,
               new: 299
             },
              {
               src: '//img.alicdn.com/imgextra/i5/TB1.JSuGpXXXXXUaXXXZKcU7FXX_013255.jpg_160x160q90.jpg',
               text: '三金牌伊康美胶囊 480mg/粒',
               old: 137.5,
               new: 55
             }
           ]
         },
          {
           title: '医疗健康服务',
           src: '//img.alicdn.com/tps/TB1IY2QKVXXXXcNXVXXXXXXXXXX-190-520.jpg',
           list: [
             {
               src: '//img.alicdn.com/bao/uploaded/TB1G57MLXXXXXa9XFXXSutbFXXX.jpg_160x160q90.jpg',
               text: '新年孝敬父母双人体检套餐',
               old: 1798,
               new: 1199
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB1IhsxLXXXXXaFXFXXSutbFXXX.jpg_160x160q90.jpg',
               text: '瑞慈体检卡 白金卡套餐',
               old: 1980,
               new: 1980
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB1J8UoLXXXXXcaXVXXSutbFXXX.jpg_160x160q90.jpg',
               text: '慈铭体检 快乐职场套餐',
               old: 780,
               new: 468
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB1wWwDLXXXXXXiXpXXSutbFXXX.jpg_160x160q90.jpg',
               text: '熙康中老年感恩超值套餐',
               old: 472,
               new: 472
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB1qwZsLXXXXXa0XVXXSutbFXXX.jpg_160x160q90.jpg',
               text: '博奥颐和儿童肺癌基因检测',
               old: 1500,
               new: 899
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB1EXgPLXXXXXa6XXXXSutbFXXX.jpg_160x160q90.jpg',
               text: '产前检查套餐',
               old: 26135,
               new: 26135
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB1Na.GLXXXXXcVXFXXSutbFXXX.jpg_160x160q90.jpg',
               text: '线上甩脂营减脂健身塑形',
               old: 1599,
               new: 670
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB1dwgHLXXXXXcQXFXXSutbFXXX.jpg_160x160q90.jpg',
               text: '【喜鹊上门】背部缓解酸痛',
               old: 268,
               new: 98
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB13lwnLXXXXXbUXVXXSutbFXXX.jpg_160x160q90.jpg',
               text: '德国威兰德全瓷牙套餐',
               old: 3980,
               new: 3980
             },
              {
               src: '//img.alicdn.com/bao/uploaded/TB143kDLXXXXXXzXFXXSutbFXXX.jpg_160x160q90.jpg',
               text: '牙齿贴面美容卡',
               old: 3500,
               new: 2800
             }
           ]
         },
           {
           title: '隐形眼镜',
           src: '//img.alicdn.com/tps/i2/TB18Ea8JFXXXXc7XpXXef7H2pXX-190-520.jpg',
           list: [
             {
               src: '//img.alicdn.com/imgextra/i2/TB1GJucOpXXXXX.apXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '[买2送眼贴]强生安视优隐形',
               old: 389,
               new: 168
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1f_GPOFXXXXckXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '【送润眼液】博士伦日抛隐形',
               old: 112,
               new: 28
             },
              {
               src: '//img.alicdn.com/imgextra/i4/TB1vhv2OXXXXXXCXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '[买到送眼贴]强生美瞳',
               old: 539,
               new: 148
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1s0F5NpXXXXatXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '[买1送7]博士伦隐形近视眼镜',
               old: 103.9,
               new: 78
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1JiucKXXXXXasXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '买4送充电宝 强生美瞳',
               old: 1500,
               new: 899
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1cG_ULpXXXXX7XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '爱尔康傲滴护理液',
               old: 159.9,
               new: 85
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB128oqNXXXXXcGXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '爱尔康傲滴护理液355ml*3',
               old: 199,
               new: 132
             },
              {
               src: '//img.alicdn.com/imgextra/i2/TB1.2rqLVXXXXXEXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '爱尔康傲滴近视隐形眼镜护理',
               old: 79,
               new: 73
             },
              {
               src: '//img.alicdn.com/imgextra/i1/TB1WfaMOFXXXXcxaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '[4件7.5折]视康美瞳',
               old: 198,
               new: 68
             },
              {
               src: '//img.alicdn.com/imgextra/i2/TB1kW4kKFXXXXaAXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
               text: '[买2送洗眼液]爱尔康视康睛彩美',
               old: 185,
               new: 68
             }
           ]
         }
       ],
       hotList: [
         {
           src:"//img.alicdn.com/imgextra/i3/2653032020/TB2b4gWgXXXXXaKXpXXXXXXXXXX_!!2653032020.jpg"
         },
         {
           src:"//img.alicdn.com/imgextra/i4/871886077/TB2rEPlcXXXXXXtXXXXXXXXXXXX-871886077.jpg"
         },
         {
           src:"//img.alicdn.com/imgextra/i1/2957611790/TB2SW_EcNdkpuFjy0FbXXaNnpXa_!!2957611790.jpg"
         },
         {
           src:"//img.alicdn.com/imgextra/i3/871886077/TB2tZC9cXXXXXc7XXXXXXXXXXXX-871886077.jpg"
         },

        {
          src:
            "//img.alicdn.com/imgextra/i2/871886077/TB2eKW9cXXXXXa1XpXXXXXXXXXX-871886077.jpg"
        },

        {
          src:
            "//img.alicdn.com/imgextra/i2/871886077/TB21pYfcXXXXXbTXXXXXXXXXXXX-871886077.jpg"
        },

        {
          src:
            "//img.alicdn.com/imgextra/i2/871886077/TB2lAPfcXXXXXcaXXXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i1/2957611790/TB2SW_EcNdkpuFjy0FbXXaNnpXa_!!2957611790.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i4/871886077/TB2gkblcXXXXXXJXXXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i2/871886077/TB22hzacXXXXXXiXpXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i4/2435673160/TB2HA4ccFXXXXaJXpXXXXXXXXXX_!!2435673160.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i4/1810287826/TB2EzXdcFXXXXXwXpXXXXXXXXXX_!!1810287826.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i3/871886077/TB217LgcXXXXXb1XXXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i4/871886077/TB2rEPlcXXXXXXtXXXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i1/871886077/TB2P0nhcXXXXXbVXXXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i2/871886077/TB21pYfcXXXXXbTXXXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i3/2071216161/TB2CrBfdVXXXXXGXXXXXXXXXXXX_!!2071216161.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i3/2071216161/TB2CrBfdVXXXXXGXXXXXXXXXXXX_!!2071216161.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i2/871886077/TB2lAPfcXXXXXcaXXXXXXXXXXXX-871886077.jpg"
        },
        {
          src:
            "//img.alicdn.com/imgextra/i1/871886077/TB2fnHacXXXXXc_XXXXXXXXXXXX-871886077.jpg"
        }
      ],
      imgPath: [
        {
          src: "//img.alicdn.com/tps/TB1KO3kMVXXXXXiXXXXXXXXXXXX-190-520.jpg",
          list: [
            {
              title: "汇仁肾宝片126成人男性肾亏",
              url:
                "//img.alicdn.com/imgextra/i1/2928278102/O1CN016PrL3z29ilQVDMXxK_!!0-item_pic.jpg_160x160q90.jpg",
              old: 322,
              new: 322
            },
            {
              title: " 好礼】艾丽奥利司 他胶囊排油 3盒】包邮",
              url:
                "//img.alicdn.com/imgextra/i2/2928278102/O1CN012rmOP029ilQMSyp8x_!!0-item_pic.jpg_160x160q90.jpg",
              old: 298,
              new: 139
            },
            {
              title: "九芝堂六味地黄丸",
              url:
                "//img.alicdn.com/imgextra/i4/2928278102/O1CN01mXOTCc29ilQQB0eOa_!!0-item_pic.jpg_160x160q90.jpg",
              old: 78,
              new: 90
            },
            {
              title: "万晟蔓迪米诺地尔酊溶液60ml",
              url:
                "//img.alicdn.com/imgextra/i1/2928278102/O1CN01e1RAbs29ilQSa3v9k_!!0-item_pic.jpg_160x160q90.jpg",
              old: 56,
              new: 32
            },
            {
              title: "2瓶】珍视明四味珍层冰硼眼药",
              url:
                "//img.alicdn.com/imgextra/i4/2928278102/O1CN01U4UYOg29ilQU7xI4x_!!0-item_pic.jpg_160x160q90.jpg",
              old: 150,
              new: 129
            },
            {
              title: "鱼跃制氧机8F-3W雾化医用级",
              url:
                "//img.alicdn.com/imgextra/i3/TB1F3ZDIFXXXXXyXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 7200,
              new: 2880
            },
            {
              title: "【工程师上门】PHILIPS/飞利",
              url:
                "//img.alicdn.com/imgextra/i1/TB11m47NpXXXXXzaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 10800,
              new: 7380
            },
            {
              title: "可孚制氧机医用老人孕妇家用",
              url:
                "//img.alicdn.com/imgextra/i1/TB1gpRGNpXXXXanXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 5800,
              new: 1688
            },
            {
              title: "【保价双II】瑞迈特呼吸机",
              url:
                "//img.alicdn.com/imgextra/i2/TB1cFVoNVXXXXbhapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 7180,
              new: 4180
            },
            {
              title: "9A国仁牌神灯理疗仪 tdp治疗仪",
              url:
                "//img.alicdn.com/imgextra/i3/TB11bH_LpXXXXavXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 499,
              new: 189
            }
          ]
        },

        {
          src:
            "//img.alicdn.com/tps/i2/TB1U3eeIpXXXXXjXXXXef7H2pXX-190-520.jpg",
          list: [
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i2/TB1zfkkNFXXXXcWXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 46.8,
              new: 46.8
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i3/TB19dR6KVXXXXapXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 98,
              new: 98
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i4/TB1kHWcNpXXXXXKXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 235,
              new: 235
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i3/TB1uSnvNFXXXXb8aXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 403.5,
              new: 403.5
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i2/TB1_d2dJFXXXXalXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 336,
              new: 336
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i3/TB1rd_VNFXXXXc0XpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 2580,
              new: 2580
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i1/TB1XJi_KVXXXXXEXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 178,
              new: 178
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i4/TB1pn9kNFXXXXcfXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 928,
              new: 928
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i4/TB1lILJNpXXXXbFaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 728,
              new: 728
            },
            {
              title: "",
              url:
                "//img.alicdn.com/imgextra/i4/TB1LcttKFXXXXc5XXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              old: 4050,
              new: 4050
            }
          ]
        }
      ]
    };
  },
  asyncData(context) {
    context.app.$queryIce(
      InfoModule.OrderServerPrx,
      "osB",
      "queryByUserId",
      new context.app.$iceCallback(
        function result(result) {
          return { testList: result };
        },
        function error(error) {}
      ),
      [10000, context.app.$commom.num2jlong(1000010000)]
    );
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
  background: rgb(238, 238, 238);
  min-height: 1000px;
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}

/* 导航及广告轮播左侧菜单栏,广告位，特价区 */
.goods-nav-box {
  display: block;
  position: relative;
  width: 1190px;
  height: 680px;
  margin: 0 auto;
  background: #ffffff;
  border-top: 1px solid rgb(238, 238, 238);
  margin-bottom: 25px;
}
.goods-nav-box .sider-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  height: 680px;
  box-shadow: 1px 1px 3px #999;
  z-index: 99;
}
.ant-carousel > .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.ant-carousel > .slick-slide h3 {
  color: #fff;
}
.binnar-box {
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 241px;
  width: 750px;
  height: 680px;
}
.binnar-pic {
  width: 750px;
  height: 321px;
  /* background: orchid; */
  line-height: 321px;
  text-align: center;
}
.binnar-position {
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 991px;
  width: 200px;
  height: 680px;
}
.binnar-position a {
  display: inline-block;
  width: 200px;
  height: 77px;
  line-height: 77px;
  border-bottom: 1px solid rgb(229, 229, 229);
}
.binnar-position a span {
  margin-left: 3px;
}
.binnar-position p {
  height: 51px;
  line-height: 50px;
  border-bottom: 2px solid rgb(5, 132, 100);
  color: rgb(5, 132, 100);
  font-size: 16px;
}
.sale {
  position: absolute;
  top: 321px;
  left: 0px;
  width: 750px;
  height: 360px;
  line-height: 402px;
}
.sale h2 {
  height: 50px;
  text-indent: 15px;
  line-height: 50px;
  border-bottom: 2px solid rgb(16, 182, 140);
}
.binnar-position .binnar-img {
  position: relative;
  left: 5px;
  width: 190px;
  height: 160px;
  line-height: 160px;
  text-align: center;
  /* background: yellowgreen; */
}
.binnar-img a {
  width: 100%;
  height: 100%;
}
.binnar-img a img {
  width: 100%;
  height: 100%;
}
.next-binnar img {
  float: right;
}
.binnar-sale {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.binnar-sale a {
  position: relative;
  width: 186px;
  height: 308px;
  border-right: 1px solid rgb(229, 229, 229);
}
.binnar-sale a img {
  position: absolute;
  top: 150px;
  left: 22px;
  width: 140px;
  height: 140px;
}
.binnar-sale a div {
  position: absolute;
  top: 10px;
  left: 7px;
  width: 172px;
  height: 64px;
}
.binnar-sale a div p {
  width: 172px;
  height: 20px;
  line-height: 20px;
  color: #333333;
}
.binnar-sale a div .price {
  font-weight: bold;
  color: #c40000;
}
/* 品牌馆 */
.brand-hall {
  display: block;
  width: 1190px;
  height: 265px;
  margin: 0 auto;
  background: #ffffff;
}
.brand-hall .brand-hall-title {
  height: 30px;
  line-height: 30px;
  background: rgb(238, 238, 238);
  border-bottom: 2px solid #000000;
  font-size: 18px;
}
.brand-div {
  display: block;
  width: 1190px;
  height: 233px;
  margin: 0 auto;
}
.brand-left {
  float: left;
  width: 590px;
  height: 220px;
}
.brand-left a {
  width: 100%;
  height: 100%;
}
.brand-right {
  float: right;
  width: 590px;
  height: 220px;
}
.brand-right .bt {
  margin-bottom: 10px;
}
.bt li {
  width: 83px;
  height: 23px;
  text-align: center;
  line-height: 20px;
  margin-top: 1px;
  background: url("../assets/img/back.png");
  color: #ffffff;
}
.logo-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 590px;
  height: 192px;
}
/* 健康热点 */
.healthy {
  display: block;
  width: 1190px;
  height: 1150px;
  margin: 0 auto;
  background: rgb(238, 238, 238);
}
.healthy-title {
  height: 50px;
  line-height: 70px;
  margin-bottom: 2px;
  border-bottom: 2px solid black;
  font-size: 18px;
}
.upper {
  width: 1190px;
  height: 520px;
  margin-bottom: 20px;
}
.healthy-left {
  float: left;
  width: 190px;
  height: 520px;
}
.healthy-left img {
  width: 190px;
  height: 520px;
}
.upper .upper-ul {
  float: right;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1000px;
  height: 520px;
  background: #ffffff;
}
.upper .upper-ul li {
  width: 199px;
  height: 260px;
}
.upper-ul li a {
  position: relative;
  top: 0px;
  left: 0px;
  width: 199px;
  height: 260px;
}
.upper-ul li a div {
  position: absolute;
  top: 20px;
  /* left: 20px; */
  width: auto;
}
.upper-ul li a img {
  position: absolute;
  top: 110px;
  left: 30px;
  width: 140px;
  height: 140px;
}
.desc-text {
  width: 199px;
  text-align: center;
  color: rgb(153, 153, 153);
}
.desc-price {
  text-align: center;
  font-weight: bold;
  color: rgb(196, 0, 0);
}
.desc-price del {
  color: rgb(204, 204, 204);
}
.lower {
  width: 1190px;
  height: 520px;
  background: red;
}
.border-right {
  border-right: 1px solid rgb(228, 228, 228);
}
.border-bottom {
  border-bottom: 1px solid rgb(228, 228, 228);
}
/* 春夏常见疾病 */
.summer-spring {
  display: block;
  width: 1190px;
  height: 270px;
  margin: 0 auto;
  background: #ffffff;
}
.summer-spring h2 {
  height: 30px;
  border-bottom: 2px solid #000000;
  font-size: 18px;
  background: rgb(238, 238, 238);
}
.summer-pic {
  position: relative;
  width: 1190px;
  height: 240px;
}
.summer-pic a img {
  width: 100%;
  height: 100%;
  animation: ks-fadeIn 350ms linear 0ms 1 normal both;
}
.cold {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 240px;
  height: 240px;
}
.skin {
  position: absolute;
  top: 0px;
  left: 240px;
  width: 240px;
  height: 120px;
}
.uphot {
  position: absolute;
  top: 0px;
  left: 480px;
  width: 140px;
  height: 120px;
}
.bianmi {
  position: absolute;
  top: 0px;
  left: 620px;
  width: 130px;
  height: 120px;
}
.jianfei {
  position: absolute;
  top: 0px;
  left: 750px;
  width: 240px;
  height: 240px;
}
.shenxu {
  position: absolute;
  top: 0px;
  left: 990px;
  width: 200px;
  height: 240px;
}
.yanyan {
  position: absolute;
  width: 140px;
  height: 120px;
  top: 120px;
  left: 240px;
}
.weibing {
  position: absolute;
  top: 120px;
  left: 380px;
  width: 240px;
  height: 120px;
}
.shimian {
  position: absolute;
  top: 120px;
  left: 620px;
  width: 130px;
  height: 120px;
}
/* 中西药品，医疗器械，营养保健等 */
.medicine{
  display: block;
  width: 1190px;
  height: 570px;
  margin: 0 auto;
}
.medicine h2{
  height: 50px;
  line-height: 70px;
  font-size: 18px;
  border-bottom: 2px solid #000000;
}
.medicine-left{
  float: left;
  width: 190px;
  height: 520px;
}
.medicine-left img{
  width: 100%;
  height: 100%;
}
.medicine-ui{
  float: right;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1000px;
  height: 520px;
  background: #ffffff;
}
.medicine-ui li{
  width: 199px;
  height: 260px;
}
.medicine-ui li a{
  position: relative;
  width: 100%;
  height: 100%;
}
.medicine-ui li a img{
  position: absolute;
  top: 15px;
  left: 30px;
  width: 140px;
  height: 140px;
}
.goods-info{
  position:absolute;
  top: 190px;
  left: 0px;
  width: 199px;
}
.goods-info .goods-text{
  text-align: center;
  color: #000;
  font-size: 13px;
}
.goods-info .goods-price{
  text-align: center;
  color: rgb(203,31,31);
  font-weight: bold;
}
.goods-info .goods-price del{
  color: #999;
}
/* 页脚 */
.page-footer{
  width: 1190px;
  height: 340px;
  margin: 0 auto;
}
.server-list{
  width: 1190px;
  height: 140px;
  background: #ffffff;
}
.server-ui{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1190px;
  height: 140px;
}
.server-ui li{
  width: 297px;
  height: 100px;
}
.server-ui li a{
  position: relative;
  display: inline-block;
  top: 0px;
  width: 297px;
  height: 100px;
}
.server-ui li a span{
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
.server-ui li a h3{
  position: absolute;
  top: 20px;
  left: 135px;
  font-weight: bold;
}
.server-ui li a p{
  position: absolute;
  top: 45px;
  left: 135px;
  color: #999999;
  font-size: 16px;
}
.shoping-guide{
  width: 1190px;
  height: 215px;
  margin: 0 auto;
  border-top: 1px solid rgb(237,237,237);
  background: #ffffff;
  padding-top: 20px;
}
.shoping-list{
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
.shoping-list li .shoping-ui li{
  width: 100px;
  height: 20px;
  margin-bottom: 3px;
}
.shoping-ui li a:hover{
  border-bottom: 1px solid #666666;
}
.first-server{
  font-size: 16px;
  color: #666666!important;
}
.first-serve a{
  color: #000000!important;
}
.black-footer{
  width: 100%;
  height: 175px;
  background: #000000;
  border-top: 2px solid rgb(255,0,54)
}
.black-footer div{
  display: block;
  width: 1190px;
  height: 175px;
  margin: 0 auto;
  padding-top: 10px;
}
.footer-record{
  height: 30px;
  line-height: 20px;
}
.footer-record a{
  font-weight: 300;
  font-size: 12px;
  color: rgb(255,255,255);
}
.footer-record a:hover{
  border-bottom: 1px solid #ffffff;
}
.licence{
  font-size: 12px;
  color: rgb(136, 134, 134);
}
.licence a{
  margin-right: 40px;
  font-size: 12px;
  color: rgb(164,164,164);
}
.licence a:hover{
  border-bottom: 1px solid rgb(164,164,164);
}
.gongshang{
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
.ant-layout-footer{
  padding: 0px;
}
</style>
