<template>
  <div class="header-box">
    <!-- 首页 -->
    <a-layout-header v-if="type === 'home'">
     
      <f-space-right></f-space-right>
      <div>
        <div class="title-box">
          <div class="header-title" v-show="isShowHeader">
          <div class="header-left">
            <a v-show="isLogin">
              <a-icon type="environment"></a-icon>湖南
            </a>
            <a>欢迎来到一块医药</a>
            <nuxt-link to="/user/login" v-if="!isLogin">请登录</nuxt-link>
            <nuxt-link to="/user/register" v-if="!isLogin">注册有礼</nuxt-link>
             <a href="javascript:;" @click="downloadHtml()"> 桌面快捷</a>
            <!-- <nuxt-link to="/" v-show="isLogin">登出</nuxt-link> -->
          </div>
          
          <div class="header-right">
            <a @click="toHelp()">帮助中心</a>
            <!-- <a>帮助中心</a> -->
            <!-- <a class="margin-left0">在线客服</a> -->
            <!-- 我的消息 -->
            <a-popover
              v-model="visible"
              trigger="click"
              placement="bottomRight"
              :autoAdjustOverflow="true"
              :arrowPointAtCenter="true"
              overlayClassName="header-notice-wrapper"
              :overlayStyle="{ width: '300px', top: '50px' }"
            >
              <template slot="content">
                <a-list :locale="locale">
                  <a-list-item v-for="(item, index) in noticeList" :key="index" @click="toInformation">
                    <a-list-item-meta :title="item.text">
                      <a-avatar
                        style="background-color: white"
                        slot="avatar"
                        src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                      />
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </template>
               
              <a-badge :dot="isNewNotice" class="margin-top15">
                  <a href="#">我的消息</a>
                </a-badge>
            </a-popover>
            <!-- 签到有礼 -->
            <!-- <a v-if="isLogin" class="sign" @click="toIntegral()">
              签到有礼
             
            </a> -->
            <a v-if="isLogin" @click="toMyOrder()">我的订单</a>
           
            <a-dropdown v-if="isLogin">
              <a class="ant-dropdown-link" href="#">
                我的医药
                <a-icon type="down"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="toCollection()">我的收藏</a>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link to="/user/personal">我的一块</nuxt-link>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="toFoot()">浏览记录</a>
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
        </div>
        
        <div class="medicine-names" ref="home">
          <div class="medicine-name-box" ref="nameBox">
            <nuxt-link to="/">
               <div class="medicine-name">
                <img src="../../../assets/img/u49.png" alt>
              <p class="medicine-text"><span class="float-left">舒 心 购</span><span class="circle">•</span><span class="float-right">聚 划 算</span></p>
              </div>
            </nuxt-link>
           
            
            <div class="medicine-search">
              <div class="search-box">
                <!-- <a-input
                  v-model="keyword"
                  placeholder="药品名称/药品通用名"
                  class="searchs-input"
                  @keyup.enter="toGoods(keyword)"
                /> -->
                <a-auto-complete
                  v-model="keyword"
                  class="searchs-input"
                  @search="handleSearch"
                  placeholder="药品名称/药品通用名"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in autoResult" :key="item">{{item}}</a-select-option>
                  </template>
                </a-auto-complete>
                <button class="search-btn" @click="toGoods(keyword)">搜索</button>
              </div>
            </div>
            <div class="service">
              <div>
                <img src="../../../assets/img/fuwu.png" alt>
                <p>专业服务</p>
              </div>
               <div>
                <img src="../../../assets/img/yunshu.png" alt>
                <p>准时送达</p>
              </div>
               <div>
                <img src="../../../assets/img/pinzhong.png" alt>
                <p>品类丰富</p>
              </div>
              <div>
                <img src="../../../assets/img/zhengpin.png" alt>
                <p>正品保证</p>
              </div>
            </div>
            <p class="spike" v-show="isShowHeader">
              
              <a href="javascript:;" @click="toGoods(item)" v-for="(item, index) in keyWordList" :key="index">{{ item }} </a>
              <!--  -->
            </p>
          </div>
          <div class="nav-box" v-show="isShowHeader">
            <div>
              <span href="javascript:;" class="goods-type" @mouseover="seover()" @mouseleave="leave()"> <a-icon type="bars" class="bars"/>商品分类 <f-space-menu :isMouseover="isMouseover" :isShowMenu="isShowMenu" ></f-space-menu></span>
              <a href="javascript:;" @click="toNewPerson()">新人专享</a>
              <a href="javascript:;" @click="toNewGoods()">新品上线</a>
              <a href="javascript:;" @click="toHotGoods()">热销商品</a>
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
         <nuxt-link to="/">
          <div class="medicine-name-login">
            <img src="../../../assets/img/u49.png" alt>
          </div>
         </nuxt-link>
      
        <div class="ant-layout-header-back login-header-text">
          <nuxt-link to="/">
            <a class="back-index">返回首页</a>
          </nuxt-link>
          <a class="service-phone">客服电话：0731-88159987</a>
        </div>
        <div class="divider"></div>
      </div>
    </a-layout-header>
    <!-- 注册 -->
    <a-layout-header v-if="type === 'register'" class="login-header">
      <div class="ant-layout-header-login">
        <nuxt-link to="/">
          <div class="medicine-name-login">
            <img src="../../../assets/img/u49.png" alt>
          </div>
        </nuxt-link>
       
        <div class="ant-layout-header-back">
          <span>已有账号</span>
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
      okText="确定"
      cancelText="取消"
    >
      <p>{{ModalText}}</p>
    </a-modal>
  </div>
</template>
<script>
// import HeaderNotice from './HeaderNotice'
import FSpaceMenu from '../menu'
import FSpaceRight from '../right-menu'
export default {
  name: "f-space-header",
  props: ["type", "searchList"],
  // components: {
  //   HeaderNotice
  // },
  components: {
    FSpaceMenu,
    FSpaceRight
  },
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
    },
    isNewNotice() {
      return this.$store.state.isNewNotice;
    },
    noticeList() {
      return this.$store.state.noticeList;
    }
  },
  data() {
    return {
      locale: {
        emptyText: '暂无消息'
      },
      isMouseover: false,
      isShowMenu: false,
      confirmLoading: false,
      ModalText: "您确定要退出登录吗?",
      isLogout: false,
      goodsClass: "",
      isShowHeader: true,
      isDisTip: false,
      isShowCartList: false,
      loadding: false,
      visible: false,
      keyWordList: [],
      autoResult: []
    };
  },
  mounted() {
    this.isShowMenu = this.$route.name === 'index' ? true : false
    this.init();
    this.checkStoreLoginStatus();
    this.usualKeyword();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    init() {
      this.isDisTip = localStorage.getItem("isDisTip") ? false : true;
      if (this.isDisTip) {
        localStorage.setItem("isDisTip", "1");
      }
    },
    downloadHtml() {
      location.href = "http://114.116.155.221:8000/一块医药.url";
    },
     // 获取楼层显示状态
    async usualKeyword() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "usualKeyword";
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification") || "";
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.keyWordList = result.data
            if(_this.keyWordList.length > 3) {
              _this.keyWordList.splice(0,3)
            }
           
          }
        })
      );
    },
    async checkStoreLoginStatus() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "LoginRegistrationModule";
      iRequest.method = "checkStoreLoginStatus";
      iRequest.param.json = JSON.stringify({});
      iRequest.param.token = localStorage.getItem("identification") || "";
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            if(result.data) {
              _this.getBasicInfo()
            }
            _this.$store
              .dispatch("setUserStatus", {
                context: _this,
                status: result.data
              })
              .then(res => {})
              .catch(err => {

              });
          }
        })
      );
    },
    getBasicInfo() {
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
          if (result.code === 200 && result.data) {
            _this.$store.dispatch("setUser", {
              context: _this,
              user: result.data
            });
            let ice_callback = new Ice.Class(inf.PushMessageClient, {
              receive: function(message, current) {
                try{
                  let result = JSON.parse(message)
                } catch(err){
                  _this.$store
                    .dispatch("setNoticeList", { message: message.replace('sys:', '') })
                    .then(res => {
                      
                    })
                    .catch(err => {
                      
                    });
                }
              }})
            // websocket 上线
            _this.$initIceLong('orderServer', _this.storeInfo.comp.storeId, new ice_callback());
          }
        })
      );
    },
    handleSearch(value) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "intelligentFullTextsearch";
      iRequest.param.json = JSON.stringify({
        keyword: value
      });
      iRequest.param.token = localStorage.getItem("identification") || "";
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.autoResult = result.data
          }
        })
      );
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
      if (scrollTop >= 600) {
        home.position = "fixed";
        home.top = "0px";
        home.opacity = "1";
        home.zIndex = "1000";
        home.width = "100%";
        home.height = "125px";
        nameBox.height = "100px";
        this.isShowHeader = false;
      } else {
        home.position = "";
        home.top = "";
        home.height = "170px";
        nameBox.height = "130px";
        this.isShowHeader = true;
      }
    },
    removeCartList(item, index) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "clearShopCart";
      iRequest.param.json = JSON.stringify({
        compid: _this.storeInfo.comp.storeId,
        ids: item.unqid
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.$message.success("购物车移除成功~");
            _this.cartList.splice(index, 1);
            if (_this.cartList.length > 0) _this.getShoppingCartList();
          }
        })
      );
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
    toHelp() {
      this.$router.push({
        path: '/user/help/web-operation'
      })
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
    toFoot() {
      this.$router.push({
        path: "/user/personal/footprint"
      });
    },
    toCollection() {
      this.$router.push({
        path: "/user/personal/collection"
      });
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
    },
    toNewGoods() {
      this.$router.push({
        path: "/activity/new-goods"
      });
    },
    // 新人专享
    toNewPerson() {
      this.$router.push({
        path: "/activity/new-person"
      });
    },
    toHotGoods() {
      this.$router.push({
        path: "/activity/hot-goods",
        query: {
          actcode: this.hotGoodsID
        }
      });
    },
    seover() {
      this.isMouseover = true
    },
    leave() {
      this.isMouseover = false
    }
  },
  watch: {
    visible(val) {
      if(!val) {
        this.$store
          .dispatch("removeNoticeList")
          .then(res => {
            
          })
          .catch(err => {
            
          });
      }
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
  background: #ffffff;
  color: gray;
}
.header-box{
  height: auto;
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
.desktop {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.ant-select-auto-complete.ant-select .ant-select-selection{
  margin-left: -8px;
  border-radius: 15px 0px 0px 15px!important;
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
  background: #f8f8f8;
}
.header-title span {
  float: right;
  // margin-right: 25px;
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
  height: 170px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}
.medicine-name-box {
  display: block;
  width: 1200px;
  height: 130px;
  margin: 0 auto;
  padding-top: 20px;
  background: #ffffff;
}
.service {
  float: right;
  width: 360px;
  height: 80px;
}
.service div {
  float: right;
  width: 22%;
  height: 80px;
}
.spike {
  margin-top: 5px;
  margin-bottom: 15px;
  text-indent: 25.4%;
}
.spike a {
  display: inline-block;
  width: 140px;
  height: 26px;
  line-height: 26px;
  padding: 0px 23px 0px 0px;
  text-align: left;
  text-indent: 0px!important;
  margin-left: 15px;
  margin-right: 15px;
  border-right: 2px solid #e0e0e0;
  color: #999999 !important;
   overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
}
.medicine-name-box .spike a:last-child{
  border: none!important;
}
.spike a:hover{
  color: #ed2f26!important;
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
  // height: 62px;
}
.medicine-search {
  display: inline-block;
  width: 518px;
  height: 40px;
  border-radius: 20px;
  margin-left: 80px;
  border: 2px solid rgb(255, 0, 54);
  background: rgb(255, 0, 54);
}
.search-box{
  width: 97%;
  margin-top: 2px;
  margin-left: 10px;
  border-radius: 50%;
  } 
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
  .button-size(80px, 35px, 35px, 14px, 0px, 5px);
  .button-color(none, #ed3025, #ffffff);
  float: right;
  margin-top: 12px;
  margin-right: 10px;
}
.nav-box {
  display: block;
  width: 100%;
  height: 40px;
  background: #ed3025;
  padding-left: 6px;
}
.nav-box div {
  display: block;
  width: 1190px;
  margin: 0 auto;
}
.goods-type .bars{
  float: left;
  margin-top: 10px;
  margin-left: -8px;
  margin-right: 10px;
  font-size: 20px;
}
.nav-box .goods-type {
  position: relative;
  left: 0px;
  top: 0px;
  float: left;
  width: 175px !important;
  height: auto;
  background: #db2920;
  line-height: 40px;
  padding-left: 20px;
  margin-right: 35px;
  font-size: 15px;
  color: #ffffff;
  a:hover {
    color: #ffffff;
  }
}
.nav-box a {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-right: 30px;
  font-size: 15px;
  color: #ffffff;
}
// .nav-box a:hover {
//   color: rgb(255, 0, 54);
// }
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
    // width: 200px;
    height: 85px;
    font-size: 18px;
    margin-right: 5%;
    a:nth-child(2) {
      color: #999999;
    }
  }
  .divider {
    height: 1px;
    background: #73a1f3;
  }
}
.back-index {
  font-size: 16px;
  color: #999999;
}
.service-phone {
  margin-left: 10px;
  font-size: 16px;
  color: #3189f5 !important;
}
.login-header {
  width: 100%;
}
// .login-header-text {
//   width: 290px !important;
// }
.searchs-input {
  width: 82% !important;
}
.margin-top15{
  margin-top: 8px;
}
.title-box{
  background: #f8f8f8;
}
.medicine-text{
  .p-size(20px, 20px, 18px, left, 0px, #ed3025);
  margin-top:  -5px;
  // padding: 0px 20px 0px 30px;
  padding-right: 15px;
  span{
    color: #999;
    font-weight: 500;
  }
  .float-left{
    float: left;
  }
  .float-right{
    float: right;
  }
}
.circle{
  float: left;
  width: 5px;
  height: 5px;
  margin-left: 22px;
  color: #999;
}
</style>