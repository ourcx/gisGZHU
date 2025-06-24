<template>
  <div class="q-pa-md">
    <div class="row items-start q-gutter-md justify-center">
      <q-intersection
        v-for="(item, index) in CatStore.data"
        :key="index"
        transition="scale"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="cat-card full-height">
          <q-img :src="item.url" :ratio="1">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                无法加载图片
              </div>
            </template>
          </q-img>

          <q-card-section>
            <div class="text-h6">{{ item.name }}</div>
            <div class="text-subtitle2 text-grey-7">{{ item.intoractions }}</div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </div>
</template>

<script setup>
import { useCatStore } from "../../store/cat";
import { ref, onBeforeUnmount,onMounted } from "vue";

const CatStore = useCatStore();

onMounted(() => {
  CatStore.initData();
})

onBeforeUnmount(() => {
  CatStore.clearDatas(); // 这个调用现在安全了
})
</script>

<style scoped>

.cat-card {
  border-radius: 8px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  cursor: pointer; 
  display: flex;
  flex-direction: column;
}


.cat-card:hover {
  transform: translateY(-5px); 
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}


.q-pa-md {
  background-color: #f5f5f5; 
  min-height: 100vh; 
}
</style>