<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout>
        <!-- 头部组件 -->
        <f-space-header type="home"></f-space-header>
        <a-layout-content>
          <div class="goods-exhibition">
            <a-breadcrumb class="crumbs">
              <a-breadcrumb-item>首页</a-breadcrumb-item>
              <a-breadcrumb-item>
                <a href>限时抢购</a>
              </a-breadcrumb-item>
              <a-breadcrumb-item>
                <a href>  {{ prodDetail.prodname }} </a>
              </a-breadcrumb-item>
            </a-breadcrumb>
            <div class="goods-big-pic">
              <img :src="imgUrl">
              <!-- <a-carousel arrows dotsClass="slick-dots slick-thumb">
                <a slot="customPaging" slot-scope="props">
                  <img :src="getImgUrl(props.i)">
                </a>
                <div v-for="(item,index) in 4" :key="index">
                  <img :src="baseUrl+'abstract0'+item+'.jpg'">
                </div>
              </a-carousel> -->
            </div>
            <div class="goods-info">
              <p class="goods-name"> {{ prodDetail.prodname }}</p>
              <p class="rush-time">限时抢购 距离结束还剩 12 小时 15 分钟 52 秒 56</p>
              <div class="price-server">
                <p class="price">
                  <span class="price-title">价格</span>
                  <span class="money-count">￥{{ prodDetail.vatp }}</span>
                  <!-- <del>￥32</del> -->
                </p>
                <p class="price">
                  <span class="integral">积份</span>
                  <span>购买得50积分</span>
                </p>
                <p class="price indent">
                  <a-icon type="check-circle"/>
                  <span>30天无忧退换货</span>
                  <a-icon type="check-circle"/>
                  <span>48小时快速退款</span>
                  <a-icon type="check-circle"/>
                  <span>满88元免邮费</span>
                </p>
              </div>
              <div class="manufacturer">
                <p class="packing">
                  <span>规格/包装：</span>
                  <span class="margin-right190">{{ prodDetail.formName }}</span>
                  <span>剂 型：</span>
                  <span>瓶装</span>
                </p>
                <p class="packing">
                  <span>批准文号：</span>
                  <span class="margin-right190">{{ prodDetail.standarNo }}</span>
                  <span>整件数量：</span>
                  <span>{{ prodDetail.wholenum }}</span>
                </p>
                <p class="packing">
                  <span>生产厂家：</span>
                  <span class="margin-right190">{{ prodDetail.manuName }} </span>
                </p>
                <p class="packing">
                  <span>生产日期：</span>
                  <span class="margin-right190">{{ prodDetail.prodsdate + ' ~ ' + prodDetail.prodedate}}</span>
                 
                </p>
                <p class="packing">
                
                  <span>有效期至：</span>
                  <span>{{ prodDetail.vaildsdate + ' ~ ' + prodDetail.prodedate }}</span>
                </p>
                <!-- <div class="packing">
                  <span>配送至</span>
                  <a-select defaultValue="湖南省长沙市岳麓区" style="width: 200px" @change="handleChange"></a-select>
                  <span>有货</span>
                </div> -->
                <!-- <p class="packing">
                  由
                  <a href>一块物流</a>发货，一块医药提供售后服务. 23:00前下单,预计后天(03月18日)送达
                </p> -->

                <p class="cart">
                  <input type="text" readonly="readonly" v-model="count" class="goods-count">
                  <button class="addition width22">+</button>
                  <button class="reduce width22">-</button>
                  <button type="danger" class="purchase">立即购买</button>
                  <a-button class="add-cart">
                    <a-icon type="shopping-cart"/>加入采购单
                  </a-button>
                </p>
              </div>
            </div>
          </div>
          <!-- 优惠套餐 -->
          <div class="discount">
            <p class="discount-title">优惠套餐</p>
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
                <div v-for="(item,index) in mealList" :key="index">
                  <a-card
                    hoverable
                    class="meal-card"
                    v-for="(items,index) in item.list"
                    :key="index"
                  >
                    <img v-lazy="items.url" slot="cover">
                    <p class="meal-price">${{items.price}}</p>
                    <p class="meal-name">{{items.name}}</p>
                    <p class="meal-packing">{{items.packing}}</p>
                  </a-card>
                </div>
              </a-carousel>
            </div>
          </div>
          <!-- 详情和评价 -->
          <div class="tabs-page">
            <div class="tabs-detail">
              <a-tabs defaultActiveKey="1" @change="callback" :tabBarStyle="tabStyle">
                <!-- 详情 -->
                <a-tab-pane tab="药品详情" key="1">
                  <div class="goods-detail">
                    <p class="detail-list">
                      <span class="explain-header">药石名称</span>
                      <span> {{ prodDetail.prodname }} </span>
                    </p>
                    <p class="detail-list">
                      <span class="explain-header">规格包装</span>
                      <span> {{ prodDetail.spec }}</span>
                    </p>
                    <p class="detail-list">
                      <span class="explain-header">生产厂家</span>
                      <span>{{ prodDetail.manuName }}</span>
                    </p>
                    <p class="detail-list">
                      <span class="explain-header">批准文号</span>
                      <span>{{ prodDetail.standarNo }}</span>
                    </p>
                    <div class="explain">
                      <span class="explain-header">功能主治</span>
                      <span class="explain-text">{{ details[0].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">主要成份</span>
                      <span class="explain-text">{{ details[1].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">用法用量</span>
                      <span
                        class="explain-text"
                      >{{ details[2].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">注意事项</span>
                      <span
                        class="explain-text"
                      >{{ details[4].content }}</span>
                    </div>
                    <div class="explain">
                      <span class="explain-header">禁忌</span>
                      <span class="explain-text">{{ details[5].content }}</span>
                    </div>
                  </div>
                </a-tab-pane>
                <!-- 评价 -->
                <a-tab-pane tab="药品评价" key="2" forceRender>
                  <div class="evaluate-box">
                    <div class="praise">
                      <div class="probability">
                        <p class="percentage">好评率</p>
                        <p class="percentage-num">98.6%</p>
                        <a-rate :defaultValue="5" disabled/>
                      </div>
                      <div class="everybody">
                        <p>大家都在说</p>
                        <a href class="is-active">全部(200+)</a>
                        <a href>物流快(30)</a>
                        <a href>有图(30)</a>
                        <a href>追评(50)</a>
                        <a href>服务很好(30)</a>
                        <a href>药效明显(60)</a>
                      </div>
                    </div>
                    <div class="evaluate-list">
                      <a-comment>
                        <template slot="actions">
                          <span>
                            <a-tooltip title="Like">
                              <a-icon
                                type="like"
                                :theme="action === 'liked' ? 'filled' : 'outlined'"
                                @click="like"
                              />
                            </a-tooltip>
                            <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
                          </span>
                          <span>
                            <a-tooltip title="Dislike">
                              <a-icon
                                type="dislike"
                                :theme="action === 'disliked' ? 'filled' : 'outlined'"
                                @click="dislike"
                              />
                            </a-tooltip>
                            <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
                          </span>
                          <span>Reply to</span>
                        </template>
                        <a slot="author">Han Solo</a>
                        <a-avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt="Han Solo"
                          slot="avatar"
                        />
                        <p
                          slot="content"
                          class="comment-text"
                        >药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备</p>
                        <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
                          <span>{{moment().fromNow()}}</span>
                        </a-tooltip>
                      </a-comment>
                    </div>
                    <div class="evaluate-list">
                      <a-comment>
                        <template slot="actions">
                          <span>
                            <a-tooltip title="Like">
                              <a-icon
                                type="like"
                                :theme="action === 'liked' ? 'filled' : 'outlined'"
                                @click="like"
                              />
                            </a-tooltip>
                            <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
                          </span>
                          <span>
                            <a-tooltip title="Dislike">
                              <a-icon
                                type="dislike"
                                :theme="action === 'disliked' ? 'filled' : 'outlined'"
                                @click="dislike"
                              />
                            </a-tooltip>
                            <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
                          </span>
                          <span>Reply to</span>
                        </template>
                        <a slot="author">Han Solo</a>
                        <a-avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt="Han Solo"
                          slot="avatar"
                        />
                        <p
                          slot="content"
                          class="comment-text"
                        >药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备药效立杆见影，包装精美，快递也很给力，准备长期购买，家中常备</p>
                        <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
                          <span>{{moment().fromNow()}}</span>
                        </a-tooltip>
                      </a-comment>
                    </div>
                  </div>
                  <a-pagination :defaultCurrent="6" :total="500" />
                </a-tab-pane>
              </a-tabs>
            </div>
            <!-- 热销推荐 -->
            <div class="hot-recommend">
              <p class="hot-recommend-title">热销推荐</p>
              <div class="recommend-box">
                <ul class="recommend-ul">
                  <li v-for="(item,index) in recommendList" :key="index">
                    <a-card class="card-recommend" hoverable>
                      <img v-lazy="item.url" slot="cover">
                      <p class="meal-price">￥{{item.price}}元</p>
                      <p class="meal-name">{{item.name}}</p>
                      <p class="meal-packing">{{item.packing}}</p>
                    </a-card>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </a-layout-content>
        <!-- 页脚 -->
        <f-space-footer></f-space-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import moment from "moment";
const baseUrl =
  "https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/";
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceButton from "../../components/fspace-ui/button/button";
import FSpaceFooter from "../../components/fspace-ui/footer";
export default {
  components: {
    FSpaceHeader, 
    FSpaceButton,
    FSpaceFooter
  },
  data() {
    return {
      imgUrl: '',
      sku: '',
      spu: '',
      prodDetail: {},
     details: [
          {
            name: '功能主治',
            content: '',
            id: 1,
          },
          {
            name: '主要成分',
            content: '',
            id: 2
          },
          {
            name: '用法用量',
            content: '',
            id: 3
          },
          {
            name: '不良反应',
            content: '',
            id: 4
          },
          {
            name: '注意事项',
            content: '',
            id: 5
          },
          {
            name: '禁忌',
            content: '',
            id: 6
          },
        ],
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      isis:
        "成人及儿童急、慢性腹泻。蒙脱石散（思密达）用于食道、胃、十二指肠疾病引起的相关疼痛症",
      tabStyle: {
        color: "black",
        fontSize: "26px",
        backgroundColor: "#f2f2f2"
      },
      baseUrl,
      count: 1,
      recommendList: [
        {
          price: 32,
          name: "汇仁片肾宝片",
          packing: "0.5g/片 * 100片",
          url:
            "//img.alicdn.com/imgextra/i1/TB1A6cwPVXXXXbJaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg"
        },
        {
          price: 32,
          name: "汇仁片肾宝片",
          packing: "0.5g/片 * 100片",
          url:
            "//img.alicdn.com/imgextra/i1/TB1A6cwPVXXXXbJaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg"
        },
        {
          price: 32,
          name: "汇仁片肾宝片",
          packing: "0.5g/片 * 100片",
          url:
            "//img.alicdn.com/imgextra/i1/TB1A6cwPVXXXXbJaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg"
        },
        {
          price: 32,
          name: "汇仁片肾宝片",
          packing: "0.5g/片 * 100片",
          url:
            "//img.alicdn.com/imgextra/i1/TB1A6cwPVXXXXbJaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg"
        },
        {
          price: 32,
          name: "汇仁片肾宝片",
          packing: "0.5g/片 * 100片",
          url:
            "//img.alicdn.com/imgextra/i1/TB1A6cwPVXXXXbJaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg"
        }
      ],
      mealList: [
        {
          list: [
            {
              url:
                "//img.alicdn.com/imgextra/i2/TB1RMTfIFXXXXX.XVXXLJcJ8VXX_033554.jpg_160x160q90.jpg",
              price: 42,
              name: "斯强牌服输酸营养颗粒",
              packing: "3g / 袋"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i4/TB1vpUaOFXXXXbxXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 49,
              name: "太极五子衍宗",
              packing: "0.5g / 80片"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 99,
              name: "盘龙去海排毒胶囊",
              packing: "0.5g * 18颗"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i3/TB1D1LfPFXXXXb9XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 468,
              name: "善存多维元素片",
              packing: "20g / 1瓶"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i1/TB1eAO_PXXXXXbtXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 32,
              name: "九芝堂六味地黄丸",
              packing: "0.5g / 100粒"
            }
          ]
        },
        {
          list: [
            {
              url:
                "//img.alicdn.com/imgextra/i4/TB1CMQtOFXXXXXzXXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg",
              price: 322,
              name: "汇仁牌肾宝片",
              packing: "5g / 100片"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i1/TB1srwPPVXXXXaIaXXXXXXXXXXX_!!2-item_pic.png_160x160q90.jpg",
              price: 711,
              name: "白去山陈李济",
              packing: "5g / 80片"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i2/TB1g6YOPVXXXXaYaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 1350,
              name: "山东东阿阿胶",
              packing: "5g * 18袋"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i2/TB11.ucPpXXXXaVaXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 468,
              name: "东阿阿胶复方阿胶浆",
              packing: "20g / 1瓶"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i1/TB1eAO_PXXXXXbtXFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 32,
              name: "九芝堂六味地黄丸",
              packing: "0.5g / 100粒"
            }
          ]
        },
        {
          list: [
            {
              url:
                "//img.alicdn.com/imgextra/i3/TB1q0YVKpXXXXXdXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 4050,
              name: "破壁灵芝孢子粉",
              packing: "5g / 15袋"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i2/TB1zFmZLXXXXXcVXpXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 79.2,
              name: "金河藏红",
              packing: "5g / 10袋"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i1/TB195qYLXXXXXb2XFXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 1350,
              name: "贯康 冬虫夏草 4条/克",
              packing: "5g * 18袋"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i1/TB1sej.KFXXXXXpXXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 269,
              name: "桃花姬",
              packing: "20g / 1袋"
            },
            {
              url:
                "//img.alicdn.com/imgextra/i2/TB1gpgYKpXXXXb8XVXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg",
              price: 69,
              name: "敖东城 西洋参",
              packing: "80g / 1瓶"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.sku = this.$route.query.sku
    this.spu = this.$route.query.spu
    this.getImgUrl()
  },
  mounted() {
    this.getProd();
  },
  methods: {
    getProd() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "BackgroundProdModule";
      iRequest.method = "getProd";
      iRequest.param.arrays = [this.sku]
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.prodDetail = result.data
            _this.details = JSON.parse(_this.prodDetail.detail)
            console.log(_this.details)
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    getImgUrl() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        list: [
          {
            sku: this.sku,
            spu: this.spu
          }
        ]
      });
      
      this.$refcallback(
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              console.log(result)
              _this.imgUrl = result.data.downPrev + result.data.goodsFilePathList + '/' + _this.sku + '.jpg' +  "?" + new Date().getSeconds()
              console.log(_this.imgUrl)
            } else {
              _this.$message.error("文件地址获取失败, 请稍后重试");
            }
          },
          function error(error) {
            debugger;
          }
        )
      );
    },
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
    },
    // getImgUrl(i) {
    //   return `${baseUrl}abstract0${i + 1}.jpg`;
    // },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    callback(key) {
      console.log(key);
    }
  }
};
</script>

<style scoped>
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
.greenColor {
  color: #10b68c !important;
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
/* 商品展示 */
.goods-exhibition {
  width: 1190px;
  height: 560px;
  margin: 0 auto;
  padding-top: 20px;
}
.goods-exhibition .crumbs {
  margin: 0 0 20px 0;
}
.goods-big-pic {
  display: inline-block;
  width: 490px;
  height: 485px;
}
.goods-big-pic img {
  width: 490px;
  height: 430px;
}
.small-pic {
  display: inline-block;
  width: 490px;
  height: 100px;
  overflow: hidden;
  padding-bottom: 10px;
}
.small-pic li {
  display: inline-block;
  position: relative;
  top: 10px;
  width: 80px;
  height: 80px;
  background: brown;
}
.small-pic li img {
  display: inline-block;
  position: absolute;
  top: 0px;
  width: 80px;
  height: 80px;
}
.goods-info {
  float: right;
  width: 657px;
  height: 485px;
}
.goods-name {
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  font-weight: bold;
}
.rush-time {
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
  background: rgb(247, 37, 38);
  font-size: 20px;
  color: #ffffff;
}
.price-server {
  height: 129px;
  background: rgb(246, 246, 246);
}
.price-server .price {
  height: 42px;
  line-height: 42px;
  text-indent: 20px;
  font-size: 16px;
  color: #666666;
}
.price-server .price del {
  font-weight: bold;
}
.price-server .price .integral {
  margin-right: 5px;
}
.money-count {
  margin-right: 5px;
  font-size: 24px;
  font-weight: bold;
  color: rgb(247, 37, 38);
}
.indent {
  text-indent: 10px !important;
}
.manufacturer {
  display: inline-block;
  width: 657px;
  height: 150px;
  font-size: 16px;
  color: #666666;
}
.manufacturer .packing {
  height: 36px;
  text-indent: 20px;
  line-height: 36px;
}
.margin-right190 {
  margin-right: 190px;
}
.cart {
  position: relative;
  top: 10px;
  left: 0px;
  height: 44px;
  text-indent: 20px;
}
.goods-count {
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}
.addition {
  position: absolute;
  top: 0px;
  left: 64px;
}
.width22 {
  width: 22px;
  height: 22px;
  line-height: 10px;
  text-align: center;
}
.reduce {
  position: absolute;
  top: 22px;
  left: 64px;
}
.purchase {
  position: absolute;
  top: 0px;
  left: 120px;
  width: 170px;
  height: 44px;
  border: 1px solid rgb(247, 37, 38);
  border-radius: 5px;
  background: rgb(255, 244, 246);
  color: rgb(247, 37, 38);
}
/* 优惠套餐 */
.discount {
  display: block;
  width: 1190px;
  height: 360px;
  margin: 0 auto;
  border: 1px solid rgb(238, 238, 238);
  margin-bottom: 20px;
}
.discount-title {
  width: 1190px;
  height: 50px;
  background: rgb(246, 246, 246);
  line-height: 50px;
  text-indent: 20px;
  font-size: 18px;
  color: #666666;
}
.discount .carousel {
  width: 1190px;
  height: 310px;
  padding-top: 15px;
}
.meal-card {
  display: inline-block;
  width: 200px;
  height: 280px;
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
  text-align: left;
  color: #333333;
}
.meal-packing {
  text-align: left;
  color: #999999;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 310px;
  line-height: 310px;
  overflow: hidden;
}
.ant-carousel[data-v-0e9671aa] .custom-slick-arrow {
  background-color: rgba(247, 37, 38, 0.5);
}
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
/* 详情和评价页面 */
.tabs-page {
  display: block;
  width: 1190px;
  height: 1900px;
  margin: 0 auto;
}
.tabs-detail {
  float: left;
  width: 905px;
  height: 1900px;
  border: 1px solid rgb(238,238,238);
}
.goods-detail {
  width: 900px;
  height: 1800px;
  padding-left: 50px;
}
.explain {
  width: 900px;
  height: auto;
  padding: 20px 0;
  font-size: 18px;
}
.detail-list {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}
.explain .explain-text {
  display: inline-block;
  width: 700px;
  height: auto;
}
.explain-header {
  display: inline-block;
  width: 80px;
  margin-right: 20px;
  vertical-align: top;
}
.ant-tabs-nav .ant-tabs-tab-active {
  color: red;
}
.evaluate-box {
  display: block;
  width: 900px;
  height: 1600px;
  margin-bottom: 20px;
  border-left: 1px solid rgb(238, 238, 238);
  border-bottom: 1px solid rgb(238, 238, 238);
}
.evaluate-box .praise {
  display: block;
  width: 750px;
  height: 160px;
}
.probability {
  float: left;
  width: 150px;
  height: 150px;
  margin-left: 30px;
  border-right: 1px solid rgb(238, 238, 238);
}
.probability .percentage,
.probability .percentage-num {
  height: 50px;
  line-height: 50px;
  color: #333;
}
.everybody {
  float: right;
  width: 500px;
  height: 200px;
}
.everybody p {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.everybody a {
  display: inline-block;
  height: 30px;
  border: 1px solid rgb(247, 37, 38);
  border-radius: 30px;
  padding: 10px 10px;
  margin-bottom: 10px;
  line-height: 10px;
  text-align: center;
}
.is-active {
  background: rgb(247, 37, 38);
  color: #fff;
}
.ant-tabs-bar {
  margin: 0 !important;
}
.comment-text {
  width: 700px;
  height: auto;
}
.evaluate-list {
  border-top: 1px solid rgb(238, 238, 238);
}
/* 热销推荐 */
.hot-recommend {
  float: right;
  width: 280px;
  height: 1630px;
  /* background: darkorange; */
  border: 1px solid rgb(238, 238, 238);
}
.hot-recommend-title {
  height: 55px;
  text-indent: 20px;
  line-height: 55px;
  background: rgb(246, 246, 246);
  font-size: 20px;
  color: #666666;
}
.recommend-ul {
  width: 200px;
  height: 1510px;
}
.recommend-box {
  padding: 0 40px;
}
.card-recommend {
  width: 200px;
  height: 300px;
  margin-bottom: 15px;
}
/* 页脚 */
.page-footer {
  width: 1190px;
  height: 340px;
  margin: 0 auto;
  border: 1px solid brown;
}
.server-list {
  width: 1190px;
  height: 140px;
  background: #ffffff;
}
.server-ui {
  width: 1190px;
  height: 140px;
}
.server-ui li {
  display: inline-block;
  width: 292px;
  height: 100px;
}
.server-ui li a {
  position: relative;
  display: inline-block;
  top: 0px;
  width: 297px;
  height: 100px;
}
.server-ui li a span {
  position: absolute;
  top: 15px;
  left: 45px;
  width: 70px;
  height: 70px;
  border: 3px solid rgb(255, 0, 58);
  border-radius: 50%;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  color: rgb(255, 0, 58);
}
.server-ui li a h3 {
  position: absolute;
  top: 20px;
  left: 135px;
  font-weight: bold;
}
.server-ui li a p {
  position: absolute;
  top: 45px;
  left: 135px;
  color: #999999;
  font-size: 16px;
}
.shoping-guide {
  width: 1190px;
  height: 200px;
  margin: 0 auto;
  border-top: 1px solid rgb(237, 237, 237);
  background: #ffffff;
  padding-top: 20px;
}
.shoping-list {
  background: url("//img.alicdn.com/tfs/TB1dl28RXXXXXbzaFXXXXXXXXXX-136-50.png");
  background-repeat: no-repeat;
  background-size: 68px 25px;
  background-position: 12px bottom;
  padding-left: 50px;
  padding-right: 50px;
}
.shoping-list li .shoping-ui li {
  display: inline-block;
  width: 100px;
  height: 20px;
  margin-bottom: 3px;
}
.shoping-ui li a:hover {
  border-bottom: 1px solid #666666;
}
.first-server {
  font-size: 16px;
  color: #666666 !important;
}
.first-serve a {
  color: #000000 !important;
}
.black-footer {
  width: 100%;
  /* height: 175px; */
  background: #000000;
  border-top: 2px solid rgb(255, 0, 54);
}
.black-footer div {
  display: block;
  width: 1190px;
  height: 175px;
  margin: 0 auto;
  padding-top: 10px;
}
.footer-record {
  height: 30px;
  line-height: 20px;
}
.footer-record a {
  font-weight: 300;
  font-size: 12px;
  color: rgb(255, 255, 255);
}
.footer-record a:hover {
  border-bottom: 1px solid #ffffff;
}
.licence {
  font-size: 12px;
  color: rgb(136, 134, 134);
}
.licence a {
  margin-right: 40px;
  font-size: 12px;
  color: rgb(164, 164, 164);
}
.licence a:hover {
  border-bottom: 1px solid rgb(164, 164, 164);
}
.gongshang {
  margin-right: 40px;
}
.add-cart {
  position: absolute;
  top: 0px;
  left: 300px;
  width: 170px;
  height: 44px;
  line-height: 44px;
}
.add-cart i {
  font-size: 20px;
}
.add-cart span {
  font-size: 16px;
}
/* ui框架样式 */
.ant-input {
  width: 84% !important;
  border: none;
  border-radius: 0%;
}
.ant-btn {
  background-color: rgb(255, 0, 54);
  border: none;
  color: #ffffff;
}
.ant-layout-footer {
  padding: 0px;
}
</style>
