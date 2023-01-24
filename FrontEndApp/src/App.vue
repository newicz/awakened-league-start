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

import LeagueStart from './views/LeagueStart.vue'
import InfiniteHeist from './views/InfiniteHeist.vue'
import NotFound from './views/NotFound.vue'
import Settings from './views/Settings.vue'

const routes = {
  '/': LeagueStart,
  '/heist': InfiniteHeist,
  '/settings': Settings
}

export default {
  components: {
    SystemBar,
    Navigation,
    Toolbar,
    LeagueStart
  },
  data() {
    return {
      activeRoute: window.location.hash
    }
  },
  computed: {
    currentView ():any {
      return routes[this.activeRoute.slice(1) || '/'] || NotFound
    }
  },
  methods: {
    routeTo(route: string) {
      window.location.hash = route
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.activeRoute = window.location.hash
    })

    this.routeTo('#/settings')
  }
}
</script>

<style scoped>
</style>