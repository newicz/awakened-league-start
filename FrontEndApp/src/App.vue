<template>
  <div>
      <v-layout>

        <SystemBar></SystemBar>
        <Navigation></Navigation>
        
        <v-main>
          <Toolbar></Toolbar>
          <v-container>
            <component :is="currentView" />
          </v-container>
        </v-main>

      </v-layout>
  </div>
</template>

<script lang="ts">
import SystemBar from './components/layout/SystemBar.vue'
import Navigation from './components/layout/Navigation.vue'
import Toolbar from './components/layout/Toolbar.vue'

import Router from './router/router'
import Settings from './settings/settings'

export default {
  components: {
    SystemBar,
    Navigation,
    Toolbar
  },
  data: () => ({
    activeRoute: window.location.hash
  }),
  computed: {
    currentView ():any {
      return Router.view(this.activeRoute)
    }
  },
  mounted() {    
    window.addEventListener('hashchange', () => {
      this.activeRoute = window.location.hash
    })
  }
}
</script>

<style scoped>
</style>