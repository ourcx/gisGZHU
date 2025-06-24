import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    list: [
      {
        title: 'gisGZHU网站',
        content: '新生入学指引，根据地图组件查找相关的信息',
        icon: '喜多',
        img: 'https://s2.loli.net/2025/04/02/Wc3qF7w2OVNiKlG.jpg'
      },
      {
        title: '校园铁路',
        content:
          '你或许是一位爱探索的大一新生，你上的校区具有多年的历史。你前往了学校旁的铁路，向南在铁路旁触摸着‘Love And Peace’，向北经过了人烟阜盛的生活区。',
        icon: '广州',
        img: 'https://s2.loli.net/2025/01/19/CeDMHNGsSZYOmK4.jpg'
      },
      {
        title: '9号楼艺术之迹',
        content:
          '在退休工活动中心：5楼发现美术学院的辉煌历史；6楼与破碎雕塑的神秘对视；7楼废弃礼堂的孤独座椅；8楼舞蹈室镜中映出窗外天空与虚幻舞影。',
        icon: '广州',
        img: 'https://s2.loli.net/2025/01/19/CeDMHNGsSZYOmK4.jpg'
      },
      {
        title: '禁忌的二楼',
        content:
          '受研学长邀请，偶遇电梯无法到达的二楼。黑暗无声的空间里，残留着旧时代家具的痕迹与现代渗水的洼地，见证着时空交错的神秘。',
        icon: '广州',
        img: 'https://s2.loli.net/2025/01/19/CeDMHNGsSZYOmK4.jpg'
      },
      {
        title: '校园传说',
        content:
          '后山操场暗藏剧院秘闻与废弃设施；教学楼停车场流传着离奇事件；高楼层架空层飘荡着未解传说；2号楼顶层教室每夜亮起无人知晓的灯光。',
        icon: '广州',
        img: 'https://s2.loli.net/2025/01/19/CeDMHNGsSZYOmK4.jpg'
      },
      {
        title: '2号楼谜光',
        content:
          '基本无人使用的2号楼，最高层的教室总在傍晚亮起刺眼的灯光，如同黑暗中的灯塔，却从未有人见过进出者的身影。',
        icon: '广州',
        img: 'https://s2.loli.net/2025/01/19/CeDMHNGsSZYOmK4.jpg'
      }
    ],
    //基础留言列表
    iconList: {
      喜多: 'https://s2.loli.net/2025/04/02/Wc3qF7w2OVNiKlG.jpg',
      风景: 'https://s2.loli.net/2025/03/04/tQzyHhxs76Y1EU9.jpg',
      代码: 'https://s2.loli.net/2025/02/02/ELbK6urJqYvgBPj.jpg',
      广州: 'https://s2.loli.net/2025/01/19/CeDMHNGsSZYOmK4.jpg'
    }
  }),
  actions: {
    addDialog (obj) {
      // 创建新对象副本，断开引用
      //节流
      if (
        this.list.length > 0 &&
        this.list[this.list.length - 1].content === obj.content
      ) {
        return
      }

      const newItem = {
        title: obj.title,
        content: obj.content,
        icon: obj.icon,
        img: this.iconList[obj.icon] // 动态设置图片
      }
      this.list.push(newItem) // 推入新对象
    }
  }
})
