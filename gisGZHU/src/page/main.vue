<script setup>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import { onMounted, ref, computed, watch, toRaw } from 'vue';
import { addPoint, point, updateLabelSize, removePoint, startPoint } from "../utils/point"
import { changeMap } from "../utils/change"
import screenfull from 'screenfull' // 确保已安装 screenfull 包
import { useRoute } from 'vue-router'
import { useStore } from '../model/store';
import Drawer from '../components/master/drawer.vue';
import ScaleLine from 'ol/control/ScaleLine.js';


const Store = useStore()
const mapElement = ref(null)
const mapList = ref(["标准地图", "卫星地图"])
//不一样的底图
// 创建高德地图的 XYZ 瓦片源  
const amapSource = new XYZ({
    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}&lang=zh_cn&scale=1&size=1',
    // 高德地图的瓦片服务可能有不同的 URL 格式和参数，这里是一个示例  
});

const maeketSource = new XYZ({
    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}&lang=zh_cn&scale=1&size=1'
})


let changeMapX = ''

//卫星底图
const initMap = () => {


    // 创建 OpenLayers 图层，使用上面创建的瓦片源  
    const amapLayer = new TileLayer({
        source: amapSource,
    });

    const maeketLayer = new TileLayer({
        source: maeketSource
    })

    const views = new View({
        center: fromLonLat([113.265910, 23.150009]), // 设置地图中心点坐标（例如：北京）  
        zoom: 17, // 设置初始缩放级别  
        //   projection:"EPSG:4326"
        maxZoom: 18, // 设置最大缩放级别  
    })
    // 创建 OpenLayers 地图实例  
    const map = new Map({
        target: mapElement.value,
        layers: [amapLayer],
        view: views,
        canvas: {
            willReadFrequently: true // 关键配置
        },
        controls: [
            new ScaleLine({
            }),
        ]
    });
    // 创建数据源
    const source = new VectorSource();

    // 创建矢量图层
    const vectorLayer = new VectorLayer({
        source: source
    });

    // 添加到地图
    map.addLayer(vectorLayer);

    // 绑定点击事件
    map.on('click', (evt) => {
        const coordinate = evt.coordinate; // 修正变量名拼写
        const pointFeature = new Feature({
            geometry: new Point(coordinate)
        });
        source.addFeature(pointFeature);

        // 飞行漫游效果
        const view = map.getView();
        view.animate({
            center: coordinate,
            duration: 1000, // 动画时长（毫秒）
            zoom: 15 // 可选：调整缩放级别
        });
    });

    //点标签
    // 基于点属性的悬浮提示方案
    // 4. 核心事件监听
    map.on('pointermove', (event) => {
        // 1. 获取点击像素坐标
        const pixel = map.getEventPixel(event.originalEvent);

        // 2. 检测要素（带容差和图层过滤）
        const features = map.getFeaturesAtPixel(pixel, {
            hitTolerance: 5, // 推荐扩大检测范围（单位：像素）
            layerFilter: (layer) => {
                // 严格验证图层实例
                return layer === vectorLayer && layer.getVisible();
            }
        });

        // 4.3 处理检测结果
        if (features.length > 0) {
            const feature = features[0];
            const geometry = feature.getGeometry();

            // 4.4 确认是点要素
            if (geometry.getType() === 'Point') {
                // 4.5 获取要素属性
                const props = feature.getProperties();
                // 4.6 设置提示内容
                tooltip.innerHTML = `
        <div class="tooltip-content">${props.text}</div>
      `;

                // 4.7 转换坐标到屏幕位置
                const coord = geometry.getCoordinates();
                const pixelPos = map.getPixelFromCoordinate(coord);

                // 4.8 定位提示框
                tooltip.style.display = 'block';
                tooltip.style.left = `${pixelPos[0]}px`;
                tooltip.style.top = `${pixelPos[1] - 15}px`; // 上移15像素避免遮挡
                return;
            }
        }

        // 5. 无要素时隐藏提示
        tooltip.style.display = 'none';
    });



    // 监听修改事件
    map.on('click', (e) => {
        const coord = e.coordinate
        console.log('新坐标：', toLonLat(coord));
    });

    map.getView().on('change:resolution', () => {
        updateLabelSize(map, views);
    });

    //添加中心点
    addPoint([113.265910, 23.150009], source, map, '广州大学桂花岗校区', "又称小桂花,是大部分文科大一学生和部分研究生生活的地方,位于广州市中心区域,比较老旧")


    // 监听单个属性
    watch(
        () => Store.location,
        (newVal, oldVal) => {
            console.log('count 变化:', oldVal, '→', newVal)
            if(Store.location){
                startPoint(source,map)
            }else{
                removePoint(source, map)
            }
        },
         { deep: true,immediate:true }
    )


    changeMapX = (n) => {
        changeMap(n, map, amapLayer, maeketLayer)
    }


}

//html
const drawerRight = ref(true)



//全屏
const toggleFullscreen = () => {
    if (screenfull.isEnabled && mapElement.value) {
        // 使用全屏库切换全屏状态
        screenfull.toggle(mapElement.value)

        // 如果只想请求全屏不切换可以用：
        // screenfull.request(mapRef.value)
    }
}




onMounted(() => {
    initMap()
})
</script>


<template>
    <div class="q-pa-md">
        <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
            <q-header elevated>
                <q-bar>
                    <q-icon name="laptop_chromebook" />
                    <div>GZHU地图</div>

                    <q-space />

                    <q-btn dense flat icon="minimize" />
                    <q-btn dense flat icon="crop_square" />
                    <q-btn dense flat icon="close" />
                </q-bar>

                <div class=" q-pl-md row items-center">
                    <div class="cursor-pointer non-selectable">
                        区域
                        <q-menu>
                            <q-list dense style="min-width: 100px;color: #000;">
                                <q-item clickable v-close-popup @click="toggleFullscreen">
                                    <q-item-section>打开全屏</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section>新建</q-item-section>
                                </q-item>

                                <q-separator />

                                <q-item clickable>
                                    <q-item-section>相关</q-item-section>
                                    <q-item-section side>
                                        <q-icon name="keyboard_arrow_right" />
                                    </q-item-section>

                                    <q-menu anchor="top end" self="top start" style="color: #000;">
                                        <q-list>
                                            <q-item v-for="n, index in mapList" :key="n" dense clickable
                                                @click="changeMapX(index)">
                                                <q-item-section>{{ n }}</q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-item>

                                <q-separator />

                                <q-item clickable v-close-popup>
                                    <q-item-section>退出</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </div>

                    <div class="q-ml-md cursor-pointer non-selectable">
                        编辑
                        <q-menu auto-close>
                            <q-list dense style="min-width: 100px;color: #000;">
                                <q-item clickable>
                                    <q-item-section>剪切</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>复制</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>粘贴</q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item clickable>
                                    <q-item-section>选择全部</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </div>
                    <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" id="menu-btn" />
                </div>
            </q-header>


            <q-drawer side="right" v-model="drawerRight" show-if-above bordered :width="300" :breakpoint="500"
                class="bg-grey-3" lazy>
                <Drawer></Drawer>
            </q-drawer>

            <q-page-container>
                <q-page class="q-pa-md">
                    <div id="map" ref="mapElement"></div>
                    <div id="tooltip" class="tooltip"></div>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<style scoped>
.q-pa-md {
    width: 100%;
    height: 100% !important;
    padding: 0 10px !important;
    color: black;
}

.ol-hidden {
    display: none !important;
}

#menu-btn {
    position: relative !important;
    right: 0 !important;
    margin-left: 92%;
}

#map {
    width: 100%;
    height: 85vh;
}

/* CSS样式 */
.tooltip {
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    pointer-events: none;
    /* 关键：防止提示框阻挡地图事件 */
    transform: translate(-50%, -100%);
    /* 精确定位 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    min-width: 120px;
    /* 初始隐藏 */
    display: none;
}



.containt {
    top: 20%;
    position: relative;
}




</style>