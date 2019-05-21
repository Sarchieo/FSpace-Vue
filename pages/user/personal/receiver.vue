<template>
   <div>
     <!-- 收货人编辑 -->
    <a-modal
      title="收货人编辑"
      v-model="visible"
      :footer= "null"
    >
     <a-form
        :form="form"
        @submit="handleSubmit"
      >
       <a-form-item
          label="收货人姓名："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'contactname',
              {rules: [{ required: true, message: '请填写收货人姓名' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="收货人电话："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'contactphone',
              {rules: [{ required: true, validator: validatePhone}]}
            ]"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 12, offset: 8 }"
        >
        </a-form-item>
        <a-button
          type="primary"
          html-type="submit">
          保存
        </a-button>
     </a-form>
    </a-modal>
      <div class="address-box">
        <p class="my-address">默认收货地址</p>
        <p class="store-info">收货门店：{{ storeInfo.comp.storeName }}</p>
        <p class="store-info">门店地址：{{ storeInfo.comp.addressCodeStr  }} {{ storeInfo.comp.address }}</p>
      </div>
      <!-- <p class="consignee">新增收货人</p> -->
     <a-button type="primary" @click='addReceiver' class="add-person">新增收货人</a-button>
     <a-table :columns="columns" :dataSource="data" :pagination="false" :bordered="true" rowKey="shipid" style="display: block;width: 935px;margin: 0 auto;margin-bottom: 100px;">
        <span slot="action" slot-scope="record">
          <a href="javascript:;" @click='updConsignee(record)'>修改</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click='delConsignee(record)'>删除</a>
          <a-divider type="vertical" />
          <a v-if='!(record.cstatus & 2) > 0' href="javascript:;" class="ant-dropdown-link" @click='setDefault(record)'>
            设为默认收货人
          </a>
          <a v-else href="javascript:;" class="ant-dropdown-link">
            默认收货人
          </a>
        </span>
      </a-table>
      <p class="person-count">已保存 <span>{{ data.length|| 0 }}</span> 条收货人信息，最多保存 <span>5</span> 条</p>
   </div>
</template>
<script>
import * as types from '../../../store/mutation-types'
const columns = [{
  title: '收货人电话',
  dataIndex: 'contactname',
  key: 'contactname',
  dataIndex: 'contactname',
}, {
  title: '收货人电话',
  dataIndex: 'contactphone',
  key: 'contactphone',
},{
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

export default {
   data () {
    return {
      shipid: 0,
      visible: false,
      data: [],
      columns,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.queryMyConsignee()
    this.$store.commit(types.SELECTED_KEYS, '/user/personal/receiver')
  },
  methods: {
    queryMyConsignee() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyDrugStoreInfoModule";
      iRequest.method = "queryMyConsignee";
      iRequest.param.json = JSON.stringify({
        compid: _this.storeInfo.comp.storeId
      })
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if(result.code == 200) {
              if(result.data) {
                _this.data = result.data
              }
            }else {
             ;
            }
          }
        )
      );
    },
    //设为默认
    setDefault(record) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyDrugStoreInfoModule";
      iRequest.method = "setDefault";
      iRequest.param.json = JSON.stringify({
        compid: _this.storeInfo.comp.storeId,
        shipid: record.shipid
      })
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            console.log(result)
            if(result.code == 200) {
              _this.$message.success(result.message)
              _this.queryMyConsignee()
            }else {

            }
          }
        )
      );
    },
    updConsignee(record) {
      this.shipid = record.shipid
      this.visible = true
      setTimeout(() => {
        this.form.setFieldsValue(record)
      }, 500)
    },
    // 删除
    delConsignee(record) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyDrugStoreInfoModule";
      iRequest.method = "delConsignee";
      iRequest.param.json = JSON.stringify({
        shipid: record.shipid
      })
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if(result.code == 200) {
              _this.$message.success(result.message)
              _this.queryMyConsignee()
            }else {

            }
          }
        )
      );
    },
    addReceiver() {
      this.shipid = 0
      this.visible = true
    },
    callback (key) {
      console.log(key)
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let _this = this;
          let iRequest = new inf.IRequest();
          iRequest.cls = "MyDrugStoreInfoModule";
          iRequest.method = "insertOrUpdConsignee";
          iRequest.param.json = JSON.stringify({
            compid: _this.storeInfo.comp.storeId,
            contactname: values.contactname,
            contactphone: values.contactphone,
            shipid: this.shipid
          })
          
          iRequest.param.token = localStorage.getItem("identification")
          this.$refcallback(
            this,
            "userServer",
            iRequest,
            new this.$iceCallback(
              function result(result) {
                if(result.code == 200) {
                  _this.visible = false
                  _this.queryMyConsignee()
                  _this.$message.success(result.message)
                }
              }
            )
          );
        }
      });
    },
    validatePhone(rule, value, callback) {
      let _this = this;
      const form = this.form;
      if (value && /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value)) {
        callback()
      } else {
        this.sendAuthCode = false
        callback('收货人手机号码有误');
      }
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.consignee {
  .p-size(55px,55px,20px,left,20px,#999999);
  margin-bottom: 40px;
  background: #F0F0F0;
}
.ant-input{
  border: 1px solid #e0e0e0;
  border-radius: 0px!important;
}
.submit-btn {
  .button-size(150px,40px,40px,16px,0px,5px);
  .button-color(1px solid transparent,#ed3025,#ffffff);
}
.ant-form{
  margin-bottom: 80px;
}
.person-count {
  .p-size(40px,40px,14px,left,22px,#333333);
  margin-top: 10px;
  span{
    color: #ed3025;
  }
}
.address-box {
  display: block;
  width:935px;
  height: 200px;
  margin: 20px auto;
  border: 1px solid #e0e0e0;
}
.my-address {
  .p-size(55px,55px,20px,left,20px,#333333);
  margin-bottom: 35px;
  background: #e0e0e0;
}
.store-info {
  .p-size(40px,40px,16px,left,50px,#333333);
}
.add-person{
  .button-size( 90px,36px,36px,14px,0px,3px);
  margin-left: 24px;
  margin-bottom: 20px;
}
</style>





