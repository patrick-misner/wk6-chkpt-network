<template>
  
            <div class="bg-white elevation-2 shadow m-3 p-3">
              <div v-if="post.creator.id == account.id" class="d-flex justify-content-end text-danger">
                <i @click="setActive" class="mdi mdi-pencil selectable text-primary px-3"></i>
                <i class="mdi mdi-delete selectable" @click="deletePost"></i>
              </div>
              <div class="d-flex align-items-center">
                <img :src="post.creator.picture" class="profile-img border border-2 border-dark selectable" alt="" @click="goToProfile">
                <h5 class="px-4">{{ post.creator.name }}</h5>
              </div>
              <div class="div py-2 px-2 text-muted">
                <p>{{ formatDate(post.createdAt) }} <i v-if="post.creator.graduated" class="mdi mdi-school px-3"></i></p>
              </div>
              <div class="px-2">
                <p>{{ post.body }}</p>
              </div>
              <div v-if="account.id" class="px-2 d-flex justify-content-end">
                <i class="mdi mdi-heart px-2 selectable" @click="likePost"></i>
                <span>{{ post.likes.length }}</span>
              </div>
              <div v-if="!account.id" class="px-2 d-flex justify-content-end">
                <i class="mdi mdi-heart px-2"></i>
                <span>{{ post.likes.length }}</span>
              </div>

              <div v-if="post.imgUrl" class="d-flex justify-content-center border-top border-2 border-primary">
                <img :src="post.imgUrl" class="img-fluid post-img my-3" alt="">
              </div>

            </div>

</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { postsService } from "../services/PostsService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { router } from "../router"
import { watchEffect } from "@vue/runtime-core"
import { Modal } from "bootstrap"
export default {
  props: { post: { type: Object, required: true}},
  setup(props) {
    const editPost = ref({});
    watchEffect(()=> {
      editPost.value = props.post
    })
    return {
      account: computed(()=> AppState.account),
      posts: computed(()=> AppState.posts),
      editPost,
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
      },
      setActive(){
        postsService.setActive(props.post)
        Modal.getOrCreateInstance(document.getElementById("post-modal")).show();
      },
      async likePost(){
        try {
          await postsService.likePost(props.post.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
        
      },
      formatDate(rawDate){
        return new Date(rawDate).toLocaleString();
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