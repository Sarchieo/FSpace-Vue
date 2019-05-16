<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
         <div class="buying-text">
            <!-- <img src="../../assets/banner/hot.jpg" alt=""> -->
         </div>
        <div class="limited-box">
          <div class="limited-goods">
             <p class="search-p">
              <input v-model="keyword" type="text" placeholder="在结果中搜索">
              <button @click="getHotGoods()">搜索</button>
            </p>
              <div class="goods-box" v-for="(item,index) in hotGoodsList" :key="index">
                <a-card hoverable class="card" @click="toDetail(item)">
                  <img v-lazy="item.imgURl" class="goods-pic">
                  <p class="goods-name">{{item.brandName}} {{ item.prodname }} {{item.spec}}</p>
                  <p class="goods-surplus">{{item.manuName}} </p>
                  <p class="goods-limit">还剩<span>{{item.store}}</span>盒</p>
                  <p class="goods-price" v-if="item.vatp != -1">单价￥{{item.vatp}}元 </p>
                  <p class="goods-price" v-else>￥认证后可见 </p>
                  <p class="button-p">
                    <button class="add-small" @click.stop="add()">+</button>
                    <a-input
                    v-model="goodsNum"
                    readonly="true"
                  />
                    <button class="reduct-small" @click.stop="reduce()">-</button>
                    <a-button class="add">加入采购单</a-button>
                  </p>
                  <!-- <button @click="toDetail(item)">查看详情</button> -->
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
    }
  },
  data() {
    return {
      goodsNum: 1,
      total: 0,
      currentIndex: 1,
      current: 1,
      actcode: 0,
      hotGoodsList: [],
      tabStyle: {
          color: '#c40000',
          background: 'black'
      },
      keyword: ''
    }
  },
  mounted() {
    this.getHotGoods();
    this.actcode = this.$route.query.actcode
  },
  methods: {
     // 热销商品列表
    async getHotGoods() {
      let _this = this;
      this.hotGoodsList = []
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "hotProdSearch";
      iRequest.param.pageIndex = this.currentIndex
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        keyword: this.keyword,
        actcode: this.actcode
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.hotGoodsList = result.data
            _this.total = result.total
            _this.currentIndex = result.pageNo
            _this.fsGeneralMethods.addImages(_this, _this.hotGoodsList, 'sku', 'spu')
          }
        })
      );
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber
      this.getHotGoods();
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
    add() {
      this.goodsNum += 1
    },
    reduce() {
      if(this.goodsNum === 1){
        return
      }
      this.goodsNum -= 1
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
  .p-size(60px, 60px, 14px, left, 8px, #666666);
  padding-top: 10px;
  background: #f8f8f8!important;
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
.person-num{
    .container-size(block,1190px,86px,0 auto,0px) ;
    line-height: 86px;
    background: #333333;
    font-size: 18px;
    color: #ffffff;
    .person-left{
        float: left;
        .container-size(inline-block,500px,86px,0 auto,0px) ;
        text-indent: 60px;
    }
    .person-right{
        float: right;
        .container-size(inline-block,500px,86px,0 auto,0px) ;
    }
}
.card{
   .container-size(inline-block, 225px, 310px, 0px 0px, 0px);
}
.buying-text{
   .container-size(block, 100%, 463px, 0, 0px);
   background: url('../../assets/banner/hot.jpg') no-repeat top center;
   margin-bottom: 20px;
  img{
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
    .position(relative,0px,0px);
    background: #ffffff;
}
.goods-pic {
   .position(absolute,15px,45px);
   width: 135px;
   height: 123px;
}
.button-p{
   .position(absolute,265px,0px);
  .p-size(40px, 40px, 14px, left, 8px, #666666);
   width: 100%;
  padding-left: 5px;
  input{
    float: left;
    height: 34px;
    width: 50px!important;
    border-radius: 0px!important;
    margin-top: 3px;
    border: 1px solid #e0e0e0;
  }
  .add{
    float: right;
    margin-right: 5px;
    margin-left: 5px;
    .button-size( 95px,35px,35px,14px,0px,3px);
    .button-color(1px solid transparent,#ED2F26,#ffffff);
    
  }
  .add-small, .reduct-small{
    float: left;
    width: 30px;
    height: 34px;
    line-height: 35px;
    margin-top: 3px;
    border: 1px solid #e0e0e0;
    background: #ffffff;
  }
}
.goods-name {
  .position(absolute,183px,0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.goods-adv {
  .position(absolute,50px,250px);
}
.goods-surplus {
  .position(absolute,215px,0px);
  width: 100%;
  text-indent: 10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #999999;
}
.goods-limit{
  .position(absolute,235px,0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  color: #999999;
  span{
    color: #ED2F26;
  }
}
.goods-price {
  .position(absolute,160px,0px);
  width: 100%;
   text-indent: 10px;
  font-size: 16px;
  color: #ED2F26;
  del {
      color: #666666;
  }
}
.card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.one-day{
  .p-size(115px,115px,30px,center,0px,#333333);
  font-weight: bold;
}
.margin-bottom30{
  margin-bottom: 30px;
}
.ant-pagination{
  text-align: center;
}
</style>
