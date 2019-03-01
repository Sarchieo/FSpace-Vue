<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout>
        <!-- 页头 -->
        <a-layout-header>
          <div class="header-title">
            <div class="header-left">
              <span>一块医药首页</span>
              <span>欢迎来到一块医药</span>
              <span>请登录</span>
              <span>免费注册</span>
            </div>
            <div class="header-right">
              <span>我的淘宝</span>
              <span>购物车</span>
              <span>收藏夹</span>
              <span>手机版</span>
              <span>淘宝网</span>
              <span>商家支持</span>
              <span>网站导航</span>
            </div>
          </div>
          <div class="medicine-names">
            <div class="medicine-name-box">
              <div class="medicine-name">
                <span>一块医药</span>
              </div>
              <div class="medicine-search">
                <div class="search-box">
                  <a-input placeholder="搜索本店商品"/>
                  <a-button>搜本店</a-button>
                </div>
              </div>
            </div>
            <div class="nav-box">
              <a href>首页</a>
              <a href>网络医院名医面对面</a>
              <a href>阿里健康旗舰店</a>
              <a href>中国医药O2O先锋联盟</a>
              <a href>阿里健康大药房</a>
            </div>
          </div>
        </a-layout-header>
        <!-- 左侧菜单，轮播，广告位及物价区 -->
        <a-layout-content>
          <div class="goods-nav-box">
            <ul class="sider-menu">
             
              <li
                v-for="(item,index) in list"
                :key="index"
                :ref ='"li" + index'
                class="sider-menu-li"
                @mouseover="addClass(item, index)"
                @mouseout="reduceClass(item)"
              >
               <!-- v-show=" item.isActive" -->
               <div :ref='"hover" + index' class="hover-show">
                 <!-- <div>2</div>
                 <div>3</div>
                 <div>4</div>
                 <div>5</div> -->
              </div>
                <div :class="{ 'selectLi': item.isActive, 'selectLi-a': !item.isActive }">
                  <h3>
                    <a href>{{item.title}}</a>
                    <a-icon type="right" v-show="!item.isActive"/>
                  </h3>
                  <div class="drugs-type">
                    <a
                      href
                      v-for="(items,index) in item.list"
                      :key="index"
                      :class="{greenColor: items.flag }"
                    >{{items.name}}</a>
                    <!-- <a href="">计生避孕</a>
                    <a href="">补肾用药</a>
                    <a href="">养胃护胃</a>
                    <a href="">腰腿疼痛</a>
                    <a href="">男科用药</a>
                    <a href="">妇科用药</a>
                    <a href="">儿科用药</a>
                    <a href="">换季感冒</a>-->
                  </div>
                </div>
              </li>
            </ul>
            <div class="binnar-box">
              <a-carousel autoplay>
                <div>
                  <h3 class="binnar-pic">1</h3>
                </div>
                <div>
                  <h3 class="binnar-pic">2</h3>
                </div>
                <div>
                  <h3 class="binnar-pic">3</h3>
                </div>
                <div>
                  <h3 class="binnar-pic">4</h3>
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
                      <p>￥21.3元</p>
                    </div>
                    <img src="2.jpg" alt>
                  </a>
                  <a href>
                    <div>
                      <p>美国进口now foods玛卡秘</p>
                      <p></p>
                      <p>￥21.3元</p>
                    </div>
                    <img src="2.jpg" alt>
                  </a>
                  <a href>
                    <div>
                      <p>美国进口now foods玛卡秘</p>
                      <p></p>
                      <p>￥21.3元</p>
                    </div>
                    <img src="2.jpg" alt>
                  </a>
                  <a href>
                    <div>
                      <p>美国进口now foods玛卡秘</p>
                      <p></p>
                      <p>￥21.3元</p>
                    </div>
                    <img src="2.jpg" alt>
                  </a>
                </div>
              </div>
            </div>
            <div class="binnar-position">
              <div class="binnar-img">广告位1</div>
              <div class="binnar-img">广告位2</div>
              <p>下期预告</p>
              <a href></a>
              <a href></a>
              <a href></a>
              <a href></a>
            </div>
            <div class></div>
          </div>
          <div class="brand-hall">
            <p class="brand-hall-title">品牌馆</p>
          </div>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
      <a-layout-sider width="30"></a-layout-sider>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: "家庭常备",
          isActive: false,
          list: [
            {
              flag: false,
              name: "体检套餐",
              url: ""
            },
            {
              flag: true,
              name: "计生避孕",
              url: ""
            },
            {
              flag: false,
              name: "补肾用药",
              url: ""
            },
            {
              flag: false,
              name: "养胃护胃",
              url: ""
            },
            {
              flag: false,
              name: "腰腿疼痛",
              url: ""
            },
            {
              flag: false,
              name: "男科用药",
              url: ""
            },
            {
              flag: true,
              name: "妇科用药",
              url: ""
            },
            {
              flag: false,
              name: "儿科用药",
              url: ""
            },
            {
              flag: false,
              name: "换季感冒",
              url: ""
            }
          ],
          hoverMenu: []
        },
        {
          title: "中西药品",
          isActive: false,
          list: [
            {
              flag: false,
              name: "肠胃用药",
              url: ""
            },
            {
              flag: false,
              name: "阳痿早泄",
              url: ""
            },
            {
              flag: false,
              name: "心脑血管",
              url: ""
            },
            {
              flag: false,
              name: "皮肤用药",
              url: ""
            },
            {
              flag: true,
              name: "肝胆用药",
              url: ""
            },
            {
              flag: true,
              name: "避孕药品",
              url: ""
            },
            {
              flag: false,
              name: "生发脱发",
              url: ""
            },
            {
              flag: false,
              name: "五官用药",
              url: ""
            },
            {
              flag: false,
              name: "补肾用药",
              url: ""
            }
          ]
        },
        {
          title: "健康保健",
          isActive: false,
          list: [
            {
              flag: false,
              name: "美容养颜",
              url: ""
            },
            {
              flag: true,
              name: "补肾强身",
              url: ""
            },
            {
              flag: false,
              name: "增强免疫",
              url: ""
            },
            {
              flag: false,
              name: "补维生素",
              url: ""
            },
            {
              flag: false,
              name: "调节血脂",
              url: ""
            },
            {
              flag: false,
              name: "减肥瘦身",
              url: ""
            },
            {
              flag: false,
              name: "缓解疲劳",
              url: ""
            },
            {
              flag: false,
              name: "纤体排毒",
              url: ""
            },
            {
              flag: true,
              name: "滋补养生",
              url: ""
            }
          ]
        },
        {
          title: "医疗器械/隐形",
          isActive: false,
          list: [
            {
              flag: false,
              name: "血压计",
              url: ""
            },
            {
              flag: false,
              name: "血糖仪",
              url: ""
            },
            {
              flag: false,
              name: "隐形眼镜",
              url: ""
            },
            {
              flag: false,
              name: "胎心仪",
              url: ""
            },
            {
              flag: false,
              name: "雾化器",
              url: ""
            },
            {
              flag: false,
              name: "助听器",
              url: ""
            },
            {
              flag: true,
              name: "避孕套",
              url: ""
            },
            {
              flag: false,
              name: "按摩器材",
              url: ""
            },
            {
              flag: false,
              name: "制氧机",
              url: ""
            }
          ]
        },
        {
          title: "滋补养生",
          isActive: false,
          list: [
            {
              flag: false,
              name: "蜂蜜",
              url: ""
            },
            {
              flag: false,
              name: "润肺养胃",
              url: ""
            },
            {
              flag: true,
              name: "补肾明目",
              url: ""
            },
            {
              flag: false,
              name: "美容养颜",
              url: ""
            },
            {
              flag: false,
              name: "提神醒脑",
              url: ""
            },
            {
              flag: true,
              name: "滋阳调胃",
              url: ""
            },
            {
              flag: false,
              name: "三七",
              url: ""
            },
            {
              flag: false,
              name: "冬虫夏草",
              url: ""
            },
            {
              flag: false,
              name: "提升免疫",
              url: ""
            }
          ]
        }
      ]
    };
  },
  methods: {
    addClass(item, index) {
      this.$refs['hover' + index][0].style.top = index * -this.$refs['li' + index][0].clientHeight + 'px'
      this.$refs['li' + index][0].style.borderRight = ''
      item.isActive = true;
    },
    reduceClass(item) {
      item.isActive = false;
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
#components-layout-demo-basic .ant-layout-header {
  height: 170px;
  line-height: 30px;
  padding: 0px;
  background: rgb(242, 242, 242);
  color: gray;
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
/* 头部 */
.header-title {
  width: 1190px;
  height: 30px;
  margin: 0 auto;
}
.header-title span {
  margin-right: 10px;
}
.header-left {
  display: inline-block;
  width: 365px;
}
.header-right {
  float: right;
  width: 445px;
  margin-right: 50px;
}
.medicine-names {
  display: block;
  background: #ffffff;
}
.medicine-name-box {
  display: block;
  width: 1190px;
  height: 100px;
  margin: 0 auto;
  padding-top: 20px;
  background: #ffffff;
}
.medicine-name {
  display: inline-block;
  width: 200px;
  height: 50px;
  line-height: 50px;
}
.medicine-name span {
  color: black;
}
.medicine-search {
  display: inline-block;
  width: 500px;
  height: 36px;
  margin-left: 150px;
  border: 2px solid rgb(255, 0, 54);
  background: rgb(255, 0, 54);
}
.nav-box {
  display: block;
  width: 1190px;
  height: 40px;
  line-height: 60px;
  margin: 0 auto;
  background: #ffffff;
}
.nav-box a {
  margin-right: 20px;
  color: black;
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
  display: inline-block;
  width: 240px;
  height: 680px;
  box-shadow: 1px 1px 3px #999;
  z-index: 99;
}
.sider-menu-li {
  position: relative;
  width: 240px;
  height: 132px;
  box-sizing: border-box;
  /* border: 2px solid #10b68c; */
}
.hover-show {
  position: absolute;
  top: 0px;
  left: 220px;
  width: 650px!important;
  height: 680px!important;
  background: #ffffff;
  border-top: 1px solid #10b68c!important;
  border-right: 1px solid #10b68c!important;
  border-bottom: 1px solid #10b68c!important;
  text-align: center;
  line-height: 680px;
  z-index: 101;
}
.hover-show div{
  width: 650px!important;
  height: 136px;
  border-left: 1px solid #10b68c;
}
.selectLi {
  border-left: 1px solid #10b68c;
  border-top: 1px solid #10b68c;
  border-bottom: 1px solid #10b68c;
  border-right: 1px solid #10b68c;
}
.selectLi-a {
  border-left: 1px solid #ffffff;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
}
.sider-menu-li div {
  width: 227px;
  height: 128px;
  padding-left: 10px;
  border-right: 2px solid #ffffff;
}
.sider-menu-li div h3 {
  margin: 4px 0 0;
  font-size: 14px;
  width: 227px;
  position: relative;
}
.sider-menu-li div h3 a {
  display: inline-block;
  width: 182px;
  height: 30px;
  color: rgb(95, 95, 95);
}
.drugs-type {
  width: 210px;
  height: 88px;
}
.drugs-type a {
  display: inline-block;
  width: 60px;
  margin-right: 5px;
  margin-bottom: 6px;
  color: #000000;
}
.drugs-type p {
  margin-bottom: 7px !important;
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
  background: orchid;
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
  height: 74px;
  border-bottom: 1px solid rgb(229, 229, 229);
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
  background: yellowgreen;
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
  background: #3189f5;
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
}
/* 品牌馆 */
.brand-hall {
  display: block;
  width: 1190px;
  height: 257px;
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
