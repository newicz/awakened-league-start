<template>
    <div>
        <v-alert v-if="showErrorMessage" color="deep-orange" icon="mdi-fire" class="mb-5" type="error" variant="outlined">{{ errorMessage }}</v-alert>
        <v-form @submit.prevent="submit">
            <v-text-field v-model="poeAccount" variant="underlined" label="POE Account Name"></v-text-field>
            <v-text-field v-model="poeDir" variant="underlined" label="POE Installation Directory"></v-text-field>
            <v-btn variant="elevated" color="primary" size="large" type="submit" :loading="loading">Save</v-btn>
        </v-form>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Settings from '../settings/settings'

export default {
    data() {
        return {
            poeAccount: '',
            poeDir: '',
            errorMessage: '',
            showErrorMessage: false,
            loading: false
        }
    },
    async mounted() {
        this.poeAccount = await Settings.get('app.poe.account')
        this.poeDir = await Settings.get('app.poe.directory')
    },
    methods: {
        async submit() {
            this.showErrorMessage = false
            
            if (!this.poeAccount || !this.poeDir) {
                this.errorMessage = "All information are required!"
                this.showErrorMessage = true
                return
            }

            this.loading = true

            await Settings.set('app.poe.account', this.poeAccount)
            await Settings.set('app.poe.directory', this.poeDir)

            setTimeout(()=>(this.loading = false), 500)
        }
    }
}
</script>