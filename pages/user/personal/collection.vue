<template>
  <div>
    <p class="collection-text">我的收藏</p>
     <div class="no-data" v-if="this.collecList.length === 0">
       <p><a-icon type="exclamation"/></p>
       <p>您还没有收藏药品！</p>
        <!-- <a-icon type="delete" @click.stop="delCollec(item.sku)"/> -->
     </div>
     <ul class="goods-list-box" v-if="this.collecList.length !== 0">
        <li v-for="(item,index) in collecList" :key="index" @click="toDetail(item)">
           <a-card
          hoverable
          class="card"
        >
          <img class="card-img" v-lazy="item.imgURl" slot="cover"/>
          <a-icon type="delete" class="close-coll" @click.stop="delCollec(item)"/>
          <!-- {{item.info.prodname}} -->
          <p class="surplus text-Center top185">{{item.info.prodname}}</p>
          <!-- {{item.info.prodsdate}} - {{item.info.prodedate}} -->
          <p class="validity">有效期{{item.info.prodsdate}}-{{item.info.prodedate}}</p>
          <!-- {{item.info.vatp}} -->
          <p class="card-price top165">￥{{item.info.vatp/100}} </p>

          <!-- 规格 -->
          <!-- {{item.info.spec}} -->
          <p class="specifications">{{item.info.spec}}</p>
          <!-- 厂家 -->
          <!-- {{item.info.manuName}} -->
          <p class="manufacturer">{{item.info.manuName}}</p>
          <p class="add-card">
            <button class="cart-btns" @click.stop="addCart(item)">
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
import * as types from '../../../store/mutation-types'
export default {
   computed: {
    storeInfo() {
      return this.$store.getters.user(this);
    }
  },
  data() {
    return {
      count: 1,
      collecList: []
    }
  },
  mounted() {
    this.queryCollec();
    this.$store.commit(types.SELECTED_KEYS, '/user/personal/collection')
  },
  methods:{
    // 查询收藏列表
    queryCollec() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyCollectModule";
      iRequest.method = "query";
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" + Math.floor(this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            // _this.prodDetail = result.data
            // _this.details = JSON.parse(_this.prodDetail.detail)
            _this.collecList = result.data;
              for (let i = 0; i < _this.collecList.length; i++) {
                  _this.collecList[i].spu = _this.collecList[i].info.spu
              }
            _this.fsGeneralMethods.addImages(_this, _this.collecList, "sku", "spu");
          } else {
            ;
          }
        })
      );
    },
    // 取消收藏
     delCollec(item) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyCollectModule";
      iRequest.method = "del";
      iRequest.param.json = JSON.stringify({
        sku:item.sku,
        unqid:item.unqid
      })
      // 促销类型未传，暂定0，促销完善补上
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" + Math.floor(this.storeInfo.comp.storeId/8192%65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            // _this.isCollec();
            _this.queryCollec();
            _this.$message.success(result.message);
          }
        })
      );
    },
    addCart(item) {
      this.fsGeneralMethods.addShoppingCart(this, item, 1)
    },
    // 跳转详情
    toDetail(item) {
      this.$router.push({
        path: "/product/detail",
        query: {
          sku: item.sku,
          spu: item.spu
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.collection-text {
  .p-size(55px,55px,20px,left,15px,#ed3025);
  background: #F6F6F6;
  font-weight: bold;
}
.collection-box {
  .container-size(block,985px,800px,0px,0px);
}
.goods-list-box {
    .container-size(block,985px,960px,0 auto,0px);
    overflow: auto;
    padding-left: 10px;
    padding-bottom: 20px;
    z-index: 100;
}
.goods-list-box li {
  .container-size(inline-block,228px,350px,5.5px 5.5px,0px);
  .container-color(#ffffff,none,#999);
}
.card{
  .position(relative,0px,0px);
  .container-size(inline-block,226px,350px,0px,0px);
  border: 1px solid #e0e0e0;
}
.surplus{
  .position(absolute,245px,0px);
  width: 225px;
  text-indent: 20px;
   overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
  color: #333333;
}
.close-coll{
  display: none;
  .position(absolute,5px,200px);
  font-size: 20px;
  color: rgb(255, 0, 54);
}
.card-img{
  .position(absolute,0px,0px);
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
  .position(absolute,225px,0px);
  width: 225px;
  text-indent: 17px;
  font-weight: bold;
  color: rgb(255, 0, 54);
}
.card-price del{
  color: #999999;
}
.validity {
  .position(absolute,202px,0px);
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
  text-indent: 20px;
  overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
}
.specifications {
  display: inline-block;
  .position(absolute,268px,0px);
  width: 225px;
  text-indent: 20px;
}
.card:hover{
   box-shadow: 0px 0px 30px 10px #e0e0e0;
}
.card:hover .close-coll{
  display: inline-block;
}
.add-card {
  display: block;
  .position(absolute,315px,0px);
  width: 225px;
  text-align: center;
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


