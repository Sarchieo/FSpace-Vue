<template>
  <div>
    <p class="service-title">售后记录</p>
    <p class="search-text" v-if="this.list.length !== 0">
      <span>售后类型：</span>
      <a-select defaultValue="" style="width: 200px" @change="handleChange">
        <a-select-option value="">全部</a-select-option>
        <a-select-option :value="1">仅退款</a-select-option>
        <a-select-option :value="2">开发票</a-select-option>
         <a-select-option :value="3">物流跟踪</a-select-option>
      </a-select>
      <button class="search-btn">搜索</button>
      <input v-model="arr[0]" type="text" placeholder="请输入订单号" class="search-input">
    </p>

    <ul class="service-ul" v-if="this.list.length !== 0">
      <li v-for="(item, index) in list" :key="index">
        <p class="list-title">
          售后类型：
          <span>{{ item.astype | asTypeFormat }}</span>申请单号：
          <span>{{ item.asno }}</span>申请时间：
          <span>{{ item.apdata + item.aptime}}</span>
        </p>
        <div class="service-box">
          <div class="pic-box">
            <img
              v-lazy="item.imgURl"
                class="service-pic"
                alt
              >
            <p class="name">{{ item.prodname }}</p>
            <p class="guige">{{ item.spec }}</p>
          </div>

        </div>
        <div class="complete">
            {{ item.astype | asTypeFormat }}
            <!-- 退款有？ -->
            <!-- <p class="price" v-if="item.astype === 0 || item.astype === 1">完成退款：￥{{item.refamt}}</p> -->
        </div>
        <div class="see-detail" @click="seeDetail(item)">
           查看详情
        </div>
         <div style="clear: both;"></div>
      </li>
      <a-pagination  v-if="this.list.length !== 0 " @change="onChangePage" :total="total"/>
    </ul>
    <div class="no-data" v-if="this.list.length === 0">
      <p class="icon"><a-icon type="exclamation" /></p>
      <p class="text">没有查询到售后记录！</p>
        <!--<p @click="toSuppInvo(item)">补开发票</p>-->
        <!-- <p @click="saleAfter()">申请售后</p> -->
    </div>
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
      arr: ['','','','','','','','','','',''], // 订单号 , 商品码, ? ,企业id, 售后类型 , ??????
      list: [],
      currentIndex: 1,
      total: 0
    };
  },
  filters: {
   asTypeFormat(val) {
     let text = ''
     switch(val) {
       case 1:
       text = '退款退货'
       break
       case 2:
       text = '仅退款'
       break
       case 3:
       text = '补开发票'
       break
     }
    return text;
   }
  },
  mounted() {
    this.$store.commit(types.SELECTED_KEYS, '/user/personal/service')
    this.queryAsapp()
  },
  methods: {
    queryAsapp() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "OrderInfoModule";
      iRequest.method = "queryAsapp";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.arrays = this.arr
      iRequest.param.pageIndex = this.currentIndex;
      iRequest.param.pageNumber = 10;
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((_this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.list = result.data
            _this.fsGeneralMethods.addImages(_this, _this.list, 'pdno', 'spu')
            _this.total = result.total
            _this.currentIndex = result.pageNo
          }
        })
      );
    },
    handleChange(value) {
      this.arr[4] = value
      this.queryAsapp()
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber
      // this.currentIndex = 1
      this.queryAsapp()
    },
    seeDetail(item) {
      this.$router.push({
        path: '/order/reason-detail',
        query: {
          detail: JSON.stringify(item)
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.service-title {
  .p-size(60px, 60px, 16px, left, 20px, #333333);
  background: #f2f2f2;
}
.search-input {
  float: right;
  width: 250px;
  height: 32px;
  border: 1px solid #e0e0e0;
  text-align: center;
  margin-top: 24px;
}
.search-btn {
  float: right;
  height: 32px;
  margin-right: 30px;
  margin-top: 24px;
  line-height: 32px;
}
.search-text {
  .p-size(80px, 80px, 14px, left, 20px, #333333);
}
.service-ul {
  .container-size(block, 946px, 800px, 0 auto, 0px);
  overflow: auto;
}
.service-ul li {
  .container-size(block, 945px, auto, 0, 0px);
  min-height: 185px;
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
}
.service-box {
  .container-size(block, 473px, 140px, 0, 0px);
  float: left;
  .pic-box {
    float: left;
    .container-size(inline-block, 472px, 140px, 0, 0px);
    border-right: 1px solid #f2f2f2;
    // border-bottom: 1px solid #f2f2f2;
    .name {
      .container-size(inline-block, 200px, 30px, 0, 0px);
      .position(relative, 0px, 10px);
    }
    .guige {
      .container-size(inline-block, 200px, 30px, 0, 0px);
      .position(relative, -45px,132px);
    }
  }
}
.service-pic {
  // .position(absolute, 23px, 22px);
  width: 95px;
  height: 95px;
  // vertical-align: middle;
  margin-top:22px;
  margin-left: 22px;
}
.list-title {
  .p-size(45px, 45px, 14px, left, 20px, #333333);
  background: #f2f2f2;
  span {
    margin-right: 50px;
  }
}
.complete {
  float: left;
  width: 232px;
  height: 140px;
  line-height: 140px;
  text-align: center;
  border-right: 1px solid #f2f2f2;
  .states {
    .container-size(inline-block, 235px, 30px, 0, 0px);
    // .position(absolute, 55px, 0px);
    text-align: center;
  }
  .price {
    .container-size(inline-block, 235px, 30px, 0, 0px);
    // .position(absolute, 80px, 0px);
    text-align: center;
    color: #ed3025;
  }
}

.see-detail {
  display: inline-block;
  width: 232px;
  margin-top: 55px;
  text-align: center;
}
.see-detail:hover{
  color: #3189f5;
  cursor: pointer;
}
// 采购单无数据显示 内容
.no-data{
  .container-size(block, 985px, 120px, 0 auto 20px auto, 0px);
  padding-top: 30px;
  .icon{
    width: 965px;
    .p-size(50px,50px,50px,center,0px,#333333);
    margin-bottom: 20px;
  }
  .text{
    width: 985px;
     .p-size(50px,50px,20px,center,0px,#333333);
  }
}
.ant-pagination{
  text-align: center;
}
</style>


