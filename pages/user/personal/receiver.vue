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
     <p>已保存 <span>4</span>条收货人信息，最多保存 <span>5</span>条</p>
   </div>
</template>
<script>
export default {
   data () {
    return {
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
  .button-size(150px,40px,40px,14px,0px,5px);
  .button-color(1px solid transparent,#ed3025,#ffffff);
}
.ant-form{
  margin-bottom: 80px;
}
</style>





