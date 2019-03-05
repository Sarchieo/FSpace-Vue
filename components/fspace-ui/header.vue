<template>
  <!-- 页头 -->
  <a-layout-header>
    <div class="header-title">
      <div class="header-left">
        <span>一块医药首页</span>
        <span>请登录</span>
        <span>免费注册</span>
      </div>
      <div class="header-right">
        <span>我的淘宝</span>
        <span>购物车</span>
        <span>收藏夹</span>
        <span>手机版</span>
        <span>淘宝网</span>
        <span>商家支持</span>
        <span>网站导航</span>
      </div>
    </div>
    <div class="medicine-names">
      <div class="medicine-name-box">
        <div class="medicine-name">
          <span>一块医药</span>
        </div>
        <div class="medicine-search">
          <div class="search-box">
            <a-input placeholder="搜索本店商品"/>
            <a-button>搜本店</a-button>
          </div>
        </div>
      </div>
      <div class="nav-box">
        <a href>首页</a>
        <a href>网络医院名医面对面</a>
        <a href>阿里健康旗舰店</a>
        <a href>中国医药O2O先锋联盟</a>
        <a href>阿里健康大药房</a>
      </div>
    </div>
  </a-layout-header>
</template>
<script>
  export default {
    name: 'f-space-header'
  }
</script>
<style>
.ant-layout-header {
  height: 170px;
  line-height: 30px;
  padding: 0px;
  background: rgb(242, 242, 242);
  color: gray;
}
/* 头部 */
.header-title {
  width: 1190px;
  height: 30px;
  margin: 0 auto;
}
.header-title span {
  margin-right: 10px;
}
.header-left {
  display: inline-block;
  width: 365px;
}
.header-right {
  float: right;
  width: 445px;
  margin-right: 50px;
}
.medicine-names {
  display: block;
  background: #ffffff;
}
.medicine-name-box {
  display: block;
  width: 1190px;
  height: 100px;
  margin: 0 auto;
  padding-top: 20px;
  background: #ffffff;
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
.medicine-search {
  display: inline-block;
  width: 500px;
  height: 36px;
  margin-left: 150px;
  border: 2px solid rgb(255, 0, 54);
  background: rgb(255, 0, 54);
}
.nav-box {
  display: block;
  width: 1190px;
  height: 40px;
  line-height: 60px;
  margin: 0 auto;
  background: #ffffff;
}
.nav-box a {
  margin-right: 20px;
  color: black;
}
</style>