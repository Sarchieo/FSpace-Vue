<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="limited-box">
          <!-- 活动文案=》未定 -->
         <div class="buying-text">
             <p>包邮专区</p>
             <p></p>
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
              <p class="search-p"><input type="text" placeholder="在结果中搜索"><button>搜索</button></p>
              <div class="goods-box" v-for="(item,index) in postList" :key="index">
                <a-card hoverable class="card" @click="toDetails(item)">
                  <span class="collec">收藏 <a-icon type="star"/></span>
                  <img v-lazy="item.src" alt="" class="goods-pic">
                  <p class="validity">有效期{{item.vaildsdate}}-{{item.vaildedate}}</p>
                  <p class="goods-name">{{item.prodname}}{{item.spec}}</p>
                  <p class="goods-surplus">{{item.manuName}}</p>
                  <!-- <p class="goods-limit">{{item.least}}盒起拼, 还剩<span>{{item.most}}</span>盒</p> -->
                  <p class="goods-price">￥{{item.vatp}}元 <del>原价￥{{item.rrp}}元</del></p>
                  <p class="package"><span class="float-left">中包装{{item.medpacknum}}{{item.unitName}}</span> <span class="float-right">已售{{item.buynum}}{{item.unitName}}</span></p>
                  <p class="limit"><span>限购{{item.limits}} {{item.unitName}}</span> <span class="float-right">库存{{item.surplusstock}} {{item.unitName}}</span></p>
                  <p class="p-btn"><button class="small-btn">-</button><input type="text" v-model="count" readonly="readonly"><button class="small-btn">+</button> <button class="add-cart">加入采购单</button></p>
                  <!-- <button @click="toDetails()">查看详情</button> -->
                </a-card>  
              </div>
              <a-pagination :total="total" v-if="this.postList.length !== 0 " @change="onChangePage"/>
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
      count: 1,
      total: 0,
      currentIndex: 1,
      actcode: 0,
        current: 1,
        tabStyle: {
            color: '#c40000',
            background: 'black'
        },
        postList: []
    }
  },
  mounted() {
    this.getPost();
    this.actcode = this.$route.query.actcode
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
          // 为你精选数据
    getPost() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getBrandMallFloor";
      iRequest.param.pageIndex = this.currentIndex;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.postList = result.data;
            _this.total = result.total
            console.log(444);
            console.log(_this.selectedList)
            _this.getImgUrl(_this.postList);
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber
      this.getPost();
    }
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
  .container-size(block, 1210px, auto, 0 auto, 0px);
  min-height: 400px;
  margin-bottom: 20px;
  background: #f2f2f2;
}
.tab-pane {
    width: 270px;
    height: auto;
}
.goods-box {
    .container-size(inline-block, 225px, 310px, 0px 16.3px 16px 0px, 0px);
    .position(relative,0px,0px);
    background: #ffffff;
}
.goods-pic {
   .position(absolute,10px,9px);
   width: 206px;
   height: 132px;
}
.goods-name {
  .position(absolute,205px,0px);
  width: 100%;
  text-indent: 12px;
  font-size: 14px;
  color: #333333;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.goods-adv {
  .position(absolute,50px,250px);
}
.goods-surplus {
  .position(absolute,230px,0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  color: #999999;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
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
  .position(absolute,180px,0px);
  width: 100%;
   text-indent: 10px;
  font-size: 14px;
  color: #ED2F26;
  del {
      color: #666666;
  }
}
.card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.card:hover .package{
  display: none;
}
.card:hover .goods-surplus{
  display:none;
}
.ant-pagination{
  text-align: center;
}
.validity{
  .position(absolute,143px,0px);
  height: 30px;
  line-height: 30px;
  width: 100%;
  padding: 0 10px;
  background: #e0e0e0;
}
.package{
  .position(absolute,278px,0px);
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #e0e0e0;
  padding: 0 10px;
  color: #999999;
}
.search-p{
  .p-size(60px,60px,14px,left,0px,#666666);
  padding-top: 10px;
  input{
    width: 200px;
    height: 30px;
    border: 1px solid #e0e0e0;
    text-indent: 10px;
    margin-right: 10px;
  }
  button{
   .button-size(120px,30px,30px,14px,0px,5px);
   .button-color(1px solid transparent,#ff0036,#ffffff);
  }
}
.float-left{
  float: left;
}
.float-right{
  float: right;
}
.limit{
  display: none;
  .position(absolute,225px,0px);
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  color: #999999;
}
.card:hover .limit{
  display: block;
}
.p-btn{
  display: none;
  .position(absolute,270px,0px);
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  color: #999999;
  input{
    width: 45px;
    height: 30px;
    border: 1px solid #e0e0e0;
    text-align: center;
  }
  .small-btn{
    .button-size(30px,30px,20px,14px,0px,0px);
    border: 1px solid #e0e0e0;
    background: #ffffff;
  }
  .add-cart{
    .button-size(85px,30px,20px,14px,0px,0px);
    .button-color(1px solid transparent,#ff0036,#ffffff);
  }
}
.card:hover .p-btn{
  display: block;
}
.collec{
  display: none;
  .position(absolute,10px,170px);
  color: #999999;
}
.card:hover .collec{
  display: block;
}
</style>