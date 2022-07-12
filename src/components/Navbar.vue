<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1>Network+</h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <!-- <li>
          <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Profile
          </router-link>
        </li> -->
      </ul>
      <form @onsubmit.prevent="searchPosts" class="d-flex mx-5">
        <input v-model="searchTerm" class="form-control me-2" type="search" placeholder="Search Posts..." aria-label="Search">
        <button class="btn btn-outline-success"  type="submit">Search</button>
      </form>
      <!-- LOGIN COMPONENT HERE -->
      
      <Login />
    </div>
  </nav>
</template>

<script>
import { ref } from "@vue/reactivity";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const searchTerm = ref('')
    return {
      searchTerm,
      async searchPosts(){
        await postsService.searchPosts(searchTerm.value)

      }
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
