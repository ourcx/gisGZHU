<template>
    <q-dialog v-model="dialog" persistent :maximized="maximizedToggle" transition-show="slide-up"
        transition-hide="slide-down">
        <q-card class=" text-white" style="width: 100%;overflow: hidden;height: auto;min-width: 1000px;">
            <q-bar class="q-bar">
                <q-space />

                <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                    <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                </q-btn>
                <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                    <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                </q-btn>
                <q-btn dense flat icon="close" v-close-popup @click="ContorlStore.dialogChange()">
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>
            <!-- 这些都是头部栏 -->
            <div class="main">
                <div>
                    <!-- 这里是一个留言组件 -->
                    <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 100vh;color: black;padding-bottom: 50px;">
                        <q-intersection v-for="(item, i) in DialogStore.list" :key="i" class="q-pa-xs xh example-item"
                            transition="scale">
                            <div class="xh-containt">
                                <q-card>
                                    <q-parallax :src="item.img" :height="50" />
                                </q-card>
                                <div class="xh-s">
                                    <div class="xh-title">
                                        {{ item.title }}
                                    </div>
                                    <div class="xh-content">
                                        {{ item.content }}
                                    </div>
                                </div>
                            </div>
                        </q-intersection>
                        <div class="footer">
                            <q-btn round color="primary" icon="navigation" @click="sendData()" />
                        </div>
                    </q-scroll-area>
                </div>
            </div>
        </q-card>
    </q-dialog>

    <q-dialog v-model="icon">
        <q-card class="text-balck">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">发布评论</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <div class="q-gutter-sm title">
                    <p>标题</p>
                </div>
                <div class="q-pa-md" style="max-width: 600px">
                    <q-input standout v-model="obj.title" label="默认主题"/>
                </div>
                <div class="q-gutter-sm body">
                    <p>文本内容</p>
                </div>
                <div class="q-pa-md" style="max-width: 600px">
                    <q-input v-model="obj.content" filled autogrow />
                </div>
                <div class="q-gutter-sm body">
                    <p>内容背景</p>
                </div>
                <div>
                    <div class="q-gutter-sm">
                        <q-radio v-model="shape" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="喜多"
                            label="喜多" />
                        <q-radio v-model="shape" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                            val="风景" label="风景" />
                        <q-radio v-model="shape" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                            val="广州" label="广州" />
                        <q-radio v-model="shape" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                            val="代码" label="代码" />
                    </div>
                </div>
                <div class="bottom">
                    <q-btn color="secondary" label="发送" @click="sendTime()"/>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, computed, reactive,watch } from 'vue'
import { useContorlStore } from '../store/contorl'
import { useDialogStore } from '../store/card'


const shape = ref("喜多")
const icon = ref(false)
const DialogStore = useDialogStore()
const ContorlStore = useContorlStore()
const dialog = computed(() => ContorlStore.dialog);
const maximizedToggle = ref(true)
const barStyle = {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#027be3',
    width: '9px',
    opacity: 0.2
}
const thumbStyle = {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '5px',
}
const sendData = () => {
    icon.value = true
}

const obj = reactive({
    title: '标题',
    content: '内容',
    icon: '',
})

watch(shape, (newVal) => {
  obj.icon = newVal
}, { immediate: true }); // 初始化时立即执行一次



const sendTime = () => {
    DialogStore.addDialog(obj)
}   

</script>


<style scoped>
.q-bar {
    background-color: #145ea8;
}

.main {
    height: 100vh;
    width: 100%;
}


.xh-containt {
    width: 99vw;
    height: auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    padding: 10px;
}

.xh:last-child {
    margin-bottom: 100px;
}

.xh-s {
    display: flex;
    height: 100%;
    flex-direction: column;

    .xh-title {
        width: 100%;
        height: 30px;
        font-family: 'Courier New', Courier, monospace;
        font-weight: 900;
        font-size: 20px;
        border-bottom: 1px solid rgb(0, 0, 0);
    }

    .xh-content {
        width: auto;
        height: auto;
        font-family: 'Courier New', Courier, monospace;
        font-size: 15px;
        font-weight: 200;
        line-height: 25px;
        text-align: left;
        padding: 10px;
        text-indent: 2em;
        word-wrap: break-word;
    }
}

.footer {
    position: fixed;
    bottom: 50px;
    width: 100%;
    height: 50px;
    right: -95%;
}

.text-balck {
    color: rgb(0, 0, 0);
    background-color: #ffffff;
    width: 600px;
    height: auto;
    display: flex;
    flex-direction: column;
}

.title {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 900;
    font-size: 20px;
    border-bottom: 1px solid rgb(0, 0, 0);
    margin-top: 10px;
    color: rgb(0, 0, 0);
}

.body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 15px;
    font-weight: 200;
    line-height: 25px;
    text-align: left;
}

.bottom {   
    display: flex;
    width: 100%;
    justify-content: flex-end;
}
</style>