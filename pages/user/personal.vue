<template>
  <div>
    <a-layout>
       <f-space-header type='home'></f-space-header>
       <a-layout-content>
         <a-breadcrumb separator=">">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>我的一块</a-breadcrumb-item>
          </a-breadcrumb>
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
  data() {
    return {
   
    }
  }
};
</script> 
<style lang="less" scoped>

</style>