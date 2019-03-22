<template>
   <div>
      <p class="consignee">新增收货人</p>
     <a-form
        class="consignee-form"
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
              'note',
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
              'branch',
              {rules: [{ required: true, message: '请填写收货人电话' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 12, offset: 8 }"
        >
          <a-button
          class="submit-btn"
            html-type="submit"
          >
            添加
          </a-button>
        </a-form-item>
     </a-form>
     <p class="person-count">已保存 <span>4</span> 条收货人信息，最多保存 <span>5</span> 条</p>
     <a-table :columns="columns" :dataSource="data" :pagination="false" :bordered="true" style="width: 965px;margin-bottom: 100px;">
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="customTitle"> 收货人姓名</span>
        <span slot="tags" slot-scope="tags">
          <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;">修改</a>
          <a-divider type="vertical" />
          <a href="javascript:;">删除</a>
          <a-divider type="vertical" />
          <a href="javascript:;" class="ant-dropdown-link">
            设为默认收货人
          </a>
        </span>
      </a-table>
      <div class="address-box">
        <p class="my-address">我的收货地址</p>
        <p class="store-info">收货门店：宁乡市汤惟丰沃达老百姓健康药房</p>
        <p class="store-info">门店地址：湖南省宁乡市玉潭街道合安社区兆基君城A区22栋112号</p>
      </div>
   </div>
</template>
<script>
const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' },
}, {
  title: '收货人电话',
  dataIndex: 'phone',
  key: 'phone',
},{
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [{
  key: '1',
  name: '惠哥',
  phone: 18373270790,
}, {
  key: '2',
  name: '亮叔',
  phone: 15116166746,
}, {
  key: '3',
  name: '大表哥',
  phone: 15773146800,
},
{
  key: '4',
  name: '表哥',
  phone: 18373380987,
}];
export default {
   data () {
    return {
      data,
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
  methods: {
     callback (key) {
      console.log(key)
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
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
  .p-size(40px,40px,14px,left,0px,#333333);
  span{
    color: #ed3025;
  }
}
.address-box {
  width:965px;
  height: 200px;
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
</style>





