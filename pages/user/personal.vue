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
                 <a-icon type="profile" />
                周星星
              </p>
               <p>
                 <a-icon type="profile" />
                17621503679
              </p>
            </div>
            <div class="right">
              <p><span>优惠券：</span>3张</p>
              <p><span>积份：</span>268</p>
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
                <a-menu-item key="/user/personal">
                  <a-icon type="mail" />
                  我的药店
                </a-menu-item>
                <a-menu-item key="/user/personal/invoice">
                  <a-icon type="calendar" />
                  我的发票
                </a-menu-item>
                <a-menu-item key="/user/personal/receiver">
                  <a-icon type="mail" />
                  我的收货人
                </a-menu-item>
                <a-menu-item key="/user/personal/collection">
                  <a-icon type="calendar" />
                  我的收藏
                </a-menu-item>
                <a-menu-item key="/user/personal/service">
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
      width: 25%;
      height: 120px;
      text-align:center;
      margin-top: 10px;
      .first {
        background: #fbdedd;
      }
      p {
       .p-size (40px,40px,18px,left,20px,#333333);
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
      p {
        .p-size (60px,60px,18px,left,20px,#ed3025);
        span {
          .container-size (inline-block,110px,auto,0,0);
          color: #333333;
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
</style>