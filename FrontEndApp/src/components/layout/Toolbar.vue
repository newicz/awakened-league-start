<template>
    <v-app-bar prominent class="toolbar">
        <v-spacer></v-spacer>
        <div>Account: <strong>{{ account }}</strong></div>
        <v-divider vertical class="ml-10"></v-divider>
        <div class="select-container"><v-select @update:model-value="selectBuild" :items="builds" item-value="uid" item-title="name" class="select"></v-select></div>
        <v-divider vertical class="ml-10"></v-divider>
        <div class="select-container"><v-select @update:model-value="selectCharacter" :items="characters" item-title="name" class="select"></v-select></div>
        <v-btn @click="refreshCharacters" stacked prepend-icon="mdi-refresh-circle" :loading="refreshLoading">
            <template v-slot:loader>
                <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                </span>
            </template>
        </v-btn>
        <v-divider vertical class="mr-10"></v-divider>
        <div>Level: <strong>{{ level }}</strong></div>
        <v-divider vertical class="ml-10"></v-divider>
        <v-btn @click.prevent="openPatreon" prepend-icon="mdi-patreon" class="patreon">Patreon</v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import { PoeApiService } from '../../service/ApiService';
import { store } from '../../store/store';

export default {
    data: () => ({
        refreshLoading: false
    }),
    computed: {
        account() {
            return store.account
        },
        characters() {
            return store.characters
        },
        builds() {
            return store.builds
        },
        level() {
            const character: Character = store.character as Character
            if (!character) { 
                return 'n/a'
            }

            return character.level
        }
    },
    methods: {
        selectCharacter(characterName: any) {
            store.setCharacter(store.characters.find((v) => v.name == characterName) as Character)
        },
        selectBuild(uid: string) {
            const selected: Build = store.builds.find(build => build.uid == uid) as Build
            store.setActiveBuild(selected)
        },
        async refreshCharacters() {
            this.refreshLoading = true

            const characters = await PoeApiService.characters(store.account)

            if (characters.length == 0) {
                return
            }
            
            store.setCharacters(characters)

            this.refreshLoading = false
        },
        openPatreon() {
            window.electronApi.openLink('http://patreon.com')
        }
    }
}

</script>

<style scoped>
.toolbar {
    background: rgb(10,88,134);
    background: linear-gradient(90deg, rgba(10,88,134,1) 0%, rgba(1,163,186,1) 25%, rgba(1,117,186,1) 61%, rgba(1,154,186,1) 100%) !important;
    color: white;
  }
.select-container {
    margin-top: 0%;
    width: 250px;
    height: 55px;
}

.patreon {
    height: 70px !important;
    margin: 0 !important;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>