import { defineStore } from 'pinia'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useContorlStore = defineStore('contorl', {
  state: () => ({
    list: [],
    init: [  // 直接作为返回对象的属性
      {
        name: '桂花岗',
        intorduction: '广州大学桂花岗',
        img:"https://s2.loli.net/2025/06/03/gzkGDVItq3wJXKF.png",
        data: []
      }
    ],
    localArr: [
      {
        name: '南门',
        intorduction: '学校正门',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      },
      {
        name: '北门',
        intorduction: '正门对着的',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      },
      {
        name:'操场',
        intorduction: '学校操场,校园跑和军训场所',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      },
      {
        name:'一号楼',
        intorduction: '学校一号楼,领导办公室和学院办公室',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      },
      {
        name:'二号楼',
        intorduction: '学校二号楼,只有一楼教室是你可能用得上的地方',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      },
      {
        name:'五号楼(图书馆)',
        intorduction: '图书馆一定是最重要的地方,剩下就是教学区域,分为南北楼',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      },
      {
        name:'饭堂',
        intorduction: '没有人不期待饭堂吧，别吃西北风味，滑蛋饭才是神',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      },
      {
        name:'宿舍',
        intorduction: '一般,如果你在六号楼,那很恭喜了,好地方',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      },
      {
        name:'后山篮球场',
        intorduction: '不去,死宅是见光死的生物',
        img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        data: []
      }
    ],
  }),
  actions: {
    Init() {
      this.list = [];
      this.list.push(
        ...this.init
      )
    },
    local(){
      this.list.push(
        ...this.localArr
      )
    }
  }
})