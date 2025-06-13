<template>
  <div class="q-pa-md q-gutter-sm" >
    <q-dialog v-model="card" no-backdrop-dismiss>
      <q-card class="my-card cards" >
        <q-img :src="CardData[0].img" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis title">
              {{ CardData[0].name }}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              未知距离
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey">
            {{ CardData[0].intorduction }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat color="primary" label="下一张" @click="ContorlStore.nextRecommendation()"/>
          <q-btn flat color="primary" round icon="event" @click="ContorlStore.recommendationChange()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref ,computed,onMounted} from 'vue'
import {useContorlStore} from '../store/contorl'
// 响应式变量声明
const ContorlStore = useContorlStore()
const card = computed(() => ContorlStore.recommendation )
const stars = ref(3)
const CardData = computed(() => ContorlStore.recommendationCard)

onMounted(() => {
    ContorlStore.nextRecommendation()
})

// 静态常量
const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!'
</script>


<style scoped>
.cards{
    width: 350px;
    height: 450px;
     overflow-y: hidden;
}
.title{
    font-size: 20px;
    font-weight: bold;
    color: #656565;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: left;
    text-overflow: ellipsis;
}
</style>