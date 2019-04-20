<template>
  <ul class="sider-menu" ref="siderui">
    <li
      v-for="(i,index) in list"
      :key="index"
      :ref="'li' + index"
      class="sider-menu-li"
      @mouseover="showChildren(i, index,$event)"
      @mouseout="hideChildren(i)"
    >
    {{i.label}}
    <a-icon type="right"/>
      <!-- 弹出层  v-show="i.isActive"-->
      <div :ref="'hover' + index" class="hover-show" v-show="i.isActive">
        <div
          class="small-type"
          v-for="(j,index) in i.children"
          :key="index"
          @click="toCategory(j.value)"
        >
          <p class="two-type">{{j.label}}</p>
          <span v-for="(k,index) in j.children" :key="index" @click="toCategory(k.value)">{{k.label}}</span>
          <div style="clear:both;"></div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "f-space-menu",
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getProduceClasses();
    this.compLiHeight();
  },
  methods: {
    compLiHeight() {
      var siderui = this.$refs.siderui.offsetHeight;
      var siderLi = document.getElementsByClassName('sider-menu-li');
     for(var i = 0;i<siderLi.length;i++){
       siderLi[i].style.height = siderui/siderLi.length
     }
      console.log(siderLi)
    },
    toCategory(index) {
      // console.log(index)
      let routeData = this.$router.resolve({
        name: "category",
        query: {
          goodsType: index
        }
      });
      window.open(routeData.href, "_blank");
    },
    showChildren(item, index, e) {
      this.$refs["hover" + index][0].style.top =
        index * -this.$refs["li" + index][0].clientHeight + -15 + "px";
      item.isActive = true;
    },
    hideChildren(item) {
      item.isActive = false;
    },
    getProduceClasses() {
      const _this = this;
      const iRequest = new inf.IRequest();
      iRequest.cls = "CommonModule";
      iRequest.method = "getProduceClasses";
      // iRequest.param.token = localStorage.getItem("identification");
      this.$refcallback(
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.list = JSON.parse(result.data);
              _this.list.forEach(element => {
                _this.$set(element, "isActive", false);
              });
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {
            _this.$message.error('无法连接服务器或服务器返回异常, 请稍后重试');
          }
        )
      );
    }
  }
};
</script>
<style>
.two-type {
  display: block;
  height: 30px !important;
  line-height: 30px !important;
  text-indent: 20px !important;
  font-size: 16px!important;
  font-weight: bold;
  color: rgb(255, 0, 54) !important;
}
.two-type:hover {
  cursor: pointer;
}
.small-type{
  width: 100%;
  min-height: 80px;
  height: auto;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.small-type span {
  cursor: pointer;
}
.small-type span:hover {
  color: rgb(255, 0, 54);
}
.sider-menu {
  width: 196px;
  height: 435px;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  /* box-shadow: 1px 1px 3px #999; */
  z-index: 99;
}
.sider-menu-li {
  position: relative;
  width: 196px;
  height: 58px;
  box-sizing: border-box;
  line-height: 58px;
  text-indent: 20px;
}
.sider-menu-li:hover {
  background: rgb(255, 0, 54);
  color: #f2f2f2;
}
.sider-menu-li i {
  float: right;
  margin-top: 15px;
  margin-right: 5px;
  color: #999999;
}
.hover-show {
  position: absolute;
  top: 0px;
  left: 197px;
  width: 970px !important;
  height: 435px !important;
  padding-top:20px;
  background: #ffffff;
  overflow: auto;
  color: #666 !important;
  z-index: 101;
}
.hover-show p {
  height: 60px;
  line-height: 70px;
  text-indent: 30px;
  font-size: 18px;
  color: #333;
}
/* .hover-show div {
  min-height: 80px;
  height: auto;
  padding-left: 30px;
  padding-top: 10px;
} */
.hover-show div span {
  float: left;
  width: 140px;
  height: 40px;
  text-align: left;
  line-height: 40px;
  font-weight: bold;
  font-size: 14px;
  color: black;
}
</style>
