<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";


</script>

<template>
  <q-scroll-area class="fit">
    <div class="main">
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="shareFile-main">
        <div class="share">
        <a href="https://github.com/ourcx">前往Github主页点个star</a>
        </div>
      </div>
      <div class="log">
        <p>
          我有一件礼物想要呈现给你，那是孤独难耐的夜晚，依然会在远方闪闪发光的满天繁星
        </p>
      </div>
      <div class="shareFile-next">
        <div class="page">
          <h1>Share</h1>
          <p>This is the share file page.</p>
          <router-link to="/">Go to Home</router-link>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: visible;
}

.shareFile-main {
  width: 1530px;
  height: 100vh;
  background-image: url("https://s2.loli.net/2025/04/02/Wc3qF7w2OVNiKlG.jpg");
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  color: #fff;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.shareFile-next {
  width: 1530px;
  height: 100vh;
  text-align: center;
  background-image: url("https://s2.loli.net/2025/02/02/ELbK6urJqYvgBPj.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  color: #fff;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.share {
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10002;
}

.log {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: #000;
  font-size: larger;
  z-index: 10002;
}

.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10002;
}

.area {
  height: 100%;
  width: 100%;
  position: absolute;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: #ffffff33;
  bottom: -150px;
  animation: animate 25s linear infinite;
  /* 线性无限 */
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

/* ----------- 新增10个圆圈的差异化样式 ----------- */
/* 第2个圆圈 - 向右偏移、缩小、延迟启动 */
.circles li:nth-child(2) {
  left: 32%;
  width: 75px;
  height: 75px;
  animation-delay: 0.6s;
  animation-duration: 3.8s;
}

/* 第3个圆圈 - 更大尺寸、更长延迟 */
.circles li:nth-child(3) {
  left: 40%;
  width: 90px;
  height: 90px;
  animation-delay: 1.2s;
  animation-duration: 4.2s;
}

/* 第4个圆圈 - 左侧回弹、快速动画 */
.circles li:nth-child(4) {
  left: 18%;
  width: 65px;
  height: 65px;
  animation-delay: 1.8s;
  animation-duration: 2.5s;
}

/* 第5个圆圈 - 中心位置、中等参数 */
.circles li:nth-child(5) {
  left: 50%;
  width: 85px;
  height: 85px;
  animation-delay: 2.4s;
  animation-duration: 3.5s;
}

/* 第6个圆圈 - 小尺寸、长持续时间 */
.circles li:nth-child(6) {
  left: 60%;
  width: 55px;
  height: 55px;
  animation-delay: 3s;
  animation-duration: 5s;
}

/* 第7个圆圈 - 右侧边缘、快速动画 */
.circles li:nth-child(7) {
  left: 75%;
  width: 70px;
  height: 70px;
  animation-delay: 3.6s;
  animation-duration: 2.8s;
}

/* 第8个圆圈 - 随机位置、大延迟 */
.circles li:nth-child(8) {
  left: 10%;
  width: 95px;
  height: 95px;
  animation-delay: 4.2s;
  animation-duration: 4.5s;
}

/* 第9个圆圈 - 中右位置、缓慢动画 */
.circles li:nth-child(9) {
  left: 65%;
  width: 88px;
  height: 88px;
  animation-delay: 4.8s;
  animation-duration: 5.5s;
}

/* 第10个圆圈 - 分散布局、超长延迟 */
.circles li:nth-child(10) {
  left: 85%;
  width: 60px;
  height: 60px;
  animation-delay: 5.4s;
  animation-duration: 3.2s;
}

/* 在复制分别处理剩下十个，delay要设置多一点，还有设置大小和duration不同 */

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-2000px) rotate(720deg);
    opacity: 0.1;
    border-radius: 50%;
  }
}
</style>
