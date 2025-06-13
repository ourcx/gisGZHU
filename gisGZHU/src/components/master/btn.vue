<script setup>
import { ref, toRaw, watch, onUnmounted } from "vue";
import Feature from "ol/Feature";
import { useStore } from "../../model/store";
import { useContorlStore } from "../../store/contorl";
import { useChip } from "../../store/chip";
import intoraction from "../intoraction.vue";

const Chip = useChip();
const ContorlStore = useContorlStore();
const Store = useStore();
const model = ref([1]); // 默认选中 value=1 的选项（学校地点）
const options = ref([
  {
    label: "学校地点",
    value: 1, // 对应 model 中的初始值
  },
  {
    label: "出行路线",
    value: 2,
  },
  {
    label: "周边介绍",
    value: 3,
  },
  {
    label: "快递点",
    value: 4,
  },
  {
    label: "弹窗介绍",
    value: 5,
  },
  {
    label: "校历",
    value: 6,
  },
  {
    label: "报道准备",
    value: 7,
  },
]);

// 监听 model 变化
watch(
  () => [...model.value], // 创建数组副本用于比较
  (newVal, oldVal) => {
    // 找出新增的选项
    console.log("变化了", newVal);
    if (newVal.length == 0) {
      ContorlStore.Init();
    } else {
    }

    const added = newVal?.filter((item) => !oldVal?.includes(item));
    // 找出移除的选项
    const removed = oldVal?.filter((item) => !newVal?.includes(item));

    // 处理新增逻辑
    added?.forEach((value) => {
      switch (value) {
        case 1:
          ContorlStore.local();
          console.log("开启学校地点");
          Store.location = true;
          break;
        case 2:
          console.log("开启出行路线");
          ContorlStore.pathChange();
          // 处理路线相关逻辑
          break;
        case 3:
          console.log("开启周边介绍");
          ContorlStore.addIntoration();
          // 处理周边介绍逻辑
          break;
        case 4:
          console.log("开启点标注");
          // 处理点标注逻辑
          break;
        case 5:
          console.log("开启弹窗介绍");
          Chip.changeChip();
          // 处理弹窗逻辑
          break;
        case 6:
          console.log("开启校历");
          break;
        case 7:
          console.log("开启报道准备");
          ContorlStore.listPop();
          break;
      }
    });

    // 处理移除逻辑
    removed?.forEach((value) => {
      switch (value) {
        case 1:
          console.log("关闭学校地点");
          Store.location = false;
          ContorlStore.removeLocal();
          break;
        case 2:
          console.log("关闭出行路线");
          // 清理路线相关逻辑
          ContorlStore.removePath();
          break;
        case 3:
          console.log("关闭周边介绍");
          ContorlStore.removeIntorduction();
          // 清理周边介绍逻辑
          break;
        case 4:
          console.log("关闭点标注");
          // 清理点标注逻辑
          break;
        case 5:
          console.log("关闭弹窗介绍");
          if (!Chip.chip) return;
          Chip.changeChip();
          // 清理弹窗逻辑
          break;
        case 6:
          console.log("关闭校历");
          break;
        case 7:
          console.log("关闭报道准备");
          break;
      }
    });

    console.log("当前选中:", toRaw(newVal));
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <intoraction></intoraction>
  <div class="btn">
    <div class="q-pa-md" style="max-width: 300px">
      <div class="q-gutter-md">
        <q-badge color="secondary" multi-line> 已选择: "{{ model }}" </q-badge>
        <div id="ScaleLine"></div>
        <q-select
          filled
          v-model="model"
          :options="options"
          label="选择你的模式"
          multiple
          emit-value
          map-options
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps" style="color: #000">
              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                  class="q-ma-sm"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<style scoped>
#ScaleLine {
  width: 100%;
  height: 20px;
}
</style>
