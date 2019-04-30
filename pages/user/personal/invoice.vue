<template>
   <div>
     <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="普通发票" key="1" forceRender>
          <f-space-form-invoice :vat="false" :values="invoice" @handleSuccess='handleSuccess'></f-space-form-invoice>
        </a-tab-pane>
        <a-tab-pane tab="增值税专用发票" key="2" forceRender>
          <f-space-form-invoice :vat="true"  :values="invoice" @handleSuccess='handleSuccess'></f-space-form-invoice>
        </a-tab-pane>
      </a-tabs>
   </div>
</template>
<script>
import FSpaceFormInvoice from '../../../components/fspace-ui/form/invoice';
import * as types from '../../../store/mutation-types'
export default {
  components: {
    FSpaceFormInvoice
  },
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data () {
    return {
      invoice: {
        taxpayer: '',
        tel: '',
        bankers: '',
        account: ''
      },
      activeKey: '1'
    };
  },
  mounted() {
    this.getInvoice()
    this.$store.commit(types.SELECTED_KEYS, '/user/personal/invoice')
  },
  methods: {
    getInvoice(){
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "MyInvoiceModule";
      iRequest.method = "getInvoice";
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        this,
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if(result.code === 200) {
              _this.invoice = result.data[0]
            }else {
             
            }
          }
        )
      );
    },
    handleSuccess(data) {
      this.invoice = data
    }
  }
}
</script>
