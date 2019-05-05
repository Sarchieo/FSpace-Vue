<template>
  <div>
    <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
        <a-breadcrumb class="bread">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>我的一块</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>售后记录</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>售后详情</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div>
          <div class="step-box">
            <div class="step-left">
              <p class="order-num">申请单号：{{ detail.asno }}</p>
              <!-- 显示药品列表相对应的订单状态 -->
              <p class="pay-success" v-if="detail.ckstatus === -1">拒绝</p>
              <p class="pay-success" v-if="detail.ckstatus === 0">未审核</p>
              <p class="pay-success" v-if="detail.ckstatus === -2">取消售后</p>
              <!-- <p class="pay-success">补票中</p>
              <p class="pay-success">退货中</p>
               -->
               <p class="pay-success" v-if="detail.ckstatus === 1">审核通过</p>
              <!-- <p><a-button class="cancelApply" v-if="detail.ckstatus === 1">审核通过</a-button></p> -->
              <!-- <p class="pay-success">完成</p> -->
            </div>

            <div class="line"></div>
            <div class="step-right">
               <p class="speed progress">售后信息</p>
              <p class="consi-p"><span class="title">售后类型：</span><span class="content"> {{ detail.astype | asTypeFormat }}</span> <span class="title">申请时间：</span> <span class="content">{{ detail.apdata }}</span></p>
              <p class="consi-p"><span class="title">申请单号：</span><span class="content">{{ detail.asno }}</span> <span class="title">联系人：</span> <span class="content">{{ storeInfo.comp.storeName }}</span></p>
              <p class="consi-p"><span class="title">订单号：</span><span class="content">{{ detail.orderno }}</span> <span class="title">手机号：</span> <span class="content">{{ storeInfo.phone }}</span></p>
            </div>
            <!-- 订单状态 -->
            <!-- <div class="step-right">
              <a-steps class="setps-box" :current="steps">
                <a-step title="提交申请" >
                  <a-icon type="profile" slot="icon"/>
                </a-step>
                <a-step title="客服受理">
                  <a-icon type="user" slot="icon"/>
                </a-step>
                <a-step title="寄回商品">
                  <a-icon type="car" slot="icon"/>
                </a-step>
                <a-step title="平台收货">
                  <a-icon type="solution" slot="icon"/>
                </a-step>

                <a-step title="完成">
                  <a-icon type="check-square" slot="icon"/>
                </a-step>
              </a-steps>
            </div> -->
          </div>
          <!-- <div class="logistics-box-info">
              <p class="speed">退货进度</p>
              <div class="logi">
                  <a-steps direction="vertical" :current="1">
                    <a-step title="货物从深圳出发" description="" />
                    <a-step title="到清远" description="" />
                    <a-step title="到长沙" description="" />
                  </a-steps>
              </div>
          </div> -->
          <!-- <div class="consignee-info">
           
               <p class="speed progress">售后信息</p>
              <p class="consi-p"><span class="title">售后类型：</span><span class="content"> {{ detail.astype | asTypeFormat }}</span> <span class="title">申请时间：</span> <span class="content">{{ detail.apdata }}</span></p>
              <p class="consi-p"><span class="title">申请单号：</span><span class="content">{{ detail.asno }}</span> <span class="title">联系人：</span> <span class="content">{{ storeInfo.comp.storeName }}</span></p>
              <p class="consi-p"><span class="title">订单号：</span><span class="content">{{ detail.orderno }}</span> <span class="title">手机号：</span> <span class="content">{{ storeInfo.phone }}</span></p>
            
           
          </div> -->
          <p class="goods-title">
            <span class="width40 float-left">药品信息</span>
            <!-- <span class="width15 float-left">单价</span> -->
            <span class="width45 float-left">数量</span>
            <!-- <span class="width15 float-left">实付</span> -->
            <span class="width15 float-right">退款金额</span>
          </p>
          <div class="goods-list-box">
            <table>
              <thead class="ablock">
                <p>
                  <a-icon type="shop"/>
                  <span>一块医药</span>
                </p>
              </thead>
              <tbody class="t-body">
                <tr class="goods-list">
                  <td class="pic-box">
                    <div>
                      <img
                        v-lazy="imgUrl"
                        alt
                      >
                    <span class="goods-name">{{ detail.prodname }}</span>
                      <span>{{ detail.spec }}</span>
                      <span>{{ detail.manuname }}</span>
                    </div>
                  </td>
                  <!-- <td class="count td-center">单价</td> -->
                  <td class="count td-center" style="width: 380px;">{{detail.asnum}}</td>
                  <!-- <td class="count td-center">￥{{ detail.refamt }}</td> -->
                  <!-- <td class="subtotal widths15 td-center padding-left10">￥100</td> -->
                </tr>
            
                <div class="total td-center padding-left15">￥{{ detail.refamt }}</div>
              </tbody>
              <tfoot class="t-footer" ref="foot">
                <p class="ant-dropdown-link"> 申请售后原因 </p>
                <p class="dropdown-p">原因：{{ detail.reasonName }}</p>
                <p class="dropdown-p">描述：{{ detail.apdesc }}</p>
                <p class="dropdown-p">图片：</p>
                <div>
                    <img v-for="(item, index) in fileList" :key="index" :src="item.url" class="reason-pic">
                    <!-- <img src="//img.alicdn.com/imgextra/i3/TB1uSnvNFXXXXb8aXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg" alt="" class="question-pic">
                    <img src="//img.alicdn.com/imgextra/i3/TB1uSnvNFXXXXb8aXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg" alt="" class="question-pic"> -->
                </div>
              </tfoot>
            </table>
          </div>
        </div>
      </a-layout-content>
      <f-space-footer></f-space-footer>
    </a-layout>

    <a-modal title="提示" v-model="visible" @ok="hideModal" okText="提交" cancelText="再想想">
      <p>订单取消成功后将无法恢复</p>
      <p>优惠券可能不再返还，支付优惠也将一并取消</p>
      <div>
        <a-radio-group defaultValue="a" size="large">
          <a-radio-button value="a" class="cancel-reason" defaultValue>订单不能按预计时间送达</a-radio-button>
          <a-radio-button value="b" class="cancel-reason">操作有误(药品选错)</a-radio-button>
          <a-radio-button value="c" class="cancel-reason">重复下单/误下单</a-radio-button>
          <a-radio-button value="d" class="cancel-reason">其它渠道价格更低</a-radio-button>
          <a-radio-button value="e" class="cancel-reason">该商品降价了</a-radio-button>
          <a-radio-button value="f" class="cancel-reason">不想买了</a-radio-button>
        </a-radio-group>
      </div>
    </a-modal>
  </div>
</template>
<script>
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceFooter from "../../components/fspace-ui/footer";
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  filters: {
   asTypeFormat(val) {
     let text = ''
     switch(val) {
       case 0:
       text = '退款退货'
       break
       case 1:
       text = '仅退款'
       break
       case 2:
       text = '开发票'
       break
       case 3:
       text = '物流跟踪'
       break
     }
    return text;
   }
  },
  data() {
    return {
      arr: ['','','','','','','','','','',''],
      steps: 0,
      visible: false,
      detail: '',
      imgUrl: '',
      fileList: []
    };
  },
  mounted() {
    this.detail = JSON.parse(this.$route.query.detail)
    console.log(this.detail)
    this.getImgUrl()
    this.getFilePathPrev()
  },  
  methods: {
     // 获取售后图片
    getFilePathPrev() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.json = JSON.stringify({
        orderid: this.detail.orderno,
        compid: this.storeInfo.comp.storeId
      });
       this.$refcallback(
         this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.uploadInfo = result.data;
               // 获取默认图片
              var path = result.data.ergodicUrl;
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  var data = xhr.responseText;
                  data = JSON.parse(data).data.sort();
                  if (data.length > 0) {
                    _this.fileList.push({
                      uid: 0,
                      name: data[3],
                      status: "done",
                      url:
                        result.data.downPrev +
                        result.data.orderFilePath +
                        data[3] +
                        "?" +
                        new Date().getSeconds()
                    });
                  }
                }
              };
              xhr.open("POST", path, true);
              xhr.setRequestHeader("specify-path", result.data.orderFilePath);
              xhr.setRequestHeader("ergodic-sub", "false");
              xhr.send(null);
            } else {
              _this.$message.error("文件地址获取失败, 请稍后重试");
            }
          },
          function error(error) {
            ;
          }
        )
      );
    },
    // 获取商品图片
    getImgUrl() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "FileInfoModule";
      iRequest.method = "fileServerInfo";
      iRequest.param.json = JSON.stringify({
        list: [
          {
            sku: this.detail.pdno,
            spu: this.detail.spu
          }
        ]
      });
      this.$refcallback(
        this,
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.imgUrl =
                result.data.downPrev +
                result.data.goodsFilePathList +
                "/" +
                _this.detail.pdno +
                ".jpg" +
                "?" +
                new Date().getSeconds();
            } else {
              _this.$message.error("文件地址获取失败, 请稍后重试");
            }
          },
          function error(error) {}
        )
      );
    },
    // 取消订单
    hideModal() {
      console.log(12121)
    },
    showFoot(key) {
        
        var foot = this.$refs['foot']
        console.log(foot)
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
.ant-layout-content {
  background: #ffffff;
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
  background: #ffffff;
  /* min-height: 1000px; */
  color: #000000;
}
#components-layout-demo-basic > .ant-layout {
  /* margin-bottom: 48px; */
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.count{
  width: 175px;
}
.address {
  height: auto !important;
  line-height: 40px !important;
  .address-goods {
    width: 270px !important;
    height: auto;
    min-height: 40px;
    line-height: 40px;
    text-align: left;
    text-indent: 0px !important;
    vertical-align: top;
  }
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.cancel-reason {
  width: 220px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.float-left{
  float: left;
}
.widths40 {
  width: 44%;
}
.widths15 {
  width: 18%;
}

.width40 {
  width: 40%;
}
.width15 {
  width: 15%;
}
.width45{
  width: 32%;
}
.height220 {
  height: 220px !important;
}
.line {
  .container-size(inline-block, 1px, 170px, 0 auto, 0px);
  border-right: 1px solid #e0e0e0;
  margin-bottom: 15px;
  margin-top: 20px;
}
.bread {
  .container-size(block, 1190px, 50px, 0 auto, 0px);
  line-height: 50px;
  background: #ffffff;
}
.step-box {
  .container-size(block, 1190px, 220px, 0 auto, 0px);
  border-top: 3px solid #ed3025;
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  .step-left {
    float: left;
    .container-size(inline-block, 300px, 220px, 0 auto, 0px);
    .order-num {
      color: #999999;
    }
    .pay-success {
      font-size: 18px;
      color: #ed3025;
      font-weight: bold;
    }
    p {
      .p-size(46px, 46px, 16px, center, 0px, #666666);
    }
    .cancel {
      position: relative;
      bottom: -40px;
      left: 0px;
    }
    .cancel:hover {
      cursor: pointer;
    }
    .pay-btn {
      .p-size(36px, 36px, 16px, center, 0px, #ffffff);
      button {
        .button-size(100px, 36px, 36px, 14px, 0px, 5px);
        background: #ed3025;
        border: none;
      }
    }
  }
  .step-right {
    float: right;
    .container-size(inline-block, 879px, 220px, 0 auto, 0px);
    padding: 0px 65px;
    .setps-box {
      margin-top: 90px;
    }
  }
}
.logistics-box-info {
  .container-size(block, 1190px, 260px, 0 auto, 0px);
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  .logistics-left {
    float: left;
    .container-size(inline-block, 300px, 260px, 0 auto, 0px);
    padding-top: 30px;
    p {
      .p-size(55px, 55px, 16px, center, 0px, #666666);
    }
  }
  .logistics-right {
    .position(relative, -40px, 0px);
    .container-size(inline-block, 879px, 200px, 0 auto, 0px);
    overflow: auto;
    padding: 15px 15px;
  }
}
.consignee-info {
  .container-size(block, 1190px, 230px, 0 auto, 0px);
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  .consignee-left,
  .consignee-middle,
  .consignee-right {
    .container-size(inline-block, 389px, 255px, 0 auto, 0px);
    padding-top: 20px;
    h3 {
      .p-size(40px, 40px, 16px, center, 0px, #666666);
      font-weight: bold;
    }
    p {
      .p-size(40px, 40px, 16px, left, 20px, #999999);
      span {
        display: inline-block;
        width: 120px;
      }
      .three {
        width: 85px !important;
      }
    }
  }
  .consignee-middle {
    margin-left: 10px;
  }
}
.goods-title {
  display: block;
  width: 1190px;
  margin: 0 auto;
  .p-size(55px, 55px, 18px, left, 0px, #666666);
  background: #eeeeee;
  margin-bottom: 10px;
  span {
    display: inline-block;
    height: 55px;
    text-align: center;
  }
}
.goods-list-box {
  .container-size(block, 1190px, auto, 0 auto, 0px);
  min-height: 380px;
  margin-bottom: 15px;
  border: 1px solid #eeeeee;
  table {
    .container-size(block, 1190px, auto, 0 auto, 0px);
    .ablock {
      display: block;
      width: 1190px;
      .p-size(50px, 50px, 16px, left, 20px, #333333);
      border-bottom: 1px solid #eeeeee;
      i {
        margin-right: 10px;
        font-size: 18px;
      }
    }
    .t-body {
      .container-size(block, 1190px, auto, 0 auto, 0px);
      min-height: 120px;
      .goods-list {
        .container-size(inline-block, 1012px, 120px, 0 auto, 0px);
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        .td-center {
          text-align: center;
          line-height: 120px;
        }
        .padding-left10 {
          padding-left: 8px;
        }
        .padding-left15 {
          padding-left: 15px;
        }
        .padding-left5 {
          padding-left: 24px;
        }
        .subtotal {
          color: #ed3025;
        }

        td {
          display: inline-block;
          height: 100%;
        }
        .pic-box {
          display: table;
          float: left;
          width: 476px;
          div {
            display: table-cell;
            width: 452px!important;
            vertical-align: middle;
            height: 100%;
            padding-left: 20px;
            img {
              float: left;
              width: 75px;
              height: 75px;
            }
            span {
              display: inline-block;
              width: 77%;
              margin-left: 10px;
              margin-top: 3px;
            }
          }
        }
        .price {
          float: left;
        }
      }
      .total {
        float: right;
        width: 178px;
        height: 100%;
        text-align: center;
        padding-top: 48px;
        min-height: 120px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: bold;
        color: #ed3025;
      }
    }
    .t-footer {
      .container-size(block, 1190px, 265px, 0 auto, 0px);
      padding-left: 20px;
      .pay-title {
        .container-size(inline-block, 992px, 210px, 0 auto, 0px);
        float: left;
        padding: 20px 0px;
        p {
          .p-size(40px, 40px, 16px, right, 20px, #333333);
        }
        .red-size {
          color: #ed3025;
        }
      }
      .pay-count {
        .container-size(inline-block, 190px, 210px, 0 auto, 0px);
        float: right;
        background: #f2f2f2;
        padding: 20px 0px;
        p {
          .p-size(40px, 40px, 16px, center, 0px, #333333);
        }
        .total-red {
          font-size: 24px !important;
          color: #ed3025 !important;
        }
      }
    }
  }
}
.cancelApply{
   .button-size(120px,38px,38px,14px,0px,3px);
   .button-color(1px solid #999999,#f2f2f2,#333333);
}
.logi{
    .container-size(block, 700px, 210px, 0 auto, 0px);
}
.speed{
    .p-size(40px, 40px, 16px, left, 245px, #333333);
    margin-top: 15px;
    font-weight: bold;
}
.progress{
    text-indent: 0!important;
}
.consi-p{
    .p-size(40px, 40px, 16px, left, 0px, #333333);
    .title{
        display: inline-block;
        width: 90px;
        text-align: left;
    }
    .content{
        display: inline-block;
        width: 250px;
        text-align: left;
    }
}
.ant-dropdown-link{
    .p-size(40px, 40px, 16px, left, 0px, #333333);
}
.question-pic{
    display: inline-block;
    width: 75px;
    height: 75px;
}
.dropdown-p{
     .p-size(40px, 40px, 16px, left, 0px, #333333);
}
.reason-pic{
  display: inline-block;
  width: 100px;
  height: 100px;
}
</style>
