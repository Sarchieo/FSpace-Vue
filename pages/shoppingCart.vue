<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="cart-box">
          <ul class="table-header">
            <li class="whole">
              <a-checkbox @change="checkAll">全选</a-checkbox>
            </li>
            <li>商品信息</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
            <li>操作</li>
          </ul>
          <ul class="goods-lists">
            <div class="nutrition">
              <a-icon type="shop"/>
              <span>一块医药</span>
            </div>
            <div class="no-data" v-if="cartList.length === 0">
              <p class="no-icon"><a-icon type="exclamation"/></p>
              <p class="no-text">你的采购单空空如也！</p>
            </div>
            <li class="goods-lists-li" v-for="(item,index) in cartList" :key="index">
              <div class="first-div" :class="item.checked ? 'back-pink' : ''">
                <a-checkbox :disabled="item.status == 1" @change="onChange" :value="item" v-model="item.checked" class="pick-input"></a-checkbox>
                <!-- <input type="radio" class="pick-input"> -->
                <img v-lazy="item.imgURl">
                <p class="goods-name">{{item.ptitle}}</p>
                <p class="goods-guige">{{item.spec}}</p>
                <p class="manufactor">{{item.verdor}}</p>
                <p class="icon" v-if="item.rule.length > 0">
                  <a-tag color="red" v-for="(item, index) in item.rule" :key="index">{{ item.rulename  }}</a-tag>
                </p>
                <p class="old-price">￥ {{item.pdprice}}</p>
                <p class="validity">有效期：{{item.vperiod}}</p>
                <p class="btn-p">
                  <button :disabled="item.status == 1" @click="reduceCount(index,item)">-</button>
                  <!-- <button class="goods-count">{{item.count}}</button> -->
                  <a-input-number :disabled="item.status == 1" :min="1" :max="item.inventory" v-model="item.num" style="position:relative;top: 2px;left:0px;height: 30px;width: 50px;" readonly="readonly"/>
                  <button :disabled="item.status == 1" @click="addCount(index,item)">+</button>
                </p>
                <p class="limit" v-if="item.limitnum != 0">( 限购{{item.limitnum}} )</p>
                <p class="new-price">￥{{ parseFloat(item.pdprice * item.num).toFixed(2) }}</p>
                <p class="omit" v-if="item.discount != 0">为您节省￥{{item.discount}}</p>
                <!-- <p class="move">移入收藏夹</p> -->
                <a-tag color="#f50" class="move">添加收藏夹</a-tag>
                <!-- <p class="del-goods" @click="removeList(index)">删除</p> -->
                <a-popconfirm title="您确认要移除当前商品吗?" @confirm="removeCartList(item, index)" okText="确定" cancelText="取消">
                  <!-- <p class="del-goods">删除</p> -->
                  <a-tag color="gray" class="del-goods">移出购物车</a-tag>
                </a-popconfirm>
              </div>
            </li>
          </ul>
          <div class="whole-pick" v-if="this.cartList.length !== 0">
            <!-- <a-checkbox @change="onChange">全选</a-checkbox> -->
            <!-- <span>删除选中商品</span> -->
            <p class="summary">
              <span>商品合计：￥{{total}}</span>
              <span>活动优惠：￥{{amt}}</span>
              <span class="total-price" v-if="total > 0">应付总金额：￥{{total - amt}}</span>
              <span class="total-price" v-if="total == 0">应付总金额：￥{{total}}</span>
              <a-button :loading="loading" class="order-btn" @click="toPlaceOrder()">下单</a-button>
            </p>
          </div>
          <div class="guess" v-if="likeList.length > 0">
            <p class="title">猜你喜欢</p>
            <div class="carousel">
              <a-carousel arrows>
                <div
                  slot="prevArrow"
                  slot-scope="props"
                  class="custom-slick-arrow"
                  style="left: 10px;zIndex: 1;margin-right: 5px;"
                >
                  <a-icon type="left-circle"/>
                </div>
                <div
                  slot="nextArrow"
                  slot-scope="props"
                  class="custom-slick-arrow"
                  style="right: 10px"
                >
                  <a-icon type="right-circle"/>
                </div>
                <div v-for="(item,index) in likeList" :key="index" style="padding-left: 6.5%;" @click="toDetail()">
                  <a-card
                    hoverable
                    class="meal-card"
                    v-for="(items,index) in item.list"
                    :key="index"
                  >
                    <img v-lazy="items.imgURl" slot="cover">
                    <p class="meal-price">${{items.mp}}</p>
                    <p class="meal-name">{{items.prodname}}</p>
                  </a-card>
                </div>
              </a-carousel>
            </div>
          </div>
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../components/fspace-ui/header/header";
import FSpaceFooter from "../components/fspace-ui/footer";
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter
  },
  middleware: 'authenticated',
  data() {
    return {
      isSubmit: false,
      amt: 0,
      loading: false,
      maximum: 1,// 最大库存
      timeoutflag: null,
      checked: false,
      discount: 100,
      mealList: [], // 猜你喜欢列表
      cartList: [],
      likeList: []
      // acamt amt: 优惠总金额 checked 0未选中 discount: 商品优惠价（优惠多少） inventory 总库存 limitnum 限购 0 不限购 num 商品数量 pdno :sku
      // pdprice 🐤价格 ptitle 名称   rulename 活动名称 spec 规格 status  unqid 唯一id verdor 厂家 vperiod有效期
    };
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    },
    total: function() {
      let total = 0;
      this.cartList.forEach(item => {
        if(item.checked) {
          total +=  parseFloat(item.pdprice * item.num);
        }
      });
      return total.toFixed(2);
    }
  },
  mounted() {
    this.getShoppingCartList()
    this.guessYouLikeArea()
  },
  methods: {
    getShoppingCartList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "queryUnCheckShopCartList";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.storeId
      })
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "orderServer" + Math.floor(_this.storeInfo.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              if(result.data) {
                _this.cartList = result.data
                console.log(_this.cartList)
                _this.cartList.forEach((item) => {
                  item.checked ? false : true
                })
                _this.getImgUrl(_this.cartList)
              }
            } else {
              _this.$message.error(result.message);
            }
        },
        function error(error) {
          _this.$message.error('无法连接服务器或服务器返回异常, 请稍后重试');
        })
      );
    },
    queryCheckShopCartList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "queryCheckShopCartList";
      let arr = _this.cartList.map((value) => {
        return {
          compid: _this.storeInfo.storeId,
          pdno: value.pdno,
          pnum: value.num,
          checked: value.checked ? 1 : 0,
          unqid: value.unqid
        };
      })
      iRequest.param.json = JSON.stringify(arr)
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "orderServer" + Math.floor(_this.storeInfo.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
            
          if (result.code === 200) {
            _this.cartList = result.data
            _this.cartList.forEach((item) => {
              if(item.checked) {
                _this.amt = item.amt
              }
            })
          } else {
            _this.$message.error(result.message);
          }
        },
        function error(e) {
          _this.$message.error(e);
        })
      );
    },
    // 现在是单条删除
    removeCartList(item, index) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "clearShopCart";
      iRequest.param.json = JSON.stringify({
        compid: _this.storeInfo.storeId,
        ids: item.unqid
      })
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "orderServer" + Math.floor(_this.storeInfo.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
          if (result.code === 200) {
            _this.$message.success('购物车移除成功~')
            _this.cartList.splice(index, 1)
            _this.queryCheckShopCartList()
          } else {
            _this.$message.error(result.message);
          }
        },
        function error(e) {
          _this.$message.error(e);
        })
      );
    },
    // 购物车选中商品
    toDetail() {
      this.$router.push({
        path:'/product/detail'
      })
    },
    // 全选
    checkAll(e) {
      this.cartList.forEach((item) => {
        if(item.status != 1) {
          item.checked = e.target.checked
        }
      })
      this.queryCheckShopCartList()
    },
    onChange(e) {
      this.queryCheckShopCartList()
    },
    inputChange(index, item) {
      console.log(item)
    },
    toPlaceOrder() {
      this.loading = true
      // 获取sku id
      let arr = []
       this.cartList.forEach((item) => {
        if(item.checked) {
          arr.push({
            pdno: item.pdno,
            pnum: item.num,
            compid: this.storeInfo.storeId,
            checked: 1,
            unqid: item.unqid,
            conpno: 0
          })
        }
      })
      if(arr.length === 0) {
        this.$message.error('请选择要购买的药品～')
        this.loading = false
        return
      }
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "querySettShopCartList";
      iRequest.param.json = JSON.stringify(arr)
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "orderServer" + Math.floor(_this.storeInfo.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
          _this.loading = false
          if (result.code === 200) {
            _this.$router.push({
              name: "order-placeOrder",
              query: {
                arr: JSON.stringify(result.data),
                placeType: 2,
                orderType: 0
              }
            });
          } else {
            _this.$message.error(result.message);
          }
        },
        function error(e) {
          _this.loading = false
          _this.$message.error(e);
        })
      );
      // setTimeout(() => {
      //   this.loading = false
      //   // this.$router.push({
      //   //   path: "order/pay"
      //   // });
      // },3000)
    },
    addCount(index, item) {
      let _this = this
      // 限购数量
      if(item.num >= item.inventory) {
        _this.$message.warning(item.ptitle + '限购' + item.inventory + '件')
        return
      }
      item.checked = true
      item.num += 1;

      if(this.timeoutflag != null){
        clearTimeout(this.timeoutflag);
      }
      this.timeoutflag = setTimeout(function(){
        _this.queryCheckShopCartList()
      },1000);
    },
    reduceCount(index, item) {
      if (item.num === 1) {
        return false;
      }
      let _this = this
      item.num--
      item.checked = true
      if(this.timeoutflag != null){
        clearTimeout(this.timeoutflag);
      }
      this.timeoutflag = setTimeout(function(){
        _this.queryCheckShopCartList()
      },1000);
    },
    guessYouLikeArea() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "guessYouLikeArea";
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        keyword: ''
      })
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.likeList = result.data
            _this.getImgUrl(_this.likeList)
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    // 获取商品图片
    getImgUrl(arr) {
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
            console.log(error)
          }
        )
      );
    }
  }
};
</script>
<style lang="less" scoped>
@import "../components/fspace-ui/container/index.less";
@import "../components/fspace-ui/button/index.less";
* {
  margin: 0;
}
a {
  text-decoration: none;
  color: #000000;
}
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
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
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
// 采购单无数据显示 内容
.no-data{
  .container-size(block, 1190px, 120px, 0 auto 20px auto, 0px);
  .no-icon{
    .p-size(50px,50px,50px,center,0px,#333333);
    margin-bottom: 20px;
  }
  .no-text{
     .p-size(50px,50px,30px,center,0px,#333333);
  }
}
.cart-box {
  .container-size(block, 1190px, auto, 0 auto 20px auto, 0px);
}
.table-header {
  .container-size(block, 1190px, 60px, 0 auto, 0px);
  background: #fafafa;
  color: #666;
}
.table-header li {
  .container-size(inline-block, 213px, 60px, 0 auto, 0px);
  text-align: center;
  line-height: 60px;
}
.goods-lists {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  border: 1px solid #e0e0e0;
}
.nutrition {
  .container-size(block, 1190px, 50px, 0 auto, 0px);
  line-height: 50px;
  text-indent: 15px;
}
.nutrition i {
  font-size: 18px;
  color: #666;
}
.whole {
  width: 100px !important;
}
.total-price {
  font-size: 18px;
  font-weight: bold;
  color: #ed2f26;
}
.goods-lists-li {
  .container-size(block, 1190px, 140px, 0 auto, 0px);
  border-top: 1px solid #e0e0e0;
}
.first-div {
  .position(relative, 0px, 0px);
  .container-size(inline-block, 1190px, 140px, 0, 0px);
}
.first-div img {
  .container-size(inline-block, 100px, 100px, 0, 0px);
  .position(absolute, 20px, 60px);
}
.first-div p {
  .container-size(inline-block, 182px, 30px, 0, 0px);
  line-height: 30px;
}
.first-div .pick-input {
  .position(absolute, 70px, 10px);
}
.goods-name {
  .position(absolute, 10px, 180px);
  .p-size(30px, 30px, 12px, left, 0px, #333333);
}
.goods-guige {
  .position(absolute, 52px, 180px);
  .p-size(30px, 30px, 14px, left, 0px, #999999);
}
.manufactor {
  .position(absolute, 80px, 180px);
  .p-size(30px, 30px, 14px, left, 0px, #999999);
  height: auto !important;
  line-height: 14px !important;
}
.icon {
  .position(absolute, 100px, 180px);
  .p-size(20px, 20px, 14px, left, 0px, #999999);
  height: 20px !important;
}
.goods-count {
  .container-size(inline-block, 20px, 20px, 0, 0px);
  text-align: center;
}
.old-price {
  .position(absolute, 40px, 410px);
  font-size: 16px;
  color: #000000;
}
.original {
  .position(absolute, 65px, 410px);
  color: #999999;
}
.validity {
  .position(absolute, 90px, 410px);
  text-align: left;
  color: #999999;
}
.goods-count {
  width: 40px;
  height: 30px;
  border: 1px solid #e0e0e0;
  margin-bottom: 5px;
}
.btn-p {
  height: 40px;
  line-height: 40px;
  .position(absolute, 60px, 580px);
}
.limit {
  .position(absolute, 90px, 580px);
  color: #999999;
}
.btn-p button {
  width: 30px;
  height: 30px;
  line-height: 20px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
}
.btn-p input{
  height: 30px;
}
.new-price {
  .position(absolute, 55px, 840px);
  text-indent: 4px;
  color: #ed2f26;
  font-size: 18px;
}
.omit {
  .position(absolute, 90px, 790px);
  color: #999999;
}
.move {
  .position(absolute, 42px, 1050px);
  text-align: center;
}
.del-goods {
  .position(absolute, 72px, 1050px);
  text-align: center;
}
.whole-pick {
  .container-size(inline-block, 1190px, 70px, 0, 0px);
  background: #f2f2f2;
  line-height: 70px;
  padding-left: 20px;
}
.summary {
  .container-size(inline-block, 100%, 70px, 0, 0px);
  text-align: right;
}
.summary span {
  margin: 0px 10px 0px 10px;
}
.order-btn {
  .button-size(180px, 72px, 72px, 18px, 0px, 0px);
  .button-color(1px solid transparent, #ed2f26, #fff);
}
// 猜你喜欢
.guess {
  .container-size(block, 1190px, 360px, 0 auto, 0px);
  border: 1px solid #F6F6F6;
  margin-top: 20px;
  .title{
    .p-size(50px, 50px, 18px, left, 20px, #666666);
    background: #f6f6f6;
  }
}

.meal-card {
  display: inline-block;
  width: 200px!important;
  height: 280px!important;
  margin-right: 10px;
}
.meal-card img {
  width: 198px;
  height: 180px;
}
.meal-price {
  text-align: left;
  font-weight: bold;
  color: rgb(245, 47, 62);
}
.meal-name {
  margin-top: 10px;
  text-align: left;
  color: #333333;
}
.carousel {
  width: 1190px;
  height: 310px;
  padding-top: 15px;
}
.ant-carousel .slick-prev, .ant-carousel .slick-next{
  background-color: rgba(247, 37, 38, 0.5);
}

.ant-carousel > .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: red;
  opacity: 0.3;
}
.ant-carousel .custom-slick-arrow:before {
  display: none;
}
.ant-carousel .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}
.back-pink{
  background: #fdf4e9;
}
</style>


