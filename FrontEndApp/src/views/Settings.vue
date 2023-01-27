<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-sheet>
                    <div class="title"><v-icon class="title-icon">mdi-help-circle-outline</v-icon>Add new build</div>
                    <div class="pa-10">
                        <v-form>
                            <!-- <v-textarea variant="underlined" label="Build string"></v-textarea> -->
                            <v-text-field variant="underlined" label="Build Name"></v-text-field>
                            <v-select variant="underlined" label="Assendency">

                            </v-select>
                            <v-file-input variant="underlined" label="File with build"></v-file-input>
                            <v-btn class="primary">Save</v-btn>
                        </v-form>
                    </div>
                </v-sheet>

                <v-sheet class="mt-5">
                    <div class="title"><v-icon class="title-icon">mdi-help-circle-outline</v-icon>App settings</div>
                    <div class="pa-10">
                        <v-form>
                            <v-text-field v-model="poeAccount" variant="underlined" label="POE Account Name" disabled></v-text-field>
                            <v-text-field v-model="poeDir" variant="underlined" label="POE Installation Directory" disabled></v-text-field>
                            <v-btn class="primary">Reset</v-btn>
                        </v-form>
                    </div>
                </v-sheet>
            </v-col>
            <v-col class="d-flex justify-start flex-wrap">
                <v-card v-for="i in [1,2,3,4,5,6,7,8,9,10,11]"
                    :key="i"
                    width="350"
                    height="130"
                    :title="'Build #'+i"
                    subtitle="Shadow Trickster"
                    class="ma-2">
                    <v-card-text  class="d-flex justify-space-between ma-0 pb-0">
                        <v-btn class="primary">Activate</v-btn>
                        <v-btn class="secondary">Remove</v-btn>
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
</style>

<script lang="ts">
import Settings from '../settings/settings'

export default {
    data() {
        return {
            poeAccount: '',
            poeDir: '',
        }
    },
    async mounted() {
        this.poeAccount = await Settings.get('app.poe.account')
        this.poeDir = await Settings.get('app.poe.directory')
    },
    methods: {
    }
}
</script>