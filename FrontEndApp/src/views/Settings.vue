<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-sheet>
                    <div class="title"><v-icon class="title-icon">mdi-help-circle-outline</v-icon>Add new build</div>
                    <div class="pa-10">
                        <v-form>
                            <v-alert v-if="showWrongFormatAlert" density="compact" color="deep-orange" icon="mdi-fire" class="mb-5" type="error" variant="outlined">Wrong format!</v-alert>
                            <v-textarea v-model="buildString" variant="underlined" label="Build string"></v-textarea>
                            <!-- <v-file-input variant="underlined" label="File with build"></v-file-input> -->
                            <v-btn @click.prevent="addBuild" class="primary">Save</v-btn>
                        </v-form>
                    </div>
                </v-sheet>

                <v-sheet class="mt-5">
                    <div class="title"><v-icon class="title-icon">mdi-help-circle-outline</v-icon>App settings</div>
                    <div class="pa-10">
                        <v-form>
                            <v-text-field v-model="poeAccount" variant="underlined" label="POE Account Name" disabled></v-text-field>
                            <v-text-field v-model="poeDir" variant="underlined" label="POE Installation Directory" disabled></v-text-field>
                            <v-btn @click.prevent="resetConfig" class="primary" :disabled="resetConfigConfirmation">Reset</v-btn>
                            <v-alert v-if="resetConfigConfirmation" color="error" title="Are you sure?" variant="tonal" class="mt-5">
                                <div class="mt-5">
                                    This will reset all configuration and make application restart.
                                </div>
                                <v-divider class="my-4 bg-light-blue-lighten-4"></v-divider>
                                <div class="d-flex flex-row align-center justify-space-between">
                                    <v-btn color="error" @click.prevent="resetConfigConfirmed">I am sure</v-btn>
                                </div>
                            </v-alert>
                        </v-form>
                    </div>
                </v-sheet>
            </v-col>
            <v-col class="d-flex justify-start flex-wrap">
                <v-card v-for="(build, index) in builds"
                    :key="index"
                    width="350"
                    height="140"
                    :title="build.name"
                    :subtitle="build.ascendancy"
                    class="ma-2">
                    <v-chip class="ma-2 uid" color="pink" text-color="white" label>{{ build.uid }}</v-chip>
                    <v-chip class="ma-2 active" color="green" text-color="white" v-if="activeBuild && activeBuild.uid == build.uid" label>ACTIVE</v-chip>
                    <v-card-text  class="d-flex justify-space-between ma-0 pb-0">
                        <v-btn class="primary">Activate</v-btn>
                        <v-btn v-if="activeBuild && activeBuild.uid == build.uid" disabled class="secondary">Remove</v-btn>
                        <v-btn v-if="!activeBuild || activeBuild.uid != build.uid" @click.prevent="removeBuild(build.uid)" class="secondary">Remove</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>

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

.uid {
    font-size: x-small !important;
    padding: 5px 10px !important;
    margin: 0 !important;
    height: auto !important;
    position: absolute !important;
    top: 0;
    right: 0;
}

.active {
    font-size: x-small !important;
    padding: 5px 10px !important;
    margin: 0 !important;
    height: auto !important;
    position: absolute !important;
    top: 30px;
    right: 0;
}
</style>

<script lang="ts">
import Settings from '../settings/settings'
import { store } from '../store/store'

export default {
    data() {
        return {
            poeAccount: '',
            poeDir: '',
            resetConfigConfirmation: false,
            showWrongFormatAlert: false,
            buildString: '',
            builds: [] as Array<Build>,
        }
    },
    async mounted() {
        this.poeAccount = await Settings.get('app.poe.account')
        this.poeDir = await Settings.get('app.poe.directory')

        this.builds = await window.electronApi.buildList() as Array<Build>
        console.log(this.builds)
        console.log(this.activeBuild)
    },
    computed: {
        activeBuild(): any {
            return store.activeBuild
        }
    },
    methods: {
        resetConfig() {
            this.resetConfigConfirmation = true
        },
        resetConfigConfirmed() {
            window.appSettings.resetConfig()
        },
        async addBuild() {
            this.showWrongFormatAlert = false

            console.log('Validation: start')

            if (!this.buildString || this.buildString == '') {
                this.showWrongFormatAlert = true
                console.log('Validation: no string')
                return
            }

            try {
                const build = JSON.parse(this.buildString)

                if (!build.hasOwnProperty('name') || !build.hasOwnProperty('ascendancy') || !build.hasOwnProperty('steps')) {
                    this.showWrongFormatAlert = true
                    console.log('Validation: no 1st level properties')
                    throw Error('Validation: no 2nd level properties')
                }

                build.steps.forEach((step: any) => {
                    if (!step.hasOwnProperty('level') || !step.hasOwnProperty('skillTree') || !step.hasOwnProperty('purchases') || !step.hasOwnProperty('sockets') || !step.hasOwnProperty('tips')) {
                        this.showWrongFormatAlert = true
                        console.log('Validation: no 2nd level properties')
                        throw Error('Validation: no 2nd level properties')
                    }
                });

                // save build
                window.electronApi.buildSave(this.buildString)
                this.buildString = ''

                this.builds = await window.electronApi.buildList() as Array<Build>
                store.setBuilds(this.builds)

            } catch (err: any) {
                this.showWrongFormatAlert = true
                return
            }
        },
        async removeBuild (uid: string) {
            window.electronApi.buildRemove(uid)
            this.builds = await window.electronApi.buildList() as Array<Build>
            store.setBuilds(this.builds)
        }
    }
}
</script>