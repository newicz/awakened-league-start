<template>
    <v-tooltip :text="text">
        <template v-slot:activator="{ props }" location="top">
            <v-snackbar :timeout="1000" color="primary" location="top right">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" @click.prevent="socketsToClipboard(text)" icon="mdi-circle-slice-8" variant="plain" :color="color" class="socket-button"></v-btn> <span v-if="!nodash" class="mr-1">-</span>
                </template>
                Copied to clipboard
            </v-snackbar>
        </template>
    </v-tooltip>
</template>

<script lang="ts">
export default {
    props: ['color', 'text', 'nodash'],
    methods: {
        async socketsToClipboard(name: string) {
            var clipboard = name.replaceAll(' ', '\\s')
            await window.electronApi.copyToClipboard(clipboard)
        }
    }
}
</script>

<style>
.socket-btn {
    min-width: auto;
    padding: 0 2px;
}

.v-tooltip .v-overlay__content {
    background: rgba(10,88,134, 0.95) !important;
    color: #fff !important;
}

.socket-button {
    margin: 0 !important;
    padding: 0 !important;
    width: 25px !important;
    height: 25px !important;
}
</style>