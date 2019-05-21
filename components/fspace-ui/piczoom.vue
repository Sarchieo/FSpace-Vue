<template>
  <div class="ImgAmplify">
    <div class="box" :style="'width: '+r_objW+'px;height: '+r_objh+'px'">
      <div class="yuan_img"
           @mousemove="mousemove"
           @mouseover="mouseover"
           @mouseleave="mouseleave"
           ref="yuan_img" :style="'width: '+r_objW+'px;height: '+r_objh+'px;background-image: url('+imgUrl+');'">
        <div class="yidong"
             :style="'bottom:'+bottom+'px;right: '+right+'px;width: '+objw+'px;height: '+objH+'px'"
             ref="yidong"
             v-if="h_xian==true">

        </div>
      </div>
      <div class="big_box"
           :style="'width: '+big_img_boxW+'px;height: '+big_img_boxh+'px;margin-top: -'+big_img_boxh+'px;margin-right: -'+big_img_boxW+'px;'"
           v-if="h_xian==true">
        <div class="big_img_box"
             ref="big_img_box"
             :style="'width: '+big_img_boxW+'px;height: '+big_img_boxh+'px'">
          <div class="big_img"
               ref="big_img"
               :style="'bottom:'+big_bottom+'px;right: '+big_right+'px;width: '+big_objW+'px;height: '+big_objh+'px;background-image: url('+imgUrl+');'">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'f-space-pic-zoom',
    components: {},
    data() {
      return {
        h_xian:false,
        // beishu: 2,
        right:0,
        bottom:0,
        big_right:0,
        big_bottom:0,
        max_pian_h:0,
        max_pian_w:0,
        pianyi_w:0,
        pianyi_h:0,
        // 内部黑块的宽和高
        objH:0,
        objw:0,
        // 最大图片容器的宽和高
        big_objW:0,
        big_objh:0,
        // 大容器的宽和高
        big_img_boxW:0,
        big_img_boxh:0,
      }
    },
    props: {
      r_objW:{ // 放图片盒子的宽
        type:Number,
        // required: true,
        default: 500
      },
      r_objh:{ // 
        type:Number,
        // required: true,
        default: 400
      },
      beishu:{
        type:Number,
        default: 3
      },
      imgUrl:{
        type:String,
        required: true
      }
    },
    watch: {
      // r_objW:function (val) {
      //   this.big_objW = val*this.beishu
      //   this.big_img_boxW = val
      //   this.objw = val/this.beishu
      //   this.max_pian()
      // },
      // r_objh:function (val) {
      //   this.big_objh = val*this.beishu
      //   this.objH = val/this.beishu
      //   this.big_img_boxh = val
      //   this.max_pian()
      // },
      right:function (val) {
        this.big_right = val*-this.pianyi_w
      },
      bottom:function (val) {
        this.big_bottom = val*-this.pianyi_h
      }
    },
    methods: {
      // 计算偏移量
      max_pian () {
        this.big_objh = this.r_objh*this.beishu
        this.objH = this.r_objh/this.beishu
        this.big_img_boxh = this.r_objh

        this.big_objW = this.r_objW*this.beishu
        this.big_img_boxW = this.r_objW
        this.objw = this.r_objW/this.beishu
        // 获取内部黑块的宽和高
        // this.objH = this.$refs.yidong.offsetHeight
        // this.objw = this.$refs.yidong.offsetWidth
        // 获取图片容器的宽和高
        // this.r_objW = this.$refs.yuan_img.offsetWidth
        // this.r_objh = this.$refs.yuan_img.offsetHeight
        // 大容器的宽和高
        // this.big_objW = this.r_objW*this.beishu
        // this.big_objh = this.r_objh*this.beishu
        // 大容器的宽和高
        // this.big_img_boxW = this.r_objW
        // this.big_img_boxh = this.r_objh
        // 计算偏移量

        var bigW_cha = this.big_objW-this.big_img_boxW
        var bigH_cha = this.big_objh-this.big_img_boxh
        var minW_cha = this.r_objW-this.objw
        var minH_cha = this.r_objh-this.objH

        this.pianyi_w = bigW_cha/minW_cha
        this.pianyi_h = bigH_cha/minH_cha

      },
      // 鼠标移动事件
      mousemove (event) {
        var e = event || window.event;
        var rectObject = this.$refs.yuan_img.getBoundingClientRect()
        // 获取鼠标的位置
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        // 计算内部黑块的偏移量
        var rectLeft = rectObject.left;
        var rectRight = rectObject.right-x;
        var rectBottom = rectObject.bottom+document.documentElement.scrollTop-y;
        var rectTop = rectObject.top;
        // // 获取内部黑块的宽和高
        // var objH = this.$refs.yidong.offsetHeight
        // var objw = this.$refs.yidong.offsetWidth
        // // 获取图片容器的宽和高
        // var r_objW = this.$refs.yuan_img.offsetWidth
        // var r_objh = this.$refs.yuan_img.offsetHeight
        this.right = rectRight-(this.objw/2)
        this.bottom = rectBottom-(this.objH/2)
        // 防止黑块偏移到容器外
        if(this.bottom<0){
          this.bottom = 0
        }
        if (this.r_objh-this.objH < this.bottom) {
          this.bottom = this.r_objh-this.objH
        }
        if(this.right<0){
          this.right = 0
        }
        if (this.r_objW-this.objw < this.right) {
          this.right = this.r_objW-this.objw
        }
        // if (this.right-objw)

        // var top =x-document.querySelector('.yuan_img').getBoundingClientRect().top+document.documentElement.scrollleft
        // var left =y-document.querySelector('.yuan_img').getBoundingClientRect().left+document.documentElement.scrollTop
      },
      // 鼠标移入事件
      mouseover (e) {
        e = e || event
        this.h_xian = true
      },
      // 鼠标移出事件
      mouseleave () {
        this.h_xian = false
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.max_pian()
      // this.r_objW = 300
      // this.r_objh = 600
      // this.beishu = 4
    },
    destroyed() {
    }
  }
</script>

<style lang="less" scoped>

 .yuan_img {
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  .yidong {
       comment__-3: 3;
  background: rgba(0, 0, 0, .5);
  position: absolute;
}
} 
  .big_img {
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

.big_box {
  float: right;
}
.big_img_box {
  background: white;
  position: relative;
  overflow: hidden;
  opacity: 1;
  z-index: 1000;
}

</style>
