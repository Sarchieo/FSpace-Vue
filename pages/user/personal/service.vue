<template>
  <div>
    <p class="service-title">售后记录</p>
    <p class="search-text">
      <span>售后类型：</span>
      <a-select defaultValue="1" style="width: 200px" @change="handleChange">
        <a-select-option value="1">全部</a-select-option>
        <a-select-option value="2">退货</a-select-option>
        <a-select-option value="3">换货</a-select-option>
      </a-select>
      <button class="search-btn">搜索</button>
      <input type="text" placeholder="请输入订单号/商品名称搜索" class="search-input">
    </p>

    <ul class="service-ul">
      <li>
        <p class="list-title">
          售后类型：
          <span>退货</span>申请单号：
          <span>12342342424569097</span>申请时间：
          <span>2019-04-25 14:08:10</span>
        </p>
        <div class="service-box">
          <div class="pic-box">
            <img
            v-lazy="'//img.alicdn.com/imgextra/i3/3570503317/O1CN011aNEDjGTe94g6ig_!!3570503317.jpg_80x80.jpg'"
              class="service-pic"
              alt
            >
            <p class="name">盘龙云海排毒胶囊</p>
            <p class="guige">20粒/盒</p>
          </div>
          
        </div> 
        <div class="complete">
            正在退货中
            <!-- 退款有？ -->
            <!-- <p class="price" v-if="items.price">完成退款：￥{{items.price}}</p> -->
        </div>
        <div class="see-detail" @click="seeDetail()">
           查看详情
        </div>
         <div style="clear: both;"></div>
      </li>
    </ul>
  </div>
</template>
<script>
import * as types from '../../../store/mutation-types'
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.$store.commit(types.SELECTED_KEYS, '/user/personal/service')
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    seeDetail() {
      this.$router.push({
        path: '/order/reason-detail',
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.service-title {
  .p-size(60px, 60px, 24px, left, 20px, #333333);
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
    border-bottom: 1px solid #f2f2f2;
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
  display: inline-block;
  width: 232px;
  text-align: center;
 margin-top: 55px;
  .states {
    .container-size(inline-block, 235px, 30px, 0, 0px);
    // .position(absolute, 55px, 0px);
    text-align: center;
  }
  .price {
    .container-size(inline-block, 235px, 30px, 0, 0px);
    .position(absolute, 80px, 0px);
    text-align: center;
  }
}

.see-detail {
  display: inline-block;
  width: 232px;
  margin-top: 55px;
  text-align: center;
}
</style>


