<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <a-breadcrumb class="bread">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>我的一块</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>我的订单</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>订单详情</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="detail-box" v-for="(item,index) in orderDetail" :key="index">
          <ul class="detail-left-box float-right">
            <li class="orderno">
              <p>
                <span>订单编号:</span>
                <span>{{item.orderno}}</span>
              </p>
              <p>
                <span>下单时间:</span>
                <span>{{item.odate}} {{item.otime}}</span>
              </p>
              <p>
                <span>订单状态:</span>
                <span v-if="item.ostatus === 0">未付款</span>
                <span v-if="item.ostatus === 2">等待收货</span>
                <span v-if="item.ostatus === 3">已签收</span>
                <span v-if="item.ostatus === 4">已完成</span>
                <span v-if="item.ostatus === -4">交易取消</span>
                <span v-if="item.ostatus === 1 && item.opayway != 4 && item.opayway != 5">付款成功</span>
                <span v-if="item.ostatus === 1 && (item.opayway == 4 || item.opayway == 5)">待发货</span>
                <span v-if="item.ostatus === -1">退货申请</span>
                <span v-if="item.ostatus === -2">退货中</span>
                <span v-if="item.ostatus === -3">已退货</span>
              </p>
              <p>
                <span>发票信息:</span>
                <span>普通发票</span>
              </p>
              <p>
                <span>支付方式:</span>
                <span>{{payText(item.opayway)}}</span>
              </p>
            </li>
            <li class="goods-count">
              <p>
                <span>商品种数:</span>
                <span>{{item.classNum}}</span>
              </p>
              <p>
                <span>总 件 数:</span>
                <span>{{item.totalNum}}</span>
              </p>
            </li>
            <li class="price-box">
              <p>
                <span>商品总计:</span>
                <span>￥{{item.pdamt}}元</span>
              </p>
              <p>
                <span>运&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp费:</span>
                <span>￥{{item.freight}}元</span>
              </p>
              <p>
                <span>优惠金额:</span>
                <span>￥{{item.distamt}}元</span>
              </p>
              <p>
                <span>余额抵扣:</span>
                <span>￥{{item.balamt}}元</span>
              </p>
              <p>
                <span>实付金额:</span>
                <span>￥{{item.payamt}}元</span>
              </p>
            </li>
            <li class="consignee-box">
              <p>
                <span>收货人:</span>
                <span>{{item.consignee}}</span>
              </p>
              <p>
                <span>手机号码:</span>
                <span>{{item.contact}}</span>
              </p>
              <p class="address">
                <span class="title">收货地址:</span>
                <span class="content">{{item.areaAllName}}{{ storeInfo.comp.address }}</span>
                <div style="clear: both;"></div>
              </p>
              <p class="address">
                <span class="title">备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注:</span>
                <span class="contents">{{item.remarks}}</span>
                <div style="clear: both;"></div>
              </p>
              <a-button class="again-pay" @click="reOrder(item)">再次购买</a-button>
            </li>
          </ul>
          <!-- <div class="order-state float-left">
            <div class="state-box">
              <div class="state-box-content">
                <p class="state-p" v-if="item.ostatus === 0">未付款</p>
                <p class="state-p" v-if="item.ostatus === 2">等待收货</p>
                <p class="state-p" v-if="item.ostatus === 3">已签收</p>
                <p class="state-p" v-if="item.ostatus === 4">已完成</p>
                <p class="state-p" v-if="item.ostatus === -4">交易取消</p>
                <p
                  class="state-p"
                  v-if="item.ostatus === 1 && item.opayway != 4 && item.opayway != 5"
                >付款成功</p>
                <p
                  class="state-p"
                  v-if="item.ostatus === 1 && (item.opayway == 4 || item.opayway == 5)"
                >待发货</p>
                <p class="state-p" v-if="item.ostatus === -1">退货申请</p>
                <p class="state-p" v-if="item.ostatus === -2">退货中</p>
                <p class="state-p" v-if="item.ostatus === -3">已退货</p>
                <p class="billno margin-top20">
                  <span>运单号:</span>
                  <span>{{logistixs.billno}}</span>
                </p>
                <p class="billno">
                  <span>配送方式:</span>
                  <span>一块物流</span>
                </p>
              </div>
            </div>
            <div class="logistixs-state float-left">
              <div class="step-right">
                <a-steps class="setps-box" :current="steps">
                  <a-step title="提交订单">
                    <a-icon type="profile" slot="icon"/>
                  </a-step>
                  <a-step title="待发货">
                    <a-icon type="pay-circle" slot="icon"/>
                  </a-step>
                  <a-step title="等待收货">
                    <a-icon type="car" slot="icon"/>
                  </a-step>
                  <a-step title="完成">
                    <a-icon type="check-square" slot="icon"/>
                  </a-step>
                </a-steps>
              </div>
            </div>
          </div> -->
          <div class="order-state float-left" v-if="item.ostatus >= 2 && item.ostatus != -4 && logistixs.node && logistixs.node.length > 0">
            <div class="logistixs-left">

              <div v-for="(items,index1) in logistixs" :key="index1">
              <p>物流状态</p>
              <p>送货方式：普通快递</p>
              <p>配送方式： {{items.carriername}}</p>
              <p>运单号：{{ items.billno }}</p>
              </div>
              
            </div>
            <div class="logistixs-right">
              <a-steps direction="vertical" size="small" :current="logistixs.node.length -1 ">
                <a-step
                  v-for="(item, index) in logistixs.node"
                  :key="index"
                  :title="item.status"
                  :description="item.date + item.time + item.des"
                />
            </a-steps>      
            </div>
            
          </div>
          <div class="detail-right-box float-left">
            <ul class="detail-ui">
              <p class="goods-list-p">
                <span class="width39">商品信息</span>
                <span class="width11">单价</span>
                <span class="width11">数量</span>
                <span class="width11">小计</span>
                <span class="width28">明细</span>
              </p>
              <li  v-for="(items,index1) in item.goods" :key="index1">
                <div class="width342 goods-info-box">
                  <img :src="items.imgURl" class="goods-img" alt="">
                  <p>{{items.pname}}{{items.brandn}}</p>
                  <p>{{items.pspec}}</p>
                  <p v-if="items.standarNo !== ''">{{items.standarNo}}</p>
                  <p>{{items.manun}}</p>
                </div>
                <div class="width11 padding40">
                   <p class="pdprice">￥{{items.pdprice}}</p>
                   <p class="pdprice"><del>￥{{items.distprice}}</del></p>
                </div>
                 <div class="width11">
                   <p class="pnum">{{items.pnum}}</p>
                </div>
                 <div class="width11">
                    <p class="pnum">￥{{items.pdprice*items.pnum}}</p>
                </div>
                 <div class="width28 detail-div">
                   <p class="detail-p">优惠金额：￥{{items.distprice}}</p>
                   <p class="detail-p">余额抵扣：￥{{items.balamt}}</p>
                   <p class="detail-p">实付金额：￥{{items.payamt}}</p>
                </div>
              </li>
            </ul>
          </div>

          <div style="clear: both;"></div>
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>

    <a-modal title="提示" v-model="visible" @ok="hideModal" okText="提交" cancelText="再想想">
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
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      steps: 0,
      visible: false,
      orderDetail: [],
      orderno: "",
      cusno: "",
      logistixs: []
    };
  },
  mounted() {
    this.orderno = this.$route.query.orderno;
    this.cusno = this.$route.query.cusno;
    this.queryOrderDetail();
    this.getLogisticsInfo();
    // this.logistixs = JSON.parse('{"code":200,"message":"调用成功","requestOnline":false,"data":{"logictype":"0","node":[{"date":"2019-04-24","des":"司机(123456789-15211001123)在湖南省长沙市岳麓区文轩路41靠近上海浦东发展银行(麓谷科技支行)成功签收","time":" 10:39:52","status":"签收完成"},{"date":"2019-04-24","des":"货物到达湖南长沙市岳麓区,已签收","time":"12:00:00","status":"已签收"},{"date":"2019-04-24","des":"货物到达湖南长沙市雨花区,送货中","time":"10:36:00","status":"送货中"},{"date":"2019-04-24","des":"司机(123456789-15211001123)在湖南省长沙市岳麓区文轩路41靠近上海浦东发展银行(麓谷科技支行)成功取货","time":" 10:37:25","status":"取货完成"}],"billno":"201904240000000281"}}').data
  },
  methods: {
    getLogisticsInfo() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderOptModule";
      iRequest.method = "getLogisticsInfo";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        compid: this.storeInfo.comp.storeId
      });
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.logistixs = result.data;
          }
        })
      );
    },
    //再次购买
    reOrder(item) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "againShopCart";
      iRequest.param.token = localStorage.getItem("identification");
      let arr = item.goods.map((value) => {
        return {
          compid: _this.storeInfo.comp.storeId,
          pdno: value.pdno,
          pnum: value.pnum,
          checked: 0
        }
      })
      iRequest.param.json = JSON.stringify(arr);
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor(this.storeInfo.comp.storeId / 8192 % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.$message.success('购物车添加成功')
          }
        })
      );
    },
    // 查询订单详情
    queryOrderDetail() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderInfoModule";
      iRequest.method = "getOrderDetail";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.arrays = [this.cusno, this.orderno];
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.orderDetail = result.data;
            console.log(_this.orderDetail);
            _this.fsGeneralMethods.addImages(
              _this,
              _this.orderDetail[0].goods,
              "pdno",
              "spu"
            );
            switch (_this.orderDetail[0].ostatus) {
              case 0:
                _this.steps = 0;
                break;
              case 1:
                _this.steps = 1;
                break;
              case 2:
                _this.steps = 2;
                // 获取物流信息
                _this.getLogisticsInfo();
                break;
              case 3:
                _this.steps = 3;
                break;
              default:
                _this.steps = -1;
                break;
            }
            // if (_this.orderDetail[0].opayway == 4 && _this.orderDetail[0].ostatus === 1 && _this.orderDetail[0].settstatus === 0) {
            //     _this.steps = 0;
            // }
            //   if (_this.orderDetail[0].opayway == 5 && _this.orderDetail[0].ostatus === 1 && _this.orderDetail[0].settstatus === 0) {
            //     _this.steps = 0;
            //   }
          }
        })
      );
    },
    payText(type) {
      var text = "";
      switch (type) {
        case 0:
          text = "余额支付";
          break;
        case 1:
          text = "线上支付(微信)";
          break;
        case 2:
          text = "线上支付(支付宝)";
          break;
        case 3:
          text = "银联支付";
          break;
        case 5:
          text = "线下到付";
          break;
        case 4:
          text = "线下即付";
          break;
      }
      return text;
    },
    cancelOrder() {
      this.visible = true;
    },
    //是否可以取消订单
    canCancel(item) {
      let date = item.odate + " " + item.otime;
      date = date.substring(0, 19);
      date = date.replace(/-/g, "/");
      var timestamp = new Date(date).getTime();
      var timestampNow = parseInt(new Date().getTime()); // 当前时间戳
      var times = timestampNow - timestamp;
      var thirtyMin = 30 * 60 * 1000;
      if (item.opayway == 4 && item.ostatus === 0 && times < thirtyMin) {
        return true;
      }
      if (item.opayway == 5 && item.ostatus === 1 && times < thirtyMin) {
        return true;
      }
      if (item.ostatus === 0 && item.opayway == -1) {
        return true;
      }
    },
    // 取消订单
    hideModal() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "TranOrderOptModule";
      if (
        this.orderDetail[0].ostatus === 0 &&
        this.orderDetail[0].opayway == -1
      ) {
        iRequest.method = "cancelOrder";
      } else {
        iRequest.method = "cancelOffLineOrder";
      }
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        orderno: this.orderDetail[0].orderno,
        cusno: this.orderDetail[0].cusno
      });
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.visible = false;
            _this.queryOrderDetail();
          }
        })
      );
    },
    toPay() {
      var routeData = this.$router.resolve({
        path: "/order/pay",
        query: {
          orderno: this.orderDetail[0].orderno
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.ant-layout-content {
  background: #f8f8f8;
}
#components-layout-demo-basic .ant-layout-footer {
  /* background: deeppink; */
  color: #ffffff;
}
#components-layout-demo-basic .ant-layout-footer {
  /* height: 175px; */
  /* line-height: 1.5; */
  color: #000000;
}
#components-layout-demo-basic .ant-layout-sider {
  width: 30px !important;
  background: #000000;
}
#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  /* min-height: 1000px; */
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.padding40{
  padding: 40px 0px;
}
.pnum{
  width: 100%!important;
  height: 120px!important;
  line-height: 120px!important;
  text-align: center!important;
}
.pdprice{
  width: 100%!important;
  text-align: center!important;
}
.width28{
  width: 28%;
}
.width39{
   width: 39%;
}
.width342{
  width: 340px;
}
.width11{
   width: 11%;
}
.float-right {
  float: right;
}
.float-left {
  float: left;
}
.detail-div{
  padding: 15px!important;
}
.logistixs-left{
  .container-size(inline-left, 283px, 220px, 0, 0px);
  float: left;
  padding-top: 40px;
  border-right: 1px solid #e0e0e0;
  div{
    .container-size(inline-left, 283px, 160px, 0, 0px);
    padding-top: 20px;
    p{
      width: 100%;
      .p-size(30px, 30px, 14px, center, 0px, #666666);
    }
  }
}
.logistixs-right{
  .container-size(inline-block, 595px, 210px, 0, 0px);
  float: right;
  padding: 10px;
  overflow: auto;
}
.detail-p{
  width: 100%!important;
  height: 30px!important;
  line-height:30px!important;
  text-align: center!important;
}
.bread {
  .container-size(block, 1190px, 50px, 0 auto, 0px);
  line-height: 50px;
  background: #f8f8f8;
}
.detail-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  margin-top: 30px;
  margin-bottom: 30px;
  background: #f8f8f8;
  .orderno {
    .container-size(block, 263px, 175px, 0 auto, 0px);
    padding: 10px 0px;
    border-bottom: 1px solid #e0e0e0;
    p {
      .p-size(31px, 31px, 16px, left, 5px, #666666);
    }
  }
  .goods-count {
    .container-size(block, 263px, 98px, 0 auto, 0px);
    padding: 10px 0px;
    border-bottom: 1px solid #e0e0e0;
    p {
      .p-size(31px, 31px, 16px, left, 5px, #666666);
    }
  }
  .price-box {
    .container-size(block, 263px, 175px, 0 auto, 0px);
    padding: 10px 0px;
    border-bottom: 1px solid #e0e0e0;
    p {
      .p-size(31px, 31px, 16px, left, 5px, #666666);
    }
  }
  .consignee-box {
    .container-size(block, 263px, 350px, 0 auto, 0px);
    padding: 10px 0px;
    p {
      .p-size(31px, 31px, 16px, left, 0px, #666666);
      padding-left: 5px;
    }
    .address {
      height: auto !important;
      .title{
         float: left;
         width: 70px;
         height: 30px;
         line-height: 30px;
      }
      .content{
         float: right;
         width: 180px;
         height: auto;
         line-height: 30px;
      }
      .contents{
         float: right;
         width: 180px;
         height: auto;
         overflow: hidden;
         text-overflow:ellipsis;
        //  white-space: nowrap;
      }
    }
    .again-pay {
      .button-display(block, 0 auto);
      .button-size(120px, 38px, 38px, 14px, 0px, 5px);
      .button-color(1px solid transparent, #ed3025, #ffffff);
      margin-top: 50px;
    }
  }
}
.detail-left-box {
  .container-size(inline-block, 283px, 954px, 0 auto, 0px);
  border-top: 3px solid #ed3025;
  background: #ffffff;
}
.order-state {
  .container-size(inline-block, 895px, 220px, 0, 0px);
  margin-bottom: 15px;
  border-top: 3px solid #ed3025;
  background: #ffffff;
  .state-box {
    .container-size(inline-block, 283px, 220px, 0, 0px);
    float: left;
    .state-box-content {
      .container-size(inline-block, 283px, 160px, 0, 0px);
      padding-top: 20px;
      margin-top: 30px;
      border-right: 1px solid #e0e0e0;
      .state-p {
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #ed3025;
      }
      .billno {
        .p-size(31px, 31px, 16px, center, 0px, #666666);
      }
      .margin-top20 {
        margin-top: 20px;
      }
    }
  }
  .logistixs-state {
    .container-size(inline-block, 595px, 220px, 0, 0px);
    .step-right {
    .container-size(inline-block, 595px, 220px, 0 auto, 0px);
    padding: 0px 20px;
    .setps-box {
      .position(relative, 75px, 0px);
      width: 100%;
    }
  }
  }
}
.detail-right-box {
  .container-size(block, 895px, 720px, 0, 0px);
  border-top: 3px solid #ed3025;
  background: #ffffff;
  padding-top: 30px;
  .detail-ui{
    .container-size(block, 875px, 680px, 0 auto, 0px);
    border: 1px solid #f2f2f2;
    overflow: auto;
    li{
      .container-size(inline-block, 873px, 120px, 0 auto, 0px);
      border-bottom: 1px solid #f2f2f2;
      .goods-info-box {
        padding: 20px 0px;
      }
      div{
        float: left;
        height: 120px;
        .goods-img{
          float: left;
          width: 75px;
          height: 75px;
          margin-left: 10px;
        }
        p{
          float: right;
          width: 245px;
          .p-size(20px, 20px, 14px, left, 0px, #999999);
           overflow: hidden;
           text-overflow:ellipsis;
           white-space: nowrap;
        }
      }
    }
  }
  .goods-list-p{
    .p-size(60px, 60px, 16px, center, 0px, #666666);
    background: #f2f2f2;
    span{
      display: inline-block;
      float: left;
    }
  }
}
// .address {
//   height: auto !important;
//   line-height: 40px !important;
//   .address-goods {
//     width: 270px !important;
//     height: auto;
//     min-height: 40px;
//     line-height: 40px;
//     text-align: left;
//     text-indent: 0px !important;
//     vertical-align: top;
//   }
// }
// .float-left {
//   float: left;
// }
// .float-right {
//   float: right;
// }
// .cancel-reason {
//   width: 220px;
//   margin-right: 10px;
//   margin-bottom: 10px;
//   text-align: center;
// }
// .widths40 {
//   width: 44%;
// }
// .widths15 {
//   width: 12.8%;
// }
// .width15{
//   width: 15%;
// }
// .width40 {
//   width: 38%;
// }
// .width15 {
//   width: 15%;
// }
// .width20 {
//   width: 20%;
// }
// .width10 {
//   width: 10.3%;
// }
// .height220 {
//   height: 220px !important;
// }
// .line {
//   .container-size(inline-block, 1px, 170px, 0 auto, 0px);
//   border-right: 1px solid #e0e0e0;
//   margin-bottom: 15px;
//   margin-top: 20px;
// }
// .bread {
//   .container-size(block, 1190px, 50px, 0 auto, 0px);
//   line-height: 50px;
//   background: #ffffff;
// }
// .step-box {
//   .container-size(block, 1190px, 220px, 0 auto, 0px);
//   border-top: 3px solid #ed3025;
//   margin-bottom: 20px;
//   border: 1px solid #f8f8f8;
//   .step-left {
//     float: left;
//     .container-size(inline-block, 300px, 220px, 0 auto, 0px);
//     .order-num {
//       color: #999999;
//     }
//     .pay-success {
//       font-size: 18px;
//       color: #ed3025;
//       font-weight: bold;
//     }
//     p {
//       .p-size(46px, 46px, 16px, center, 0px, #666666);
//     }
//     .cancel {
//       position: relative;
//       bottom: -40px;
//       left: 0px;
//     }
//     .cancel:hover {
//       cursor: pointer;
//     }
//     .pay-btn {
//       .p-size(36px, 36px, 16px, center, 0px, #ffffff);
//       button {
//         .button-size(100px, 36px, 36px, 14px, 0px, 5px);
//         background: #ed3025;
//         border: none;
//       }
//     }
//   }
//   .step-right {
//     .container-size(inline-block, 879px, 220px, 0 auto, 0px);
//     padding: 0px 20px;
//     .setps-box {
//       .position(relative, -120px, 0px);
//     }
//   }
// }
// .logistics-box-info {
//   .container-size(block, 1190px, 260px, 0 auto, 0px);
//   margin-bottom: 20px;
//   border: 1px solid #f8f8f8;
//   .logistics-left {
//     float: left;
//     .container-size(inline-block, 300px, 260px, 0 auto, 0px);
//     padding-top: 30px;
//     p {
//       .p-size(55px, 55px, 16px, center, 0px, #666666);
//     }
//   }
//   .logistics-right {
//     .position(relative, -40px, 0px);
//     .container-size(inline-block, 879px, 200px, 0 auto, 0px);
//     overflow: auto;
//     padding: 15px 15px;
//   }
// }
// .consignee-info {
//   .container-size(block, 1190px, 255px, 0 auto, 0px);
//   margin-bottom: 20px;
//   border: 1px solid #f8f8f8;
//   .consignee-left,
//   .consignee-middle,
//   .consignee-right {
//     .container-size(inline-block, 389px, 255px, 0 auto, 0px);
//     padding-top: 10px;
//     h3 {
//       .p-size(30px, 30px, 14px, center, 0px, #666666);
//       font-weight: bold;
//     }
//     p {
//       .p-size(30px, 30px, 14px, left, 20px, #999999);
//       span {
//         display: inline-block;
//         width: 120px;
//       }
//       .three {
//         width: 85px !important;
//       }
//     }
//   }
//   .consignee-middle {
//     margin-left: 10px;
//   }
// }
// .goods-title {
//   display: block;
//   width: 1190px;
//   margin: 0 auto;
//   .p-size(55px, 55px, 18px, left, 0px, #666666);
//   background: #eeeeee;
//   margin-bottom: 10px;
//   span {
//     display: inline-block;
//     height: 55px;
//     text-align: center;
//   }
// }
// .goods-list-box {
//   .container-size(block, 1190px, auto, 0 auto, 0px);
//   min-height: 380px;
//   margin-bottom: 15px;
//   border: 1px solid #eeeeee;
//   table {
//     .container-size(block, 1190px, auto, 0 auto, 0px);
//     .ablock {
//       display: block;
//       width: 1190px;
//       .p-size(50px, 50px, 16px, left, 20px, #333333);
//       border-bottom: 1px solid #eeeeee;
//       i {
//         margin-right: 10px;
//         font-size: 18px;
//       }
//     }
//     .t-body {
//       .container-size(block, 1190px, auto, 0 auto, 0px);
//       min-height: 120px;
//       .goods-list {
//         .container-size(inline-block, 1000px, 120px, 0 auto, 0px);
//         border-right: 1px solid #e0e0e0;
//         border-bottom: 1px solid #e0e0e0;
//         .td-center {
//           text-align: center;
//           line-height: 120px;
//         }
//         .padding-left10 {
//           padding-left: 8px;
//         }
//         .padding-left15 {
//           padding-left: 15px;
//         }
//         .padding-left5 {
//           padding-left: 24px;
//         }
//         .subtotal {
//           color: #ed3025;
//         }

//         td {
//           display: inline-block;
//           height: 100%;
//         }
//         .pic-box {
//           display: table;
//           float: left;
//           div {
//             display: table-cell;
//             vertical-align: middle;
//             height: 100%;
//             padding-left: 20px;
//             img {
//               float: left;
//               width: 75px;
//               height: 75px;
//             }
//             span {
//               display: inline-block;
//               width: 77%;
//               margin-left: 10px;
//               margin-top: 3px;
//             }
//           }
//         }
//         .price {
//           float: left;
//         }
//       }
//       .total {
//         float: right;
//         width: 190px;
//         height: 100%;
//         text-align: center;
//         padding-top: 48px;
//         min-height: 120px;
//         // background: #f8f8f8;
//         // border-left: 1px solid #eeeeee;
//         font-size: 18px;
//         font-weight: bold;
//         color: #ed3025;
//       }
//     }
//     .t-footer {
//       .container-size(block, 1190px, 210px, 0 auto, 0px);
//       .pay-title {
//         .container-size(inline-block, 992px, 210px, 0 auto, 0px);
//         float: left;
//         padding: 20px 0px;
//         p {
//           .p-size(40px, 40px, 16px, right, 20px, #333333);
//         }
//         .red-size {
//           color: #ed3025;
//         }
//       }
//       .pay-count {
//         .container-size(inline-block, 190px, 210px, 0 auto, 0px);
//         float: right;
//         background: #f8f8f8;
//         padding: 20px 0px;
//         p {
//           .p-size(40px, 40px, 16px, center, 0px, #333333);
//         }
//         .total-red {
//           font-size: 24px !important;
//           color: #ed3025 !important;
//         }
//       }
//     }
//   }
// }
</style>
