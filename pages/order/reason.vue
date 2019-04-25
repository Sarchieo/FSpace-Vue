<template>
  <div>
     <a-layout>
      <f-space-header type="home"></f-space-header>
      <a-layout-content>
          <div>
             <div class="step-right">
                <a-steps class="setps-box" :current="steps">
                    <a-step title="买家申请换货" >
                    
                    </a-step>
                    <a-step title="卖家处理换货">
                    
                    </a-step>
                    <a-step title="换货完成">
                    
                    </a-step>
                </a-steps>
             </div>
             <div class="reason-box">
                 <p class="title">退货原因</p>
                 
                 <div class="reason-content">
                     <div class="reason-left">
                         <img src="//img.alicdn.com/imgextra/i3/TB1uSnvNFXXXXb8aXXXXXXXXXXX_!!0-item_pic.jpg_160x160q90.jpg"/>
                         <p>汇仁牌肾宝片 200片/瓶</p>
                         <p>￥ 38</p>
                     </div>
                     <div class="reason-right">
                        <a-form-item
                        label="Note"
                        :label-col="{ span: 2 }"
                        :wrapper-col="{ span: 12 }"
                        >
                            <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
                                <a-select-option value="1">材质问题</a-select-option>
                                <a-select-option value="2">1</a-select-option>
                                <a-select-option value="3">2</a-select-option>
                                <a-select-option value="4">3</a-select-option>
                                <a-select-option value="5">4</a-select-option>
                                <a-select-option value="6">5</a-select-option>
                                <a-select-option value="7">6</a-select-option>
                                <a-select-option value="8">7</a-select-option>
                                <a-select-option value="9">8</a-select-option>
                                <a-select-option value="10">9</a-select-option>
                            </a-select>
                        </a-form-item>
                          <a-form-item
                        label="原因描述"
                        :label-col="{ span: 2 }"
                        :wrapper-col="{ span: 12 }"
                        >
                            <a-textarea placeholder="请描述您申请售后" :rows="5" v-model="content" class="evaluate-text" maxlength="300"/>
                            <span class="float-right">/300</span>
                        </a-form-item>
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
  data() {
    return {
        steps:0,
        content: ''
    };
  },
  mounted() {
  },
  methods: {
   
  }
};
</script>
<style lang="less" scoped>
@import "../../components/fspace-ui/container/index.less";
@import "../../components/fspace-ui/button/index.less";
  #components-layout-demo-basic .ant-layout-footer {
  /* background: deeppink; */
  color: #ffffff;
}
.ant-layout-content{
  background: #ffffff;
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
  .step-right {
    .container-size(block, 879px, 75px, 0 auto, 0px);
    margin-top: 40px;
    padding: 0px 20px;
    .setps-box {
    //   .position(relative, -120px, 0px);
    }
  }
  .reason-box{
      .container-size(block, 1190px, 550px, 0 auto, 0px);
      margin-bottom: 20px;
  }
  .title{
      .p-size(50px, 50px, 18px, left, 20px, #333333);
      background: #f2f2f2;
  }
  .reason-content{
      .container-size(inline-block, 1190px, 405px, 0, 0px);
      border: 1px solid #f2f2f2;
      .reason-left{
           .container-size(inline-block, 200px, 260px, 30px 0px 0px 30px, 0px);
          float: left;
        //   background: black;
          img{
              width: 180px;
              height: 180px;
              margin-bottom: 10px;
          }
          p{
             .p-size(30px, 30px, 13px, left, 0px, #333333);
          }
      }
      .reason-right{
           .container-size(inline-block, 900px, 350px, 30px 0px 0px 30px, 0px);
          float: right;
          border: 1px solid #e0e0e0;
      }
  }
  .ant-input{
      border-rudius: 0px!important;
  }
</style>