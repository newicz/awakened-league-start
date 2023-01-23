<template>
    <v-navigation-drawer :rail="collapsed">
        <v-list class="mb-1 mt-1" density="compact" nav>
            <v-list-item v-if="collapsed" prepend-icon="mdi-chevron-right" @click="collapsed = !collapsed"></v-list-item>
            <v-list-item v-if="!collapsed" append-icon="mdi-chevron-left" @click="collapsed = !collapsed"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
            <v-list-item prepend-icon="mdi-plus-circle-multiple-outline" title="Campaign" value="campaign"></v-list-item>
            <v-list-item prepend-icon="mdi-all-inclusive" title="Infinite Heist" value="heist"></v-list-item>
            <v-list-item prepend-icon="mdi-cog-transfer" title="Settings" value="settings"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
export default {
    data() {
        return {
        collapsed: true
        }
    }
}
</script>