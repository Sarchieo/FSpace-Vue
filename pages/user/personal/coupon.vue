<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="可使用" key="1">
        <div class="haved-coupon" >
          <div class="condition-price" v-for="(item, index) in revCouponList" :key="index">
            <div class="discount" v-if="item.brulecode === 2110">
              <p class="discount-count">{{ item.rulename }}</p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }} 减 {{ j.offer}} </p>
              <p>有效期:{{item.startdate}}至{{item.enddate}}</p>
              <p>有效期 {{ item.validday }} 天</p>
            </div>
             <!-- <img class="state-pic" src="../../../assets/img/already.png" alt=""> -->
             <img class="right-img" src="../../../assets/img/receives.png" v-if="item.brulecode === 2110" alt="">
          </div> 
          <!-- <img class="right-img" src="../../../assets/img/receives.png" alt=""> -->
        </div>
      </a-tab-pane>
      <a-tab-pane tab="已使用" key="2" forceRender>
        <div class="haved-coupon">
          <div class="condition-price">
            <div class="discount">
              <p class="discount-count">减现券</p>
               <p>满800减50</p>
              <p>满1600减100</p>
              <p>最多减200</p>
              <!-- <span class="discount-count">30</span>
              <span class="discount-str">￥</span>
              <span class="satisfy">满600元可用</span> -->
              <!-- <p>全场折扣券</p> -->
              <p>2019-03-27至2019-04-20可用</p>
              <img class="state-pic" src="../../../assets/img/already.png" alt="">
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="已失效" key="3">
        <div class="haved-coupon">
          <div class="condition-price">
            <div class="discount">
              <p class="discount-count margin-bottom35">包邮券</p>
              <p class="margin-bottom35">满600元即送包邮券</p>
              <!-- <span class="discount-str">￥</span> -->
              <!-- <span class="satisfy">满600元即送包邮券</span> -->
              <!-- <p>全场折扣券</p> -->
              <p>2019-03-27至2019-04-20可用</p>
               <img class="state-pic" src="../../../assets/img/Invalid.png" alt="">
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div class="more-coupon" v-if="couponPub.length > 0">
      <p class="more-text">更多优惠券</p>
      <div class="condition-price-box">
        <div class="condition-price"  v-for="(item, index) in couponPub" :key="index" @click="revCoupon(item)">
          <div class="discount" v-if="item.brulecode === 2130">
            <p class="discount-count">{{ item.rulename }}</p>
            <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }} 打 {{ j.offer/10}}折 </p>
            <p>有效期 {{ item.validday }} 天</p>
          </div>
          <div class="discount"  v-if="item.brulecode === 2110">
            <p class="discount-count">{{ item.rulename }}</p>
            <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.ladamt }} 减 {{ j.offer}} </p>
            <p>有效期 {{ item.validday }} 天</p>
          </div>
          <div class="discount" v-if="item.brulecode === 2120">
            <p class="discount-count margin-bottom35">{{ item.rulename }}</p>
            <span v-for="(j, i) in item.ladderVOS" :key="i">满{{ j.offer }}包邮 </span>
          </div>
          <img class="right-img" src="../../../assets/img/receive.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      couponPub: [],
      revCouponList: []
    };
  },
  mounted() {
    this.queryRevCouponList(0)
    this.queryCouponPub()
  },
  methods: {
    // 获取我的优惠券
    queryRevCouponList(ctype) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "queryRevCouponList";
      iRequest.param.json = JSON.stringify({
        compid: 536862720,
        type: ctype,
        pageSize: 5,
        pageNo: 1
      })
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "orderServer" + Math.floor(536862720/8192%65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            debugger
            _this.revCouponList = result.data
            console.log('我的优惠券')
            console.log(result.data)
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
     // 获取待领取优惠券
    queryCouponPub() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponManageModule";
      iRequest.method = "queryCouponPub";
      iRequest.param.json = JSON.stringify({
        gcode: -1, // sku
        compid: '536862720', // 企业id
        pageSize: 5,
        pageNo: 1
      })
      this.$refcallback(
        "discountServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.couponPub = result.data
              console.log('更多优惠券')
              console.log(_this.couponPub)
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {
            _this.$message.error(e);
          }
        )
      );
    },
    // 领取优惠券
    revCoupon(item) {
      debugger
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponManageModule";
      iRequest.method = "revCoupon";
      iRequest.param.json = JSON.stringify(item)
      this.$refcallback(
        "discountServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              debugger
              _this.$message.success(result.message);
              _this.queryRevCouponList(0)
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {
            _this.$message.error(e);
          }
        )
      );
    },
    callback(key) {
      console.log(key);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.discount-coupon{
  .p-size(30px,30px,14px,left,10px,#999999);
}
.margin-bottom35{
  margin-bottom: 35px!important;
}
.haved-coupon {
  .container-size(inline-block, 968px, 400px, 10px 0px 20px 6px, 0px);
  padding: 15px 0 0 15px;
  overflow: auto;
  // border: 1px solid #e0e0e0;
  .condition-price {
    .container-size(inline-block, 303px, 175px, 0, 0px);
    cursor:pointer;
    margin-bottom: 10px;
    margin-right: 10px;
    .right-img{
      float: right;
      width: 55px;
      height: 175px;
    }
    .discount {
      .container-size(inline-block, 245px, 175px, 0, 0px);
      .position(relative, 0px, 0px);
      border: 1px solid #e0e0e0;
      .state-pic {
        .position(relative, -58px, 176px);
      }
      .discount-count {
        .container-size(inline-block, 245px, 50px, 0, 0px);
        .p-size(40px, 40px, 20px, center, 0px, #ed3025);
        margin-bottom: 10px;
      }
      .discount-str {
        .position(absolute, 12px, 3px);
        font-size: 20px;
        color: #ed3025;
      }
      .discount-text {
        .container-size(inline-block, 100px, 20px, 0, 0px);
        .p-size(20px, 20px, 14px, left, 0px, #ed3025);
        .position(absolute, 20px, 105px);
      }
      .satisfy {
        display: inline-block;
        .p-size(30px, 30px, 14px, left, 0px, #ed3025);
        .position(absolute, 40px, 105px);
        .p-color(#fdf3e8, none, #ed3025);
        padding: 0 8px;
        box-sizing: border-box;
      }
      p {
        .p-size(30px, 30px, 14px, left, 13px, #999999);
      }
    }
  }
}
.more-coupon {
  .container-size(inline-block, 968px, 455px, 0px 0px 10px 0px, 0px);
  overflow: auto;
  // border: 1px solid #e0e0e0;
  .more-text {
    .p-size(55px, 55px, 18px, left, 20px, #666666);
    .p-color(#f0f0f0, none, #666666);
  }
  .condition-price-box {
    padding: 15px 0 0 15px;
    .condition-price {
      .container-size(inline-block, 303px, 175px, 0, 0px);
      margin-bottom: 10px;
      margin-right: 10px;
      cursor:pointer;
      .right-img {
         float: right;
          width: 55px;
          height: 175px;
      }
      .discount {
        .container-size(inline-block, 245px, 175px, 0, 0px);
        .position(relative, 0px, 0px);
        border: 1px solid #e0e0e0;
        .state-pic{
          .position(relative, -46px, 176px);
        }
        .discount-count {
        .container-size(inline-block, 245px, 50px, 0, 0px);
        .p-size(40px, 40px, 20px, center, 0px, #ed3025);
        margin-bottom: 10px;
      }
        .discount-str {
          .position(absolute, 12px, 3px);
          font-size: 20px;
          color: #ed3025;
        }
        .discount-text {
          .container-size(inline-block, 100px, 20px, 0, 0px);
          .p-size(20px, 20px, 14px, left, 0px, #ed3025);
          .position(absolute, 20px, 105px);
        }
        .satisfy {
          display: inline-block;
          .p-size(30px, 30px, 14px, left, 0px, #ed3025);
          .position(absolute, 40px, 105px);
          .p-color(#fdf3e8, none, #ed3025);
          padding: 0 8px;
          box-sizing: border-box;
        }
        p {
          .p-size(30px, 30px, 14px, left, 13px, #999999);
        }
      }
    }
  }
}
</style>