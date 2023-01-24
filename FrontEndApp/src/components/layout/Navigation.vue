<template>
    <v-navigation-drawer permanent :rail="collapsed">
        <v-list class="mb-1 mt-1" density="compact" nav>
            <v-list-item v-if="collapsed" prepend-icon="mdi-chevron-right" @click="collapsed = !collapsed"></v-list-item>
            <v-list-item v-if="!collapsed" append-icon="mdi-chevron-left" @click="collapsed = !collapsed"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
            <v-list-item v-for="item in items" :href="item.route" :key="item.route" :prepend-icon="item.icon" :title="item.title" :value="item.value" />
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
export default {
    data() {
        return {
            collapsed: true,
            items: [
                { value: 'campaing', title: 'Campaign', icon: 'mdi-plus-circle-multiple-outline', route: '#/' },
                { value: 'heist', title: 'Infinite Heist', icon: 'mdi-all-inclusive', route: '#/heist' },
                { value: 'settings', title: 'Settings', icon: 'mdi-cog-transfer', route: '#/settings' },
            ]
        }
    }
}
</script>