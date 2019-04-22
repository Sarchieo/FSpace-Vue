<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="stets">
          <a-steps :current="1">
            <a-step>
              <template slot="title">
                我的采购单
              </template>
              <span slot="description"></span>
            </a-step>
            <a-step title="确认采购单信息" />
            <a-step title="采购单付款" />
            <a-step title="采购单完成" />
          </a-steps>
        </div>
        <div class="receiving">
          <p class="receiving-address">收货地址</p>
          <div>
            <p class="tips">
              <a-icon type="exclamation-circle"/>温馨提示：GSP认证后，药店地址不可更改，如需更改请联系：客服 8888-8888888
            </p>
            <p class="address-info">
              <span>收货门店：</span>{{ this.storeInfo.storeName }}
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
              <a-icon type="shop"/>一块医药
            </p>
            <li v-for="(item,index) in cartList" :key="index">
              <div class="goods-name">
                <img v-lazy="item.imgURl" alt>
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
            <div class="discount" v-if="couponList.length > 0">
              <p class="use-coupon">使用平台优惠券</p>
              <div class="coupon-box">
                <!-- <div class="coupon">
                  <div class="coupon-num">
                    <p class="coupon-title">现金券</p>
                    <p>满500送50元</p>
                    <p>满1000送110元</p>
                    <p>满2000送250元</p>
                  </div>
                  <p class="coupon-bottom">有效期至2019-05-29 <a-checkbox @change="onChange" class="coupon-check"></a-checkbox></p>
                </div> -->
                <div v-for="(item, index) in couponList" :key="index">
                  <!-- 现金券 -->
                  <div class="coupon" v-if="item.brulecode === 2110">
                    <div class="coupon-num">
                      <p class="coupon-title">{{ item.rulename }}</p>
                      <p v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }} 减 {{ j.offer}} </p>
                    </div>
                    <p class="coupon-bottom">有效期至 {{ item.enddate }} <a-checkbox v-model="item.isChecked"  @change="onChange(item, index)" class="coupon-check"></a-checkbox></p>
                  </div>
                  <!-- 包邮券 -->
                  <div class="coupon" v-if="item.brulecode === 2120">
                    <div class="coupon-num">
                      <p class="coupon-title">{{ item.rulename }}</p>
                      <p v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }}包邮 </p>
                    </div>
                    <p class="coupon-bottom">有效期至 {{ item.enddate }} <a-checkbox v-model="item.isChecked" @change="onChange(item, index)" class="coupon-check"></a-checkbox></p>
                  </div>
                  <!-- 折扣券 -->
                  <div class="coupon" v-if="item.brulecode === 2130">
                    <div class="coupon-num">
                      <p class="coupon-title">{{ item.rulename }}</p>
                      <p v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }} 打 {{ j.offer/10}}折 </p>
                    </div>
                    <p class="coupon-bottom">有效期至 {{ item.enddate }} <a-checkbox v-model="item.isChecked" @change="onChange(item, index)" class="coupon-check"></a-checkbox></p>
                  </div>
                </div>
              </div>
              <!-- <p class="pick-coupon">
                <button @click="pickCoupon()">选择优惠券</button>
              </p> -->
              <!-- <p class="picked-coupon"><button>选择优惠券</button></p> -->
              <!-- <a-tag color="cyan" class="picked-coupon">每满100减50元</a-tag> -->
            </div>
            <div class="pay">
              <p>商品合计：￥{{ cartList[0].acamt +  cartList[0].amt}}</p>
              <p>运费：￥ {{ cartList[0].freight }}</p>
              <p>优惠：￥ {{ cartList[0].amt }}</p>
              <!-- 包邮 freepost:活动包邮 isPostal使用包邮券 -->
              <p class="price" v-if="cartList[0].freepost || isPostal">应付金额：￥ {{ cartList[0].acamt - coupNum }}</p>
              <p class="price" v-else>应付金额：￥ {{ (cartList[0].acamt + cartList[0].freight).toFixed(2) - coupNum  }}</p>
              
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
      goodsArr: [],
      couponList: [],
      couponCode: 0, // 选中优惠券ID
      coupNum: 0,
      isPostal: false // 是否使用包邮券
    };
  },
  created() {
    this.cartList = JSON.parse(this.$route.query.arr)
  },
  mounted() {
    this.placeType = this.$route.query.placeType
    this.orderType = this.$route.query.orderType
    this.actcode =  this.$route.query.actcode || 0
    // 获取优惠券信息
    this.queryActCouponList()
    this.getImgUrl(this.cartList)
  },
  methods: {
    queryActCouponList() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "queryActCouponList";
      let arr = this.cartList.map((value) => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          compid: _this.storeInfo.storeId,
          pdprice: value.pdprice,
          amt: value.pdprice *  value.num,
          samt: value.acamt +  value.amt,
          flag: value.oflag ? 1 : 0
        }
      })
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        "orderServer" + Math.floor((this.storeInfo.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              console.log(result.data)
              if(result.data.length > 0) {
                result.data.forEach((item) => {
                  item.isChecked = false
                })
                _this.couponList = result.data
              }
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {
            console.log(error)
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
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "TranOrderOptModule";
      iRequest.method = "placeOrder";
      let goodsArr = this.cartList.map((value) => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          pdprice: value.pdprice,
          actcode: _this.actcode
        }
      })
      iRequest.param.json = JSON.stringify({
        placeType: this.placeType,
        coupon: this.couponCode,
        orderObj: {
          cusno: this.storeInfo.storeId,
          busno: this.storeInfo.storeId,
          rvaddno: this.storeInfo.addressCode
        },
        goodsArr: goodsArr,
        orderType: this.orderType,
        actcode: this.actcode
      });
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        "orderServer" + Math.floor((this.storeInfo.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.$router.push({
                path: "/order/pay",
                query: {
                  orderno: result.data.orderno
                }
              });
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {
            console.log(error)
          }
        )
      );
    }, // 获取商品图片
    getImgUrl(arr) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.token = localStorage.getItem("identification");
      let list = [];
      arr.forEach(c => {
        list.push({
          sku: c.pdno,
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
                    arr[index].pdno +
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
            console.log(error)
          }
        )
      );
    },
    handleOk() {
      console.log(1);
    },
    onChange(item, index) {
      if(item.isChecked) {
        this.couponCode = item.unqid
        this.coupNum = item.offerAmt
        item.brulecode === 2120 ? this.isPostal = true : this.isPostal = false
      }else {
        this.couponCode = 0
        this.coupNum = 0
        this.isPostal = false
      }
      this.couponList.forEach((item, i) => {
        if(index !== i) {
          item.isChecked = false
        }
      })
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
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  background: #ffffff;
  color: #333333;
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
  .container-size(block, 1190px, auto, 0 auto, 0);
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
  .container-size(block, 1190px, 530px, 0 auto 80px auto, 0);
  border: 1px solid #e0e0e0;
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
  .container-size(block, 1190px, 250px, 0, 0);
  .use-coupon {
    .p-size(40px, 40px, 16px, left, 20px, #999999);
    span{
      color: #ed2f26;
    }
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
  overflow-x: auto;
  overflow: auto;
  .coupon {
    .container-size(inline-block, 300px, 120px, 0, 0);
    margin: 0 24px;
    float: left;
    // border: 1px solid #e0e0e0;
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
.coupon-box{
  .container-size(block, 1190px, 210px, 0, 0);
  .coupon{
    .container-size(inline-block, 270px, 180px, 0, 0);
    margin-left: 22px;
    // background: pink;
    .coupon-num{
      .container-size(inline-block, 268px, 145px, 0, 0);
      background:url('../../assets/img/quan-bg.png')
    }
    p{
      .p-size(30px,30px,14px,left,20px,#ffffff);
      .coupon-check{
        float: right;
        margin-right: 20px;
      }
    }
    .coupon-title{
      text-indent: 80px!important;
      font-weight: bold;
      font-size: 16px!important;
      color:#ffffff;
    }
  }
}
.coupon-bottom{
  width: 268px;
  color: #999999!important;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
}
.stets{
  .container-size(block, 600px, 100px, 0 auto, 0);
  margin-top: 30px;
}
</style>
