<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="可使用" key="1">
        <div class="haved-coupon">
          <div class="condition-price">
            <div class="discount">
              <span class="discount-count">9.5</span>
              <span class="discount-text">折</span>
              <span class="satisfy">满600元可用</span>
              <p>全场折扣券</p>
              <p>2019-03-27至2019-04-20可用</p>
              <!-- <img class="state-pic" src="../../../assets/img/Invalid.png" alt=""> -->
              <!-- <img class="state-pic" src="../../../assets/img/invalied.png" alt=""> -->
              <img class="state-pic" src="../../../assets/img/already.png" alt="">
            </div>
            <img class="right-img" src="../../../assets/img/receives.png" alt="">
          </div>
          <div class="condition-price">
            <div class="discount">
              <span class="discount-count">30</span>
              <span class="discount-str">￥</span>
              <span class="satisfy">满600元可用</span>
              <p>全场折扣券</p>
              <p>2019-03-27至2019-04-20可用</p>
               <img class="state-pic" src="../../../assets/img/already.png" alt="">
            </div>
            <img class="right-img" src="../../../assets/img/receives.png" alt="">
          </div>
          <div class="condition-price">
            <div class="discount">
              <span class="discount-count">30</span>
              <span class="discount-str">￥</span>
              <span class="satisfy">满600元可用</span>
              <p>全场折扣券</p>
              <p>2019-03-27至2019-04-20可用</p>
              <img class="state-pic" src="../../../assets/img/already.png" alt="">
            </div>
             <img class="right-img" src="../../../assets/img/receives.png" alt="">
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="已使用" key="2" forceRender>
        <div class="haved-coupon">可使用</div>
      </a-tab-pane>
      <a-tab-pane tab="已失效" key="3">
        <div class="haved-coupon">已失效</div>
      </a-tab-pane>
    </a-tabs>
    <div class="more-coupon">
      <p class="more-text">更多优惠券</p>
      <div class="condition-price-box">
        <div class="condition-price">
          <div class="discount">
            <span class="discount-count">9.5</span>
            <span class="discount-text">折</span>
            <span class="satisfy">满600元可用</span>
            <p>全场折扣券</p>
            <p>2019-03-27至2019-04-20可用</p>
            <img class="state-pic" src="../../../assets/img/already.png" alt="">
          </div>
          <img class="right-img" src="../../../assets/img/receives.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
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
        .position(relative, -46px, 176px);
      }
      .discount-count {
        .container-size(inline-block, 100px, 100px, 0, 0px);
        .p-size(80px, 80px, 60px, center, 0px, #ed3025);
        margin-bottom: 20px;
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
          .container-size(inline-block, 100px, 100px, 0, 0px);
          .p-size(80px, 80px, 60px, center, 0px, #ed3025);
          margin-bottom: 20px;
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