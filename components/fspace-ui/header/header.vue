<template>
  <div>
    <!-- 首页 -->
    <a-layout-header v-if='type === "home"'>
      <div class="header-title">
        <div class="header-left">
          <a>欢迎来到一块医药</a>
          <nuxt-link to='/user/login'>登录</nuxt-link>
          <nuxt-link to='/user/register'>注册</nuxt-link>
          <nuxt-link to='/user/personal'>我的一块</nuxt-link>
        </div>
        <div class="header-right">
          <a>帮助中心</a>
          <a>在线客服</a>
          <a>签到有礼</a>
          <a>我的订单</a>
          <a @click="toPerson()">个人中心临时入口</a>
        </div>
      </div>
      <div class="medicine-names">
        <div class="medicine-name-box">
          <div class="medicine-name">
            <img src="../../../assets/img/u49.png" alt="">
          </div>
          <div class="medicine-search">
            <div class="search-box">
              <a-input placeholder="药品名称/药品通用名/药品助记码" class="search-input"/>
              <button class="search-btn" @click="toCategory()">搜索</button>
            </div>
          </div>
          <a-dropdown>
            <a class="ant-dropdown-link cart-btn" @click="toCart()">
              <a-icon type="shopping-cart" class="cart-icon"/>
              <span class="cart-count">6</span>
              <span class="cart-text">采购单</span>
            </a>
            <a-menu slot="overlay" class="cart-down">
                <a-menu-item class="cart-down-list" v-for="(item,index) in cartList" :key="index">
                  <a href="javascript:;">
                    <img v-lazy="item.src" class="cart-img">
                    <p class="cart-goods-text">{{item.text}} <span>￥{{item.price}}元</span></p>
                    <p class="cart-goods-count">{{item.guige}}  ×  {{item.count}}</p>
                    <a-icon type="close" class="del-cart-goods"/>
                  </a>
                </a-menu-item>
                <a-menu-item class="total-settlement">
                  <p>
                    商品合计1880元
                    <button>去购物车结算</button>
                  </p>
                </a-menu-item>
            </a-menu>
          </a-dropdown>
          <p class="spike"><a href="">新人专享</a><span>|</span><a href="">秒杀</a><span>|</span><a href="">一块购</a><span>|</span></p>
          <div class="nav-box">
            <a href class="goods-type">商品分类</a>
            <a href>新人专享</a>
            <a href>新品上线</a>
            <a href>热销商品</a>
            <a href>全部商品</a>
        </div>
        </div>
      </div>
    </a-layout-header>
    <!-- 登录 -->
    <a-layout-header v-if='type === "login"' class="login-header">
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
    <a-layout-header v-if='type === "register"' class="login-header">
      <div class="ant-layout-header-login">
        <div class="medicine-name-login">
          <img src="../../../assets/img/u49.png" alt="">
        </div>
        <div class="ant-layout-header-back">
          <a class="already">已有账号</a>
          <a class="immediately">立即登录</a>
        </div>
        <div class="divider"></div>
      </div>
    </a-layout-header>
  </div>
</template>
<script>
  export default {
    name: 'f-space-header',
    props: ['type'],
    data () {
      return {
        cartList: [
          {
            src:'//img.alicdn.com/imgextra/i2/2928278102/O1CN01CbSyKd29ilQb8wH9K_!!0-item_pic.jpg_160x160q90.jpg',
            text: '汇仁肾宝片126片成人男性肾亏',
            price: 322,
            guige: '3g * 126片',
            count: 9
          },
           {
            src:'//img.alicdn.com/imgextra/i3/TB19dR6KVXXXXapXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
            text: '宁夏红枸杞',
            price: 50,
            guige: '300g * 1袋',
            count: 6
          },
           {
            src:'//img.alicdn.com/imgextra/i4/TB1lILJNpXXXXbFaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
            text: '长白山人参',
            price: 18888,
            guige: '30g * 1株',
            count: 1
          },
           {
            src:'//img.alicdn.com/imgextra/i4/TB1pn9kNFXXXXcfXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
            text: '东阿阿胶片',
            price: 188,
            guige: '3g * 126片',
            count: 3
          },
           {
            src:'//img.alicdn.com/imgextra/i1/TB1eAO_PXXXXXbtXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
            text: '九芝堂六味地黄丸',
            price: 88,
            guige: '3g * 126片',
            count: 2
          },
           {
            src:'//img.alicdn.com/imgextra/i4/TB1vpUaOFXXXXbxXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
            text: '太极五子衍宗丸',
            price: 288,
            guige: '3g * 126片',
            count: 9
          }
        ]
      }
    },
    methods: {
      toCart() {
        this.$router.push({
          name:'shoppingCart'
      })
      },
      toCategory() {
        this.$router.push({
          name:'category'
        })
      },
      toPerson() {
        this.$router.push({
          name: 'cerfiticales'
        })
      }
    }
  }
</script>
<style lang='less'>
@import "../../../components/fspace-ui/container/index.less";
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
.already {
  color: #999999;
}
.immediately {
  color: rgb(255, 0, 54)!important;
}
/* 登录头部 */
.login-header {
  height: 85px;
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
  border-bottom: 1px solid #e0e0e0;
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
  width: 70px;
  height: 30px;
  background-color: rgb(255, 0, 54);
  border: none;
  outline:none;
  color: #ffffff;
}
.search-btn:hover{
  background-color: rgb(255, 0, 54);
  color: #ffffff;
}
.search-btn:active {
  background-color: rgb(255, 0, 54);
  border: none;
  outline:none;
  color: #ffffff;
}
.cart-btn{
  position: relative;
  float: right;
  width: 154px;
  height: 42px;
  background: #ffffff;
  border: 1px solid rgb(255,0,54);
  border-radius: 20px;
  margin-top: 8px;
  color: #666666;
}
.cart-text {
  position: absolute;
  top: 5px;
  left: 65px;
  font-size: 16px;
}
.cart-btn:hover{
  color: #666666;
  border: 1px solid rgb(255,0,54);
  /* background: rgb(255,0,54); */
}
.cart-btn .cart-count{
  position: absolute;
  top: 2px;
  left: 42px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: rgb(255,0,54);
  color: #ffffff;
}
.cart-btn i{
  position: absolute;
  top: 8px;
  left: 30px;
  margin-right: 20px;
  font-size: 22px;
}
.cart-down {
  .container-size(block,300px,400px,0px,0px);
  overflow: auto;
  .position(relative,0px,0px);
}
.cart-down-list {
  .container-size(block,280px,80px,0px,0px);
  line-height: 80px;
  .position(relative,0px,0px);
}
.cart-img {
  .position(absolute,5px,5px);
  .container-size(inline-block,70px,70px,0px,0px);
}
.cart-goods-text {
  .position(absolute,5px,80px);
  display: inline-block;
  width: 190px;
  .p-size(40px,40px,14px,left,0px,#666666);
  overflow: hidden;
}
.cart-goods-count {
  .position(absolute,35px,80px);
  .p-size(40px,40px,14px,left,0px,#666666);
}
.del-cart-goods {
  .position(absolute,35px,260px);
}
.total-settlement {
  .container-size(inline-block,280px,80px,0px,0px);
  .position(absolute,300px,0px);
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
  border-radius: 18px 0 0 18px!important;
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