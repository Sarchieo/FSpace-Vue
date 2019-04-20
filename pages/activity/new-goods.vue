<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="limited-box">
          <!-- 活动文案=》未定 -->
         <div class="buying-text">
             <p>优选新品</p>
             <p>优选新品</p>
         </div>
         <!-- <div class="person-num">
             <div class="person-left">
                 商品累计拼团人数/折扣 描述方式待定
             </div>
             <div class="person-right">
                 距团购活动时间还剩    05 时 12 分 12  秒  <span>9</span>
             </div>
         </div> -->
          <div class="limited-goods">
              <div class="goods-box" v-for="(item,index) in newGoodsList" :key="index">
                <a-card hoverable class="card" @click="toDetail(item)">
                  <img v-lazy="item.src" alt="" class="goods-pic">
                  <p class="goods-name">{{item.name}} {{item.advantage}}</p>
                  <p class="goods-surplus">{{item.menu}}</p>
                  <p class="goods-limit">{{item.least}}盒起拼, 还剩<span>{{item.most}}</span>盒</p>
                  <p class="goods-price">限时价￥{{item.new}}元 <del>原价￥{{item.old}}元</del></p>
                  <button @click="toDetails()">查看详情</button>
                </a-card>  
              </div>
              <a-pagination v-model="current" :total="this.newGoodsList.length" v-if="this.newGoodsList.length !== 0 "/>
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
  data() {
    return {
        current: 1,
        actcode: 0,
        tabStyle: {
            color: '#c40000',
            background: 'black'
        },
    }
  },
  mounted() {
    this.getNewGoods();
    this.actcode = this.$route.query.actcode;
  },
  methods: {
      callback(key) {
          console.log(key)
      },
      toDetails() {
          this.$router.push({
               path:'/product/detail'
          })
      },
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
            _this.newGoodsList = result.data.slice(0, 6);
            _this.newGoodsID = result.data.actcode
            _this.getImgUrl(_this.newGoodsList);
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.ant-layout-content {
  background: #f2f2f2;
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
    .container-size(block,1190px,200px,0 auto,0px) ;
    background: #e0e0e0;
    p{
        .p-size(100px,100px,28px,center,0px,#333333);
        font-weight: bold;
    }
}
.limited-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #f2f2f2;
}
.limited-goods {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  min-height: 400px;
  margin-bottom: 20px;
  background: #f2f2f2;
}
.tab-pane {
    width: 270px;
    height: auto;
}
.goods-box {
    .container-size(inline-block, 225px, 310px, 10px 6px, 0px);
    .position(relative,0px,0px);
    background: #ffffff;
    button {
        .position(absolute,265px,5px);
        .button-size(215px,40px,40px,14px,0px,5px);
        .button-color(1px solid transparent,#ED2F26,#ffffff);
    }
}
.goods-pic {
   .position(absolute,0px,10px);
   width: 206px;
   height: 132px;
}
.goods-name {
  .position(absolute,187px,0px);
  width: 100%;
   text-indent: 10px;
  font-size: 16px;
}
.goods-adv {
  .position(absolute,50px,250px);
}
.goods-surplus {
  .position(absolute,215px,0px);
  width: 100%;
  text-indent: 10px;
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
.ant-pagination{
  text-align: center;
}
</style>