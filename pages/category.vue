<template>
  <div>
      <a-layout>
          <f-space-header type='home'></f-space-header>
          <p class="crumbs">
               <a-breadcrumb>
                    <a-breadcrumb-item>首页</a-breadcrumb-item>
                    <a-breadcrumb-item>商品分类</a-breadcrumb-item>
                </a-breadcrumb>
          </p>
          <ul class="condition-box">
              <li class="brand-box">
                  <p class="">
                      <span>品牌：</span>
                       <a>全部</a>
                       <a>罗浮山</a>
                       <a>美林</a>
                       <a>嘉林阿乐</a>
                       <a>更多</a>
                  </p>
                   <a-collapse :bordered="false" class="collapse">
                        <a-collapse-panel header="" key="1">
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                        </a-collapse-panel>
                      </a-collapse>
              </li>
              <li>

              </li>
              <li>

              </li>
          </ul>
          <ul class="goods-list-box">
              <li v-for="(item,index) in list" :key="index" @mouseover="showCardBtn(index)" @mouseout="hideCardBtn(index)">
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
                  <p class="card-price top165">￥{{item.new}} <del>￥{{item.old}}</del></p>
                  <!-- 规格 -->
                  <p class="specifications" v-show="!isShowCard && index=== current">{{item.specifications}}</p>
                  <!-- 厂家 -->
                  <p class="manufacturer" v-show="!isShowCard && index=== current">{{item.manufacturer}}</p>
                  <p class="sold" v-show="isShowCard && index=== current"><span class="evaluate">评价{{item.evaluate}}条</span><span class="sold-count">已售{{item.sold}}盒</span></p>
                  <!-- 按钮 -->
                  <p class="add-card" v-show="isShowCard && index=== current">
                    <button>-</button>
                    <button>{{count}}</button>
                    <button>+</button>
                    <button>
                      <a-icon type="shopping-cart"/>
                      加入采购单
                    </button>
                  </p>
                  <!-- 有无存货 -->
                  <p class="goods-state" v-show="isShowCard && index=== current">有货 {{item.specifications}} <a-icon type="star"/>收藏</p>
                  <a-card-meta
                    class="card-info"
                    :title="item.text">
                  </a-card-meta>
                  
                </a-card>
              </li>
          </ul>
          <!-- 如果搜索结果为空显示 -->
          <!-- <div>
              <p>没有找到您想找的药品</p>
          </div> -->
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
  data() {
    return {
      current: 0,
      isShowCard: false,
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
    };
  },
  methods: {
    showCardBtn(index) {
      this.isShowCard = true;
      this.current = index;
     },
    hideCardBtn(index) {
      this.isShowCard = true;
      this.current = null
    }
  }
};
</script>
<style scoped lang="less">
@import "../components/fspace-ui/container/index.less";
@import "../components/fspace-ui/button/index.less";
/* 初始化 */
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
// 筛选条件
.crumbs {
  width: 1190px;
  margin: 0 auto;
  padding-top: 12px;
  .p-size (45px,45px,14px,left,30px,#666666);
}
.condition-box {
   .container-size (block,1190px,250px,0 auto 15px auto,0px);
   padding: 20px 30px;
   background: #ffffff;
}
.collapse {
    display: inline-block;
    width: 40px;
    height: 20px;
}
// 商品分类展示
.goods-list-box {
    .container-size(block,1206px,auto,0 auto,0px);
}
.goods-list-box li {
  .container-size(inline-block,228px,280px,6.5px 6.5px,0px);
  .container-color(#ffffff,none,#999);
}
.goods-pic {
  .container-size(inline-block,228px,280px,0px,0px);
}
.goods-pic img {
  .container-size(inline-block,135px,123px,20px 0px 5px 46px,0px);
}
.ant-card-body {
  padding: 0px!important;
}
.card{
  .position(relative,0px,0px);
  .container-size(inline-block,226px,278px,0px,0px);
  border: 1px solid #ffffff;
}
.card:hover {
  border: 1px solid red;
}
.surplus{
  .position(absolute,190px,0px);
  width: 225px;
  text-align: center;
  color: rgb(255, 0, 54);
}
.card-img{
  .position(absolute,15px,45px);
  width: 135px;
  height: 123px;
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
  .position(absolute,168px,0px);
  width: 225px;
  text-align: center;
  font-weight: bold;
  color: rgb(255, 0, 54);
}
.card-price del{
  color: #999999;
}
.validity {
  .position(absolute,145px,0px);
  .p-size (20px,20px,14px,center,0px,#666666);
  width: 224px;
  background: rgb(228,228,228);
}
.sold {
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
  .position(absolute,231px,0px);
  width: 225px;
  text-align: center;
}
.specifications {
  .position(absolute,210px,0px);
  width: 225px;
  text-align: center;
}
.add-card {
  .position(absolute,245px,0px);
  width: 225px;
  text-indent: 10px;
}
.goods-state {
  .position(absolute,215px,0px);
  text-indent: 10px;
}
</style>
