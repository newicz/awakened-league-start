<template>
    <div>
        <div class="mb-5">   
            <v-progress-linear v-if="progress < 100" :model-value="progress" color="light-blue" height="20" striped></v-progress-linear>
            <v-alert v-if="progress >= 100" color="green" icon="mdi-fire" variant="outlined">You are on fire! You finished the setup for heist, you can go there now!</v-alert>
        </div>
        <v-window hide-delimiters show-arrows="hover" v-model="currentLevel">
            <v-window-item v-for="step in items" :key="step.level" :value="step.level">
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
import { store } from '../store/store'

export default {
    data: () => ({
        items: [
            { 
                level: 10,
                skillTree: 'https://poeskilltree.com/?v=3.20.1#AAAABAMAAAj0JbItHz1fTLNSU1crYoZqG2pDbRmXlZf0nr29gt-K6QI=',
                sockets: [ 
                    [
                        {name: 'Toxic Rain', color: 'green'}, 
                        {name: 'Toxic Rain', color: 'green'}, 
                        {name: 'Toxic Rain', color: 'green'}, 
                        {name: 'Toxic Rain', color: 'green'}, 
                        {name: 'Greater Multiple Projectiles', color: 'green'}, 
                        {name: 'Pierce', color: 'green'}
                    ], 
                    [
                        {name: 'Determination', color: 'red'}, 
                        {name: 'Hearald of Ice', color: 'green'}, 
                        {name: 'Enfeeble', color: 'blue'}
                    ] 
                ],
                purchases: [
                    {name: 'Toxic Rain', color: 'green'},
                    {name: 'Determination', color: 'red'}, 
                    {name: 'Hearald of Ice', color: 'green'}
                ],
                tips: [
                    'Remember about +1 chaos bow',
                    'Make sure to look for nn boots'
                ]
            },
            { 
                level: 12,
                skillTree: 'https://poeskilltree.com/?v=3.20.1#AAAABAMAAAQHCPQe7iBuJbItHzI0PV9Ms1AwUlNXK1m8XY5ihmobakNtGYdllSCXlZf0nIueva-3vYLBfsHzxSjfiukC9ls=',
                sockets: []
            },
            { level: 18 },
            { level: 20 },
            { level: 36 },
            { level: 42 },
            { level: 45 },
            { level: 59 },
            { level: 63 },
        ] as Array<any>,
        currentLevel: 0,
        progress: 0,
    }),
    components: {
        Socket
    },
    mounted () {
        this.currentLevel = this.items[0]?.level || 0

    },
    computed : {
        level() {
            const character: Character = store.character as Character
            
            if (!character) { 
                return 0
            }

            return character.level
        }
    },
    watch: {
        level(newLevel, oldLevel) {
            const eligble = this.items.filter((step) => (step.level <= newLevel))

            if (eligble.length < 1) {
                this.currentLevel = this.items[0]?.level || 0
                return
            }

            const maxLevel = Math.max(...eligble.map(step => step.level))
            const step = eligble.find(step => step.level == maxLevel)
            this.progress = (this.items.indexOf(step)/(this.items.length-1)) * 100
            console.log(this.progress)
            this.currentLevel = step.level
        },
    },
    methods:  {
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