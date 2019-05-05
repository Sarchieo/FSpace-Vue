<template>
  <a-modal title="用户服务协议" cancelText="取消" okText="同意" v-model="isService" width="1190px" @cancel="handleCancelService">
     <div class="service-box">
         <h2>用户服务协议</h2>
     </div>
  </a-modal>
</template>
<script>
export default {
  name: "f-space-service",
  props: ["isService"],
  data() {
    return {
   
    };
  },
  mounted() {
  },
  methods: {
     handleCancelService() {
      this.$emit("handleCancelService");
    }
  }
};
</script>
<style scoped lang="less">
.service-box{
    height: 600px;
    overflow: auto;
}
h2{
    text-align: center;
}
</style>

