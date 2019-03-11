<template>
  <a-layout-footer class="footer">
    <div class="footer-message">
      <div class="footer-message-item">
        <p class="footer-message-p">客户服务</p>
        <div class="footer-message-box">
          <div class="footer-message-box-item">
            <a-icon type="sync" />
            <p>在线客服</p>
          </div>
          <div class="footer-message-box-item">
            <a-icon type="sync" />
            <p>用户反馈</p>
          </div>
        </div>
      </div>
      <div class="footer-message-item">
         <p class="footer-message-p">一块医药公众号</p>
         <div class="footer-message-box">
          <img src="../../assets/img/img01.png">
          <img src="../../assets/img/img01.png">
         </div>
      </div>
      <div class="footer-message-item">
         <p class="footer-message-p">一块物流公众号</p>
         <div class="footer-message-box">
            <div class="footer-message-box-item">
            <img src="../../assets/img/img01.png">
          </div>
          <div class="footer-message-box-item">
            <img src="../../assets/img/img01.png">
          </div>
         </div>
      </div>
    </div>
    <div class="footer-box">
      <p>
        <a-icon type="like" />
        30天无忧退换货
      </p>
      <p>
        <a-icon type="rocket" />
        满88元免邮费
      </p>
      <p>
        <a-icon type="heart" />
        平台品质保证
      </p>
    </div>
    <h4 class="footer-copyright">Copyright@2015-2019 一块医药 版权所有 </h4>
  </a-layout-footer>
</template>
<script>
export default {
  name: 'f-space-footer'
}
</script>
<style lang='less'>
.footer {
  background: #414141;
  border-top: 1px #000;
}
.footer-message {
  padding-left: 10%;
  padding-right: 10%;
  color: #000;
  height: 240px;
  background: white;
  border-top: 1px #000;
}
.footer-message-item {
  text-align: center;
  float: left;
  width: 33.3%;
  font-size: 18px;
  color: black;
}
.footer-message-p {
  width: 100%;
  height: 100px;
  line-height: 100px;
}
.footer-message-box {
  height: 120px;
  line-height: 120px;
}
.footer-message-box-item {
  border: 0.5px solid #dddddd;
  display: inline-block;
  width: 30%;
  height:80px;
  line-height: 80%;
}
.footer-message-box img {
  width: 100px;
  height: 100px;
}
.footer-message-box-item i {
  width: 50%;
  margin-top: 10%;
  margin-bottom: 10%;
  font-size: 40px;
}
.footer-box {
  padding-left: 15%;
  padding-right: 15%;
  text-align:center;
  margin:0 auto;
  border-bottom: 1px solid #555555;
  height:120px;
}
.footer-box p {
  float:left;
  width: 33.3%;
  font-size: 22px;
  color: white;
  height: 120px;
  line-height: 120px;
}
.footer p i{
  font-size: 50px;
  color: white;
}
.footer-copyright {
  display: block;
  line-height: 50px;
  height: 50px;
  width: 1190px;
  margin:0 auto;
  text-align: center;
  color: #555555
}
</style>


