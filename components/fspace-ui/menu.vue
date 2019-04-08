<template>
  <ul class="sider-menu">
    <li
      v-for="(item,index) in list"
      :key="index"
      :ref="'li' + index"
      class="sider-menu-li"
      @mouseover="showChildren(item, index,$event)"
      @mouseout="hideChildren(item)"
    >
      {{item.label}}
      <a-icon type="right"/>
      <div :ref="'hover' + index" class="hover-show" v-show="item.isActive">
        <p>{{ item.label }}</p>
        <div class="small-type">
          <span v-for="(items,index) in item.children" :key="index" @click="fullTextsearchProdMall(index)">{{items.label}}</span>
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
    this.getProduceClasses()
  },
  methods: {
       // 搜索结果商品列表
    fullTextsearchProdMall(index) {
      debugger
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "ProdModule";
      iRequest.method = "fullTextsearchProdMall";
      iRequest.param.token = localStorage.getItem("identification");
      iRequest.param.pageIndex = 1;
      iRequest.param.pageNumber = 20;
      var value = ''
      for(var i = 0;i < this.list[i].children.length;i++) {
        for(var j = 0;j<this.list[i].children.length;j++){
        }
        value = this.list[i].children[index].value
      }
      iRequest.param.json = JSON.stringify({
        keyword: this.keyword,
        specArray: _this.specArray,
        manuArray: _this.manuArray,
        brandArray: _this.brandArray,
        spu: value,
        sort: 1
      });
      this.$refcallback(
        "goodsServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              debugger
              _this.searchList = result.data;
              if(_this.searchList.length === 0 || _this.searchList === null){
                _this.isGoods = true
              } else {
                 _this.isGoods = false
              }
              console.log(result);
            } else {
              console.log(111);
            }
          },
          function error(error) {
            debugger;
          }
        )
      );
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
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if (result.code === 200) {
              _this.list = JSON.parse(result.data)
              console.log(_this.list)
              _this.list.forEach(element => {
              _this.$set(element, 'isActive', false)
              });
              console.log( _this.list)
            } else {
              _this.$message.error(result.message);
            }
          },
          function error(e) {

          }
        )
      );
    },
  }
};
</script>
<style>
.small-type span{
   cursor:pointer
}
.small-type span:hover{
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
