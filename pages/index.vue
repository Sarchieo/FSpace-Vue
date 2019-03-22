<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type='home'></f-space-header>
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
                <img v-lazy="'//m.360buyimg.com/babel/jfs/t1/26491/29/9870/42039/5c820018E6ac9f854/55c42a68a489cd18.jpg'" class="banner-pic">
              </div>
              <div>
                <img v-lazy="'//img30.360buyimg.com/img/jfs/t15169/46/1365117661/178502/d02d6948/5a4ddc4eNbd55867a.jpg'" class="banner-pic">
              </div>
              <div>
                <img v-lazy="'//img30.360buyimg.com/img/jfs/t16327/24/1234872079/191114/a510775d/5a4ddbc6N2d73dd08.jpg'" class="banner-pic">
              </div>
              <div>
                <img v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'" class="banner-pic">
              </div>
            </a-carousel>
          </div>
          <div class></div>
        </div>
        <div id='hot' class="brand-hall" v-for="(item,index) in rushList" :key="index">
          <p class="brand-hall-title">{{item.title}} <a class="all-hot" @click="toLimited()">查看全部抢购 <a-icon type="right" /> </a></p>
          <div class="brand-div">
            <div class="brand-left">
              <p class="brand-time">{{item.time}}</p>
              <a-icon type="thunderbolt" class="brand-lightning"/>
              <p class="over-distance">距离结束还有</p>
              <p class="count-down">
                <button>1</button>:
                <button>05</button>:
                <button>12</button>
              </p>
              <button class="see-whole">查看全部<a-icon type="right" /></button>
            </div>
            <ul class="brand-right">
              <li v-for="(items,index) in item.list" :key="index">
                <a-card
                  hoverable
                  class="card"
                >
                  <img
                    class="card-img"
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
        <div id="top" class="brand-hall" v-for="(item,index) in hotSelling" :key="index">
          <p class="brand-hall-title">{{item.title}} <a>查看全部<a-icon type="right" /></a> </p>
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
          <div id="free-delivery" class="brand-hall" v-for="(item,index) in freeDelivery" :key="index">
          <p class="brand-hall-title">{{item.title}}<a>查看全部<a-icon type="right" /></a></p>
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
        <div id='choice' class="elaborate" v-for="(item,index) in elaborateList" :key="index">
          <p class="elaborate-title">{{item.title}}</p>
          <ul class="elaborate-ui">
            <li v-for="(items,index) in item.list" :key="index">
              <a-card
                  hoverable
                  class="elaborate-card"
                >
                  <img
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
      <f-space-footer></f-space-footer>
    </a-layout>
      <ul class="sider-meun">
        <li class="right-meun" :class="{'active': goodsTypes}" @click="goodsType()">
          <a>商品分类</a>
        </li> 
        <li class="right-meun" :class="{'active': limitedTimes}" @click="limitedTime()">
          <a>限时抢购</a>
        </li>
         <li class="right-meun to-top" v-show="isShowToTop" @click="goTotop()" ref="toTop">
          <a-icon type="to-top" />
          <a>回到顶部</a>
        </li>
        <li class="right-meun" :class="{'active': hotSells}" @click="hotSell()">
          <a>热销专区</a>
        </li>
        <li class="right-meun" :class="{'active': freeShippings}" @click="freeShipping()">
          <a>包邮专区</a>
        </li>
        <li class="right-meun" :class="{'active': chooses}" @click="choose()">
          <a>为你精选</a>
        </li>
    </ul>
  </div>
</template>
<script>
import FSpaceHeader from "../components/fspace-ui/header/header";
import FSpaceMenu from "../components/fspace-ui/menu";
import FSpaceFooter from "../components/fspace-ui/footer";

export default {
  components: {
    FSpaceHeader,
    FSpaceMenu,
    FSpaceFooter
  },
  data() {
    return {
      isShowToTop: false,
      goodsTypes: false,
      limitedTimes: false,
      hotSells: false,
      freeShippings: false,
      chooses: false,
      isShowBackTop: false,
      GUID: '',
      elaborateList: [
        {
          title: '为你精选',
          list: [
            {
              src: '//img.alicdn.com/imgextra/i2/2928278102/O1CN01CglrRQ29ilQVNceiu_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 12
            },
             {
              src: '//img.alicdn.com/imgextra/i1/2928278102/O1CN01Yg8eie29ilQSi2xt1_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 22
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1hNj_PXXXXXcrXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 3
            },
             {
              src: '//img.alicdn.com/imgextra/i2/TB1cFVoNVXXXXbhapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 4
            },
             {
              src: '//img.alicdn.com/imgextra/i1/TB11m47NpXXXXXzaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 5
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB19dR6KVXXXXapXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 6
            },
             {
              src: '//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
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
              src: 'http://img.alicdn.com/imgextra/i7/TB1kLY0MXXXXXXKXXXXhFn4.FXX_110224.jpg_160x160q90.jpg',
              text: '九芝堂六味地黄丸',
              specifications: '0.5g*50片',
              manufacturer: '上海强生制药有限公司',
              validity: '2019-05-01',
              old: 20,
              new: 30,
              sold: 9
            },
             {
              src: 'http://img.alicdn.com/imgextra/i5/TB1YqVlLpXXXXakXpXX9fLt8XXX_020819.jpg_160x160q90.jpg',
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
      freeDelivery: [
         {
          title: '包邮专区',
          list: [
            {
              src:'//img.alicdn.com/imgextra/i2/TB1RMTfIFXXXXX.XVXXLJcJ8VXX_033554.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i5/TB1YqVlLpXXXXakXpXX9fLt8XXX_020819.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i4/TB1fOw2LpXXXXc0XFXXY34r9VXX_045741.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i5/TB19qVpGpXXXXbjXVXXi5Ck.pXX_102824.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i5/TB13WoBMpXXXXbIXVXXD9FsFVXX_095711.jpg_160x160q90.jpg',
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
      hotSelling: [
        {
          title: '热销专区',
          list: [
            {
              src:'//img.alicdn.com/bao/uploaded/TB1EXgPLXXXXXa6XXXXSutbFXXX.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i1/TB128oqNXXXXXcGXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/imgextra/i4/TB1vhv2OXXXXXXCXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/bao/uploaded/TB1qwZsLXXXXXa0XVXXSutbFXXX.jpg_160x160q90.jpg',
              validity: '2022-02-15',
              old: 23,
              new: 22,
              text: '领券减+六叶】汇仁牌肾宝片',
              specifications: '10g*9袋',
              manufacturer: '华润三九医药股份有限公司',
              sold: 666
            },
             {
              src:'//img.alicdn.com/bao/uploaded/TB1dwgHLXXXXXcQXFXXSutbFXXX.jpg_160x160q90.jpg',
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
          src: '//img.alicdn.com/imgextra/i4/772458181/O1CN01nczH7S2AIwiKUl1NB_!!0-item_pic.jpg_q90.jpg',
          old: 100.50,
          new: 95
        },
        {
          total: 120,
          surplus: 59,
          text: '山东东阿阿胶250g铁盒阿胶块',
          src: '//img.alicdn.com/imgextra/i3/1902685596/O1CN01vvrsd81rD0sDn5A8o_!!0-item_pic.jpg_q90.jpg',
          old: 300,
          new: 295
        },
        {
          total: 120,
          surplus: 10,
          text: '买1得好礼】盘龙云海排毒养',
          src: '//img.alicdn.com/imgextra/i2/2255157576/O1CN01dAxJAz25pr62D8NDd_!!0-item_pic.jpg_q90.jpg',
          old: 52,
          new: 45
        }]
        }
      ]
    };
  },
  mounted() {
    // this.initData();
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {  
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // var toTop = this.$refs['toTop'].style
      // console.log(toTop)
      if (scrollTop > 0) {
        this.isShowToTop = true
        this.isShowBackTop = true
        toTop.height = '80px'
        toTop.transition = 'height 2s'
      } else {
        this.isShowToTop = false
        this.isShowBackTop = false
      }
      if (scrollTop > 100 && scrollTop < 610 ) {
        this.goodsTypes = true
         this.chooses = false
         this.freeShippings = false
         this.hotSells = false
         this.limitedTimes = false
      } else if (scrollTop > 620 && scrollTop < 970){
        this.limitedTimes = true
        this.goodsTypes = false
         this.freeShippings = false
         this.hotSells = false
         this.chooses = false
      } else if (scrollTop > 980 && scrollTop < 1330){
         this.hotSells = true
         this.limitedTimes = false
         this.goodsTypes = false
          this.freeShippings = false
          this.chooses = false
      } else if (scrollTop > 1340 && scrollTop < 1690){
         this.freeShippings = true
         this.hotSells = false
         this.limitedTimes = false
         this.goodsTypes = false
         this.chooses = false
      } else if (scrollTop > 1700){
        this.chooses = true
         this.freeShippings = false
         this.hotSells = false
         this.limitedTimes = false
         this.goodsTypes = false
      }
    },
    async createFingerprint(components) {
      let _this = this
      //  setTimeout(function () {
      //   Fingerprint2.get(function (components) {
      //     console.log(components)
      //     let id = components[5].value + components[15].value + components[19].value + components[26].value.length + components[27].value
      //     _this.GUID = id
      //     console.log(_this.GUID)
      //   })
      //  },500)
    },
    goTotop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    goodsType() {
      document.body.scrollTop = document.documentElement.scrollTop = 100;
      this.goodsTypes = true
      this.chooses = false
      this.freeShippings = false
      this.hotSells = false
      this.limitedTimes = false
    },
    limitedTime() {
      document.body.scrollTop = document.documentElement.scrollTop = 620;
      this.limitedTimes = true
      this.goodsTypes = false
      this.freeShippings = false
      this.hotSells = false
      this.chooses = false
    },
    hotSell() {
      document.body.scrollTop = document.documentElement.scrollTop = 980;
      this.hotSells = true
      this.limitedTimes = false
      this.goodsTypes = false
      this.freeShippings = false
      this.chooses = false
    },
    freeShipping() {
      document.body.scrollTop = document.documentElement.scrollTop = 1340;
      this.freeShippings = true
      this.hotSells = false
      this.limitedTimes = false
      this.goodsTypes = false
      this.chooses = false
    },
    choose() {
      document.body.scrollTop = document.documentElement.scrollTop = 1700;
      this.chooses = true
      this.freeShippings = false
      this.hotSells = false
      this.limitedTimes = false
      this.goodsTypes = false
    },
    goBackTop() {
      debugger
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    toDetailsPages() {
      this.$router.push({
        path:'/product/detail'
      })
    },
    toLimited() {
      this.$router.push({
        path:'/activity/limited'
      })
    },
    async initData() {
      debugger
      if(!this.$store.getters.userState) {
        this.getBasicInfo()
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "../components/fspace-ui/container/index.less";
@import "../components/fspace-ui/button/index.less";
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
.active {
  background: #FF0036!important;
  color: #ffffff!important;
}
.active a{
  color: #ffffff!important;
}
/* 限时抢购 */
.card{
  position: relative;
  width: 228px;
  height:280px;
}
.card:hover {
  box-shadow:20px 10px 20px 10px #e0e0e0;
}
.surplus{
  .container-size(inline-block,225px,auto,0,0px);
  .position(absolute,168px,0px);
  text-indent: 40px;
  color: rgb(255, 0, 54);
}
.card-img{
  .position(absolute,15px,45px);
  .container-size(inline-block,135px,123px,0,0px);
}
.card-progress{
  .position(absolute,0px,0px);
}
.card-info{
  .position(absolute,195px,0px);
  .container-size(inline-block,225px,auto,0,0px);
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
}
.card-price{
  .position(absolute,235px,0px);
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
  .position(absolute,145px,0px);
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
  .position(absolute,205px,0px);
  width: 228px;
  text-indent: 24px;
  color: #999;
}
.manufacturer{
  .position(absolute,225px,0px);
  width: 228px;
  text-indent: 24px;
  color: #999;
}
.sold{
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 228px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-top: 1px solid rgb(238,238,238);
  color: #999;
}
/* 为你精选 */
.elaborate{
  .container-size(block,1190px,auto,0 auto,0px);
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
  .position(relative,0px,0px);
  .container-size(inline-block,383px,220px,0,0px);
}
.elaborate-card img{
  .position(absolute,25px,10px);
  .container-size(inline-block,170px,170px,0,0px);
}
.elaborate-text{
  .position(absolute,32px,200px);
  width: 170px;
  color: #000000;
  font-size: 16px;
}
.elaborate-specifications{
  .position(absolute,54px,200px);
  width: 170px;
}
.elaborate-manufacturer{
  .position(absolute,76px,198px);
  width: 170px;
}
.elaborate-validity{
  .position(absolute,98px,198px);
  width: 170px;
}
.elaborate-price{
  .position(absolute,130px,195px);
  width: 170px;
  color: rgb(238,47,38);
  font-size: 20px;
  font-weight: bold;
}
.elaborate-sold{
  .position(absolute,165px,198px);
  color: #999;
}
.elaborate-title{
  height: 50px;
  line-height: 50px;
  font-size: 22px;
}
/* 热销专区，包邮专区 */
.brand-hall {
  .container-size(block,1190px,330px,0 auto,0px);
  background: #ffffff;
  margin-bottom: 20px;
}
.brand-hall .brand-hall-title {
  height: 50px;
  line-height: 50px;
  background: rgb(238, 238, 238);
  font-size: 22px;
}
.brand-hall-title a{
  float: right;
}
.brand-hall-title .all-hot{
  float: right;
  font-size: 20px;
  color:  #c40000;
}
.brand-div {
  .container-size(block,1190px,280px,0 auto,0px);
  background: rgb(238,238,238);
}
.brand-left {
  float: left;
  position: relative;
  width: 228px;
  height: 280px;
  background: #E6E6E6;
}
.brand-lightning {
  .position(absolute,60px,90px);
  font-size: 48px;
  color: rgb(245,47,94);
}
.count-down {
  .position(absolute,160px,0px);
  width: 220px;
  text-align: center;
}
.count-down button {
  .button-size (35px,35px,35px,14px,0,3px);
  .button-color (1px solid transparent,#666666,#ffffff);
   margin-right: 5px;
}
.over-distance {
  .position(absolute,125px,0px);
  width: 228px;
  text-align: center;
  font-size: 16px;
}
.see-whole {
  .position(absolute,220px,40px);
  .button-size (150px,40px,40px,14px,0,30px);
  .button-color (1px solid #c40000,#F2F2F2,#c40000);
}
.brand-left a {
  width: 100%;
  height: 100%;
}
.brand-time{
  .position(absolute,15px,0px);
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
.ant-carousel > .slick-slide {
  text-align: center;
  height: 435px;
  line-height: 435px;
  overflow: hidden;
}

.ant-carousel > .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31,45,61,.11);
  opacity: 0.3;
}
.ant-carousel > .custom-slick-arrow:before {
  display: none;
}
.ant-carousel > .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel > .slick-slide  h3 {
  color: #fff;
}
.goods-nav-box {
  .container-size(block,1190px,435px,0 auto,0px);
  position: relative;
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
  .container-size(inline-block,995px,435px,0,0px);
  .position(absolute,0px,197px);
}
.binnar-pic {
  width: 750px;
  height: 321px;
  /* background: orchid; */
  line-height: 321px;
  text-align: center;
}
/* 右侧菜单栏 */
.sider-meun{
  position: fixed;
  top: 300px;
  right: 10px;
  width: 85px;
  height:400px;
  background: rgb(238,238,238);
}
.sider-meun .right-meun{
  width: 85px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background: #ffffff;
  color: #666;
}
.right-meun i {
  display: block;
  position: relative;
  top: 7px;
  font-size: 28px;
}
.to-top {
  height: 0px;
}
.to-top a{
  position: relative;
  top: -10px;
}
.ant-anchor-link {
  padding: 7px 0 7px 16px;
  line-height: 1.143;
}
.ant-anchor-link-title {
  display: block;
  position: relative;
  transition: all 0.3s;
  color: rgba(0, 0, 0, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;
}
.ant-anchor-link-title:only-child {
  margin-bottom: 0;
}
.ant-anchor-link-active > .ant-anchor-link-title {
  color: #1890ff;
}
.ant-anchor-link .ant-anchor-link {
  padding-top: 5px;
  padding-bottom: 5px;
}

.wrap-right {
  height: 420px;
}
.sider-meun .right-meun:hover{
  background: rgb(255, 0, 54);
  color: #ffffff;
}
.right-meun:hover a{
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
