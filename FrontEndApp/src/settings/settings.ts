export default class Settings {
    static async get(key: string) {
        return await window.appSettings.getConfig(key)
    }

    static async set(key: string, value: string) {
        await window.appSettings.setConfig(key, value)
    }

    static async has(key: string) {
        const value = await Settings.get(key)
        return (!value || value == '') ? false : true
    }
}