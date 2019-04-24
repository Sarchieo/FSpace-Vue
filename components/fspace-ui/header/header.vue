<template>
  <div>
    <!-- 首页 -->
    <a-layout-header v-if="type === 'home'">
      <div>
        <div class="header-title" v-show="isShowHeader">
          <div class="header-left">
            <a v-show="isLogin">
              <a-icon type="environment"></a-icon>长沙
            </a>
            <a>欢迎来到一块医药</a>
            <nuxt-link to="/user/login" v-show="!isLogin">请登录</nuxt-link>
            <nuxt-link to="/user/register" v-show="!isLogin">注册</nuxt-link>
            <!-- <nuxt-link to="/" v-show="isLogin">登出</nuxt-link> -->
          </div>
          <div class="header-right">
            <a>帮助中心</a>
            <!-- <a class="margin-left0">在线客服</a> -->
            <!-- 我的消息 -->
            <!-- <header-notice/> -->
            <!-- 签到有礼 -->
            <a class="sign" @click="toIntegral()">
              签到有礼
              <!-- <span class="sign"></span> -->
            </a>
            <a @click="toMyOrder()">我的订单</a>
            <a-dropdown>
              <a class="ant-dropdown-link" href="#">
                我的医药
                <a-icon type="down"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">常购药品</a>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link to="/user/personal">我的一块</nuxt-link>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">浏览记录</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="logout()">登出</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <nuxt-link to="/">首页</nuxt-link>
            <div style="clear:both;"></div>
          </div>
        </div>
        <div class="medicine-names" ref="home">
          <div class="medicine-name-box" ref="nameBox">
            <div class="medicine-name">
              <img src="../../../assets/img/u49.png" alt>
            </div>
            <div class="medicine-search">
              <div class="search-box">
                <a-input
                  v-model="keyword"
                  placeholder="药品名称/药品通用名"
                  class="search-input"
                  @keyup.enter="toGoods(keyword)"
                />
                <button class="search-btn" @click="toGoods(keyword)">搜索</button>
              </div>
            </div>
            <div
              class="ant-dropdown-link cart-btn"
              @click="toPage('shoppingCart')"
              @mouseover="showList()"
              @mouseout="hideList()"
            >
              <a-icon type="shopping-cart" class="cart-icon"/>
              <span class="cart-count">{{ cartList.length }}</span>
              <!-- <a-popover class="cart-text" title="采购单">
                <template slot="content">
                  <p>Content</p>
                  <p>Content</p>
                </template> 
                <a-button type="primary">Hover me</a-button>
              </a-popover>-->
              <span class="cart-text">采购单</span>
              <div class="cart-down" v-show="isShowCartList">
                <!-- <div class="cart-down"> -->
                <p class="no-data" v-if="cartList.length === 0">您的采购单空空如也</p>
                <ul class="cart-down-ul" v-if="cartList.length !== 0">
                  <li class="cart-down-list" v-for="(item,index) in cartList" :key="index">
                    <a href="javascript:;">
                      <img v-lazy="item.imgURl" class="cart-img">
                      <p class="cart-goods-text">
                        {{item.ptitle}}
                        <span>￥{{item.pdprice * item.num}}元</span>
                      </p>
                      <p class="cart-goods-count">{{item.spec}}</p>
                      <a-icon type="close" class="del-cart-goods"/>
                    </a>
                  </li>
                </ul>
                <div class="total-settlement">
                  <p>
                    <button class="settlement-btn" @click="toPage('shoppingCart')">去购物车</button>
                  </p>
                </div>
              </div>
            </div>
            <p class="spike" v-show="isShowHeader">
              <a href>新人专享</a>
              <span>|</span>
              <a href>秒杀</a>
              <span>|</span>
              <a href>一块购</a>
              <span>|</span>
            </p>
            <div class="nav-box" v-show="isShowHeader">
              <a href class="goods-type">商品分类</a>
              <a href>新人专享</a>
              <a href>新品上线</a>
              <a href>热销商品</a>
              <a href="javascript:;" @click="toBrand()">品牌专区</a>
              <!-- <a href>全部商品</a> -->
            </div>
          </div>
        </div>
      </div>
    </a-layout-header>
    <!-- 登录 -->
    <a-layout-header v-if="type === 'login'" class="login-header">
      <div class="ant-layout-header-login">
        <div class="medicine-name-login">
          <img src="../../../assets/img/u49.png" alt>
        </div>
        <div class="ant-layout-header-back">
          <nuxt-link to="/">
            <a>返回首页</a>
          </nuxt-link>
          <a>电商APP</a>
        </div>
        <div class="divider"></div>
      </div>
    </a-layout-header>
    <!-- 注册 -->
    <a-layout-header v-if="type === 'register'" class="login-header">
      <div class="ant-layout-header-login">
        <div class="medicine-name-login">
          <img src="../../../assets/img/u49.png" alt>
        </div>
        <div class="ant-layout-header-back">
          <a class="already">已有账号</a>
          <nuxt-link to="/user/login">
            <a class="immediately">立即登录</a>
          </nuxt-link>
        </div>
        <div class="divider"></div>
      </div>
    </a-layout-header>
    <a-modal
      title="提示"
      :visible="isLogout"
      @ok="handleLogoutOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <p>{{ModalText}}</p>
    </a-modal>
  </div>
</template>
<script>
// import HeaderNotice from './HeaderNotice'
export default {
  name: "f-space-header",
  props: ["type", "searchList"],
  // components: {
  //   HeaderNotice
  // },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    },
    keyword: {
      get() {
        return this.$store.state.keyword;
      },
      set(newValue) {
        this.$store.commit("KEY_WORD", newValue);
        return this.$store.state.keyword;
      }
    },
    isLogin() {
      return this.$store.state.userStatus;
    }
  },
  data() {
    return {
      confirmLoading: false,
      ModalText: "您确定要退出登录吗?",
      isLogout: false,
      goodsClass: "",
      isShowHeader: true,
      isDisTip: false,
      isShowCartList: false,
      cartList: []
    };
  },
  mounted() {
    this.init();
    window.addEventListener("scroll", this.handleScroll);
    if (this.isLogin) {
      this.getShoppingCartList();
    }
  },
  methods: {
    init() {
      this.isDisTip = localStorage.getItem("isDisTip") ? false : true;
      if (this.isDisTip) {
        localStorage.setItem("isDisTip", "1");
      }
    },
    handleLogoutOk(e) {
      this.confirmLoading = true;
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "LoginRegistrationModule";
      iRequest.method = "logout";
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
         this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.$message.success(result.data);
            _this.$store
              .dispatch("setLogout", { context: _this })
              .then(res => {
                _this.isLogout = false;
                _this.confirmLoading = false;
                // 跳转页面
                setTimeout(() => {
                  _this.$router.push({
                    path: "/user/login"
                  });
                }, 500);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            _this.$store
              .dispatch("setLogout", { context: _this })
              .then(res => {
                _this.isLogout = false;
                _this.confirmLoading = false;
                // 跳转页面
                setTimeout(() => {
                  _this.$router.push({
                    path: "/user/login"
                  });
                }, 500);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
      );
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var home = this.$refs.home.style;
      var nameBox = this.$refs.nameBox.style;
      if (scrollTop >= 170) {
        home.position = "fixed";
        home.top = "0px";
        home.opacity = "1";
        home.zIndex = "1000";
        home.width = "100%";
        home.height = "100px";
        nameBox.height = "70px";
        this.isShowHeader = false;
      } else {
        home.position = "";
        home.top = "";
        home.height = "171px";
        nameBox.height = "141px";
        this.isShowHeader = true;
      }
    },
    handleOk() {
      // 跳转企业中心页面
      this.$router.push({
        path: "/user/personal"
      });
    },
    toBrand() {
      this.$router.push({
        path: "/activity/brand"
      });
    },
    handleCancel() {
      this.isLogout = false;
    },
    toPage(name) {
      this.$router.push({
        name: name
      });
    },
    toGoods(keyword) {
      if (keyword === "") {
        return;
      }
      // this.$store.commit('KEY_WORD', keyword)
      let routeData = this.$router.resolve({
        name: "category",
        query: {
          keyword: keyword
        }
      });
      window.open(routeData.href, "_blank");
    },
    showList() {
      this.isShowCartList = true;
    },
    hideList() {
      this.isShowCartList = false;
    },
    toInformation() {
      this.$router.push({
        path: "/user/personal/information"
      });
    },
    toMyOrder() {
      this.$router.push({
        path: "/user/personal/myorder"
      });
    },
    async getShoppingCartList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "queryUnCheckShopCartList";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId
      });
      console.log(
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535)
      );
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              if (result.data) {
                _this.cartList = result.data;
                _this.cartList.forEach(item => {
                  item.checked ? false : true;
                });
                _this.getImgUrl(_this.cartList);
              }
            }
          },
          function error(e) {
            _this.$message.error("无法连接服务器或服务器返回异常, 请稍后重试");
          }
        )
      );
    },
    async getBasicInfo() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "LoginRegistrationModule";
      iRequest.method = "getStoreSession";
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            // 设置登录
            _this.$store.dispatch("setUserState");
            localStorage.setItem("storeInfo", result.data);
          } else {
          }
        })
      );
    },
    // 获取商品图片
    async getImgUrl(arr) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.token = localStorage.getItem("identification");
      let list = [];
      arr.forEach(c => {
        list.push({
          sku: c.pdno,
          spu: c.spu
        });
      });
      iRequest.param.json = JSON.stringify({
        list: list
      });
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              result.data.goodsFilePathList.forEach((c, index, list) => {
                _this.$set(
                  arr[index],
                  "imgURl",
                  result.data.downPrev +
                    c +
                    "/" +
                    arr[index].pdno +
                    "-200x200.jpg" +
                    "?" +
                    new Date().getSeconds()
                );
              });
            } else {
              _this.$message.error("文件地址获取失败, 请稍后重试");
            }
          },
          function error(error) {
            console.log(error);
          }
        )
      );
    },
    // 退出登录
    logout() {
      this.isLogout = true;
    },
    toIntegral() {
      let routeData = this.$router.resolve({
        path: "/user/integral"
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style lang='less'>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
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
  height: 200px;
  line-height: 30px;
  padding: 0px;
  background: rgb(242, 242, 242);
  color: gray;
}
.already {
  color: #999999;
}
.immediately {
  color: rgb(255, 0, 54) !important;
}
.no-data {
  .p-size(40px, 40px, 14px, center, 0px, #666666);
}
/* 登录头部 */
.login-header {
  height: 85px;
}
/* 头部 */
.header-title {
  width: 1200px;
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
.header-left a {
  margin-right: 15px;
  color: #999999;
}
.header-left i {
  margin-right: 5px;
}
.header-right {
  float: right;
  width: 510px;
  height: 30px;
  /* margin-right: 50px; */
}
.drop-down {
  .position(relative, 0px, 0px);
}
.margin-right0 {
  margin-right: 0px !important;
}
.margin-left0 {
  margin-left: 0px !important;
}
.sign {
  margin-right: 15px;
}
.header-right a {
  float: right;
  display: inline-block;
  margin-left: 15px;
  color: #999999;
}
.news-box {
  .position(absolute, 22px, -95px);
  .container-size(inline-block, 250px, auto, 0px, 0px);
  .container-color(#ffffff, 1px solid transparent, #666666);
  min-height: 300px;
  opacity: 1;
  z-index: 1;
}
.news-ul {
  .position(absolute, 0px, 0px);
  .container-size(inline-block, 250px, auto, 0px, 0px);
  .container-color(#ffffff, 1px solid transparent, #666666);
  overflow: auto;
  max-height: 245px;
  min-height: 100px;
}
.news-ul li {
  .container-size(inline-block, 231px, auto, 0px, 0px);
  .container-color(#ffffff, 1px solid transparent, #666666);
  max-height: 245px;
  min-height: 100px;
  p {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    padding: 0px 8px;
  }
  p:hover {
    background: #ed2f26;
    color: #ffffff;
  }
}
.see-news {
  position: absolute;
  bottom: 0px;
  .container-size(inline-block, 250px, 50px, 0px, 0px);
}
.see-news button {
  .button-size(246px, 50px, 50px, 16px, 0px, 0px);
  .button-color(1px solid transparent, #ed2f26, #ffffff);
}
.medicine-names {
  display: block;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}
.medicine-name-box {
  display: block;
  width: 1200px;
  height: 170px;
  margin: 0 auto;
  padding-top: 20px;
  background: #ffffff;
}
.spike {
  margin-top: 15px;
  margin-bottom: 15px;
  text-indent: 27.4%;
}
.spike a {
  margin-left: 15px;
  margin-right: 15px;
  color: #999999 !important;
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
.medicine-name img {
  width: 195px;
  height: 62px;
}
.medicine-search {
  display: inline-block;
  width: 600px;
  height: 42px;
  border-radius: 20px;
  margin-left: 125px;
  border: 2px solid rgb(255, 0, 54);
  background: rgb(255, 0, 54);
}
/* .search-box{
  border-radius: 50%;
} */
.search-btn {
  width: 83px;
  height: 30px;
  background-color: rgb(255, 0, 54);
  border: none;
  outline: none;
  color: #ffffff;
}
.search-btn:hover {
  background-color: rgb(255, 0, 54);
  color: #ffffff;
}
.search-btn:active {
  background-color: rgb(255, 0, 54);
  border: none;
  outline: none;
  color: #ffffff;
}
.cart-btn {
  position: relative;
  float: right;
  width: 154px;
  height: 42px;
  background: #ffffff;
  border: 1px solid rgb(255, 0, 54);
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
.cart-btn:hover {
  color: #666666;
  border: 1px solid rgb(255, 0, 54);
  /* background: rgb(255,0,54); */
}
.cart-btn .cart-count {
  position: absolute;
  top: 2px;
  left: 42px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: rgb(255, 0, 54);
  color: #ffffff;
}
.cart-btn i {
  position: absolute;
  top: 8px;
  left: 30px;
  margin-right: 20px;
  font-size: 22px;
}
.cart-down {
  .container-size(block, 300px, auto, 0px, 0px);
  .position(relative, 41px, -55px);
  overflow: auto;
  z-index: 99;
  opacity: 1;
}
.cart-down-ul {
  .container-size(block, 300px, auto, 0px, 0px);
  overflow: auto;
}
.cart-down-list {
  .container-size(block, 283px, 80px, 0px, 0px);
  .position(relative, 0px, 0px);
  background: #ffffff;
  line-height: 80px;
}
.cart-down-list:hover {
  background: #e0e0e0;
}
.cart-img {
  .position(absolute, 5px, 5px);
  .container-size(inline-block, 70px, 70px, 0px, 0px);
}
.cart-goods-text {
  .position(absolute, 5px, 80px);
  display: inline-block;
  width: 180px;
  .p-size(40px, 40px, 14px, left, 0px, #666666);
  overflow: hidden;
}
.cart-goods-count {
  .position(absolute, 35px, 80px);
  .p-size(40px, 40px, 14px, left, 0px, #666666);
}
.del-cart-goods {
  .position(absolute, 35px, 260px) !important;
  font-size: 14px !important;
  color: #666666;
}
.total-settlement {
  .container-size(inline-block, 280px, 70px, 0px, 0px);
  .position(absolute, 300px, 0px);
  background: #ffffff;
  line-height: 70px;
}
.total-settlement p {
  padding-left: 10px;
}
.total-settlement p span {
  color: #ed3025;
}

.settlement-btn {
  .button-size (80px, 35px, 35px, 14px, 0px, 5px);
  .button-color(none, #ed3025, #ffffff);
  float: right;
  margin-top: 12px;
  margin-right: 10px;
}
.nav-box {
  display: block;
  width: 1190px;
  height: 40px;
  margin: 0 auto;
  background: #ffffff;
}
.nav-box .goods-type {
  display: inline-block;
  width: 196px !important;
  height: 40px;
  background: rgb(255, 0, 54);
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
.nav-box a:hover {
  color: rgb(255, 0, 54);
}
.ant-input {
  width: 84% !important;
  height: 38px;
  border: none;
  border-radius: 18px 0 0 18px !important;
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
      color: #999999;
    }
  }
  .divider {
    height: 1px;
    background: #73a1f3;
  }
}
</style>