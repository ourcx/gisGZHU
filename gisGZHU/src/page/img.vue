<template>
  <q-layout>
    <!-- 页面标题 -->
    <q-header reveal elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-toolbar-title>图片展示</q-toolbar-title>

        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
    </q-header>

    <!-- 搜索框 -->
    <q-input v-model="search" placeholder="搜索图片..." dense outlined class="q-mb-md">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- 图片网格 -->
    <div class="row q-col-gutter-md">
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="my-card">
          <!-- 图片 -->
          <img :src="item.image" class="card-image" />

          <!-- 图片信息 -->
          <q-card-section>
            <div class="text-h6">{{ item.title }}</div>
            <div class="text-subtitle2 q-mt-sm">{{ item.description }}</div>
          </q-card-section>

          <!-- 标签 -->
          <q-card-section v-if="item.tags" class="q-pt-none">
            <q-chip
              v-for="(tag, tagIndex) in item.tags"
              :key="tagIndex"
              color="primary"
              text-color="white"
              size="sm"
            >
              {{ tag }}
            </q-chip>
          </q-card-section>

          <!-- 操作按钮 -->
          <q-card-actions align="right">
            <q-btn flat label="详情" color="primary" @click="showDetails(item)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- 详情对话框 -->
    <q-dialog v-model="detailDialog">
      <q-card style="min-width: 80vw">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ selectedItem?.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="row">
          <div class="col-12 col-md-6">
            <img
              :src="selectedItem?.image"
              class="full-width"
              style="max-height: 60vh; object-fit: contain"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <p class="text-body1">{{ selectedItem?.description }}</p>
            <div class="text-caption text-grey q-mt-md">
              上传日期: {{ selectedItem?.date || "2023-10-01" }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUpdated } from "vue";
import { useImgStore } from "../store/img";
// 图片数据
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const imgStore = useImgStore();
const items = ref([...imgStore.list]);
watch(
  () => imgStore.list,
  (val) => {
    items.value = [...val];
  }
);

// 搜索功能
const search = ref("");
const filteredItems = computed(() => {
  if (!search.value) return items.value;
  return items.value.filter(
    (item) =>
      item.title.toLowerCase().includes(search.value.toLowerCase()) ||
      item.description.toLowerCase().includes(search.value.toLowerCase()) ||
      (item.tags &&
        item.tags.some((tag) => tag.toLowerCase().includes(search.value.toLowerCase())))
  );
});

// 详情对话框
const detailDialog = ref(false);
const selectedItem = ref(null);

function showDetails(item) {
  selectedItem.value = item;
  detailDialog.value = true;
}

onMounted(() => {
  if (route.query.type == "Dormitory") {
    imgStore.addImg(imgStore.kong);
  } else if (route.query.type == "Canteen") {
  }
  imgStore.addImg(imgStore.Canteen);
});
onUpdated(() => {
  if (route.query.type == "Canteen") {
    imgStore.addImg(imgStore.kong);
  } else {
    imgStore.addImg(imgStore.Canteen);
  }
});
</script>

<style scoped>
.my-card {
  transition: transform 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.my-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-image {
  height: 200px;
  object-fit: cover;
}

.text-subtitle2 {
  min-height: 3em;
}
</style>
