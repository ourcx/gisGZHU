
import { defineStore } from 'pinia'


export const useChip = defineStore('Chip', {
    state: () => ({
        chip: false
    }),
    actions: {
        changeChip() {
            console.log(this.chip)
            this.chip = !this.chip
        },
    }
})
//这个是控制chip的显示