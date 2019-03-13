<template>
 <div id="components-layout-demo-basic">
    <a-layout>
      <f-space-header type='home'></f-space-header>
       <a-layout-content>
         <div class="cart-box">
            <ul class="table-header">
              <li class="whole"><a-checkbox @change="onChange">全选</a-checkbox></li>
              <li>商品信息</li>
              <li>单价</li>
              <li>数量</li>
              <li>小计</li>
              <li>操作</li>
            </ul>
            <ul class="goods-lists">
              <div class="nutrition">
                 <a-icon type="android" theme="filled" />
                 <span>一块医药自营</span>
              </div>
              <li class="goods-lists-li" v-for="(item,index) in cartList" :key="index">
                <div class="first-div">
                  <a-checkbox @change="onChange" class="pick-input"></a-checkbox>
                  <!-- <input type="radio" class="pick-input"> -->
                  <img  v-lazy="item.src" alt="">
                  <p class="goods-name">{{item.name}}</p>
                  <p class="goods-guige">{{item.guige}}}</p>
                  <p class="manufactor">{{item.changshang}}</p>
                  <p class="old-price">￥ {{item.price}}</p>
                  <p class="validity">有效期：{{item.time}}</p>
                  <p class="btn-p">
                    <button>+</button>
                    <input type="text" readonly="readonly" v-model="item.count" class="goods-count">
                    <button>-</button>
                  </p>
                  <p class="new-price">￥478</p>
                  <p class="move">移入收藏夹</p>
                  <p class="del-goods">删除</p>
                </div>
              </li>
            </ul>
            <div class="whole-pick">
              <a-checkbox @change="onChange">全选</a-checkbox>
              <span>删除选中商品</span>
              <p class="summary"><span>商品合计：￥3000</span> <span>活动优惠：-￥100 </span> <span>应付总金额：￥2900</span> <button class="order-btn">下单</button></p>
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
  // middleware: 'authenticated',
  data() {
    return {
      
      cartList: [
        {
          src: '//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          name: '东阿阿胶',
          guige: '0.4g*12粒',
          changshang: '吉林市吴太感康药业有限公司',
          price: 198,
          total: 198,
          count: 1,
          time: '2022-02-30'
        },
        {
          src: '//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          name: '东阿阿胶',
          guige: '0.4g*12粒',
          changshang: '吉林市吴太感康药业有限公司',
          price: 198,
          total: 198,
          count: 1,
          time: '2022-02-30'
        },
        {
          src: '//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          name: '东阿阿胶',
          guige: '0.4g*12粒',
          changshang: '吉林市吴太感康药业有限公司',
          price: 198,
          total: 198,
          count: 1,
          time: '2022-02-30'
        }
      ]
    }
  },
  methods: {
     onChange (e) {
      console.log(`checked = ${e.target.checked}`)
    }
  }
}
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
  background: rgb(255,255,255);
  /* min-height: 1000px; */
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.cart-box {
  .container-size(block,1190px,auto,0 auto 20px auto,0px);
}
.table-header {
  .container-size(block,1190px,60px,0 auto,0px);
  background: #fafafa;
  color: #666;
}
.table-header li {
  .container-size(inline-block,213px,60px,0 auto,0px);
  text-align: center;
  line-height: 60px;
}
.goods-lists {
  .container-size(block,1190px,auto,0 auto,0px);
  border: 1px solid #e0e0e0;
}
.nutrition {
  .container-size(block,1190px,50px,0 auto,0px);
  line-height: 50px;
  text-indent: 15px;
}
.nutrition i {
  font-size: 18px;
  color: #666;
}
.whole {
  width: 100px!important;
}
.goods-lists-li {
  .container-size(block,1190px,140px,0 auto,0px);
  border-top: 1px solid #e0e0e0;
}
.first-div {
  .position(relative,0px,0px);
  .container-size(inline-block,1190px,140px,0,0px);
}
.first-div img {
  .container-size(inline-block,100px,100px,0,0px);
  .position(absolute,20px,60px);
}
.first-div p {
  .container-size(inline-block,182px,30px,0,0px);
  line-height: 30px;
}
.first-div .pick-input {
  .position(absolute,70px,10px);
}
.goods-name {
  .position(absolute,20px,180px);
}
.goods-guige {
  .position(absolute,50px,180px);
}
.manufactor {
  .position(absolute,80px,180px);
}
.goods-count {
   .container-size(inline-block,20px,20px,0,0px);
   text-align: center;
}
.old-price {
  .position(absolute,40px,410px);
}
.validity {
  .position(absolute,70px,410px);
  text-align: left;
}
.goods-count {
 width: 40px;
 height: 30px;
 border: 1px solid #e0e0e0;
 margin-bottom: 5px;
}
.btn-p {
  height: 40px;
  line-height:40px;
  .position(absolute,55px,580px);
}
.btn-p button {
  width: 40px;
  height: 30px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
}
.new-price {
  .position(absolute,55px,840px);
}
.move {
  .position(absolute,42px,1000px);
  text-align: center;
}
.del-goods {
  .position(absolute,72px,1000px);
   text-align: center;
}
.whole-pick {
  .container-size(inline-block,1190px,70px,0,0px);
  background: #f2f2f2;
  line-height: 70px;
  padding-left: 20px;
}
.summary {
  .container-size(inline-block,1000px,70px,0,0px);
  text-align: right;
}
.summary span {
  margin: 0px 10px 0px 10px;
}
.order-btn {
  .button-size(180px,72px,72px,18px,0px,0px);
  .button-color(1px solid transparent,red,#fff);
}
</style>


