<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="buying-text">
          </div>
        <div class="limited-box">
          
          <div class="limited-goods">
            <p class="search-p">
              <input v-model="keyword" type="text" placeholder="在结果中搜索">
              <button @click="getSelects()">搜索</button>
            </p>
            <div class="goods-box" v-for="(item,index) in selectedList" :key="index">
              <a-card hoverable class="card" @click="toDetails(item)">
                 <span class="collec" @click.stop="addCollec(item)">
                  收藏
                  <a-icon type="star"/>
                </span>
                <img v-lazy="item.imgURl" class="goods-pic">
                <p class="validity">有效期{{item.vaildedate}}</p>
                <p class="goods-name">{{item.brandName}} {{ item.prodname }} {{item.spec}}</p>
                <p class="goods-surplus">{{item.manuName}}</p>
                <p class="goods-limit">
                  <span>限购{{item.limits}} {{item.unitName}}</span>
                  <span class="float-right margin-right10">库存{{item.store}}{{item.unitName}}</span>
                  
                </p>
                <p class="goods-price" v-if="item.vatp != -1">
                  ￥{{item.vatp}}元
                  <del>原价￥{{item.rrp}}元</del>
                </p>
                <p class="goods-price" v-else>￥认证后可见</p>
                <p class="package">中包装{{item.medpacknum}}{{item.unitName}} <span class="float-right">已售{{item.sales}}{{item.unitName}}</span></p>
                <p class="button-p">
                  <button class="add-small" @click.stop="addCount(item)">+</button>
                  <input type="number" v-model="item.pnum" @click.stop="">
                  <button class="reduct-small" @click.stop="reduceCount(item)">-</button>
                  <a-button class="add" @click.stop="addCart(item)">加入采购单</a-button>
                </p>
              </a-card>
            </div>
            <a-pagination
              :total="total"
              @change="onChangePage"
            />
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
      count: 1,
      total: 0,
      currentIndex: 1,
      actcode: 0,
      current: 1,
      tabStyle: {
        color: "#c40000",
        background: "black"
      },
      selectedList: [],
      keyword: ''
    };
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    },
    userStatus() {
      return this.$store.state.userStatus
    }
  },
  mounted() {
    this.getSelects();
    this.actcode = this.$route.query.actcode;
  },
  methods: {
    toDetails(item) {
      this.$router.push({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu,
        }
      });
    },
     // 加入购物车
    addCart(item) {
      this.fsGeneralMethods.addShoppingCart(this, item, item.pnum)
    },
    // 新增商品数量
    addCount(item) {
      debugger
      item.pnum += 1
    },
    reduceCount(item) {
      item.pnum > 1 ? item.pnum -- : item.pnum
    },
    // 为你精选数据
    getSelects() {
       this.fsGeneralMethods
          .request(this, "goodsServer", "ProdModule", "chooseForYouSearch", {
            keyword: this.keyword
          })
          .then(result => {
            if (result.code === 200) {
              this.selectedList = result.data;
              this.selectedList.forEach(item => {
              this.$set(item, "pnum", 1);
            });
              this.total = result.total;
              this.currentIndex = result.pageNo
              this.fsGeneralMethods.addImages(this, this.selectedList, 'sku', 'spu')
            }
          });
    },
    addCollec(item) {
      this.fsGeneralMethods
        .request(this, "orderServer", "MyCollectModule", "add", {
          sku: item.sku,
          prize: item.vatp,
          promtype: 0
        })
        .then(result => {
          if (result.code === 200) {
            this.$message.success(result.message);
          }
        });
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber;
      this.getSelects();
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
.search-p {
  .p-size(60px, 60px, 14px, left, 0px, #666666);
  padding-top: 10px;
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
.card:hover .button-p {
  display: block;
}
.card:hover .package{
  display: none;
}
.card:hover .goods-surplus{
  display: none;
}
.card:hover .goods-limit{
  display: block;
}
.float-right{
  float: right;
}
.margin-right10{
  margin-right: 10px;
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
.card {
  .container-size(inline-block, 225px, 310px, 0px 0px, 0px);
}
.buying-text {
  .container-size(block, 100%, 463px, 0, 0px);
  background: url("../../assets/banner/selected.png") no-repeat top center;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
.limited-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #ffffff;
}
.limited-goods {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  min-height: 400px;
  margin-bottom: 20px;
  background: #f8f8f8;
}
.tab-pane {
  width: 270px;
  height: auto;
}
.goods-box {
  .container-size(inline-block, 225px, 310px, 10px 6.5px, 0px);
  .position(relative, 0px, 0px);
  background: #ffffff;
}
.goods-pic {
  .position(absolute, 15px, 45px);
  width: 135px;
  height: 123px;
}
.button-p {
  display: none;
  .position(absolute, 265px, 0px);
  .p-size(40px, 40px, 14px, left, 8px, #666666);
  width: 100%;
  padding-left: 5px;
  input {
    float: left;
    height: 34px;
    width: 50px !important;
    text-align: center;
    border-radius: 0px !important;
    margin-top: 3px;
    border: 1px solid #e0e0e0;
  }
  .add {
    float: right;
    margin: 2px 5px 0px 5px;
    .button-size(95px, 34px, 34px, 14px, 0px, 3px);
    .button-color(1px solid transparent, #ed2f26, #ffffff);
  }
  .add-small,
  .reduct-small {
    float: left;
    width: 30px;
    height: 34px;
    line-height: 35px;
    margin-top: 3px;
    border: 1px solid #e0e0e0;
    background: #ffffff;
  }
}
.package {
  display: block;
  .position(absolute, 278px, 0px);
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-indent: 10px;
  border-top: 1px solid #e0e0e0;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  span{
    margin-right: 10px;
  }
}
.goods-name {
  .position(absolute, 205px, 0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-adv {
  .position(absolute, 50px, 250px);
}
.goods-surplus {
  display: block;
  .position(absolute, 230px, 0px);
  width: 100%;
  text-indent: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #999999;
}
.goods-limit {
  display: none;
  .position(absolute, 230px, 0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  color: #999999;
}
.goods-price {
  .position(absolute, 180px, 0px);
  width: 100%;
  text-indent: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #ed2f26;
  del {
    font-weight: normal;
    color: #666666;
  }
}
.card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.one-day {
  .p-size(115px, 115px, 30px, center, 0px, #333333);
  font-weight: bold;
}
.margin-bottom30 {
  margin-bottom: 30px;
}
.ant-pagination {
  text-align: center;
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
</style>