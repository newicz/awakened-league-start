import { reactive } from "vue"

import builds from "./modules/builds"
import characters from './modules/characters'

export const store = reactive({
    ...characters,
    ...builds
})