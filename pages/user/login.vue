<template>
  <div>
    <a-layout>
      <f-space-header type='login'></f-space-header>
      <a-button type="primary" @click='submitFrom'>点我登录</a-button>
      <f-space-footer></f-space-footer>
    </a-layout>
  </div>
</template>
<script>
import FSpaceHeader from "../../components/fspace-ui/header/header";
import FSpaceFooter from '../../components/fspace-ui/footer';
export default {
  components: {
    FSpaceHeader,
    FSpaceFooter
  },
  mounted() {
    this.submitFrom
  },
  methods: {
    submitFrom() {
      this.$store.dispatch('login').then((res) => {
        // 保存用户信息
        this.$store.commit('SET_USER', 1)
      }).catch((err) => {
        console.log('登录失败')
      })
    }
  }
}
</script>
<style>
* {
  margin: 0;
}
</style>