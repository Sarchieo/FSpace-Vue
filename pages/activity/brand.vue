<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="buying-text">
        </div>
        <div class="limited-box">
          <div class="search-div">
            <span class="bland-list" @click="selectBrand(item)" v-for="(item,index) in brands" :key="index">{{item.brandname}}</span>
            <div style="clear:both;"></div>
          </div>
          <div class="limited-goods">
            <div class="goods-box" v-for="(item,index) in brandList" :key="index">
              <a-card hoverable class="card" @click="toDetails(item)">
                <span class="collec" @click.stop="addCollec(item)">
                  收藏
                  <a-icon type="star"/>
                </span>
                <img v-lazy="item.imgURl" :key="item.imgURl" alt class="goods-pic">
                <p class="validity">有效期{{item.vaildedate}}</p>
                <p class="goods-name">{{item.brandName}} {{ item.prodname }} {{item.spec}}</p>
                <p class="goods-surplus">{{item.manuName}}</p>
                <!-- <p class="goods-limit">{{item.least}}盒起拼, 还剩<span>{{item.most}}</span>盒</p> -->
                <p class="goods-price" v-if="item.vatp != -1">
                  <span>￥{{item.vatp}}元</span>
                  <del>原价￥{{item.rrp}}元</del>
                </p>
                <p class="goods-price" v-else>￥认证后可见</p>
                <p class="package">
                  <span class="float-left">中包装{{item.medpacknum}}{{item.unitName}}</span>
                  <span class="float-right">已售{{item.sales}}{{item.unitName}}</span>
                </p>
                <p class="limit">
                  <!-- v-if="item.limits !== 0" -->
                  <span>限购{{item.limits}} {{item.unitName}}</span>
                  <span class="float-right">库存{{item.store}} {{item.unitName}}</span>
                </p>
                <p class="p-btn">
                  <button class="small-btn" @click.stop="reduceCount(item)">-</button>
                  <input type="number" v-model="item.pnum" @click.stop="">
                  <button class="small-btn" @click.stop="addCount(item)">+</button>
                  <button class="add-cart" @click.stop="addCart(item)">加入采购单</button>
                </p>
              </a-card>
            </div>
            <a-pagination :total="total" @change="onChangePage"/>
          </div>
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceFooter from "../../components/fspace-ui/footer";
export default {
  components: {
    FSpaceHeader,
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
      brands: [],
      count: 1,
      total: 0,
      currentIndex: 1,
      actcode: 0,
      current: 1,
      tabStyle: {
        color: "#c40000",
        background: "black"
      },
      brandList: [],
      keyword: "",
      brandno: ''
    };
  },
  mounted() {
    this.getBrands();
    this.getBrandList();
    this.actcode = this.$route.query.actcode;
  },
  methods: {
    // 加入采购单
    addCart(item) {
      this.fsGeneralMethods.addShoppingCart(this, item, item.pnum);
    },
    // 新增商品数量
    addCount(item) {
      item.pnum += item.medpacknum
    },
    reduceCount(item) {
      item.pnum > item.medpacknum ? item.pnum - item.medpacknum : item.pnum
    },
    selectBrand(item) {
      this.brandno = item.brandno
      this.getBrandList();
    },
    // 加入收藏
    addCollec(item) {
      this.fsGeneralMethods
        .request(this, "orderServer", "MyCollectModule", "add", {
          sku: item.sku,
          prize: item.vatp,
          promtype: 0
        })
        .then(result => {
          if (result.code == 200) {
            this.$message.success(result.message);
          }
        });
    },
    toDetails(item) {
      this.$router.push({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu
        }
      });
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber;
      this.getBrandList();
    },
    // 获取品牌列表
    getBrands() {
      this.fsGeneralMethods
        .request(this, 'goodsServer', 'ProdExtModule', 'queryBrandInfo')
        .then(result => {
          if (result.code == 200) {
            this.brands = result.data
            this.brands.forEach(item => {
              this.$set(item, 'isChecked', false)
            })
          }
        });
    },
    getBrandList() {
      this.fsGeneralMethods
      .request(this, 'goodsServer', 'ProdModule', 'brandMallSearch', {
        keyword: this.keyword,
        brandno: this.brandno,
        pageIndex: this.currentIndex,
        pageNumber: 10
      })
      .then(result => {
        if (result.code == 200) {
          
          this.brandList = result.data;
          this.brandList.forEach((item,index) => {
            item.medpacknum = item.medpacknum ? item.medpacknum : 1
            this.$set(item, 'pnum', item.medpacknum)
          });
          this.total = result.total;
          this.currentIndex = result.pageNo;
          this.fsGeneralMethods.addImages(
            this,
            this.brandList,
            "sku",
            "spu"
          );
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.ant-layout-content {
  background: #f8f8f8;
}
.person-num {
  .container-size(block, 1190px, 86px, 0 auto, 0px);
  line-height: 86px;
  background: #333333;
  font-size: 18px;
  color: #ffffff;
  .person-left {
    float: left;
    .container-size(inline-block, 500px, 86px, 0 auto, 0px);
    text-indent: 60px;
  }
  .person-right {
    float: right;
    .container-size(inline-block, 500px, 86px, 0 auto, 0px);
  }
}
.bland-list {
  float: left;
  padding: 10px 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  background: #e0e0e0;
  color: #333;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}
.bland-list:hover {
  cursor: pointer;
}
.card {
  .container-size(inline-block, 225px, 310px, 0px 0px, 0px);
}
.buying-text {
  .container-size(block, 1190px, 200px, 0 auto, 0px);
  background: #e0e0e0;
  background: url("../../assets/banner/brands.jpg") no-repeat top center;
  p {
    .p-size(100px, 100px, 28px, center, 0px, #333333);
    font-weight: bold;
  }
}
.limited-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #f8f8f8;
}
.limited-goods {
  .container-size(block, 1210px, auto, 0 auto, 0px);
  min-height: 400px;
  margin-bottom: 20px;
  background: #f8f8f8;
}
.tab-pane {
  width: 270px;
  height: auto;
}
.goods-box {
  .container-size(inline-block, 225px, 310px, 0px 16.3px 16px 0px, 0px);
  .position(relative, 0px, 0px);
  background: #ffffff;
}
.goods-pic {
  .position(absolute, 10px, 45px);
  width: 135px;
  height: 123px;
}
.goods-name {
  .position(absolute, 205px, 0px);
  width: 100%;
  text-indent: 12px;
  font-size: 14px;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-adv {
  .position(absolute, 50px, 250px);
}
.goods-surplus {
  .position(absolute, 230px, 0px);
  width: 100%;
  text-indent: 12px;
  font-size: 14px;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-limit {
  .position(absolute, 235px, 0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  color: #999999;
  span {
    color: #ed2f26;
  }
}
.goods-price {
  .position(absolute, 180px, 0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  color: #ed2f26;
  span{
    font-weight: bold;
  }
  del {
    color: #666666;
  }
}
.card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.card:hover .package {
  display: none;
}
.card:hover .goods-surplus {
  display: none;
}
.ant-pagination {
  text-align: center;
}
.validity {
  .position(absolute, 143px, 0px);
  height: 30px;
  line-height: 30px;
  width: 100%;
  padding: 0 10px;
  background: #f8f8f8;
  text-align: center;
}
.package {
  .position(absolute, 278px, 0px);
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #e0e0e0;
  padding: 0 10px;
  color: #999999;
}
.search-div {
  .container-size(block, 1190px, auto, 0, 5px);
  min-height: 80px;
  padding: 10px 10px 5px 10px;
  margin: 15px 0px;
  // border: 1px solid #e0e0e0;
  // box-shadow: 0px 0px 30px 0px #e0e0e0;
  input {
    width: 200px;
    height: 30px;
    border: 1px solid #e0e0e0;
    text-indent: 10px;
    margin-right: 10px;
  }
  button {
    .button-size(120px, 30px, 30px, 14px, 0px, 5px);
    .button-color(1px solid transparent, #ff0036, #ffffff);
  }
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.limit {
  display: none;
  .position(absolute, 225px, 0px);
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  color: #999999;
}
.card:hover .limit {
  display: block;
}
.p-btn {
  display: none;
  .position(absolute, 270px, 0px);
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  color: #999999;
  input {
    width: 45px;
    height: 33px;
    border: 1px solid #e0e0e0;
    text-align: center;
  }
  .small-btn {
    .button-size(30px, 34px, 20px, 14px, 0px, 0px);
    border: 1px solid #e0e0e0;
    background: #ffffff;
  }
  .add-cart {
    float: right;
    .button-size(80px, 34px, 20px, 14px, 0px, 2px);
    .button-color(1px solid transparent, #ff0036, #ffffff);
  }
}
.card:hover .p-btn {
  display: block;
}
.collec {
  display: none;
  .position(absolute, 10px, 170px);
  color: #999999;
  z-index: 99;
}
.card:hover .collec {
  display: block;
}
.buying-text {
  .container-size(block, 100%, 463px, 0, 0px);
  img {
    width: 100%;
    height: 100%;
  }
}
</style>