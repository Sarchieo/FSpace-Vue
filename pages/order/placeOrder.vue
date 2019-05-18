<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="stets">
          <a-steps :current="1">
            <a-step>
              <template slot="title">我的采购单</template>
              <span slot="description"></span>
            </a-step>
            <a-step title="采购单信息"/>
            <a-step title="采购单付款"/>
            <a-step title="采购单完成"/>
          </a-steps>
        </div>
        <div class="go-pay">
          <div class="receiving">
            <p class="receiving-address">收货人信息</p>
            <p class="tips">
              <a-icon type="exclamation-circle"/>温馨提示：GSP认证后，药店地址不可更改，如需更改请联系：客服 0731-88159987
            </p>
            <div>
              <p class="address-info">
                <span>联系人：</span>
                {{ consignee }}
                <span @click="editorAddress()" class="edit">编辑</span>
              </p>
              <p class="address-info">
                <span>联系方式：</span>
                {{ contact }}
              </p>

              <p class="address-info">
                <span>收货门店：</span>
                {{ this.storeInfo.comp.storeName }}
              </p>
              <p class="address-info">
                <span>收货地址：</span>
                {{ storeInfo.comp.addressCodeStr }} {{ this.storeInfo.comp.address }}
              </p>
            </div>
          </div>
          <div class="select-invo-box">
            <p class="title">发票信息</p>
            <p class="address-info">
              <span>公司名称:</span>
              {{ this.storeInfo.comp.storeName }}
            </p>
            <p class="address-info">
              <span>公司注册地址:</span>
              {{ storeInfo.comp.addressCodeStr }} {{ this.storeInfo.comp.address }}
            </p>

            <p class="address-info">
              <span>纳税人识别号:</span>
              {{ invoice.taxpayer }}
            </p>
            <p class="address-info" v-if="invoiceCode === 2">
              <span>注册电话:</span>
              {{ invoice.tel }}
            </p>
            <p class="address-info">
              <span>开户银行:</span>
              {{ invoice.bankers }}
            </p>
            <p class="address-info">
              <span>银行账号:</span>
              {{ invoice.account }}
            </p>
            <p class="select-invo">
              开票信息：
              <a-select defaultValue="普通发票" @change="handleChange">
                <a-select-option :value="1">普通发票</a-select-option>
                <!-- <a-select-option :value="2">增值税发票</a-select-option> -->
              </a-select>
            </p>
          </div>
          <div class="discount">
            <!-- <p class="use-coupon">
              <a-button>使用优惠券</a-button>
              <a-button>使用线下优惠券</a-button>
            </p> -->
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="使用优惠券" key="1">
                <p v-if="couponList.length === 0" class="no-coupon">暂无优惠券可使用</p>
                <div class="coupon-box" v-if="couponList.length !== 0">
                  
                  <div v-for="(item, index) in couponList" :key="index">
                    <!-- 现金券 -->
                    <div class="coupon" v-if="item.brulecode === 2110">
                      <div class="coupon-num">
                        <!-- <span v-if="item.ctype === 3">111</span> -->
                        <p class="coupon-title">{{ item.rulename }}</p>
                        <p v-if="item.ctype === 3">
                          <span class="fuhao">￥</span>
                          <span v-for="(j, i) in item.ladderVOS" :key="i" class="money">{{j.offer}}</span>
                        </p>
                        <div v-if="item.ctype !== 3">
                          <p v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }} 减 {{ j.offer}}</p>
                        </div>
                      </div>
                      <p class="coupon-bottom">
                        <span v-if="item.ctype === 3">永久有效</span>
                        <span v-if="item.ctype !== 3">有效期至 {{ item.enddate }}</span>
                        <a-checkbox
                          :checked="item.isChecked"
                          @change="onChange(item, index, $event)"
                          class="coupon-check"
                        ></a-checkbox>
                      </p>
                    </div>

                    <!-- 包邮券 -->
                    <div class="coupon" v-if="item.brulecode === 2120">
                      <div class="coupon-num">
                        <p v-if="item.ctype === 3">
                          <span class="fuhao">￥</span>
                          <span v-for="(j, i) in item.ladderVOS" :key="i" class="money">{{j.offer}}</span>
                        </p>
                        <p class="coupon-title">{{ item.rulename }}</p>
                        <div v-if="item.ctype !==3">
                          <p v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }}包邮</p>
                        </div>
                      </div>
                      <p class="coupon-bottom">
                        <span v-if="item.ctype === 3">永久有效</span>
                        <span v-if="item.ctype !== 3">有效期至 {{ item.enddate }}</span>
                        <a-checkbox
                          :checked="item.isChecked"
                          @change="onChange(item, index, $evnet)"
                          class="coupon-check"
                        ></a-checkbox>
                      </p>
                    </div>
                    <!-- 折扣券 -->
                    <div class="coupon" v-if="item.brulecode === 2130">
                      <div class="coupon-num">
                        <p class="coupon-title">{{ item.rulename }}</p>
                        <p v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }} 打 {{ j.offer/10}}折</p>
                      </div>
                      <p class="coupon-bottom">
                        有效期至 {{ item.enddate }}
                        <a-checkbox
                          :checked="item.isChecked"
                          @change="onChange(item, index, $evnet)"
                          class="coupon-check"
                        ></a-checkbox>
                      </p>
                    </div>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane tab="使用线下优惠券" key="2" forceRender>
                <a-input v-model="exno" placeholder="请输入券面明码" class="line-coupon"/>
                <a-input v-model="pwd" placeholder="请输入密码" class="line-coupon"/>
                <a-button class="line-btn" @click="useCoupon()">使用</a-button>
                <span>{{ offlineCouponText }}</span>
              </a-tab-pane>
            </a-tabs>
          </div>
          <div class="balance">
            <p class="title">我的余额</p>
            <p class="user-balance">账户余额：<span>{{ selectCounpon.bal }}</span>
              <a-checkbox
                v-if="selectCounpon.bal > 0"
                :checked="isSelectBalway"
                @change="onChangeBalWay"
                class="pick-input"
              >全部抵扣</a-checkbox>
            </p>
            <p class="title">备注留言</p>
            <a-textarea v-model="remarks" placeholder="请填写您的备注留言" autosize class="leaving "/>
          </div>
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
             送货清单
            </p>
            <li v-for="(item,index) in cartList" :key="index">
              <div class="goods-name">
                <img v-lazy="item.imgURl" alt>
                <p class="drugs-name">{{item.ptitle}}</p>
                <!-- <p class="active"><a-tag color="red">满减</a-tag></p> -->
                <p class="active">
                   <a-tag
                    color="red"
                    v-for="(ruleItem, i) in item.rule"
                    :key="i"
                  >{{ ruleItem.rulename }}</a-tag>
                </p>
                
                <!-- <p class="active"><a-tag color="red">满赠</a-tag></p> -->
                <p class="drugs-guige">{{item.spec}}</p>
                <p class="drugs-comp">{{item.verdor}}</p>
              </div>
              <div class="goods-price">￥{{item.pdprice}}</div>
              <div class="goods-price">{{item.num}}</div>
              <div class="goods-price">￥{{(item.pdprice * item.num).toFixed(2)}}</div>
            </li>
            <!-- <p class="price-total">商品总计： ￥360元</p> -->
          </ul>

          <div class="pay" v-if="cartList.length > 0">
            <!-- <p>共{{ cartList.length }}种商品，总件数多少多少， 商品总计：￥保留两位小数</p> -->
            <p>
              <span class="price-span">￥{{ selectCounpon.tprice }}</span>
              <span class="title">商品总金额：</span>
            </p>
            <p v-if="!selectCounpon.freeship">
              <span class="price-span">￥ {{ cartList[0].freight }}</span>
              <span class="title">运费：</span>
            </p>
            <p>
              <span class="price-span">￥ {{ selectCounpon.tdiscount }}</span>
              <span class="title">活动优惠：</span>
            </p>
            <p>
              <span class="price-span">￥ {{ selectCounpon.cpvalue }}</span>
              <span class="title">优惠券抵扣：</span>
            </p>

            <p>
              <span class="price-span">￥ {{ selectCounpon.debal }}</span>
              <span class="title">余额抵扣：</span>
            </p>
            <!-- 包邮 freepost:活动包邮 isPostal使用包邮券 -->
            <p class="price">
              <span class="price-span">￥ {{ selectCounpon.acpay }}</span>
              <span class="title">应付金额：</span>
            </p>

            <a-button class="pay-btn" @click="toPay()">提交订单</a-button>
          </div>
          <div style="clear: both;"></div>
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>
    <a-modal title="收货人编辑" v-model="visible" :footer="null">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="收货人姓名：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'contactname',
              {rules: [{ required: true, message: '请填写收货人姓名' }]}
            ]"
          />
        </a-form-item>
        <a-form-item label="收货人电话：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'contactphone',
              {rules: [{ required: true, validator: validatePhone}]}
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 8 }"></a-form-item>
        <a-button class="save-btn" type="primary" html-type="submit">保存</a-button>
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
      remarks: '',
      form: this.$form.createForm(this),
      orderType: 0,
      isCoupon: false,
      cartList: [],
      visible: false,
      goodsArr: [],
      couponList: [],
      couponCode: 0, // 选中优惠券ID
      unqid: 0, //优惠券领取表id
      coupNum: 0,
      isPostal: false, // 是否使用包邮券
      receiverList: [],
      consignee: "",
      contact: "",
      shipid: 0,
      selectCounpon: {
        acvalue: 0, // 活动优惠
        cpvalue: 0, // 优惠券金额
        freeship: false, // 是不是免运费
        payamt: 0, // 实付金额
        tdiscount: 0, // 总共优惠
        tprice: 0, // 总计金额
        acpay: 0,
        bal: 0
      },
      exno: '',
      pwd: '',
      invoice: {},
      invoiceCode: 1, // 1普通发票 2增值税发票
      isSelectBalway: true,
      offlineCouponText: '', // 线下优惠券提示
    };
  },
  mounted() {
    this.cartList = JSON.parse(sessionStorage.getItem("placeOrderList"));
    this.placeType = this.$route.query.placeType;
    this.orderType = this.$route.query.orderType;
    this.actcode = this.$route.query.actcode || 0;
    // 获取优惠券信息
    this.queryActCouponList();
    // 加载图片
    this.fsGeneralMethods.addImages(this, this.cartList, "pdno", "spu");
    // 获取联系人信息
    this.queryMyConsignee();
    // 获取金额
    this.couponCalculate();
    // 获取发票信息
    this.getInvoice();
  },
  methods: {
    useCoupon() {
      if(this.exno === '') {
        this.$message.error('请填写优惠券券码 ')
        return
      }
      if(this.pwd === '') {
        this.$message.error('请填写优惠券密码 ')
        return
      }
      this.fsGeneralMethods
        .request(this, "discountServer", "CouponManageModule", "revOfflineExcgCoupon", {
          compid: this.storeInfo.comp.storeId,
          exno: this.exno,
          pwd: this.pwd
        })
        .then(result => {
          if (result.code === 200 && result.data.unqid !== 0) {
            this.offlineCouponCalculate(result.data.unqid)
          }
        });
      
    },
    offlineCouponCalculate(unqid) {
      let _this = this;
      let arr = this.cartList.map(value => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          compid: _this.storeInfo.comp.storeId,
          price: value.pdprice,
          amt: value.pdprice * value.num,
          coupon: unqid,
          shipfee: _this.cartList[0].freight,
          balway: _this.isSelectBalway ? 1 : 0,
        };
      });
      this.fsGeneralMethods
        .request(this, "orderServer", "CouponRevModule", "offlineCouponCalculate" , arr)
        .then(result => {
          if (result.code === 200) {
            this.$message.success(result.message)
            this.selectCounpon = result.data;
            this.offlineCouponText = this.selectCounpon.msg
            this.unqid = unqid
            this.queryActCouponList()
          }
        });
    },
    // 获取发票信息
    getInvoice() {
      let _this = this;
      this.fsGeneralMethods
        .request(this, "userServer", "MyInvoiceModule", "getInvoice")
        .then(result => {
          if (result.code === 200 && result.data.length > 0) {
            this.invoice = result.data[0];
          } else {
            this.$confirm({
              title: "提示",
              content: "当前药店未填写开票信息, 无法进行下单, 前往录入开票信息",
              okText: "确定",
              cancelText: "取消",
              cancelButtonProps: {
                props: { disabled: true }
              },
              onOk() {
                _this.$router.push({
                  path: "/user/personal/invoice"
                });
              }
            });
          }
        });
    },
    queryMyConsignee() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyDrugStoreInfoModule";
      iRequest.method = "queryMyConsignee";
      iRequest.param.json = JSON.stringify({
        compid: _this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            if (result.data && result.data.length > 0) {
              _this.receiverList = result.data;
              let number = 0;
              for (let i = 0; i < _this.receiverList.length; i++) {
                if ((_this.receiverList[i].cstatus & 2) > 0) {
                  _this.consignee = _this.receiverList[i].contactname;
                  _this.contact = _this.receiverList[i].contactphone;
                  _this.shipid = _this.receiverList[i].shipid;
                  number++;
                }
              }
              if (number === 0) {
                _this.consignee = _this.receiverList[0].contactname;
                _this.contact = _this.receiverList[0].contactphone;
                _this.shipid = _this.receiverList[0].shipid;
              }
            } else {
              _this.visible = true;
            }
          } else {
            _this.visible = true;
          }
        })
      );
    },
    queryActCouponList() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "queryActCouponList";
      let arr = this.cartList.map(value => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          compid: _this.storeInfo.comp.storeId,
          price: value.pdprice,
          amt: value.pdprice * value.num,
          samt: value.acamt + value.amt,
          flag: value.oflag ? 1 : 0,
          balway: _this.isSelectBalway ? 1 : 0
        };
      });
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (
            result.code === 200 &&
            result.data !== undefined &&
            result.data.length > 0
          ) {
            result.data.forEach(item => {
              if(item.unqid == _this.unqid) {
                item.isChecked = true;
              }else {
                item.isChecked = false;
              }
             
            });
            _this.couponList = result.data;
          }
        })
      );
    },
    couponCalculate(item) {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "CouponCalculate";
      let arr = this.cartList.map(value => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          compid: _this.storeInfo.comp.storeId,
          price: value.pdprice,
          amt: value.pdprice * value.num,
          coupon: _this.unqid,
          shipfee: _this.cartList[0].freight,
          balway: _this.isSelectBalway ? 1 : 0
        };
      });
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.selectCounpon = result.data;
          }
        })
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
      let goodsArr = this.cartList.map(value => {
        return {
          pdno: value.pdno,
          pnum: value.num,
          pdprice: value.pdprice,
          actcode: JSON.stringify(value.actcode)
        };
      });
      iRequest.param.json = JSON.stringify({
        placeType: this.placeType,
        balway: _this.isSelectBalway ? 1 : 0,
        coupon: this.couponCode, // 优惠券码
        unqid: this.unqid,
        orderObj: {
          remarks: this.remarks,
          cusno: this.storeInfo.comp.storeId,
          busno: 536862720, //自营暂时写死
          consignee: this.consignee,
          contact: this.contact,
          rvaddno: this.storeInfo.comp.addressCode,
          address: this.storeInfo.comp.address
        },
        goodsArr: goodsArr,
        orderType: this.orderType,
        actcode: this.cartList[0].actcode
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.$router.push({
              path: "/order/pay",
              query: {
                orderno: result.data.orderno
              }
            });
          }
        })
      );
    },
    // 新增收货人
    handleSubmit(e) {
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
            shipid: _this.shipid
          });
          iRequest.param.token = localStorage.getItem("identification");
          this.$refcallback(
            this,
            "userServer",
            iRequest,
            new this.$iceCallback(function result(result) {
              if (result.code === 200) {
                _this.queryMyConsignee();
                _this.visible = false;
              }
            })
          );
        }
      });
    },
    editorAddress() {
      this.visible = true;
      setTimeout(() => {
        this.form.setFieldsValue({
          contactname: this.consignee,
          contactphone: this.contact
        });
      }, 500);
    },
    validatePhone(rule, value, callback) {
      let _this = this;
      const form = this.form;
      if (value && /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value)) {
        callback();
      } else {
        this.sendAuthCode = false;
        callback("收货人手机号码有误");
      }
    },
    onChange(item, index, e) {
      if (item.isChecked) {
        this.unqid = 0;
        this.couponCode = 0;
        this.coupNum = 0;
        this.isPostal = false;
        item.isChecked = false
      } else {
        this.unqid = item.unqid;
        this.couponCode = item.coupno;
        this.coupNum = item.offerAmt;
        item.isChecked = true
        item.brulecode === 2120
          ? (this.isPostal = true)
          : (this.isPostal = false);
      }
      this.couponList.forEach((item, i) => {
        if (index !== i) {
          item.isChecked = false;
        }
      });
      this.couponCalculate();
    },
    handleChange(value) {
      this.invoiceCode = value;
    },
    onChangeBalWay(e) {
      this.isSelectBalway = e.target.checked
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
.line-btn{
  .button-size(98px,28px,28px,14px,0px,3px);
  .button-color(1px solid transparent,#ed2f26,#fff);
  margin-left: 20px;
}
.line-coupon{
  display: inline-block;
  width: 180px!important;
  height: 30px!important;
  margin-bottom: 10px;
  margin-left: 18px;
}
.edit {
  color: #3189f5 !important;
}
.edit:hover {
  cursor: pointer;
}
.fuhao {
  font-size: 16px;
}
.money {
  font-size: 30px;
}
.goods-box {
  background: #f2f2f2;
}
.no-coupon{
  .p-size(50px, 50px, 16px, center, 0px, #999999);
}
.balance{
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #fafafa;
  margin-top: 20px;
  border-bottom: 1px dashed #e0e0e0;
  .title{
    .p-size(50px, 50px, 16px, left, 20px, #999999);
    background: #f2f2f2;
  }
  .user-balance{
    .p-size(50px, 50px, 16px, left, 20px, #666);
    border-bottom: 1px dashed #e0e0e0;
    background: #fafafa;
    span{
      display: inline-block;
      color: #ed2f26;
    }
  }
  .leaving{
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
.select-invo-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  border-bottom: 1px dashed #e0e0e0;
  background: #fafafa;
  .title {
    .p-size(50px, 50px, 16px, left, 20px, #999999);
    background: #f2f2f2;
  }
  .select-invo {
    .p-size(50px, 50px, 16px, left, 20px, #999999);
  }
}

.receiving {
  .container-size(block, 1190px, 280px, 20px auto 20px auto, 0px);
  .container-color(#fafafa, 1px solid transparent, #333333);
  border-bottom: 1px dashed #e0e0e0;
}
.receiving-address {
  .p-size(50px, 50px, 16px, left, 20px, #999999);
  .p-color(#f2f2f2, none, #999);
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
  .container-size(block, 1189px, auto, 0 auto 20px auto, 0);
  // border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  background: #ffffff;
  color: #333333;
}
.goods-title {
  .container-size(inline-block, 1188px, 50px, 0, 0);
  .container-color(#f2f2f2, none, #666);
  margin-top: 20px;
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
  background: #f2f2f2;
  border-bottom: 1px dashed #e0e0e0;
  margin-bottom: 20px;
}
.goods-table-name {
  .p-size(50px, 50px, 16px, left, 20px, #999);
  background: #fafafa;
}
.goods-table li {
  .container-size(block, 1190px, 120px, 0, 0);
  border-top: 1px solid #e0e0e0;
  background: #fafafa;
  // border-bottom: 1px solid #e0e0e0;
}
.goods-name {
  float: left;
  .container-size(inline-block, 450px, 120px, 0, 0);
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-name img {
  vertical-align: middle;
  .container-size(inline-block, 80px, 80px, 0, 0);
  margin: 20px 0 0 20px;
}
.drugs-name {
  .position(absolute, 22px, 120px);
  .container-size(inline-block, 330px, 20px, 0, 0);
}
.active{
  .position(absolute, 93px, 120px);
  .container-size(inline-block, 330px, 20px, 0, 0);
}
.drugs-guige {
  .position(absolute, 45px, 120px);
  .container-size(inline-block, 330px, 20px, 0, 0);
}
.drugs-comp {
  .position(absolute, 70px, 120px);
  .container-size(inline-block, 330px, 20px, 0, 0);
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap;
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
  .container-size(block, 1190px, auto, 20px auto 80px auto, 0);
  // border: 1px solid #e0e0e0;
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
  .container-size(block, 1190px, auto, 0, 0);
  // border-bottom: 1px solid #e0e0e0;
  background: #f2f2f2;
  margin-top: 20px;
  border-bottom: 1px dashed #e0e0e0;
  .use-coupon {
    .p-size(50px, 50px, 16px, left, 22px, #999999);
    span {
      color: #ed2f26;
    }
    button {
      .button-color(1px solid transparent, #ed2f26, #fff);
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
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
  .container-size(block, 100%, 310px, 0, 0);
  background: #fafafa;
  border-bottom: 1px dashed #e0e0e0;
}

.pay p {
  .p-size(40px, 40px, 16px, right, 0px, #666666);
  padding-right: 45px;
  .title {
    float: right;
    width: 100px;
    height: 40px;
    text-align: right !important;
  }
  .price-span {
    float: right;
    width: 150px;
    height: 40px;
  }
}
.pay .price {
  font-size: 20px !important;
  font-weight: bold;
  color: #ed2f26 !important;
}
.pay-btn {
  float: right;
  margin-right: 40px;
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
  background: #f2f2f2;
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
.coupon-box {
  .container-size(block, 1190px, auto, 0, 0);
  background: #f2f2f2;
  margin-top: 10px;
  .coupon {
    .container-size(inline-block, 270px, 180px, 0, 0);
    margin-left: 22px;
    // background: pink;
    .coupon-num {
      .container-size(inline-block, 268px, 145px, 0, 0);
      background: url("../../assets/img/quan-bg.png");
    }
    p {
      .p-size(30px, 30px, 14px, left, 20px, #ffffff);
      .coupon-check {
        float: right;
        margin-right: 20px;
      }
    }
    .coupon-title {
      text-indent: 80px !important;
      font-weight: bold;
      font-size: 16px !important;
      color: #ffffff;
    }
  }
}
.coupon-bottom {
  width: 268px;
  color: #999999 !important;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
}
.stets {
  .container-size(block, 600px, 100px, 0 auto, 0);
  margin-top: 30px;
}
.ant-input {
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 0px !important;
  -moz-border-radius: 0px !important;
  -webkit-border-radius: 0px !important;
}
.save-btn {
  .button-size(90px, 36px, 36px, 14px, 0px, 3px);
  .button-display(block, 0 auto);
  .button-color(1px solid transparent, #ed2f26, #ffffff);
  margin-top: 10px;
}
</style>
