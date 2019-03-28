<template>
  <div class="collection-box">
    <p class="collection-text">我的足迹</p>
    <div v-for="(item,index) in list" :key="index" class="my-collection">
      <p class="collection-time">
        今天
        <span>{{item.time}}</span>
        <span class="line"></span>
      </p>
      <ul class="goods-list-box">
        <li v-for="(items,index1) in item.lists" :key="index1" @click="toDetals()">
          <a-card hoverable class="card">
            <img class="card-img" v-lazy="items.src" slot="cover">
            <p class="surplus text-Center top185">{{items.text}}</p>
            <p class="validity">有效期至{{items.validity}}</p>
            <p class="card-price top165">￥{{items.new}}</p>
            <p class="specifications">{{items.specifications}}</p>
            <p class="manufacturer">{{items.manufacturer}}</p>
            <p class="add-card">
              <button>-</button>
              <button>{{count}}</button>
              <button>+</button>
              <button class="cart-btns">
                <a-icon type="shopping-cart"/>加入采购单
              </button>
            </p>
            <a-card-meta class="card-info" :title="item.text"></a-card-meta>
          </a-card>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 1,
      list: [
        {
          time: '2019-03-23',
          lists: [
            {
              src:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "999感冒灵颗粒",
              validity: "2019-09-03",
              new: 34,
              old: 35,
              specifications: "0.5g/袋",
              manufacturer: "华润三九医药股份有限公司",
              sold: 33,
              evaluate: 269,
              isShowCard: false
            },
             {
              src:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "999感冒灵颗粒",
              validity: "2019-09-03",
              new: 34,
              old: 35,
              specifications: "0.5g/袋",
              manufacturer: "华润三九医药股份有限公司",
              sold: 33,
              evaluate: 269,
              isShowCard: false
            },
             {
              src:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "999感冒灵颗粒",
              validity: "2019-09-03",
              new: 34,
              old: 35,
              specifications: "0.5g/袋",
              manufacturer: "华润三九医药股份有限公司",
              sold: 33,
              evaluate: 269,
              isShowCard: false
            },
             {
              src:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "999感冒灵颗粒",
              validity: "2019-09-03",
              new: 34,
              old: 35,
              specifications: "0.5g/袋",
              manufacturer: "华润三九医药股份有限公司",
              sold: 33,
              evaluate: 269,
              isShowCard: false
            }    
          ]
        },
             {
          time: '2019-03-24',
          lists: [
            {
              src:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "999感冒灵颗粒",
              validity: "2019-09-03",
              new: 34,
              old: 35,
              specifications: "0.5g/袋",
              manufacturer: "华润三九医药股份有限公司",
              sold: 33,
              evaluate: 269,
              isShowCard: false
            },
             {
              src:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "999感冒灵颗粒",
              validity: "2019-09-03",
              new: 34,
              old: 35,
              specifications: "0.5g/袋",
              manufacturer: "华润三九医药股份有限公司",
              sold: 33,
              evaluate: 269,
              isShowCard: false
            },
             {
              src:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "999感冒灵颗粒",
              validity: "2019-09-03",
              new: 34,
              old: 35,
              specifications: "0.5g/袋",
              manufacturer: "华润三九医药股份有限公司",
              sold: 33,
              evaluate: 269,
              isShowCard: false
            },
             {
              src:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              text: "999感冒灵颗粒",
              validity: "2019-09-03",
              new: 34,
              old: 35,
              specifications: "0.5g/袋",
              manufacturer: "华润三九医药股份有限公司",
              sold: 33,
              evaluate: 269,
              isShowCard: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    toDetals() {
      this.$router.push({
        path:'/product/detail'
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.collection-text {
  .p-size(55px, 55px, 20px, left, 20px, #000000);
  background: #f6f6f6;
}
.collection-box {
  .container-size(block, 983px, auto, 0px, 0px);
}
.collection-time {
  .p-size(55px, 55px, 30px, left, 20px, #333333);
  span {
    display: inline-block;
    margin-right: 10px;
    margin-left: 20px;
    font-size: 18px;
  }
}
.my-collection{
    width: 983px;
    overflow: auto;
}
.line {
  display: inline-block;
  width: 705px;
  height: 1px;
  border-top: 1px solid #e0e0e0;
}
.goods-list-box {
  .container-size(block, 983px, auto, 0 auto, 0px);
  padding-left: 10px;
}
.goods-list-box li {
  .container-size(inline-block, 228px, 350px, 24px 6.5px, 0px);
  .container-color(#ffffff, none, #999);
}
.card {
  .position(relative, 0px, 0px);
  .container-size(inline-block, 226px, 350px, 0px, 0px);
  border: 1px solid #e0e0e0;
}
.surplus {
  .position(absolute, 245px, 0px);
  width: 225px;
  text-align: center;
  color: #333333;
}
.card-img {
  .position(absolute, 0px, 0px);
  width: 224px;
  height: 190px;
}
.card-progress {
  .position(absolute, 0px, 0px);
}
.card-info {
  .position(absolute, 195px, 0px);
  .container-size(inline-block, 0px, 0px, 0px, 0px);
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
}
.card-price {
  .position(absolute, 225px, 0px);
  width: 225px;
  text-align: center;
  font-weight: bold;
  color: rgb(255, 0, 54);
}
.card-price del {
  color: #999999;
}
.validity {
  .position(absolute, 200px, 0px);
  .p-size(20px, 20px, 14px, center, 0px, #666666);
  width: 224px;
  background: rgb(228, 228, 228);
}
.sold {
  display: inline-block;
  width: 225px;
  .position(absolute, 255px, 0px);
  border-top: 1px solid #e0e0e0;
  padding: 0px 5px;
}
.sold .evaluate {
  float: left;
}
.sold .sold-count {
  float: right;
}
.manufacturer {
  display: inline-block;
  .position(absolute, 287px, 0px);
  width: 225px;
  text-align: center;
}
.specifications {
  display: inline-block;
  .position(absolute, 265px, 0px);
  width: 225px;
  text-align: center;
}

.add-card {
  display: block;
  .position(absolute, 315px, 0px);
  width: 225px;
  text-align: center;
}
.cart-btns {
  border: none;
  background: #ed3025;
  color: #ffffff;
}
</style>


