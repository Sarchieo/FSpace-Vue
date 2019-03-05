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
                  <img
                    src="//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg"
                    alt
                  >
                </div>
                <div>
                  <img
                    src="//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg"
                    alt
                  >
                </div>
                <div>
                  <img
                    src="//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg"
                    alt
                  >
                </div>
                <div>
                  <img
                    src="//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg"
                    alt
                  >
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
                    <img
                      src="//img.alicdn.com/imgextra/i3/1902685596/O1CN01vvrsd81rD0sDn5A8o_!!0-item_pic.jpg_q90.jpg"
                      alt
                    >
                  </a>
                  <a href>
                    <div>
                      <p>进口无针注射针器胰岛素</p>
                      <p></p>
                      <p class="price">￥21.3元</p>
                    </div>
                    <img
                      src="//img.alicdn.com/imgextra/i2/2255157576/O1CN01dAxJAz25pr62D8NDd_!!0-item_pic.jpg_q90.jpg"
                      alt
                    >
                  </a>
                  <a href>
                    <div>
                      <p>满赠发礼】云南白药三七</p>
                      <p></p>
                      <p class="price">￥21.3元</p>
                    </div>
                    <img
                      src="//img.alicdn.com/imgextra/i4/772458181/O1CN01nczH7S2AIwiKUl1NB_!!0-item_pic.jpg_q90.jpg"
                      alt
                    >
                  </a>
                  <a href>
                    <div>
                      <p>益捷德国进口胰岛素无针</p>
                      <p></p>
                      <p class="price">￥21.3元</p>
                    </div>
                    <img
                      src="//img.alicdn.com/imgextra/i4/911757567/O1CN01hJ3I7b25ljWuhSGYJ_!!0-item_pic.jpg_q90.jpg"
                      alt
                    >
                  </a>
                </div>
              </div>
            </div>
            <div class="binnar-position">
              <div class="binnar-img">
                <a href>
                  <img
                    src="//img.alicdn.com/tps/TB16TwaKVXXXXauXVXXXXXXXXXX-190-160.png_q90.jpg"
                    alt
                  >
                </a>
              </div>
              <div class="binnar-img">
                <a href>
                  <img
                    src="//img.alicdn.com/tps/i1/TB1oT0WHpXXXXXHaXXXEeH32pXX-190-160.jpg_q90.jpg"
                    alt
                  >
                </a>
              </div>
              <p>下期预告</p>
              <a href class="next-binnar">
                <span>同仁堂麻仁丸60克</span>
                <img
                  src="//img.alicdn.com/imgextra/i3/1588915138/TB2Oz3baXXXXXadXpXXXXXXXXXX_!!1588915138.jpg_70x70q90.jpg"
                  alt
                >
              </a>
              <a href class="next-binnar">
                <span>白云山 风油精3ml</span>
                <img
                  src="//img.alicdn.com/imgextra/i2/2110807016/TB2N6i1cVXXXXbsXpXXXXXXXXXX_!!2110807016.jpg_70x70q90.jpg"
                  alt
                >
              </a>
              <a href class="next-binnar">
                <span>金寿 麝香壮骨膏</span>
                <img
                  src="//img.alicdn.com/imgextra/i3/2029339133/TB2SeS5bBLzQeBjSZFCXXXmtXXa_!!2029339133.jpg_70x70q90.jpg"
                  alt
                >
              </a>
              <a href class="next-binnar">
                <span>上海龙虎牌 清凉鼻</span>
                <img
                  src="//img.alicdn.com/imgextra/i3/2643613580/TB2patTqFXXXXcAXXXXXXXXXXXX_!!2643613580.jpg_70x70q90.jpg"
                  alt
                >
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
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
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
  background: #000000;
  color: #ffffff;
}
#components-layout-demo-basic .ant-layout-footer {
  height: 175px;
  line-height: 1.5;
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
</style>
