<template>
  <div>
    <p class="integral-title">
      可用积分:
      <span>{{integralNumber}}分</span>
      过期积分: {{expirepointNumber}}分
      <!-- <button>积分规则</button> -->
    </p>
    <p class="integral-detail">积分明细</p>

    <a-table
      :columns="columns"
      :dataSource="data"
      bordered
      style="display: block;width: 935px;margin: 0 auto;margin-top: 25px;"
    >
      <template slot="name" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
      </template>
    </a-table>
  </div>
</template>
<script>
import * as types from "../../../store/mutation-types";
const columns = [
  {
    title: "日期",
    dataIndex: "createdate",
    key: 'createdate',
    columnWidth: '100px'
  },
  {
    title: "来源",
    dataIndex: "istatus",
    key: "istatus",
    // 如果是下单得积分，需要把订单号传进来拼到列表上去，暂未做 （字段 busid 状态码为5 busid就是订单编号）
    customRender: function(text){
      switch(text) {
         case 1: 
        text = '签到得积分'
        break;
         case 2: 
        text = '评论得积分'
        break;
         case 3: 
        text = '兑换商品消耗'
        break;
         case 4: 
        text = '兑换优惠券消耗'
        break;
         case 5: 
        text = '下单得积分'
        break;
         case 6: 
        text = '分享得积分'
        break;
         case 7: 
        text = '资料认证'
        break;
         case 8: 
        text = '下单消耗'
        break;
      }
      return text
    }
  },
  {
    title: "积分",
    dataIndex: "integral",
    key: "integral"
  }
];
export default {
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      data: [],
      columns,
      total: 0,
      integralNumber: 0, //可用积分
      expirepointNumber: 0 // 过期积分
    };
  },
  mounted() {
    this.getIntegralList();
    this.getMember();
  },
  methods: {
    // 获取积分列表
    getIntegralList() {
      
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "IntegralModule";
      iRequest.method = "myIntegralDetail";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId,
        pageNo: 1,
        pageSize: 10
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.data = result.data
            _this.total = result.total;
            console.log(result.data);
            _this.$message.success(result.message);
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    // 获取当前可用积分
    getMember() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MemberModule";
      iRequest.method = "getMember";
      iRequest.param.json = JSON.stringify({
        compid: this.storeInfo.comp.storeId
      });
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.integralNumber = result.data.balpoints;
            _this.expirepointNumber = result.data.expirepoint;
            // console.log( result.data)
            _this.$message.success(result.message);
          } else {
            _this.$message.error(result.message);
          }
        })
      );
    },
    
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
  text-align: center !important;
}
</style>