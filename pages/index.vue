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
        <a-anchor :affix="false"  :showInkInFixed='false' wrapperClass="wrap-right">
          <a-anchor-link class="right-meun" href="#components-layout-demo-basic" title="商品分类" />
          <a-anchor-link class="right-meun" href="#hot" title="限时抢购" />
          <a-anchor-link class="right-meun" href="#top" title="热销专区" />
          <a-anchor-link class="right-meun" href="#free-delivery" title="包邮专区" />
          <a-anchor-link class="right-meun" href="#choice" title="为你精选" />
          <a-back-top />
        </a-anchor>
    </ul>
  </div>
</template>
<script>
import FSpaceHeader from "../components/fspace-ui/header/header";
import FSpaceMenu from "../components/fspace-ui/menu";
import FSpaceFooter from "../components/fspace-ui/footer";
// import Fingerprint2 from 'fingerprintjs2'

export default {
  components: {
    FSpaceHeader,
    FSpaceMenu,
    FSpaceFooter
  },
  data() {
    return {
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
    this.initData();
    this.createFingerprint()
  },
  methods: {
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
    toDetailsPages() {
      this.$router.push({
        path:'/product/detail'
      })
    },
    async initData() {
      // let iRequest = new inf.IRequest();
      // iRequest.cls = "UserServerImp";
      // iRequest.method = "login";
      // iRequest.param.json = JSON.stringify({
      //   username: 'admin',
      //   password: 'admin'
      // }) 
      // iRequest.param.token = '1234'
      // this.$refcallback(
      //   "userServer",
      //   iRequest,
      //   new this.$iceCallback(
      //     function result(result) {
      //       console.log(result)
      //     }
      //   )
      // );

      let iRequest = new inf.IRequest();
      iRequest.cls = "UserServerImp";
      iRequest.method = "loginSuccessTest";
      // iRequest.param.json = JSON.stringify({
      //   username: 'admin',
      //   password: 'admin'
      // }) 
      iRequest.param.token = '1234'
      this.$refcallback(
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            console.log(result)
          }
        )
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
/* 右侧菜单栏 */
.sider-meun{
  position: fixed;
  top: 300px;
  right: 10px;
  width: 120px;
  height:530px;
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
