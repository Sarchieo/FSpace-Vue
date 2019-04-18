<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="全部订单" key="1">
        <!-- <f-space-order>
             <div slot="tabledata">
               <p>这是插入的内容</p>
             </div>
            </f-space-order>
        <a-table :columns="columns" :dataSource="data" bordered>
           
          <template slot="name" slot-scope="text">
            
            <a href="javascript:;">{{text}}
           
            </a>
           
          </template>
           
        </a-table> -->
        
        <!-- <p class="table-title">
          <span class="width33">药品</span>
          <span class="width11">单价</span>
          <span class="width11">数量</span>
          <span class="width11">订单操作</span>
          <span class="width11">实付款</span>
          <span class="width11">交易状态</span>
          <span class="width11">操作</span>
        </p> -->
        <ul class="order-box">
          <li v-for="(item,index) in list" :key="index" class="order-box-li">
            <p class="order-info-text">
              <span class="time">{{item.odate}}</span>
              <span>订单号：{{item.orderno}}</span>
              <span class="yikuai">一块医药</span>
              <span class="contact">联系售后</span>
              <a-tooltip class="share">
                <template slot="title">分享</template>
                <a-icon type="export"/>
              </a-tooltip>
              <a-tooltip>
                <template slot="title">删除</template>
                <a-icon type="delete" @click="showDeleteConfirm()"/>
              </a-tooltip>
            </p>
            <div class="goods-box">
              <div class="width33 goods-pic">
                <img
                  v-lazy="item.src"
                  alt
                >
                <p class="goods-text">{{item.text}}</p>
                <p class="guige">规格：{{item.guige}}</p>
              </div>
              <div class="width11 price">
                <p>￥{{item.price}}</p>
              </div>
              <div class="width11 count">
                <p>{{item.count}}</p>
              </div>
              <div class="width11 sale">
                <p>申请售后</p>
              </div>
              <div class="width11 pay">
                <p class="shiji">￥{{item.freight + item.price}}</p>
                <p class="freight">(含运费{{item.freight}}元)</p>
              </div>
              
              <div class="width11 state">
                <p class="sucess">交易成功</p>
                <p class="detail" @click="toDetails()">订单详情</p>
              </div>
              
              <div class="width12 operation">
                <p @click="toEvaluate()" ref="toevaluate"><a>评论</a></p>
                
              </div>
            </div>
          </li>
           <a-pagination :defaultCurrent="1" :total="10" class="paging"/>
        </ul>
      </a-tab-pane>
      <a-tab-pane tab="待付款" key="2" forceRender>待付款</a-tab-pane>
      <a-tab-pane tab="待发货" key="3">待发货</a-tab-pane>
      <a-tab-pane tab="待收货" key="4">待收货</a-tab-pane>
      <a-tab-pane tab="待评价" key="5">待评价</a-tab-pane>
      <a-tab-pane tab="退货" key="6">退货</a-tab-pane>
    </a-tabs>
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
    const columns = [
      {
        title: "药品",
        dataIndex: "data.list.text",
        customRender: renderContent,
        align: "center"
      },
      {
        title: "单价",
        dataIndex: "data.list.price",
        customRender: renderContent
      },
      {
        title: "数量",
        dataIndex: "data.list.count",
        customRender: renderContent
      },
      {
        title: "药品操作",
        dataIndex: "data.list.shouhou",
        customRender: renderContent
      },
      {
        title: "实付款",
        dataIndex: "data.list.shiji",
        customRender: renderContent
      },
      {
        title: "交易状态",
        dataIndex: "data.list.details",
        customRender: renderContent
      },
      {
        title: "交易操作",
        dataIndex: "data.list.pinglun",
        customRender: renderContent
      }
    ];
    return {
      data,
      columns,
      list: [
        {
          odate: "2019-03-25",
          orderno: 2019032400109,
          src:
            "//img.alicdn.com/imgextra/i1/TB1YUDFJpXXXXbnXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          price: 8888,
          count: 1,
          freight: 4,
          list: [
            {
              src:
                "//img.alicdn.com/imgextra/i1/TB1YUDFJpXXXXbnXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "长白山人参[滋补佳品，提升免疫力，延年益寿]",
              guige: "200g*1株",
              price: 8888,
              count: 1,
              freight: 4,
              shiji: 8892,
              details: "订单详情",
              align: "再次购买",
              pinglun: "评价",
              tousu: "投诉",
              shouhou: "申请售后"
            },
            {
              src:
                "//img.alicdn.com/imgextra/i1/TB1YUDFJpXXXXbnXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "长白山人参[滋补佳品，提升免疫力，延年益寿]",
              guige: "200g*1株",
              price: 8888,
              count: 1,
              freight: 4,
              shiji: 8892,
              details: "订单详情",
              align: "再次购买",
              pinglun: "评价",
              tousu: "投诉",
              shouhou: "申请售后"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    // 获取订单列表
    this.queryOrders()
  },
  methods: {
    queryOrders() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderInfoModule";
      iRequest.method = "queryOrders";
      iRequest.param.arrays = [_this.storeInfo.storeId]
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "orderServer" + Math.floor(_this.storeInfo.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
          if (result.code === 200) {
            
            _this.$message.success(result.message);
          } else {
            _this.$message.error(result.message);
          }
        },
        function error(e) {
          _this.$message.error(e);
        })
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
    toDetails() {
     var routeData = this.$router.resolve({
            path: "/user/order-detail"
          });
        window.open(routeData.href, '_blank');
    },
    callback(key) {
      console.log(key);
    },
    toEvaluate() {
      var routeData = this.$router.resolve({
            path: "/user/evaluate"
          });
        window.open(routeData.href, '_blank');

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
  .position(relative, 0px, 0px);
  width: 33%;
  img {
    .position(absolute, 14px, 14px);
    width: 80px;
    height: 80px;
  }
}
.width11 {
  width: 10.5%;
}
.width12 {
  width: 11%;
}
.table-title {
  .p-size(50px, 50px, 16px, center, 0px, #666666);
  display: block;
  width: 945px;
  margin: 0 auto;
  background: #f2f2f2;
  span {
    display: inline-block;
    height: 50px;
    line-height: 50px;
  }
}
.order-box {
  .container-size(block, 985px, 905px, 0 auto, 0px);
  overflow: auto;
  li{
    .container-size(block, 945px, 153px, 0 auto, 0px);
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
        margin-left: 295px;
      }
      i {
        font-size: 18px;
      }
      span {
        margin-right: 23px;
      }
    }
    .goods-box {
      .container-size(block, 943px, 108px, 0 auto, 0px);
      div {
        display: inline-block;
        height: 108px;
      }
      .goods-pic {
        .goods-text {
          .position(absolute, 10px, 110px);
          width: 200px;
          height: auto;
        }
        .goods-text:hover {
          cursor: pointer;
          color: #ed3025;
        }
        .guige {
          .position(absolute, 70px, 110px);
          width: 200px;
          height: auto;
        }
      }
      .count,
      .sale,
      .price,
      .operation {
        .position(relative, 0px, 0px);
        p {
          .position(absolute, 0px, 0px);
          width: 100%;
          height: 100%;
          line-height: 108px;
          text-align: center;
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
        .position(relative, 0px, 0px);
        .sucess {
          .position(absolute, 28px, 0px);
          width: 100%;
          text-align: center;
        }
        .detail {
          .position(absolute, 56px, 0px);
          width: 100%;
          text-align: center;
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
    .position(relative, 0px, 0px);
    .shiji{
        .position(absolute, 28px, 0px);
        width: 100%;
        text-align: center;
    }
    .freight{
        .position(absolute, 56px, 0px);
         width: 100%;
        text-align: center;
    }
}
</style>