<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div
          class="
            bg-white
            elevation-2
            shadow
            m-3
            p-0
            border border-3 border-primary
          "
        >
          <div class="cover-img text-white text-shadow">
            <div class="d-flex justify-content-between p-3">
              <h1>Profile Details</h1>
              <img
                :src="profile.picture"
                class="profile-img border border-2 border-dark selectable"
                alt=""
              />
            </div>

            <div class="d-flex justify-content-end">
              <h5 class="p-1">{{ profile.name }}</h5>
            </div>
          </div>
          <div>
            <p class="pt-3 p-2"><b>Graduated:</b> {{ profile.graduated }}</p>
          </div>
          <div class="div d-flex justify-content-between py-2 p-2">
            <p>
              <b>Biography</b> <br />
              {{ profile.bio }} 
            </p>
            <p>
              <b>Resume</b> <br />
              {{ profile.resume }}
            </p>
          </div>
          <div class="px-2 fs-1 d-flex justify-content-between align-items-end">
            <div class="px-0">
              <i class="mdi mdi-github"></i>
              <i class="mdi mdi-linkedin text-primary"></i>
            </div>
            <p class="fs-6">E-mail: {{ profile.email }}</p>
          </div>
          <div
            v-if="profile.id == account.id"
            class="d-flex justify-content-end px-3 pt-3"
          >
            <button
              @click="editProfile"
              type="button"
              class="btn btn-primary p-3"
            >
              Edit Profile
            </button>
          </div>

          <img src="post.imgUrl" class="img-fluid post-img my-3" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
    <div class="col-2"></div>
  </div>

  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    id="profile-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Profile</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Name</label
                  >
                  <input
                    v-model="editable.name"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Email address</label
                  >
                  <input
                    v-model="editable.email"
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Picture</label
                  >
                  <input
                    v-model="editable.picture"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Picture URL"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Cover Image</label
                  >
                  <input
                    v-model="editable.coverImg"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Cover-image URL"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Github</label
                  >
                  <input
                    v-model="editable.github"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Github URL"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Linkedin</label
                  >
                  <input
                    v-model="editable.linkedin"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Linkedin URL"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Resume</label
                  >
                  <input
                    v-model="editable.resume"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Resume URL"
                  />
                </div>
              </div>

              <div class="col-12">
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >Bio</label
                  >
                  <textarea
                    v-model="editable.bio"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
                            <div class="col-12">
                <div class="form-check">
                  <input
                    v-model="editable.graduated"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Graduated?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button @click="saveAccount" type="button" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap";
import { accountService } from "../services/AccountService";
export default {
  name: "Account",
  setup() {
    const route = useRoute();
    const editable = ref({});
    watchEffect(() => {
      AppState.account;
      logger.log('account updated', editable.value)
      editable.value = { ...AppState.account}
    })
    onMounted(async () => {
      try {
        AppState.posts = [];
        await profilesService.getProfile(route.params.id);
        await postsService.getProfilePosts(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      editable,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      editProfile() {
        Modal.getOrCreateInstance(
          document.getElementById("profile-modal")
        ).show();
        
      },
      async saveAccount() {
        try {
          Modal.getOrCreateInstance(
          document.getElementById("profile-modal")
        ).hide();
          await accountService.editAccount(editable.value);
          Pop.toast('Account updated', "success")
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    };
  },
};
</script>

<style>
.cover-img {
  background-image: url("https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80");
  background-position: center;
}
</style>