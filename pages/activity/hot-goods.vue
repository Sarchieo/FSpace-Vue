<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="limited-box">
          <!-- 活动文案=》未定 -->
         <div class="buying-text">
             <p>人气推荐好药，它们最受欢迎</p>
             <p>实时数据计算得出，榜单所覆盖均为在售商品。每1小时更新1次</p>
         </div>
          <div class="limited-goods">
           
              <div class="goods-box" v-for="(item,index) in goodsList" :key="index">
                <a-card hoverable class="card" @click="toDetail(item)">
                  <img v-lazy="item.src" alt="" class="goods-pic">
                  <p class="goods-name">{{item.name}} {{item.advantage}}</p>
                  <p class="goods-surplus">{{item.menu}}</p>
                  <!-- <p class="goods-limit">{{item.least}}盒起拼, 还剩<span>{{item.most}}</span>盒</p> -->
                  <p class="goods-price">单价￥{{item.new}}元 </p>
                  <button @click="toDetails()">查看详情</button>
                </a-card>  
              </div>
            
          </div>
          <div class="limited-goods">
              <p class="one-day">24小时热销</p>
              <div class="goods-box" v-for="(item,index) in goodsList" :key="index">
                <a-card hoverable class="card" @click="toDetail(item)">
                  <img v-lazy="item.src" alt="" class="goods-pic">
                  <p class="goods-name">{{item.name}} {{item.advantage}}</p>
                  <p class="goods-surplus">{{item.menu}}</p>
                  <!-- <p class="goods-limit">{{item.least}}盒起拼, 还剩<span>{{item.most}}</span>盒</p> -->
                  <p class="goods-price">单价￥{{item.new}}元 </p>
                  <button @click="toDetails()">查看详情</button>
                </a-card>  
              </div>
            
          </div>
          <div class="limited-goods margin-bottom30">
              <p class="one-day">一周热销</p>
              <div class="goods-box" v-for="(item,index) in goodsList" :key="index">
                <a-card hoverable class="card" @click="toDetail(item)">
                  <img v-lazy="item.src" alt="" class="goods-pic">
                  <p class="goods-name">{{item.name}} {{item.advantage}}</p>
                  <p class="goods-surplus">{{item.menu}}</p>
                  <!-- <p class="goods-limit">{{item.least}}盒起拼, 还剩<span>{{item.most}}</span>盒</p> -->
                  <p class="goods-price">单价￥{{item.new}}元 </p>
                  <button @click="toDetails()">查看详情</button>
                </a-card>  
              </div>
            
          </div>
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceFooter from "../../components/fspace-ui/footer";
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter
  },
  data() {
    return {
        tabStyle: {
            color: '#c40000',
            background: 'black'
        },
        goodsList: [
            {
                src: '//img.alicdn.com/imgextra/i1/TB195qYLXXXXXb2XFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '冬虫夏草',
                advantage: '5g/盒',
                surplus: 56,
                new: 344,
                old: 309,
                menu: '三九制药有限公司',
                least: 10,
                most: 100
            },
             {
                src: '//img.alicdn.com/imgextra/i1/TB1YUDFJpXXXXbnXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '长白山人参',
                advantage: '5g/盒',
                surplus: 12,
                new: 888,
                old: 1099,
                menu: '三九制药有限公司',
                 least: 10,
                most: 100
            },
             {
                src: '//img.alicdn.com/imgextra/i1/TB1EpYsKpXXXXbDXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '宁夏枸杞',
                advantage: '5g/盒',
                surplus: 34,
                new: 23,
                old: 24,
                menu: '三九制药有限公司',
                 least: 10,
                most: 100
            },
             {
                src: '//img.alicdn.com/imgextra/i4/TB1L37TMpXXXXbnXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '胶原蛋白口服液',
                advantage: '5g/盒',
                surplus: 99,
                new: 199,
                old: 209,
                menu: '三九制药有限公司',
                 least: 10,
                most: 100
            },
             {
                src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '叶酸片',
                advantage: '5g/盒',
                surplus: 56,
                new: 344,
                old: 309,
                menu: '三九制药有限公司',
                 least: 10,
                most: 100
            },
             {
                src: '//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '山东阿胶',
                advantage: '5g/盒',
                surplus: 45,
                new: 222,
                old: 233,
                menu: '三九制药有限公司',
                 least: 10,
                most: 100
            },
             {
                src: '//img.alicdn.com/imgextra/i1/TB103TQOXXXXXaLaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
                name: '盘龙云海排毒胶囊',
                advantage: '5g/盒',
                surplus: 88,
                new: 56,
                old: 59,
                menu: '三九制药有限公司',
                 least: 10,
                most: 100
            },
             {
                src: '//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '多维素片',
                advantage: '5g/盒',
                surplus: 19,
                new: 88,
                old: 99,
                menu: '三九制药有限公司',
                least: 10,
                most: 100
            }
        ]
    }
  },
  methods: {
      callback(key) {
          console.log(key)
      },
      toDetails() {
          this.$router.push({
               path:'/product/detail'
          })
      },
      
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.person-num{
    .container-size(block,1190px,86px,0 auto,0px) ;
    line-height: 86px;
    background: #333333;
    font-size: 18px;
    color: #ffffff;
    .person-left{
        float: left;
        .container-size(inline-block,500px,86px,0 auto,0px) ;
        text-indent: 60px;
    }
    .person-right{
        float: right;
        .container-size(inline-block,500px,86px,0 auto,0px) ;
    }
}
.card{
   .container-size(inline-block, 225px, 310px, 0px 0px, 0px);
}
.buying-text{
    .container-size(block,1190px,200px,0 auto,0px) ;
    background: #e0e0e0;
    p{
        .p-size(100px,100px,28px,center,0px,#333333);
        font-weight: bold;
    }
}
.limited-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  background: #ffffff;
}
.limited-goods {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  min-height: 400px;
  background: #F6F6F6;
}
.tab-pane {
    width: 270px;
    height: auto;
}
.goods-box {
    .container-size(inline-block, 225px, 310px, 10px 6px, 0px);
    .position(relative,0px,0px);
    background: #ffffff;
    button {
        .position(absolute,265px,5px);
        .button-size(215px,40px,40px,14px,0px,5px);
        .button-color(1px solid transparent,#ED2F26,#ffffff);
    }
}
.goods-pic {
   .position(absolute,10px,10px);
   width: 206px;
   height: 132px;
}
.goods-name {
  .position(absolute,187px,0px);
  width: 100%;
   text-indent: 10px;
  font-size: 16px;
}
.goods-adv {
  .position(absolute,50px,250px);
}
.goods-surplus {
  .position(absolute,215px,0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  color: #999999;
}
.goods-limit{
  .position(absolute,235px,0px);
  width: 100%;
  text-indent: 10px;
  font-size: 14px;
  color: #999999;
  span{
    color: #ED2F26;
  }
}
.goods-price {
  .position(absolute,160px,0px);
  width: 100%;
   text-indent: 10px;
  font-size: 16px;
  color: #ED2F26;
  del {
      color: #666666;
  }
}
.card:hover {
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.one-day{
  .p-size(115px,115px,30px,center,0px,#333333);
  font-weight: bold;
}
.margin-bottom30{
  margin-bottom: 30px;
}
</style>