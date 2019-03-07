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
      <p> {{ item.title }} </p>
      <div>
        <span v-for="(items,index) in item.list" :key="index">{{items}}</span>
      </div>
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
              list: [
                '体检套餐',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽'
              ]
            },
             {
              isActive: false,
              title: '中成药',
               list: [
                '避孕计生',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '感',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '发烧',
              ]
            },
             {
              isActive: false,
              title: '医疗器械',
               list: [
                '补肾用药',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '感',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '发烧',
              ]
            },
             {
              isActive: false,
              title: '食品保健',
               list: [
                '蜂蜜',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '感',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '发烧',
              ]
            },
             {
              isActive: false,
              title: '中药饮品',
               list: [
                '三七',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '感',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '发烧',
              ]
            },
             {
              isActive: false,
              title: '生物制药',
               list: [
                '血糖仪',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '感',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '发烧',
              ]
            },
             {
              isActive: false,
              title: '注射用药',
               list: [
                '青莓素',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '感',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '发烧',
              ]
            },
             {
              isActive: false,
              title: '日化用品',
               list: [
                '牙膏',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '感',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '发烧',
              ]
            },
             {
              isActive: false,
              title: '美妆护理',
               list: [
                '粉底',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒',
                '感冒咳嗽',
                '感冒咳嗽',
                '咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '感',
                '感冒咳嗽',
                '感冒咳嗽',
                '感冒咳嗽',
                '发烧',
              ]
            }
      ]
    };
  },
  methods: {
    showChildren(item, index, e) {
      this.$refs["hover" + index][0].style.top =
        index * -this.$refs["li" + index][0].clientHeight + -15 + "px";
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
  width: 196px;
  height: 435px;
  padding-top: 15px!important;
  padding-bottom: 15px!important;
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
.sider-menu-li:hover{
  background: rgb(255, 0, 54);
  color: #ffffff;
}
.sider-menu-li i{
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
  color: #666!important;
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
.hover-show div span{
  float: left;
  width: 130px;
  height: 40px;
  text-align: left;
  line-height: 40px;
  font-size: 16px;
  color: black;
}
</style>
