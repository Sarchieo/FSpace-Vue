<template>
  <div>
    <a-layout>
      <f-space-header type="home" :searchList="searchList"></f-space-header>
      <!-- <p class="crumbs"> -->
      <a-breadcrumb class="crumbs">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>商品分类</a-breadcrumb-item>
      </a-breadcrumb>
      <!-- </p> -->
      <ul class="condition-box" ref="condition">
        <li class="brand-box brand-li" ref="list">
          <!-- <p class="brand-list" ref="list"> -->
          <div class="brand">品牌：</div>
          <div class="brand-lists" ref="brandLists">
            <a
              v-for="(item,index) in brandnameList"
              :key="index"
              ref="checkA"
              :class="item.isSelect ? 'active-checked' : '' "
              @click="selectBrand(item)"
            >{{item.name}}</a>
          </div>
          <div class="more-box">
            <!-- <a class="more">多选<a-icon type="plus" /></a>
            <a class="more-text" ref="moreText" v-if="this.brandnameList.length < 7">更多<a-icon type="down"/></a>
            <a class="retract" ref="retract">收起<a-icon type="down"/></a>-->
          </div>
        </li>
        <li class="brand-box manu-li" ref="manuList">
          <div class="brand">厂家：</div>
          <div class="brand-lists" ref="manulists">
            <a
              v-for="(item,index) in manunameList"
              :key="index"
              ref="checkB"
              :class="item.isSelect ? 'active-checked' : '' "
              @click="selectManuName(item)"
            >{{item.name}}</a>
          </div>
          <div class="more-box">
            <!-- <a class="more">多选<a-icon type="plus" /></a>
              <a class="more-text" ref="manuMore" v-if="this.manunameList.length < 7">更多<a-icon type="down"/></a>
            <a class="retract" ref="hideManu">收起<a-icon type="down"/></a>-->
          </div>
        </li>
        <li class="brand-box spec-li" ref="specList">
          <div class="brand">规格：</div>
          <div class="brand-lists" ref="specLists">
            <a
              v-for="(item,index) in specList"
              :key="index"
              ref="checkC"
              :class="item.isSelect ? 'active-checked' : '' "
              @click="selectSpec(item)"
            >{{item.name}}</a>
          </div>
          <div class="more-box">
            <!-- <a class="more">多选<a-icon type="plus" /></a>
            <a class="more-text" ref="specMore" v-if="this.specList.length < 7">更多<a-icon type="down"/></a>
            <a class="retract" ref="hideSpec">收起<a-icon type="down"/></a>-->
          </div>
        </li>
        <li class="sort-box">
          <!-- 选中的样式为 active-search -->
          <!-- <a href="javascript:;" @click="selectCompr()" :class="this.sortGoods === 0 ? 'active-search' : ''">综合 <a-icon type="arrow-down"/></a> -->
          <a
            href="javascript:;"
            @click="selectVolume()"
            :class="this.sortGoods === 1 ? 'active-search' : ''"
          >
            销量
            <a-icon type="arrow-down"/>
          </a>
          <!-- <a href="" class="padding-left5"> -->
          <a-select
            defaultValue="价格排序"
            style="width: 150px"
            @change="handleChange"
            :class="this.sortGoods === 2 || this.sortGoods === 3 ? 'active-search' : ''"
          >
            <a-select-option value="0">价格从高到低</a-select-option>
            <a-select-option value="1">价格从低到高</a-select-option>
          </a-select>
          <!-- </a> -->
          <!-- <a-checkbox v-model="isStock" @click="selectOnlyStock()" class="have-goods">只看有货</a-checkbox> -->
          <span class="goods-num">共{{searchList.length}}件商品</span>
        </li>
      </ul>
      <ul class="goods-list-box" v-show="!isGoods">
        <li v-for="(item,index) in searchList" :key="index" @click="toDetail(item)">
          <a-card hoverable class="card">
            <img class="card-img" v-lazy="item.imgURl" slot="cover">
            <img class="reduce-img" src="../assets/img/reduction.png" v-if="item.rulestatus === 1 || item.rulestatus === 2 || item.rulestatus === 4" alt="" slot="cover">
            <img class="reduce-img" src="../assets/img/gift.png" v-if="item.rulestatus === 8 || item.rulestatus === 16 || item.rulestatus === 32　||　item.rulestatus === 64" alt="" slot="cover">
            <p class="surplus text-Center top185">{{item.brandName}} {{ item.prodname }} {{ item.spec }}</p>
            <p class="validity">有效期至{{item.vaildedate}}</p>
              <p class="card-price top165" v-if="item.vatp != -1">
                  ￥{{item.vatp}}
                  <del>￥{{item.mp}}</del>
              </p>
             <p class="card-price top165" v-else>
               ￥认证后可见
            </p>
            <!-- 厂家 -->
            <p class="manufacturer hidden-text">{{item.manuName}}</p>
            <p class="sold">
              <span class="evaluate">中包装数量{{item.medpacknum}}{{item.unitName}}</span>
              <span class="sold-count">已售{{item.sales}}{{item.unitName}}</span>
            </p>
            <!-- 按钮 -->
            <p class="add-card" v-if="item.vatp != -1">
              <!-- <button>-</button>
              <button>{{count}}</button>
              <button>+</button> -->
              <button class="add-card-btn" @click.stop="addCart(item)">
                <a-icon type="shopping-cart"/>加入采购单
              </button>
            </p>
            <!-- 有无存货 -->
            <p class="goods-state">
              库存 {{item.store}}
              <span class="collect-box" @click.stop="addCollec(item)">
                <span>收藏</span>
                <!-- 选中收藏 后i标签class名为active-checked -->
                <a-icon type="star"></a-icon>
              </span>
            </p>
            <a-card-meta class="card-info" :title="item.text"></a-card-meta>
          </a-card>
        </li>

        <a-pagination v-model="current" :total="this.searchList.length" v-show="!isGoods"/>
      </ul>
      <!-- 如果搜索结果为空显示 -->
      <div v-show="isGoods" class="no-goods-box">
        <a-icon type="info-circle"/>
        <!-- <img src="../assets/img/nodata.png" /> -->
        <p class="no-goods">没有找到您想找的药品！</p>
      </div>
      <f-space-footer></f-space-footer>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../components/fspace-ui/header/header";
import FSpaceFooter from "../components/fspace-ui/footer";
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter
  },
  data() {
    return {
      sortGoods: 0,
      isSort: false, // 控制向上向下箭头显示
      isStock: false, // 只看有货
      specArray: [],
      manuArray: [],
      brandArray: [],
      brandnameList: [],
      manunameList: [],
      specList: [],
      searchList: [],
      current: 1,
      count: 1,
      pageNumber: 20,
      brandLists: [],
      isGoods: false,
      goodsType: ""
    };
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    },
    userStatus() {
      return this.$store.state.userStatus
    },
    keyword: {
      get() {
        return this.$store.state.keyword;
      },
      set(newValue) {
        this.$store.commit("KEY_WORD", newValue);
        return this.$store.state.keyword;
      }
    }
  },
  //  watch: {
  //   keyword(val) {
  //     this.fullTextsearchProdMall();
  //     this.getConditionByFullTextSearch();
  //   }
  // },
  mounted() {
    this.goodsType = this.$route.query.goodsType;
    this.keyword = this.$route.query.keyword || "";
    this.fullTextsearchProdMall();
    this.getConditionByFullTextSearch();
  },
  methods: {
    // 加入购物车
    addCart(item) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "saveShopCart";
      iRequest.param.json = JSON.stringify({
        pdno: item.sku,
        pnum: 1,
        checked: 0,
        compid: _this.storeInfo.comp.storeId
      })
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" + Math.floor(_this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
              if (result.code === 200) {
                  _this.$message.success(result.message);
              }
          })
        );
    },
    // 收藏
    addCollec(item) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyCollectModule";
      iRequest.method = "add";
      iRequest.param.json = JSON.stringify({
        sku: item.sku,
        prize: item.vatp,
        promtype: 0
      })
      // 促销类型未传，暂定0，促销完善补上
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" + Math.floor(this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.$message.success(result.message);
          }
        })
      );
    },
    // 药品厂商规格品牌
    getConditionByFullTextSearch() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getConditionByFullTextSearch";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        keyword: this.keyword || '',
        spu: Number(_this.goodsType || 0)
      });
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.brandnameList = [];
              _this.manunameList = [];
              _this.specList = [];
              _this.conditionList = result.data;
              result.data.brandnameList.forEach(element => {
                _this.brandnameList.push({
                  name: element,
                  val: element,
                  isSelect: false
                });
              });
              result.data.manunameList.forEach(element => {
                _this.manunameList.push({
                  name: element,
                  val: element,
                  isSelect: false
                });
              });

              result.data.specList.forEach(element => {
                _this.specList.push({
                  name: element,
                  val: element,
                  isSelect: false
                });
              });
            }
          }
        )
      );
    },
    // 搜索结果商品列表
    fullTextsearchProdMall() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "fullTextsearchProdMall";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        // 从侧边栏进入此页面keyword要为空字符串
        keyword: _this.keyword,
        specArray: _this.specArray,
        manuArray: _this.manuArray,
        brandArray: _this.brandArray,
        spu: Number(_this.goodsType || 0),
        // spu: 1000,
        sort: _this.sortGoods
      });

      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.searchList = result.data;
              
              _this.fsGeneralMethods.addImages(_this,_this.searchList, 'sku', 'spu' );

              if (_this.searchList.length === 0 || _this.searchList === null) {
                _this.isGoods = true;
              } else {
                _this.isGoods = false;
              }
            }
          },
          
        )
      );
    },
    // 综合排序
    selectCompr() {
      this.sortGoods = 0;
      this.fullTextsearchProdMall();
    },
    // 销量排序
    selectVolume() {
      this.sortGoods = 1;
      this.fullTextsearchProdMall();
    },
    // 价格排序
    handleChange(value) {
      if (value === "0") {
        this.sortGoods = 2;
      } else {
        this.sortGoods = 3;
      }
      this.fullTextsearchProdMall();
    },
    // 只看有货
    selectOnlyStock() {},
    toDetail(item) {
      this.$router.push({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu
        }
      });
    },
    selectBrand(item) {
      item.isSelect = !item.isSelect;
      if (item.isSelect) {
        this.brandArray.push({
          val: item.val
        });
      } else {
        this.brandArray =
          this.removeArray(this.brandArray, { val: item.val }) || [];
      }
      this.fullTextsearchProdMall();
    },
    selectManuName(item) {
      item.isSelect = !item.isSelect;
      if (item.isSelect) {
        this.manuArray.push({
          val: item.val
        });
      } else {
        this.manuArray =
          this.removeArray(this.manuArray, { val: item.val }) || [];
      }
      this.fullTextsearchProdMall();
    },
    selectSpec(item) {
      item.isSelect = !item.isSelect;
      if (item.isSelect) {
        this.specArray.push({
          val: item.val
        });
      } else {
        this.specArray =
          this.removeArray(this.specArray, { val: item.val }) || [];
      }
      this.fullTextsearchProdMall();
    },
    removeArray(_arr, _obj) {
      let length = _arr.length;
      for (let i = 0; i < length; i++) {
        if (_arr[i] === _obj) {
          if (i === 0) {
            _arr.shift(); //删除并返回数组的第一个元素
            return _arr;
          } else if (i === length - 1) {
            _arr.pop(); //删除并返回数组的最后一个元素
            return _arr;
          } else {
            _arr.splice(i, 1); //删除下标为i的元素
            return _arr;
          }
        }
      }
      console.log(";;;;;;--- rrrr" + _arr);
    }
  }
};
</script>
<style scoped lang="less">
@import "../components/fspace-ui/container/index.less";
@import "../components/fspace-ui/button/index.less";
/* 初始化 */
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
.ant-breadcrumb {
  line-height: 23px !important;
}
.hidden-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ant-pagination {
  text-align: center;
}
.retract {
  display: none;
}
.padding-left5 {
  padding-left: 5px;
}
.have-goods {
  margin-left: 30px;
}
.sort-box a:hover {
  border: 1px solid #ed3025;
  color: #ed3025;
}
.sort-box {
  .container-size(block, 1130px, 50px, 0, 0px);
  line-height: 50px;
  a {
    .container-size(inline-block, 70px, 30px, 0 20px 0 0, 0px);
    line-height: 30px;
    text-align: center;
    border: 1px solid #e0e0e0;
    color: #666666;
    .price-up {
      .position(relative, -6px, 8px);
    }
    .price-down {
      .position(relative, 6px, -6px);
    }
  }
  .goods-num {
    float: right;
    margin-right: 3px;
  }
}
.brand-li,
.manu-li,
.spec-li {
  width: 100px;
  height: 100px;
  transition: height 0.5s;
  -moz-transition: height 0.5s; /* Firefox 4 */
  -webkit-transition: height 0.5s; /* Safari and Chrome */
  -o-transition: height 0.5s; /* Opera */
}
.no-goods-box i {
  display: block;
  margin: 0 auto;
  font-size: 50px;
}
.no-goods {
  .p-size(40px, 40px, 20px, center, 0px, #333333);
  margin-bottom: 15px;
  margin-top: 15px;
}
.ant-pagination {
  margin-left: 5px;
  margin-top: 15px;
}
.active-search {
  border: 1px solid #ed3025 !important;
  color: #ed3025 !important;
}
.active-checked {
  // background:#ed3025;
  color: #ed3025;
}
.more-text:hover.brand-box {
  height: 120px;
}
.brand-box {
  .container-size(block, 1130px, 40px, 0, 0px);
  transition: all height 2s;
  -moz-transition: all height 2s; /* Firefox 4 */
  -webkit-transition: all height 2s; /* Safari and Chrome */
  -o-transition: all height 2s; /* Opera */
  overflow: hidden;
  border-bottom: 1px solid #e0e0e0;
  .brand {
    float: left;
    .container-size(inline-block, 60px, 40px, 0, 0px);
    line-height: 40px;
  }
  .more-box {
    float: right;
    .container-size(inline-block, 110px, 40px, 0, 0px);
    a {
      height: 40px;
      line-height: 40px;
      margin-left: 10px;
    }
  }
  .brand-lists {
    float: left;
    .container-size(inline-block, 940px, 100%, 0, 0px);
    overflow: hidden;
  }
}
// 筛选条件
.crumbs {
  width: 1190px;
  margin: 0 auto;
  padding-top: 12px;
  .p-size(45px, 45px, 14px, left, 30px, #666666);
}
.condition-box {
  .container-size(block, 1190px, 190px, 0 auto 15px auto, 0px);
  padding: 20px 30px 0 30px;
  background: #ffffff;
}
.collapse {
  display: inline-block;
  width: 40px;
  height: 20px;
}
// 商品分类展示
.goods-list-box {
  .container-size(block, 1202px, auto, 0 auto, 0px);
  margin-bottom: 20px;
}
.brand-list {
  display: inline-block;
  .p-size(40px, 40px, 14px, left, 0px, #666666);
}
.brand-lists {
  display: none;
  width: 1150px;
  .p-size(200px, 40px, 14px, left, 0px, #666666);
  overflow: auto;
}
.brand-list a,
.brand-lists a {
  float: left;
  .container-size(inline-block, 110px, auto, 0, 5px);
  // margin-left: 10px;
  text-align: center;
}
.brand-lists a:hover {
  // background:#ed3025;
  color: #ed3025;
}
.brand-list a:hover {
  // background:#ed3025;
  color: #ed3025;
}
.brand-list span,
.brand-lists span {
  float: left;
  width: 110px;
  text-align: center;
}
.goods-list-box li {
  .container-size(inline-block, 228px, 310px, 6.5px 6.2px, 0px);
  .container-color(#ffffff, none, #999);
}
.goods-pic {
  .container-size(inline-block, 228px, 280px, 0px, 0px);
}
.goods-pic img {
  .container-size(inline-block, 135px, 123px, 20px 0px 5px 46px, 0px);
}
.ant-card-body {
  padding: 0px !important;
}
.card {
  .position(relative, 0px, 0px);
  .container-size(inline-block, 226px, 310px, 0px, 0px);
  border: 1px solid #ffffff;
}
.card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.card:hover .card-price {
  top: 180px;
}
.card:hover .specifications {
  display: none;
}
.card:hover .manufacturer {
  display: none;
}
.card:hover .sold {
  display: none;
}
.card:hover .add-card {
  display: inline-block;
}
.card:hover .goods-state {
  display: inline-block;
}
.card:hover .surplus {
  top: 210px;
}
.surplus {
  .position(absolute, 210px, 0px);
  width: 225px;
  text-align: left;
  text-indent: 20px;
  color: #333333;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.card-img {
  .position(absolute, 15px, 45px);
  width: 135px;
  height: 123px;
}
.reduce-img{
  .position(absolute, 0px, 10px);
  width: 35px;
  height: 45px;
}
.card-progress {
  .position(absolute, 0px, 0px);
}
.card-info {
  .position(absolute, 195px, 0px);
  .container-size(inline-block, 0px, 0px, 0px, 0px);
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
}
.card-price {
  .position(absolute, 180px, 0px);
  width: 225px;
  text-align: left;
  text-indent: 17px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(255, 0, 54);
  del {
    font-size: 14px !important;
    font-weight: normal;
  }
}
.card-price del {
  color: #999999;
}
.validity {
  .position(absolute, 149px, 0px);
  .p-size(20px, 20px, 14px, center, 0px, #666666);
  width: 226px;
  background: #f8f8f8;
}
.sold {
  display: inline-block;
  width: 225px;
  height: 40px;
  line-height: 40px;
  .position(absolute, 268px, 0px);
  border-top: 1px solid #e0e0e0;
  padding: 0px 5px;
}
.sold .evaluate {
  float: left;
}
.sold .sold-count {
  float: right;
}
.manufacturer {
  display: inline-block;
  .position(absolute, 240px, 0px);
  width: 225px;
  text-align: left;
  text-indent: 20px;
}
.specifications {
  display: inline-block;
  .position(absolute, 218px, 0px);
  width: 225px;
  text-align: left;
  text-indent: 20px;
}

.add-card {
  display: none;
  .position(absolute, 275px, 0px);
  width: 225px;
  text-indent: 10px;
  .add-card-btn {
    float: right;
    height: 28px;
    border: none;
    border-radius: 2px;
    margin-right: 10px;
    background: rgb(255, 0, 54);
    color: #ffffff;
  }
  .add-card-btn:hover {
    cursor: pointer;
  }
}
.goods-state {
  display: none;
  width: 225px;
  .position(absolute, 235px, 0px);
  text-indent: 20px;
  i {
    float: right;
    width: 20px;
    margin-right: 0px;
  }
  span {
    float: right;
    height: 20px;
    margin-right: 11px;
    line-height: 13px;
  }
}
.more {
  float: right;
}
.collect-box:hover{
  color: rgb(255, 0, 54);
}
</style>
