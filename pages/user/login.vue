<template>
   <a-button type="primary" @click='submitFrom'>点我登录</a-button>
</template>
<script>
export default {
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

</style>