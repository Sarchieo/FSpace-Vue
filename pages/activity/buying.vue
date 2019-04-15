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
            <div class="person-left">商品累计拼团人数/折扣 描述方式待定</div>
            <div class="person-right">
              距团购活动时间还剩 {{ flashSale.h }} 时 {{ flashSale.m }} 分 {{ flashSale.s }} 秒
            </div>
          </div>
          <div class="limited-goods">
            <div class="goods-box" v-for="(item,index) in teamBuyList.list" :key="index">
              <a-card hoverable class="card" @click="toDetail(item)">
                <img v-lazy="item.imgURl" alt class="goods-pic">
                <p class="goods-name">{{item.prodname}} {{item.spec}}</p>
                <p class="goods-surplus">{{item.manuName}}</p>
                <p class="goods-limit">
                  {{item.startnum}}{{item.unitName}}起拼/
                  <span>{{item.surplusstock}}</span>{{item.unitName}}成团
                </p>
                <p class="goods-price">
                  限时价￥{{item.actprize}}元
                  <del>￥{{item.mp}}元</del>
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
      goodsList: [
        {
          src:
            "//img.alicdn.com/imgextra/i1/TB195qYLXXXXXb2XFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "冬虫夏草",
          advantage: "5g/盒",
          surplus: 56,
          new: 344,
          old: 309,
          menu: "三九制药有限公司",
          least: 10,
          most: 100
        },
        {
          src:
            "//img.alicdn.com/imgextra/i1/TB1YUDFJpXXXXbnXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "长白山人参",
          advantage: "5g/盒",
          surplus: 12,
          new: 888,
          old: 1099,
          menu: "三九制药有限公司",
          least: 10,
          most: 100
        },
        {
          src:
            "//img.alicdn.com/imgextra/i1/TB1EpYsKpXXXXbDXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "宁夏枸杞",
          advantage: "5g/盒",
          surplus: 34,
          new: 23,
          old: 24,
          menu: "三九制药有限公司",
          least: 10,
          most: 100
        },
        {
          src:
            "//img.alicdn.com/imgextra/i4/TB1L37TMpXXXXbnXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "胶原蛋白口服液",
          advantage: "5g/盒",
          surplus: 99,
          new: 199,
          old: 209,
          menu: "三九制药有限公司",
          least: 10,
          most: 100
        },
        {
          src:
            "//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "叶酸片",
          advantage: "5g/盒",
          surplus: 56,
          new: 344,
          old: 309,
          menu: "三九制药有限公司",
          least: 10,
          most: 100
        },
        {
          src:
            "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "山东阿胶",
          advantage: "5g/盒",
          surplus: 45,
          new: 222,
          old: 233,
          menu: "三九制药有限公司",
          least: 10,
          most: 100
        },
        {
          src:
            "//img.alicdn.com/imgextra/i1/TB103TQOXXXXXaLaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg",
          name: "盘龙云海排毒胶囊",
          advantage: "5g/盒",
          surplus: 88,
          new: 56,
          old: 59,
          menu: "三九制药有限公司",
          least: 10,
          most: 100
        },
        {
          src:
            "//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "多维素片",
          advantage: "5g/盒",
          surplus: 19,
          new: 88,
          old: 99,
          menu: "三九制药有限公司",
          least: 10,
          most: 100
        }
      ]
    };
  },
  mounted() {
    this.actcode = this.$route.query.actcode
    this.getTeamBuyMallFloor()
  },
  methods: {
    // 获取一块购数据
    async getTeamBuyMallFloor() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "getAllTeamBuy";
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        keyword: '',
        actcode: this.actcode
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            result.data.list = result.data.list;
            _this.teamBuyList = result.data;
            _this.getImgUrl(_this.teamBuyList.list);
            _this.secondKills(_this.stringToDate(_this.teamBuyList.now) ,_this.teamBuyList.edate)
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    async getImgUrl(arr) {
      debugger
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
            debugger;
          }
        )
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
      let endDate = this.stringToDate(date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate() + ' ' + eDate)
      let times = endDate - new Date()
      let _this = this
      if(times>=0) {
        let timer;
        timer = setInterval(function () {
        times--;
        let modulo = times % (60 * 60 * 24);
        _this.teamBuy.h = Math.floor(modulo / (60 * 60));
        modulo = modulo % (60 * 60);
        _this.teamBuy.m = Math.floor(modulo / 60);
        _this.teamBuy.s = modulo % 60;
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
  .container-size(block, 1190px, auto, 0 auto, 0px);
  min-height: 400px;
  background: #f6f6f6;
}
.tab-pane {
  width: 270px;
  height: auto;
}
.goods-box {
  .container-size(inline-block, 225px, 310px, 10px 6px, 0px);
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
</style>