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
      <li v-for="(item,index) in serviceList" :key="index">
        <p class="list-title">
          售后类型：
          <span>{{item.type}}</span>申请单号：
          <span>{{item.num}}</span>申请时间：
          <span>{{item.year}} {{item.date}}</span>
        </p>
        <div class="service-box" v-for="(items,index) in item.list" :key="index">
          <div class="pic-box">
            <img
            v-lazy="items.img"
              class="service-pic"
              alt
            >
            <p class="name">{{items.name}}</p>
            <p class="guige">{{items.guige}}</p>
          </div>
          <div class="complete">
            <p class="states">{{items.state}}</p>
            <p class="price" v-if="items.price">完成退款：￥{{items.price}}</p>
          </div>
          <div class="see-detail">
            <p class="detail-text">{{items.text}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serviceList: [
        {
          type: "退款",
          num: "20190326001",
          year: "2019-03-26",
          date: "14:22:30",
          list: [
            {
              img:
                "//img.alicdn.com/imgextra/i3/3570503317/O1CN011aNEDjGTe94g6ig_!!3570503317.jpg_80x80.jpg",
              name: "盘龙云海排毒胶囊",
              guige: "10粒/盒",
              count: 1,
              price: 330,
              text: "查看详情",
              state: "完成退款"
            }
          ]
        },
        {
          type: "退货",
          num: "20190326001",
          year: "2019-03-26",
          date: "14:22:30",
          list: [
            {
              img:
                "//img.alicdn.com/imgextra/i3/3570503317/O1CN011aNEDjGTe94g6ig_!!3570503317.jpg_80x80.jpg",
              name: "盘龙云海排毒胶囊",
              guige: "10粒/盒",
              count: 1,
              text: "查看详情",
              state: "完成退货"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
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
  .container-size(block, 945px, 800px, 0 auto, 0px);
}
.service-ul li {
  .container-size(block, 945px, 185px, 0, 0px);
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
}
.service-box {
  .container-size(block, 945px, 140px, 0, 0px);
  .position(relative, 0px, 0px);
  .pic-box {
    .position(relative, 0px, 0px);
    .container-size(inline-block, 513px, 140px, 0, 0px);
    border-right: 1px solid #f2f2f2;
    .name {
      .container-size(inline-block, 200px, 30px, 0, 0px);
      .position(absolute, 40px, 130px);
    }
    .guige {
      .container-size(inline-block, 200px, 30px, 0, 0px);
      .position(absolute, 80px, 130px);
    }
  }
  .complete {
    .position(relative, 0px, 0px);
    .container-size(inline-block, 235px, 140px, 0, 0px);
    border-right: 1px solid #f2f2f2;
    .states {
      .container-size(inline-block, 235px, 30px, 0, 0px);
      .position(absolute, 55px, 0px);
      text-align: center;
    }
    .price {
      .container-size(inline-block, 235px, 30px, 0, 0px);
      .position(absolute, 80px, 0px);
      text-align: center;
    }
  }
  .see-detail {
    .position(relative, 0px, 0px);
    .container-size(inline-block, 180px, 140px, 0, 0px);
    .detail-text {
      .container-size(inline-block, 180px, 30px, 0, 0px);
      .position(absolute, 55px, 0px);
      text-align: center;
      color: #3189f5;
      cursor: pointer;
    }
  }
}
.service-pic {
  .position(absolute, 23px, 22px);
  width: 95px;
  height: 95px;
}
.list-title {
  .p-size(45px, 45px, 14px, left, 20px, #333333);
  background: #f2f2f2;
  span {
    margin-right: 50px;
  }
}
</style>


