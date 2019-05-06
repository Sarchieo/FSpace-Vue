<template>
  <div>
    <div class="no-data" v-if="this.informationList.length === 0">
       <p><a-icon type="exclamation"/></p>
       <p>您还没有消息！</p>
        <!-- <a-icon type="delete" @click.stop="delCollec(item.sku)"/> -->
     </div>
    <ul class="news-list-ul" v-if="this.informationList.length !== 0 ">
      <li v-for="(item,index) in informationList" :key="index">
        <img src="../../../assets/img/u49.png" alt class="news-pic">
        <div class="text-box">
          <p class="send-time">发送时间：{{item.time}}</p>
          <p class="news-text">{{item.msg}}</p>
        </div>
      </li>
      <a-pagination :total="total" v-if="this.informationList.length !== 0 " @change="onChangePage"/>
    </ul>
     
  </div>
</template>
<script>
import * as types from "../../../store/mutation-types";
export default {
  data() {
    return {
        informationList: [], // 消息列表
        total: 0,
        currentIndex: 1
    };
  },
    computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.getInformation();
    // this.$store.commit(types.SELECTED_KEYS, "/user/personal/information");
  },
  methods: {
    getInformation() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "PushMessageModule";
      iRequest.method = "queryMessage";
      iRequest.param.pageIndex = this.currentIndex;
      iRequest.param.pageNumber = 11;
      iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        this,
        "orderServer" +
          Math.floor((this.storeInfo.comp.storeId / 8192) % 65535),
        iRequest,
        new this.$iceCallback(function result(result) {
          if (result.code === 200) {
            _this.informationList = result.data;
            console.log(_this.informationList)
            _this.total = result.total
            // console.log('查询收藏成功')
          } else {
          }
        })
      );
    },
    onChangePage(pageNumber) {
      this.currentIndex = pageNumber
      this.getInformation();
    },
  }
};
</script>
<style scoped lang="less">
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.news-list-ul {
  .container-size(block, 925px, 970px, 0 auto, 0px);
  margin-bottom: 10px;
  overflow: auto;
}
.news-list-ul li {
  height: auto;
  min-height: 62px;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0px;
  
}
.news-pic {
  .container-size(inline-block, 140px, 62px, 0, 0px);
}
.text-box {
  .container-size(inline-block, 740px, auto, 0, 0px);
  margin-left: 20px;
  vertical-align: middle;
}
.send-time {
  color: #999999;
}
.news-text {
  font-size: 16px;
  color: #666666;
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
.ant-pagination {
  text-align: center;
  margin-top: 10px;
}
</style>


