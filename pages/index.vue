<template>
  <div>
    <van-search background='#00BFFF' placeholder="请输入搜索关键词" v-model="value" />
    <van-swipe :height='150' :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="img" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      color='#fff'
      background='#00BFFF'
      text="星期一,吃中饭,忘吃中饭。星期二,不吃中饭,吃中饭。。。"
      left-icon="volume-o"
    />
    <van-notice-bar
      color='#fff'
      background='#00BFFF'
      text="我是系统促销消息展示窗口"
      left-icon="volume-o"
    />
     <van-row type="flex" justify="center">
      <van-col span="8"><img class="img" src="http://gw.alicdn.com/imgextra/i4/48/O1CN011CE1TfhAEwAhwgq_!!48-0-lubanu.jpg_100x100q85s150.jpg_.webp" /></van-col>
      <van-col span="8"><img class="img" src="https://gw.alicdn.com/tfs/TB1mQYqQFXXXXXKapXXXXXXXXXX-90-44.png_.webp" /></van-col>
      <van-col span="8"><img class="img" src="http://gw.alicdn.com/imgextra/i3/42/TB2ejpudkfb_uJkSmFPXXcrCFXa_!!42-0-luban.jpg_200x200q85s150.jpg_.webp" /></van-col>
    </van-row>
    <van-card
      num="1"
      tag="标签"
      price="2.00"
      desc="描述信息"  
      title="商品标题"
      :thumb="imageURL"
      origin-price="10.00"
    >
      <div slot="footer">
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </div>
    </van-card>
      <van-card
      num="1"
      tag="标签"
      price="2.00"
      desc="描述信息"  
      title="商品标题"
      :thumb="imageURL"
      origin-price="10.00"
    >
      <div slot="footer">
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </div>
    </van-card>
      <van-card
      num="1"
      tag="标签"
      price="2.00"
      desc="描述信息"  
      title="商品标题"
      :thumb="imageURL"
      origin-price="10.00"
    >
      <div slot="footer">
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </div>
    </van-card>
      <van-card
      num="1"
      tag="标签"
      price="2.00"
      desc="描述信息"  
      title="商品标题"
      :thumb="imageURL"
      origin-price="10.00"
    >
      <div slot="footer">
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </div>
    </van-card>
      <van-card
      num="1"
      tag="标签"
      price="2.00"
      desc="描述信息"  
      title="商品标题"
      :thumb="imageURL"
      origin-price="10.00"
    >
      <div slot="footer">
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </div>
    </van-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageURL: 'http://img2.imgtn.bdimg.com/it/u=3377302992,3361149372&fm=26&gp=0.jpg',
      images: [
        'http://gw.alicdn.com/imgextra/i1/31/O1CN01kvxiAz1C6EmD0ULil_!!31-0-lubanu.jpg',
        'http://gw.alicdn.com/imgextra/i1/170/O1CN01SdkUQC1D7tpTI0jsn_!!170-0-lubanu.jpg',
        'http://gw.alicdn.com/imgextra/i2/146/O1CN01RL3AuL1CwuK8BLnkT_!!146-0-lubanu.jpg',
        'https://gw.alicdn.com/tps/TB14vOGPpXXXXaIXVXXXXXXXXXX-75-39.png',
        'http://gw.alicdn.com/imgextra/i4/76/O1CN01Qvvfbd1CQqbDdUxB8_!!76-0-lubanu.jpg',
        'http://gw.alicdn.com/imgextra/i1/170/O1CN01SdkUQC1D7tpTI0jsn_!!170-0-lubanu.jpg',
        'http://gw.alicdn.com/imgextra/i1/170/O1CN01SdkUQC1D7tpTI0jsn_!!170-0-lubanu.jpg'
      ]
    }
  }
}
</script>
<style>
  .img{
    width: 100%;
    height: 100%;
  }
</style>
