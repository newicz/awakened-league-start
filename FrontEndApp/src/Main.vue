<template>
    <Loading v-if="loading"></Loading>
    <div v-if="loading && settings" class="d-flex justify-center mb-6 mt-16 bg-surface-variant form">
        <v-form @submit.prevent="submit">
            <v-alert density="compact" color="deep-orange" icon="mdi-fire" class="mb-5" type="error" variant="outlined">You need to setup PoE information.</v-alert>
            <v-alert v-if="showErrorMessage" density="compact" color="deep-orange" icon="mdi-fire" class="mb-5" type="error" variant="outlined">{{ errorMsg }}</v-alert>
            <v-text-field v-model="poeAccount" variant="underlined" label="POE Account Name"></v-text-field>
            <v-text-field v-model="poeDir" variant="underlined" label="POE Installation Directory"></v-text-field>
            <v-btn variant="elevated" color="primary" size="large" type="submit">Save</v-btn>
        </v-form>
    </div>
    <App v-if="!loading"></App>
</template>

<script lang="ts">
declare global {
    interface Window {
        browserWindow:any;
        electronApi:any;
        appSettings:any;
    }
}

import Loading from './Loading.vue'
import App from './App.vue'
import Settings from './settings/settings'
import { PoeApiService } from './service/ApiService'
import { store } from './store/store'
import PoeLogService from './service/PoeLogService'

export default {
    components: {
        Loading,
        App,
    },
    data: () => ({
        loading: true,
        settings: false,
        poeAccount: '',
        poeDir: '',
        showErrorMessage: false,
        errorMsg: ''
    }),
    methods: {
        async submit() {
            if (!this.poeAccount || !this.poeDir) {
                this.showErrorMessage = true
                this.errorMsg = 'Information are required.'
                return
            }

            await Settings.set('app.poe.account', this.poeAccount)
            await Settings.set('app.poe.directory', this.poeDir)

            window.location.reload()
        }
    },
    async mounted() {
        const account = await Settings.get('app.poe.account')
        const directory = await Settings.get('app.poe.directory')
        // Check if settings are set
            // if not display form and save results into electron settings
        if (!account || !directory) {
            this.settings = true
            return
        }

        // Load characters into state
        const characters = await PoeApiService.characters(account)

        if (characters.length == 0) {
            this.showErrorMessage = true
            this.errorMsg = 'There is no characters (either server error or wrong account)'
            return
        }

        store.setAccount(account)
        store.setCharacters(characters)

        // Load builds into state
        const builds = await window.electronApi.buildList()
        store.setBuilds(builds)

        // Start watching file when we know what file to watch from settings
        window.electronApi.startWatchingPoeLogFile(directory + PoeLogService.CLIENT_LOG_PATH)

        // Recieve new line in CLient.txt log file
        window.electronApi.onPoeLogFileUpdate((event: any, line: any) => {
            PoeLogService.process(line)
        })

        setTimeout(() => { this.loading = false }, 1000)
    }
}
</script>

<style scoped>
form {
    min-width: 400px;
}
</style>