<template>
    <div v-if="!activeBuild.hasOwnProperty('uid')">
        <v-alert type="info" theme="dark" icon="mdi-vuetify" variant="outlined" class="mt-16" prominent>
            <p>You need to select the build first!</p>
            <p>If you don't have ny builds yet, head out to settings to add a new build.</p>
            <v-divider class="my-4"></v-divider>
            <div class="d-flex flex-row align-right">
                <v-btn @click.prevent="routeSettings" variant="outlined" color="blue-lighten-1" class="mb-2">Go to settings</v-btn>
              </div>
        </v-alert>
    </div>

    <div v-if="activeBuild.hasOwnProperty('uid')">
        <div class="mb-5">   
            <v-progress-linear v-if="progress < 100" :model-value="progress" color="light-blue" height="20" striped></v-progress-linear>
            <v-alert v-if="progress >= 100" color="green" icon="mdi-fire" variant="outlined">You are on fire! You finished the setup for heist, you can go there now!</v-alert>
        </div>
        <v-window hide-delimiters show-arrows="hover" v-model="currentLevel">
            <v-window-item v-for="step in activeBuild.steps" :key="step.level.toString()" :value="step.level">
                <v-timeline side="end">
                    <v-timeline-item size="large" dot-color="rgb(10,88,134)">
                        <template v-slot:icon><small><strong>{{ step.level }}</strong></small></template>

                        <template v-slot:opposite>

                            <div class="d-flex mb-6">
                                <v-sheet rounded="rounded" class="ma-2 align-stretch elevation-4 flex-shrink-0">
                                    <div class="title"><v-icon class="title-icon">mdi-help-circle-outline</v-icon>Tips</div>
                                    <div class="">
                                        <v-list density="compact" class="list-to-remember">
                                            <v-list-item v-for="(tip, index) in step.tips" :key="index" density="compact">{{ tip }}</v-list-item>
                                        </v-list>
                                    </div>
                                </v-sheet>
                            </div>

                        </template>

                        <div class="d-flex mb-6">

                            <v-sheet rounded="rounded" class="ma-2 align-stretch elevation-4 flex-shrink-0">
                                <div class="title"><v-icon class="title-icon">mdi-link-variant</v-icon>Prepare links</div>
                                <v-list density="compact">
                                    <v-list-item v-for="(sockets, index) in step.sockets" :key="index">
                                        <v-btn @click.prevent="socketsToClipboard(sockets)" icon="mdi-content-copy" variant="plain" size="x-small" class="mr-2"></v-btn>
                                        <Socket v-for="(socket, sIndex) in sockets" :key="sIndex" :color="socket.color" :text="socket.name" :nodash="sIndex == sockets.length - 1" />
                                    </v-list-item>
                                </v-list>
                            </v-sheet>

                            <v-sheet rounded="rounded" class="ma-2 align-stretch elevation-4 flex-grow-1">
                                <div class="title"><v-icon class="title-icon">mdi-diamond-stone</v-icon>Buys gems</div>
                                <div>
                                    <v-container class="gems-to-buy">
                                        <v-row v-for="(purchase, index) in step.purchases" :key="index">
                                            <v-col cols="2">
                                                <v-icon :color="purchase.color">mdi-circle-slice-8</v-icon>
                                            </v-col>
                                            <v-col>
                                                {{ purchase.name }}
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </div>
                            </v-sheet>
                        </div>
                    </v-timeline-item>
                </v-timeline>
                <v-sheet class="mt-10" elevation="5" style="height: 800px">
                    <iframe class="iframe" id="st" :src="step.skillTree" frameborder="0" style="width: 100%; height: 800px; border: 1px solid #292929"></iframe>
                </v-sheet>
                <div class="credits">Credit to www.poeskilltree.com for Skill Tree used in this app.</div>
            </v-window-item>
        </v-window>
    </div>
</template>

<script lang="ts">
import Socket from '../components/Socket.vue'
import Router from '../router/router'
import { store } from '../store/store'

export default {
    data: () => ({
        currentLevel: 0,
        progress: 0,
    }),
    components: {
        Socket
    },
    mounted () {
    },
    computed : {
        level() {
            const character: Character = store.character as Character
            
            if (!character) { 
                return 0
            }

            return character.level
        },
        activeBuild() {
            return store.activeBuild as Build
        }
    },
    watch: {
        level(newLevel, oldLevel) {
            const eligble = this.activeBuild.steps.filter((step) => (step.level <= newLevel))

            if (eligble.length < 1) {
                this.currentLevel = this.activeBuild.steps[0]?.level || 0
                this.progress = 0
                return
            }

            const maxLevel = Math.max(...eligble.map(step => step.level))
            const step: any = eligble.find(step => step.level == maxLevel)
            this.progress = (this.activeBuild.steps.indexOf(step)/(this.activeBuild.steps.length-1)) * 100
            console.log(this.progress)
            this.currentLevel = step.level
        },
    },
    methods: {
        routeSettings() {
            Router.route('/settings')
        },
        async socketsToClipboard(sockets: Array<any>) {
            var clipboard = ''

            sockets.forEach(socket => {
                clipboard = clipboard + socket.name.replaceAll(' ', '\\s') + '|'
            })

            clipboard = clipboard.substring(0, clipboard.length - 1)
            await window.electronApi.copyToClipboard(clipboard)
        }
    }
}
</script>

<style scoped>
.title {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    padding: 8px 10px 8px 10px;
    font-size: small;
    color: rgba(255,255,255,0.5);
    text-shadow: 0px 0px 3px #000;
    letter-spacing: 0.05rem;
    background-color: rgba(255,255,255,0.05);
}

.title-icon {
    margin-right: 10px;
    color: rgba(255,255,255,0.5);
    text-shadow: 0px 0px 3px #000;
}
.v-row {
    margin-top: 0 !important;
}
.v-container {
    padding: 5px 16px 10px !important;
}

.v-list-item--density-compact.v-list-item--one-line {
    min-height: auto !important;
}

.list-to-remember {
    font-size: small;
}

.gems-to-buy {
    font-size: small;
}

.credits{
    font-size: x-small;
    text-align: right;
    color: rgba(255,255,255,0.5);
    text-shadow: 0px 0px 3px #000;
    letter-spacing: 1px;
}
</style>