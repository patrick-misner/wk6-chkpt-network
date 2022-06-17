<template>
  
            <div class="bg-white elevation-2 shadow m-3 p-3">
              <div v-if="post.creator.id == account.id" class="d-flex justify-content-end text-danger">
                <i class="mdi mdi-delete selectable" @click="deletePost"></i>
              </div>
              <div class="d-flex align-items-center">
                <img :src="post.creator.picture" class="profile-img border border-2 border-dark selectable" alt="" @click="goToProfile">
                <h5 class="px-4">{{ post.creator.name }}</h5>
              </div>
              <div class="div py-2 px-2 text-muted">
                <p>{{ post.createdAt }} <i class="mdi mdi-school px-3"></i></p>
              </div>
              <div class="px-2">
                <p>{{ post.body }}</p>
              </div>
              <div class="px-2 d-flex justify-content-end">
                <i class="mdi mdi-heart px-2"></i>
                <span>45</span>
              </div>
              <div v-if="post.imgUrl" class="d-flex justify-content-center border-top border-2 border-primary">
                <img :src="post.imgUrl" class="img-fluid post-img my-3" alt="">
              </div>
          </div>

</template>

<script>
import { computed } from "@vue/reactivity"
import { postsService } from "../services/PostsService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { router } from "../router"
export default {
  props: { post: { type: Object, required: true}},
  setup(props) {
    return {
      account: computed(()=> AppState.account),
      posts: computed(()=> AppState.posts),
      async deletePost(){
        try {
          if(await Pop.confirm('Are you sure you want to delete this post?')){
            await postsService.deletePost(props.post.id)
            Pop.toast('Post has been deleted')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      goToProfile() {
        logger.log('button pushed')
        router.push({
          name: "Profile",
          params: { id: props.post.creator.id}
        })
      }
    }
  }
}
</script>

<style>
  .profile-img{
    height: 65px;
    width: 65px;
    border-radius: 50%;

  }

  .post-img{
    height: 250px;
    max-height: 250px;
  }
</style>