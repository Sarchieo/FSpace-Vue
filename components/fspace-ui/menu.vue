<template>
  <ul class="sider-menu">
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
      <!-- 弹出层 -->
      <div :ref="'hover' + index" class="hover-show" v-show="true ">
        <div
          class="small-type"
          v-for="(j,index) in i.children"
          :key="index"
          @click="toCategory(j.value)"
        >
          <span>2级分类: {{j.label}}</span>
          <span v-for="(k,index) in j.children" :key="index" @click="toCategory(k.value)">3级分类:{{k.label}}</span>
        </div>
        <!-- <div class="small-type">
          <span v-for="(items,index) in item.children" :key="index" @click="toCategory(items.value)">{{items.label}}</span>
        -->
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
  },
  methods: {
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
      this.$refcallback(
        "globalServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.list = JSON.parse(result.data);
              console.log(_this.list);
              _this.list.forEach(element => {
                _this.$set(element, "isActive", false);
              });
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {}
        )
      );
    }
  }
};
</script>
<style>
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
  box-shadow: 1px 1px 3px #999;
  z-index: 99;
}
.sider-menu-li {
  position: relative;
  width: 196px;
  box-sizing: border-box;
  line-height: 45px;
  text-indent: 20px;
}
.sider-menu-li:hover {
  background: rgb(255, 0, 54);
  color: #ffffff;
}
.sider-menu-li i {
  float: right;
  margin-top: 15px;
  margin-right: 5px;
}
.hover-show {
  position: absolute;
  top: 0px;
  left: 197px;
  width: 970px !important;
  height: 435px !important;
  background: #ffffff;
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
.hover-show div {
  height: 356px;
  padding-left: 30px;
  padding-top: 10px;
}
.hover-show div span {
  float: left;
  width: 200px;
  height: 40px;
  text-align: left;
  line-height: 40px;
  font-size: 16px;
  color: black;
}
</style>
