<template>
    <v-navigation-drawer permanent :rail="collapsed">
        <v-list class="mb-1 mt-1" density="compact" nav>
            <v-list-item v-if="collapsed" prepend-icon="mdi-chevron-right" @click="collapsed = !collapsed"></v-list-item>
            <v-list-item v-if="!collapsed" append-icon="mdi-chevron-left" @click="collapsed = !collapsed"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
            <v-list-item v-for="route in routes" :href="'#' + route.path" :key="route.id" :prepend-icon="route.icon" :title="route.id" :value="route.id" :active="activeItem == '#'+route.path ? true : false" />
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Router from '../../router/router'

export default {
    data() {
        return {
            collapsed: true,
            routes: Router.ROUTES,
            activeItem: window.location.hash
        }
    },
    mounted() {
        window.addEventListener('hashchange', () => {
            this.activeItem = window.location.hash
        })
    }
}
</script>