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
        <div class="step-box">
          <div class="step-left">
            <p class="order-num">订单编号：20190329121009</p>
            <!-- 显示药品列表相对应的订单状态 -->
            <!-- <p>提交订单</p> -->
            <!-- <p>商品出库</p> -->
            <!-- <p>等待收货</p> -->
            <!-- <p>完成</p> -->
            <!-- <p>已取消</p> -->
            <p class="pay-success">付款成功</p>
            <!-- 付款按钮和提交订单一起显示 -->
            <!-- <p class="pay-btn"><button>付款</button></p> -->
            <!-- 确认收货和等待收货一起显示 -->
            <!-- <p class="pay-btn"><button>确认收货</button></p> -->
            <!-- 再次购买和已取消以及完成一起显示 -->
            <!-- <p class="pay-btn"><button>再次购买</button></p> -->
            <!-- 取消订单只在提交订单和付款成功状态才显示。药品出库后没有取消订单 -->
            <p class="cancel" @click="cancelOrder()">取消订单</p>
            <a-modal title="Modal" v-model="visible" @ok="hideModal" okText="提交" cancelText="再想想">
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
          <div class="line"></div>
          <div class="step-right">
            <a-steps class="setps-box">
              <a-step status="finish" title="提交订单">
                <a-icon type="profile" slot="icon"/>
              </a-step>
              <a-step status="finish" title="付款成功">
                <a-icon type="pay-circle" slot="icon"/>
              </a-step>
              <a-step status="wait" title="商品出库">
                <a-icon type="cloud-upload" slot="icon"/>
              </a-step>
              <a-step status="wait" title="等待收货">
                <a-icon type="car" slot="icon"/>
              </a-step>
              <a-step status="wait" title="完成">
                <a-icon type="check-square" slot="icon"/>
              </a-step>
            </a-steps>
          </div>
        </div>
        <div class="logistics-box-info">
          <div class="logistics-left">
              <p>送货方式：普通快递</p>
              <p>承运人： 中国邮政</p>
              <p>货运单号：5941557574860</p>
          </div>
          <div class="line height220">
          </div>
          <div class="logistics-right">
            <a-steps direction="vertical" size="small" :current="1">
                <a-step title="完成" description="2019-03-30 08：32：47您提交了订单，等待系统确认" />
                <a-step title="进行中" description="2019-03-30 09：32：47您付款成功，等待仓库出库" />
                <a-step title="未进行" description="2019-03-30 10：32：47仓库出货，准备分发至长沙仓库中心" />
                <a-step title="未进行" description="2019-03-30 11：32：47到达湘潭仓库中心，准备分发至易俗河仓库中心" />
                <a-step title="未进行" description="2019-03-30 12：32：47到达易俗河仓库中心，您准备接收快递" />
            </a-steps>
          </div>
        </div>
        <div class="consignee-info">
          <div class="consignee-left float-left">
              <h3>收货人信息</h3>
              <p><span>收货人：</span> 刘琦</p>
              <p class="address"><span>地址：</span>湖南省长沙市开福区马厂江畔豪庭88栋</p>
              <p><span>手机号:</span> 13688888888</p>
          </div>
          <div class="line height220 float-left"></div>
          <div class="consignee-middle float-left">
              <h3>付款信息</h3>
              <p><span>付款方式：</span>线上支付</p>
              <p><span>商品总额：</span>￥ 520元</p>
              <p><span>应支付金额：</span>￥ 520元</p>
              <p><span>运费金额：</span>￥ 0元</p>
          </div>
          <div class="line height220"></div>
          <div class="consignee-right float-right">
              <h3>发票信息</h3>
              <p><span>发票类型：</span>不开发票</p>
          </div>
        </div>
        <p class="goods-title">
          <span class="width40">药品信息</span>
          <span class="width15">单价</span>
          <span class="width15">数量</span>
          <span class="width15">小计</span>
          <span class="width15">总计</span>
        </p>
        <div class="goods-list-box">
          <table>
            <thead class="ablock">
              <p>
                <a-icon type="shop"/>
                <span>一块医药自营</span>
              </p>
            </thead>
            <tbody class="t-body"></tbody>
            <tfoot class="t-footer"></tfoot>
          </table>
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
      visible: false
    };
  },
  methods: {
    cancelOrder() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
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
.address{
    height: auto!important;
    line-height: auto!important;
    margin-bottom: 10px;
}
.float-left{
    float: left;
}
.float-right{
     float: right;
}
.cancel-reason {
  width: 220px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.width40 {
  width: 38%;
}
.width15 {
  width: 15%;
}
.height220 {
  height: 220px !important;
}
.line {
  .container-size(inline-block, 1px, 170px, 0 auto, 0px);
  border-right: 1px solid #e0e0e0;
  margin-bottom: 15px;
  margin-top: 15px;
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
    .setps-box{
        .position(relative,-120px,0px);
    }
  }
}
.logistics-box-info {
  .container-size(block, 1190px, 260px, 0 auto, 0px);
  margin-bottom: 20px;
  .logistics-left {
      float: left;
    .container-size(inline-block, 300px, 260px, 0 auto, 0px);
    p{
       .p-size(55px, 55px, 16px, center, 0px, #666666); 
    }
  }
  .logistics-right {
    .position(relative,-40px,0px);
    .container-size(inline-block, 879px, 200px, 0 auto, 0px);
    overflow: auto;
    padding: 15px 15px;
  }
}
.consignee-info {
  .container-size(block, 1190px, 255px, 0 auto, 0px);
  margin-bottom: 20px;
  .consignee-left,
  .consignee-middle,
  .consignee-right {
    .container-size(inline-block, 389px, 255px, 0 auto, 0px);
    h3{
        .p-size(40px,40px,16px,center,0px,#666666);
        font-weight: bold;
    }
    p{
        .p-size(40px,40px,16px,left,20px,#999999);
        span{
            display:inline-block;
            width: 120px;
        }
    }
  }
  .consignee-middle{
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
      }
    }
    .t-body {
      .container-size(block, 1190px, auto, 0 auto, 0px);
      min-height: 120px;
      border-bottom: 1px solid #eeeeee;
    }
    .t-footer {
      .container-size(block, 1190px, 210px, 0 auto, 0px);
    }
  }
}
</style>