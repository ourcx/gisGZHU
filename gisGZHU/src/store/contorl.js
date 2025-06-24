import { defineStore } from 'pinia'
import LineString from 'ol/geom/LineString'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import { fromLonLat, toLonLat } from 'ol/proj'
import { Style, Stroke, Icon, Fill } from 'ol/style'
import Point from 'ol/geom/Point'
import { Polygon } from 'ol/geom'
import {
  addPoint,
  point,
  updateLabelSize,
  removePoint,
  startPoint
} from '../utils/point'
import { map } from 'd3'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useContorlStore = defineStore('contorl', {
  state: () => ({
    Map: null,
    Source: null,
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
        img: 'https://s2.loli.net/2025/06/17/ASBcPixzg2JpYFM.png',
        data: []
      },
      {
        name: '足球场',
        intorduction: '学校操场,校园跑和军训场所',
        img: 'https://s2.loli.net/2025/06/03/Sys2jOJChH6BL7i.jpg',
        data: []
      },
      {
        name: '1号楼',
        intorduction: '学校一号楼,领导办公室和学院办公室',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '2号楼',
        intorduction: '学校二号楼,只有一楼教室是你可能用得上的地方',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        data: []
      },
      {
        name: '5号楼(图书馆)',
        intorduction: '图书馆一定是最重要的地方,剩下就是教学区域,分为南北楼',
        img: 'https://s2.loli.net/2025/06/03/VmwvZkWEJGtdrxz.jpg',
        data: []
      },
      {
        name: '饭堂',
        intorduction: '没有人不期待饭堂吧，别吃西北风味，滑蛋饭才是神',
        img: 'https://s2.loli.net/2025/06/17/YR32rnvshKFETyu.jpg',
        data: []
      },
      {
        name: '宿舍',
        intorduction: '一般,如果你在六号楼,那很恭喜了,好地方',
        img: 'https://s2.loli.net/2025/06/17/mNSur6dPY7nqZD4.png',
        data: []
      },
      {
        name: '后山',
        intorduction: '不去,死宅是见光死的生物',
        img: 'https://s2.loli.net/2025/06/17/HFkaGuosvWM9j4r.png',
        data: []
      },
      {
        name: '课室',
        intorduction: '11号楼的教室',
        img: 'https://s2.loli.net/2025/06/03/nheUPIly7Fs25bv.jpg',
        data: []
      },
      {
        name: '9号楼',
        intorduction:
          '不可言语的教室，我一直看着你（其实是废弃的美术教室）9号楼废弃楼层守则 1. 7楼雕塑陈列室每日19:00后禁止入内。2. 若听见石膏碎裂声，请勿回头，缓步倒退至楼梯间。3. 所有雕塑眼睛均朝固定方向，如发现某雕塑注视你，立即闭眼默数10秒。4. 请不要注视墙壁画作超过9秒，若超过请及时联系保安。',
        img: 'https://s2.loli.net/2025/06/13/m4KHpaBUnxzbDde.png',
        data: []
      },
      {
        name: '铁路',
        intorduction:
          '铁路涂鸦区安全指南：1. 铁路年久失修，进入时请注意涂鸦时间。2. 铁路口设有保安亭，请向保安出示涂鸦证明。3. 仅允许沿涂鸦墙侧单向行走，严禁踏上铁轨。4. 如遇铁轨震动，无论是否听见鸣笛，请立刻面朝“爱与和平”涂鸦静立。5. 涂鸦内容每日更新，若发现“爱与和平”字样消失，30秒内必须离开铁路区域。6. 如偶遇列车经过时，切勿与车窗内人影对视。',
        img: 'https://s2.loli.net/2025/06/13/5eHx4roGFhcZPMk.png',
        data: []
      },
      {
        name: '北区学术交流中心',
        intorduction:
          '研究生宿舍（原酒店）二楼须知 1. 二楼正式楼梯永久封闭，寻找入口请遵循校内流浪猫动向。2. 入口仅出现在消防栓旁或配电箱铁门后，出现时间不超过5分钟。3. 进入后，任何情况下不得打开照明设备。4. 若脚下积水深度超过脚踝，请沿原路安静撤离，勿跑动。5. 听见积水中有脚步声跟随，可停下轻哼校歌，直至声音消失。',
        img: 'https://s2.loli.net/2025/06/14/Vghe4OEkcGvUY9n.png',
        data: []
      },
      {
        name: '女生宿舍自习室',
        intorduction: '在饭堂三楼,只有女生能去，注意自习室守则哦',
        img: 'https://s2.loli.net/2025/06/17/GnuxOPLfcwSFdav.png',
        data: []
      }
    ],
    path: [
      {
        name: '南门',
        intorduction: '学校正门',
        img: 'https://s2.loli.net/2025/06/17/ASBcPixzg2JpYFM.png',
        data: [
          [113.26501458389775, 23.149860944010683],
          [113.26587649929671, 23.14974175766163]
        ],
        type: 'path',
        show:false
      },
      {
        name: '梓元岗地铁站',
        intorduction: '梓元岗地铁站',
        img: 'https://s2.loli.net/2025/06/17/ASBcPixzg2JpYFM.png',
        data: [
          [113.26558514764852, 23.14981790831878],
          [113.26274366730087, 23.150009197280013],
          [113.2631992835829, 23.153315020150586]
        ],
        type: 'path',
        show:false
      },
      {
        name: '广州火车站',
        intorduction: '广州火车站',
        img: 'https://s2.loli.net/2025/06/17/ASBcPixzg2JpYFM.png',
        data: [
          [113.26557985911741, 23.149797802594804],
          [113.26278130143069, 23.150004868049237],
          [113.26196016047142, 23.145938952133434],
          [113.25900708110724, 23.14672187770779],
          [113.25832031853295, 23.147362808263736],
          [113.25729017434405, 23.147798639260913]
        ],
        type: 'path',
        show:false
      },
      {
        name: '铁路涂鸦区',
        intorduction: '铁路涂鸦区',
        img: 'https://s2.loli.net/2025/06/13/5eHx4roGFhcZPMk.png',
        data: [
          [113.26601059818056, 23.147229819783163],
          [113.26658576157453, 23.148397309403364],
          [113.26654725609032, 23.149699890044786],
          [113.26664168581327, 23.1508258814424],
          [113.26716234455965, 23.152074380314488],
          [113.2679435368569, 23.153748614835834],
        ],
        type: 'path',
        show:false
      }
    ],
    intorduction: [
      {
        name: '外围街道',
        intorduction: '大门走出来那条街道上的食物，暂时没有全部店面图片',
        img: 'https://s2.loli.net/2025/06/24/H8cZoFUziJAIxgy.jpg',
        data: []
      },
      {
        name: '周边',
        intorduction: '周边的街景，暂时没有全部图片',
        img: 'https://s2.loli.net/2025/06/24/NQVIR6gnxYeJGki.jpg',
        data: []
      },
      {
        name:"公园",
        introduction:"公园的街景，暂时没有全部图片---越秀公园，流花湖公园，麓湖公园等",
        img:"",
        data:[]
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
    ShowImg: false,
    ShowImgUrl: '',
    Express: [
      {
        name: '快宝驿站',
        intorduction: '快宝驿站',
        img: 'https://store.is.autonavi.com/showpic/541f033d82ca1e762127e41456210941',
        data: []
      },
      {
        name: '菜鸟驿站',
        intorduction: '菜鸟驿站',
        img: 'https://store.is.autonavi.com/showpic/1564029cfc2074e9e53d3a01a37f7564',
        data: []
      },
      {
        name: '韵达快递',
        intorduction: '顺丰快递在它旁边',
        img: 'https://s2.loli.net/2025/06/24/N3VvsETY6doGMCp.png',
        data: []
      },
      {
        name: '快递柜',
        intorduction: '快递柜，绿色的',
        img: '',
        data: []
      },
      {
        name: '自提点',
        intorduction: '北区门口，邮政和其他同城到付的，还有京东的，都会打电话叫你出来拿',
      }
    ]
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
      const arrowConfig = {
        lineWidth: 10, // 线条宽度
        arrowScale: 0.3, // 箭头缩放比例
        arrowSpacing: 50, // 箭头间距（像素）
        arrowOpacity: 0.5 // 箭头透明度
      }
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
              opacity: arrowConfig.arrowOpacity,
              anchor: [0.5, 0.5],
              rotateWithView: false,
              rotation: -rotations[distances.length - grid - 1],
              scale: arrowConfig.arrowScale,
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
        geometry: new Polygon([coords, coordinates]).transform(
          'EPSG:4326',
          'EPSG:3857'
        )
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
      this.listPopup = !this.listPopup
    },
    //新生清单
    //快递驿站
    getExpress () {
      this.list.push(...this.Express)
      point(
        [113.26659621497198, 23.149949771534395],
        this.Source,
        this.Map,
        '快宝驿站',
        '快宝驿站',
        'express'
      )
      point(
        [113.2663379488922, 23.15024116976791],
        this.Source,
        this.Map,
        '菜鸟驿站',
        '菜鸟驿站',
        'express'
      )
      point(
        [113.2640395184309, 23.14892530686278],
        this.Source,
        this.Map,
        '顺丰快递',
        '顺丰快递',
        'express'
      )
      point(
        [113.2649556833839, 23.14979289686113],
        this.Source,
        this.Map,
        '快递柜',
        '快递柜',
        'express'
      )
    },
    removeExpress () {
      const pathSet = new Set(this.Express)
      this.list = this.list.filter(item => !pathSet.has(item))
      removePoint(this.Source, this.Map, '.express')
    },
    showImgFu (url = null) {
      if (url) {
        this.ShowImg = true
        this.ShowImgUrl = url
      } else {
        this.ShowImg = false
      }
    }
  }
})
