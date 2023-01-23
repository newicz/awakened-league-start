<template>
  <div>
      <v-layout>

        <SystemBar></SystemBar>
        <Navigation></Navigation>
        
        <v-main>
          <Toolbar></Toolbar>
          <v-container>LOL</v-container>
        </v-main>

      </v-layout>
  </div>
</template>

<script lang="ts">
import SystemBar from './components/layout/SystemBar.vue'
import Navigation from './components/layout/Navigation.vue'
import Toolbar from './components/layout/Toolbar.vue'

export default {
  components: {
    SystemBar,
    Navigation,
    Toolbar
  }
}
</script>
