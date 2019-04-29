<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <div class="inte-coupon">
        <div class="coupon-header"></div>
        <div class="sign-in">
          <p class="keep-sign">
            <span class="inte-total">当前累计积分：552</span>
            <span class="keep-text">427</span>
          </p>
          <!-- 根据签到状态循环不同图片 -->
          <div class="sign-pic">
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-signed.png" alt>
              <span>04.23</span>
            </div>
            <div>
              <img src="../../assets/img/jifen-unsigned.png" alt>
              <span>04.23</span>
            </div>
          </div>
          <p class="img-btn">
            <img src="../../assets/img/jifen-imme.png" alt>
          </p>
          <!-- <p class="moon-data"> <span>4.23</span><span>4.24</span><span>4.25</span><span>4.26</span><span>4.27</span><span>4.28</span><span>4.29</span></p> -->
          <div class="coupon-box">
            <div class="coupon-card">
              <div class="coupon-left">
                <p class="coupon-type"></p>
                <span>满 1000 减 50</span>
                <span>有效期 12 天</span>
              </div>
              <div class="coupon-right">
                <img class="state-pic" src="../../assets/img/receive.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div class="rule-box"></div>
      </div>
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
  middleware: 'authenticated',
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.ant-layout {
  background: #ffffff;
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
  background: #ffffff;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.inte-coupon {
  .container-size(block, 100%, 3200px, 0 auto, 0px);
  background: url("../../assets/img/jifen-bg.png") no-repeat;
  .coupon-header {
    .container-size(block, 100%, 718px, 0 auto, 0px);
    background: url("../../assets/img/jifen-banner.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 100px;
  }
  .sign-in {
    .container-size(block, 1255px, 1430px, 0 auto, 0px);
    padding-top: 160px;
    background: url("../../assets/img/jifen-back.png") no-repeat;
    margin-bottom: 75px;
    .keep-sign {
      width: 100%;
      .p-size(45px, 45px, 30px, center, 0px, #a04e3b);
      margin-bottom: 50px;
      .keep-text {
        float: right;
        width: 220px;
        height: 40px;
        margin-right: 235px;
        line-height: 22px;
        text-indent: 97px;
        background: url("../../assets/img/jifen-sign.png") no-repeat;
      }
      .inte-total {
        float: right;
        height: 40px;
        line-height: 22px;
        margin-right: 70px;
        font-size: 24px;
      }
    }
    .sign-pic {
      .container-size(inline-block, 100%, 100px, 0, 0px);
      text-align: center;
      margin-bottom: 50px;
      div {
        .container-size(inline-block, 38px, 80px, 0, 0px);
        margin-right: 40px;
        text-align: center;
        span {
          display: inline-block;
          width: 38px;
          text-align: center;
          margin-top: 20px;
        }
      }
      img {
        display: inline-block;
        margin-right: 50px;
      }
    }
    .img-btn {
      .p-size(75px, 75px, 16px, center, 0px, #a04e3b);
      margin-bottom: 100px;
      img {
        width: 300px;
        height: 100px;
      }
    }
    .img-btn img:hover {
      cursor: pointer;
    }
    .moon-data {
      width: 100%;
      .p-size(45px, 45px, 16px, center, 0px, #a04e3b);
      span {
        display: inline-block;
        width: 60px;
        margin-left: 18px;
        text-align: center;
      }
    }
    .coupon-box {
      .container-size(block, 845px, 661px, 0 auto, 0px);
      background: url("../../assets/img/jifen-coupon.png") no-repeat;
      padding-top: 50px;
      .coupon-card {
        display: inline-block;
        width: 340px;
        height: 160px;
        margin: 42px 20px 0px 30px;
      }
      .coupon-card:hover {
        cursor: pointer;
      }
      .coupon-left {
        float: left;
        width: 280px;
        height: 160px;
        border: 1px solid #e0e0e0;
      }
      .coupon-type {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        color: #ed3025;
      }
      .coupon-left span {
        display: inline-block;
        width: 100%;
        height: 30px;
        text-align: left;
        text-indent: 20px;
        color: #999999;
      }
      .coupon-right {
        float: right;
        width: 60px;
        height: 160px;
      }
      .coupon-right img {
        width: 100%;
        height: 100%;
      }
      .post-span {
        margin-bottom: 30px;
      }
    }
  }
  .rule-box {
    .container-size(block, 1255px, 790px, 0 auto, 0px);
    background: url("../../assets/img/jifen-rule.png") no-repeat;
  }
}
</style>
