<template>
  <div>
      <p>app操作流程页面</p>
  </div>
</template>
<script>
import * as types from '../../../store/mutation-types'
export default {
  computed: {
    storeInfo() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
     
    };
  },
  mounted() {
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
</style>


