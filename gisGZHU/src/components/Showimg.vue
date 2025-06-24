<template>
  <!-- 图片模态框 -->
  <div 
    v-if="showImage" 
    class="image-modal" 
    tabindex="0"
  >
    <!-- 加载指示器 -->
    <div v-if="loading" class="loading-indicator">
      <div class="spinner"></div>
      <div class="loading-text">图片加载中...</div>
    </div>
    
    <div class="modal-content">
      <img 
        :src="imageUrl" 
        alt="校园全景图" 
        class="modal-image"
        @load="handleImageLoad"
        @error="handleImageError"
      >
      <!-- 关闭按钮 -->
      <button class="close-button" @click="closeImage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useContorlStore } from '../store/contorl';

const ContorlStore = useContorlStore();

// 计算属性
const imageUrl = computed(() => ContorlStore.ShowImgUrl);
const showImage = computed(() => ContorlStore.ShowImg);

// 响应式状态
const loading = ref(false);
const hasError = ref(false);

// 监听图片URL变化
watch(imageUrl, (newUrl) => {
  if (newUrl) {
    loading.value = true;
    hasError.value = false;
  }
});

// 图片加载完成处理
const handleImageLoad = () => {
  loading.value = false;
};

// 图片加载错误处理
const handleImageError = () => {
  loading.value = false;
  hasError.value = true;
};

// 关闭图片方法
const closeImage = () => {
    ContorlStore.showImgFu();
};
</script>

<style scoped>
/* 模态框样式 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  outline: none;
}

/* 模态内容 */
.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 图片样式 */
.modal-image {
  max-width: 100%;
  max-height: 90vh;
  display: block;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  background: #f0f0f0;
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.close-button svg {
  width: 24px;
  height: 24px;
}

/* 加载指示器 */   
.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 5;
}

.loading-text {
  margin-top: 15px;
  font-size: 18px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 错误状态 */
.error-message {
  color: white;
  font-size: 18px;
  text-align: center;
  padding: 20px;
  background: rgba(255, 0, 0, 0.3);
  border-radius: 8px;
}
</style>