<script setup>
import Btn from './btn.vue'
import List from './list.vue';
</script>

<template>
    
    <q-scroll-area class="fit">
        <div class="q-pa-sm">
            <q-img class="absolute-top" src="https://s2.loli.net/2025/02/02/ELbK6urJqYvgBPj.jpg" style="height: 150px"
                id="img" :img-style="{ opacity: 0.7 }">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="56px" class="q-mb-sm">
                        <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.T1Ir__YMxonBm9oaPK8dgwHaHa?rs=1&pid=ImgDetMain" >
                    </q-avatar>
                    <div class="text-weight-bold">广州大学</div>
                    <div>学校有大学城、桂花岗、黄埔三个校区，全校四万余人</div>
                </div>
            </q-img>
            <div class="containt">
                <Btn />
                <div class="scroll">
                    <List />
                </div>
            </div>
        </div>
    </q-scroll-area>

</template>


<style scoped>
#img {
    position: fixed;
    background-color: white;
}

.q-pa-sm {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.containt {
    top: 20%;
    position: relative;
}

</style>