<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="limited-box">
          <!-- 活动文案=》未定 -->
         <div class="buying-text">
            <p>人气推荐好药，它们最受欢迎</p>
         </div>
          <div class="limited-goods">
              <p class="one-day">热销药品</p>
              <div class="goods-box" v-for="(item,index) in hotGoodsList" :key="index">
                <a-card hoverable class="card" @click="toDetail(item)">
                  <img v-lazy="item.imgURl" alt="" class="goods-pic">
                  <p class="goods-name">{{item.brandName}} {{item.spec}}</p>
                  <p class="goods-surplus">{{item.manuName}}</p>
                  <p class="goods-limit">还剩<span>{{item.surplusstock}}</span>盒</p>
                  <p class="goods-price">单价￥{{item.mp}}元 </p>
                  <button @click="toDetail(item)">查看详情</button>
                </a-card>
              </div>
              <a-pagination :total="total" v-if="this.hotGoodsList.length !== 0 " @change="onChangePage"/>
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
      total: 0,
      currentIndex: 1,
      current: 1,
      actcode: 0,
      hotGoodsList: [],
      tabStyle: {
          color: '#c40000',
          background: 'black'
      }
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
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getHotMallFloor";
      iRequest.param.pageIndex = this.currentIndex
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.hotGoodsList = result.data
            _this.total = result.total
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
            console.log(error)
          }
        )
      );
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber
      this.getHotGoods();
    },
    callback(key) {
        console.log(key)
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
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
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
  background: #ffffff;
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
    .container-size(inline-block, 225px, 310px, 10px 6.5px, 0px);
    .position(relative,0px,0px);
    background: #ffffff;
    button {
        .position(absolute,265px,5px);
        .button-size(215px,40px,40px,14px,0px,5px);
        .button-color(1px solid transparent,#ED2F26,#ffffff);
    }
}
.goods-pic {
   .position(absolute,10px,10px);
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
