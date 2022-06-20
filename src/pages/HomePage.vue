<template>


<div class="container-fluid">
  <div class="row">
    <div class="col-2 profile-sidebar bg-light">
      <ProfileSideBar v-if="account.id" />
    </div>
    <div class="col-8">
      
          <div v-if="account.id" class="bg-white elevation-2 shadow rounded m-3 p-3 border border-3 border-primary">
              <form @submit.prevent="createPost">
              <div class="d-flex align-items-center">
                <img :src="account.picture" class="profile-img border border-2 border-dark selectable" @click="goToProfile" alt="">

                  <textarea class="form-control mx-5" id="exampleFormControlTextarea1" placeholder="Post your feelings" rows="4" v-model="postData.body" required></textarea>

              </div>
              <div class="d-flex justify-content-between m-2 p-2">
                <input class="form-control form-control-sm w-25" type="text" placeholder="Image url (optional)" aria-label=".form-control-sm example" v-model="postData.imgUrl">
                <button type="submit" class="btn btn-primary">Post</button>
              </div>
              </form>
          </div>


          <Post v-for="p in posts" :key="p.id" :post="p" />
                        <div class="d-flex justify-content-between mx-5">
                <button @click="changePage(previousPage)" :disabled="!previousPage" type="button" class="btn btn-primary">Previous</button>
                <button @click="changePage(nextPage)" :disabled="!nextPage" type="button" class="btn btn-primary">Next</button>
              </div>
     
    </div>
    <div class="col-2">
      <BillBoards />
    </div>
  
  </div>

</div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { postsService } from "../services/PostsService"
import { AppState } from "../AppState"
import { router } from "../router"
import BillBoards from "../components/BillBoards.vue"
import ProfileSideBar from "../components/ProfileSideBar.vue"
export default {
    name: "Home",
    setup() {
        const postData = ref({});
        onMounted(async () => {
            try {
                await postsService.getPosts();
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        });
        return {
            postData,
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account),
            nextPage: computed(() => AppState.nextPage),
            previousPage: computed(() => AppState.previousPage),
            async createPost() {
                try {
                    await postsService.createPost(postData.value);
                    Pop.toast("Post submitted!", "success");
                }
                catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            },
            goToProfile() {                
                router.push({
                    name: "Profile",
                    params: { id: AppState.account.id }
                });
            },
            async changePage(url) {
                try {
                    await postsService.changePage(url);
                    scrollTo(0, 0);
                }
                catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            }
        };
    },
    components: { BillBoards, ProfileSideBar }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}



  body.debug .container,
  body.debug .container-fluid {
    outline: 2px double blue;
    outline-offset: -2px;
  }

  body.debug .row {
    outline: 2px dashed red;
    outline-offset: -2px;
  }

  body.debug [class*="col-"] {
    outline: 2px dotted forestgreen;
    outline-offset: -3px;
  }

  .profile-sidebar{
    height: 100vh;
  }

  .profile-img{
    height: 65px;
    width: 65px;
    border-radius: 50%;

  }

</style>
