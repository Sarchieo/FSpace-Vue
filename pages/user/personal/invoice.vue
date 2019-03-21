<template>
   <div>
     <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="普通发票" key="1" forceRender>
            <a-form
              :form="form"
              @submit="handleSubmit"
            >
            <p class="comp-name-address"><span>公司名称：</span>长沙市中联健康大药房</p>
            <p class="comp-name-address"><span>公司注册地址：</span>湖南省长沙市雨花区圭塘中路112号</p>
            <a-form-item
                label="纳税人识别号："
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-input
                placeholder="纳税人识别号或社会信用代码"
                  v-decorator="[
                    'note',
                    {rules: [{ required: true, message: '请填写纳税人识别号' }]}
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
                    'branch',
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
                    'person',
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
        </a-tab-pane>
        <a-tab-pane tab="增值税专用发票" key="2">
          <a-form
              :form="form"
              @submit="handleSubmit"
            >
            <p class="comp-name-address"><span>公司名称：</span>长沙市中联健康大药房</p>
            <p class="comp-name-address"><span>公司注册地址：</span>湖南省长沙市雨花区圭塘中路112号</p>
              <a-form-item
                label="纳税人识别号："
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-input
                  placeholder="纳税人识别号或社会信用代码"
                  v-decorator="[
                    'code',
                    {rules: [{ required: true, message: '请填写纳税人识别号' }]}
                  ]"
                />
              </a-form-item>
               <a-form-item
                label="注册电话："
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-input
                 placeholder="专票要求的公司电话"
                  v-decorator="[
                    'phone',
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
                    'branchs',
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
                    'bandnum',
                    {rules: [{ required: true, message: '请填写银行账号' }]}
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
        </a-tab-pane>
      </a-tabs>
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
   .ant-input{
     border: 1px solid #e0e0e0;
     border-radius: 0px!important;
   }
   .comp-name-address {
     .p-size(60px,60px,14px,left,0px,#333333);
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


