<template>
  <ul class="sider-menu">
    <li
      v-for="(item,index) in list"
      :key="index"
      :ref ='"li" + index'
      class="sider-menu-li"
      @mouseover="showChildren(item, index,$event)"
      @mouseout="hideChildren(item)"
    >
    {{item.title}}
    <a-icon type="right" />
    <div :ref='"hover" + index' class="hover-show" v-show="item.isActive">

    </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'f-space-menu',
  data() {
    return {
          list: [
            {
              isActive: false,
              title: '西药',  
            },
             {
              isActive: false,
              title: '中成药',
            },
             {
              isActive: false,
              title: '医疗器械',
            },
             {
              isActive: false,
              title: '食品保健',
            },
             {
              isActive: false,
              title: '中药饮品',
            },
             {
              isActive: false,
              title: '生物制药',
            },
             {
              isActive: false,
              title: '注射用药',
            },
             {
              isActive: false,
              title: '日化用品',
            },
             {
              isActive: false,
              title: '美妆护理',
            }
      ]
    };
  },
  methods: {
    showChildren(item, index, e) {
      this.$refs["hover" + index][0].style.top =
        index * -this.$refs["li" + index][0].clientHeight + "px";
      item.isActive = true;
    },
    hideChildren(item) {
      item.isActive = false;
    }
  }
};
</script>
<style>
.sider-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 196px;
  height: 435px;
  padding-top: 15px!important;
  box-shadow: 1px 1px 3px #999;
  z-index: 99;
}
.sider-menu-li {
  position: relative;
  width: 196px;
  height: 43px;
  box-sizing: border-box;
  line-height: 45px;
  text-indent: 20px;
}
.sider-menu-li:hover{
  background: rgb(255, 0, 54);
  color: #ffffff;
}
.sider-menu-li i{
  float: right;
  margin-top: 15px;
  margin-right: 5px;
}
.sider-menu-li div {
  width: 196px;
  height: 136px;
  padding-left: 10px;
  /* border-right: 2px solid #ffffff; */
}
.sider-menu-li div h3 {
  width: 195px;
  position: relative;
  margin: 4px 0 0;
  font-size: 14px;
}
.sider-menu-li div h3 a {
  display: inline-block;
  width: 182px;
  height: 30px;
  color: rgb(95, 95, 95);
}
.selectLi {
  border-left: 1px solid #10b68c;
  border-top: 1px solid #10b68c;
  border-bottom: 1px solid #10b68c;
  border-right: 1px solid #10b68c;
}
.selectLi-need-boder {
  border-left: 1px solid #ffffff;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
  border-right: 1px solid #10b68c !important;
}
.drugs-type {
  width: 210px !important;
  height: 88px !important;
}
.drugs-type a {
  display: inline-block;
  width: 60px;
  margin-right: 5px;
  margin-bottom: 6px;
  color: #000000;
}
.drugs-type p {
  margin-bottom: 7px !important;
}
.hover-show {
  position: absolute;
  top: 0px;
  left: 195px;
  width: 720px !important;
  height: 435px !important;
  background: #ffffff;
  text-align: center;
  line-height: 680px;
  z-index: 101;
  background: deeppink;
}
.hover-show div {
  width: 650px !important;
  height: 136px;
  border-left: 1px solid #10b68c;
}
</style>
