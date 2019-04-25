<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="limited-box">
          <!-- 广告位 -->
          <div class="binnar-box">
            <a-carousel arrows autoplay>
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
                <img
                  v-lazy="'//m.360buyimg.com/babel/jfs/t1/26491/29/9870/42039/5c820018E6ac9f854/55c42a68a489cd18.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img30.360buyimg.com/img/jfs/t15169/46/1365117661/178502/d02d6948/5a4ddc4eNbd55867a.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img30.360buyimg.com/img/jfs/t16327/24/1234872079/191114/a510775d/5a4ddbc6N2d73dd08.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'"
                  class="banner-pic"
                >
              </div>
            </a-carousel>
          </div>
          <div class="limited-goods">
            <a-tabs defaultActiveKey="1" @change="callback" :tabBarStyle="tabStyle" size="large">
              <a-tab-pane v-for="(item, index) in goodsList.timeArray" :key="index" :tab="item.edate">
                <div class="goods-box" v-for="(item,index) in goodsList.list" :key="index">
                  <img v-lazy="item.imgURl" alt class="goods-pic">
                  <p class="goods-name">{{item.prodname}}</p>
                  <p class="goods-adv">{{item.spec}}</p>
                  <a-progress
                    :percent="item.percentage"
                    style="position:absolute;top:100px;left:250px;width: 215px;"
                    :showInfo="false"
                    status="exception"
                  />
                  <p class="goods-surplus">还剩{{item.surplusstock}}{{item.unitName}}</p>
                  <p class="goods-price">
                    限时价￥{{item.actprize}}元
                    <del>  原价￥{{item.mp}}元</del>
                  </p>
                  <button @click="toDetails()">立即抢购</button>
                </div>

              </a-tab-pane>

            </a-tabs>
             <a-pagination :total="total" v-if="this.goodsList.length !== 0 " @change="onChangePage"/>
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
      pagination: [],
      tabStyle: {
        color: "#c40000",
        background: "black"
      },
      actcode: 0,
      goodsList: []
    };
  },
  mounted() {
    this.actcode = this.$route.query.actcode
    this.getAllDiscount()
  },
  methods: {
    // 获取限时抢购数据
    async getAllDiscount() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getAllDiscount";
      iRequest.param.pageIndex = this.currentIndex;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        keyword: '',
        actcode: this.actcode
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            result.data.list = result.data.list;
            _this.goodsList = result.data;
            _this.pagination = _this.goodsList.list
            _this.total = result.total
            _this.goodsList.list.forEach((item) => {
              item.percentage = 100 - item.buynum/item.surplusstock*100
            })
            console.log(_this.goodsList)
            _this.getImgUrl(_this.goodsList.list);
            _this.secondKill(_this.stringToDate(_this.goodsList.now || '2019-4-13 16:10:20') ,_this.goodsList.edate)
          }
        },function(error) {
          console.log(error)
        })
      );
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber
      this.getAllDiscount();
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
        this,
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
          }
        )
      );
    },
    // 设置倒计时
    secondKill(date,eDate) {
     let endDate = this.stringToDate(
        date.getFullYear() +
          "-" +
          (Number(date.getMonth()) + 1) +
          "-" +
          date.getDate() +
          " " +
          eDate
      );
      let times = Math.floor((endDate - date)/1000);
      let _this = this
      if(times>=0) {
        let timer;
        timer = setInterval(function () {
        times--;
        _this.flashSale.h = Math.floor(times/60/60);
        _this.flashSale.m = Math.floor(times/60)%60;
        _this.flashSale.s = times%60;
        if (times <= 0) {
          clearInterval(timer);
        }
        }, 1000);
        if (deltaTime >= 0) {
          console.log(deltaTime)
        } else {
          console.log('活动结束')
        }
      }
    },
    callback(key) {
      console.log(key);
    },
    toDetails() {
      this.$router.push({
        path: "/product/detail"
      });
    }
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
#components-layout-demo-basic .ant-layout-content{
   background: #f2f2f2;
}
.limited-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #ffffff;
}
// 广告位样式
.binnar-box {
  .container-size(inline-block, 1190px, 350px, 0, 0px);
}
.ant-carousel > .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.banner-pic {
  width: 1190px;
  height: 350px;
}
.ant-carousel > .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #ed2f26;
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
  .container-size(inline-block, 575px, 225px, 10px 10px, 0px);
  .position(relative, 0px, 0px);
  background: #ffffff;
  button {
    .position(absolute, 160px, 250px);
    .button-size(120px, 40px, 40px, 14px, 0px, 5px);
    .button-color(1px solid transparent, #ed2f26, #ffffff);
  }
}
.goods-pic {
  .position(absolute, 0px, 0px);
  width: 225px;
  height: 225px;
}
.goods-name {
  .position(absolute, 20px, 250px);
  font-size: 20px;
}
.goods-adv {
  .position(absolute, 50px, 250px);
}
.goods-surplus {
  .position(absolute, 80px,249px);
  width: 200px;
  font-size: 16px;
}
.goods-price {
  .position(absolute, 120px, 250px);
  font-size: 16px;
  color: #ed2f26;
  del {
    color: #666666;
  }
}
.ant-pagination{
  text-align: center;
}
</style>
