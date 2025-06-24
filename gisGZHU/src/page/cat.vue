<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" aria-label="Menu" />

        <q-toolbar-title>
          <q-avatar>
            <img
              src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              alt="Logo"
            />
          </q-avatar>
          猫咪
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      :breakpoint="700"
      show-if-above
      side="left"
      elevated
      class="draw-bg full-height"
    >
      <q-scroll-area class="fit">
        <!-- 抽屉内容 -->
        <q-list padding>
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>首页</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/cat">
            <q-item-section avatar>
              <q-icon name="pets" />
            </q-item-section>
            <q-item-section>猫咪页面</q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>设置</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-scroll-area style="height: 710px">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <!-- 确保每次路由变化时都创建新实例 -->
            <component
              :is="Component"
              :key="route.fullPath + (route.meta.reloadKey || 0)"
            />
          </transition>
        </router-view>
      </q-scroll-area>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>数据来源：小小喵扎特--桂花猫苑</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped>
/* 抽屉背景样式 */
.draw-bg {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%);
  color: #000;
  height: 100vh !important;
}

.fit {
  color: #000;
}
.q-drawer--left {
  height: 100vh !important;
}

/* 响应式调整：小屏幕时抽屉全宽 */
@media (max-width: 700px) {
  .q-drawer {
    width: 100% !important;
  }
}

/* 优化滚动区域 */
.q-scroll-area {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.draw-bg.full-height {
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
