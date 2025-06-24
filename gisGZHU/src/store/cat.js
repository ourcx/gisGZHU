
import { defineStore } from 'pinia'

export const useCatStore = defineStore('cat', {
  state: () => ({
    data: [
      {
        name: '菀苑/碗碗',
        url: 'https://s2.loli.net/2025/06/19/iSdOcU5DvsFE7Rk.png',
        intoractions: '入园时间:2023-04-19，性格:软萌好盘,见人就蹭,喜欢贴贴'
      },
      {
        name: '小茶',
        url: 'https://s2.loli.net/2025/06/19/fHS65d4oBbmsl8U.jpg',
        intoractions: '入园时间:2024-09-01 性格:软萌好盘,见人就蹭,撒娇求撸'
      },
      {
        name: '小刘海',
        url: 'https://s2.loli.net/2025/06/19/mXuB7MV14yLhD8x.jpg',
        intoractions: '怕人和搞笑,看起来非常可爱，让人想摸，非常有趣'
      },
      {
        name: '大橘/口炎猫',
        url: 'https://s2.loli.net/2025/06/19/9qSMERZ2dDolQNT.png',
        intoractions: '被弃养的小猫，口炎病久。软萌，喜欢蹭人和贴贴'
      },
      {
        name: '马仁杰/骂人姐',
        url: 'https://s2.loli.net/2025/06/19/NpyMESi1jsq5aUJ.jpg',
        intoractions: '话痨，会进课室大叫，喜欢贴贴'
      },
      {
        name: '点点',
        url: 'https://s2.loli.net/2025/06/19/6AZNMyDYrBvgCTh.png',
        intoractions: '软萌好盘，喜欢贴贴，特别好摸的三花'
      },
      {
        name: '小土',
        url: 'https://s2.loli.net/2025/06/19/fRztm75QDaTwGAF.jpg',
        intoractions: '软萌好盘，会撒娇，有腮黄的雀猫'
      },
      {
        name: '小白领',
        url: 'https://s2.loli.net/2025/06/19/Sk3qwJ7U5fExVva.png',
        intoractions: '生人勿近，非常胆小，橘家三姐妹'
      },
      {
        name: '小白/岁岁',
        url: 'https://s2.loli.net/2025/06/19/GE35z17nHRK8uDv.png',
        intoractions: '胆小，橘家三姐妹'
      },
      {
        name: '北区小橘',
        url: 'https://s2.loli.net/2025/06/19/6jlxhDObQNR1dsV.png',
        intoractions: '橘家三姐妹的老大，怕人，但好吃'
      }
    ],
    chipData: []
  }),
  actions: {
    clearDatas () {
      this.chipData=[...this.data]
      this.data = []
    },
    initData () {
      this.data = [
        ...this.data,
        ...this.chipData
      ]
    }
  }
})
//这个是控制chip的显示
