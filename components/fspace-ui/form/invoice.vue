<template>
  <div>
     <a-form
    :form="form"
    @submit="handleSubmit"
    >
    <p class="comp-name-address"><span>公司名称：</span>{{ storeInfo.comp.storeName }}</p>
    <p class="comp-name-address"><span>公司注册地址：</span>{{ storeInfo.comp.address }}</p>
    <a-form-item
        label="纳税人识别号："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
        placeholder="纳税人识别号或社会信用代码"
          v-decorator="[
            'taxpayer',
            {rules: [{ required: true, validator: validateTaxID}]}
          ]"
        />
      </a-form-item>
      <a-form-item
        v-show= 'vat'
        label="注册电话："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          placeholder="专票要求的公司电话"
          v-decorator="[
            'tel',
            {rules: [{ required: true, message: '请填写注册电话' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="开户银行："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          placeholder="xx银行xx支行"
          v-decorator="[
            'bankers',
            {rules: [{ required: true, message: '请填写开户银行' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="银行账号："
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          placeholder="开户许可证或法人的私人账户"
          v-decorator="[
            'account',
            {rules: [{ required: true, message: '请填写银行账号：' }]}
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
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  name: "f-space-form-invoice",
  props: ['vat', 'values'],
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    validateTaxID(rule, value, callback) {
      const form = this.form;
      if (value && value.length === 15 || value.length === 18 || value.length === 20) {
        callback();
      } else {
        callback("请输入正确的纳税人识别号");
      }
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let _this = this;
          let iRequest = new inf.IRequest();
          iRequest.cls = "MyInvoiceModule";
          iRequest.method = "saveInvoice";
          iRequest.param.json = JSON.stringify({
            taxpayer: values.taxpayer,
            bankers: values.bankers,
            account: values.account,
            tel: values.tel
          })
          iRequest.param.token = localStorage.getItem("identification")
          this.$refcallback(
            "userServer",
            iRequest,
            new this.$iceCallback(
              function result(result) {
                if(result.code === 200) {
                  _this.$message.success(result.message)
                  _this.$emit('handleSuccess', values)
                }else {
                  _this.$message.error(result.message)
                }
              }
            )
          );
        }
      });
    },
  },
  watch: {
    values: {
      handler: function (newVal,oldVal){
        this.form.setFieldsValue(newVal)
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../fspace-ui/container/index.less";
@import "../../fspace-ui/button/index.less";
   .ant-input{
     border: 1px solid #e0e0e0;
     border-radius: 0px!important;
   }
   .comp-name-address {
     .p-size(50px,50px,14px,left,0px,#333333);
     span{
       .container-size(inline-block,206px,auto,0,0px);
       text-align: right;
     }
   }
   .submit-btn {
     .button-size(150px,40px,40px,14px,0px,5px);
     .button-color(1px solid transparent,#ed3025,#ffffff);
   }
</style>