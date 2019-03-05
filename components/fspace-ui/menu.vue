<template>
  <ul class="sider-menu" @mouseover="ulShowBorder($event)">
    <li
      v-for="(item,index) in list"
      :key="index"
      :ref ='"li" + index'
      class="sider-menu-li"
      @mouseover="addClass(item, index,$event)"
      @mouseout="reduceClass(item)"
    >
      <div :class="{ 'selectLi': item.isActive, 'selectLi-need-boder': !item.isActive }">
        <h3>
          <a href>{{item.title}}</a>
          <a-icon type="right" v-show="!item.isActive"/>
        </h3>
        <div class="drugs-type">
          <a
            href
            v-for="(items,index) in item.list"
            :key="index"
            :class="{greenColor: items.flag }"
          >{{items.name}}</a>
        </div>
      </div>
      <div :ref='"hover" + index' class="hover-show" v-show="item.isActive"></div>
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
          title: "家庭常备",
          isActive: false,
          list: [
            {
              flag: false,
              name: "体检套餐",
              url: ""
            },
            {
              flag: true,
              name: "计生避孕",
              url: ""
            },
            {
              flag: false,
              name: "补肾用药",
              url: ""
            },
            {
              flag: false,
              name: "养胃护胃",
              url: ""
            },
            {
              flag: false,
              name: "腰腿疼痛",
              url: ""
            },
            {
              flag: false,
              name: "男科用药",
              url: ""
            },
            {
              flag: true,
              name: "妇科用药",
              url: ""
            },
            {
              flag: false,
              name: "儿科用药",
              url: ""
            },
            {
              flag: false,
              name: "换季感冒",
              url: ""
            }
          ]
        },
        {
          title: "中西药品",
          isActive: false,
          list: [
            {
              flag: false,
              name: "肠胃用药",
              url: ""
            },
            {
              flag: false,
              name: "阳痿早泄",
              url: ""
            },
            {
              flag: false,
              name: "心脑血管",
              url: ""
            },
            {
              flag: false,
              name: "皮肤用药",
              url: ""
            },
            {
              flag: true,
              name: "肝胆用药",
              url: ""
            },
            {
              flag: true,
              name: "避孕药品",
              url: ""
            },
            {
              flag: false,
              name: "生发脱发",
              url: ""
            },
            {
              flag: false,
              name: "五官用药",
              url: ""
            },
            {
              flag: false,
              name: "补肾用药",
              url: ""
            }
          ]
        },
        {
          title: "健康保健",
          isActive: false,
          list: [
            {
              flag: false,
              name: "美容养颜",
              url: ""
            },
            {
              flag: true,
              name: "补肾强身",
              url: ""
            },
            {
              flag: false,
              name: "增强免疫",
              url: ""
            },
            {
              flag: false,
              name: "补维生素",
              url: ""
            },
            {
              flag: false,
              name: "调节血脂",
              url: ""
            },
            {
              flag: false,
              name: "减肥瘦身",
              url: ""
            },
            {
              flag: false,
              name: "缓解疲劳",
              url: ""
            },
            {
              flag: false,
              name: "纤体排毒",
              url: ""
            },
            {
              flag: true,
              name: "滋补养生",
              url: ""
            }
          ]
        },
        {
          title: "医疗器械/隐形",
          isActive: false,
          list: [
            {
              flag: false,
              name: "血压计",
              url: ""
            },
            {
              flag: false,
              name: "血糖仪",
              url: ""
            },
            {
              flag: false,
              name: "隐形眼镜",
              url: ""
            },
            {
              flag: false,
              name: "胎心仪",
              url: ""
            },
            {
              flag: false,
              name: "雾化器",
              url: ""
            },
            {
              flag: false,
              name: "助听器",
              url: ""
            },
            {
              flag: true,
              name: "避孕套",
              url: ""
            },
            {
              flag: false,
              name: "按摩器材",
              url: ""
            },
            {
              flag: false,
              name: "制氧机",
              url: ""
            }
          ]
        },
        {
          title: "滋补养生",
          isActive: false,
          list: [
            {
              flag: false,
              name: "蜂蜜",
              url: ""
            },
            {
              flag: false,
              name: "润肺养胃",
              url: ""
            },
            {
              flag: true,
              name: "补肾明目",
              url: ""
            },
            {
              flag: false,
              name: "美容养颜",
              url: ""
            },
            {
              flag: false,
              name: "提神醒脑",
              url: ""
            },
            {
              flag: true,
              name: "滋阳调胃",
              url: ""
            },
            {
              flag: false,
              name: "三七",
              url: ""
            },
            {
              flag: false,
              name: "冬虫夏草",
              url: ""
            },
            {
              flag: false,
              name: "提升免疫",
              url: ""
            }
          ]
        },
      ]
    };
  },
  methods: {
    addClass(item, index, e) {
      var selectLi = document.getElementsByClassName("selectLi-need-boder");
      this.$refs["hover" + index][0].style.top =
        index * -this.$refs["li" + index][0].clientHeight + "px";
      item.isActive = true;
    },
    reduceClass(item) {
      item.isActive = false;
    },
    ulShowBorder(e) {
      var ul = document.getElementsByClassName("sider-menu");
      var x = event.clientX;
      var y = event.clientY;
      var divx1 = ul[0].offsetLeft;
      var divy1 = ul[0].offsetTop;
      var divx2 = ul[0].offsetLeft + ul[0].offsetWidth;
      var divy2 = ul[0].offsetTop + ul[0].offsetHeight;
      if (!x < divx1 || x > divx2 || y < divy1 || y > divy2) {
      } else {
      }
    }
  }
};
</script>
<style>
sider-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  height: 680px;
  box-shadow: 1px 1px 3px #999;
  z-index: 99;
}
.sider-menu-li {
  position: relative;
  width: 238px;
  height: 136px;
  box-sizing: border-box;
  /* border-right: 1px solid #10b68c; */
  /* border: 2px solid #10b68c; */
}
.sider-menu-li div {
  width: 239px;
  height: 136px;
  padding-left: 10px;
  border-right: 2px solid #ffffff;
}
.sider-menu-li div h3 {
  margin: 4px 0 0;
  font-size: 14px;
  width: 227px;
  position: relative;
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
  left: 239px;
  width: 650px !important;
  height: 680px !important;
  background: #ffffff;
  border-top: 1px solid #10b68c !important;
  border-right: 1px solid #10b68c !important;
  border-bottom: 1px solid #10b68c !important;
  text-align: center;
  line-height: 680px;
  z-index: 101;
}
.hover-show div {
  width: 650px !important;
  height: 136px;
  border-left: 1px solid #10b68c;
}
</style>


