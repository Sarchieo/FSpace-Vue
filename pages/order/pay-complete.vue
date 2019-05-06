<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="complete-box">
          <p class="pay-complete-text">
            <a-icon type="check-circle"/>下单成功 感谢您的支持
          </p>
          <div class="order-info">
            <div class="info-left">
              <p>商品合计： ￥ {{ info.pdamt }}元</p>
              <p>运费： ￥{{ info.freight }}元</p>
              <p>优惠券： ￥ {{ info.coupamt }} 元</p>
              <p>
                实付：
                <span>￥ {{ info.payamt }} 元</span>
              </p>
            </div>
            <div class="info-right">
              <p>
                <span>下单时间：</span> {{ info.odate + ' ' + info.otime }}
              </p>
              <p>
                <span>收货人：</span> {{ storeInfo.comp.storeName }}
              </p>
              <p>
                <span>联系电话：</span> {{ storeInfo.phone }}
              </p>
              <p>
                <span>收货地址：</span>{{ info.address  }} {{ storeInfo.comp.address }}
              </p>
            </div>
          </div>
          <p class="order-detail">
            <a-button
              type="primary"
              class="order-detail-btn"
              @click="toOrderDetail()"
            >订单详情</a-button>
            <span class="keep-shoping" @click="toIndex()">继续逛逛</span>
          </p>
        </div>
        <!-- <div class="person-see">
          <p class="person-title">大家都在看</p>
          <div class="person-box">
            <div class="person-list" @click="toGoodsDetail()">
              <a-card hoverable class="onek-card">
                <img
                  src="//img.alicdn.com/imgextra/i1/TB103TQOXXXXXaLaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg"
                  alt
                  slot="cover"
                >
                <div slot="cover">
                  <p class="brand-name">盘龙云海 排毒养颜胶囊</p>
                  <p class="menu-name">云南盘龙云海药业有限公司</p>
                  <p class="brand-price">￥30元</p>
                </div>
              </a-card>
            </div>
            <div class="person-list">
              <a-card hoverable class="onek-card">
                <img
                  src="//img.alicdn.com/imgextra/i1/TB103TQOXXXXXaLaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg"
                  alt
                  slot="cover"
                >
                <div slot="cover">
                  <p class="brand-name">盘龙云海 排毒养颜胶囊</p>
                  <p class="menu-name">云南盘龙云海药业有限公司</p>
                  <p class="brand-price">￥30元</p>
                </div>
              </a-card>
            </div>
            <div class="person-list">
              <a-card hoverable class="onek-card">
                <img
                  src="//img.alicdn.com/imgextra/i1/TB103TQOXXXXXaLaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg"
                  alt
                  slot="cover"
                >
                <div slot="cover">
                  <p class="brand-name">盘龙云海 排毒养颜胶囊</p>
                  <p class="menu-name">云南盘龙云海药业有限公司</p>
                  <p class="brand-price">￥30元</p>
                </div>
              </a-card>
            </div>
            <div class="person-list">
              <a-card hoverable class="onek-card">
                <img
                  src="//img.alicdn.com/imgextra/i1/TB103TQOXXXXXaLaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg"
                  alt
                  slot="cover"
                >
                <div slot="cover">
                  <p class="brand-name">盘龙云海 排毒养颜胶囊</p>
                  <p class="menu-name">云南盘龙云海药业有限公司</p>
                  <p class="brand-price">￥30元</p>
                </div>
              </a-card>
            </div>
            <div class="person-list">
              <a-card hoverable class="onek-card">
                <img
                  src="//img.alicdn.com/imgextra/i1/TB103TQOXXXXXaLaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg"
                  alt
                  slot="cover"
                >
                <div slot="cover">
                  <p class="brand-name">盘龙云海 排毒养颜胶囊</p>
                  <p class="menu-name">云南盘龙云海药业有限公司</p>
                  <p class="brand-price">￥30元</p>
                </div>
              </a-card>
            </div>
          </div>
        </div> -->
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
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      orderno: '',
      info: {}
    };
  },
  mounted() {
    this.orderno = this.$route.query.orderno
    this.getPayResult()
  },
  methods: {
    // 获取订单详情
    getPayResult() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "PayModule";
      iRequest.method = "getPayResult";
      iRequest.param.json = JSON.stringify({
        orderno: this.orderno,
        compid: this.storeInfo.comp.storeId
      })
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "orderServer" + Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.info = result.data
            }
          }
        )
      );
    },
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
    pickCoupon() {
      this.isCoupon = true;
    },
    toPay() {
      this.$router.push({
        path: "/order/pay"
      });
    },
    handleOk() {
      console.log(1);
    },
    toOrderDetail() {
      this.$router.push({
        path: "/user/order-detail",
        query: {
          orderno: this.orderno,
          cusno: this.storeInfo.comp.storeId
        }
      });
    },
    toIndex() {
      this.$router.push({
        path: "/"
      });
    },
    toGoodsDetail(item) {
     this.$router.push({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
* {
  margin: 0;
}
a {
  text-decoration: none;
  color: #000000;
}
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
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
  background: rgb(255, 255, 255);
  /* min-height: 1000px; */
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.complete-box {
  .container-size(block, 1190px, 435px, 0 auto, 0px);
  background: #f2f2f2;
  margin-bottom: 30px;
  border: 1px solid #eeeeee;
  padding: 20px 20px;
  .pay-complete-text {
    .p-size(40px, 40px, 22px, center, 0px, #333333);
    margin-bottom: 20px;
    font-weight: bold;
    i {
      margin-right: 20px;
    }
  }
  .order-info {
    .container-size(block, 1148px, 180px, 0 auto, 0px);
    margin-bottom: 60px;
  }
  .info-left {
    float: left;
    .container-size(inline-block, 430px, 180px, 0, 0px);
    border-right: 1px solid #e0e0e0;
    // background: pink;
    padding-right: 65px;
    p {
      .p-size(45px, 45px, 14px, right, 0px, #666666);
      span {
        font-size: 16px;
        font-weight: bold;
        color: #ed2f26;
      }
    }
  }
  .info-right {
    float: right;
    .container-size(inline-block, 717px, 180px, 0, 0px);
    padding-left: 65px;
    p {
      .p-size(45px, 45px, 14px, left, 0px, #666666);
      span {
        display: inline-block;
        width: 80px;
      }
    }
  }
}
.order-detail {
  .p-size(60px, 60px, 16px, center, 0px, #666666);
  .order-detail-btn {
    .button-size(150px, 45px, 45px, 16px, 0px, 5px);
    .button-color(1px solid transparent, #ed2f26, #ffffff);
  }
  span {
    margin-left: 30px;
    color: #3189f5;
  }
}
.keep-shoping:hover {
  cursor: pointer;
}
.person-see {
  .container-size(block, 1190px, 380px, 0 auto, 0px);
  border: 1px solid #eeeeee;
  margin-bottom: 20px;
  .person-title {
    .p-size(50px, 50px, 18px, left, 20px, #999999);
    background: #eeeeee;
  }
  .person-box {
    .container-size(inline-block, 1190px, 330px, 0 auto, 0px);
    padding: 10px;
    .person-list {
      float: left;
      .container-size(inline-block, 215px, 310px, 0px 9px, 0px);
      img {
        width: 215px;
        height: 215px;
      }
      .brand-name {
        .p-size(30px, 30px, 14px, left, 20px, #666666);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .brand-price {
        .p-size(30px, 30px, 14px, left, 20px, #ed2f26);
        font-weight: bold;
      }
      .menu-name {
        .p-size(30px, 30px, 14px, left, 20px, #666666);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.onek-card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
</style>
