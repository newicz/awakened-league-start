<template>
  <div>
      <v-layout>

        <v-system-bar color="blue-grey-darken-4" window>
          <v-icon icon="mdi-image-filter-drama" class="me-2"></v-icon>
          <span>Awakened League Start</span>

          <v-spacer></v-spacer>

          <div class="v-system-bar-controls">
            <v-btn @click="systemMinimize" id="system-minimize-button" icon="mdi-minus" size="x-small" variant="text"></v-btn>
            <v-btn @click="systemMaximize" id="system-maximize-button" icon="mdi-checkbox-blank-outline" size="x-small" variant="text" class="ms-2"></v-btn>
            <v-btn @click="systemClose" id="system-close-button" icon="mdi-close" variant="text" size="x-small" class="ms-2"></v-btn>
          </div>
        </v-system-bar>

        <v-navigation-drawer :rail="collapsed">
          <v-list class="mb-1 mt-1" density="compact" nav>
            <v-list-item v-if="collapsed" prepend-icon="mdi-chevron-right" @click="collapsed = !collapsed"></v-list-item>
            <v-list-item v-if="!collapsed" append-icon="mdi-chevron-left" @click="collapsed = !collapsed"></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <v-toolbar prominent class="toolbar">
            <v-spacer></v-spacer>
            <v-btn icon="mdi-heart"></v-btn>
            <v-btn icon="mdi-magnify"></v-btn>
          </v-toolbar>

          <v-container>LOL</v-container>
        </v-main>

      </v-layout>
  </div>
</template>

<script lang="ts">
import LeagueStart from './components/LeagueStart.vue'

export default {
  data() {
    return {
      collapsed: true
    }
  },
  methods: {
    systemClose: function () {
      window.browserWindow.systemClose();
    },
    systemMinimize: function () {
      window.browserWindow.systemMinimize();
    },
    systemMaximize: function () {
      window.browserWindow.systemMaximizeToggle();
    }
  }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.v-system-bar {
  -webkit-app-region: drag;
}

.v-system-bar-controls {
  -webkit-app-region: no-drag;
}

.toolbar {
  background: rgb(10,88,134);
  background: linear-gradient(90deg, rgba(10,88,134,1) 0%, rgba(1,163,186,1) 25%, rgba(1,117,186,1) 61%, rgba(1,154,186,1) 100%);
  color: white;
}
</style>
