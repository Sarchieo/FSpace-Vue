<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <!-- 左侧菜单，轮播，广告位及物价区 -->
      <a-layout-content>
        <div class="goods-nav-box">
          <f-space-menu></f-space-menu>
          <div class="binnar-box">
            <a-carousel autoplay arrows>
              <div
                slot="prevArrow"
                slot-scope="props"
                class="custom-slick-arrow"
                style="left: 10px;zIndex: 1"
              >
                <a-icon type="left-circle"/>
              </div>
              <div
                slot="nextArrow"
                slot-scope="props"
                class="custom-slick-arrow"
                style="right: 10px"
              >
                <a-icon type="right-circle"/>
              </div>
              <div>
                <img
                  v-lazy="'//m.360buyimg.com/babel/jfs/t1/26491/29/9870/42039/5c820018E6ac9f854/55c42a68a489cd18.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img30.360buyimg.com/img/jfs/t15169/46/1365117661/178502/d02d6948/5a4ddc4eNbd55867a.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img30.360buyimg.com/img/jfs/t16327/24/1234872079/191114/a510775d/5a4ddbc6N2d73dd08.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'"
                  class="banner-pic"
                >
              </div>
            </a-carousel>
          </div>
          <div class></div>
        </div>
        <div v-for="(item,index) in list" :key="index">
          <!-- 限时抢购 -->
          <div id="hot" class="brand-hall" v-if="item.unqid === 512">
            <p class="brand-hall-title">
              {{item.title}}
              <a class="all-hot" @click="toLimited()">
                查看全部抢购
                <a-icon type="right"/>
              </a>
            </p>
            <div class="brand-divs">
              <div class="brand-left">
                <p class="brand-time">{{item.time}}</p>
                <a-icon type="thunderbolt" class="brand-lightning"/>
                <p class="over-distance">距离结束还有</p>
                <p class="count-down">
                  <button>{{ flashSale.h }}</button>:
                  <button>{{ flashSale.m }}</button>:
                  <button>{{ flashSale.s }}</button>
                </p>
                <button class="see-whole">
                  查看全部
                  <a-icon type="right"/>
                </button>
              </div>
              <ul class="brand-right">
                <li v-for="(items,index) in limitedList.list" :key="index">
                  <a-card hoverable class="card">
                    <img class="card-img" v-lazy="items.imgURl" slot="cover">
                    <!-- <a-progress
                      :percent="items.activitystore"
                      style="position:absolute;top:145px;left:20px;width: 188px;"
                      :showInfo="false"
                      status="exception"
                    /> -->
                    <p class="surplus">
                      还剩{{items.activitystore}}支
                      <span>限购{{items.actlimit}}支</span>
                    </p>

                    <!-- <a-card-meta class="card-info" :title="items.text"></a-card-meta> -->
                    <div class="goods-info">
                      <p class="card-prices">
                        ￥{{items.actprize}}
                        <del>原价￥{{items.mp}}</del>
                      </p>
                      <p class="name-guige">{{items.prodname}}{{items.spec}}</p>
                      <p class="brand-text">{{items.brandName}}</p>
                    </div>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 热销专区 包邮专区 -->
          <div class="brand-hall" v-if="item.unqid === 2">
            <p class="brand-hall-title">
              热销专区
              <a>
                查看全部
                <a-icon type="right"/>
              </a>
            </p>
            <div class="brand-div">
              <ul class="brand-right hot-width">
                <li v-for="(item,index) in hotGoodsList" :key="index">
                  <a-card hoverable class="card" @click="toDetail(item)">
                    <img class="card-img" v-lazy="item.imgURl" slot="cover">
                    <p class="surplus top185"></p>
                    <p class="validity">有效期{{item.vaildsdate}}-{{item.vaildedate}}</p>
                    <p class="card-price top165">
                      ￥{{item.vatp}}
                      <!-- <del>￥</del> -->
                    </p>
                    <p class="specifications">{{item.spec}}</p>
                    <p class="manufacturer">{{item.manuName}}</p>
                    <p class="sold">已售{{item.store}}</p>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 一块购 -->
          <div class="brand-hall height780" v-if="item.unqid === 8">
            <p class="brand-hall-title">
              一块购 ● 越团越优惠
              <a>
                查看全部
                <a-icon type="right"/>
              </a>
            </p>
            <p class="onek-text">一块购活动说明方案</p>
            <div class="onek-shoping">
              <ul>
                <li v-for="(item,index) in teamBuyList.list" :key="index">
                  <a-card hoverable class="onek-card">
                    <div class="onek-left">
                      <img v-lazy="item.imgURl" class="onek-img" slot="cover">
                      <p>
                        <span class="sur-time">还剩</span>
                        <span>{{  }}</span> 时
                        <span>{{  }}</span> 分
                        <span>{{  }}</span> 秒
                      </p>
                    </div>
                    <div class="onek-right">
                      <p class="goods-name">{{item.prodname}}</p>
                      <p class="goods-spec">{{item.spec}}</p>
                      <p class="goods-manu">{{item.manu}}</p>
                      <p class="goods-success">{{item.success}}成团</p>
                      <p class="goods-state">{{item.startnum}}盒起拼</p>
                      <p class="goods-btn">
                        <button class="imme-btn">立即参团</button>
                      </p>
                    </div>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 新品专区 -->
          <div id="choice" class="elaborate" v-if="item.unqid === 1">
            <p class="elaborate-title">新品专区</p>
            <ul class="elaborate-ui">
              <li v-for="(item,index) in newGoodsList" :key="index">
                <a-card hoverable class="elaborate-card" @click="toDetail(item)">
                  <img v-lazy="item.imgURl" slot="cover">
                  <p class="elaborate-text">{{item.prodname}}</p>
                  <p class="elaborate-specifications">{{item.spec}}</p>
                  <p class="elaborate-manufacturer">{{item.manuName}}</p>
                  <p class="elaborate-validity">有效期{{item.vaildsdate}}-{{item.vaildedate}}</p>
                  <p class="elaborate-price">￥{{item.vatp}}</p>
                  <p class="elaborate-sold">{{item.store}}</p>
                  <a-card-meta></a-card-meta>
                  <p></p>
                </a-card>
              </li>
            </ul>
          </div>
          <!-- <div
          id="free-delivery"
          class="brand-hall"
          v-for="(item,index) in freeDelivery"
          :key="index"
        >
          <p class="brand-hall-title">
            {{item.title}}
            <a>
              查看全部
              <a-icon type="right"/>
            </a>
          </p>
          <div class="brand-div">
            <ul class="brand-right hot-width">
              <li v-for="(items,index) in item.list" :key="index">
                <a-card hoverable class="card" @click="toDetailsPages">
                  <img class="card-img" v-lazy="items.src" slot="cover">
                  <p class="surplus text-Center top185">{{items.text}}</p>
                  <p class="validity">有效期至{{items.validity}}</p>
                  <p class="card-price top165">
                    ￥{{items.new}}
                    <del>￥{{items.old}}</del>
                  </p>
                  <p class="specifications">{{items.specifications}}</p>
                  <p class="manufacturer">{{items.manufacturer}}</p>
                  <p class="sold">已售{{items.sold}}盒</p>
                  <a-card-meta class="card-info" :title="item.text"></a-card-meta>
                </a-card>
              </li>
            </ul>
          </div>
          </div>-->
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>
    <!-- <ul class="sider-meun">
      <li class="right-meun" :class="{'active': goodsTypes}" @click="goodsType()">
        <a>商品分类</a>
      </li>
      <li class="right-meun" :class="{'active': limitedTimes}" @click="limitedTime()">
        <a>限时抢购</a>
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
      <li class="right-meun to-top" v-show="isShowToTop" @click="goTotop()" ref="toTop">
        <a-icon type="to-top"/>
        <a>回到顶部</a>
      </li>
    </ul> -->
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
      flashSale: {
        h: 0,
        m: 0,
        s: 0,
      },
      teamBuyList: [],
      limitedList: [], // 限时抢购
      newGoodsList: [], // 新品商品列表
      hotGoodsList: [], // 热销商品列表
      isShow: false,
      imgSrc:
        "//img.alicdn.com/imgextra/i1/2928278102/O1CN01Yg8eie29ilQSi2xt1_!!0-item_pic.jpg_160x160q90.jpg",
      isShowToTop: false,
      goodsTypes: false,
      limitedTimes: false,
      hotSells: false,
      freeShippings: false,
      chooses: false,
      isShowBackTop: false,
      GUID: "",
      list: []
    };
  },
  mounted() {
    // this.initData();
    // window.addEventListener("scroll", this.handleScroll);
    this.getMallFloorProd();
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // var toTop = this.$refs['toTop'].style
      if (scrollTop > 0) {
        this.isShowToTop = true;
        this.isShowBackTop = true;
      } else {
        this.isShowToTop = false;
        this.isShowBackTop = false;
      }
      if (scrollTop > 100 && scrollTop < 610) {
        this.goodsTypes = true;
        this.chooses = false;
        this.freeShippings = false;
        this.hotSells = false;
        this.limitedTimes = false;
      } else if (scrollTop > 620 && scrollTop < 970) {
        this.limitedTimes = true;
        this.goodsTypes = false;
        this.freeShippings = false;
        this.hotSells = false;
        this.chooses = false;
      } else if (scrollTop > 980 && scrollTop < 1330) {
        this.hotSells = true;
        this.limitedTimes = false;
        this.goodsTypes = false;
        this.freeShippings = false;
        this.chooses = false;
      } else if (scrollTop > 1340 && scrollTop < 1690) {
        this.freeShippings = true;
        this.hotSells = false;
        this.limitedTimes = false;
        this.goodsTypes = false;
        this.chooses = false;
      } else if (scrollTop > 1700) {
        this.chooses = true;
        this.freeShippings = false;
        this.hotSells = false;
        this.limitedTimes = false;
        this.goodsTypes = false;
      }
    },
    // 获取一块购数据
    async getTeamBuyMallFloor() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getTeamBuyMallFloor";
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            result.data.list = result.data.list.slice(0, 6)
            _this.teamBuyList = result.data
            _this.getImgUrl(this.teamBuyList)
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    // 获取楼层显示状态
    async getMallFloorProd() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getMallFloorProd";
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.list = result.data;
            _this.list.map((value, index) => {
              switch(value.unqid) {
                case 1: // 新品专区
                _this.getNewGoods();
                break
                case 2:// 热销专区
                _this.getHotGoods();
                break
                case 512:// 限时抢购
                _this.getDiscountMallFloor();
                break
              }
            })
            _this.getTeamBuyMallFloor()
         
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    // 获取限时抢购列表
    async getDiscountMallFloor() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getDiscountMallFloor";
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            result.data.list = result.data.list.slice(0, 4)
            _this.limitedList = result.data
            _this.secondKill(new Date(_this.limitedList.now.replace(/-/g, "/")), _this.limitedList.edate)
            _this.getImgUrl(_this.limitedList.list)
            _this.getTimeDiff(_this.limitedList.edate)
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    // 请求新品专区数据列表
    async getNewGoods() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getNewMallFloor";
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 20;
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.newGoodsList = result.data.slice(0,6)
            _this.getImgUrl(_this.newGoodsList)
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    // 热销商品列表
    async getHotGoods() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getHotMallFloor";
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.hotGoodsList = result.data.slice(0,5)
            _this.getImgUrl(_this.hotGoodsList)
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    async getImgUrl(arr) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.token = localStorage.getItem("identification");
      let list = [];
      arr.forEach(c => {
        list.push({
          sku: c.sku,
          spu: c.spu
        });
      });
      iRequest.param.json = JSON.stringify({
        list: list
      });
      this.$refcallback(
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              result.data.goodsFilePathList.forEach((c, index, list) => {
                _this.$set(
                  arr[index],
                  "imgURl",
                  result.data.downPrev +
                    c +
                    "/" +
                    arr[index].sku +
                    "-200x200.jpg" +
                    "?" +
                    new Date().getSeconds()
                );
              });
            } else {
              _this.$message.error("文件地址获取失败, 请稍后重试");
            }
          },
          function error(error) {
            debugger;
          }
        )
      );
    },
    // 设置倒计时
    secondKill(date,eDate) {
      debugger
      let endDate =  new Date(date.getFullYear() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getDate() + ' ' +eDate+':00')
      console.log('开始' + date.getFullYear() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getDate() + ' ' + date.getHours() + date.getMinutes() + date.getSeconds())
      console.log('结束' + endDate.getFullYear() + '/' + (Number(endDate.getMonth()) + 1) + '/' + endDate.getDate() + ' ' + endDate.getHours() + endDate.getMinutes() + endDate.getSeconds())

      let times = endDate - date
      let _this = this
      if(times>=0) {
        let timer;
        timer = setInterval(function () {
        times--;
        _this.flashSale.h = Math.floor(times / (60 * 60) % 60)
        _this.flashSale.m = Math.floor(times / 60 % 60)
        _this.flashSale.s = times % 60
        console.log(_this.flashSale.s)
        if (times <= 0) {
          clearInterval(timer);
        }
        }, 1000);
        if (deltaTime >= 0) {
          console.log(deltaTime)
        } else {
          console.log('活动结束')
        }
      }
    },
    goTotop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    goodsType() {
      document.body.scrollTop = document.documentElement.scrollTop = 100;
      this.goodsTypes = true;
      this.chooses = false;
      this.freeShippings = false;
      this.hotSells = false;
      this.limitedTimes = false;
    },
    limitedTime() {
      document.body.scrollTop = document.documentElement.scrollTop = 620;
      this.limitedTimes = true;
      this.goodsTypes = false;
      this.freeShippings = false;
      this.hotSells = false;
      this.chooses = false;
    },
    hotSell() {
      document.body.scrollTop = document.documentElement.scrollTop = 980;
      this.hotSells = true;
      this.limitedTimes = false;
      this.goodsTypes = false;
      this.freeShippings = false;
      this.chooses = false;
    },
    freeShipping() {
      document.body.scrollTop = document.documentElement.scrollTop = 1340;
      this.freeShippings = true;
      this.hotSells = false;
      this.limitedTimes = false;
      this.goodsTypes = false;
      this.chooses = false;
    },
    choose() {
      document.body.scrollTop = document.documentElement.scrollTop = 1700;
      this.chooses = true;
      this.freeShippings = false;
      this.hotSells = false;
      this.limitedTimes = false;
      this.goodsTypes = false;
    },
    goBackTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    toDetail(item) {
      this.$router.push({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu
        }
      });
    },
    toLimited() {
      this.$router.push({
        path: "/activity/limited"
      });
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
  height: auto;
  min-height: 1000px;
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.active {
  background: #ff0036 !important;
  color: #ffffff !important;
}
.active a {
  color: #ffffff !important;
}
/* 限时抢购 */
.card {
  position: relative;
  width: 228px;
  height: 310px;
}
.card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.surplus {
  .container-size(inline-block, 225px, auto, 0, 0px);
  .position(absolute, 168px, 0px);
  text-indent: 20px;

  span {
    float: right;
    margin-right: 20px;
    color: #999999 !important;
  }
}
.goods-info {
  .position(absolute, 200px, 0px);
  .container-size(inline-block, 225px, 107px, 0, 0px);
}
.card-img {
  .position(absolute, 15px, 45px);
  .container-size(inline-block, 135px, 123px, 0, 0px);
}
.card-progress {
  .position(absolute, 0px, 0px);
}
.card-prices {
  text-indent: 17px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(255, 0, 54);
  del {
    margin-left: 20px;
    font-size: 14px !important;
    font-weight: normal;
    color: #999999 !important;
  }
}
.card-info {
  .position(absolute, 195px, 0px);
  .container-size(inline-block, 225px, auto, 0, 0px);
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
}
.card-price {
  .position(absolute, 205px, 0px);
  width: 225px;
  text-align: left;
  text-indent: 17px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(255, 0, 54);
  del {
    margin-left: 20px;
    font-size: 14px !important;
    font-weight: normal;
  }
}
.height780 {
  height: 890px !important;
}
.name-guige {
  width: 225px;
  min-height: 24px;
  height: auto;
  text-align: left;
  padding: 0 10px 0 20px;
  font-size: 16px;
  color: #333333;
}
.brand-text {
  text-indent: 20px;
  color: #999999;
}
.card-price del {
  color: #999999;
}
.hot-width {
  width: 1210px !important;
}
.validity {
  .position(absolute, 145px, 0px);
  width: 226px;
  text-align: center;
  background: #e0e0e0;
}
.top165 {
  top: 171px !important;
}
.top185 {
  top: 198px !important;
}
.specifications {
  .position(absolute, 225px, 0px);
  width: 228px;
  text-indent: 20px;
  color: #999;
}
.manufacturer {
  .position(absolute, 250px, 0px);
  width: 226px;
  text-indent: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}
.sold {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 228px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-top: 1px solid rgb(238, 238, 238);
  color: #999;
}
/* 为你精选 */
.elaborate {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  min-height: 300px;
  background: rgb(238, 238, 238);
}
.elaborate-ui {
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  float: left;
  width: 1220px;
  height: auto;
  li {
    display: inline-block;
    margin-right: 22px;
    margin-bottom: 15px;
  }
}
// .elaborate-ui li {
//   width: 383px;
//   height: 220px;
//   margin-bottom: 22px;
//   background: #ffffff;
// }
.elaborate-card {
  .position(relative, 0px, 0px);
  .container-size(inline-block, 383px, 220px, 0, 0px);
}
.elaborate-card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.elaborate-card img {
  .position(absolute, 25px, 10px);
  .container-size(inline-block, 170px, 170px, 0, 0px);
}
.elaborate-text {
  .position(absolute, 32px, 200px);
  width: 170px;
   overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
  color: #333333;
  font-size: 16px;
}
.elaborate-specifications {
  .position(absolute, 54px, 200px);
  width: 170px;
  color: #333333;
}
.elaborate-manufacturer {
  .position(absolute, 85px, 198px);
  width: 170px;
   overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
}
.elaborate-validity {
  .position(absolute, 105px, 198px);
  width: 170px;
}
.elaborate-price {
  .position(absolute, 140px, 195px);
  width: 170px;
  color: rgb(238, 47, 38);
  font-size: 18px;
  font-weight: bold;
}
.elaborate-sold {
  .position(absolute, 165px, 198px);
  color: #999;
}
.elaborate-title {
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  font-weight: bold;
}
/* 热销专区，包邮专区 */
.brand-divs {
  .container-size(block, 1210px, 310px, 0 auto, 0px);
  background: rgb(238, 238, 238);
}
.brand-hall {
  .container-size(block, 1190px, 360px, 0 auto, 0px);
  background: #ffffff;
  margin-bottom: 20px;
}
// 一块购
.onek-text {
  .p-size(30px, 30px, 16px, left, 0px, #333333);
  background: #eeeeee;
  font-weight: bold;
}
.onek-shoping {
  .container-size(block, 1202px, 890px, 0 auto, 0px);
  background: #eeeeee;
  ul {
    float: left;
    width: 1210px;
    li {
      display: inline-block;
      margin-left: 0px;
      margin-right: 19px;
      margin-bottom: 13px;
      .onek-card {
        width: 586px;
        height: 250px;
        .onek-left {
          float: left;
          width: 206px;
          height: 205px;
          .onek-img {
            width: 206px;
            height: 164px;
          }
          p {
            .p-size(40px, 40px, 16px, center, 0px, #ed3025);
            color: #333333;
            .sur-time {
              color: #333333 !important;
              font-size: 16px;
            }
            span {
              color: #ed3025;
            }
          }
        }
        .onek-right {
          float: right;
          width: 300px;
          height: 205px;
          .goods-name,
          .goods-spec {
            .p-size(30px, 30px, 18px, left, 10px, #333333);
          }
          .goods-manu,
          .goods-success,
          .goods-state {
            .p-size(25px, 25px, 14px, left, 10px, #999999);
          }
          .goods-manu {
            margin-top: 20px;
          }
          .goods-btn {
            .p-size(40px, 40px, 14px, right, 0px, #ffffff);
            margin-top: 10px;
            .imme-btn {
              .button-size(120px, 40px, 40px, 16px, 0px, 5px);
              .button-color(1px solid transparent, #ed3025, #ffffff);
            }
          }
        }
      }
    }
  }
}
.brand-hall .brand-hall-title {
  height: 50px;
  line-height: 50px;
  background: rgb(238, 238, 238);
  font-size: 22px;
  font-weight: bold;
  color: #333333;
}
.brand-hall-title a {
  float: right;
  font-size: 16px;
  font-weight: normal;
}
.brand-hall-title .all-hot {
  float: right;
  font-size: 16px;
  font-weight: normal;
  color: #000000;
}
.brand-div {
  .container-size(block, 1202px, 310px, 0 auto, 0px);
  background: rgb(238, 238, 238);
}
.brand-left {
  float: left;
  position: relative;
  width: 228px;
  height: 310px;
  background: #e6e6e6;
  margin-right: 12px;
}
.brand-lightning {
  .position(absolute, 60px, 90px);
  font-size: 48px;
  color: rgb(245, 47, 94);
}
.count-down {
  .position(absolute, 175px, 0px);
  width: 228px;
  text-align: center;
}
.count-down button {
  .button-size(35px, 35px, 35px, 14px, 0, 3px);
  .button-color(1px solid transparent, #666666, #ffffff);
  margin-right: 5px;
}
.over-distance {
  .position(absolute, 125px, 0px);
  width: 228px;
  text-align: center;
  font-size: 16px;
}
.see-whole {
  .position(absolute, 240px, 40px);
  .button-size(150px, 40px, 40px, 14px, 0, 30px);
  .button-color(1px solid #c40000, #f2f2f2, #c40000);
}
.brand-left a {
  width: 100%;
  height: 100%;
}
.brand-time {
  .position(absolute, 15px, 0px);
  width: 228px;
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: rgb(245, 47, 94);
}
.brand-right {
  float: left;
  width: 970px;
  height: 310px;
  background: rgb(238, 238, 238);
  li {
    display: inline-block;
    margin-left: 0px;
    margin-right: 13.5px;
  }
}
.text-Center {
  text-align: center !important;
  text-indent: 0px !important;
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
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel > .custom-slick-arrow:before {
  display: none;
}
.ant-carousel > .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel > .slick-slide h3 {
  color: #fff;
}
.goods-nav-box {
  .container-size(block, 1190px, 435px, 0 auto, 0px);
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
.banner-pic {
  width: 995px;
  height: 435px;
}
.binnar-box {
  .container-size(inline-block, 995px, 435px, 0, 0px);
  .position(absolute, 0px, 197px);
}
.binnar-pic {
  width: 750px;
  height: 321px;
  /* background: orchid; */
  line-height: 321px;
  text-align: center;
}
/* 右侧菜单栏 */
.sider-meun {
  position: fixed;
  top: 300px;
  right: 10px;
  width: 85px;
  height: 400px;
  background: rgb(238, 238, 238);
}
.sider-meun .right-meun {
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
.to-top a {
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
.sider-meun .right-meun:hover {
  background: rgb(255, 0, 54);
  color: #ffffff;
}
.right-meun:hover a {
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
.ant-layout-footer {
  padding: 0px;
}
</style>
