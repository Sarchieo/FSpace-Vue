<template>
  <div>
      <ul class="news-list-ul">
          <li>
              <img src="../../../assets/img/u49.png" alt="" class="news-pic">
              <div class="text-box">
                  <p class="send-time">发送时间：2019-03-20</p>
                  <p class="news-text">你提交的认证申请未通过，原因：您的营业执照照片不清晰你提交的认证申请未通过，
                  </p>
              </div>
            
          </li>
      </ul>
  </div>
</template>
<script>
import * as types from '../../../store/mutation-types'
export default {
    data() {
        return {}
    },
    mounted() {
      this.$store.commit(types.SELECTED_KEYS, '/user/personal/information')
    }
}
</script>
<style scoped lang="less">
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
.news-list-ul {
    .container-size (block,925px,1017px,0 auto,0px);
}
.news-list-ul li {
    height: auto;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0px;
}
.news-pic {
   .container-size (inline-block,140px,80px,0,0px);
}
.text-box {
    .container-size (inline-block,730px,auto,0,0px);
    margin-left: 30px;
    vertical-align: middle;
}
.send-time {
  color: #999999;
}
.news-text {
    font-size: 16px;
    color: #666666;
}
</style>


