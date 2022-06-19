<template>
  <div class="contain-fluid">
    <div class="row">
      <div class="col-12">

        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Body</label>
          <textarea v-model="editPost.body" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Img Url</label>
         <input v-model="editPost.imgUrl" type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
        </div>

        <div class="d-flex justify-content-end">
          <button @click="updatePost" type="button" class="btn btn-primary">Save</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { Modal } from "bootstrap";
import Pop from "../utils/Pop";
export default {
  setup(props) {
    const editPost = ref({});
    watchEffect(() => {
      editPost.value = AppState.activePost
    })
    return {
      activePost: computed(() => AppState.activePost),
      editPost,
      async updatePost(){
        Modal.getOrCreateInstance(document.getElementById("post-modal")).hide()
        await postsService.editPost(editPost.value)
        Pop.toast('Post edited successfully', 'success')
      }
    }
  }
}
</script>

<style>

</style>