<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout>
        <!-- 头部组件 -->
        <f-space-header type="home"></f-space-header>
        <a-layout-content>
          <div class="goods-exhibition">
            <a-breadcrumb class="crumbs">
              <a-breadcrumb-item>首页</a-breadcrumb-item>
              <a-breadcrumb-item>
                <a href="javascript:;" v-if="rulecode == 0">商品列表</a>
                <a href="javascript:;" v-if="rulecode == 1113">限时抢购</a>
                <a href="javascript:;" v-if="rulecode == 1133">一块购</a>
              </a-breadcrumb-item>
              <a-breadcrumb-item>
                <a href>{{ prodDetail.prodname }}</a>
              </a-breadcrumb-item>
            </a-breadcrumb>
            <div class="goods-big-pic">
              <!-- <pic-zoom :url="imgUrl" :scale="2.5"></pic-zoom> -->
              <!-- <img v-lazy="imgUrl" slot="cover"> -->
              <f-space-pic-zoom v-if="isShowPic" :imgUrl="imgUrl" />
              <!-- 根据商品收藏状态显示收藏或者取消收藏 -->
              <p v-if="this.isShowCollec === false">
                <span @click="addCollec()">
                  <a-icon type="star" class="collection"/>收藏
                </span>
              </p>
              <!-- 已收藏的class为collection -->
              <p v-if="this.isShowCollec === true">
                <span @click="delCollec()">
                  <a-icon type="star" class="collection"/>取消收藏
                </span>
              </p>
               <p>
                <span v-clipboard:copy="shareURl" v-clipboard:success="onShare">
                  <a-icon type="share-alt" class="collection"/> 分享
                </span>
               </p>
            </div>
            <div class="goods-info">
              <p class="goods-name">{{ prodDetail.prodname }}</p>
              <p
                class="rush-time"
                v-if="rulecode == 1113 && isSecondkill"
              >限时抢购 距离结束还剩 {{ flashSale.h }} 小时 {{ flashSale.m }} 分钟 {{ flashSale.s }} 秒 <span @click="toLimited()">更多抢购 ></span></p>
              <p
                class="rush-time"
                v-if="rulecode == 1133"
              >一块购 距离结束还剩 {{ flashSale.h }} 小时 {{ flashSale.m }} 分钟 {{ flashSale.s }} 秒 <span @click="toBuying()">查看更多 ></span></p>
              <div class="price-server">
                <p class="onek-person" v-if="rulecode == 1133">
                  <span>10.0</span>
                  <span>9.8</span>
                  <span>9.5</span>
                  <span>9.0</span>
                  <span>8.8</span>
                  <span>8.5</span>
                  <span>折</span>
                </p>
                <a-progress
                  v-if="rulecode === 1113 || rulecode === 1133"
                  :percent="percentAge"
                  style="width: 295px;height: 8px;margin-left: 20px;"
                  :showInfo="false"
                  status="exception"
                />
                <p class="onek-person" v-if="rulecode === 1133">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                  <span>25</span>
                  <span>人</span>
                </p>
                <p class="surplus" v-if="rulecode == 1113">
                  还剩{{ discount.limits }}支
                  <span>限购{{ discount.limits }}支</span>
                </p>

                <p class="price" v-if="rulecode == 1113">
                  <span class="price-title">价格</span>
                  <span class="money-count" v-if="userStatus">￥{{ discount.killPrice }}</span>
                  <span class="money-count" v-else>￥登录后可见</span>
                  <del>{{ prodDetail.mp }}</del>
                </p>
                <!-- <p class="price" v-else-if="rulecode === 1133">
                  <span class="price-title">价格</span>
                  <span class="money-count"  v-if="userStatus">￥{{ prodDetail.vatp }}</span>
                  <span class="money-count" v-else>￥登录后可见</span>
                </p> -->
                <p class="price" v-else>
                  <span class="price-title">价格</span>
                  <span class="money-count"  v-if="userStatus">￥{{ prodDetail.vatp }}</span>
                  <span class="money-count" v-else>￥登录后可见</span>
                </p>
                <!-- 积分 -->
                <!-- <p class="price">
                  <span>购买得50积分</span>
                </p>-->
                <!-- <p class="price indent">
                  <a-icon type="check-circle"/>
                  <span>30天无忧退退货</span>
                  <a-icon type="check-circle"/>
                  <span>48小时快速退款</span>
                  <a-icon type="check-circle"/>
                  <span>满88元免邮费</span>
                </p> -->
              </div>
              <div class="manufacturer">
                <p class="packing">
                  <span>规格/包装：</span>
                  <span class="margin-right190">{{ prodDetail.spec }}</span>
                  <!-- <span>剂 型：</span> -->
                  <!-- <span>瓶装</span> -->
                </p>
                <p class="packing">
                  <span>批准文号：</span>
                  <span class="margin-right190">{{ prodDetail.standarNo }}</span>
                  <span>整件数量：</span>
                  <span>{{ prodDetail.wholenum }}</span>
                </p>
                <p class="packing">
                  <span>生产厂家：</span>
                  <span class="margin-right190">{{ prodDetail.manuName }}</span>
                </p>
                <p class="packing">
                  <span>生产日期：</span>
                  <span
                    class="margin-right190"
                  >{{ prodDetail.prodsdate + ' ~ ' + prodDetail.prodedate}}</span>
                </p>
                <p class="packing">
                  <span>有效期至：</span>
                  <span>{{ prodDetail.vaildsdate }} ~ {{ prodDetail.vaildedate }}</span>
                </p>
                <!-- <div class="packing">
                  <span>配送至</span>
                  <a-select defaultValue="湖南省长沙市岳麓区" style="width: 200px" @change="handleChange"></a-select>
                  <span>有货</span>
                </div>-->
                <!-- <p class="packing">
                  由
                  <a href>一块物流</a>发货，一块医药提供售后服务. 23:00前下单,预计后天(03月18日)送达
                </p>-->
                <p class="btn-p">
                  <button @click="reduceCount()">-</button>
                  <!-- <button class="goods-count">{{item.count}}</button> -->
                  <!-- <a-input-number :min="1" :max="maximum" v-model="inventory" style="width: 70px;padding: 0px;"/> -->


                  <a-input-number
                    :min="1"
                    :max="maximum"
                    v-model="inventory"
                    style="position:relative;top: 1px;left:0px;height: 30px;width: 50px;"
                   
                  />


                  <!-- <a-input-number :min="1" :max="maximum" v-model="inventory" style="position:relative;top: 2px;left:0px;height: 30px;width: 50px;"/> -->
                  <button @click="addCount()">+</button>
                </p>
                <p class="cart">
                  <!-- <input type="text" readonly="readofnly" v-model="count" class="goods-count"> -->
                  <!-- <button class="addition width22" @click="addCount()">+</button> -->
                  <!-- <button class="reduce width22">-</button> -->
                  <!-- <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number> -->
                  <a-button
                    :loading="loading"
                    type="danger"
                    class="purchase"
                    @click="placeOrder()"
                    v-if="rulecode !== 1113"
                  >立即购买</a-button>
                  <a-button class="add-cart" @click="addCart()" v-if="rulecode !== 1113">
                    <a-icon type="shopping-cart"/>加入采购单
                  </a-button>
                  <a-button
                    type="primary"
                    class="purchase"
                    @click="attendSecKill()"
                    v-if="rulecode === 1113 && isSecondkill"
                  >立即抢购</a-button>
                </p>
              </div>
            </div>
          </div>
          <!-- 商品优惠券  v-if="couponPub.length > 0"-->
          <div class="coupon-box" v-if="couponPub.length > 0">
            <p class="coupon-title">
              商品优惠券
              <!-- <span @click="toPersonCoupon()">
                更多优惠券
                <a-icon type="right"/>
              </span>-->
            </p>
            <div class="coupon-content">
              <div class="coupon-boxs" v-for="(item, index) in couponPub" :key="index">
                <div class="coupon-card" v-if="item.brulecode === 2120" @click="revCoupon(item)">
                  <div class="coupon-left">
                    <p class="coupon-type">
                      {{ item.rulename }}
                      <span class="term">有效期 {{ item.validday }} 天</span>
                    </p>
                    <span class="ladder" v-for="(j, i) in item.ladderVOS" :key="i">
                      满
                      <span>{{ j.ladamt }}</span> 包邮
                    </span>
                  </div>
                  <div class="coupon-right">
                    <img class="state-pic" src="../../assets/img/receive.png" alt>
                  </div>
                </div>
              </div>
              <div v-for="(item, index) in couponPub" :key="index" class="coupon-boxs">
                <div class="coupon-card" v-if="item.brulecode === 2130" @click="revCoupon(item)">
                  <div class="coupon-left">
                    <p class="coupon-type">
                      {{ item.rulename }}
                      <span class="term">有效期 {{ item.validday }} 天</span>
                    </p>
                    <span class="ladder" v-for="(j, i) in item.ladderVOS" :key="i">
                      满
                      <span>{{ j.ladamt }}</span> 打
                      <span>{{ j.offer/10}}</span> 折
                    </span>
                  </div>

                  <div class="coupon-right">
                    <img class="state-pic" src="../../assets/img/receive.png" alt>
                  </div>
                </div>
              </div>
              <div class="coupon-boxs" v-for="(item, index) in couponPub" :key="index">
                <div class="coupon-card" v-if="item.brulecode === 2110" @click="revCoupon(item)">
                  <div class="coupon-left">
                    <p class="coupon-type">
                      {{ item.rulename }}
                      <span class="term">有效期 {{ item.validday }} 天</span>
                    </p>
                    <span v-for="(j, i) in item.ladderVOS" :key="i" class="ladder">
                      满
                      <span>{{ j.ladamt }}</span> 减
                      <span>{{ j.offer}}</span>
                    </span>
                    <!-- <span>有效期 {{ item.validday }} 天</span> -->
                  </div>
                  <div class="coupon-right">
                    <img class="state-pic" src="../../assets/img/receive.png" alt>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 一块购 -->
          <div class="coupon-box" v-if="rulecode === 1133">
            <p class="coupon-title">一块购规则说明</p>
            <div class="coupon-content">
              <img src="../../assets/img/arrow.png" alt>
            </div>
          </div>
          <!-- 详情和评价 -->
          <div class="tabs-page">
            <div class="tabs-detail">
              <a-tabs defaultActiveKey="1" @change="callback" :tabBarStyle="tabStyle">
                <!-- 详情 -->
                <a-tab-pane tab="药品详情" key="1">
                  <div class="probably">
                    <p>
                      <span class="title-left">药品名称：</span>
                      {{prodDetail.brandName}} {{prodDetail.prodname}}
                    </p>
                    <p>
                      <span class="title-left">品牌：</span>
                      {{prodDetail.brandName}}
                      <span class="right-text">{{prodDetail.spec}}</span>
                      <span class="title-right">规格：</span>
                    </p>
                    <p>
                      <span class="title-left">生产厂商：</span>
                      {{prodDetail.manuName}}
                    </p>
                    <p>
                      <span class="title-left">批准文号：</span>
                      {{prodDetail.standarNo}}
                      <span class="right-text">{{prodDetail.rxName}}</span>
                      <span class="title-right">产品类型：</span>
                    </p>
                    <p>
                      <span class="title-left">温馨提示：</span> 部分商品包装更换频繁，如货品与图片 不完全一致，请以收到的商品实物为准
                    </p>
                  </div>
                  <div class="goods-detail">
                    <p class="instructions">{{prodDetail.prodname}}说明书</p>
                    <p class="detail-list">
                      <span class="explain-header">药品名称</span>
                      <span>{{ prodDetail.prodname }}</span>
                    </p>
                    <p class="detail-list">
                      <span class="explain-header">规格包装</span>
                      <span>{{ prodDetail.spec }}</span>
                    </p>
                    <p class="detail-list">
                      <span class="explain-header">生产厂家</span>
                      <span>{{ prodDetail.manuName }}</span>
                    </p>
                    <p class="detail-list">
                      <span class="explain-header">批准文号</span>
                      <span>{{ prodDetail.standarNo }}</span>
                    </p>
                    <div class="explain">
                      <span class="explain-header">功能主治</span>
                      <span class="explain-text">{{ details[0].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">主要成份</span>
                      <span class="explain-text">{{ details[1].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">用法用量</span>
                      <span class="explain-text">{{ details[2].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">不良反应</span>
                      <span class="explain-text">{{ details[3].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">注意事项</span>
                      <span class="explain-text">{{ details[4].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">禁忌</span>
                      <span class="explain-text">{{ details[5].content }}</span>
                    </div>
                  </div>
                </a-tab-pane>
                <!-- 评价 -->
                <a-tab-pane tab="药品评价" key="2" forceRender>
                  <div class="evaluate-box">
                    <div class="evaluate-list">
                      <a-comment v-for="(item,index) in appriseArr" :key="index">
                        <a style="color: orange">{{item.compName}}</a>
                        <p>
                          <a-rate allowHalf :defaultValue="item.compEval" disabled/>
                        </p>
                        <p class="comment-text">{{item.content}}</p>
                        <p class="time-text">评价时间: {{item.createtdate}}&nbsp {{item.createtime}}</p>
                      </a-comment>
                    </div>
                  </div>
                  <a-pagination :defaultCurrent="currentIndex" :total="total" @change="pageNumber"/>
                </a-tab-pane>
              </a-tabs>
            </div>
            <!-- 热销推荐 -->
            <div class="hot-recommend" v-if="hotList.length > 0">
              <p class="hot-recommend-title">热销推荐</p>
              <div class="recommend-box">
                <ul class="recommend-ul">
                  <li v-for="(item,index) in hotList" :key="index">
                    <a-card class="card-recommend" hoverable @click="toDetail(item)">
                      <img v-lazy="item.imgURl" slot="cover">
                      <p class="meal-name">{{item.prodname}}</p>
                      <p class="meal-price">￥{{item.mp}}元</p>
                      <p class="meal-packing">已售{{item.buynum}}{{item.unitName}}</p>
                    </a-card>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </a-layout-content>
        <!-- 页脚 -->
        <f-space-footer></f-space-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import moment from "moment";
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceButton from "../../components/fspace-ui/button/button";
import FSpaceFooter from "../../components/fspace-ui/footer";
import FSpacePicZoom from "../../components/fspace-ui/piczoom";

export default {
  components: {
    FSpaceHeader,
    FSpaceButton,
    FSpaceFooter,
    FSpacePicZoom
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    },
    userStatus() {
      return this.$store.state.userStatus;
    }
  },
  // middleware: "authenticated",
  data() {
    return {
        compEval: 4.7,
      shareURl: '',
      appriseArr: [], //评价列表
      evaluateVal: 0, // 药店评价商品的分数
      currentIndex: 1, // 第几页
      total: 0, // 总页数
      rulecode: 0, //活动规则
      activitiesBySKU: [],
      configs: {
        width: 650,
        height: 350,
        maskWidth: 100,
        maskHeight: 100,
        maskColor: "red",
        maskOpacity: 0.2
      },
      isSecondkill: true,
      unqid: 0, // 活动码
      unqid2: 0, // 秒杀前生成的码
      loading: false,
      maximum: 1, // 最大库存
      inventory: 1, // 当前库存
      percentAge: 50,
      flashSale: {
        h: 0,
        m: 0,
        s: 0
      },
      isShowPic: false,
      hotList: [],
      isShowCollec: false,
      imgUrl: "",
      sku: "",
      spu: "",
      prodDetail: {
        prodsdate: "",
        prodedate: ""
      },
      details: [
        {
          name: "功能主治",
          content: "",
          id: 1
        },
        {
          name: "主要成分",
          content: "",
          id: 2
        },
        {
          name: "用法用量",
          content: "",
          id: 3
        },
        {
          name: "不良反应",
          content: "",
          id: 4
        },
        {
          name: "注意事项",
          content: "",
          id: 5
        },
        {
          name: "禁忌",
          content: "",
          id: 6
        }
      ],
      discount: {},
      likes: 0,
      brandNum: "",
      dislikes: 0,
      action: null,
      moment,
      couponPub: [],
      tabStyle: {
        color: "black",
        fontSize: "26px",
        backgroundColor: "#f2f2f2"
      },
      count: 1
    };
  },
  mounted() {
    this.shareURl = window.location.href;
    this.sku = this.$route.query.sku;
    this.spu = this.$route.query.spu;
    // 获取商品详情
    this.getProd();
    this.getImgUrl();
    if(this.userStatus) {
      // 获取优惠券
      this.queryCouponPub();
      // 获取是否收藏
      this.isCollec();
      // 获取活动详情
      this.getActivitiesBySKU();
      // 获取热销数据
      this.getProdDetailHotArea();
      //获取评价信息
      this.$nextTick(function() {
        this.getGoodsApprise();
      });
    }
    this.$nextTick(() => {
      this.isShowPic = true;
    });
  },
  methods: {
    pageNumber(pageNumber) {
      this.currentIndex = pageNumber;
      // 再重新调一次请求评价列表方法
      this.getGoodsApprise();
    },
    //获取评价列表
    getGoodsApprise() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getGoodsApprise";
      iRequest.param.pageIndex = this.currentIndex;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        sku: this.sku
      });
      // iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.appriseArr = result.data;
              _this.total = result.total;
            }
          }
        )
      );
    },
    // 新增采购数量
    addCount() {
      if (this.inventory >= this.maximum) {
        this.$message.warning("库存不足或超出限购数量");
        return;
      }
      this.inventory++;
    },
    reduceCount() {
      if (this.inventory <= 1) {
        return;
      }
      this.inventory--;
    },
    // 获取药品活动类型
    getActivitiesBySKU() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "CalculateModule";
      iRequest.method = "getActivitiesBySKU";
      iRequest.param.arrays = [this.sku];
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.activitiesBySKU = result.data;
            // 如果存在活动 取库存与活动库存最小值
            // 如果不存在活动 取活动库存与限购量存最小值
            if (_this.activitiesBySKU.length > 0) {
              _this.rulecode = _this.activitiesBySKU[0].brulecode;
              _this.unqid = _this.activitiesBySKU[0].unqid
              if(_this.rulecode === 1113) {
                _this.beforeSecKill();
              }
              _this.queryActiveType(_this.activitiesBySKU[0].unqid);
            }
          }
        })
      );
    },
    // 加入采购单
    addCart() {
      if (!this.userStatus) {
        this.$router.push({
          path: '/user/login'
        })
        return
      }
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "saveShopCart";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId,
        pdno: this.prodDetail.sku,
        pnum: this.inventory,
        checked: 0
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.$message.success(result.message);
            }
          }
        )
      );
    },
    beforeSecKill() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "SecKillModule";
      iRequest.method = "beforeSecKill";
      iRequest.param.json = JSON.stringify({
        sku: _this.sku,
        actno: _this.unqid
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.unqid2 = result.data;
            }
          }
        )
      );
    },
    attendSecKill() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "SecKillModule";
      iRequest.method = "attendSecKill";
      iRequest.param.json = JSON.stringify({
        sku: _this.prodDetail.sku,
        actno: _this.unqid,
        unqid: _this.unqid2,
        stock: _this.inventory
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.$route.path.replace();
              result.data.forEach((item) => {
                  item.actcode = _this.unqid
              })
              sessionStorage.setItem('placeOrderList', JSON.stringify(result.data));
              _this.$router.push({
                name: "order-placeOrder",
                query: {
                  placeType: 1,
                  orderType: 1
                }
              });
            }
          }
        )
      );
    },
    // 猜你喜欢列表
    // 领取优惠券
    revCoupon(item) {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "revCoupon";
      iRequest.param.json = JSON.stringify(item);
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.$message.success(result.message);
              _this.queryCouponPub();
            }
          }
        )
      );
    },
    // 获取待领取优惠券
    queryCouponPub() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponManageModule";
      iRequest.method = "queryCouponPub";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        gcode: _this.sku, // sku
        compid: _this.storeInfo.comp.storeId, // 企业id
        pageSize: 5,
        pageNo: 1
      });
      this.$refcallback(
        this,
        "discountServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.couponPub = result.data;
            }
          }
        )
      );
    },
    // 查询商品活动类型
    queryActiveType(unqid) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "CalculateModule";
      iRequest.method = "getGoodsActInfo";
      iRequest.param.arrays = [this.sku, unqid];
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
          if (result.code === 200) {
            if (result.data) {
              _this.discount = result.data;
              // 设置倒计时
              _this.secondKill(
                _this.stringToDate(_this.discount.currentDate),
                _this.discount.endTime
              );
              // 设置最大库存
              _this.maximum = _this.discount.limits;
            }
          }
        })
      );
    },
    getProdDetailHotArea() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getProdDetailHotArea";
      let spu = this.spu + "";
      iRequest.param.json = JSON.stringify({
        spu: spu.slice(1, 7)
      });
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.hotList = result.data.slice(0, 5);
            _this.fsGeneralMethods.addImages(_this, _this.hotList, 'sku', 'spu')
            // _this.prodDetail = result.data
            // _this.details = JSON.parse(_this.prodDetail.detail)
          }
        })
      );
    },
    // 获取详情
    getProd() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "BackgroundProdModule";
      iRequest.method = "getProd";
      iRequest.param.arrays = [this.sku];
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            if (result.data) {
              _this.prodDetail = result.data;
              if(_this.userStatus) {
                _this.getFoot();
              }
              _this.details = JSON.parse(_this.prodDetail.detail);
              // if (_this.rulecode === 0) {
              //   _this.maximum = _this.prodDetail.store;
              // } else if (_this.rulecode == 1113) {
              //   _this.maximum =
              //     _this.prodDetail.limits > _this.prodDetail.store
              //       ? _this.prodDetail.store
              //       : _this.prodDetail.limits;
              // } else {
              //   _this.maximum =
              //     _this.prodDetail.limits > _this.prodDetail.store
              //       ? _this.prodDetail.store
              //       : _this.prodDetail.limits;
              // }
            }
          }
        })
      );
    },
    // 上传足迹
    getFoot() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyFootprintModule";
      iRequest.method = "add";
      iRequest.param.json = JSON.stringify({
        sku: this.prodDetail.sku,
        compid: this.storeInfo.comp.storeId
      });
      // 促销类型未传，暂定0，促销完善补上
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor(this.storeInfo.comp.storeId / 8192 % 65535),
        iRequest,
        new this.$iceCallback()
      );
    },
    // 添加收藏
    addCollec() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyCollectModule";
      iRequest.method = "add";
      iRequest.param.json = JSON.stringify({
        sku: this.prodDetail.sku,
        prize: this.prodDetail.vatp,
        promtype: 0
      });
      // 促销类型未传，暂定0，促销完善补上
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.isCollec();
          }
        })
      );
    },
    // 取消收藏
    delCollec() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyCollectModule";
      iRequest.method = "del";
      iRequest.param.json = JSON.stringify({
        sku: this.prodDetail.sku,
        unqid: this.prodDetail.unqid,
        prize: this.prodDetail.vatp,
        promtype: 0
      });
      // 促销类型未传，暂定0，促销完善补上
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.isCollec();
          }
        })
      );
    },
    // 查询是否被收藏
    isCollec() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyCollectModule";
      iRequest.method = "check";
      iRequest.param.json = JSON.stringify({
        sku: this.prodDetail.sku
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
        Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.isShowCollec = result.data;
          }
        })
      );
    },
    // 下单
    placeOrder() {
      if (!this.userStatus) {
        this.$router.push({
          path: '/user/login'
        })
        return
      }
      this.loading = true;
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "querySettShopCartList";
      let arr = [
        {
          pdno: this.prodDetail.sku,
          pnum: this.inventory,
          compid: this.storeInfo.comp.storeId,
          checked: 1,
          unqid: 0,
          conpno: 0,
          areano: this.storeInfo.comp.addressCode
        }
      ];
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            _this.loading = false;
            if (result.code === 200) {
              _this.$route.path.replace();
              if (_this.unqid > 0) {
                  result.data.forEach((item) => {
                    item.actcode = [_this.unqid]
                  })
                }
              sessionStorage.setItem('placeOrderList', JSON.stringify(result.data));
              _this.$router.push({
                name: "order-placeOrder",
                query: {
                  placeType: 1,
                  orderType: 0
                }
              });
            }
          }
        )
      );
    },
    getImgUrl() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      this.sku = this.$route.query.sku;
      this.spu = this.$route.query.spu;
      iRequest.param.json = JSON.stringify({
        list: [
          {
            sku: this.sku,
            spu: this.spu
          }
        ]
      });
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.imgUrl =
                result.data.downPrev +
                result.data.goodsFilePathList +
                "/" +
                _this.sku +
                ".jpg" +
                "?" +
                new Date().getSeconds();
            }
          },
          function error(error) {}
        )
      );
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
    // 设置倒计时
    secondKill(date, eDate) {
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
            _this.isSecondkill = false;
          }
        }, 1000);
        if (times >= 0) {
          _this.isSecondkill = true;
        } else {
          _this.isSecondkill = false;
        }
      }
    },
    onShare(e) {
      console.log(e)
      this.$message.success('商品链接已复制至剪贴板')
    },
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    toPersonCoupon() {
      // this.$router.push({
      //   path: '/user/personal/coupon'
      // })
    },
    toLimited() {
      this.$router.push({
        path: '/activity/limited',
        query: {
          actcode: this.unqid
        }
      })
    },
    toBuying() {
      this.$router.push({
        path: '/activity/buying',
        query: {
          actcode: this.unqid
        }
      })
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
    },
    handleChange(value) {},
    callback(key) {},
    toDetail(item) {
      let routeData = this.$router.resolve({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu
        }
      });
      window.open(routeData.href, "_blank");
    }
  },
  beforeDestroy() {
    this.isShowPic = false;
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
/* 优惠券 */
.coupon-box {
  display: block;
  width: 1190px;
  height: auto;
  margin: 0 auto 40px auto;
  border: 1px solid #f2f2f2;
  padding-bottom: 20px;
}
.coupon-title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  background: #f2f2f2;
  text-indent: 20px;
  color: #999999;
}
.coupon-title span {
  float: right;
  margin-right: 20px;
}
.coupon-title span:hover {
  cursor: pointer;
}
.coupon-content {
  display: inline-block;
  width: 1190px;
  height: auto;
}
.coupon-content img {
  width: 1190px;
  height: 246px;
}
.coupon-card {
  display: inline-block;
  width: 340px;
  height: 160px;
  margin: 42px 20px 0px 30px;
}
.coupon-card:hover {
  cursor: pointer;
}
.coupon-left {
  float: left;
  width: 280px;
  height: 160px;
  border: 1px solid #fdddc5;
  background: #fffbf3;
}
.coupon-type {
  height: 40px;
  line-height: 40px;
  text-align: left;
  text-indent: 20px;
  margin-bottom: 15px;
  background: #666666;
  font-size: 20px;
  color: #ffffff;
}
.coupon-type .term {
  float: right;
  margin-right: 20px;
  font-size: 14px;
  color: #ffffff;
}
.ladder {
  display: inline-block;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: left;
  text-indent: 20px;
  color: #666666;
}
.ladder span {
  color: #ed3025;
}
/* .coupon-left span {
  display: inline-block;
  width: 100%;
  height: 30px;
  text-align: left;
  text-indent: 20px;
  color: #999999;
} */
.coupon-right {
  float: right;
  width: 60px;
  height: 160px;
}
.coupon-right img {
  width: 100%;
  height: 100%;
}
.post-span {
  margin-bottom: 30px;
}
/* 商品展示 */
.goods-exhibition {
  width: 1190px;
  height: 560px;
  margin: 0 auto;
  padding-top: 20px;
}
.goods-exhibition .crumbs {
  margin: 0 0 20px 0;
}
.goods-big-pic {
  display: inline-block;
  width: 490px;
  height: 485px;
}
.collection {
  color: rgb(247, 37, 38);
}
.goods-big-pic img {
  width: 490px;
  height: 430px;
}
.goods-big-pic p {
  text-align: left;
  font-size: 16px;
  color: #666666;
  width: 80px;
  float: left;
}
.goods-big-pic p span:hover {
  cursor: pointer;
  color: rgb(247, 37, 38);
}
/* 已收藏后的样式 */
.collection {
  color: rgb(247, 37, 38);
}
.small-pic {
  display: inline-block;
  width: 490px;
  height: 100px;
  overflow: hidden;
  padding-bottom: 10px;
}
.small-pic li {
  display: inline-block;
  position: relative;
  top: 10px;
  width: 80px;
  height: 80px;
  background: brown;
}
.small-pic li img {
  display: inline-block;
  position: absolute;
  top: 0px;
  width: 80px;
  height: 80px;
}
.goods-info {
  float: right;
  position: relative;
  top: 0px;
  left: 0px;
  width: 657px;
  height: 485px;
}
.surplus {
  text-indent: 20px;
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
  background: rgb(247, 37, 38);
  font-size: 20px;
  color: #ffffff;
}
.rush-time span{
  float: right;
  margin-right: 10px;
  font-size: 14px;
  color: #ffffff;
}
.rush-time span:hover{
  cursor: pointer;
}
.price-server {
  /* min-height: 129px; */
  height: auto;
  /* background: rgb(246, 246, 246); */
}
.onek-person {
  text-indent: 10px;
}
.onek-person span {
  display: inline-block;
  width: 50px;
}
.price-server .price {
  height: 42px;
  line-height: 42px;
  text-indent: 20px;
  font-size: 16px;
  color: #666666;
}
.price-server .price del {
  font-weight: bold;
}
.price-server .price .integral {
  margin-right: 5px;
}
.money-count {
  margin-right: 5px;
  font-size: 24px;
  font-weight: bold;
  color: rgb(247, 37, 38);
}
.indent {
  text-indent: 10px !important;
}
.manufacturer {
  display: inline-block;
  width: 657px;
  height: 150px;
  font-size: 16px;
  color: #666666;
}
.manufacturer .packing {
  height: 30px;
  text-indent: 20px;
  line-height: 30px;
}
.margin-right190 {
  margin-right: 30px;
}
.cart {
  position: relative;
  top: 10px;
  left: 0px;
  height: 44px;
  text-indent: 20px;
}
.goods-count {
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}
.addition {
  position: absolute;
  top: 0px;
  left: 64px;
}
.width22 {
  width: 22px;
  height: 22px;
  line-height: 10px;
  text-align: center;
}
.reduce {
  position: absolute;
  top: 22px;
  left: 64px;
}
.purchase {
  position: absolute;
  top: 0px;
  width: 170px;
  height: 44px;
  border: 1px solid rgb(247, 37, 38);
  border-radius: 5px;
  background: rgb(255, 244, 246);
  color: rgb(247, 37, 38);
}
/* 优惠券列表 */
.condition-price {
  width: 1190px;
  height: 296px;
}
.discount {
  display: block;
  width: 1190px;
  height: 296px;
  margin: 0 auto;
  border: 1px solid rgb(238, 238, 238);
  margin-bottom: 20px;
}
.discount-title {
  width: 1190px;
  height: 50px;
  background: rgb(246, 246, 246);
  line-height: 50px;
  text-indent: 20px;
  font-size: 18px;
  color: #666666;
}
.discount-title a {
  float: right;
  margin-right: 20px;
  cursor: pointer;
}
.discount .carousel {
  width: 1190px;
  height: 246px;
}
.meal-card {
  display: inline-block;
  width: 200px;
  height: 280px;
  margin-right: 10px;
}
.meal-card img {
  width: 198px;
  height: 180px;
}
.meal-price {
  text-align: left;
  font-weight: bold;
  color: rgb(245, 47, 62);
}
.meal-name {
  text-align: left;
  color: #333333;
}
.meal-packing {
  text-align: left;
  color: #999999;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 246px;
  line-height: 246px;
  overflow: hidden;
}
.ant-carousel[data-v-0e9671aa] .custom-slick-arrow {
  background-color: rgba(247, 37, 38, 0.5);
}
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
/* 详情和评价页面 */
.tabs-page {
  display: block;
  width: 1190px;
  height: 1900px;
  margin: 0 auto;
}
.tabs-detail {
  float: left;
  width: 905px;
  height: 1900px;
  border: 1px solid rgb(238, 238, 238);
}
.goods-detail {
  width: 900px;
  height: 1600px;
  padding-left: 50px;
  /* overflow: auto; */
}
.explain {
  width: 900px;
  height: auto;
  padding: 20px 0;
  font-size: 16px;
}
.detail-list {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.explain .explain-text {
  display: inline-block;
  width: 700px;
  height: auto;
}
.explain-header {
  display: inline-block;
  width: 80px;
  margin-right: 20px;
  vertical-align: top;
}
.ant-tabs-nav .ant-tabs-tab-active {
  color: red;
}
.evaluate-box {
  display: block;
  width: 900px;
  height: 1600px;
  margin-bottom: 20px;
  border-left: 1px solid rgb(238, 238, 238);
  border-bottom: 1px solid rgb(238, 238, 238);
}
.evaluate-box .praise {
  display: block;
  width: 750px;
  height: 160px;
}
.probability {
  float: left;
  width: 150px;
  height: 150px;
  margin-left: 30px;
  /* border-right: 1px solid rgb(238, 238, 238); */
}
.probability .percentage,
.probability .percentage-num {
  height: 50px;
  line-height: 50px;
  color: #333;
}
.everybody {
  float: right;
  width: 500px;
  height: 200px;
}
.everybody p {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.everybody a {
  display: inline-block;
  height: 30px;
  border: 1px solid rgb(247, 37, 38);
  border-radius: 30px;
  padding: 10px 10px;
  margin-bottom: 10px;
  line-height: 10px;
  text-align: center;
}
.is-active {
  background: rgb(247, 37, 38);
  color: #fff;
}
.ant-tabs-bar {
  margin: 0 !important;
}
.comment-text {
  color: #333;
  line-height: 180%;
  padding: 10px 0;
  width: 700px;
  font-size: 14px;
}
.time-text {
  margin-top: 5px;
  color: #7f828b;
  font-size: 12px;
}
.evaluate-list {
  border-top: 1px solid rgb(238, 238, 238);
}
/* 热销推荐 */
.hot-recommend {
  float: right;
  width: 280px;
  height: 1630px;
  /* background: darkorange; */
  border: 1px solid rgb(238, 238, 238);
}
.hot-recommend-title {
  height: 45px;
  text-indent: 20px;
  line-height: 55px;
  background: rgb(246, 246, 246);
  font-size: 20px;
  color: #666666;
}
.recommend-ul {
  width: 200px;
  height: 1510px;
}
.recommend-box {
  padding: 10px 30px;
}
.card-recommend {
  width: 220px;
  height: 300px;
  margin-bottom: 15px;
}
.card-recommend img {
  width: 218px;
  height: 190px;
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
  width: 1190px;
  height: 140px;
}
.server-ui li {
  display: inline-block;
  width: 292px;
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
  border: 3px solid rgb(255, 0, 58);
  border-radius: 50%;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  color: rgb(255, 0, 58);
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
  border-top: 1px solid rgb(237, 237, 237);
  background: #ffffff;
  padding-top: 20px;
}
.shoping-list {
  background: url("//img.alicdn.com/tfs/TB1dl28RXXXXXbzaFXXXXXXXXXX-136-50.png");
  background-repeat: no-repeat;
  background-size: 68px 25px;
  background-position: 12px bottom;
  padding-left: 50px;
  padding-right: 50px;
}
.shoping-list li .shoping-ui li {
  display: inline-block;
  width: 100px;
  height: 20px;
  margin-bottom: 3px;
}
.shoping-ui li a:hover {
  border-bottom: 1px solid #666666;
}
.first-server {
  font-size: 16px;
  color: #666666 !important;
}
.first-serve a {
  color: #000000 !important;
}
.black-footer {
  width: 100%;
  /* height: 175px; */
  background: #000000;
  border-top: 2px solid rgb(255, 0, 54);
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
  color: rgb(255, 255, 255);
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
  color: rgb(164, 164, 164);
}
.licence a:hover {
  border-bottom: 1px solid rgb(164, 164, 164);
}
.gongshang {
  margin-right: 40px;
}
.btn-p {
  padding-left: 20px;
}
.btn-p button {
  width: 25px;
  height: 30px;
  text-align: center;
  border: 1px solid #e0e0e0;
  background: #ffffff;
}
.btn-p input {
  height: 30px;
}
.add-cart {
  position: absolute;
  top: 0px;
  left: 200px;
  width: 170px;
  height: 44px;
  line-height: 44px;
}
.add-cart i {
  font-size: 20px;
}
.add-cart span {
  font-size: 16px;
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
.ant-progress-inner {
  border: 1px solid blue;
  background-color: #3189f5 !important;
}
.coupon-boxs {
  display: inline-block;
}
/* 药品说明 */
.goods-detal-text {
  display: block;
  width: 800px;
  height: auto;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
}
.tbody {
  width: 800px;
  height: 100%;
}
.goods-title {
  float: left;
  width: 100px;
}
.goods-text {
  float: right;
  width: 696px;
  min-height: 40px;
  height: auto;
  text-indent: 25px;
}
.probably {
  display: block;
  width: 800px;
  height: 170px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 17px 30px;
  background: #f7f7f7;
}
.probably p {
  height: 28px;
  line-height: 28px;
}
.title-left {
  float: left;
  width: 100px;
}
.title-right {
  float: right;
  width: 80px;
}
.right-text {
  float: right;
  margin-right: 200px;
}
.instructions {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #ed3025;
  font-size: 18px;
  font-weight: bold;
}
.ant-input-number-input{
  width: 75%!important;
}
</style>
