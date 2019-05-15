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
              <p class="no-icon">
                <a-icon type="exclamation"/>
              </p>
              <p class="no-text">你的采购单空空如也！</p>
            </div>
            <li class="goods-lists-li" v-for="(item,index) in cartList" :key="index">
              <div class="first-div" :class="item.checked ? 'back-pink' : ''">
                <a-checkbox
                  :disabled="item.status == 1 || item.status == 2 || item.status == 3 || item.maximum === 0"
                  @change="onChange"
                  :value="item"
                  v-model="item.checked"
                  class="pick-input"
                ></a-checkbox>
                <!-- <input type="radio" class="pick-input"> -->
                <img @click="toDetail(item)" v-lazy="item.imgURl">  
                <p class="goods-name" @click="toDetail(item)">{{ item.brand }}{{ item.ptitle }}</p>
                <p class="goods-guige">{{item.spec}}</p>
                <p class="manufactor">{{item.verdor}}</p>
                <p class="icon" v-if="item.rule.length > 0">
                  <a-tag color="#999999" v-if="item.status == 1">秒杀商品无法从购物车购买</a-tag>
                  <a-tag color="#999999" v-if="item.status == 2">当前商品已下架</a-tag>
                  <a-tag color="#999999" v-if="item.status == 3">商品库存不足</a-tag>
                  <a-tag
                    color="red"
                    v-for="(ruleItem, i) in item.rule"
                    :key="i"
                  >{{ ruleItem.rulename }}</a-tag>
                </p>
                <p class="old-price">￥ {{item.pdprice}}</p>
                <p class="validity">有效期：{{item.vperiod}}</p>
                <p class="btn-p">
                  <button :disabled="item.status == 1 || item.maximum === 0" @click="reduceCount(index,item)">-</button>
                  <!-- <button class="goods-count">{{item.count}}</button> -->
                  <a-input-number
                    :disabled="item.status == 1 || item.status == 2 || item.status == 3 || item.checked || item.maximum === 0"
                    :min="1"
                    :max="item.maximum"
                    v-model="item.num"
                    style="position:relative;top: 2px;left:0px;height: 30px;width: 50px;"
                    readonly="readonly"
                  />
                  <button
                    :disabled="item.status == 1 || item.status == 2 || item.status == 3 || item.maximum === 0"
                    @click="addCount(index,item)"
                  >+</button>
                  <!-- <a-input-number :disabled="item.status == 1 || item.status == 2 || item.status == 3" :min="1" :max="item.maximum" v-model="item.num" style="position:relative;top: 2px;left:0px;height: 30px;width: 50px;" readonly="readonly"/>
                  <button :disabled="item.status == 1 || item.status == 2 || item.status == 3" @click="addCount(index,item)">+</button> -->
                </p>
                <p class="limit" v-if="item.limitnum != 0">( 限购{{item.limitnum}} )</p>
                <p class="new-price">￥{{ parseFloat(item.pdprice * item.num).toFixed(2) }}</p>
                <p class="omit" v-if="item.discount != 0">为您节省￥{{item.discount}}</p>
                <!-- <p class="move">移入收藏夹</p> -->

                <a-popconfirm
                  title="商品加入收藏夹?"
                  @confirm="addCollec(item)"
                  okText="确定"
                  cancelText="取消"
                >
                  <!-- <p class="del-goods">删除</p> -->
                  <a-tag color="#f50" class="move">添加收藏夹</a-tag>
                </a-popconfirm>

                <!-- <p class="del-goods" @click="removeList(index)">删除</p> -->
                <a-popconfirm
                  title="您确认要移除当前商品吗?"
                  @confirm="removeCartList(item, index)"
                  okText="确定"
                  cancelText="取消"
                >
                  <!-- <p class="del-goods">删除</p> -->
                  <a-tag color="gray" class="del-goods">移出购物车</a-tag>
                </a-popconfirm>
              </div>
            </li>
          </ul>
          <div class="whole-pick" v-if="this.cartList.length !== 0">
             
            <span style="color: red;" v-for="(item, index) in tips" :key="index">
              <!-- 满减-现金 -->
              <span v-if="String(item.offercode).substring(0,4) == 1110 ">
                
                <span v-if="item.offer > 0">当前 <a-tag color="red">{{ item.offername }}</a-tag> 已满 {{ item.ladamt }}减 {{ item.offer }}元</span>
                <span v-if="item.noffer > 0">您还差{{ Math.abs(item.gapamt) }}元 , 可减 {{ item.noffer }} 元</span>
              </span>
              <!-- 满减-包邮 -->
              <span v-if="String(item.offercode).substring(0,4) == 1120 ">
                当前 <a-tag color="red">{{ item.offername }}</a-tag> 满 {{ item.ladamt }} 包邮
              </span>
              <!-- 满减-折扣 -->
              <span v-if="String(item.offercode).substring(0,4) == 1130 ">
                <span v-if="item.offer > 0">当前 <a-tag color="red">{{ item.offername }}</a-tag> 满 {{ item.ladamt }} 打 {{ item.offer }}折</span>
                <span v-if="item.noffer > 0">您还差{{ Math.abs(item.gapamt) }}元 , 可打 {{ item.noffer }} 折</span>
              </span>
              <!-- 满赠-现金券 -->
              <span v-if="String(item.offercode).substring(0,4) == 1210 ">
                <span  v-if="item.offer > 0">当前 <a-tag color="red">{{ item.offername }}</a-tag>  满 {{ item.ladamt }} 送 {{ item.offer }}元现金券</span>
                <span  v-if="item.noffer > 0">您还差{{ Math.abs(item.gapamt) }}元 , 可送 {{ item.noffer }} 元现金券</span>
              </span>
              <!-- 满赠-包邮券 -->
              <span v-if="String(item.offercode).substring(0,4) == 1220 ">
                <span v-if="item.ladamt > 0">当前 <a-tag color="red">{{ item.offername }}</a-tag>  满 {{ item.ladamt }} 送包邮券</span>
                <span v-if="item.noffer > 0">您还差{{ Math.abs(item.gapamt) }}元 , 可送 {{ item.noffer }} 元包邮券</span>
              </span>
              <!-- 满赠-折扣券 -->
              <span v-if="String(item.offercode).substring(0,4) == 1230 ">
                <span v-if="item.offer > 0">当前 <a-tag color="red">{{ item.offername }}</a-tag>  满 {{ item.ladamt }} 送 {{ item.offer }}折券</span>
                <span v-if="item.noffer > 0">您还差{{ Math.abs(item.gapamt) }}元 , 可送 {{ item.noffer }}折券</span>
              </span>
              <!-- 满赠-赠品 -->
              <span v-if="String(item.offercode).substring(0,4) == 1240 ">
                <!-- 当前 <a-tag color="red">{{ item.offername }}</a-tag>  满 {{ item.ladamt }} 送 {{ item.offer }}折,  您还差{{ item.gapamt }}元 , 可打 {{ item.noffer }} 折 -->
              </span>
            </span>
            <p class="summary">
              <span>商品合计：￥{{total}}</span>
              <span>活动优惠：￥{{amt}}</span>
             
              <span class="total-price" v-if="total > 0">应付总金额：￥{{(total - amt).toFixed(2)}}</span>
              <span class="total-price" v-if="total == 0">应付总金额：￥{{total}}</span>
              <a-button :loading="loading" class="order-btn" @click="toPlaceOrder()">下单</a-button>
            </p>
          </div>
          <div class="guess" v-if="likeList.length >= 5">
            <p class="title">猜你喜欢</p>
            <div class="carousel">
              <div class="like-box">
                <div
                  v-for="(j, i) in likeList"
                  :key="i"
                  style="display: inline-block;"
                  @click="toDetail(j)"
                >
                  <a-card hoverable class="meal-card">
                    <img v-lazy="j.imgURl" slot="cover">
                    <div slot="cover">
                      <p class="meal-price">¥{{j.mp}}</p>
                      <p class="meal-name">{{j.prodname}}</p>
                    </div>
                  </a-card>
                </div>
              </div> 
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
  middleware: "authenticated",
  data() {
    return {
      isSubmit: false,
      amt: 0,
      loading: false,
      maximum: 1, // 最大库存
      timeoutflag: null,
      discount: 100,
      cartList: [],
      likeList: [],
      tips: []
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
        if (item.checked) {
          total += parseFloat(item.pdprice * item.num);
        }
      });
      return total.toFixed(2);
    }
  },
  mounted() {
    this.getShoppingCartList();
    this.guessYouLikeArea();
  },
  methods: {
    getOfferTip() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "getOfferTip";
      let arr = _this.cartList.map(value => {
        return {
          compid: _this.storeInfo.comp.storeId,
          pdno: value.pdno,
          pnum: value.num,
          checked: value.checked ? 1 : 0,
          unqid: value.unqid
        };
      });
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.tips = result.data
          }
        }
       ));
    },
    getShoppingCartList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "queryUnCheckShopCartList";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            if (result.data) {
              _this.cartList = result.data;
              _this.getOfferTip();
              _this.cartList.forEach((item) => {
                item.limitnum = item.limitnum - item.limitsub
                _this.$set(item, 'checked', item.checked === 0 ? false : true)
                if(item.limitnum > item.inventory || item.limitnum === 0) {
                  item.maximum = item.inventory
                } else {
                  item.maximum = item.limitnum
                }
              })
              _this.fsGeneralMethods.addImages(_this, _this.cartList, 'pdno', 'spu')
            }
          }
        }
       ));
    },
    queryCheckShopCartList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "queryCheckShopCartList";
      let arr = _this.cartList.map(value => {
        return {
          compid: _this.storeInfo.comp.storeId,
          pdno: value.pdno,
          pnum: value.num,
          checked: value.checked ? 1 : 0,
          unqid: value.unqid
        };
      });
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.cartList = result.data;
             _this.cartList.forEach((item) => {
                _this.$set(item, 'checked', item.checked === 0 ? false : true)
                item.limitnum = item.limitnum - item.limitsub
                item.maximum = (item.limitnum > item.inventory || item.limitnum === 0)  ? item.inventory : item.limitnum
                if(item.checked) {
                  _this.amt = item.amt
                }
              })
            _this.getOfferTip();
          }
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
            if (_this.cartList.length > 0) _this.queryCheckShopCartList();
          }
        })
      );
    },
    // 购物车选中商品
    toDetail(item) {
      let routeData = this.$router.resolve({
        path: "/product/detail",
        query: {
          sku: item.sku || item.pdno,
          spu: item.spu
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 全选
    checkAll(e) {
      this.cartList.forEach(item => {
        if (item.status != 1) {
          item.checked = e.target.checked;
        }
      });
      this.queryCheckShopCartList();
    },
    onChange(e) {
      this.queryCheckShopCartList();
    },
    inputChange(index, item) {
    },
    toPlaceOrder() {
      this.loading = true;
      // 获取sku id
      let arr = [];
      this.cartList.forEach(item => {
        if (item.checked) {
          arr.push({
            pdno: item.pdno,
            pnum: item.num,
            compid: this.storeInfo.comp.storeId,
            checked: 1,
            unqid: item.unqid,
            conpno: 0,
            areano: this.storeInfo.comp.addressCode
          });
        }
      });
      if (arr.length === 0) {
        this.$message.error("请选择要购买的药品～");
        this.loading = false;
        return;
      }
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "querySettShopCartList";
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          _this.loading = false;
          if (result.code === 200) {
            sessionStorage.setItem(
              "placeOrderList",
              JSON.stringify(result.data)
            );
            _this.$router.push({
              name: "order-placeOrder",
              query: {
                placeType: 2,
                orderType: 0
              }
            });
          }
        })
      );
    },
    addCount(index, item) {
      
      let _this = this;
      // 限购数量
      if(item.num >= item.maximum) {
        _this.$message.warning(item.ptitle + '限购' + item.maximum + '件')
        return
      }
      item.checked = true;
      item.num += 1;

      if (this.timeoutflag != null) {
        clearTimeout(this.timeoutflag);
      }
      this.timeoutflag = setTimeout(function() {
        _this.queryCheckShopCartList();
      }, 1000);
    },
    reduceCount(index, item) {
      if (item.num === 1) {
        return false;
      }
      let _this = this;
      item.num--;
      item.checked = true;
      if (this.timeoutflag != null) {
        clearTimeout(this.timeoutflag);
      }
      this.timeoutflag = setTimeout(function() {
        _this.queryCheckShopCartList();
      }, 1000);
    },
    // 猜你喜欢
    guessYouLikeArea() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "guessYouLikeArea";
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 10;
      iRequest.param.json = JSON.stringify({
        keyword: ""
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "goodsServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            if(result.data.length > 5) {
              _this.likeList = result.data.slice(0, 5);
            }
            _this.fsGeneralMethods.addImages(
              _this,
              _this.likeList,
              "sku",
              "spu"
            );
          }
        })
      );
    },
    // 添加收藏
    addCollec(item) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyCollectModule";
      iRequest.method = "add";
      iRequest.param.json = JSON.stringify({
        sku: item.pdno,
        prize: item.pdprice,
        promtype: 0
      });
      // 促销类型未传，暂定0，促销完善补上
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.$message.success(result.message);
          }
        })
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
.meal-card:hover{
  box-shadow: 0px 0px 30px 10px #e0e0e0;
}
// 采购单无数据显示 内容
.no-data {
  .container-size(block, 1190px, 120px, 0 auto 20px auto, 0px);
  .no-icon {
    .p-size(50px, 50px, 50px, center, 0px, #333333);
    margin-bottom: 20px;
  }
  .no-text {
    .p-size(50px, 50px, 30px, center, 0px, #333333);
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
  .container-size(inline-block, 200px, 32px, 0, 0px);
  line-height: 32px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.first-div .pick-input {
  .position(absolute, 70px, 10px);
}
.goods-name {
  .position(absolute, 10px, 180px);
  .p-size(30px, 30px, 12px, left, 0px, #333333);
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.goods-guige {
  .position(absolute, 52px, 180px);
  .p-size(30px, 30px, 13px, left, 0px, #999999);
  font-size: 13px !important;
}
.manufactor {
  .position(absolute, 80px, 180px);
  .p-size(30px, 30px, 14px, left, 0px, #999999);
  font-size: 13px !important;
  height: auto !important;
  line-height: 14px !important;
}
.icon {
  .position(absolute, 100px, 180px);
  .p-size(20px, 20px, 14px, left, 0px, #999999);
  height: 30px !important;
  width: 250px !important;
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
  .position(absolute, 32px, 180px);
  text-align: left;
  font-size: 13px !important;
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
.btn-p input {
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
  .container-size(inline-block, 1190px, 72px, 0, 0px);
  background: #f8f8f8;
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
  border: 1px solid #f8f8f8;
  margin-top: 20px;
  .title {
    .p-size(50px, 50px, 18px, left, 20px, #666666);
    background: #f8f8f8;
  }
}

.meal-card {
  display: inline-block;
  width: 210px !important;
  height: 280px !important;
  margin-right: 12px;
  margin-left: 11px;
}
.meal-card img {
  width: 135px;
  height: 123px;
  margin-top: 32px;
  margin-left: 32px;
}
.meal-price {
  text-align: left;
  text-indent: 20px;
  margin-top: 35px;
  font-weight: bold;
  color: rgb(245, 47, 62);
}
.meal-name {
  margin-top: 10px;
  text-align: left;
  text-indent: 20px;
  padding-right: 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: #333333;
}
.carousel {
  width: 1190px;
  height: 310px;
  padding-top: 15px;
  background: #f8f8f8;
}
.ant-carousel .slick-prev,
.ant-carousel .slick-next {
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
.back-pink {
  background: #fdf4e9;
}
.goods-name:hover {
  color: #ed2f26;
  cursor: pointer;
}
.like-box{
  padding-left: 12px;
  padding-right: 12px;
}
</style>


