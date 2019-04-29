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
            <a-step title="采购单信息" />
            <a-step title="采购单付款" />
            <a-step title="采购单完成" />
          </a-steps>
        </div>
        <div class="receiving">
          <p class="receiving-address">收货地址</p>
           <p class="tips">
              <a-icon type="exclamation-circle"/>温馨提示：GSP认证后，药店地址不可更改，如需更改请联系：客服 8888-8888888
            </p>
          <div>
            <p class="address-info">
              <span>联系人：</span>{{ consignee }}
            </p>
            <p class="address-info">
              <span>联系方式：</span>{{ contact }}

            </p>

            <p class="address-info">
              <span>收货门店：</span>{{ this.storeInfo.comp.storeName }}
            </p>
            <p class="address-info">
              <span>收货地址：</span>{{ storeInfo.comp.addressCodeStr + this.storeInfo.comp.address }}
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
              <div class="goods-price">￥{{(item.pdprice * item.num).toFixed(2)}}</div>
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
            <!-- <div class="pay" v-if="cartList.length > 0 && couponCode === 0">
              <p>商品合计：￥{{ (cartList[0].acamt +  cartList[0].amt).toFixed(2) }}</p>
              <p>运费：￥ {{ cartList[0].freight }}</p>
              <p>优惠：￥ {{ cartList[0].amt }}</p>

              <p class="price" v-if="cartList[0].freepost || isPostal">应付金额：￥ {{ cartList[0].acamt - coupNum }}</p>
              <p class="price" v-else>应付金额：￥ {{ (cartList[0].acamt + cartList[0].freight).toFixed(2) - coupNum  }}</p>

              <a-button class="pay-btn" @click="toPay()">去付款</a-button>
            </div> -->

            <div class="pay" v-if="cartList.length > 0">
              <p>商品合计：￥{{ selectCounpon.tprice }}</p>
              <p>运费：￥ {{  cartList[0].freight }}</p>
              <p>优惠：￥ {{ selectCounpon.tdiscount  }}</p>
              <!-- 包邮 freepost:活动包邮 isPostal使用包邮券 -->
              <p class="price">应付金额：￥ {{ selectCounpon.payamt }}</p>

              <a-button class="pay-btn" @click="toPay()">去付款</a-button>
            </div>
          </div>
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>
    <a-modal
      title="收货人编辑"
      v-model="visible"
      :footer= "null"
    >
     <a-form
        :form="form"
        @submit="handleSubmit"
      >
       <a-form-item
          label="收货人姓名："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'contactname',
              {rules: [{ required: true, message: '请填写收货人姓名' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="收货人电话："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'contactphone',
              {rules: [{ required: true, validator: validatePhone}]}
            ]"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 12, offset: 8 }"
        >
        </a-form-item>
        <a-button
          class="save-btn"
          type="primary"
          html-type="submit">
          保存
        </a-button>
     </a-form>
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
      form: this.$form.createForm(this),
      orderType: 0,
      isCoupon: false,
      cartList: [],
      visible: false,
      goodsArr: [],
      couponList: [],
      couponCode: 0, // 选中优惠券ID
      unqid: 0,//优惠券领取表id
      coupNum: 0,
      isPostal: false, // 是否使用包邮券
      receiverList: [],
      consignee: '',
      contact: '',
      selectCounpon: {
        acvalue: 0, // 活动优惠
        cpvalue: 0, // 优惠券金额
        freeship: false, // 是不是免运费
        payamt: 0, // 实付金额
        tdiscount: 0, // 总共优惠
        tprice: 0 // 总计金额
      }
    };
  },
  mounted() {
    this.cartList = JSON.parse(sessionStorage.getItem('placeOrderList'));
    this.placeType = this.$route.query.placeType
    this.orderType = this.$route.query.orderType
    this.actcode =  this.$route.query.actcode || 0
    // 获取优惠券信息
    this.queryActCouponList()
    // 加载图片
    this.fsGeneralMethods.addImages(this, this.cartList, 'pdno', 'spu')
    // 获取联系人信息
    this.queryMyConsignee()
    // 获取金额
    this.couponCalculate()
  },
  methods: {
    queryMyConsignee() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyDrugStoreInfoModule";
      iRequest.method = "queryMyConsignee";
      iRequest.param.json = JSON.stringify({
        compid: _this.storeInfo.comp.storeId
      })
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if(result.code === 200) {
              if(result.data && result.data.length > 0) {
                _this.receiverList = result.data
                _this.consignee = _this.receiverList[0].contactname
                _this.contact = _this.receiverList[0].contactphone
              } else {
                _this.visible = true
              }
            }else {
             _this.visible = true
            }
          }
        )
      );
    },
    queryActCouponList() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "queryActCouponList";
      let arr = this.cartList.map((value) => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          compid: _this.storeInfo.comp.storeId,
          price: value.pdprice,
          amt: value.pdprice *  value.num,
          samt: value.acamt +  value.amt,
          flag: value.oflag ? 1 : 0
        }
      })
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "orderServer" + Math.floor(this.storeInfo.comp.storeId / 8192 % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200 && result.data.length > 0) {
              result.data.forEach((item) => {
                item.isChecked = false
              })
              _this.couponList = result.data
            }
          }
        )
      );
    },
    couponCalculate(item) {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "CouponCalculate";
      let arr = this.cartList.map((value) => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          compid: _this.storeInfo.comp.storeId,
          price: value.pdprice,
          amt: value.pdprice *  value.num,
          coupon: _this.unqid,
          shipfee: _this.cartList[0].freight
        }
      })
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "orderServer" + Math.floor(this.storeInfo.comp.storeId / 8192 % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.selectCounpon = result.data
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
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "TranOrderOptModule";
      iRequest.method = "placeOrder";
      let goodsArr = this.cartList.map((value) => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          pdprice: value.pdprice,
          actcode: JSON.stringify(value.actcode)
        }
      })
      iRequest.param.json = JSON.stringify({
        placeType: this.placeType,
        coupon: this.couponCode, // 优惠券码
        unqid: this.unqid,
        orderObj: {
          cusno: this.storeInfo.comp.storeId,
          busno: 536862720,//自营暂时写死
          consignee: this.consignee,
          contact: this.contact,
          rvaddno: this.storeInfo.comp.addressCode[this.storeInfo.comp.addressCode.length-1],
          address: this.storeInfo.comp.address
        },
        goodsArr: goodsArr,
        orderType: this.orderType,
        actcode: this.cartList[0].actcode
      });
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "orderServer" + Math.floor(this.storeInfo.comp.storeId / 8192 % 65535),
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
            }
          }
        )
      );
    },
    // 新增收货人
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let _this = this;
          let iRequest = new inf.IRequest();
          iRequest.cls = "MyDrugStoreInfoModule";
          iRequest.method = "insertOrUpdConsignee";
          iRequest.param.json = JSON.stringify({
            compid: _this.storeInfo.comp.storeId,
            contactname: values.contactname,
            contactphone: values.contactphone,
            shipid: 0
          })
          iRequest.param.token = localStorage.getItem("identification")
          this.$refcallback(
            this,
            "userServer",
            iRequest,
            new this.$iceCallback(
              function result(result) {
                if(result.code === 200) {
                  _this.queryMyConsignee()
                  _this.visible = false
                }else {

                }
              }
            )
          );
        }
      });
    },
    validatePhone(rule, value, callback) {
      let _this = this;
      const form = this.form;
      if (value && /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value)) {
        callback()
      } else {
        this.sendAuthCode = false
        callback('收货人手机号码有误');
      }
    },
    handleOk() {
      console.log(1);
    },
    onChange(item, index) {
      if(item.isChecked) {
        this.unqid =  item.unqid
        this.couponCode = item.coupno
        this.coupNum = item.offerAmt
        item.brulecode === 2120 ? this.isPostal = true : this.isPostal = false
      }else {
        this.unqid =  0
        this.couponCode = 0
        this.coupNum = 0
        this.isPostal = false
      }
      this.couponList.forEach((item, i) => {
        if(index !== i) {
          item.isChecked = false
        }
      })
      this.couponCalculate()
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
  .container-size(block, 1190px, 280px, 20px auto 20px auto, 0px);
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
  margin-left: 4px;
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
  .p-size(50px, 50px, 16px, left, 195px, #666666);
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
.ant-input {
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 0px!important;
  -moz-border-radius:0px!important;
  -webkit-border-radius:0px!important;
}
.save-btn{
  .button-size(90px,36px,36px,14px,0px,3px);
  .button-display(block,0 auto);
  .button-color(1px solid transparent,#ed2f26,#ffffff);
  margin-top: 10px;
}
</style>
