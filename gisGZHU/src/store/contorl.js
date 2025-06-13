import { defineStore } from 'pinia'
import LineString from 'ol/geom/LineString'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import { fromLonLat, toLonLat } from 'ol/proj'
import { Style, Stroke, Icon, Fill } from 'ol/style'
import Point from 'ol/geom/Point'
import { Polygon } from 'ol/geom'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useContorlStore = defineStore('contorl', {
  state: () => ({
    list: [],
    init: [
      // 直接作为返回对象的属性
      {
        name: '桂花岗',
        intorduction: '广州大学桂花岗',
        img: 'https://s2.loli.net/2025/06/03/gzkGDVItq3wJXKF.png',
        data: []
      }
    ],
    localArr: [
      {
        name: '南门',
        intorduction: '学校正门',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '北门',
        intorduction: '正门对着的',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '操场',
        intorduction: '学校操场,校园跑和军训场所',
        img: 'https://s2.loli.net/2025/06/03/Sys2jOJChH6BL7i.jpg',
        data: []
      },
      {
        name: '一号楼',
        intorduction: '学校一号楼,领导办公室和学院办公室',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '二号楼',
        intorduction: '学校二号楼,只有一楼教室是你可能用得上的地方',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '五号楼(图书馆)',
        intorduction: '图书馆一定是最重要的地方,剩下就是教学区域,分为南北楼',
        img: 'https://s2.loli.net/2025/06/03/VmwvZkWEJGtdrxz.jpg',
        data: []
      },
      {
        name: '饭堂',
        intorduction: '没有人不期待饭堂吧，别吃西北风味，滑蛋饭才是神',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '宿舍',
        intorduction: '一般,如果你在六号楼,那很恭喜了,好地方',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '后山篮球场',
        intorduction: '不去,死宅是见光死的生物',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '课室',
        intorduction: '11号楼的教室',
        img: 'https://s2.loli.net/2025/06/03/nheUPIly7Fs25bv.jpg',
        data: []
      },
      {
        name: '东源县上莞中学',
        intorduction: '上莞中学',
        img: 'https://s2.loli.net/2025/06/11/BG3oE46WfKA7Dgp.jpg',
        data: []
      },
      {
        name: '教室',
        intorduction: '教室',
        img: 'https://s2.loli.net/2025/06/11/URfAsYdqMX841GO.jpg',
        data: []
      },
      {
        name: '操场',
        intorduction: '操场',
        img: 'https://s2.loli.net/2025/06/11/9aDwTWuKl1B4M8t.jpg',
        data: []
      },
      {
        name: '宿舍',
        intorduction: '宿舍',
        img: 'https://s2.loli.net/2025/06/11/zUjk6cnTDVCtNb5.jpg',
        data: []
      },
      {
        name: '培英楼',
        intorduction: '培英楼',
        img: 'https://s2.loli.net/2025/06/11/S7n2GlOJV5KZjWQ.jpg',
        data: []
      },
      {
        name: '饭堂',
        intorduction: '饭堂',
        img: 'https://s2.loli.net/2025/06/11/F8xAQ7EYUluDbpy.jpg',
        data: []
      },
      {
        name: '菜市场',
        intorduction: '菜市场',
        img: 'https://s2.loli.net/2025/06/11/ZUJswDQd2YLNyGP.jpg',
        data: []
      },
      {
        name: '超市',
        intorduction: '超市',
        img: 'https://s2.loli.net/2025/06/11/G6nHLAKfw5aoYvr.jpg',
        data: []
      },
      {
        name: '政府',
        intorduction: '政府',
        img: 'https://s2.loli.net/2025/06/11/OQYwKxA1o5sgM2j.jpg',
        data: []
      }
    ],
    path: [
      {
        name: '南门1111111111',
        intorduction: '学校正门',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: [
          [113.26501458389775, 23.149860944010683],
          [113.26587649929671, 23.14974175766163]
        ],
        type: 'path'
      }
    ],
    intorduction: [
      {
        name: '不懂',
        intorduction: '学校',
        img: 'https://s2.loli.net/2025/06/03/gzkGDVItq3wJXKF.png',
        data: []
      }
    ],
    indexRecommendation: 0,
    recommendationCard: [],
    lineFeatureSource: null,
    lineFeatureLayer: null,
    featureIdCounter: 0, // 用于生成唯一的要素ID
    recommendation: false,
    dialog: false,
    //区块
    vectorLayer: null,
    listPopup: false,
  }),
  actions: {
    Init () {
      this.list = []
      this.list.push(...this.init)
    },
    local () {
      this.list.push(...this.localArr)
    },
    removeLocal () {
      const localSet = new Set(this.localArr)
      this.list = this.list.filter(item => !localSet.has(item))
    },
    dialogChange () {
      console.log(this.dialog)
      this.dialog = !this.dialog
    },
    pathChange () {
      this.list.push(...this.path)
    },
    removePath () {
      const pathSet = new Set(this.path)
      this.list = this.list.filter(item => !pathSet.has(item))
    },
    addIntoration () {
      this.list.push(...this.intorduction)
      this.recommendation = true
    },
    removeIntorduction () {
      const intorductionSet = new Set(this.intorduction)
      this.list = this.list.filter(item => !intorductionSet.has(item))
      this.recommendation = false
    },
    recommendationChange () {
      this.recommendation = !this.recommendation
    },
    nextRecommendation () {
      if (this.indexRecommendation >= this.intorduction.length) {
        this.indexRecommendation = 1
      }
      this.recommendationCard[0] =
        this.intorduction[this.indexRecommendation - 1]
      this.indexRecommendation++
    },
    initPathLine (map) {
      if (this.isLayerInitialized) return
      if (!map) {
        console.error('地图实例未提供，无法初始化路径线图层！')
        return
      }
      console.log('初始化路径线图层')
      this.lineFeatureSource = new VectorSource()
      this.lineFeatureLayer = new VectorLayer({
        source: this.lineFeatureSource
      })
      map.addLayer(this.lineFeatureLayer)
    },
    addPathLine (allWaypoints, options = {}) {
      if (!this.lineFeatureSource) {
        console.error(
          '错误的，你的路径线图层没有初始化，请调用initPathLine方法初始化路径线图层'
        )
        return null
      }

      const featureId = options.id || `line-feature-${this.featureIdCounter++}`
      const color = options.color || '#26a69a'
      const width = options.width || 4
      // 创建线要素并设置箭头样式
      const projectedCoordinates = allWaypoints.map(point =>
        fromLonLat([...point])
      )
      const lineGeometry = new LineString(projectedCoordinates)
      const lineFeature = new Feature({
        geometry: lineGeometry
      })

      // 使用箭头样式函数
      lineFeature.setStyle((feature, resolution) => {
        // 获取基础样式（包含箭头）
        const styles = this.arrowLineStyles(feature, resolution)

        const backgroundStyle = styles[0]
        backgroundStyle.getStroke().setColor(color)
        backgroundStyle.getStroke().setWidth(width)
        return styles
      })

      lineFeature.setId(featureId)
      this.lineFeatureSource.addFeature(lineFeature)
      return featureId
    },
    //移除那个线要素
    removePathLineById (featureId) {
      if (!this.lineFeatureSource) {
        console.warn('初始化失败')
        return false
      }

      const featureToRemove = this.lineFeatureSource.getFeatureById(featureId)
      if (featureToRemove) {
        this.lineFeatureSource.removeFeature(featureToRemove)
        console.log(`ID为 ${featureId} 的线要素已移除。`)
        return true
      } else {
        console.warn(`未找到ID为 ${featureId} 的线要素。`)
        return false
      }
    },
    // 箭头样式
    arrowLineStyles (feature, resolution) {
      let styles = []
      // 线条样式 - 使用导入的 Style 和 Stroke
      let backgroundLineStyle = new Style({
        stroke: new Stroke({
          color: 'green',
          width: 10
        })
      })
      styles.push(backgroundLineStyle)

      const routearrow = 'https://s2.loli.net/2025/06/07/FfCVRA5hyqUnNjL.png'
      let geometry = feature.getGeometry()
      const length = geometry.getLength()
      const step = 50
      const StepLength = step * resolution
      const arrowNum = Math.floor(length / StepLength)
      const rotations = []
      const distances = [0]

      geometry.forEachSegment(function (start, end) {
        let dx = end[0] - start[0]
        let dy = end[1] - start[1]
        let rotation = Math.atan2(dy, dx)
        distances.unshift(Math.sqrt(dx ** 2 + dy ** 2) + distances[0])
        rotations.push(rotation)
      })

      for (let i = 1; i < arrowNum; ++i) {
        const arrowCoord = geometry.getCoordinateAt(i / arrowNum)
        const d = i * StepLength
        const grid = distances.findIndex(x => x <= d)

        styles.push(
          new Style({
            geometry: new Point(arrowCoord),
            image: new Icon({
              // 使用导入的 Icon
              src: routearrow,
              opacity: 0.5,
              anchor: [0.5, 0.5],
              rotateWithView: false,
              rotation: -rotations[distances.length - grid - 1],
              scale: 0.7
            })
          })
        )
      }
      return styles
    },
    //绘制多边形
    async drawPolygon (map) {
      const coords = [
        [113.26418350033423, 23.1477920153297],
        [113.2672991605195, 23.146944431307276],
        [113.26813721588933, 23.148652864346758],
        [113.26667289151038, 23.149103511110894],
        [113.26648035759631, 23.150439571391487],
        [113.26711442978643, 23.152327178227168],
        [113.26535782527976, 23.152565996893173],
        [113.26415389229913, 23.147858482114486],
        [113.26418350033423, 23.1477920153297] // 闭合多边形
      ]

      const coordinates = [
        [113.36929957876885, 23.048498472159366],
        [113.37742403827666, 23.043569914781088],
        [113.37879369842622, 23.042008646157],
        [113.37969763008833, 23.040041259389454],
        [113.37984759542803, 23.03747967224443],
        [113.37979413846243, 23.0363155156775],
        [113.37398585534999, 23.03693257834405],
        [113.36916134803634, 23.036760400768316],
        [113.36601984190015, 23.03654461384167],
        [113.36574657974853, 23.040716906030653],
        [113.36551920832302, 23.043372110189907],
        [113.36901240549611, 23.04614134204246]
      ]
      //大学城校区的区块


      // 创建多边形要素
      const polygonFeature = new Feature({
        geometry: new Polygon([coords,coordinates]).transform('EPSG:4326', 'EPSG:3857')
      })

      // 创建矢量图层 - 修复了多余的 new 关键字
      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [polygonFeature]
        }),
        style: new Style({
          stroke: new Stroke({
            color: '#ff0000',
            width: 2
          }),
          fill: new Fill({
            color: 'rgba(255, 0, 0, 0.2)'
          })
        })
      })

      // 添加到地图
      await map.addLayer(this.vectorLayer)
    },
    async removePolygon (map) {
      await map.removeLayer(this.vectorLayer)
    },
    listPop () {
      this.listPopup=!this.listPopup
    }
  }
})
