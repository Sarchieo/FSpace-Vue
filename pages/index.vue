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
              <a-carousel autoplay arrows>
                <div
                  slot="prevArrow" slot-scope="props"
                  class="custom-slick-arrow"
                  style="left: 10px;zIndex: 1"
                >
                  <a-icon type="left-circle" />
                </div>
                <div
                  slot="nextArrow" slot-scope="props"
                  class="custom-slick-arrow"
                  style="right: 10px"
                >
                  <a-icon type="right-circle" />
                </div>
                <div>
                  <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" class="banner-pic">
                </div>
                <div>
                  <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" class="banner-pic">
                </div>
                <div>
                  <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" class="banner-pic">
                </div>
                <div>
                  <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" class="banner-pic">
                </div>
              </a-carousel>
            </div>
            <div class></div>
          </div>
          <div class="brand-hall" v-for="(item,index) in rushList" :key="index">
            <p class="brand-hall-title">{{item.title}} <a class="all-hot">查看全部抢购  > </a></p>
            <div class="brand-div">
              <div class="brand-left">
                <p>{{item.time}}</p>
              </div>
              <ul class="brand-right">
                <li v-for="(items,index) in item.list" :key="index">
                  <a-card
                    hoverable
                    class="card"
                  >
                    <img
                      class="card-img"
                      alt="example"
                      v-lazy="items.src"
                      slot="cover"
                    />
                    <a-progress :percent="items.surplus" style="position:absolute;top:145px;left:37.5px;width: 150px;" :showInfo="false" status="exception"/>
                    <p class="surplus">还剩{{items.surplus}}支</p>
                    <a-card-meta
                      class="card-info"
                      :title="items.text">
                    </a-card-meta>
                    <p class="card-price">￥{{items.new}} <del>￥{{items.old}}</del></p>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 热销专区 包邮专区 -->
          <div class="brand-hall" v-for="(item,index) in hotSelling" :key="index">
            <p class="brand-hall-title">{{item.title}}</p>
            <div class="brand-div">
              <ul class="brand-right hot-width">
                <li v-for="(items,index) in item.list" :key="index">
                  <a-card
                    hoverable
                    class="card"
                    @click="toDetailsPages"
                  >
                    <img
                      class="card-img"
                      alt="example"
                      v-lazy="items.src"
                      slot="cover"
                    />
                    
                    <p class="surplus text-Center top185">{{items.text}}</p>
                    <p class="validity">有效期至{{items.validity}}</p>
                    <p class="card-price top165">￥{{items.new}} <del>￥{{items.old}}</del></p>
                    <p class="specifications">{{items.specifications}}</p>
                    <p class="manufacturer">{{items.manufacturer}}</p>
                    <p class="sold">已售{{items.sold}}盒</p>
                    <a-card-meta
                      class="card-info"
                      :title="item.text">
                    </a-card-meta>
                    
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 为你精选 -->
          <div class="elaborate" v-for="(item,index) in elaborateList" :key="index">
            <p class="elaborate-title">{{item.title}}</p>
            <ul class="elaborate-ui">
              <li v-for="(items,index) in item.list" :key="index">
                <a-card
                    hoverable
                    class="elaborate-card"
                  >
                    <img
                      alt="example"
                      v-lazy="items.src"
                      slot="cover"
                    />
                    <p class="elaborate-text">{{items.text}}</p>
                    <p class="elaborate-specifications">{{items.specifications}}</p>
                    <p class="elaborate-manufacturer">{{items.manufacturer}}</p>
                    <p class="elaborate-validity">有效期至{{items.validity}}</p>
                    <p class="elaborate-price">￥{{items.old}} 至 ￥{{items.new}}</p>
                    <p class="elaborate-sold">已售{{items.sold}}瓶</p>
                    <a-card-meta
                      >
                    </a-card-meta>
                    <p></p>
                  </a-card>
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
       <ul class="sider-meun">
        <li>商品分类</li>
        <li>限时抢购</li>
        <li>热销专区</li>
        <li>包邮专区</li>
        <li>为你精选</li>
        <li>回到顶部</li>
      </ul>
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
      elaborateList: [
        {
          title: '为你精选',
          list: [
            {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 12
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 22
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 3
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 4
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 5
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 6
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 7
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 8
            }, 
            {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 9
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 0
            }
          ]
        }
      ],
      hotSelling: [
        {
          title: '热销专区',
          list: [
            {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            }
          ]
        },
         {
          title: '包邮专区',
          list: [
            {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            }
          ]
        }
      ],
      rushList: [
        {
         time: '12:00场',
         title: '限时抢购',
         list: [{
          total: 120,
          surplus: 36,
          text: '999 感冒灵颗粒 可抢2盒',
          src: '//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
          old: 10.50,
          new: 9.5
        },
        {
          total: 120,
          surplus: 89,
          text: '领券减+六叶】汇仁牌肾宝片',
          src: '//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
          old: 100.50,
          new: 95
        },
        {
          total: 120,
          surplus: 59,
          text: '山东东阿阿胶250g铁盒阿胶块',
          src: '//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
          old: 300,
          new: 295
        },
        {
          total: 120,
          surplus: 10,
          text: '买1得好礼】盘龙云海排毒养',
          src: '//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
          old: 52,
          new: 45
        }]
        }
      ]
    };
  },
  mounted() {
    this.initData()
  },
  methods: {
    toDetailsPages() {
      this.$router.push({
        path:'/product/detail'
      })
    },
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
/* 初始化 */
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
  /* min-height: 1000px; */
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
/* 限时抢购 */
.card{
  position: relative;
  width: 228px;
  height:280px;
}
.surplus{
  position: absolute;
  top: 168px;
  left: 0px;
  width: 225px;
  text-indent: 40px;
  color: rgb(255, 0, 54);
}
.card-img{
  position: absolute;
  top:15px;
  left: 45px;
  width: 135px;
  height: 123px;
}
.card-progress{
  position: absolute;
  top: 0px;
  left: 0px;
}
.card-info{
  position: absolute;
  top: 195px;
  left: 0px;
  width: 225px;
  height: auto;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
}
.card-price{
  position: absolute;
  top: 235px;
  left: 0px;
  width: 225px;
  text-align: center;
  font-weight: bold;
  color: rgb(255, 0, 54);
}
.card-price del{
  color: #999999;
}
.hot-width{
  width: 1190px!important;
}
.validity{
  position: absolute;
  top: 145px;
  left: 0px;
  width: 228px;
  text-align: center;
}
.top165{
  top: 165px!important;
}
.top185{
  top: 185px!important;
}
.specifications{
  position: absolute;
  top: 205px;
  left: 0px;
  width: 228px;
  text-indent: 24px;
  color: #999;
}
.manufacturer{
  position: absolute;
  top: 225px;
  left: 0px;
  width: 228px;
  text-indent: 24px;
  color: #999;
}
.sold{
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 228px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-top: 1px solid rgb(238,238,238);
  color: #999;
}
/* 为你精选 */
.elaborate{
  display: block;
  width: 1190px;
  height: auto;
  margin: 0 auto;
  background: rgb(238,238,238);
}
.elaborate-ui{
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  width: 1190px;
  height: auto;
}
.elaborate-ui li{
  width: 383px;
  height: 220px;
  margin-bottom: 22px;
  background: #ffffff;
}
.elaborate-card{
  position: relative;
  top:0px;
  left: 0px;
  width: 383px;
  height: 220px;
}
.elaborate-card img{
  position:absolute;
  top: 25px;
  left: 10px;
  width: 170px;
  height: 170px;
}
.elaborate-text{
  position: absolute;
  top: 32px;
  left: 200px;
  width: 170px;
  color: #000000;
  font-size: 16px;
}
.elaborate-specifications{
  position: absolute;
  top: 54px;
  left: 200px;
  width: 170px;
}
.elaborate-manufacturer{
  position: absolute;
  top: 76px;
  left: 198px;
  width: 170px;
}
.elaborate-validity{
  position: absolute;
  top: 98px;
  left: 198px;
  width: 170px;
}
.elaborate-price{
  position: absolute;
  top: 130px;
  left: 195px;
  width: 170px;
  color: rgb(238,47,38);
  font-size: 20px;
  font-weight: bold;
}
.elaborate-sold{
  position: absolute;
  top: 165px;
  left: 198px;
  color: #999;
}
.elaborate-title{
  height: 50px;
  line-height: 50px;
  font-size: 22px;
}
/* 热销专区，包邮专区 */
.brand-hall {
  display: block;
  width: 1190px;
  height: 330px;
  margin: 0 auto;
  background: #ffffff;
  margin-bottom: 20px;
}
.brand-hall .brand-hall-title {
  height: 50px;
  line-height: 50px;
  background: rgb(238, 238, 238);
  font-size: 22px;
}
.brand-hall-title .all-hot{
  float: right;
  font-size: 20px;
  color:  #c40000;
}
.brand-div {
  display: block;
  width: 1190px;
  height: 280px;
  margin: 0 auto;
  background: rgb(238,238,238);
}
.brand-left {
  float: left;
  position: relative;
  width: 228px;
  height: 280px;
  background: #fff;
}
.brand-left a {
  width: 100%;
  height: 100%;
}
.brand-left p{
  position: absolute;
  top: 15px;
  width: 228px;
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: rgb(245,47,94);
}
.brand-right {
  float: right;
  display: flex;
  justify-content: space-between;
  width: 950px;
  height: 280px;
  background: rgb(238,238,238);
}
.text-Center{
  text-align: center!important;
  text-indent: 0px!important;
}
/* 导航及广告轮播左侧菜单栏,广告位，特价区 */
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 435px;
  line-height: 435px;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31,45,61,.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide  h3 {
  color: #fff;
}
.goods-nav-box {
  display: block;
  position: relative;
  width: 1190px;
  height: 435px;
  margin: 0 auto;
  background: #ffffff;
  border-top: 1px solid rgb(238, 238, 238);
  margin-bottom: 25px;
}
.ant-carousel > .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  overflow: hidden;
}
.ant-carousel > .slick-slide h3 {
  color: #fff;
}
.banner-pic{
  width: 995px;
  height: 435px;
}
.binnar-box {
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 197px;
  width: 995px;
  height: 435px;
}
.binnar-pic {
  width: 750px;
  height: 321px;
  /* background: orchid; */
  line-height: 321px;
  text-align: center;
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
  height: 200px;
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
  /* height: 175px; */
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
/* 右侧菜单栏 */
.sider-meun{
  position: fixed;
  top: 300px;
  right: 10px;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  width: 85px;
  height:550px;
  background: rgb(238,238,238);
}
.sider-meun li{
  width: 85px;
  height: 85px;
  line-height: 85px;
  text-align: center;
  background: #ffffff;
  color: #666;
}
.sider-meun li:hover{
  background: rgb(255, 0, 54);
  color: #ffffff;
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
