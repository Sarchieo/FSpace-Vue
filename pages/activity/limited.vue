<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <div class="limited-box">
          <!-- 广告位 -->
          <div class="binnar-box">
            <a-carousel arrows autoplay>
              <div
                slot="prevArrow"
                slot-scope="props"
                class="custom-slick-arrow"
                style="left: 10px;zIndex: 1"
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
              <div>
                <img
                  v-lazy="'//m.360buyimg.com/babel/jfs/t1/26491/29/9870/42039/5c820018E6ac9f854/55c42a68a489cd18.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img30.360buyimg.com/img/jfs/t15169/46/1365117661/178502/d02d6948/5a4ddc4eNbd55867a.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img30.360buyimg.com/img/jfs/t16327/24/1234872079/191114/a510775d/5a4ddbc6N2d73dd08.jpg'"
                  class="banner-pic"
                >
              </div>
              <div>
                <img
                  v-lazy="'//img.alicdn.com/mt/TB1dC1xlznD8KJjSspbXXbbEXXa-750-320.png_q90.jpg'"
                  class="banner-pic"
                >
              </div>
            </a-carousel>
          </div>
          <div class="limited-goods">
              <a-tabs defaultActiveKey="1" @change="callback" :tabBarStyle="tabStyle" size="large">
                <a-tab-pane tab="08点档" key="1" forceRender class="tab-pane">
                    <div class="goods-box" v-for="(item,index) in goodsList" :key="index">
                        <img v-lazy="item.src" alt="" class="goods-pic">
                        <p class="goods-name">{{item.name}}</p>
                        <p class="goods-adv">{{item.advantage}}</p>
                        <a-progress :percent="item.surplus" style="position:absolute;top:100px;left:250px;width: 215px;" :showInfo="false" status="exception"/>
                        <p class="goods-surplus">还剩{{item.surplus}}件</p>
                        <p class="goods-price">限时价￥{{item.new}}元 <del>原价￥{{item.old}}元</del></p>
                        <button @click="toDetails()">立即抢购</button>
                    </div>
                </a-tab-pane>
                <a-tab-pane tab="12点档" key="2" class="tab-pane">
                    <div class="goods-box" v-for="(item,index) in goodsList" :key="index">
                        <img v-lazy="item.src" alt="" class="goods-pic">
                        <p class="goods-name">{{item.name}}</p>
                        <p class="goods-adv">{{item.advantage}}</p>
                        <a-progress :percent="item.surplus" style="position:absolute;top:100px;left:250px;width: 215px;" :showInfo="false" status="exception"/>
                        <p class="goods-surplus">还剩{{item.surplus}}件</p>
                        <p class="goods-price">限时价￥{{item.new}}元 <del>原价￥{{item.old}}元</del></p>
                        <button @click="toDetails()">立即抢购</button>
                    </div>
                </a-tab-pane>
                <a-tab-pane tab="16点档" key="3" class="tab-pane">
                    <div class="goods-box" v-for="(item,index) in goodsList" :key="index">
                        <img v-lazy="item.src" alt="" class="goods-pic">
                        <p class="goods-name">{{item.name}}</p>
                        <p class="goods-adv">{{item.advantage}}</p>
                        <a-progress :percent="item.surplus" style="position:absolute;top:100px;left:250px;width: 215px;" :showInfo="false" status="exception"/>
                        <p class="goods-surplus">还剩{{item.surplus}}件</p>
                        <p class="goods-price">限时价￥{{item.new}}元 <del>原价￥{{item.old}}元</del></p>
                        <button @click="toDetails()">立即抢购</button>
                    </div>
                </a-tab-pane>
                <a-tab-pane tab="20点档" key="4" class="tab-pane">
                    <div class="goods-box" v-for="(item,index) in goodsList" :key="index">
                        <img v-lazy="item.src" alt="" class="goods-pic">
                        <p class="goods-name">{{item.name}}</p>
                        <p class="goods-adv">{{item.advantage}}</p>
                        <a-progress :percent="item.surplus" style="position:absolute;top:80px;left:250px;width: 215px;" :showInfo="false" status="exception"/>
                        <p class="goods-surplus">还剩{{item.surplus}}件</p>
                        <p class="goods-price">限时价￥{{item.new}}元 <del>原价￥{{item.old}}元</del></p>
                        <button @click="toDetails()">立即抢购</button>
                    </div>
                </a-tab-pane>
              </a-tabs>
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
                advantage: '培元固本，活血化淤',
                surplus: 56,
                new: 344,
                old: 309
            },
             {
                src: '//img.alicdn.com/imgextra/i1/TB1YUDFJpXXXXbnXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '长白山人参',
                advantage: '培元固本，活血化淤',
                surplus: 12,
                new: 888,
                old: 1099
            },
             {
                src: '//img.alicdn.com/imgextra/i1/TB1EpYsKpXXXXbDXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '宁夏枸杞',
                advantage: '提高免疫力',
                surplus: 34,
                new: 23,
                old: 24
            },
             {
                src: '//img.alicdn.com/imgextra/i4/TB1L37TMpXXXXbnXVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '胶原蛋白口服液',
                advantage: '美容养颜',
                surplus: 99,
                new: 199,
                old: 209
            },
             {
                src: '//img.alicdn.com/imgextra/i3/TB1lUe.OVXXXXcpapXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '叶酸片',
                advantage: '补充人体所需能量',
                surplus: 56,
                new: 344,
                old: 309
            },
             {
                src: '//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '山东阿胶',
                advantage: '培元固本，提高免疫力',
                surplus: 45,
                new: 222,
                old: 233
            },
             {
                src: '//img.alicdn.com/imgextra/i1/TB103TQOXXXXXaLaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg',
                name: '盘龙云海排毒胶囊',
                advantage: '排毒养颜',
                surplus: 88,
                new: 56,
                old: 59
            },
             {
                src: '//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg',
                name: '多维素片',
                advantage: '补充人体所需的维生素',
                surplus: 19,
                new: 88,
                old: 99
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
      }
  }
};
</script>
<style scoped lang="less">
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.limited-box {
  .container-size (block, 1190px, auto, 0 auto, 0px);
  background: #ffffff;
}
// 广告位样式
.binnar-box {
  .container-size(inline-block, 1190px, 350px, 0, 0px);
}
.ant-carousel > .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.banner-pic {
  width: 1190px;
  height: 350px;
}
.ant-carousel > .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #ED2F26;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel > .custom-slick-arrow:before {
  display: none;
}
.ant-carousel > .custom-slick-arrow:hover {
  opacity: 0.5;
}
.ant-carousel > .slick-slide h3 {
  color: #fff;
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
    .container-size(inline-block, 575px, 225px, 10px 10px, 0px);
    .position(relative,0px,0px);
    background: #ffffff;
    button {
        .position(absolute,160px,250px);
        .button-size (120px,40px,40px,14px,0px,5px);
        .button-color (1px solid transparent,#ED2F26,#ffffff);
    }
}
.goods-pic {
   .position(absolute,0px,0px);
   width: 225px;
   height: 225px;
}
.goods-name {
  .position(absolute,20px,250px);
  font-size: 20px;
}
.goods-adv {
  .position(absolute,50px,250px);
}
.goods-surplus {
  .position(absolute,80px,500px);
  font-size: 16px;
}
.goods-price {
  .position(absolute,120px,250px);
  font-size: 16px;
  color: #ED2F26;
  del {
      color: #666666;
  }
}
</style>