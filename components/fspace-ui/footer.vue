<template>
  <a-layout-footer class="footer">
    <div class="footer-message">
      <div>
        <p>30天无忧退换货</p>
        <a-card
          hoverable
          class="footer-message-card"
        >
          <a-icon type="customer-service" />
        </a-card>
        <a-card
          hoverable
          style="width: 90px"
        >
          <a-icon type="customer-service" />
        </a-card>
      </div>
      <div>
         <p>满88元免邮费</p>
      </div>
      <div>
         <p>平台品质保证</p>
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
<style>
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
.footer-message div {
  text-align: center;
  float: left;
  width: 33.3%;
  height: 100px;
  line-height: 100px;
  font-size: 18px;
  color: black;
}
.footer-message-card {
  font-size: 20px;
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


