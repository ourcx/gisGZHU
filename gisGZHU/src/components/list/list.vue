<template>
  <!-- 
    我们将 transition-show 和 transition-hide 从 'rotate' 改为更平滑的 'scale'，
    这对于条款类对话框来说，体验更佳。
  -->
  <q-dialog
    v-model="basic"
    transition-show="scale"
    transition-hide="scale"
    no-backdrop-dismiss
  >
    <!-- 
      为 q-card 添加一个自定义 class 'terms-dialog'，以便在 <style> 中进行样式控制。
    -->
    <q-card class="terms-dialog">
      <!-- 头部区域 -->
      <q-card-section class="row items-center dialog-header">
        <div class="text-h6">清单</div>
        <q-space />
        <!-- 将关闭按钮也放在头部，这更符合常见的UI设计模式 -->
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
          @click="contorlStore.listPop()"
        />
      </q-card-section>

      <!-- 
        内容区域：
        - 这是可滚动的核心部分。
        - 添加了一个 'scroll-area' class 以便自定义滚动条样式。
      -->
      <q-card-section class="q-pt-none scroll scroll-area">
        <div class="q-pa-md list-body">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            required
            :row-class="(row) => (row.essential ? 'text-weight-bold' : '')"
            rows-per-page-label="当前一页含有的项目数"
            :rows-per-page-options="[5,15, 25, 50, 100]"
          ></q-table>
        </div>
      </q-card-section>

      <!-- 分割线，让内容和操作区域分离得更清晰 -->
      <q-separator />

      <!-- 
        操作按钮区域：
        - 通过 'dialog-actions' class 来固定在底部。
        - 调整了按钮样式，让“接受”按钮更突出。
      -->
      <q-card-actions align="right" class="dialog-actions">
        <q-btn
          unelevated
          label="收到"
          color="primary"
          v-close-popup
          @click="contorlStore.listPop()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useContorlStore } from "../../store/contorl";

const contorlStore = useContorlStore();
const basic = computed(() => contorlStore.listPopup);
const columns = [
  {
    name: "item",
    required: true,
    label: "物品名称",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category",
    align: "center",
    label: "类别",
    field: "category",
    sortable: true,
    filter: true, // 启用筛选
  },
  {
    name: "essential",
    label: "是否必需",
    field: "essential",
    sortable: true,
    format: (val) => (val ? "必需" : "可选"),
  },
  {
    name: "quantity",
    label: "建议数量",
    field: "quantity",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "notes",
    label: "备注说明",
    field: "notes",
  },
];

const rows = [
  {
    name: "身份证",
    category: "证件类",
    essential: true,
    quantity: "原件+复印件3份",
    notes: "复印件建议多准备几份",
  },
  {
    name: "录取通知书",
    category: "证件类",
    essential: true,
    quantity: "1份",
    notes: "原件及学校要求的复印件",
  },
  {
    name: "证件照",
    category: "证件类",
    essential: true,
    quantity: "10张",
    notes: "一寸、二寸蓝白底各准备",
  },
  {
    name: "床上用品",
    category: "生活用品",
    essential: true,
    quantity: "1套",
    notes: "床单、被褥、枕头等",
  },
  {
    name: "洗漱用品",
    category: "生活用品",
    essential: true,
    quantity: "1套",
    notes: "牙刷、牙膏、毛巾、沐浴露等",
  },
  {
    name: "常用药品",
    category: "生活用品",
    essential: false,
    quantity: "适量",
    notes: "感冒药、创可贴、体温计等",
  },
  {
    name: "文具套装",
    category: "学习用品",
    essential: true,
    quantity: "1套",
    notes: "笔、笔记本、文件夹等",
  },
  {
    name: "笔记本电脑",
    category: "电子产品",
    essential: false,
    quantity: "1台",
    notes: "根据专业需求准备",
  },
  {
    name: "插线板",
    category: "电子产品",
    essential: true,
    quantity: "1-2个",
    notes: "宿舍插座通常不够用",
  },
  {
    name: "现金/银行卡",
    category: "财务类",
    essential: true,
    quantity: "适量",
    notes: "准备少量现金应急",
  },
  {
    name: "换洗衣物",
    category: "衣物类",
    essential: true,
    quantity: "3-5套",
    notes: "根据季节准备",
  },
  {
    name: "运动鞋",
    category: "衣物类",
    essential: true,
    quantity: "1-2双",
    notes: "体育课必备",
  },
  {
    name: "水杯/水壶",
    category: "生活用品",
    essential: true,
    quantity: "1个",
    notes: "宿舍和上课都需要",
  },
  {
    name: "台灯",
    category: "电子产品",
    essential: false,
    quantity: "1个",
    notes: "宿舍熄灯后使用",
  },
  {
    name: "防晒霜",
    category: "军训用品",
    essential: true,
    quantity: "1瓶",
    notes: "SPF50+，防止晒伤",
  },
  {
    name: "大水杯",
    category: "军训用品",
    essential: true,
    quantity: "1个",
    notes: "容量建议1L以上",
  },
  {
    name: "透气鞋垫",
    category: "军训用品",
    essential: false,
    quantity: "2-3双",
    notes: "缓解站军姿的疲劳",
  },
   {
    name: "充电宝",
    category: "电子产品",
    essential: true,
    quantity: "1个",
    notes: "容量20000mAh以内",
  },
  {
    name: "耳机",
    category: "电子产品",
    essential: true,
    quantity: "1副",
    notes: "建议有线无线各备一副",
  },
];
</script>

<style scoped>
.terms-dialog {
  /* 使用 max-width 和 width: 100% 实现响应式布局。
    在小屏幕上它会适应屏幕宽度，在大屏幕上最大宽度为600px。
  */
  max-width: 700px;
  width: 100%;

  /* 使用 vh (视口高度) 单位来限制对话框的最大高度，
    确保它不会在内容过多时撑满整个屏幕。
  */
  max-height: 80vh;

  /* 这是实现“头部/脚部固定，内容滚动”的关键。
    Flex 布局让我们可以灵活控制子元素的尺寸和排列。
  */
  display: flex;
  flex-direction: column;

  border-radius: 8px; /* 更柔和的圆角 */
}

.dialog-header {
  /* flex-shrink: 0; 确保头部不会在 flex 容器空间不足时被压缩。
    这保证了它高度的固定。
  */
  flex-shrink: 0;
  background-color: #f5f5f5; /* 给头部一个淡淡的背景色以示区分 */
  border-bottom: 1px solid #e0e0e0; /* 添加底部边框线 */
  color: #000;
}

.scroll-area {
  /* flex-grow: 1; 让内容区域占据所有可用的垂直空间。
    overflow-y: auto; 当内容超出时，自动显示垂直滚动条。
  */
  flex-grow: 1;
  overflow-y: auto;
}

.dialog-actions {
  /* 同样，确保脚部操作栏不会被压缩。 */
  flex-shrink: 0;
  background-color: #fff; /* 确保背景色为白色，覆盖可能透出的内容 */
  padding-top: 8px;
  padding-bottom: 8px;
}

/* 优化正文文本的可读性 */
.terms-text {
  line-height: 1.7; /* 增加行高，阅读更舒适 */
  color: #555; /* 使用深灰色而不是纯黑，视觉上更柔和 */
  text-align: justify; /* 两端对齐，更显规整 */
}

/* (可选) 美化滚动条，提升细节体验 */
.scroll-area::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.scroll-area::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #cccccc;
}

.scroll-area::-webkit-scrollbar-thumb:hover {
  background-color: #b3b3b3;
}
.list-body {
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>
