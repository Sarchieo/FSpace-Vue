<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <a-breadcrumb separator=">" class="crumbs">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>我的订单</a-breadcrumb-item>
          <a-breadcrumb-item>申请售后</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="after-box">
          <p class="title">请选择退款药品</p>
          <div class="cart-box">
            <ul class="table-header">
              <li class="whole">
                <a-checkbox @change="checkAll">全选</a-checkbox>
              </li>
              <li class="width40">商品信息</li>
              <li class="width20">单价</li>
              <li class="width20">购买数量</li>
              <li class="width20">退货数量</li>
              <!--<li class="width20">退款金额</li>-->
              <li class="width20">退款金额</li>
            </ul>
            <ul class="goods-lists">
              <li class="goods-lists-li">
                <div class="first-div" v-for="(item,index) in goodsArr" :key="index">
                  <a-checkbox @change="onChange" v-model="item.checked" class="pick-input"></a-checkbox>
                  <!-- <input type="radio" class="pick-input"> -->
                  <img v-lazy="item.imgURl" class="after-pic">
                  <div class="goods-info">
                    <p class="goods-name">{{item.brandName}} {{ item.prodname }} {{item.spec}}</p>
                    <p class="goods-guige">{{item.pspec}}</p>
                    <p class="manufactor">{{item.manun}}</p>
                  </div>
                  <div class="old-price">￥{{item.pdprice}}元</div>
                  <div class="shoping-num">
                    <span>{{item.inventory}}</span>
                  </div>
                  <div class="count">
                    <a-button class="add-reduce" @click="reduce(item)">-</a-button>
                    <!-- <span class="count-num">{{item.pnum}}</span> -->
                    <a-input-number :min="1" :max="item.inventory" v-model="item.pnum" style="position: relative;top: 1px;left:0px;width: 60px;height:30px;line-height: 28px;" readonly="readonly"/>
                    <a-button class="add-reduce" @click="addNum(item)" >+</a-button>
                  </div>
                  <div class="new-price">￥{{item.payamt}}元</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="next-step">
            <a-button v-if="isShowBtn" type="primary" class="after-btn" @click="toReason()">下一步</a-button>
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
import { accMul, accDiv } from "@/plugins/calculate.js";
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
        goodsArr: [],
        orderno: 0,
        asType: 0,
        isShowBtn: false
    };
  },

  mounted() {
      this.asType = this.$route.query.asType;
      this.orderno = this.$route.query.orderno;
      this.goodsArr = JSON.parse(sessionStorage.getItem("afterSaleGoods"));
      this.fsGeneralMethods.addImages(this, this.goodsArr, "pdno", "spu");
      this.goodsArr.forEach((item) => {
       item.inventory = item.pnum
       item.price = item.payamt
      })
    //
    // console.log("goodsArrqweqweqw1111--- " + JSON.stringify(this.goodsArr));
  },
  methods: {
    reduce(item) {
      if (item.pnum === 1) {
        return false;
      }
      item.pnum-=1;
        if (item.pnum == item.inventory) {
            item.payamt = item.price
        } else {
            item.payamt = accMul(accDiv(item.price,item.inventory),item.pnum)
        }
    },
    addNum(item) {
      if(item.pnum >= item.inventory){
        return false
      } else {
        item.pnum +=1;
      }
      if (item.pnum == item.inventory) {
          item.payamt = item.price
      } else {
          item.payamt = accMul(accDiv(item.price,item.inventory),item.pnum)
      }
    },

    onChange(val) {
      // 单选
        if (val.target.checked) {
            this.isShowBtn = true
        } else {
            this.isShowBtn = false
        }
    },
    checkAll(e) {
      // 全选
      this.goodsArr.forEach(item => {
        if (item.status != 1) {
          item.checked = e.target.checked;
            if (item.checked) {
                this.isShowBtn = true
            } else {
                this.isShowBtn = false
            }
        }
      });
    },
    // 跳转填写原因
    toReason() {
      let arr = []
      for (let i = 0; i < this.goodsArr.length; i++) {
        if (this.goodsArr[i].checked) {
          arr.push({
              pname: this.goodsArr[i].pname,
              pspec: this.goodsArr[i].pspec,
              manun: this.goodsArr[i].manun,
              pdprice: this.goodsArr[i].pdprice,
              pnum: this.goodsArr[i].pnum,
              payamt: this.goodsArr[i].payamt,
              pdno: this.goodsArr[i].pdno,
              orderno: this.goodsArr[i].orderno,
              compid: this.goodsArr[i].compid,
              imgURl: this.goodsArr[i].imgURl
          })
        }
      }
      // console.log("fillOrderReason--- " + JSON.stringify(arr))
      sessionStorage.setItem("fillOrderReason", JSON.stringify(arr));
      this.$router.push({
        path: "/order/reason",
        query: {
            orderno: this.orderno,
            asType: this.asType
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
#components-layout-demo-basic .ant-layout-footer {
  /* background: deeppink; */
  color: #ffffff;
}
.ant-layout-content {
  background: #ffffff;
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
.crumbs {
  .p-size(50px, 50px, 14px, left, 235px, #999999);
  margin-top: 20px;
}
.cart-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #ffffff;
  min-height: 205px;
}
.table-header {
  .container-size(block, 1190px, 60px, 0 auto, 0px);
  background: #f8f8f8;
  color: #666;
}
.table-header li {
  .container-size(inline-block, 213px, 60px, 0 auto, 0px);
  text-align: center;
  line-height: 60px;
}
.goods-lists {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  border: 1px solid #e0e0e0;
}
.nutrition {
  .container-size(block, 1190px, 50px, 0 auto, 0px);
  line-height: 50px;
  text-indent: 15px;
}
.nutrition i {
  font-size: 18px;
  color: #666;
}
.whole {
  width: 80px !important;
}
.total-price {
  font-size: 18px;
  font-weight: bold;
  color: #ed2f26;
}
.first-div {
  .position(relative, 0px, 0px);
  .container-size(inline-block, 1190px, 140px, 0, 0px);
  border-bottom: 1px solid #e0e0e0;
}
.first-div img {
  .container-size(inline-block, 95px, 95px, 0, 0px);
  .position(absolute, 20px, 40px);
}
.first-div p {
  .container-size(inline-block, 330px, 30px, 0, 0px);
  line-height: 30px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.first-div .pick-input {
  .position(absolute, 60px, 10px);
}
.title {
  display: block;
  width: 1190px;
  margin: 0 auto;
  .p-size(50px, 50px, 16px, left, 0px, #333333);
}
.width40 {
  width: 405px !important;
}
.width20 {
  width: 176px !important;
}
.after-pic {
  width: 95px;
  height: 95px;
}
.goods-info {
  .container-size(inline-block, 334px, 140px, 0, 0px);
  .position(absolute, 0px, 150px);
  width: 334px !important;
  line-height: 0px !important;
  padding: 18px 0px;
}
.goods-lists-li {
  height: auto;
}
.old-price {
  .position(absolute, 0px, 484px);
}
.count {
  .position(absolute, 0px, 836px);
  .count-num {
    display: inline-block;
    width: 56px;
    height: 30px;
    line-height: 28px;
    border: 1px solid #e0e0e0;
  }
  .add-reduce {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding-right: 23px;
  }
}
.shoping-num{
   .position(absolute, 0px, 660px);
}
.new-price {
  .position(absolute, 0px, 1012px);
}
.first-div div {
  width: 176px;
  height: 140px;
  text-align: center;
  line-height: 140px;
  font-size: 16px;
  color: #333333;
}
.next-step {
  .container-size(block, 1190px, 90px, 0 auto, 0px);
  background: #f8f8f8;
  margin-bottom: 20px;
  .after-btn {
    float: right;
    .button-size(150px, 45px, 45px, 16px, 0px, 5px);
    .button-color(1px solid transparent, #ed2f26, #ffffff);
    margin-top: 22px;
  }
}
.after-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
}
.table-header li{
  float: left;
}
  .ant-input{
     border: 1px solid #e0e0e0;
     border-radius: 0px!important;
   }
</style>
