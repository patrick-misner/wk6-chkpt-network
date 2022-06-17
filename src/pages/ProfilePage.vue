<template>
  profile page!!

  {{ profile.name }}
  <Post v-for="p in posts" :key="p.id" :post="p" />

</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        AppState.posts = [];
        await profilesService.getProfile(route.params.id)
        await postsService.getProfilePosts(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style>

</style>