<template>
  <div>
    <a-layout>
       <f-space-header type='home'></f-space-header>
       <a-layout-content class="base">
          <a-breadcrumb separator=">" class="crumbs">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>我的一块</a-breadcrumb-item>
          </a-breadcrumb>
          <!-- 头部内容 -->
          <div class='header-personal'>
            <div class="left">
              <p class="first">
                <a-icon type="profile" />
                长沙大药房
              </p>
              <p>
                <a-icon type="environment" />
                湖南省宁乡市玉潭街道合安社区兆基君城A区22栋112号
              </p>
               <p>
                 <a-icon type="user" />
                周星星
                 <a-icon type="mobile" />
                17621503679
              </p>
            </div>
            <div class="right">
              <!-- <p class="right-title">优惠信息</p> -->
              <p><span>优惠券</span>3张</p>
              <p><span>积分</span>268</p>
              <p><span> 我的红包</span>5元</p>
            </div>
            <div class="order-info">
              <!-- <p class="order-title">订单信息</p> -->
              <p><span>待付款</span>3张 <span class="left65">待评价</span> 7单</p>
              <p><span>待发货</span>5单 <span class="left65">退货</span> 1单</p>
              <p><span> 待收货</span>9单</p>
            </div>
          </div>
          <div class="content">
            <div class="left">
              <a-menu
                :defaultSelectedKeys="['/user/personal']"
                style="width: 194px;height:1017px;"
                mode="vertical"
                @click="handleClick"
              >
                <a-menu-item key="/user/personal" class="left-menu">
                  <a-icon type="mail" />
                  我的药店
                </a-menu-item>
                <a-menu-item key="/user/personal/invoice" class="left-menu">
                  <a-icon type="calendar" />
                  我的发票
                </a-menu-item>
                <a-menu-item key="/user/personal/receiver" class="left-menu">
                  <a-icon type="mail" />
                  我的收货人
                </a-menu-item>
                <a-menu-item key="/user/personal/collection" class="left-menu">
                  <a-icon type="calendar" />
                  我的收藏
                </a-menu-item>
                 <a-menu-item key="/user/personal/information" class="left-menu">
                  <a-icon type="calendar" />
                  我的消息
                </a-menu-item>
                <a-menu-item key="/user/personal/service" class="left-menu">
                  <a-icon type="calendar" />
                  售后服务
                </a-menu-item>
              </a-menu>
            </div>
            <div class="right">
              <nuxt-child></nuxt-child>
            </div>
          </div>
       </a-layout-content>
       <f-space-footer class="footer"></f-space-footer>
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
  data() {
    return {
     
    }
  },
  methods: {
    handleClick (e) {
      this.$router.push({
        path: e.key
      })
      console.log('click ', e)
    }
  }
};
</script> 
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";

  .crumbs {
    .p-size (50px,50px,16px,left,0px,#999999);
  }
  .base {
    width: 1200px;
    left:0;
    right:0;
    margin:0 auto;
  }
  .footer {
    margin-top: 20px;
  }
  .header-personal {
    width: 1200px;
    height: 140px;
    background: white;
    border: solid 1px #ffffff;
    .left {
      float: left;
      width: 36%;
      height: 120px;
      text-align:center;
      margin-top: 10px;
      .first {
        border-radius: 20px 0px 0px 20px;
        background: #fbdedd;
      }
      p {
       .p-size (40px,40px,14px,left,20px,#333333);
       i {
         margin-right: 15px;
         color: #ed3025;
       }
      }
    }
    .right {
      float: left;
      width: 25%;
      height: 120px;
      margin-top: 10px;
      margin-left: 80px;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
      .right-title {
        text-align: center;
        font-size: 16px;
        color: #666666;
      }
      p {
        .p-size (40px,40px,14px,left,20px,#ed3025);
        span {
          .container-size (inline-block,155px,auto,0,0);
          text-align: center;
          color: #333333;
        }

      }
    }
    .order-info{
      float: left;
      width: 32%;
      height: 120px;
      margin-top: 10px;
      .order-title{
        text-align: center;
        font-size: 16px;
        color: #666666;
      }
      p {
        .p-size (40px,40px,14px,left,20px,#ed3025);
        span {
          display:inline-block;
          width: 100px;
          color: #666666;
        }
        .left65 {
          margin-left: 65px!important;
        }
      }
    }
  }
  .content {
    margin-top: 20px;
    .left {
      float: left;
    }
    .right {
      width: 985px;
      height: 1017px;
      float: left;
      margin-left: 20px;
      background: white;
    }
  }
  .ant-menu-item-selected {
    color: #ed3025;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    border-left: 2px solid #ed3025;
    background-color: #ffffff;
    color: #ed3025;
  }
  .left-menu:hover {
    color: #ed3025;
  }
</style>