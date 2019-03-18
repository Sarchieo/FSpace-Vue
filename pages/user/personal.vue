<template>
  <div>
    <a-layout>
       <f-space-header type='home'></f-space-header>
       <a-layout-content class="base">
         <a-breadcrumb separator=">">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>我的一块</a-breadcrumb-item>
          </a-breadcrumb>
          <!-- 头部内容 -->
          <div class='header-personal'>
            <div class="left">
              <div>
                <a-icon type="user" />
                长沙大药房
              </div>
               <div>
                 <a-icon type="user" />
                周星星
              </div>
               <div>
                 <a-icon type="user" />
                17621503679
              </div>
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
      width: 25%;
      height: 140px;
      text-align:center;  
      div {
        width: 250px;
        height: 32px;
        margin: 0 auto;
        background: yellow;
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