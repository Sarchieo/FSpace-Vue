<template>
  <div class="certificates-box">
    <div class="certificates-content">
        <h2>药店信息</h2>
        <p><span>药店名称：</span> <input type="text" placeholder="请填写药店名称"></p>
        <p><span>药店地址：</span> <a-cascader :options="options" @change="onChange" placeholder="请选择省市区" /></p>
        <p><input type="text" placeholder="请输入药店详细地址"></p>
        <p>登录密码：********</p>
        <p>绑定手机：18373270790</p>
        <h2>药店资质</h2>
        <div class="photo-box">
          <div class="business-license">

          </div>
          <div class="management">

          </div>
          <div>

          </div>
        </div>
        <p>
          <span>营业执照</span>
          <span>药品经营许可证</span>
          <span>GSP证书</span>
        </p>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            options: [{
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [{
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [{
                        value: 'xihu',
                        label: 'West Lake',
                    }],
                    }],
                }, {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [{
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [{
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    }],
                    }],
                }]
                    }
    },
    methods: {
      onChange(value) {
        console.log(value);
      }
    }
}
</script>
<style scoped lang="less">
@import "../components/fspace-ui/container/index.less";
@import "../components/fspace-ui/button/index.less";
  .certificates-box {
    .container-size(block,985px,1015px,0,0px);
    background: #3189f5;
    padding: 40px 0;
    .certificates-content {
     .container-size(block,730px,935px,0 auto,0px);
     background: deeppink;
     .photo-box {
        .container-size(inline-block,730px,345px,0,0px);
        background: pink;
        div {
          .container-size(inline-block,210px,280px,0,0px);
          .position(relative,0px,0px);
          float:left;
          background: yellow;
        }
        .business-license,.management {
            margin-right: 50px;
        }
     }
    }
  }
</style>