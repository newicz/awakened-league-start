<template>
    <v-btn @click.prevent="scroll">Scroll now</v-btn>
    <v-timeline side="end">

        <v-timeline-item size="large" dot-color="rgb(10,88,134)" v-for="i in ['1','2','3','4','5','6','7','8','9','10','11','12','13']" :id="i" :ref="'a'+i">
            <template v-slot:icon><small><strong>10</strong></small></template>

            <template v-slot:opposite>

                <div class="d-flex mb-6">
                    <v-sheet rounded="rounded" class="ma-2 align-stretch elevation-4">
                        <div class="title"><v-icon class="title-icon">mdi-diamond-stone</v-icon>Passive skills</div>
                        <div class="pa-5">
                            <div style="width: 400px; height: 300px; background-color: cyan"></div>
                        </div>
                    </v-sheet>
                </div>

            </template>

            <div class="d-flex mb-6">
                <v-sheet rounded="rounded" class="ma-2 align-stretch elevation-4 flex-shrink-0">
                    <div class="title"><v-icon class="title-icon">mdi-diamond-stone</v-icon>Prepare links</div>
                    <v-list density="compact">
                        <v-list-item>
                            <Socket color="blue" text="Toxic Rain" /> - 
                            <Socket color="blue" text="Toxic Rain" /> - 
                            <Socket color="green" text="Toxic Rain" />
                        </v-list-item>
                        <v-list-item>
                            <Socket color="green" text="Toxic Rain" /> - 
                            <Socket color="green" text="Toxic Rain" /> - 
                            <Socket color="green" text="Toxic Rain" /> - 
                            <Socket color="green" text="Toxic Rain" /> - 
                            <Socket color="green" text="Toxic Rain" /> - 
                            <Socket color="red" text="Toxic Rain" />
                        </v-list-item>
                    </v-list>
                </v-sheet>
                <v-sheet rounded="rounded" class="ma-2 align-stretch elevation-4 flex-grow-1">
                    <div class="title"><v-icon class="title-icon">mdi-diamond-stone</v-icon>Buys gems</div>
                    <div>
                        <v-container>
                            <v-row>
                                <v-col cols="1">
                                    <v-icon color="blue">mdi-circle-slice-8</v-icon>
                                </v-col>
                                <v-col>
                                    Controlled destruction
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="1">
                                    <v-icon color="blue">mdi-circle-slice-8</v-icon>
                                </v-col>
                                <v-col>
                                    Controlled destruction
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="1">
                                    <v-icon color="blue">mdi-circle-slice-8</v-icon>
                                </v-col>
                                <v-col>
                                    Controlled destruction
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                </v-sheet>
            </div>

        </v-timeline-item>

    </v-timeline>
</template>

<script lang="ts">
import Socket from '../components/Socket.vue'

export default {
    data: () => ({
        items: Array.from({ length: 100 }, (k, v) => v + 1)
    }),
    components: {
        Socket
    },
    mounted () {
        setTimeout(() => {

        }, 3000)
    },
    computed : {
        top() {
            let el = document.getElementById('13')
            if (el) {
                console.log(el)
                console.log(el.getBoundingClientRect())
            }
            return 1600
        }
    },
    methods:  {
        scroll() {
            console.log(this.$refs['a13'].value.getBoundingClientRect())
            window.scrollTo({ top: this.top, behavior: 'smooth' })

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
</style>