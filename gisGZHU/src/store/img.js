import { defineStore } from 'pinia'

export const useImgStore = defineStore('img', {
  state: () => ({
    list: [],
    kong: [
      {
        title: '洗漱',
        description: '正常的高中风格',
        image: 'https://s2.loli.net/2025/06/24/WwgBC6ErdusAxNP.jpg',
        tags: ['洗漱', '清晨', '清爽'],
        date: '2025-06-01',
        likes: 15
      },
      {
        title: '床',
        description: '很硬，跟高中一样的住宿',
        image: 'https://s2.loli.net/2025/06/24/vnsRtxuBKaw4IOh.jpg',
        tags: ['睡眠', '舒适', '休息'],
        date: '2025-06-15',
        likes: 28
      },
      {
        title: '书桌',
        description:
          '跟高中不同的只有多了一个桌子，女生宿舍没有桌子，研究生有上床下桌',
        image: 'https://s2.loli.net/2025/06/24/6ipEIzal1YZCbJG.jpg',
        tags: ['书桌', '整洁', '工作'],
        date: '2025-06-20',
        likes: 22
      }
    ],
    Canteen: [
        {
            title: '食堂',
            description: '等我更新喵',
            image: '',
            tags: ['食堂', '干净', '吃'],
            date: '2025-06-20',
            likes: 22
        }
    ]
  }),
  actions: {
    addImg (imgList) {
      this.list=[...imgList]
    }
  }
})
//这个是控制chip的显示
