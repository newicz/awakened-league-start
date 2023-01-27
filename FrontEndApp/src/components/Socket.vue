<template>
    <v-tooltip :text="text">
        <template v-slot:activator="{ props }" location="top">
            <v-icon v-bind="props" :color="color">mdi-circle-slice-8</v-icon> <span v-if="!nodash" class="mr-1">-</span>
        </template>
    </v-tooltip>
</template>

<script lang="ts">
export default {
    props: ['color', 'text', 'nodash']
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
</style>