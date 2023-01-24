import { reactive } from "vue"

import characters from './modules/characters'

export const store = reactive({
    ...characters
})