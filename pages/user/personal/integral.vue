<template>
  <div>
    <p class="integral-title">
      可用积分:
      <span>1245分</span>
      过期积分: 661分
      <button>积分规则</button>
    </p>
    <p class="integral-detail">积分明细</p>

    <a-table :columns="columns" :dataSource="data" bordered>
      <template slot="name" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "日期",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "来源",
    className: "column-money",
    dataIndex: "money"
  },
  {
    title: "积分",
    dataIndex: "address"
  }
];

const data = [
  {
    key: "1",
    name: "2019-01-23",
    money: "消费（订单号：53813384427）",
    address: "555分"
  },
  {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "556分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "551分"
  },
   {
    key: "2",
    name: "2019-01-23",
    money: "消费（订单号：57813383457）",
    address:  "558分"
  },
  {
    key: "3",
    name: "2019-01-24",
    money: "消费（订单号：5123584428）",
    address:  "557分"
  }
];

export default {
  data() {
    return {
      data,
      columns
    };
  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.integral-title {
  .p-size(100px, 100px, 18px, left, 20px, #999999);
  span {
    margin-right: 30px;
    color: #ed3025;
  }
  button {
    float: right;
    margin: 32px 20px 20px 0px;
    .button-size(100px, 32px, 32px, 14px, 0px, 3px);
    .button-color(1px solid transparent, #999999, #666666);
  }
}
.integral-detail {
  .p-size(50px, 50px, 18px, left, 20px, #999999);
  background: #f0f0f0;
}
td {
    text-align: center!important;
}
</style>