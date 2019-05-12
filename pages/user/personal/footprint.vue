<template>
  <div class="collection-box">
    <p class="collection-text">我的足迹</p>
     <div class="no-data" v-if="this.footList.length === 0">
       <p><a-icon type="exclamation"/></p>
       <p>您还没有药品足迹！</p>
        <!-- <a-icon type="delete" @click.stop="delCollec(item.sku)"/> -->
     </div>
    <div class="my-collection" v-if="this.footList.length !== 0">
      <ul class="goods-list-box" v-for="(item,index) in footList" :key="index">
        <p class="foot-data">{{item.date}}</p>
        <li v-for="(items,index1) in item.list" :key="index1" @click="toDetail(items)">
          <a-card hoverable class="card">
            <img class="card-img" v-lazy="items.imgURl" slot="cover">
            <a-icon type="delete" class="del-foot" @click="delFoot(items.sku)"/>
            <p class="surplus text-Center top185">{{items.brandName}} {{items.popname}}</p>
            <p class="validity">有效期至{{items.prodedate}}</p>
            <p class="card-price top165">￥{{items.vatp/100}}</p>
            <p class="specifications">{{items.spec}}</p>
            <p class="manufacturer">{{items.manuName}}</p>
            <p class="add-card">             
              <button class="cart-btns" @click.stop="addCart(items)">
                <a-icon type="shopping-cart"/>加入采购单
              </button>
            </p>
            <a-card-meta class="card-info" :title="item.text"></a-card-meta>
          </a-card>
        </li>
      </ul>
    </div>
    <!-- <a-pagination :total="total" @change="onChange" /> -->
  </div>
</template>
<script>
import * as types from '../../../store/mutation-types'
export default {
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      count: 1,
      total: 0,
      currentIndex: 1,
      footList: []
    };
  },
  mounted() {
    // this.delFoot();
    this.getFootList();
    this.$store.commit(types.SELECTED_KEYS, '/user/personal/footprint')
  },
  methods: {
    // 加入采购单
    addCart(items) {
      if(item.store === 0) {
        this.$message.error('商品库存不足')
        return
      }
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ShoppingCartModule";
      iRequest.method = "saveShopCart";
      iRequest.param.json = JSON.stringify({
        pdno: items.sku,
        pnum: 1,
        checked: 0,
        compid: _this.storeInfo.comp.storeId
      })
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" + Math.floor(_this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(
          function result(result) {
          if (result.code === 200) {
            _this.$message.success(result.message);
          }
        })
      );
    },
    toDetail(items) {
      this.$router.push({
        path: "/product/detail",
        query: {
          sku: items.sku,
          spu: items.spu
        }
      });
    },
    // 获取足迹列表
    getFootList() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyFootprintModule";
      iRequest.method = "query";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" + Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            console.log(result.data)
            _this.footList = result.data;
                _this.footList.forEach(item => {
              _this.fsGeneralMethods.addImages(
                _this,
                item.list,
                "sku",
                "spu"
              );
            });
          }
        })
      );
    },
    // 删除足迹
    delFoot(sku) {
      let _this = this;
      let iRequest = new inf.IRequest();
      let arr = [sku]
      iRequest.cls = "MyFootprintModule";
      iRequest.method = "del";
      iRequest.param.json = JSON.stringify(arr);
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "orderServer" + Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.getFootList();
            _this.$message.success(result.message);
          } else {
            ;
          }
        })
      );
    },
    onChange(pageNumber) {
      console.log(pageNumber)
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.collection-text {
  .p-size(55px, 55px, 20px, left, 15px, #000000);
  background: #f6f6f6;
  font-weight: bold;
  color:#ed3025;
}
.collection-box {
  .container-size(block, 983px, 100%, 0px, 0px);
  overflow: auto;
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
    width: 965px;
    overflow: auto;
}
.line {
  display: inline-block;
  width: 705px;
  height: 1px;
  border-top: 1px solid #e0e0e0;
}
.goods-list-box {
  .container-size(block, 965px, auto, 0 auto, 0px);
  padding-left: 10px;
}
.goods-list-box li {
  .container-size(inline-block, 228px, 350px, 6px 5px, 0px);
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
   overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
  text-align: left;
  padding: 0px 10px;
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
  text-align: left;
  text-indent: 8px;
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
  text-align: left;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  padding: 0px 10px;
}
.specifications {
  display: inline-block;
  .position(absolute, 265px, 0px);
  width: 225px;
  text-align: left;
  text-indent: 10px;
}

.add-card {
  display: block;
  .position(absolute, 315px, 0px);
  width: 225px;
  text-align: center;
}
.del-foot{
  .position(absolute,5px,190px);
  display: none;
  color: #333333;
}
.cart-btns {
  display: block;
  width: 200px;
  height: 30px;
  margin: 0 auto;
  border: none;
  background: #ed3025;
  color: #ffffff;
}
.cart-btns:hover{
  cursor: pointer;
}
.ant-pagination{
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.foot-data{
  .p-size(50px, 50px, 18px, left, 5px, #333333);
  font-weight: bold;
}
.card:hover .del-foot{
  display: inline-block;
  font-size: 26px;
  color:#ed3025;
}
.no-data{
  width: 985px;
  height: 400px;
  margin-top: 200px;
  p{
    .p-size(60px,60px,20px,center,0px,#666666);
    i{
      font-size: 40px!important;
    }
  }
}
</style>


