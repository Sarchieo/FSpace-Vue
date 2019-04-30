<template>
  <div>
    <a-tabs defaultActiveKey="0" @change="callback">
      <a-tab-pane tab="可使用" key="0">
        <div class="haved-coupon" >
          <div class="condition-price" v-for="(item, index) in revCouponList" :key="index">
            <div class="discount" v-if="item.brulecode === 2110">
              <p class="discount-count">{{ item.rulename }}</p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span> 减 <span>{{ j.offer}}</span> </p>
              <p class="validity">有效期:{{item.startdate}}至{{item.enddate}}</p>
              <!-- <p>有效期 {{ item.validday }} 天</p> -->
            </div>
            <div class="discount" v-if="item.brulecode === 2120">
              <p class="discount-count margin-bottom35">{{ item.rulename }}</p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span>包邮 </p>
              <p class="validity">有效期:{{item.startdate}}至{{item.enddate}}</p>
            </div>
            <div class="discount" v-if="item.brulecode === 2130">
              <p class="discount-count">{{ item.rulename }}</p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span> 打 <span>{{ j.offer/10}}</span>折 </p>
              <p class="validity">有效期:{{item.startdate}}至{{item.enddate}}</p>
              <!-- <p>有效期 {{ item.validday }} 天</p> -->
            </div>
             <!-- <img class="state-pic" src="../../../assets/img/already.png" alt=""> -->
             <img class="right-img" src="../../../assets/img/receives.png" alt="">
          </div> 
        </div>
      </a-tab-pane>
      <a-tab-pane tab="已使用" key="1" forceRender>
        <div class="haved-coupon">
          <!-- <div class="condition-price">
            <div class="discount">
              <p class="discount-count">减现券</p>
               <p>满800减50</p>
              <p>满1600减100</p>
              <p>最多减200</p>
              <p>2019-03-27至2019-04-20可用</p>
              <img class="state-pic" src="../../../assets/img/already.png" alt="">
            </div>
          </div> -->
          <div class="condition-price" v-for="(item, index) in usedCouponList" :key="index">
            <div class="discount" v-if="item.brulecode === 2110">
              <p class="discount-count">{{ item.rulename }} <span class="term">有效期:{{item.startdate}}至{{item.enddate}}</span></p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span> 减 <span>{{ j.offer}}</span> </p>
              <!-- <p>有效期:{{item.startdate}}至{{item.enddate}}</p> -->
              <!-- <p>有效期 {{ item.validday }} 天</p> -->
            </div>
            <div class="discount" v-if="item.brulecode === 2120">
              <p class="discount-count margin-bottom35">{{ item.rulename }} <span class="term">有效期 {{ item.validday }} 天</span></p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span>包邮 </p>
            </div>
            <div class="discount" v-if="item.brulecode === 2130">
              <p class="discount-count">{{ item.rulename }} <span class="term">有效期 {{ item.validday }} 天</span></p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span> 打 <span>{{ j.offer/10}}</span>折 </p>
              <!-- <p>有效期 {{ item.validday }} 天</p> -->
            </div>
            <img class="state-pic" src="../../../assets/img/already.png" alt="">
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="已失效" key="2">
        <div class="haved-coupon">
          <!-- <div class="condition-price">
            <div class="discount">
              <p class="discount-count margin-bottom35">包邮券</p>
              <p class="margin-bottom35">满600元即送包邮券</p>
              <p>2019-03-27至2019-04-20可用</p>
               <img class="state-pic" src="../../../assets/img/Invalid.png" alt="">
            </div>
          </div> -->
           <div class="condition-price" v-for="(item, index) in invalidCouponList" :key="index">
            <div class="discount" v-if="item.brulecode === 2110">
              <p class="discount-count">{{ item.rulename }} <span class="term">有效期:{{item.startdate}}至{{item.enddate}}</span></p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span> 减 <span>{{ j.offer}}</span> </p>
              <!-- <p>有效期:{{item.startdate}}至{{item.enddate}}</p> -->
              <!-- <p>有效期 {{ item.validday }} 天</p> -->
            </div>
            <div class="discount" v-if="item.brulecode === 2120">
              <p class="discount-count margin-bottom35">{{ item.rulename }} <span class="term">有效期 {{ item.validday }} 天</span></p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span>包邮 </p>
            </div>
            <div class="discount" v-if="item.brulecode === 2130">
              <p class="discount-count">{{ item.rulename }} <span class="term">有效期 {{ item.validday }} 天</span></p>
              <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span> 打 <span>{{ j.offer/10}}</span>折 </p>
              <!-- <p>有效期 {{ item.validday }} 天</p> -->
            </div>
             <!-- <img class="state-pic" src="../../../assets/img/already.png" alt=""> -->
            <img class="state-pic" src="../../../assets/img/Invalid.png" alt="">
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
            <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span> 打 <span>{{ j.offer/10}}</span>折 </p>
            <p class="validity">有效期:{{item.startdate}}至{{item.enddate}}</p>
            <!-- <p>有效期 {{ item.validday }} 天</p> -->
          </div>
          <div class="discount"  v-if="item.brulecode === 2110">
            <p class="discount-count">{{ item.rulename }} </p>
            <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span> 减 <span>{{ j.offer}}</span> </p>
            <p class="validity">有效期:{{item.startdate}}至{{item.enddate}}</p>
            <!-- <p>有效期 {{ item.validday }} 天</p> -->
          </div>
          <div class="discount" v-if="item.brulecode === 2120">
            <p class="discount-count margin-bottom35">{{ item.rulename }} </p>
            <p class="discount-coupon" v-for="(j, i) in item.ladderVOS" :key="i">满 <span>{{ j.ladamt }}</span>包邮 </p>
            <p class="validity">有效期:{{item.startdate}}至{{item.enddate}}</p>
          </div>
          <img class="right-img" src="../../../assets/img/receive.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as types from '../../../store/mutation-types'
export default {
  data() {
    return {
      couponPub: [],
      revCouponList: [],
      usedCouponList: [],
      invalidCouponList: [],
      type: 0
    };
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.queryRevCouponList(0)
    this.queryCouponPub()
    this.$store.commit(types.SELECTED_KEYS, '/user/personal/coupon')
  },
  methods: {
    // 获取我的优惠券
    queryRevCouponList(ctype) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "queryRevCouponList";
      this.type = ctype
      iRequest.param.json = JSON.stringify({
        compid: _this.storeInfo.comp.storeId,
        type: ctype, // 0 可使用 1 已使用 2 已失效
        pageSize: 5,
        pageNo: 1
      })
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" + Math.floor(_this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
              if(result.data.length > 0) {
                switch(ctype) {
                case 0:
                _this.revCouponList = result.data
                break;
                case 1:
                _this.usedCouponList = result.data
                break;
                case 2:
                _this.invalidCouponList = result.data
                break;
              }
            }
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
       iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        gcode: -1,
        compid: _this.storeInfo.comp.storeId, // 企业id
        pageSize: 5,
        pageNo: 1
      })
      this.$refcallback(
        this,
        "discountServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.couponPub = result.data
            }
          }
        )
      );
    },
    // 领取优惠券
    revCoupon(item) {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CouponRevModule";
      iRequest.method = "revCoupon";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify(item)
      this.$refcallback(
        this,
        "orderServer" + Math.floor(_this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.$message.success(result.message);
              _this.queryRevCouponList(_this.type)
              _this.queryCouponPub()
            }
          }
        )
      );
    },
    callback(key) {
      this.queryRevCouponList(Number(key) )
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.validity{
  .p-size(20px, 20px, 14px, left, 13px, #666666);
}
.term{
  float: right;
  margin-right: 20px;
  font-size: 14px;
  color: #ffffff;
}
.discount-coupon{
  .p-size(20px, 20px, 14px, left, 13px, #666666);
  span{
    color:#ed3025;
  }
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
      float: left;
      .container-size(inline-block, 245px, 175px, 0, 0px);
      // .position(relative, 0px, 0px);
      border: 1px solid #fdddc5;
      background: #fffbf3;
      .state-pic {
        .position(relative, -58px, 176px);
      }
      .discount-count {
        .container-size(inline-block, 245px, 50px, 0, 0px);
        .p-size(40px, 40px, 20px, center, 0px, #ffffff);
        margin-bottom: 10px;
        background: #666666;

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
      // p {
      //   .p-size(20px, 20px, 14px, left, 13px, #666666);
      // }
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
        float: left;
        .container-size(inline-block, 245px, 175px, 0, 0px);
        // .position(relative, 0px, 0px);
        border: 1px solid #fdddc5;
        background: #fffbf3;
        .state-pic{
          .position(relative, -46px, 176px);
        }
        .discount-count {
        .container-size(inline-block, 245px, 50px, 0, 0px);
        .p-size(40px, 40px, 20px, center, 0px, #ffffff);
        margin-bottom: 10px;
        background: #666666;
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
        // p {
        //   .p-size(20px, 20px, 14px, left, 13px, #666666);
        // }
      }
    }
  }
}
</style>