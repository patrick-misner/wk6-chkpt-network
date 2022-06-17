<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from "./components/Navbar.vue"
export default {
    name: "App",
    setup() {
        return {
            appState: computed(() => AppState)
        };
    },
    components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
