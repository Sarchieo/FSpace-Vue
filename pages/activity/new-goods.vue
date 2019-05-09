<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
         <div class="buying-text">
            <img src="../../assets/banner/new-brand.jpg" alt="">
         </div>
        <div class="limited-box">
          <!-- 活动文案=》未定 -->

          <!-- <div class="person-num">
             <div class="person-left">
                 商品累计拼团人数/折扣 描述方式待定
             </div>
             <div class="person-right">
                 距团购活动时间还剩    05 时 12 分 12  秒  <span>9</span>
             </div>
          </div>-->
          <div class="limited-goods">
            <div class="goods-box" v-for="(item,index) in newGoodsList" :key="index">
              <a-card hoverable class="card" @click="toDetails(item)">
                <img v-lazy="item.imgURl" alt class="goods-pic">
                <p class="goods-name">{{item.brandName}} {{ item.prodname }} {{item.spec}}</p>
                <p class="goods-surplus">{{item.manuName}}</p>
                <!-- <p class="goods-limit">{{item.least}}盒起拼, 还剩<span>{{item.most}}</span>盒</p> -->
                <p class="goods-price" v-if="item.vatp != -1">限时价￥{{item.vatp}}元</p>
                <p class="goods-price" v-else>￥认证后可见</p>
                <button @click="toDetails(item)">查看详情</button>
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
    }
  },
  data() {
    return {
      total: 0,
      currentIndex: 1,
      actcode: 0,
      tabStyle: {
        color: "#c40000",
        background: "black"
      },
      newGoodsList: [],
      keyword: ''
    };
  },
  mounted() {
    this.getNewGoods();
    this.actcode = this.$route.query.actcode;
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    toDetails(item) {
      this.$router.push({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu,
        }
      });
    },
    async getNewGoods() {
      let _this = this;
      _this.newGoodsList = []
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "newProdSearch";
      iRequest.param.pageIndex = this.currentIndex;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        keyword: this.keyword,
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.newGoodsList = result.data;
            _this.total = result.total;
            _this.currentIndex = result.pageNo
            _this.fsGeneralMethods.addImages(_this, _this.newGoodsList, 'sku', 'spu')
          }
        })
      );
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber;
      this.getNewGoods();
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
.card {
  .container-size(inline-block, 225px, 310px, 0px 0px, 0px);
}

.limited-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #f8f8f8;
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
  .container-size(inline-block, 225px, 310px, 10px 6px, 0px);
  .position(relative, 0px, 0px);
  background: #ffffff;
  button {
    .position(absolute, 265px, 5px);
    .button-size(215px, 40px, 40px, 14px, 0px, 5px);
    .button-color(1px solid transparent, #ed2f26, #ffffff);
  }
}
.goods-pic {
  .position(absolute, 0px, 10px);
  width: 206px;
  height: 132px;
}
.goods-name {
  .position(absolute, 187px, 0px);
  width: 100%;
  text-indent: 10px;
  font-size: 16px;
  padding-right: 10px;
   overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
}
.goods-adv {
  .position(absolute, 50px, 250px);
}
.goods-surplus {
  .position(absolute, 215px, 0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  padding-right: 10px;
  color: #999999;
   overflow: hidden;
 text-overflow:ellipsis;
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
  .position(absolute, 160px, 0px);
  width: 100%;
  text-indent: 10px;
  font-size: 16px;
  color: #ed2f26;
  del {
    color: #666666;
  }
}
.card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.ant-pagination {
  text-align: center;
}
.buying-text{
   .container-size(block, 100%, 463px, 0, 0px);
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
