<template>
  <div>
    <div class="right-menu">
      <div class="card-box">
        <div class="card-icon">
          <a-icon type="shopping-cart"/>
          <p>采购单</p>
          <span class="count">20</span>
        </div>
        <div class="menu-box">
          <a-tooltip placement="left" @click="toCollection()">
            <template slot="title">
              <span>收藏</span>
            </template>
            <a-icon type="heart"/>
          </a-tooltip>
          <a-tooltip placement="left" @click="toCenter()">
            <template slot="title">
              <span>我的一块</span>
            </template>
            <a-icon type="user"/>
          </a-tooltip>
        </div>
      </div>
      <div class="back-top">
        <a-tooltip placement="left" @click="toBackTop()">
          <template slot="title">
            <span>回到顶部</span>
          </template>
          <a-icon type="to-top"/>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "f-space-right",
  data() {
    return {};
  },
  methods: {
    toCollection() {
      this.$router.push({
        path: "/user/personal/collection"
      });
    },
    toCenter() {
      this.$router.push({
        path: "/user/personal"
      });
    },
    toBackTop() {
      var scrollToTop = window.setInterval(function() {
        var Top =  window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        if (Top > 0) {
          window.scrollTo(0, Top - 20);
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 10);
    }
  }
};
</script>
<style lang='less' scoped>
.right-menu {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 36px;
  height: 100%;
  background: #404c59;
  padding-top: 15%;
  opacity: 1;
  z-index: 9999;
}
.card-box {
  display: block;
  width: 36px;
  height: 65%;
}
.card-icon {
  padding: 15px 0px;
  background: #54616f;
}
.card-icon:hover {
  cursor: pointer;
}
.card-icon p {
  display: block;
  width: 20px;
  margin: 0 auto;
  text-align: center;
  color: #ffffff;
}
.card-icon i {
  display: block;
  margin: 0 auto;
  font-size: 20px;
  color: #ffffff;
}
.menu-box {
  display: block;
  width: 36px;
  margin-top: 20px;
  padding-top: 20px;
}
.menu-box i {
  display: block;
  height: 36px;
  line-height: 36px;
  margin: 0 auto;
  margin-bottom: 10px;
  font-size: 20px;
  color: #ffffff;
}
.menu-box i:hover {
  background: #ed3025;
  font-size: 26px;
  cursor: pointer;
}
.back-top {
  display: block;
  width: 36px;
  height: 35px;
}
.back-top:hover {
  background: #ed3025;
  cursor: pointer;
}
.back-top i {
  display: block;
  height: 36px;
  line-height: 36px;
  margin: 0 auto;
  margin-bottom: 10px;
  font-size: 20px;
  color: #ffffff;
}
.back-top i:hover {
  font-size: 26px;
}
.count {
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #ed3025;
  margin: 0 auto;
  margin-top: 5px;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
}
</style>


