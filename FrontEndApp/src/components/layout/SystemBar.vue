<template>
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
</template>

<script lang="ts">
export default {
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
.v-system-bar {
    -webkit-app-region: drag;
}

.v-system-bar-controls {
    -webkit-app-region: no-drag;
}
</style>