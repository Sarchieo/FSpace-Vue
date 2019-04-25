<template>
  <div>
     <!-- v-for="(item,index) in orderList" :key="index" -->
    <a-tabs defaultActiveKey="" @change="callback">
      <a-tab-pane tab="全部订单" key=""></a-tab-pane>
      <a-tab-pane tab="未付款" key="0"></a-tab-pane>
      <a-tab-pane tab="已付款" key="1"></a-tab-pane>
      <a-tab-pane tab="已发货" key="2"></a-tab-pane>
      <a-tab-pane tab="已签收" key="3"></a-tab-pane>
       <a-tab-pane tab="退货申请" key="-1"></a-tab-pane>
      <a-tab-pane tab="退货中" key="-2"></a-tab-pane>
      <a-tab-pane tab="已退货" key="-3"></a-tab-pane>
      <a-tab-pane tab="取消交易" key="-4"></a-tab-pane>
    </a-tabs>
      <p class="table-title">
          <span class="width33">药品</span>
          <span class="width13">单价</span>
          <span class="width13">数量</span>
          <!-- <span class="width11">订单操作</span> -->
          <span class="width13">实付款</span>
          <span class="width13">交易状态</span>
          <span class="width13">操作</span>
        </p>
     <ul class="order-box" v-if="this.orderList.length !== 0 ">
          <li v-for="(item,index) in orderList" :key="index" class="order-box-li">
            <p class="order-info-text">
              <span class="time">{{item.odate}}</span>
              <span>订单号：{{item.orderno}}</span>
              <!-- <span class="yikuai">一块医药</span>
              <span class="contact">联系售后</span> -->
              <a-tooltip class="share">
                <template slot="title">分享</template>
                <a-icon type="export"/>
              </a-tooltip>
              <a-tooltip>
                <template slot="title">删除</template>
                <a-icon type="delete" @click="showDeleteConfirm()"/>
              </a-tooltip>
            </p>
            <div class="goods-box" v-for="(items,index1) in item.goods" :key="index1">
              <div class="goods-pic">
                <img
                  v-lazy="item.imgURl"
                >
                <p class="goods-text">{{items.pname}}</p>
                <p class="guige">规格：{{items.pspec}}</p>
                <p class="menu-name">{{items.manun}}</p>
                <!-- <p class="date">有效期：2019-04-12</p> -->
              </div>
              <div class="pay price-div">
                <p class="price-p">￥{{items.pdprice}}</p>
              </div>
              <div class="pay count-div">
                <p>{{items.pnum}}</p>
              </div>

              <div class="pay fact-div">
                <p class="shiji">￥{{items.payamt}}</p>
                <p class="freight">(含运费{{items.freight}}元)</p>
              </div>
              <div class="state">
                <p class="sucess" v-if="item.ostatus === 2 || item.ostatus === -2">申请售后</p>
                <p class="sucess">{{statusText(item.ostatus)}}</p>
              </div>
            </div>
            <div class="operation">
              <p class="button-p" v-if="item.ostatus === 0"><a-button @click="toPay(item)" type="primary" class="confirm-btn">付款</a-button></p>
              <!-- <p class="button-p" v-if="item.ostatus === 2"><a-button type="primary" class="confirm-btn">确认收货</a-button></p> -->
              <!-- v-if="item.ostatus === 3" -->
              <p @click="afterApply(item)">申请售后</p>
              <p @click="toEvaluate(item)" v-if="item.ostatus === 3" ref="toevaluate"><a>评论</a></p>
              <p class="canle-order" v-if="item.ostatus === 0 || item.ostatus === 1" @click="isShowCancel()">取消订单</p>
              <p class="detail" @click="toDetails(item)">订单详情</p>
              <p v-if="item.ostatus !== 0">再次购买</p>
              <p v-if="item.ostatus === 3">补开发票</p>
            </div>
            <a-modal title="提示" v-model="visible" @ok="cancelOrder(item)" okText="提交" cancelText="再想想">
              <p>订单取消成功后将无法恢复</p>
              <p>优惠券可能不再返还，支付优惠也将一并取消</p>
              <div>
                <a-radio-group defaultValue="a" size="large">
                  <a-radio-button value="a" class="cancel-reason" defaultValue>订单不能按预计时间送达</a-radio-button>
                  <a-radio-button value="b" class="cancel-reason">操作有误(药品选错)</a-radio-button>
                  <a-radio-button value="c" class="cancel-reason">重复下单/误下单</a-radio-button>
                  <a-radio-button value="d" class="cancel-reason">其它渠道价格更低</a-radio-button>
                  <a-radio-button value="e" class="cancel-reason">该商品降价了</a-radio-button>
                  <a-radio-button value="f" class="cancel-reason">不想买了</a-radio-button>
                </a-radio-group>
              </div>
            </a-modal>
          </li>
           <a-pagination  v-if="this.orderList.length !== 0 " @change="onChangePage" :total="total"/>
        </ul>
        <div class="no-data" v-if="this.orderList.length === 0">
          <p class="icon"><a-icon type="exclamation" /></p>
          <p class="text">没有查询到订单！</p>
          <!-- <p @click="saleAfter()">申请售后</p> -->


        </div>
        <a-modal
          title="选择售后类型"
          :visible="isApply"
          keyboard
          cancelText="取消"
          okText="下一步"
          @ok="pickOK"
          @cancel="pickCancel"
        >
            <div class="retreat">
            <div class="retreat-left">
              <p><img src="../../../assets/img/u6490.png" alt="" class="retreat-p"></p>
              <p class="retreat-text">换货</p>
              <p> <input type="radio" id="radio2" name="radio1" :value="1"/></p>
            </div>
            <div class="retreat-right">
              <p><img src="../../../assets/img/u6507.png" alt="" class="retreat-p"></p>
              <p class="retreat-text">退货</p>
              <p> <input type="radio" id="radio1" name="radio1" :value="2"/></a-checkbox></p>
            </div>
          </div>

        </a-modal>
        <!-- <input type="radio" id="radio1" name="radio1" />
          <input type="radio" id="radio2" name="radio1" /> -->
  </div>
</template>
<script>
import FSpaceOrder from "../../../components/table/order";
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  };
  return obj;
};
export default {
  components: {
    FSpaceOrder
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      isApply: false,
        goodsArr:[],
      visible: false,
      currentIndex: 1,
      total: 0,
      ostatus: '', // 订单状态
      orderList: []
    };
  },
  mounted() {
    this.queryOrderList()
  },
  methods: {
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber
      this.queryOrderList()
    },
    onChange(val) {
      console.log(val)
    },
    afterApply(item) {
      this.isApply = true;
        this.goodsArr = item.goods;
        this.orderno = item.orderno
        // console.log("goods--- " +  JSON.stringify(item.goods))
    },
    pickCancel() {
      this.isApply = false
    },
     pickOK() {
         let arr = this.goodsArr.map((value) => {
             return {
                 pname: value.pname,
                 pspec: value.pspec,
                 manun: value.manun,
                 checked: 0,
                 pdprice: value.pdprice,
                 pnum: value.pnum,
                 payamt: value.payamt,
                 pdno: value.pdno,
                 orderno: value.orderno,
                 compid: value.compid
             };
         })
        sessionStorage.setItem('afterSaleGoods', JSON.stringify(arr));
        this.$router.push({
            path: '/order/after-sale',
            query: {
                orderno: this.orderno,
            }
        })
     },
    // 查询订单列表
    queryOrderList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderInfoModule";
      iRequest.method = "queryOrders";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.arrays = [this.ostatus];
      iRequest.param.pageIndex = this.currentIndex;
      iRequest.param.pageNumber = 10;
      this.$refcallback(
        this,
        "orderServer" + Math.floor(this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.orderList = result.data;
            _this.total = result.total
            _this.currentIndex = result.pageNo
            _this.orderList.forEach(element => {
              _this.getImgUrl(element.goods)
            });
          } else {
            ;
          }
        })
      );
    },
     // 获取商品图片
    async getImgUrl(arr) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.token = localStorage.getItem("identification");
      let list = [];
      // arr.forEach(c => {
      //   list.push({
      //     sku: ,
      //     spu:
      //   });
      // });
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
                    "-200x200.jpg"
                );
              });
            } else {
              _this.$message.error("文件地址获取失败, 请稍后重试");
            }
          },
          
        )
      );
    },
    showDeleteConfirm() {
      this.$confirm({
        title: "您确定要删除此订单?",
        content: "删除后，您将不能查询到该订单的信息！",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    handleOk(e) {
      this.visible = false
    },
    handleCancel(e) {
      this.visible = false
    },
    toDetails(item) {
     var routeData = this.$router.resolve({
        path: "/user/order-detail",
        query: {
          orderno: item.orderno,
          cusno: item.cusno
        }
      });
    window.open(routeData.href, '_blank');
    },
    callback(key) {
      this.ostatus = key
      this.currentIndex = 1
      this.queryOrderList()
    },
    toEvaluate(value) {
      var routeData = this.$router.resolve({
        path: "/user/evaluate",
        query: {
          orderno: value.orderno,
          goods: JSON.stringify(value.goods)
        }
      });
      window.open(routeData.href, '_blank');
    },
    statusText(val) {
      var text = ''
      switch(val){
        case 0:
        text = '未付款';
        break;
        case 1:
        text = '已付款';
        break;
        case 2:
        text = '已发货'
        break;
        case 3:
        text = '已签收'
        break;
        case -1:
        text = '退货申请'
        case -2:
        text = '退货中'
        break;
        case -3:
        text = '已退货'
        break;
        case -4:
        text = '已取消'
        break;
      }
      return text
    },
    isShowCancel() {
      this.visible = true
    },
    // 取消订单
    cancelOrder(item) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "TranOrderOptModule";
      iRequest.method = "cancelOrder";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
          orderno: item.orderno,
          cusno: item.cusno
      });
      console.log("json--- " + iRequest.param.json )
      this.$refcallback(
        this,
          "orderServer" + Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
          iRequest,
          new this.$iceCallback(function result(result) {
              if (result.code === 200) {
                _this.visible = false;
                _this.queryOrderList()
              } else {
                ;
              }
          })
      );
    },
    toPay(item) {
      var routeData = this.$router.resolve({
        path: "/order/pay",
        query: {
          orderno: item.orderno
        }
      });
      window.open(routeData.href, '_blank');
    },
    saleAfter() {
      this.visible = true
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";

.order-box-li:hover{
    border: 1px solid #e0e0e0;
}
.width33 {
  // .position(relative, 0px, 0px);
  float:left;
  width: 33%;
  img {
    // .position(absolute, 14px, 14px);
    float: left;
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
}
.width13{
  width: 13.1%;
}
.width11 {
  width: 13.5%;
}
.width12 {
  width: 13%;
}
.table-title {
  .p-size(50px, 50px, 16px, center, 0px, #666666);
  display: block;
  width: 960px;
  margin: 0 auto;
  background: #f2f2f2;
  span {
    display: inline-block;
    float:left;
    height: 50px;
    line-height: 50px;
  }
}
.order-box {
  .container-size(block, 985px, 905px, 0 auto, 0px);
  overflow: auto;
  li{
    .container-size(block, 945px, auto, 0 auto, 0px);
    .container-color(#ffffff, 1px solid #f2f2f2, #666666);
    margin-top: 10px;
    margin-bottom: 10px;
    .order-info-text {
      .p-size(45px, 45px, 16px, left, 20px, #666666);
      background: #f2f2f2;
      .time{
          font-weight: bold;
      }
      .yikuai {
          margin-right: 38px;
      }
      .contact:hover{
           cursor: pointer;
          color: #ed3025;
      }
      .share {
        margin-left: 430px;
      }
      i {
        font-size: 18px;
      }
      span {
        margin-right: 23px;
      }
    }
    .goods-box {
      .container-size(inline-block, 820px, 108px, 0 auto, 0px);
      border-bottom: 1px solid #e0e0e0;
      div {
        display: inline-block;
        height: 108px;
      }
      .goods-pic {
        float: left;
        width: 315px;
        padding-top: 14px;
        padding-left: 10px;
        img{
          float: left;
          width: 80px;
          height: 80px;
          margin-right: 5px;
        }
        .goods-text {
          // .position(absolute, 10px, 110px);
          width: 200px;
          height: 25px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 16px;
          color: #333333;
        }
        .goods-text:hover {
          cursor: pointer;
          color: #ed3025;
        }
        .guige {
          width: 200px;
          height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #333333;
        }
        .menu-name{
          // .position(absolute, 55px, 110px);
          width: 200px;
          height: 25px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #333333;
        }
        .date{
           .position(absolute, 75px, 110px);
          width: 200px;
          height: 25px;
        }
      }
      .count,
      .sale,
      .price{
        float: left;
        padding: 10px 0px;
        .button-p{
          height: 32px!important;
        }
        p {
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #3189f5;
          a{
            color: #3189f5;
          }
        }
      }
      .operation:hover{
          cursor: pointer;
        color: #ed3025;
      }
      .sale p:hover {
        cursor: pointer;
        color: #ed3025;
      }
      .state {
        float: left;
        width: 126px;
        min-height: 108px;
        height: auto;
        padding-top: 42px;
        border-left: 1px solid #e0e0e0;
        .sucess {
          // .position(absolute, 28px, 0px);
          width: 100%;
          text-align: center;
          color: #3189f5;
        }
        .detail {
          // .position(absolute, 56px, 0px);
          width: 100%;
          text-align: center;
          color: #3189f5;
        }
        .detail:hover {
          cursor: pointer;
          color: #ed3025;
        }
      }
    }
  }
}
.paging{
    float: right;
    margin-right: 20px;
}
.pay{
  float: left;
}
.price-div{
  float: left;
  width: 126px;
  text-align: center;
  line-height: 108px;
  color: #ed3025;
}
.count-div{
  float: left;
  width: 126px;
   text-align: center;
  line-height: 108px;
}
.fact-div{
  float: left;
  width: 126px;
  padding: 32px 0px;
  p{
    text-align: center;
    color: #ed3025!important;
  }
}
.ant-pagination{
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.confirm-btn{

   border-radius: 3px;
   -moz-border-radius: 3px;
   -webkit-border-radius: 3px;
}
.canle-order{
  color: #999999!important;
}
.no-data{
  .container-size(block, 943px, 200px, 0 auto, 0px);
  padding-top: 20px;
  .icon{
    .p-size(50px,50px,18px,center,0px,#333333);
    i{
      font-size: 40px;
    }
  }
  .text{
    .p-size(50px,50px,18px,center,0px,#333333);
  }
}
.price-p{
  color: #ed3025!important;
}
.retreat div:hover{
  cursor: pointer;
  border: 1px solid #ed3025;
}
.retreat-text{
  margin-bottom: 3px;
}
.retreat div:hover .retreat-text{
  color: #ed3025;
}
.retreat{
  .container-size(block, 300px, 150px, 0 auto, 0px);
  div{
    border: 1px solid #e0e0e0;
    padding: 40px 0px 20px 0px;
    p{
      text-align: center;
    }
    .retreat-check{
       float: right;
       margin-right: 15px;
    }
  }
  .retreat-left{
    float: left;
    .container-size(inline-block, 140px, 150px, 0, 0px);
  }
  .retreat-right{
    float: right;
    .container-size(inline-block, 140px, 150px, 0, 0px);
  }
}
.operation {
  float: right;
  width: 123px;
  min-height: 108px;
  height: auto;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  padding-top: 10px;
  p{
    text-align: center;
  }
}
.cancel-reason {
  width: 220px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
