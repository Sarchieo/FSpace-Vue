<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    overlayClassName="header-notice-wrapper"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <a-list-item v-for="(item, index) in noticeList" :key="index">
                <a-list-item-meta :title="item.text" description="1小时前">
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
     <a-badge :dot="isNewNotice" class="margin-top15">
        <a href="#">我的消息</a>
      </a-badge>
  </a-popover>
</template>

<script>
export default {
  name: "HeaderNotice",
  data() {
    return {
      loadding: false,
      visible: false,
      noticeList: [{
        text: '啦啦啦啦啦'
      },
      {
        text: '7777777'
      }]
    };
  },
  methods: {

  },
  watch: {
    "$store.state.noticeText": function() {
      this.noticeList.push({
        text: this.$store.state.noticeText
      })
    }
  }
};
</script>

<style lang="css">
.header-notice-wrapper {
  top: 20px !important;
}
</style>
<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;
  span {
    vertical-align: initial;
  }
}
.margin-right0 {
  margin-right: 0px !important;
}
.margin-top15{
  margin-top: 8px;
}
</style>
