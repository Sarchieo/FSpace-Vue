<template>
  <div>
    <p class="collection-text">我的收藏</p>
     <ul class="goods-list-box">
        <li v-for="(item,index) in list" :key="index" @click="toDetals()">
           <a-card
          hoverable
          class="card"
        >
          <img
            class="card-img"
            v-lazy="item.src"
            slot="cover"
          />
          <p class="surplus text-Center top185">{{item.text}}</p>
          <p class="validity">有效期至{{item.validity}}</p>
          <p class="card-price top165">￥{{item.new}} </p>

          <!-- 规格 -->
          <p class="specifications">{{item.specifications}}</p>
          <!-- 厂家 -->
          <p class="manufacturer">{{item.manufacturer}}</p>
          <p class="add-card">
            <button>-</button>
            <button>{{count}}</button>
            <button>+</button>
            <button class="cart-btns">
              <a-icon type="shopping-cart"/>
              加入采购单
            </button>
          </p>




          <a-card-meta
            class="card-info"
            :title="item.text">
          </a-card-meta>
        </a-card>
        </li>
     </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 1,
       list: [
        {
          src:'//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          text: '999感冒灵颗粒',
          validity: '2019-09-03',
          new: 34,
          old: 35,
          specifications: '0.5g/袋',
          manufacturer: '华润三九医药股份有限公司',
          sold: 33,
          evaluate: 269,
          isShowCard: false
        },
         {
          src:'//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          text: '999感冒灵颗粒',
          validity: '2019-09-03',
          new: 34,
          old: 35,
          specifications: '0.5g/袋',
          manufacturer: '华润三九医药股份有限公司',
          sold: 33,
          evaluate: 269,
          isShowCard: false
        },
         {
          src:'//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          text: '999感冒灵颗粒',
          validity: '2019-09-03',
          new: 34,
          old: 35,
          specifications: '0.5g/袋',
          manufacturer: '华润三九医药股份有限公司',
          sold: 33,
          evaluate: 269,
          isShowCard: false
        },
         {
          src:'//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          text: '999感冒灵颗粒',
          validity: '2019-09-03',
          new: 34,
          old: 35,
          specifications: '0.5g/袋',
          manufacturer: '华润三九医药股份有限公司',
          sold: 33,
          evaluate: 269,
          isShowCard: false
        },
         {
          src:'//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          text: '999感冒灵颗粒',
          validity: '2019-09-03',
          new: 34,
          old: 35,
          specifications: '0.5g/袋',
          manufacturer: '华润三九医药股份有限公司',
          sold: 33,
          evaluate: 269,
          isShowCard: false
        },
         {
          src:'//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          text: '999感冒灵颗粒',
          validity: '2019-09-03',
          new: 34,
          old: 35,
          specifications: '0.5g/袋',
          manufacturer: '华润三九医药股份有限公司',
          sold: 33,
          evaluate: 269,
          isShowCard: false
        },
         {
          src:'//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          text: '999感冒灵颗粒',
          validity: '2019-09-03',
          new: 34,
          old: 35,
          specifications: '0.5g/袋',
          manufacturer: '华润三九医药股份有限公司',
          sold: 33,
          evaluate: 269,
          isShowCard: false
        },
         {
          src:'//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
          text: '999感冒灵颗粒',
          validity: '2019-09-03',
          new: 34,
          old: 35,
          specifications: '0.5g/袋',
          manufacturer: '华润三九医药股份有限公司',
          sold: 33,
          evaluate: 269,
          isShowCard: false
        }
      ]
    }
  },
  methods:{
    toDetals() {
      this.$router.push({
        path:'/product/detail'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.collection-text {
  .p-size(55px,55px,20px,left,30px,#ed3025);
  background: #F6F6F6;
  font-weight: bold;
}
.collection-box {
  .container-size(block,985px,800px,0px,0px);
}
.goods-list-box {
    .container-size(block,985px,800px,0 auto,0px);
    overflow: auto;
    padding-left: 10px;
}
.goods-list-box li {
  .container-size(inline-block,228px,350px,24px 6.5px,0px);
  .container-color(#ffffff,none,#999);
}
.card{
  .position(relative,0px,0px);
  .container-size(inline-block,226px,350px,0px,0px);
  border: 1px solid #e0e0e0;
}
.surplus{
  .position(absolute,250px,0px);
  width: 225px;
  text-align: center;
  color: rgb(255, 0, 54);
}
.card-img{
  .position(absolute,8px,0px);
  width: 224px;
  height: 190px;
}
.card-progress{
  .position(absolute,0px,0px);
}
.card-info{
  .position(absolute,195px,0px);
  .container-size(inline-block,0px,0px,0px,0px);
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
}
.card-price{
  .position(absolute,230px,0px);
  width: 225px;
  text-align: center;
  font-weight: bold;
  color: rgb(255, 0, 54);
}
.card-price del{
  color: #999999;
}
.validity {
  .position(absolute,210px,0px);
  .p-size(20px,20px,14px,center,0px,#666666);
  width: 224px;
  background: rgb(228,228,228);
}
.sold {
  display: inline-block;
  width: 225px;
  .position(absolute,255px,0px);
  border-top: 1px solid #e0e0e0;
  padding: 0px 5px;
}
.sold .evaluate {
  float: left;
}
.sold .sold-count  {
  float: right;
}
.manufacturer {
  display: inline-block;
  .position(absolute,290px,0px);
  width: 225px;
  text-align: center;
}
.specifications {
  display: inline-block;
  .position(absolute,270px,0px);
  width: 225px;
  text-align: center;
}

.add-card {
  display: block;
  .position(absolute,315px,0px);
  width: 225px;
  text-align: center;
}
.cart-btns {
  border: none;
  background: #ed3025;
  color: #ffffff;
}
</style>


