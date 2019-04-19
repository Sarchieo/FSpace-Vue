<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="receiving">
          <p class="receiving-address">收货地址</p>
          <div>
            <p class="tips">
              <a-icon type="exclamation-circle"/>温馨提示：GSP认证后，药店地址不可更改，如需更改请联系：客服 8888-8888888
            </p>
            <p class="address-info">
              <span>收货门店：</span> {{ this.storeInfo.storeName }}
            </p>
            <p class="address-info">
              <span>联系方式：</span>{{ this.storeInfo.phone }}
              <!-- <a @click="showModal()">修改</a> -->
              <a-modal title="编辑收货人" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
                <p class="modal-tel">
                  <span>联系方式：</span>
                  <input type="tel">
                </p>
              </a-modal>
            </p>
            <p class="address-info">
              <span>收货地址：</span>{{ this.storeInfo.storeName }}
            </p>
          </div>
        </div>
        <div class="goods-list">
          <ul class="goods-title">
            <li>
              <div class="goods-info">商品信息</div>
              <div>单价</div>
              <div>数量</div>
              <div>小计</div>
            </li>
          </ul>
          <ul class="goods-table">
            <p class="goods-table-name">
              <a-icon type="shop"/>一块医药自营
            </p>
            <li v-for="(item,index) in cartList" :key="index">
              <div class="goods-name">
                <img v-lazy="item.src" alt>
                <p class="drugs-name">{{item.ptitle}}</p>
                <p class="drugs-guige">{{item.spec}}</p>
                <p class="drugs-comp">{{item.verdor}}</p>
              </div>
              <div class="goods-price">￥{{item.pdprice}}</div>
              <div class="goods-price">{{item.num}}</div>
              <div class="goods-price">￥{{item.pdprice * item.num}}</div>
            </li>
            <!-- <p class="price-total">商品总计： ￥360元</p> -->
          </ul>
        </div>
        <div class="go-pay">
          <!-- <div class="invoice">
            <p class="invoice-info">发票信息</p>
            <p class="is-invoice">
              是否开票：
              <a-select defaultValue="不开发票" style="width: 150px">
                <a-select-option value="不开发票">不开发票</a-select-option>
                <a-select-option value="普通发票">普通发票</a-select-option>
                <a-select-option value="增值税发票">增值税发票</a-select-option>
              </a-select>
            </p>
          </div> -->
          <div class="discount-pay">
            <div class="discount">
              <!-- <p class="use-coupon">使用优惠券(张)</p>
              <p class="pick-coupon">
                <button @click="pickCoupon()">选择优惠券</button>
              </p> -->
              <!-- <p class="picked-coupon"><button>选择优惠券</button></p> -->
              <!-- <a-tag color="cyan" class="picked-coupon">每满100减50元</a-tag> -->
              <a-modal
                title="选择优惠券"
                width="750px"
                v-model="isCoupon"
                @ok="handleOk"
                okText="确定"
                cancelText="取消"
              >
                <div class="coupon-box">
                  <!-- 选中背景色 -->
                  <div class="coupon">
                    <p class="coupon-type">现金券</p>
                    <p class="ladder">满balala送balala</p>
                  </div>
                  <div class="coupon">
                    <p class="coupon-type">包邮券</p>
                    <p class="ladder">满balala送包邮服务</p>
                  </div>
                </div>
              </a-modal>
            </div>
            <div class="pay">
              <p>商品合计：￥{{ cartList[0].acamt +  cartList[0].amt}}</p>
              <p>运费：￥ {{ cartList[0].freight }}</p>
              <p>优惠：￥ {{ cartList[0].amt }}</p>
              <p class="price" v-if="!cartList[0].freepost">应付金额：￥ {{ cartList[0].acamt + cartList[0].freight  }}</p>
              <p class="price" v-if="cartList[0].freepost">应付金额：￥ {{ cartList[0].acamt }}</p>
              <a-button class="pay-btn" @click="toPay()">去付款</a-button>
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
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      orderType: 0,
      isCoupon: false,
      cartList: [],
      visible: false,
      goodsArr: []
    };
  },
  mounted() {
    // 获取发票信息
    // this.getInvoice()
    // 获取优惠券信息
  },
  created() {
    this.cartList = JSON.parse(this.$route.params.arr) 
    this.placeType = this.$route.params.placeType;
    this.orderType = this.$route.params.orderType;
  },
  methods: {
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
      const _this = this;
      // _this.goodsArr = [];
      const iRequest = new inf.IRequest();
      iRequest.cls = "TranOrderOptModule";
      iRequest.method = "placeOrder";
      let goodsArr = this.cartList.map((value) => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          pdprice: value.pdprice
        }
      })
      iRequest.param.json = JSON.stringify({
        placeType: this.placeType,
        coupon: 0,
        orderObj: {
          cusno: this.storeInfo.storeId,
          busno: this.storeInfo.storeId
        },
        goodsArr: goodsArr,
        orderType: this.orderType
      });
      this.$refcallback(
        "orderServer" + Math.floor((this.storeInfo.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.$router.push({
                path: "/order/pay"
              });
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {
            debugger;
          }
        )
      );
    },
    handleOk() {
      console.log(1);
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
.receiving {
  .container-size(block, 1190px, 250px, 20px auto 20px auto, 0px);
  .container-color(#ffffff, 1px solid #e0e0e0, #333333);
}
.receiving-address {
  .p-size(50px, 50px, 16px, left, 20px, #999999);
  .p-color(#fafafa, none, #999);
}
.tips {
  .p-size(50px, 50px, 16px, left, 10px, #ed2f26);
}
.tips i {
  margin-right: 20px;
}
.address-info {
  .p-size(40px, 40px, 16px, left, 10px, #333);
}
.address-info span {
  .container-size(inline-block, 120px, 40px, 0, 0px);
  color: #999999;
}
.address-info a {
  .container-size(inline-block, 90px, 30px, 0 auto 0 30px, 15px);
  .p-size(30px, 30px, 16px, center, 0px, #3189f5);
  .p-color(#fff, 1px solid #3189f5, #3189f5);
}
.goods-list {
  .container-size(block, 1190px, auto, 0 auto 20px auto, 0);
  .p-color(#fff, 1px solid #e0e0e0, #333);
}
.goods-title {
  .container-size(inline-block, 1188px, 50px, 0, 0);
  .container-color(#fafafa, none, #666);
}
.goods-title li div {
  .container-size(inline-block, 240px, 50px, 0, 0);
  .container-align(center, 0px, 50px);
}
.goods-info {
  width: 450px !important;
}
.goods-table {
  .container-size(block, 1190px, auto, 0 auto 20px auto, 0);
}
.goods-table-name {
  .p-size(50px, 50px, 16px, left, 10px, #666666);
}
.goods-table li {
  .container-size(block, 1190px, 120px, 0, 0);
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.goods-name {
  float: left;
  .container-size(inline-block, 450px, 120px, 0, 0);
  position: relative;
}
.goods-name img {
  vertical-align: middle;
  .container-size(inline-block, 80px, 80px, 0, 0);
  margin: 20px 0 0 20px;
}
.drugs-name {
  .position(absolute, 20px, 120px);
  .container-size(inline-block, 330px, 20px, 0, 0);
}
.drugs-guige {
  .position(absolute, 50px, 120px);
  .container-size(inline-block, 330px, 20px, 0, 0);
}
.drugs-comp {
  .position(absolute, 75px, 120px);
  .container-size(inline-block, 330px, 20px, 0, 0);
}
.goods-price {
  float: left;
  .container-size(inline-block, 240px, 120px, 0, 0);
  .container-align(center, 0, 120px);
  margin-left: 5px;
}
.price-total {
  .p-size(50px, 70px, 22px, center, 0px, #ed2f26);
  font-weight: bold;
}
.go-pay {
  .container-size(block, 1190px, 400px, 0 auto 80px auto, 0);
  background: #f6f6f6;
}
.invoice {
  .container-size(block, 1190px, 90px, 0, 0);
  border-bottom: 1px solid #dddddd;
}
.invoice-info {
  .p-size(40px, 40px, 16px, left, 20px, #666666);
}
.is-invoice {
  .p-size(50px, 50px, 16px, left, 20px, #666666);
}
.discount-pay {
  .container-size(block, 1190px, 310px, 0, 0);
}
.discount {
  float: left;
  .container-size(block, 595px, 310px, 0, 0);
  .use-coupon {
    .p-size(40px, 40px, 16px, left, 20px, #999999);
  }
  .pick-coupon {
    .p-size(50px, 50px, 16px, left, 20px, #999999);
    button {
      .button-size(120px, 40px, 40px, 16px, 0px, 5px);
      .button-color(1px solid transparent, #ed2f26, #ffffff);
    }
  }
  .picked-coupon {
    .p-size(30px, 30px, 16px, center, 0px, #999999);
    margin-left: 20px;
    button {
      .button-size(auto, 40px, 40px, 16px, 0px, 5px);
      .button-color(1px solid transparent, #ed2f26, #ffffff);
      padding: 10px 15px;
    }
  }
}
.pay {
  float: right;
  .container-size(block, 595px, 310px, 0, 0);
}
.pay p {
  .p-size(50px, 50px, 16px, center, 20px, #666666);
}
.pay .price {
  font-size: 20px !important;
  font-weight: bold;
  color: #ed2f26 !important;
}
.pay-btn {
  .button-display(block, 20px auto 0 auto);
  .button-color(1px solid transparent, #ed2f26, #ffffff);
  .button-size(200px, 50px, 50px, 18px, 0, 5px);
}
.modal-name,
.modal-tel {
  .p-size(20px, 20px, 14px, center, 0px, #333);
  margin-bottom: 15px;
}
.modal-name span,
.modal-tel span {
  display: inline-block;
  width: 90px;
  text-align: left;
}
.modal-name input,
.modal-tel input {
  width: 200px;
  height: 30px;
  border: 1px solid #e0e0e0;
  text-indent: 10px;
}
.coupon-box {
  .container-size(block, 700px, auto, 0, 0);
  overflow: auto;
  .coupon {
    .container-size(inline-block, 300px, 120px, 0, 0);
    margin: 0 24px;
    float: left;
    border: 1px solid #e0e0e0;
    .coupon-type {
      .p-size(40px, 40px, 16px, center, 0px, #ed2f26);
    }
    .ladder {
      .p-size(40px, 40px, 14px, left, 20px, #999999);
    }
  }
}
.ant-modal {
  width: 700px !important;
}
.coupon-back {
  color: #fdf4e9;
}
</style>
