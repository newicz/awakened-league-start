<template>
    <v-toolbar prominent class="toolbar">
        <v-spacer></v-spacer>
        <div>Account: <strong>{{ account }}</strong></div>
        <v-divider vertical class="ml-10"></v-divider>
        <div class="select-container"><v-select @update:model-value="select" :items="characters" item-title="name" class="select"></v-select></div>
        <v-divider vertical class="mr-10"></v-divider>
        <div>Level: <strong>{{ level }}</strong></div>
        <v-divider vertical class="ml-10 mr-5"></v-divider>
        <v-btn icon="mdi-heart"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
    </v-toolbar>
</template>

<script lang="ts">
import { store } from '../../store/store';

export default {
    data: () => ({}),
    computed: {
        account() {
            return store.account
        },
        characters() {
            return store.characters
        },
        level() {
            if (!store.character || !store.character.hasOwnProperty('level')) { 
                return 'n/a'
            }

            return store.character.level
        }
    },
    methods: {
        select(characterName: any) {
            console.log(characterName)
            store.setCharacter(store.characters.find((v) => v.name == characterName))
            console.log(store.character)
        }
    }
}

</script>

<style scoped>
.toolbar {
    background: rgb(10,88,134);
    background: linear-gradient(90deg, rgba(10,88,134,1) 0%, rgba(1,163,186,1) 25%, rgba(1,117,186,1) 61%, rgba(1,154,186,1) 100%);
    color: white;
  }
.select-container {
    margin-top: 0%;
    width: 250px;
    height: 55px;
}
</style>