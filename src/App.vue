<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
    <Modal id="post-modal">
    <template #header> Edit Post </template>
    <template #body>
      <ActivePost />
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from "./components/Navbar.vue"
import ActivePost from "./components/ActivePost.vue";
export default {
    name: "App",
    setup() {
        return {
            appState: computed(() => AppState)
        };
    },
    components: { Navbar, ActivePost }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
