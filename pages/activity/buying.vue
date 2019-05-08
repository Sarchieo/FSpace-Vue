<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="limited-box">
          <!-- 活动文案=》未定 -->
          <div class="buying-text">
            <p>一块购</p>
            <p>一块团购 团购越多越实惠</p>
          </div>
          <div class="person-num">
            <div class="person-left">
              <span class="buying-content">商品累计拼团人数/折扣</span>
              <p class="discount-num"><span>10.0</span> <span>9.8</span> <span>9.5</span> <span>9.0</span> <span>8.8</span> <span>8.5</span> <span>折</span></p>
              <a-progress
                  :percent="99"
                  style="position: absolute;top: 32px;left: 203px;width: 295px;height: 8px;margin-left: 20px;"
                  :showInfo="false"
                  status="exception"
                />
              <p class="discount-person"><span>15</span> <span>20</span> <span>25</span> <span>30</span> <span>35</span> <span>40</span> <span>人</span></p>
            </div>
            <div class="person-right">
              <!-- 距团购活动时间还剩 {{ flashSale.h }} 时 {{ flashSale.m }} 分 {{ flashSale.s }} 秒 -->
            </div>
          </div>
          <div class="limited-goods">
            <div class="goods-box" v-for="(item,index) in teamBuyList.list" :key="index">
              <a-card hoverable class="card" @click="toDetails(item)">
                <img v-lazy="item.imgURl" alt class="goods-pic">
                <p class="goods-name">{{item.prodname}} {{item.spec}}</p>
                <p class="goods-surplus">{{item.manuName}}</p>
                <p class="goods-limit">
                  {{item.startnum}}{{item.unitName}}起拼/
                  <span>{{item.surplusstock}}</span>{{item.unitName}}成团
                </p>
                <p class="goods-price" v-if="item.vatp != -1">
                  限时价￥{{item.actprize}}元
                  <del>￥{{item.mp}}元</del>
                </p>
                <p class="goods-price" v-else>
                  ￥认证后可见
                </p>
                <p class="go-imme">
                   <span class="sur-time">还剩</span>
                        <span>{{teamBuy.h}}</span>时
                        <span>{{teamBuy.m}}</span>分
                        <span>{{teamBuy.s}}</span>秒
                        <button class="imme-btn">立即参团</button>
                </p>
              </a-card>
            </div>
            <a-pagination :total="total" v-if="this.teamBuyList.length !== 0" @change="onChangePage" />
            <!-- <a-pagination v-model="current" :total="this.searchList.length"/> -->
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
      current: 1,
         teamBuy: {
        h: 0,
        m: 0,
        s: 0,
      },
      actcode: 0,
      flashSale: {
        h: 0,
        m: 0,
        s: 0,
      },
      tabStyle: {
        color: "#c40000",
        background: "black"
      },
      teamBuyList: [],
      currentIndex: 1,
      pagination: []
    };
  },
  mounted() {
    this.actcode = this.$route.query.actcode;
    this.getTeamBuyMallFloor();
  },
  methods: {
    // 获取一块购数据
    async getTeamBuyMallFloor() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getAllTeamBuy";
      iRequest.param.pageIndex = this.currentIndex
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
            _this.teamBuyList = result.data;
            _this.pagination =  _this.teamBuyList.list
            _this.total  = result.total
            _this.fsGeneralMethods.addImages(_this, _this.teamBuyList.list, 'sku', 'spu')
            _this.secondKills(_this.stringToDate(_this.teamBuyList.now) ,_this.teamBuyList.edate)
          }
        })
      );
    },
    stringToDate(str){
      var tempStrs = str.split(" ");
      var dateStrs = tempStrs[0].split("-");
      var year = parseInt(dateStrs[0], 10);
      var month = parseInt(dateStrs[1], 10) - 1;
      var day = parseInt(dateStrs[2], 10);
      var timeStrs = tempStrs[1].split(":");
      var hour = parseInt(timeStrs [0], 10);
      var minute = parseInt(timeStrs[1], 10);
      var second = parseInt(timeStrs[2], 10);
      var date = new Date(year, month, day, hour, minute, second);
      return date;
    },
    // 批量设置倒计时
    secondKills(date,eDate) {
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
        _this.teamBuy.h = Math.floor(times/60/60);
        _this.teamBuy.m = Math.floor(times/60)%60;
        _this.teamBuy.s = times%60;
        if (times <= 0) {
          clearInterval(timer);
        }
        }, 1000);
        if (times >= 0) {
          console.log(times)
        } else {
          console.log('活动结束')
        }
      }
    },
      // 设置倒计时
    async secondKill(date,eDate) {
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
        if (times >= 0) {
          console.log(times)
        } else {
          console.log('活动结束')
        }
      }
    },
    onChangePage(pageNumber) {
    this.currentIndex = pageNumber
    this.getTeamBuyMallFloor()
    },
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
    }
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.ant-layout{
   background: #f2f2f2;
}
.imme-btn:hover{
  cursor: pointer;
}
.person-num {
  .container-size(block, 1190px, 86px, 0 auto, 0px);
  line-height: 86px;
  background: #333333;
  font-size: 18px;
  color: #ffffff;
  .person-left {
    float: left;
    .position(relative,0px,0px);
    .container-size(inline-block, 675px, 86px, 0 auto, 0px);
    text-indent: 40px;
    .buying-content{
      .position(absolute,0px,0px);
      height:30px;
    }
    .discount-num{
     .position(absolute,-25px,220px);
      height:30px;
     span{
       display:inline-block;
       width: 50px;
       height: 20px;
     }
   }
   .discount-person{
     .position(absolute,28px,220px);
     span{
       display:inline-block;
       width: 50px;
       height: 20px;
     }
   }
  }
  .person-right {
    float: right;
    .container-size(inline-block, 500px, 86px, 0 auto, 0px);
    text-indent: 160px;
  }
}
.card {
  .container-size(inline-block, 225px, 310px, 0px 0px, 0px);
  .go-imme{
    .position(absolute,258px,0px);
    .p-size(50px,50px,14px,left,10px,#999999);
    width: 100%;
    border: 1px solid #ed3025;
     button{
       float: right;
      width: 72px;
      height: 48px;
      line-height: 48px;
      border:1px solid #ed3025;
      background: #ed3025;
      color: #ffffff;
    }
  }
}
.buying-text {
  .container-size(block, 1190px, 200px, 0 auto, 0px);
  background: #e0e0e0;
  p {
    .p-size(100px, 100px, 28px, center, 0px, #333333);
    font-weight: bold;
  }
}
.limited-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #ffffff;
}
.limited-goods {
  .container-size(block, 1210px, auto, 0 auto, 0px);
  min-height: 400px;
  background: #f2f2f2;
  margin-bottom: 20px;
}
.tab-pane {
  width: 270px;
  height: auto;
}
.goods-box {
  .container-size(inline-block, 225px, 310px, 10px 16.2px 10px 0px, 0px);
  .position(relative, 0px, 0px);
  background: #ffffff;
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
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 16px;
}
.goods-adv {
  .position(absolute, 50px, 250px);
}
.goods-surplus {
  .position(absolute, 215px, 0px);
  width: 100%;
  text-indent: 10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-size: 14px;
  color: #999999;
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
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  color: #ed2f26;
  del {
    font-weight: normal;
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
