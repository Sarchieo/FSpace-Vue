<template>
   <a-form>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      v-bind="formItemLayout"
      label="发票类型"
      has-feedback
    >
      <a-select
        v-decorator="[
          'select',
          {rules: [{ required: true, message: 'Please select your country!' }]}
        ]"
        placeholder="Please select a country"
      >
        <a-select-option value="china">
          增值税专用发票
        </a-select-option>
        <a-select-option value="usa">
          不开发票
        </a-select-option>
        <a-select-option value="usa">
          普通发票
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="纳税人识别号:"
      validate-status="warning"
    >
      <a-input
        id="warning"
        placeholder="Warning"
      />
    </a-form-item>

    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="公司名称:"
      has-feedback
      validate-status="validating"
      help="The information is being validated..."
    >
      <a-input
        id="validating"
        placeholder="I'm the content is being validated"
      />
    </a-form-item>

    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="公司地址:"
      has-feedback
      validate-status="success"
    >
      <a-input
        id="success"
        placeholder="I'm the content"
      />
    </a-form-item>

    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="电话:"
      has-feedback
      validate-status="warning"
    >
      <a-input
        id="warning"
        placeholder="Warning"
      />
    </a-form-item>

    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="开户银行:"
      has-feedback
      validate-status="error"
      help="Should be combination of numbers & alphabets"
    >
      <a-input
        id="error"
        placeholder="unavailable choice"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Success"
      has-feedback
      validate-status="success"
    >
      <a-date-picker style="width: 100%" />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="银行账号:"
      has-feedback
      validate-status="warning"
    >
      <a-time-picker style="width: 100%" />
    </a-form-item>
  </a-form>
</template>
<script>
export default {
   data () {
    return {
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
}
</script>
<style>

</style>


