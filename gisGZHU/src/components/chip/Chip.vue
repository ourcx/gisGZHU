<template>
  <q-dialog v-model="showDialog" >
    <!-- 对话框主容器 -->
    <q-card class="card-wall-dialog" >
      <!-- 对话框头部 -->
      <q-card-section class="row items-center q-py-sm q-px-md bg-white">
        <div class="text-h6 text-weight-bold ">校园记忆墙</div>
        <q-btn icon="help" flat round dense />
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup @click="Chip.changeChip"/>
      </q-card-section>

      <q-separator />

      <!-- 内容区域，作为卡片墙的容器 -->
      <q-card-section class="scroll content-area">
        <div class="card-wall-container">
          <!-- 
            使用 v-for 循环生成所有卡片。
            通过 :style 绑定，为每张卡片应用预设的、不同的位置和旋转角度，
            从而营造出散乱的效果。
          -->
          <q-card
            v-for="(card, index) in cardList"
            :key="index"
            class="scatter-card"
            flat
            bordered
            :style="card.style"
          >
            <!-- 图片部分 -->
            <q-img :src="card.image" :ratio="4 / 3" />

            <!-- 文字部分 -->
            <q-card-section>
              <div class="text-caption text-grey-8">
                {{ card.content }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref,computed } from "vue";
import {useChip} from "../../store/chip";
const Chip  = useChip();
const showDialog =computed(()=>Chip.chip)


// 创建一个包含多张卡片数据的数组
// 每张卡片除了内容，还包含一个 style 对象，用于定义其在墙上的位置和样式
const cardList = ref([
  {
    content: "飘走的流年任风吹，广州的天空，在路上",
    image: "https://s2.loli.net/2025/06/13/SP6wneV4Zh52rKm.jpg",
    style: {
      top: "20px",
      left: "5%",
      transform: "rotate(-8deg)",
      zIndex: 1,
    },
  },
  {
    content: "铁路的尽头，有很多的涂鸦 南尽头是扇铁门 旁边的涂鸦是“LOVE And Peace” 北尽头则通向公路 南短北长",
    image: "https://s2.loli.net/2025/06/13/rOHENXJgvja3VUM.png",
    style: {
      top: "150px",
      left: "45%",
      transform: "rotate(5deg)",
      zIndex: 2,
    },
  },
  {
    content: "日落，图书馆看向足球场，屠龙的少年还在燃烧",
    image: "https://s2.loli.net/2025/06/13/AQJezCmSVNE48WP.jpg",
    style: {
      top: "50px",
      left: "60%",
      transform: "rotate(-5deg)",
      zIndex: 1,
    },
  },
  {
    content: "无数个深夜，忙忙碌碌又一天",
    image: "https://s2.loli.net/2025/06/13/rycwiSaRO8Mx3nV.jpg",
    style: {
      top: "300px",
      left: "10%",
      transform: "rotate(10deg)",
      zIndex: 3,
    },
  },
  {
    content: "军训",
    image: "https://s2.loli.net/2025/06/13/xitz8pXHeEGOnJA.jpg",
    style: {
      top: "320px",
      left: "55%",
      transform: "rotate(-3deg)",
      zIndex: 2,
    },
  },
  {
    content: "耳机里播放着每一首歌，好像回不到的过去",
    image: "https://s2.loli.net/2025/06/13/x4Wl3dimHg25PRQ.jpg",
    style: {
      top: "480px",
      left: "30%",
      transform: "rotate(6deg)",
      zIndex: 1,
    },
  },
]);
</script>

<style scoped>
/* 对话框主容器样式，给它一个更大的尺寸来容纳卡片墙 */
.card-wall-dialog {
  max-width: 800px; /* 宽度更大一些 */
  width: 100%;
  height: 90vh; /* 高度也增加 */
  max-height: 700px;
  color: black;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
  background-color: #f0f2f5; /* 对话框背景色 */
}

/* 内容滚动区域 */
.content-area {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
}

/* 卡片墙的容器
  - position: relative; 是关键，它是所有绝对定位卡片的父容器。
  - height: 必须给一个足够的高度，否则绝对定位的子元素会“飞”出去。
*/
.card-wall-container {
  position: relative;
  width: 100%;
  height: 700px; /* 这个高度需要大致估算，确保能容纳所有卡片 */
}

/* 散乱卡片的样式 
  - position: absolute; 让卡片可以被精确地放置在容器内的任何位置。
*/
.scatter-card {
  position: absolute;
  width: 250px; /* 给卡片一个固定宽度 */
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /* transition 提供平滑的动画效果 */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, z-index 0.3s;
}

/* 鼠标悬停在卡片上时的交互效果 */
.scatter-card:hover {
  /* 提高 z-index 让卡片浮到最上层 */
  z-index: 10 !important;
  /* 放大一点，并移除旋转角度，方便查看 */
  transform: scale(1.1) rotate(0deg) !important;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

/* 美化滚动条 */
.content-area::-webkit-scrollbar {
  width: 6px;
}
.content-area::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}
</style>
