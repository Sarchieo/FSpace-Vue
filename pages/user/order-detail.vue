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
        <div v-for="(item,index) in orderDetail" :key="index">
          <div class="step-box">
            <div class="step-left">
              <p class="order-num">订单编号：{{item.orderno}}</p>
              <!-- 显示药品列表相对应的订单状态 -->
              <p class="pay-success" v-if="item.ostatus === 0">提交订单</p>
              <p class="pay-success" v-if="item.ostatus === 2">等待收货</p>
              <p class="pay-success" v-if="item.ostatus === 3">已签收</p>
              <p class="pay-success" v-if="item.ostatus === 4">已完成</p>
              <p class="pay-success" v-if="item.ostatus === -4">已取消</p>
              <p class="pay-success" v-if="item.ostatus === 1">付款成功</p>
              <!-- 付款按钮和提交订单一起显示 -->
              <p class="pay-btn" v-if="item.ostatus === 0">
                <button @click="toPay()">付款</button>
              </p>
              <!-- 确认收货和等待收货一起显示 -->
              <!--<p class="pay-btn" v-if="item.ostatus === 2"><button>确认收货</button></p>-->
              <!-- 再次购买和已取消以及完成一起显示 -->
              <p class="pay-btn" v-if="item.ostatus === 3">
                <button>再次购买</button>
              </p>
              <!-- 取消订单只在提交订单和付款成功状态才显示。药品出库后没有取消订单 -->
              <p
                class="cancel"
                @click="cancelOrder()"
                v-if="item.ostatus === 1 || item.ostatus === 0"
              >取消订单</p>
            </div>
            <div class="line"></div>
            <!-- 订单状态 -->
            <div class="step-right" v-if="item.ostatus !== -4">
              <a-steps class="setps-box" :current="steps">
                <a-step title="提交订单">
                  <a-icon type="profile" slot="icon"/>
                </a-step>
                <a-step title="付款成功">
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
          <div
            class="logistics-box-info"
            v-if="item.ostatus >= 2 && item.ostatus != -4 && logistixs.node && logistixs.node.length > 0"
          >
            <!-- <div class="logistics-box-info"> -->
            <div class="logistics-left">
              <!-- <p>送货方式：普通快递</p>
              <p>承运人： 中国邮政</p> -->
              <p>货运单号：{{ logistixs.billno }}</p>
            </div>
            <div class="line height220"></div>
            <div class="logistics-right">
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
          <div class="consignee-info">
            <div class="consignee-left float-left">
              <h3>收货人信息</h3>
              <p>
                <span class="three">收货人：</span>
                {{ storeInfo.comp.storeName }}
              </p>
              <p class="address">
                <span class="three">地址：</span>
                <span class="address-goods">{{ storeInfo.comp.address }}</span>
              </p>
              <p>
                <span class="three">手机号:</span>
                {{ storeInfo.phone }}
              </p>
            </div>
            <div class="line height220 float-left"></div>
            <div class="consignee-middle float-left">
              <h3>付款信息</h3>
              <p>
                <span>付款方式：</span>  {{payText(item.payway)}}
              </p>
              <p>
                <span>商品总额：</span>
                ￥ {{item.pdamt}}元
              </p>
              <p>
                <span>运费金额：</span>
                ￥ {{item.freight}}元
              </p>
              <p>
                <span>优惠金额：</span>
                ￥ {{item.distamt}}元
              </p>
              <p>
                <span>应支付金额：</span>
                ￥ {{item.payamt}}元
              </p>
            </div>
            <div class="line height220"></div>
            <div class="consignee-right float-right">
              <h3>发票信息</h3>
              <p>
                <span>发票类型：</span>不开发票
              </p>
            </div>
          </div>
          <p class="goods-title">
            <span class="width40">药品信息</span>
            <span class="width10">单价</span>
            <span class="width10">数量</span>
            <span class="width10">优惠金额</span>
            <span class="width10">小计</span>
            <span class="width15 float-right">总计</span>
          </p>
          <div class="goods-list-box">
            <table>
              <thead class="ablock">
                <p>
                  <a-icon type="shop"/>
                  <span>一块医药</span>
                </p>
              </thead>
              <tbody class="t-body" v-for="(items,index1) in item.goods" :key="index1">
                <div style="float:left;width: 1000px;">
                  <tr class="goods-list">
                  <td class="pic-box widths40">
                    <div>
                      <img :src="items.imgURl">
                      <span class="goods-name">{{items.pname}}</span>
                      <span>{{items.pspec}}</span>
                      <span>{{items.manun}}</span>
                      <!-- <p class="spec">0.25g*30片</p>
                      <p class="manufactor"></p>-->
                    </div>
                  </td>
                  <td class="price widths15 td-center padding-left5">￥{{items.pdprice}}</td>
                  <td class="count widths15 td-center padding-left5">{{items.pnum}}</td>
                  <td class="subtotal widths15 td-center padding-left10">￥{{items.distprice}}</td>
                  <td class="subtotal widths15 td-center padding-left10">￥{{items.payamt}}</td>
                  <!-- <div style="clear: both;"></div> -->
                  <!-- <td class="total width15 td-center padding-left15">
                  ￥35
                  </td>-->
                </tr>
                </div>
                

                <div class="total td-center padding-left15">￥{{item.payamt}}</div>
                <div style="clear: both;"></div>
              </tbody>
              <tfoot class="t-footer">
                <div class="pay-title">
                  <p>商品总额：</p>
                  <p>运费：</p>
                  <p>优惠活动：</p>
                  <p class="red-size">应付总额：</p>
                </div>
                <div class="pay-count">
                  <p>￥{{item.pdamt}}</p>
                  <p>￥{{item.freight}}</p>
                  <p>￥{{item.distamt}}</p>
                  <p class="total-red">￥{{item.payamt}}</p>
                </div>
              </tfoot>
            </table>
          </div>
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
          } else {
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
            console.log(6767)
            console.log(_this.orderDetail)
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
            }
          }
        })
      );
    },
    payText(type) {
      var text = ''
      switch(type){
        case 0:
        text = '余额支付'
        break;
        case 1:
        text = '微信支付'
        break;
        case 2:
        text = '支付宝支付'
        break;
        case 3:
        text = '银联支付'
        break;
        case 4:
        text = '货到付款'
        break;
        case 5:
        text = '线下支付'
        break;
      }
      return text
    },
    cancelOrder() {
      this.visible = true;
    },
    // 取消订单
    hideModal() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "TranOrderOptModule";
      iRequest.method = "cancelOrder";
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
  background: #ffffff;
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
.float-right{
  float: right;
}
.address {
  height: auto !important;
  line-height: 40px !important;
  .address-goods {
    width: 270px !important;
    height: auto;
    min-height: 40px;
    line-height: 40px;
    text-align: left;
    text-indent: 0px !important;
    vertical-align: top;
  }
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.cancel-reason {
  width: 220px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.widths40 {
  width: 44%;
}
.widths15 {
  width: 12.8%;
}
.width15{
  width: 15%;
}
.width40 {
  width: 38%;
}
.width15 {
  width: 15%;
}
.width20 {
  width: 20%;
}
.width10 {
  width: 10.3%;
}
.height220 {
  height: 220px !important;
}
.line {
  .container-size(inline-block, 1px, 170px, 0 auto, 0px);
  border-right: 1px solid #e0e0e0;
  margin-bottom: 15px;
  margin-top: 20px;
}
.bread {
  .container-size(block, 1190px, 50px, 0 auto, 0px);
  line-height: 50px;
  background: #ffffff;
}
.step-box {
  .container-size(block, 1190px, 220px, 0 auto, 0px);
  border-top: 3px solid #ed3025;
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  .step-left {
    float: left;
    .container-size(inline-block, 300px, 220px, 0 auto, 0px);
    .order-num {
      color: #999999;
    }
    .pay-success {
      font-size: 18px;
      color: #ed3025;
      font-weight: bold;
    }
    p {
      .p-size(46px, 46px, 16px, center, 0px, #666666);
    }
    .cancel {
      position: relative;
      bottom: -40px;
      left: 0px;
    }
    .cancel:hover {
      cursor: pointer;
    }
    .pay-btn {
      .p-size(36px, 36px, 16px, center, 0px, #ffffff);
      button {
        .button-size(100px, 36px, 36px, 14px, 0px, 5px);
        background: #ed3025;
        border: none;
      }
    }
  }
  .step-right {
    .container-size(inline-block, 879px, 220px, 0 auto, 0px);
    padding: 0px 20px;
    .setps-box {
      .position(relative, -120px, 0px);
    }
  }
}
.logistics-box-info {
  .container-size(block, 1190px, 260px, 0 auto, 0px);
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  .logistics-left {
    float: left;
    .container-size(inline-block, 300px, 260px, 0 auto, 0px);
    padding-top: 30px;
    p {
      .p-size(55px, 55px, 16px, center, 0px, #666666);
    }
  }
  .logistics-right {
    .position(relative, -40px, 0px);
    .container-size(inline-block, 879px, 200px, 0 auto, 0px);
    overflow: auto;
    padding: 15px 15px;
  }
}
.consignee-info {
  .container-size(block, 1190px, 255px, 0 auto, 0px);
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  .consignee-left,
  .consignee-middle,
  .consignee-right {
    .container-size(inline-block, 389px, 255px, 0 auto, 0px);
    padding-top: 10px;
    h3 {
      .p-size(40px, 40px, 16px, center, 0px, #666666);
      font-weight: bold;
    }
    p {
      .p-size(40px, 40px, 16px, left, 20px, #999999);
      span {
        display: inline-block;
        width: 120px;
      }
      .three {
        width: 85px !important;
      }
    }
  }
  .consignee-middle {
    margin-left: 10px;
  }
}
.goods-title {
  display: block;
  width: 1190px;
  margin: 0 auto;
  .p-size(55px, 55px, 18px, left, 0px, #666666);
  background: #eeeeee;
  margin-bottom: 10px;
  span {
    display: inline-block;
    height: 55px;
    text-align: center;
  }
}
.goods-list-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  min-height: 380px;
  margin-bottom: 15px;
  border: 1px solid #eeeeee;
  table {
    .container-size(block, 1190px, auto, 0 auto, 0px);
    .ablock {
      display: block;
      width: 1190px;
      .p-size(50px, 50px, 16px, left, 20px, #333333);
      border-bottom: 1px solid #eeeeee;
      i {
        margin-right: 10px;
        font-size: 18px;
      }
    }
    .t-body {
      .container-size(block, 1190px, auto, 0 auto, 0px);
      min-height: 120px;
      .goods-list {
        .container-size(inline-block, 1000px, 120px, 0 auto, 0px);
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        .td-center {
          text-align: center;
          line-height: 120px;
        }
        .padding-left10 {
          padding-left: 8px;
        }
        .padding-left15 {
          padding-left: 15px;
        }
        .padding-left5 {
          padding-left: 24px;
        }
        .subtotal {
          color: #ed3025;
        }

        td {
          display: inline-block;
          height: 100%;
        }
        .pic-box {
          display: table;
          float: left;
          div {
            display: table-cell;
            vertical-align: middle;
            height: 100%;
            padding-left: 20px;
            img {
              float: left;
              width: 75px;
              height: 75px;
            }
            span {
              display: inline-block;
              width: 77%;
              margin-left: 10px;
              margin-top: 3px;
            }
          }
        }
        .price {
          float: left;
        }
      }
      .total {
        float: right;
        width: 190px;
        height: 100%;
        text-align: center;
        padding-top: 48px;
        min-height: 120px;
        // background: #f2f2f2;
        // border-left: 1px solid #eeeeee;
        font-size: 18px;
        font-weight: bold;
        color: #ed3025;
      }
    }
    .t-footer {
      .container-size(block, 1190px, 210px, 0 auto, 0px);
      .pay-title {
        .container-size(inline-block, 992px, 210px, 0 auto, 0px);
        float: left;
        padding: 20px 0px;
        p {
          .p-size(40px, 40px, 16px, right, 20px, #333333);
        }
        .red-size {
          color: #ed3025;
        }
      }
      .pay-count {
        .container-size(inline-block, 190px, 210px, 0 auto, 0px);
        float: right;
        background: #f2f2f2;
        padding: 20px 0px;
        p {
          .p-size(40px, 40px, 16px, center, 0px, #333333);
        }
        .total-red {
          font-size: 24px !important;
          color: #ed3025 !important;
        }
      }
    }
  }
}
</style>
