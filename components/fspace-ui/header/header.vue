<template>
  <div>
    <!-- 首页 -->
    <a-layout-header v-if='type === "home"'>
      <div class="header-title">
        <div class="header-left">
          <a>欢迎来到一块医药</a>
          <nuxt-link to='/user/login'>登录</nuxt-link>
          <nuxt-link to='/user/register'>注册</nuxt-link>
        </div>
        <div class="header-right">
          <a>帮助中心</a>
          <a>在线客服</a>
          <a>签到有礼</a>
          <a>我的订单</a>
          <a>我的一块</a>
        </div>
      </div>
      <div class="medicine-names">
        <div class="medicine-name-box">
          <div class="medicine-name">
            <img src="../../../assets/img/u49.png" alt="">
          </div>
          <div class="medicine-search">
            <div class="search-box">
              <a-input placeholder="药品名称/药品通用名/药品助记码"/>
              <a-button class="search-btn">搜索</a-button>
            </div>
          </div>
          <a-button class="cart-btn">
            <a-icon type="shopping-cart" class="cart-icon"/>
            <span class="cart-count">6</span>
            采购单
          </a-button>
          <p class="spike"><a href="">新人专享</a><span>|</span><a href="">秒杀</a><span>|</span><a href="">一块购</a><span>|</span></p>
          <div class="nav-box">
            <a href class="goods-type">商品分类</a>
            <a href>首页</a>
            <a href>新人专享</a>
            <a href>热销商品</a>
            <a href>签到有礼</a>
            <a href>在线采购</a>
            <a href>我的采购</a>
        </div>
        </div>
      </div>
    </a-layout-header>
    <!-- 登录 -->
    <a-layout-header v-if='type === "login"'>
      <div class="ant-layout-header-login">
        <div class="medicine-name-login">
          <img src="../../../assets/img/u49.png" alt="">
        </div>
        <div class="ant-layout-header-back">
          <a>返回首页</a>
          <a>电商APP</a>
        </div>
        <div class="divider"></div>
      </div>
    </a-layout-header>
    <!-- 注册 -->
    <a-layout-header v-if='type === "register"'>
      <div class="ant-layout-header-login">
        <div class="medicine-name-login">
          <img src="../../../assets/img/u49.png" alt="">
        </div>
        <div class="ant-layout-header-back">
          <span>已有账号,</span>
          <nuxt-link to='/user/login'><a style="color: red;">直接登录</a></nuxt-link>
        </div>
        <div class="divider"></div>
      </div>
    </a-layout-header>
  </div>
</template>
<script>
  export default {
    name: 'f-space-header',
    props: ['type']
  }
</script>
<style lang='less'>
a {
  text-decoration: none;
}
h1,
h2,
h3,
h4,
h5,
p {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.ant-layout-header {
  height: 170px;
  line-height: 30px;
  padding: 0px;
  background: rgb(242, 242, 242);
  color: gray;
}
/* 头部 */
.header-title {
  width: 100%;
  height: 30px;
  margin: 0 auto;
}
.header-title span {
  float: right;
  margin-right: 10px;
}
.header-left {
  display: inline-block;
  width: 365px;
}
.header-left a{
  margin-right: 15px;
  color: #999999;
}
.header-right {
  float: right;
  width: 445px;
  /* margin-right: 50px; */
}
.header-right a{
  float: right;
  margin-left: 15px;
  color: #999999;
}
.medicine-names {
  display: block;
  background: #ffffff;
}
.medicine-name-box {
  display: block;
  width: 1190px;
  height: 141px;
  margin: 0 auto;
  padding-top: 20px;
  background: #ffffff;
}
.spike{
  text-indent: 29.6%;
}
.spike a{
  margin-left: 15px;
  margin-right: 15px;
  color: #999999!important;
}
.medicine-name {
  display: inline-block;
  width: 200px;
  height: 50px;
  line-height: 50px;
}
.medicine-name span {
  color: black;
}
.medicine-name img{
  width:195px;
  height: 62px;
}
.medicine-search {
  display: inline-block;
  width: 500px;
  height: 42px;
  border-radius: 20px;
  margin-left: 150px;
  border: 2px solid rgb(255, 0, 54);
  background: rgb(255, 0, 54);
}
/* .search-box{
  border-radius: 50%;
} */
.search-btn{
  background-color: rgb(255, 0, 54);
  border: none;
  color: #ffffff;
}
.search-btn:hover{
  background-color: rgb(255, 0, 54);
  color: #ffffff;
}
.cart-btn{
  float: right;
  position: relative;
  width: 154px;
  height: 42px;
  background: #ffffff;
  border: 1px solid rgb(255,0,54);
  border-radius: 20px;
  margin-top: 8px;
  color: #666666;
}
.cart-btn:hover{
  border: 1px solid rgb(255,0,54);
  /* background: rgb(255,0,54); */
}
.cart-btn .cart-count{
  position: absolute;
  top: 2px;
  left: 42px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(255,0,54);
  color: #ffffff;
}
.cart-btn i{
  margin-right: 20px;
  font-size: 22px;
}
.nav-box {
  display: block;
  width: 1190px;
  height: 40px;
  margin: 0 auto;
  background: #ffffff;
}
.nav-box .goods-type{
  display: inline-block;
  width: 196px!important;
  height: 40px;
  background: rgb(255,0,54);
  line-height: 40px;
  text-align: center;
  color: #ffffff;
}
.nav-box a {
  display: inline-block;
  height: 40px;
  margin-right: 30px;
  font-size: 16px;
  color: black;
}
.nav-box a:hover{
  color: rgb(255,0,54);
}
.ant-input {
  width: 84% !important;
  height: 38px;
  border: none;
  border-radius: 18px 0 0 18px;
}
/* .ant-btn {
  background-color: rgb(255, 0, 54);
  border: none;
  color: #ffffff;
} */
.ant-layout-header-login {
  height: 85px;
  line-height: 85px;
  background: #ffffff;
  .medicine-name-login {
    margin-left: 10%;
    width: 200px;
    height: 85px;
    display: inline-block;
    img {
      width: 180px;
      height: 50px;
    }
  }
  .ant-layout-header-back {
    float: right;
    width: 200px;
    font-size: 18px;
    margin-right: 5%;
    a {
      margin-right: 10%;
    }
    a:nth-child(2) {
      color: #999999
    }
  }
  .divider {
    height: 1px;
    background: #73a1f3;
  }
}

</style>