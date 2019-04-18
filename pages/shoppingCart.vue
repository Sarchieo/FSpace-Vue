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
              <span>一块医药自营</span>
            </div>
            <div class="no-data" v-if="cartList === 0">
              <p class="no-icon"><a-icon type="exclamation"/></p>
              <p class="no-text">你的采购单空空如也！</p>
            </div>
            <li class="goods-lists-li" v-for="(item,index) in cartList" :key="index">
              <div class="first-div" :class="item.checked ? 'back-pink' : ''">
                <a-checkbox v-model="item.checked" class="pick-input"></a-checkbox>
                <!-- <input type="radio" class="pick-input"> -->
                <img v-lazy="item.src" alt>
                <p class="goods-name">{{item.name}}</p>
                <p class="goods-guige">{{item.guige}}</p>
                <p class="manufactor">{{item.changshang}}</p>
                <p class="icon">
                  <a-tag color="pink">阿发发发发发发顺丰</a-tag>
                </p>
                <p class="old-price">￥ {{item.price}}</p>
                <p class="original">原价：￥{{item.original}}</p>
                <p class="validity">有效期：{{item.time}}</p>
                <p class="btn-p">
                  <button @click="reduceCount(index,item)">-</button>
                  <!-- <button class="goods-count">{{item.count}}</button> -->
                  <a-input-number :min="1" :max="item.limit" v-model="item.count" style="position:relative;top:2px;left;0px;height: 30px;width: 50px;" readonly="readonly"/>
                  <button @click="addCount(index,item)">+</button>
                </p>
                <p class="limit">( 限购{{item.limit}}盒 )</p>
                <p class="new-price">￥{{item.price*item.count}}</p>
                <p class="omit">为您节省￥{{item.original - item.price}}</p>
                <p class="move">移入收藏夹</p>
                <!-- <p class="del-goods" @click="removeList(index)">删除</p> -->
                <a-popconfirm title="您确认要移除当前商品吗?" @confirm="remove(index)" okText="确定" cancelText="取消">
                  <p class="del-goods">删除</p>
                </a-popconfirm>
              </div>
            </li>
          </ul>
          <div class="whole-pick" v-if="this.cartList.length !== 0">
            <!-- <a-checkbox @change="onChange">全选</a-checkbox> -->
            <!-- <span>删除选中商品</span> -->
            <p class="summary">
              <span>商品合计：￥{{total}}</span>
              <span>活动优惠：-￥{{discount}}</span>
              <span class="total-price">应付总金额：￥{{total - discount}}</span>
              <a-button :loading="loading" class="order-btn" @click="toPlaceOrder()">下单</a-button>
            </p>
          </div>
          <div class="guess">
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
                <div v-for="(item,index) in mealList" :key="index" style="padding-left: 6.5%;" @click="toDetail()">
                  <a-card
                    hoverable
                    class="meal-card"
                    v-for="(items,index) in item.list"
                    :key="index"
                  >
                    <img v-lazy="items.url" slot="cover">
                    <p class="meal-price">${{items.price}}</p>
                    <p class="meal-name">{{items.name}}</p>
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
      loading: false,
      maximum: 1,// 最大库存
      timeoutflag: null,
      checked: false,
      discount: 100,
      mealList: [], // 猜你喜欢列表
      cartList: [
        {
          src:
              "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "东阿阿胶",
          guige: "0.4g*12粒",
          changshang: "吉林市吴太感康药业有限公司",
          price: 88,
          original: 100,
          limit: 10,
          count: 1,
          time: "2022-02-30",
          checked: false
        },
        {
          src:
              "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "东阿阿胶",
          guige: "0.4g*12粒",
          changshang: "吉林市吴太感康药业有限公司",
          price: 199,
          original: 210,
          limit: 9,
          count: 1,
          time: "2022-02-30",
          checked: false
        },
        {
          src:
              "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
          name: "东阿阿胶",
          guige: "0.4g*12粒",
          changshang: "吉林市吴太感康药业有限公司",
          price: 99,
          original: 100,
          limit: 11,
          count: 1,
          time: "2022-02-30",
          checked: false
        }
      ]
    };
  },
  computed: {
    total: function() {
      var total = 0;
      this.cartList.forEach(item => {
        total += item.price * item.count;
      });
      return total;
    }
  },
  methods: {
    toDetail() {
      this.$router.push({
        path:'/product/detail'
      })
    },
    // 全选
    checkAll(e) {
      this.checked = e.target.checked
      this.cartList.forEach((item) => {
        item.checked = this.checked
      })
      if(this.checked) {
        // 调用后台接口

      }
    },
    onChange(item) {
      item.checked  = !item.checked
      let flag = true
      this.cartList.forEach((item) => {
        if(!item.checked) {
          flag = false
        }
      })
    },
    inputChange(index, item) {
      console.log(item)
    },
    toPlaceOrder() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        // this.$router.push({
        //   path: "order/placeOrder"
        // });
      },3000)
    
    },
    addCount(index, item) {
      let _this = this
      // 限购数量
      if(item.count >= item.limit) {
        _this.$message.warning(item.name + '限购' + item.limit + '件')
        return
      }
      item.checked = true
      item.count += 1;

      if(this.timeoutflag != null){
        clearTimeout(this.timeoutflag);
      }
      this.timeoutflag = setTimeout(function(){
        console.log('调用接口:' + _this.cartList[index].count)
      },1000);
    },
    reduceCount(index, item) {
      if (item.count === 1) {
        return false;
      }
      let _this = this
      item.count--
      item.checked = true
      if(this.timeoutflag != null){
        clearTimeout(this.timeoutflag);
      }
      this.timeoutflag = setTimeout(function(){
        console.log('调用接口:' + item.count)
      },1000);
    },
    remove(index) {
      this.cartList.splice(index, 1);
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
  .position(absolute, 20px, 180px);
  .p-size(30px, 30px, 18px, left, 0px, #333333);
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
  .position(absolute, 42px, 1000px);
  text-align: center;
}
.del-goods {
  .position(absolute, 72px, 1000px);
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


