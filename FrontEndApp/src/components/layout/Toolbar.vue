<template>
    <v-toolbar prominent class="toolbar">
        <v-spacer></v-spacer>
        <div>Account: <strong>{{ settings.accountName }}</strong></div>
        <v-divider vertical class="ml-10 mr-10"></v-divider>
        <div>Character: <strong>{{ settings.characterName }}</strong></div>
        <v-divider vertical class="ml-10 mr-10"></v-divider>
        <div>Level: <strong>68</strong></div>
        <v-divider vertical class="ml-10 mr-5"></v-divider>
        <v-btn icon="mdi-heart"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
    </v-toolbar>
</template>

<script lang="ts">
import { store } from '../../store/store'

export default {
    data: () => ({}),
    computed: {
        settings() {
            return {
                accountName: store.poeAccount,
                characterName: store.poeCharacterName,
            }
        }
    },
}

</script>

<style scoped>
.toolbar {
    background: rgb(10,88,134);
    background: linear-gradient(90deg, rgba(10,88,134,1) 0%, rgba(1,163,186,1) 25%, rgba(1,117,186,1) 61%, rgba(1,154,186,1) 100%);
    color: white;
  }
</style>