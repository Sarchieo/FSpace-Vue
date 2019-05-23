<template>
  <div>
     <!-- v-for="(item,index) in orderList" :key="index" -->
    <a-tabs defaultActiveKey="" @change="callback">
      <a-tab-pane tab="全部订单" key=""></a-tab-pane>
      <a-tab-pane tab="未付款" key="0"></a-tab-pane>
      <a-tab-pane tab="待发货" key="1"></a-tab-pane>
      <a-tab-pane tab="已发货" key="2"></a-tab-pane>
      <a-tab-pane tab="已签收" key="3"></a-tab-pane>
      <a-tab-pane tab="售后" key="-1"></a-tab-pane>
      <a-tab-pane tab="售后中" key="-2"></a-tab-pane>
      <a-tab-pane tab="售后完成" key="-3"></a-tab-pane>
      <a-tab-pane tab="取消交易" key="-4"></a-tab-pane>
    </a-tabs>
    <div class="screen">
      <span>订单号:</span> <a-input v-model="orderNo" placeholder="输入订单号搜索" />
      <span>下单时间：</span>
      <a-range-picker
        :placeholder="['开始日期', '结束日期']"
         format="YYYY-MM-DD"
        :value="monthValue"
        @change="handlePanelChange"
      >
      <a-icon slot="suffixIcon" type="smile" />
      </a-range-picker>
      <a-button class="search-btn" @click="queryOrderList()">搜索</a-button>
    </div>
    <p class="table-title">
       <!-- <a-checkbox
        :disabled="item.status == 1 || item.status == 2 || item.status == 3 || item.maximum == 0"
        @change="onChange"
        :value="item"
        v-model="item.checked"
        class="pick-input"
      ></a-checkbox> -->
      <!-- <a-checkbox
          @change="onChange"
          class="pick-input margin-left12"
      ></a-checkbox> <span>全选</span> -->
      <span class="width45">订单详情</span>
      <!-- <span class="width13">单价</span> -->
      <!-- <span class="width13">数量</span> -->
      <!-- <span class="width11">订单操作</span> -->
      <span class="width10">订单状态</span>
      <span class="width10">结算状态</span>
      <span class="width15">金额</span>
      <span class="width13">操作</span>

    </p>
    <ul class="order-box" v-if="this.orderList.length !== 0 ">
      <li v-for="(item,index) in orderList" :key="index" class="order-box-li">
        <!-- <p class="order-info-text">
          <span class="time">{{item.odate}}</span>
          <span>订单号：{{item.orderno}}</span>
          <a-tooltip class="share">
            <template slot="title">删除</template>
            <a-icon type="delete" @click="showDeleteConfirm(item)"/>
          </a-tooltip>
        </p> -->
        <div style="float:left;overflow: hidden;">
          <div class="goods-box">
             <!-- <a-checkbox
                @change="onChange"
                class="pick-input margin-left12 margin-top62"
             ></a-checkbox> -->
            <div class="goods-pic">
              <!-- <img v-lazy="item.goods[0].imgURl" @click="toDetail(item)"> -->
              <img v-lazy="item.goods[0].imgURl" @click="toDetail(item)">
              <!-- <span class="time">{{item.odate}}</span> -->
              <p class="order-info"><span>订单号：</span> <span>{{item.orderno}}</span></p>
              <p class="order-info"><span>下单时间：</span> <span>{{item.odate}} {{item.otime}}</span></p>
              <p class="order-info">订单内共{{item.goods.length}}种商品</p>
              <!-- <p class="goods-text" @click="toDetail(items)">{{items.pname}}</p>
              <p class="guige">规格：{{items.pspec}}</p>
              <p class="menu-name">{{items.manun}}</p> -->
              <!-- <p class="date">有效期：2019-04-12</p> -->
            </div>
             <div class="state">
              <p class="sucess">{{statusText(item)}}</p>
            </div>

             <div class="state">
              <p class="sucess">{{setstatusText(item.settstatus)}}</p>
            </div>
            <!-- <div class="pay count-div">
              <p>{{items.pnum}}</p>
            </div> -->

            <!-- <div class="pay price-div">
              <p class="price-p">￥{{items.pdprice}}</p>
            </div> -->
            <div class="pay fact-div">
              <p class="shiji">￥{{item.payamt}}</p>
              <p class="freight">(含运费{{item.freight}}元)</p>
            </div>
            <div class="operation">
            <p class="button-p" v-if="item.ostatus == 0 && item.payway == -1">
              <a-button @click="toPay(item)" type="primary" class="confirm-btn">付款</a-button>
            </p>
            <!-- <p class="button-p" v-if="item.ostatus == 2"><a-button type="primary" class="confirm-btn">确认收货</a-button></p> -->
            <!-- v-if="item.ostatus == 3" -->
            <p class="detail" @click="confirmReceipt(item)" v-if="item.ostatus == 3">确认签收</p>
            <p class="detail" @click="afterApply(item)" v-if="item.ostatus == 3 || item.ostatus == 4">申请售后</p>
            <p @click="toEvaluate(item)" v-if="item.ostatus == 4 && (item.cstatus&128) == 0" ref="toevaluate">
              评论
            </p>
            <p
              class="canle-order"
              v-if="canCancel(item)"
              @click="isShowCancel(item)">取消订单</p>
            <p class="detail" @click="toDetails(item)">订单详情</p>
            <p class="detail" @click="viewLogistics(item)" v-if="item.ostatus >= 2 && item.ostatus != -4">查看物流</p>
            <p v-if="item.ostatus == 4" @click="reOrder(item)" class="align">再次购买</p>
            <p  v-if="item.ostatus == -4 || item.ostatus == 4" @click="deleteOrder(item)" class="del-order">删除</p>
            <!-- v-if="item.ostatus == 3" -->
            <p @click="toSuppInvo(item)" class="supplement" v-if="(item.ostatus == 3 || item.ostatus == 4) && (item.cstatus&256)==0">补开发票</p>
            <!-- <p @click="toSuppInvo(item)">补开发票</p> -->
          </div>
          </div>
        </div>
        <div style="clear: both;"></div>
      </li>
      <a-pagination v-if="this.orderList.length !== 0 " @change="onChangePage" :total="total"/>
    </ul>
    <div class="no-data" v-if="this.orderList.length == 0">
      <p class="icon">
        <a-icon type="exclamation"/>
      </p>
      <p class="text">没有查询到订单！</p>
      <!--<p @click="toSuppInvo(item)">补开发票</p>-->
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
        <div class="retreat-right" @click="changeType('1')">
          <p>
            <img src="../../../assets/img/u6507.png" alt class="retreat-p">
          </p>
          <p class="retreat-text">退货退款</p>
          <p>
            <input type="radio" v-model="asType" id="radio1" name="radio1" :value="1">
          </p>
        </div>
        <div class="retreat-left" @click="changeType('2')">
          <p>
            <img src="../../../assets/img/u6490.png" alt class="retreat-p">
          </p>
          <p class="retreat-text">仅退款</p>
          <p>
            <input type="radio" v-model="asType" id="radio2" name="radio1" :value="2">
          </p>
        </div>
      </div>
    </a-modal>

    <a-modal title="提示" v-model="visible" @ok="cancelOrder()" @cancel="thinkAgain()" okText="提交" cancelText="再想想">
      <p>订单取消成功后将无法恢复</p>
      <p>优惠券不再返还，支付优惠也将一并取消</p>
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

    <a-modal title="物流信息" v-model="isLogistics" okText="确定"  cancelText="取消" @ok="isLogistics = false">
      <div v-if="isLogistics">
        <a-steps direction="vertical" size="small" :current="logistixs.node.length -1 ">
          <a-step
            v-for="(item, index) in logistixs.node"
            :key="index"
            :title="item.status"
            :description="item.date + item.time + item.des"
          />
        </a-steps>
      </div>
    </a-modal>
    <!-- <input type="radio" id="radio1" name="radio1" />
    <input type="radio" id="radio2" name="radio1" />-->
  </div>
</template>
<script>
import FSpaceOrder from "../../../components/table/order";
import * as types from "../../../store/mutation-types";

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
      mode1: 'time',
      mode2: ['month', 'month'],
      monthValue: [],
      orderNo: '', // 输入搜索订单
      cancelOrderNo: {},//要取消的订单
      asType: "2",
      isApply: false,
      goodsArr: [],
      visible: false,
      currentIndex: 1,
      total: 0,
      isLogistics: false,
      ostatus: "", // 订单状态
      orderList: [],
      logistixs: [],
      year: '',
      sDate: '',
      eDate: '',
      startValue: null,
      endValue: null,
    };
  },
  mounted() {
    this.$store.commit(types.SELECTED_KEYS, "/user/personal/myorder");
    this.queryOrderList()
  },
  methods: {
    changeType(val) {
      this.asType = val;
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber;
      this.queryOrderList();
    },
    afterApply(item) {
      this.isApply = true;
      this.goodsArr = item.goods;
      this.orderno = item.orderno;
    },
    pickCancel() {
      this.isApply = false;
    },
    pickOK() {
      let arr = this.goodsArr.map(value => {
        return {
          pname: value.pname,
          pspec: value.pspec,
          manun: value.manun,
          checked: false,
          pdprice: value.pdprice,
          pnum: value.pnum,
          payamt: value.payamt,
          pdno: value.pdno,
          orderno: value.orderno,
          compid: value.compid,
          spu: value.spu
        };
      });
      sessionStorage.setItem("afterSaleGoods", JSON.stringify(arr));
      this.$router.push({
        path: "/order/after-sale",
        query: {
          orderno: this.orderno,
          asType: this.asType
        }
      });
    },
    // 查询订单列表
    queryOrderList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderInfoModule";
      iRequest.method = "queryOrders";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.arrays = [this.year,this.ostatus, this.orderNo, '', this.sDate, this.eDate];
      console.log(this.sDate, this.eDate)
      iRequest.param.pageIndex = this.currentIndex;
      iRequest.param.pageNumber = 10;
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor(this.storeInfo.comp.storeId / 8192 % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.orderList = result.data;
            _this.total = result.total;
            _this.currentIndex = result.pageNo;
            _this.orderList.forEach(item => {
              _this.fsGeneralMethods.addImages(
                _this,
                item.goods,
                "pdno",
                "spu"
              );
            });
          }
        })
      );
    },
    // 重新购买
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
          if (result.code == 200) {
            _this.$message.success('购物车添加成功')
          }
        })
      );
    },
    showDeleteConfirm(item) {
      let _this = this;
      this.$confirm({
        title: "您确定要删除此订单?",
        content: "删除后，您将不能查询到该订单的信息！",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.deleteOrder(item);
        },
        onCancel() {}
      });
    },
    handleOk(e) {
      this.visible = false;
    },
    handleCancel(e) {
      this.visible = false;
    },
    viewLogistics(item) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderOptModule";
      iRequest.method = "getLogisticsInfo";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        orderno: item.orderno,
        compid: this.storeInfo.comp.storeId
      });
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200 && result.data.node.length > 0) {
            _this.logistixs = result.data;
            _this.isLogistics = true;
          }else {
            _this.$message.error('暂无物流信息')
          }
        })
      );
    },
    toDetails(item) {
      var routeData = this.$router.resolve({
        path: "/user/order-detail",
        query: {
          orderno: item.orderno,
          cusno: item.cusno
        }
      });
      window.open(routeData.href, "_blank");
    },
    callback(key) {
      this.ostatus = key;
      this.currentIndex = 1;
      this.queryOrderList();
    },
    toEvaluate(value) {
      sessionStorage.setItem("evaluateGoods", JSON.stringify(value.goods));
      var routeData = this.$router.resolve({
        path: "/user/evaluate",
        query: {
          orderno: value.orderno
        }
      });
      window.open(routeData.href, "_blank");
    },
    statusText(val) {
      var text = "";
      switch (val.ostatus) {
        case 0:
          text = "未付款";
          break;
        case 1:
          text = "待发货";
          break;
        case 2:
          text = "已发货";
          break;
        case 3:
          text = "已签收";
          break;
        case 4:
          text = "已完成";
          break;
        case -1:
          text = "申请售后";
          break;
        case -2:
          text = "申请售后中";
          break;
        case -3:
          text = "售后完成";
          break;
        case -4:
          text = "已取消";
          break;
      }
        // if (val.payway == 4 && val.ostatus == 1 && val.settstatus == 0){
        //     text = "待发货"
        // }
        // if (val.payway == 5 && val.ostatus == 1 && val.settstatus == 0){
        //     text = "待发货"
        // }
        return text;
    },
      setstatusText(settstatus) {
          if (settstatus==0) {
              return "未结算"
          } else if (settstatus==1) {
              return "已结算"
          } else {
              return "已退款";
          }
      },
    isShowCancel(item) {
        this.cancelOrderNo = {
            orderno: item.orderno,
            ostatus: item.ostatus,
            payway: item.payway
        };
        this.visible = true;
    },
      //是否可以取消订单
      canCancel(item) {
        let date = item.odate + " " + item.otime;
        date = date.substring(0,19);
        date = date.replace(/-/g,'/');
        var timestamp = new Date(date).getTime();
        var timestampNow = parseInt(new Date().getTime());    // 当前时间戳
        var times = timestampNow - timestamp;
        var thirtyMin = 30 * 60 * 1000;
        if (item.payway == 4 && item.ostatus ==0 && times < thirtyMin){
            return true
        }
        if (item.payway == 5 && item.ostatus == 1 && times < thirtyMin) {
            return true
        }
        if (item.ostatus == 0 && item.payway == -1) {
            return true
        }
      },
    // 删除订单
    deleteOrder(item) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderOptModule";
      iRequest.method = "deleteOrder";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        orderno: item.orderno,
        cusno: item.cusno
      });
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.visible = false;
            _this.$message.success(result.message);
            _this.queryOrderList();
          }
        })
      );
    },
      // 确认签收
      confirmReceipt(item) {
          let _this = this;
          this.$confirm({
              title: "是否要确认签收?",
              okText: "确定",
              okType: "danger",
              cancelText: "取消",
              onOk() {
                  _this.conReceipt(item);
              },
              onCancel() {}
          });
      },
      //确认签收
      conReceipt(item) {
        let _this = this;
        let iRequest = new inf.IRequest();
        iRequest.cls = "OrderOptModule";
        iRequest.method = "confirmReceipt";
        iRequest.param.token = localStorage.getItem("identification");
        iRequest.param.json = JSON.stringify({
            orderno: item.orderno,
            cusno: item.cusno
        });
        this.$refcallback(
            this,
            "orderServer" +
            Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
            iRequest,
            new this.$iceCallback(function result(result) {
                if (result.code == 200) {
                    _this.$message.success(result.message);
                    _this.queryOrderList();
                }
            })
        );
      },
      thinkAgain(){
          this.cancelOrderNo = {}
      },
    // 取消订单
    cancelOrder() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "TranOrderOptModule";
      if (this.cancelOrderNo.ostatus == 0 && this.cancelOrderNo.payway == -1) {
          iRequest.method = "cancelOrder";
      } else {
          iRequest.method = "cancelOffLineOrder";
      }
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        orderno: this.cancelOrderNo.orderno,
        cusno: this.storeInfo.comp.storeId
      });
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code == 200) {
            _this.visible = false;
            _this.queryOrderList();
          }
        })
      );
    },
    handlePanelChange (value, mode) {
      this.monthValue = value
      if(value.length === 0) {
        this.sDate = ''
        this.eDate = ''
        return
      }
      this.startValue = value[0]
      this.endValue = value[1]
      this.year = new Date(value[0]).getFullYear()
      let startDate = new Date(value[0])
      let endDate = new Date(value[1])
      if(startDate.getFullYear() != endDate.getFullYear()) {
        this.$message.error('结束年份必须为' + startDate.getFullYear())
        return
      }
      this.sDate = startDate.getFullYear() + '-' + this.timeAdd0(startDate.getUTCMonth()+1) + '-' + this.timeAdd0(startDate.getUTCDate())
      this.eDate = endDate.getFullYear() + '-' + this.timeAdd0(endDate.getUTCMonth()+1) + '-' + this.timeAdd0(endDate.getUTCDate())

    },
    timeAdd0(str) {
      if(String(str).length<=1){
          str='0'+str;
      }
      return str
    },
    toPay(item) {
      var routeData = this.$router.resolve({
        path: "/order/pay",
        query: {
          orderno: item.orderno
        }
      });
      window.open(routeData.href, "_blank");
    },
    saleAfter() {
      this.visible = true;
    },
    onChange() {
      console.log(1)
    },
    toSuppInvo(item) {
      this.$router.push({
        path: "/order/patch-invo",
        query: {
          orderno: item.orderno
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";

.order-box-li:hover {
  border: 1px solid #e0e0e0;
}
.del-order:hover{
  color: #ed3025;
}
.supplement:hover{
  cursor: pointer;
  color: #ed3025;
}
.align:hover{
  cursor: pointer;
  color: #ed3025;
}
.share:hover{
  cursor: pointer;
  color: #ed3025;
}
.margin-left12{
  margin-left:12px;
}
.margin-top62{
  margin-top: 62px;
}
.screen{
  .container-size(block, 960px, 55px, 0 auto, 0px);
  // padding-top: 8px;
  margin-bottom: 12px;
  line-height: 50px;
}
.ant-input{
  width: 230px!important;
  border: 1px solid #f2f2f2;
  border-radius: 0px!important;
}
.search-btn{
  .button-size(98px,36px,36px,14px,0px,3px);
  .button-color(1px solid transparent,#ed3025,#ffffff);
  margin-left: 30px;
}
.search-btn:hover{
  cursor: pointer;
}
.width13{
  width: 14%;
}
.width45 {
  // .position(relative, 0px, 0px);
  float: left;
  width: 49.2%;
  img {
    // .position(bsolute, 14px, 14px);
    float: left;
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
}
.width10 {
  width: 10.8%;
}
.width11 {
  width: 13.5%;
}
.width15{
  width: 15%;
}
.width12 {
  width: 13%;
}
.order-info{
  float: left;
  width: 265px;
  .p-size(30px, 30px, 16px, left, 0px, #666666);
}
.table-title {
  .p-size(50px, 50px, 16px, center, 0px, #666666);
  display: block;
  width: 960px;
  margin: 0 auto;
  background: #f8f8f8;
  span {
    display: inline-block;
    float: left;
    height: 50px;
    line-height: 50px;
  }
}
.order-box {
  .container-size(block, 985px, auto, 0 auto, 0px);
  overflow: auto;
  li {
    .container-size(block, 960px, auto, 0 auto, 0px);
    .container-color(#ffffff, 1px solid #f8f8f8, #666666);
    // margin-top: 10px;
    // margin-bottom: 10px;
    .order-info-text {
      .p-size(45px, 45px, 16px, left, 20px, #666666);
      background: #f8f8f8;
      .time {
        font-weight: bold;
      }
      .yikuai {
        margin-right: 38px;
      }
      .contact:hover {
        cursor: pointer;
        color: #ed3025;
      }
      .share {
        margin-left: 485px;
      }
      i {
        font-size: 18px;
      }
      span {
        margin-right: 23px;
      }
    }
    .goods-box {
      // .container-size(inline-block, 820px, 108px, 0 auto, 0px);
      width: 960px;
      height: 160px;
      margin: 0px;
      border-top: 1px solid #f8f8f8;
      border-right: 1px solid #f8f8f8;
      div {
        display: inline-block;
        height: 160px;
      }
      .goods-pic {
        float: left;
        width: 470px;
        height: 160px;
        padding-top: 30px;
        padding-left: 10px;
        img {
          float: left;
          width: 95px;
          height: 95px;
          margin-right: 5px;
        }
        .goods-text {
          // .position(absolute, 10px, 110px);
          width: 200px;
          height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
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
        .menu-name {
          // .position(absolute, 55px, 110px);
          width: 200px;
          height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333333;
        }
        .date {
          .position(absolute, 75px, 110px);
          width: 200px;
          height: 25px;
        }
      }
      .count,
      .sale,
      .price {
        float: left;
        padding: 10px 0px;
        .button-p {
          height: 32px !important;
        }
        p {
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #3189f5;
          a {
            color: #3189f5;
          }
        }
      }
      .operation:hover {
        cursor: pointer;
        color: #ed3025;
      }
      .sale p:hover {
        cursor: pointer;
        color: #ed3025;
      }
      .state {
        float: left;
        width: 103px;
        height: 160px;
        line-height: 140px;
        border-left: 1px solid #f8f8f8;
        border-right: 1px solid #f8f8f8;
        .sucess {
          // .position(absolute, 28px, 0px);
          width: 100%;
          text-align: center;
          // color: #3189f5;
        }
        .detail {
          // .position(absolute, 56px, 0px);
          width: 100%;
          text-align: center;
          color: #3189f5;
        }
      }
    }
  }
}
.paging {
  float: right;
  margin-right: 20px;
}
.pay {
  float: left;
}
.price-div {
  float: left;
  width: 104px;
  text-align: center;
  line-height: 108px;
  color: #ed3025;
}
.count-div {
  float: left;
  width: 104px;
  text-align: center;
  line-height: 108px;
}
.fact-div {
  float: left;
  width: 144px;
  padding: 60px 0px;
  p {
    text-align: center;
    color: #ed3025 !important;
  }
}
.ant-pagination {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.confirm-btn {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
}
.canle-order {
  color: #999999 !important;
}
.no-data {
  .container-size(block, 943px, 200px, 0 auto, 0px);
  padding-top: 20px;
  .icon {
    .p-size(50px, 50px, 18px, center, 0px, #333333);
    i {
      font-size: 40px;
    }
  }
  .text {
    .p-size(50px, 50px, 18px, center, 0px, #333333);
  }
}
.price-p {
  color: #ed3025 !important;
}
.retreat div:hover {
  cursor: pointer;
  border: 1px solid #ed3025;
}
.detail:hover {
  cursor: pointer;
  color: #ed3025;
}
.retreat-text {
  margin-bottom: 3px;
}
.retreat div:hover .retreat-text {
  color: #ed3025;
}
.retreat {
  .container-size(block, 300px, 150px, 0 auto, 0px);
  div {
    border: 1px solid #e0e0e0;
    padding: 40px 0px 20px 0px;
    p {
      text-align: center;
    }
    .retreat-check {
      float: right;
      margin-right: 15px;
    }
  }
  .retreat-left {
    float: left;
    .container-size(inline-block, 140px, 150px, 0, 0px);
  }
  .retreat-right {
    float: right;
    .container-size(inline-block, 140px, 150px, 0, 0px);
  }
}
.operation {
  float: right;
  overflow: hidden;
  width: 135px;
  // height: 108px;
  // height: auto;
  // border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #f2f2f2;
  padding-top: 4px;
  p {
    text-align: center;
    color: #3189f5;
  }
}
.cancel-reason {
  width: 220px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.a {
  width: 220px;
}
.pick-input{
  float: left;
}
</style>
