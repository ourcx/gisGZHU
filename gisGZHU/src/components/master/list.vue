<template>
  <q-scroll-area style="height: 450px; max-width: 300px;">
    <div class="q-pa-md" style="max-width: 350px">
      <q-list v-for="(item, index) in list" :key="index">
        <q-item v-ripple:ripColor>
          <div class="img">
            <q-img :src="item.img" style="height: 50px; width: 70px">
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  加载不出图片
                </div>
              </template>
            </q-img>
          </div>
          <q-item-section class="desc">
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption class="text-grey">{{ item.intorduction }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-badge color="teal" label="10k" />
          </q-item-section>
        </q-item>
        <q-popup-edit 
          v-model="label" 
          v-slot="scope"
          auto-save 
          anchor="top left" 
          maxWidth="100px"
        >
          <div 
            class="col-6" 
            style="padding: 16px; background-color: white; border-radius: 8px;"
          >
            <!-- 关键修改：添加.stop修饰符阻止事件冒泡 -->
            <q-img 
              :src="item.img" 
              style="border-radius: 8px;" 
              @click.stop="thumbAlert(item.img)"
            >
              <div class="absolute-bottom text-center">
                {{ item.name }}
              </div>
            </q-img>
            <div style="margin-top: 12px; color: #444; line-height: 1.5; font-size: 0.9rem;">
              {{ item.intorduction }}
            </div>
          </div>
        </q-popup-edit>
        <q-separator spaced inset />
      </q-list>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, computed } from "vue";
import { useContorlStore } from "../../store/contorl"

const ContorlStore = useContorlStore()
const list = computed(() => ContorlStore.list);
const label = ref('Click me')

</script>

<style scoped>
/* .q-pa-md{
    overflow-y: scroll;
} */

.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 101.63px;
}

.text-grey {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999 !important;
  max-width: 80%;
}

.absolute-full {
  width: 200px;
  height: 200px;
}
</style>