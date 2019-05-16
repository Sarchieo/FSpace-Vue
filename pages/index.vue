<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <!-- 左侧菜单，轮播，广告位及物价区 -->
      <a-layout-content>
        <div class="goods-nav-box">
          <!-- <f-space-menu></f-space-menu> -->
          <div class="index-header">
              <div class="binnar-box">
            <a-carousel autoplay v-if="isCarousel">
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
                <img src="../assets/banner/hunan.png" class="banner-pic">
              </div>
              <div>
                <img src="../assets/banner/money.jpg" class="banner-pic">
              </div>
              <div>
                <img src="../assets/banner/register.jpg" class="banner-pic">
              </div>
              <div>
                <img src="../assets/banner/newperson.jpg" class="banner-pic">
              </div>
              <div>
                <img src="../assets/banner/integral.jpg" class="banner-pic">
              </div>
            </a-carousel>
          </div>
          <div class="notice-box">
            <div class="login-tips">
              <h3>欢迎来到一块医药</h3>
              <!-- {{ storeInfo.comp.storeName }} -->
              <p
                v-if="userStatus && storeInfo.comp && storeInfo.comp.storeName"
              >您好，{{ storeInfo.comp.storeName }}</p>
              <p v-if="!userStatus">
                <nuxt-link to="/user/login">
                  <a-button class="float-left">登录</a-button>
                </nuxt-link>
                <nuxt-link to="/user/register">
                  <a-button class="float-right">注册</a-button>
                </nuxt-link>
              </p>
            </div>
            <img src="../assets/img/certificate.png">
            <div class="notice-content">
              <p class="title">
                <span class="float-left">公告</span>
                <span class="float-right more">更多</span>
              </p>
              <p v-if="noticeList.length === 0" class="no-ntice">暂无公告</p>
              <div v-else>
                <p
                class="notice-text"
                v-for="(item,index) in noticeList"
                :key="index"
                @click="toNotice(index)"
              >{{item.type}}{{item.title}}</p>
              </div>
              
            </div>
          </div>
          </div>
        
        </div>
        <div class="pic-link">
          <nuxt-link to="/user/personal/coupon">
            <img src="../assets/img/coupon.png">
          </nuxt-link>

          <img src="../assets/img/sign.png" @click="toIntegral()">
          <img src="../assets/img/brand.png" @click='toBrands()'>
          <img src="../assets/img/type.png" @click="toBrands()">
        </div>
        <div v-for="(item,index) in list" :key="index" style="height: auto;">
          <!-- 新品专区 -->
          <!-- v-if="item.unqid === 1 && newGoodsList.length > 4" -->
          <div
            :ref="item.unqid"
            class="elaborate"
            v-if="item.unqid === 1 && newGoodsList.length > 4"
          >
            <p class="elaborate-title">
              新品专区
              <a href="javascript:;" @click="toNewGoods()">
                查看全部
                <a-icon type="right"/>
              </a>
            </p>
            <ul class="elaborate-ui">
              <li v-for="(item,index) in newGoodsList" :key="index">
                <a-card hoverable class="elaborate-card" @click="toDetail(item)">
                  <img v-lazy="item.imgURl" slot="cover">
                  <p class="elaborate-text">{{item.prodname}}</p>
                  <p class="elaborate-specifications">{{item.spec}}</p>
                  <p class="elaborate-manufacturer">{{item.manuName}}</p>
                  <p class="elaborate-validity">有效期至{{item.vaildedate}}</p>

                  <p class="elaborate-price" v-if="item.vatp != -1">￥{{item.vatp}}</p>
                  <p class="elaborate-price" v-else>￥认证后可见</p>
                  <p class="elaborate-sold">已售{{item.sales}}{{item.unitName}}</p>
                  <a-card-meta></a-card-meta>
                  <p></p>
                </a-card>
              </li>
            </ul>
          </div>
          <!-- 热销专区 -->
          <!-- v-if="item.unqid === 2 && hotGoodsList.length > 9" -->
          <div
            :ref="item.unqid"
            class="brand-hall height-auto"
            v-if="item.unqid === 2 && hotGoodsList.length > 9"
          >
            <p class="brand-hall-title">
              热销专区
              <a href="javascript:;" @click="toHotGoods()">
                查看全部
                <a-icon type="right"/>
              </a>
            </p>
            <div class="brand-div">
              <ul class="brand-right hot-width height-auto">
                <li v-for="(item,index) in hotGoodsList" :key="index" class="margin-bottom10">
                  <a-card hoverable class="card" @click="toDetail(item)">
                    <!-- <img class="top" src="../assets/img/top2.png" slot="cover"> -->
                    <img v-if="index < 3" class="top-img" :src="item.top" slot="cover">
                    <img class="card-img" v-lazy="item.imgURl" slot="cover">
                    <p class="surplus top185">{{item.brandName + item.prodname}}</p>
                    <p class="validity">有效期至{{item.vaildedate}}</p>
                    <p class="card-price top165" v-if="item.vatp != -1">￥{{item.vatp}}</p>
                    <p class="card-price top165" v-else>￥认证后可见</p>
                    <p class="specifications">{{item.spec}}</p>
                    <p class="manufacturer">{{item.manuName}}</p>
                    <p class="sold">已售{{item.sales}}{{item.unitName}}</p>
                  </a-card>
                </li>
              </ul>
              <div style="clear:both"></div>
            </div>
          </div>
          <!-- 秒杀专区 -->
          <!-- v-if="item.unqid === 4 && secondList.length > 4" -->
          <div
            :ref="item.unqid"
            class="brand-hall height-auto"
            v-if="item.unqid === 4 && secondList.length > 4"
          >
            <div class="brand-hall-title height80">
              秒杀专区
              <a href="javascript:;" @click="toSpike()" class="see-wholes">
                查看全部
                <a-icon type="right"/>
              </a>
            </div>
            <div class="onek-shoping">
              <ul>
                <li v-for="(item,index) in secondList" :key="index">
                  <a-card
                    hoverable
                    class="onek-card"
                    @click="toDetail(item, secondList.actcode, 2)"
                  >
                    <img v-lazy="item.imgURl" class="onek-img" slot="cover">
                    <div class="onek-box" slot="cover">
                      <p class="onek-price" v-if="item.vatp != -1">
                        ￥{{item.vatp}}元
                        <del>原价{{item.rrp}}元</del>
                      </p>
                      <p class="onek-price" v-else>￥认证后可见</p>
                      <p class="goods-name">{{item.brandName}} {{ item.prodname }} {{item.spec}}</p>
                      <p class="goods-manu">{{item.manuName}}</p>
                      <!-- <p class="goods-success">{{item.actlimit}}{{item.unitName}}起拼/{{item.surplusstock}}成团</p> -->
                      <!-- <p class="goods-state"></p> -->
                      <p class="goods-btn">
                        <span class="sur-time">还剩</span>
                        <span>{{teamBuy.h}}</span>时
                        <span>{{teamBuy.m}}</span>分
                        <span>{{teamBuy.s}}</span>秒
                        <button class="imme-btn">立即参加</button>
                      </p>
                    </div>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 一块购 -->
          <!-- v-if="item.unqid === 8 && teamBuyList.length > 4" -->
          <div
            :ref="item.unqid"
            class="brand-hall height-auto"
            v-if="item.unqid === 8 && teamBuyList.length > 4"
          >
            <div class="brand-hall-title height80">
              一块购 ● 越团越优惠
              <a href="javascript:;" @click="toBuying()" class="see-wholes">
                查看全部
                <a-icon type="right"/>
              </a>
              <!-- <h5 class="discount-num">
                <span>10.0</span>
                <span>9.9</span>
                <span>9.8</span>
                <span>9.7</span>
                <span>9.6</span>
                <span>折</span>
              </h5>-->
              <!-- <a-tooltip title="3 done / 3 in progress / 4 to do">
                 <a-progress :percent="60" :successPercent="30" style="position: absolute;top: 18px;left: 240px;width: 190px;height: 8px;margin-left: 20px;"/>
              </a-tooltip>-->
              <!-- <a-progress strokeLinecap="square" :percent="75" strokeColor="#ed3025" style="position: absolute;top: 28px;left: 240px;width: 190px;height: 8px;margin-left: 20px;"/> -->
              <!-- <a-progress
                  :percent="20"
                  style="position: absolute;top: 18px;left: 240px;width: 190px;height: 8px;margin-left: 20px;"
                  :strokeColor="black"
                  status="exception"
              />-->
              <!-- <h5 class="person-num">
                <span>2</span>
                <span>5</span>
                <span>10</span>
                <span>30</span>
                <span>50</span>
                <span>人</span>
              </h5>-->
            </div>
            <div class="onek-shoping">
              <ul>
                <li v-for="(item,index) in teamBuyList" :key="index">
                  <a-card
                    hoverable
                    class="onek-card"
                    @click="toDetail(item, teamBuyList.actcode, 2)"
                  >
                    <img v-lazy="item.imgURl" class="onek-img" slot="cover">
                    <div class="onek-box" slot="cover">
                      <p class="onek-price" v-if="item.vatp != -1">
                        ￥{{item.vatp}}元
                        <del>原价{{item.rrp}}元</del>
                      </p>
                      <p class="onek-price" v-else>￥认证后可见</p>
                      <p class="goods-name">{{item.prodname}}{{item.spec}}</p>
                      <p class="goods-manu">{{item.manuName}}</p>
                      <p
                        class="goods-success"
                      >{{item.actlimit}}{{item.unitName}}起拼/{{item.surplusstock}}成团</p>
                      <!-- <p class="goods-state"></p> -->
                      <p class="goods-btn">
                        <span class="sur-time">还剩</span>
                        <span>{{teamBuy.h}}</span>时
                        <span>{{teamBuy.m}}</span>分
                        <span>{{teamBuy.s}}</span>秒
                        <button class="imme-btn">立即参团</button>
                      </p>
                    </div>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 包邮专区 -->
          <!-- v-if="item.unqid === 16 && postList.length > 4" -->
          <div :ref="item.unqid" class="brand-hall" v-if="item.unqid === 16 && postList.length > 4">
            <p class="brand-hall-title">
              包邮专区
              <!-- <a href="javascript:;" @click="toPost()">查看全部<a-icon type="right"/>
              </a>-->
            </p>
            <div class="brand-div">
              <ul class="brand-right height-auto hot-width">
                <li v-for="(item,index) in postList" :key="index">
                  <a-card hoverable class="card" @click="toDetail(item)">
                    <img v-if="index < 3" class="top-img" :src="item.top" slot="cover">
                    <img class="card-img" v-lazy="item.imgURl" slot="cover">
                    <p class="surplus top185">{{item.brandName + item.prodname}}</p>
                    <p class="validity">有效期至{{item.vaildedate}}</p>
                    <p class="card-price top165" v-if="item.vatp != -1">￥{{item.vatp}}</p>
                    <p class="card-price top165" v-else>￥认证后可见</p>
                    <p class="specifications">{{item.spec}}</p>
                    <p class="manufacturer">{{item.manuName}}</p>
                    <p class="sold">已售{{item.sales}}{{item.unitName}}</p>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 新人专享 -->
          <!-- v-if="item.unqid === 32 && newPersonList.length > 4" -->
          <div
            :ref="item.unqid"
            class="brand-hall"
            v-if="item.unqid === 32 && newPersonList.length > 4"
          >
            <p class="brand-hall-title">
              新人专享
              <a href="javascript:;" @click="toNewPerson()">
                查看全部
                <a-icon type="right"/>
              </a>
            </p>
            <div class="brand-div">
              <ul class="brand-right height-auto hot-width">
                <li v-for="(item,index) in newPersonList" :key="index">
                  <a-card hoverable class="card" @click="toDetail(item)">
                    <img v-if="index < 3" class="top-img" :src="item.top" slot="cover">
                    <img class="card-img" v-lazy="item.imgURl" slot="cover">
                    <p class="surplus top185">{{item.brandName + item.prodname}}</p>
                    <p class="validity">有效期至{{item.vaildedate}}</p>
                    <p class="card-price top165" v-if="item.vatp != -1">￥{{item.vatp}}</p>
                    <p class="card-price top165" v-else>￥认证后可见</p>
                    <p class="specifications">{{item.spec}}</p>
                    <p class="manufacturer">{{item.manuName}}</p>
                    <p class="sold">已售{{item.sales}}{{item.unitName}}</p>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 暂无数据接口 -->
          <!-- 中华名方 -->
          <div :ref="item.unqid" class="brand-hall" v-if="item.unqid === 64 && famousPrescription.length > 3">
            <p class="brand-hall-title">
              中华名方
              <a href="javascript:;" @click="toFamous()">查看全部<a-icon type="right"/>
              </a>
            </p>
            <div class="brand-div">
              <ul class="brand-right hot-width">
                <li v-for="(item,index) in famousPrescription" :key="index">
                  <a-card hoverable class="card" @click="toDetail(item)">
                    <img class="card-img" v-lazy="item.imgURl" slot="cover">
                    <p class="surplus top185">{{item.brandName}}</p>
                    <p class="validity">有效期至{{item.vaildedate}}</p>
                    <p class="card-price top165" v-if="item.vatp != -1">￥{{item.vatp}}</p>
                    <p class="card-price top165" v-else>￥认证后可见</p>
                    <p class="specifications">{{item.spec}}</p>
                    <p class="manufacturer">{{item.manuName}}</p>
                    <p class="sold">已售{{item.sales}}{{item.unitName}}</p>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 为你精选 -->
          <!-- v-if="item.unqid === 128 && selectedList.length > 5" -->
          <div
            :ref="item.unqid"
            class="elaborate"
            v-if="item.unqid === 128 && selectedList.length > 5"
          >
            <p class="elaborate-title">
              为你精选
              <a href="javascript:;" @click="toSelected()">
                查看全部
                <a-icon type="right"/>
              </a>
            </p>
            <ul class="elaborate-ui">
              <li v-for="(item,index) in selectedList" :key="index">
                <a-card hoverable class="elaborate-card" @click="toDetail(item)">
                  <img v-lazy="item.imgURl" slot="cover">
                  <p class="elaborate-text">{{item.prodname}}</p>
                  <p class="elaborate-specifications">{{item.spec}}</p>
                  <p class="elaborate-manufacturer">{{item.manuName}}</p>
                  <p class="elaborate-validity">有效期至{{item.vaildedate}}</p>
                  <p class="elaborate-price" v-if="item.vatp != -1">￥{{item.vatp}}</p>
                  <p class="elaborate-price" v-else>￥认证后可见</p>
                  <p class="elaborate-sold">已售{{item.sales}}{{item.unitName}}</p>
                  <a-card-meta></a-card-meta>
                  <p></p>
                </a-card>
              </li>
            </ul>
          </div>
          <!-- 品牌专区 -->
          <!-- v-if="item.unqid === 256 && brandList.length > 4" -->
          <div
            :ref="item.unqid"
            class="brand-hall"
            v-if="item.unqid === 256 && brandList.length > 4"
          >
            <p class="brand-hall-title">
              品牌专区
              <a href="javascript:;" @click="toBrand()">
                查看全部
                <a-icon type="right"/>
              </a>
            </p>
            <div class="brand-div">
              <ul class="brand-right height-auto hot-width">
                <li v-for="(item,index) in brandList" :key="index">
                  <a-card hoverable class="card" @click="toDetail(item)">
                    <img class="card-img" v-lazy="item.imgURl" slot="cover">
                    <p class="surplus top185">{{item.brandName + item.prodname}}</p>
                    <p class="validity">有效期至{{item.vaildedate}}</p>
                    <p class="card-price top165" v-if="item.vatp != -1">￥{{item.vatp}}</p>
                    <p class="card-price top165" else>￥认证后可见</p>
                    <p class="specifications">{{item.spec}}</p>
                    <p class="manufacturer">{{item.manuName}}</p>
                    <p class="sold">已售{{item.sales}}{{item.unitName}}</p>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
          <!-- 限时抢购 -->
          <!-- v-if="item.unqid === 512 && limitedList.length > 3" -->
          <div
            :ref="item.unqid"
            class="brand-hall"
            v-if="item.unqid === 512 && limitedList.length > 3"
          >
            <p class="brand-hall-title">
              限时折扣
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
                <button class="see-whole" @click="toLimited()">
                  查看全部
                  <a-icon type="right"/>
                </button>
              </div>
              <ul class="brand-right height-auto">
                <li v-for="(items,index) in limitedList" :key="index">
                  <a-card hoverable class="card" @click="toDetail(items, limitedList.actcode, 1)">
                    <img class="card-img" v-lazy="items.imgURl" slot="cover">
                    <a-progress
                      :percent="items.percentage"
                      style="position:absolute;top:145px;left:20px;width: 188px;"
                      :showInfo="false"
                      status="exception"
                    />
                    <p class="surplus">
                      还剩{{items.surplusstock}}{{items.unitName}}
                      <span v-if="item.limits !== 0">限购{{items.actlimit}}{{items.unitName}}</span>
                    </p>

                    <!-- <a-card-meta class="card-info" :title="items.text"></a-card-meta> -->
                    <div class="goods-info">
                      <p class="card-prices" v-if="items.vatp != -1">
                        ￥{{items.actprize}}
                        <del>￥{{items.mp}}</del>
                      </p>
                      <p class="card-prices" v-else>￥认证后可见</p>
                      <p class="name-guige">{{items.prodname}}{{items.spec}}</p>
                    </div>
                  </a-card>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>
    <ul class="sider-meun menu-cur-nav">
      <li class="right-meun color-base">
        <a>导航</a>
      </li>
      <li
        class="right-meun"
        v-for="(item, index) in list"
        :class="((scrollTop >= item.sHeight) && (scrollTop <= item.eHeight)) ? item.color : ''"
        :key="index"
        v-show="item.isShow"
        @click="meauItemClick(item)"
      >
        <div class="asdadasdad">
          <a>{{ item.fname }}</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import FSpaceHeader from "../components/fspace-ui/header/header";
import FSpaceMenu from "../components/fspace-ui/menu";
import FSpaceFooter from "../components/fspace-ui/footer";
// import FSpaceRight from "../components/fspace-ui/right-menu";
export default {
  components: {
    FSpaceHeader,
    FSpaceMenu,
    FSpaceFooter
  },
  computed: {
    userStatus() {
      return this.$store.state.userStatus;
    },
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      noticeIndex: '',
      noticeList: [], // 公告列表
      isCarousel: false,
      percentage: 0,
      teamBuy: {
        h: 0,
        m: 0,
        s: 0
      },
      flashSale: {
        h: 0,
        m: 0,
        s: 0
      },
      scrollTop: 0,
      limitedID: 0,
      teamByID: 0,
      postID: 0,
      selectedID: 0,
      newGoodsID: 0,
      newPersonID: 0,
      hotGoodsID: 0,
      secondId: 0,
      brandID: 0,
      teamBuyList: [],
      limitedList: [], // 限时抢购
      newGoodsList: [], // 新品商品列表
      hotGoodsList: [], // 热销商品列表
      selectedList: [], // 为你精选
      newPersonList: [], // 新人专享列表
      postList: [], // 包邮专区
      secondList: [], // 秒杀专区
      brandList: [], // 品牌专区
      famousPrescription: [], // 中华名方
      isShow: false,
      imgSrc:
        "//img.alicdn.com/imgextra/i1/2928278102/O1CN01Yg8eie29ilQSi2xt1_!!0-item_pic.jpg_160x160q90.jpg",
      goodsTypes: false,
      hotSells: false,
      freeShippings: false,
      chooses: false,
      isShowBackTop: false,
      GUID: "",
      list: []
    };
  },
  mounted() {
    this.getNotice();
    this.getMallFloorProd();
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll);
    });
    this.$nextTick(() => {
      this.isCarousel = true;
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    // 设置导航栏
    async setNavBar(floorList) {
      // 加载楼层
      Promise.all(floorList).then(values => {
        this.list.forEach(item => {
          let div = this.$refs[item.unqid];
          if (div) {
            let top =  125 + 30 // 头部位置, 以后动态获取
            this.$set(item,'isShow',true)
            this.$set(item,'sHeight',div[0].offsetTop - top)
            this.$set(item,'eHeight',div[0].offsetTop - top + div[0].offsetHeight -1)
          } else {
            this.$set(item,'isShow',false)
          }
        });
      });
    },
    // 获取楼层显示状态
    async getMallFloorProd() {
      this.fsGeneralMethods
        .request(this, "goodsServer", "ProdModule", "getMallFloorProd")
        .then(result => {
          if (result.code === 200) {
            this.list = result.data;
            let floorList = []; // 需要加载的楼层
            this.list.map((value, index) => {
              switch (value.unqid) {
                case 1: // 新品专区
                  floorList.push(this.getNewGoods());
                  value.color = "color-purple";
                  break;
                case 2: // 热销专区
                  floorList.push(this.getHotGoods());
                  value.color = "color-wheat";
                  break;
                case 4: // 秒杀专区
                  floorList.push(this.getSeckillMallFloor());
                  value.color = "color-blue";
                  break;
                case 8: // 一块购
                  floorList.push(this.getTeamBuyMallFloor());
                  value.color = "color-pink";
                  value.fname = "一块购区";
                  break;
                case 16: // 包邮专区
                  floorList.push(this.getExemPostMallFloor());
                  value.color = "color-beige";
                  break;
                case 32: // 新人专享
                  floorList.push(this.getNewPersonList());
                  value.color = "color-pink";
                  break;
                case 64: // 中华名方 暂未提供接口
                floorList.push(this.getFamousPrescriptionFloor());
                  value.color = "color-indigo";
                  break;
                case 128: // 为你精选
                  floorList.push(this.getSelects());
                  value.color = "color-green";
                  break;
                case 256: // 品牌专区
                  floorList.push(this.getBrandMallFloor());
                  value.color = "color-indigo";
                  break;
                case 512: // 限时抢购
                  floorList.push(this.getDiscountMallFloor());
                  value.color = "color-khaki";
                  break;
              }
            });
            this.setNavBar(floorList);
          }
        });
    },
    // 获取一块购数据
    getTeamBuyMallFloor() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getTeamBuyMallFloor")
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.list) {
              result.data.list = result.data.list.slice(0, 5);
              this.teamBuyList = result.data.list;
              this.teamByID = result.data.actcode;
              this.fsGeneralMethods.addImages(
                this,
                this.teamBuyList,
                "sku",
                "spu"
              );
              this.secondKills(
                this.stringToDate(result.data.now),
                result.data.edate
              );
            }
          });
      });
    },
    // 获取秒杀数据
    getSeckillMallFloor() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getSeckillMallFloor")
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.list) {
              result.data.list = result.data.list.slice(0, 5);
              this.secondList = result.data.list;
              this.secondID = result.data.actcode;
              this.fsGeneralMethods.addImages(
                this,
                this.secondList,
                "sku",
                "spu"
              );
              this.secondKills(
                this.stringToDate(result.data.now),
                result.data.edate
              );
            }
          });
      });
    },
    // 获取品牌数据
    getBrandMallFloor() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getBrandMallFloor")
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.list) {
              result.data.list = result.data.list.slice(0, 5);
              this.brandList = result.data.list;
              this.brandID = result.data.actcode;
              this.fsGeneralMethods.addImages(
                this,
                this.brandList,
                "sku",
                "spu"
              );
            }
          });
      });
    },
    // 包邮专区
    getExemPostMallFloor() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getExemPostMallFloor")
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.list) {
              result.data.list = result.data.list.slice(0, 5);
              this.postList = result.data.list;
              this.postID = result.data.actcode;
              this.fsGeneralMethods.addImages(
                this,
                this.postList,
                "sku",
                "spu"
              );
            }
          });
      });
    },
    // 中华名方
    async getFamousPrescriptionFloor() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getFamousPrescriptionFloor")
          .then(result => {
            
            resolve();
            
            if (result.code === 200 && result.data.length > 4) {
              this.famousPrescription = result.data.slice(0, 5);
              this.fsGeneralMethods.addImages(
                this,
                this.famousPrescription,
                "sku",
                "spu"
              );
            }
          });
      });
    },
    //获取新人专享列表
    getNewPersonList() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getNewMemberMallFloor")
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.list) {
              result.data.list = result.data.list.slice(0, 5);
              this.newPersonList = result.data.list;
              this.newPersonID = result.data.actcode;
              this.fsGeneralMethods.addImages(
                this,
                this.newPersonList,
                "sku",
                "spu"
              );
            }
          });
      });
    },
    // 获取限时抢购列表
    getDiscountMallFloor() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getDiscountMallFloor")
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.list) {
              result.data.list = result.data.list.slice(0, 4);
              this.limitedList = result.data.list;
              this.limitedList.forEach(item => {
                item.percentage = 100 - (item.buynum / item.surplusstock) * 100;
              });
              this.limitedID = result.data.actcode;
              this.secondKill(
                this.stringToDate(result.data.now),
                result.data.edate
              );
              this.fsGeneralMethods.addImages(
                this,
                this.limitedList,
                "sku",
                "spu"
              );
            }
          });
      });
    },
    // 请求新品专区数据列表
    getNewGoods(item) {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getNewMallFloor")
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.length > 6) {
              this.newGoodsList = result.data.slice(0, 6);
              this.newGoodsID = result.data.actcode;
              this.fsGeneralMethods.addImages(
                this,
                this.newGoodsList,
                "sku",
                "spu"
              );
            }
          });
      });
    },
    // 为你精选数据
    getSelects() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(
            this,
            "goodsServer",
            "ProdModule",
            "getChooseForYouMallFloor"
          )
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.length > 6) {
              this.selectedList = result.data.slice(0, 6);
              this.fsGeneralMethods.addImages(
                this,
                this.selectedList,
                "sku",
                "spu"
              );
              this.selectedID = result.data.actcode;
            }
          });
      });
    },
    // 热销商品列表
    getHotGoods() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "getHotMallFloor")
          .then(result => {
            resolve();
            if (result.code === 200 && result.data.length > 10) {
              this.hotGoodsList = result.data.slice(0, 10);
              this.hotGoodsID = result.data.actcode;
              this.hotGoodsList.forEach((item, index) => {
                item.top = "/_nuxt/assets/img/top" + (index + 1) + ".png";
              });
              this.fsGeneralMethods.addImages(
                this,
                this.hotGoodsList,
                "sku",
                "spu"
              );
            }
          });
      });
    },
    // 获取公告消息列表
    getNotice() {
      return new Promise((resolve, reject) => {
        this.fsGeneralMethods
          .request(this, "globalServer", "NoticeModule", "query")
          .then(result => {
            resolve();
            if (result.code === 200) {
              sessionStorage.setItem("noticeListAll",JSON.stringify(result.data));
              this.noticeList = result.data.slice(0, 4);
            }
          });
      });
    },
    stringToDate(str) {
      var tempStrs = str.split(" ");
      var dateStrs = tempStrs[0].split("-");
      var year = parseInt(dateStrs[0], 10);
      var month = parseInt(dateStrs[1], 10) - 1;
      var day = parseInt(dateStrs[2], 10);
      var timeStrs = tempStrs[1].split(":");
      var hour = parseInt(timeStrs[0], 10);
      var minute = parseInt(timeStrs[1], 10);
      var second = parseInt(timeStrs[2], 10);
      var date = new Date(year, month, day, hour, minute, second);
      return date;
    },
    // 批量设置倒计时
    async secondKills(date, eDate) {
      let endDate = this.stringToDate(
        date.getFullYear() +
          "-" +
          (Number(date.getMonth()) + 1) +
          "-" +
          date.getDate() +
          " " +
          eDate
      );
      let times = Math.floor((endDate - date) / 1000);
      let _this = this;
      if (times >= 0) {
        let timer;
        timer = setInterval(function() {
          times--;
          _this.teamBuy.h = Math.floor(times / 60 / 60);
          _this.teamBuy.m = Math.floor(times / 60) % 60;
          _this.teamBuy.s = times % 60;
          if (times <= 0) {
            clearInterval(timer);
          }
        }, 1000);
        if (times >= 0) {
          console.log(times);
        } else {
          console.log("活动结束");
        }
      }
    },
    // 设置倒计时
    async secondKill(date, eDate) {
      let endDate = this.stringToDate(
        date.getFullYear() +
          "-" +
          (Number(date.getMonth()) + 1) +
          "-" +
          date.getDate() +
          " " +
          eDate
      );
      let times = Math.floor((endDate - date) / 1000);
      let _this = this;
      if (times >= 0) {
        let timer;
        timer = setInterval(function() {
          times--;
          _this.flashSale.h = Math.floor(times / 60 / 60);
          _this.flashSale.m = Math.floor(times / 60) % 60;
          _this.flashSale.s = times % 60;
          if (times <= 0) {
            clearInterval(timer);
          }
        }, 1000);
        if (times >= 0) {
          console.log(times);
        } else {
          console.log("活动结束");
        }
      }
    },
    meauItemClick(item) {
      document.documentElement.scrollTop = item.sHeight || 0;
    },
    toDetail(item, actcode, status) {
      this.$router.push({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu,
          rulestatus: item.rulestatus,
          actcode: actcode || 0,
          status: status || 0
        }
      });
    },
    toLimited() {
      this.$router.push({
        path: "/activity/limited",
        query: {
          actcode: this.limitedID
        }
      });
    },
    toFamous() {
      this.$router.push({
        path: "/activity/famous"
      });
    },
    toNewPerson() {
      this.$router.push({
        path: "/activity/new-person",
        query: {
          actcode: this.newPersonID
        }
      });
    },
    toNewGoods() {
      this.$router.push({
        path: "/activity/new-goods",
        query: {
          actcode: this.newGoodsID
        }
      });
    },
    toIntegral() {
      let routeData = this.$router.resolve({
        path: "/user/integral"
      });
      window.open(routeData.href, "_blank");
    },
    toCategory() {
      let routeData = this.$router.resolve({
        path: "/category"
      });
      window.open(routeData.href, "_blank");
    },
    toHotGoods() {
      this.$router.push({
        path: "/activity/hot-goods",
        query: {
          actcode: this.hotGoodsID
        }
      });
    },
    toSelected() {
      this.$router.push({
        path: "/activity/selected",
        query: {
          actcode: this.selectedID
        }
      });
    },
    toBuying() {
      this.$router.push({
        path: "/activity/buying",
        query: {
          actcode: this.teamByID
        }
      });
    },
    toPost() {
      this.$router.push({
        path: "/activity/post",
        query: {
          actcode: this.postID
        }
      });
    },
    // 消息详情
    toNotice(index) {
      this.$router.push({
        path: "/user/notice",
        query: {
          noticeIndex: index,
        }
      });
    },
    toSpike() {
      this.$router.push({
        path: "/activity/spike",
        query: {
          actcode: this.secondID
        }
      });
    },
    toBrand() {
      this.$router.push({
        path: "/activity/brand",
        query: {
          actcode: this.brandID
        }
      });
    },
    toBrands() {
      this.$message.success('🚜当前功能正在玩命建设中,敬请期待...')
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
.more:hover {
  cursor: pointer;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
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
  background: #f8f8f8;
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
.index-header{
  .container-size(block, 1192px, 412px, 0 auto, 0px);
}
.height-auto {
  // min-height: 360px;
  height: auto !important;
}
.no-ntice{
  .p-size(50px, 50px, 16px, center, 0px, #999999);
}
.active {
  background: #ff0036 !important;
  color: #ffffff !important;
}
.active a {
  color: #ffffff !important;
}
// 广告下方的图片
.pic-link {
  .container-size(block, 1210px, 165px, 0 auto, 0px);
}
.pic-link img {
  width: 298.5px;
  // height: 162px;
}
.pic-link img:hover {
  cursor: pointer;
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
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  border-top: 1px solid #f8f8f8;
  color: #999;
}
/* 为你精选 */
.elaborate {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  min-height: 300px;
  background: #f8f8f8;
}
.elaborate-ui {
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  // float: left;
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
  text-overflow: ellipsis;
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
  .position(absolute, 72px, 198px);
  width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
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
  a {
    float: right;
    font-size: 16px;
    font-weight: normal;
  }
}
/* 热销专区，包邮专区 */
.brand-divs {
  .container-size(block, 1210px, 310px, 0 auto, 0px);
  background: #f8f8f8;
}
.brand-hall {
  .container-size(block, 1190px, 360px, 0 auto, 0px);
  background: #ffffff;
  margin-bottom: 20px;
}
// 一块购
.onek-card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.imme-btn:hover {
  cursor: pointer;
}
.onek-text {
  .p-size(30px, 30px, 16px, left, 0px, #333333);
  background: #f8f8f8;
  font-weight: bold;
}
.onek-shoping {
  .container-size(block, 1202px, auto, 0 auto, 0px);
  min-height: 310px;
  background: #f8f8f8;
  ul {
    float: left;
    width: 1210px;
    li {
      display: inline-block;
      margin-left: 0px;
      margin-right: 17px;
      margin-bottom: 13px;
      .onek-card {
        width: 225px;
        height: 310px;
        padding: 0px;
        .onek-box {
          .container-size(block, 223px, 158px, 0px, 0px);
          .onek-price {
            .p-size(30px, 30px, 16px, left, 7px, #ed3025);
            font-weight: bold;
            del {
              float: right;
              font-size: 14px;
              margin-right: 15px;
              color: #999999 !important;
              font-weight: normal;
            }
          }
          .goods-name {
            .p-size(25px, 25px, 14px, left, 10px, #333333);
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .goods-manu {
            .p-size(25px, 25px, 13px, left, 10px, #999999);
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .goods-state {
            .p-size(25px, 25px, 13px, left, 10px, #999999);
          }
          .goods-btn {
            .p-size(50px, 50px, 13px, left, 10px, #999999);
            border: 1px solid #ed3025;
            button {
              float: right;
              width: 72px;
              height: 48px;
              line-height: 48px;
              border: 1px solid #ed3025;
              background: #ed3025;
              color: #ffffff;
            }
          }
          .goods-success {
            .p-size(27px, 27px, 13px, left, 10px, #999999);
          }
        }
        .onek-pic {
          width: 206px;
          height: 132px;
          margin: 8.5px;
        }
      }
    }
  }
}
.brand-hall .brand-hall-title {
  height: 50px;
  line-height: 50px;
  background: #f8f8f8;
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
  .container-size(block, 1202px, auto, 0 auto, 0px);
  background: #f8f8f8;
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
  .button-color(1px solid #c40000, #f8f8f8, #c40000);
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
  height: 360px;
  background: #f8f8f8;
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
  .container-size(block, 100%, 412px, 0 auto, 0px);
  position: relative;
  // float: left;
  background: #f8f8f8;
  border-top: 1px solid #f8f8f8;
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
  width: 804px;
  height: 412px;
}
.binnar-box {
float: left;
.container-size(inline-block, 804px, 412px, 0 auto, 0px);
margin-left: 178px;
}
.binnar-pic {
  width: 750px;
  height: 321px;
  /* background: orchid; */
  line-height: 321px;
  text-align: center;
}
.notice-box {
  float: left;
  width: 210px;
  height: 413px;
  margin: 0 auto;
  // border: 1px solid #e0e0e0;
  .login-tips {
    .container-size(block, 200px, 100px, 0 auto, 0px);
    border: 1px solid #f2f2f2;
    h3 {
      .p-size(40px, 40px, 12px, center, 0px, #333333);
    }
    p {
      .p-size(40px, 40px, 14px, center, 0px, #333333);
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      button {
        .button-size(82px, 28px, 28px, 14px, 0px, 3px);
      }
    }
  }
  .every-day {
    .p-size(40px, 40px, 14px, left, 20px, #333333);
  }
  .sign-btn {
    .button-display(block, 0 auto);
    .button-size(195px, 37px, 37px, 14px, 0px, 5px);
    .button-color(1px solid transparent, #ff0036, #ffffff);
  }
  .line {
    .container-size(block, 195px, 10px, 0 auto, 0px);
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
  }
  img {
    display: block;
    width: 200px;
    height: 119px;
    margin: 0 auto;
    border: 1px solid transparent;
  }
  .notice-content {
    .container-size(block, 200px, 190px, 0 auto, 0px);
    border: 1px solid #f2f2f2;
    .title {
      width: 200px;
      .p-size(40px, 40px, 14px, left, 20px, #333333);
      border-top: 1px solid #f2f2f2;
      border-bottom: 1px solid #f2f2f2;
      padding-right: 20px;
      .more {
        color: #999999 !important;
      }
    }
    .notice-text {
      width: 200px;
      .p-size(35px, 35px, 14px, left, 5px, #666);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .notice-text:hover {
      color: #ed3025;
      cursor: pointer;
    }
  }
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

.onek-img {
  display: block;
  width: 135px;
  height: 132px;
  margin: 0 auto;
  margin-bottom: 9px;
  margin-top: 9px;
}
.top-img {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 40px;
}
.height80 {
  position: relative;
  top: 0px;
  left: 0px;
  height: 80px !important;
  line-height: 80px !important;
}
.see-wholes {
  // float: right;
  font-size: 16px;
  font-weight: normal;
}
.discount-num {
  .position(absolute, -20px, 260px);
  display: inline-block;
  width: 220px;
  height: 20px;
  font-size: 14px;
}
.discount-num span {
  display: inline-block;
  width: 30px;
  height: 30px;
}
.person-num {
  .position(absolute, 20px, 260px);
  display: inline-block;
  width: 220px;
  height: 20px;
  font-size: 14px;
}
.person-num span {
  display: inline-block;
  width: 30px;
  height: 30px;
}
.ant-progress-inner {
  background-color: #ffffff;
}

/* 右侧菜单栏 */
.sider-meun {
  position: fixed;
  top: 300px;
  left: 10px;
  background: #f8f8f8;
}

.sider-meun .right-meun {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #666;
  border-top: 1px #ffffff solid;
}

.right-meun a {
  font-size: 12px;
  color: #ffffff !important;
}

.asdadasdad {
  line-height: 12px;
  width: 24px;
  height: 28px;
  margin: 11px auto;
}
.menu-cur-nav .color-base {
  background-color: #ff0036 !important;
  a {
    color: #ffffff !important;
  }
}

.menu-cur-nav .color-pink {
  background-color: #ea5f8d !important;
  a {
    color: #ffffff !important;
  }
}

.menu-cur-nav .color-blue {
  background-color: #0aa6e8 !important;
  a {
    color: #ffffff !important;
  }
}

.menu-cur-nav .color-green {
  background-color: #64c333 !important;
  a {
    color: #ffffff !important;
  }
}

.menu-cur-nav .color-khaki {
  background-color: #F0E68C !important;
  a {
    color: #ffffff !important;
  }
}

.menu-cur-nav .color-purple {
  background-color: #800080 !important;
  a {
    color: #ffffff !important;
  }
}


.menu-cur-nav .color-beige {
  background-color: #6b8e23 !important;
  a {
    color: #ffffff !important;
  }
}

.menu-cur-nav .color-wheat {
  background-color: #ee1289 !important;
  a {
    color: #ffffff !important;
  }
}

.menu-cur-nav .color-indigo {
  background-color: #4b0082 !important;
  a {
    color: #ffffff !important;
  }
}
.margin-bottom10 {
  margin-bottom: 10px;
}
/* For demo */
.ant-carousel > .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
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
</style>
