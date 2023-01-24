import { reactive } from "vue"

export const store = reactive({

    // Settings
    poeAccount: '',
    poeCharacterName: '',
    poeDir: '',
    poeLogFilePath: '',

    setPoeAccount(account: string) {
        this.poeAccount = account
    },

    getPoeAccountName() {
        return this.poeAccount
    },

    setPoeCharacter(character: string) {
        this.poeCharacterName = character
    },

    getPoeCharacterName() {
        return this.poeCharacterName
    },

    setPoeDir(directory: string) {
        this.poeDir = directory
        this.setPoeLogFilePath()
    },

    getPoeDir() {
        return this.poeDir
    },

    setPoeLogFilePath() {
        this.poeLogFilePath = this.poeDir + '/logs/Client.txt'
    },

    getPoeLogFilePath() {
        return this.poeLogFilePath
    }
})