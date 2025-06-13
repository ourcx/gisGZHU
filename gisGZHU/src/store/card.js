import { defineStore } from 'pinia'


export const useDialogStore = defineStore('dialog', {
    state: () => ({
        list: [
            {
                title: 'gisGZHU网站',
                content: '新生入学指引，根据地图组件查找相关的信息',
                icon: '喜多',
                img: "https://s2.loli.net/2025/04/02/Wc3qF7w2OVNiKlG.jpg"
            }
        ],
        iconList: {
            "喜多": "https://s2.loli.net/2025/04/02/Wc3qF7w2OVNiKlG.jpg",
            "风景": "https://s2.loli.net/2025/03/04/tQzyHhxs76Y1EU9.jpg",
            "代码": "https://s2.loli.net/2025/02/02/ELbK6urJqYvgBPj.jpg",
            "广州": "https://s2.loli.net/2025/01/19/CeDMHNGsSZYOmK4.jpg"
        }
    }),
    actions: {
        addDialog(obj) {
            // 创建新对象副本，断开引用
            //节流
            if (this.list.length > 0 && this.list[this.list.length - 1].content === obj.content) {
                return
            }

            const newItem = {
                title: obj.title,
                content: obj.content,
                icon: obj.icon,
                img: this.iconList[obj.icon]  // 动态设置图片
            }
            this.list.push(newItem)  // 推入新对象
        }
    }
})