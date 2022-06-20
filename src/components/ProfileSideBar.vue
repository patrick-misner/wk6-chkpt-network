<template>
<div class="d-flex justify-content-center py-3">
  <img @click="goToProfile" :src="account.picture" class="profileside-img selectable border border-3 border-warning" alt="">
</div>



<div class="d-flex justify-content-center py-2">
<h4> {{ account.name }} </h4>
</div>

<div class="d-flex justify-content-center py-2">
<p> Class of {{ account.class}}</p>
</div>


<div class="d-flex justify-content-around fs-1">
<a v-if="account.linkedin" :href="account.github"><i class="mdi mdi-github"></i></a>
<a v-if="account.github" :href="account.linkedin"><i class="mdi mdi-linkedin"></i></a>
</div>

</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState"
import { router } from "../router";
export default {
  setup(){
    return{
      account: computed(()=> AppState.account),
      profile: computed(()=> AppState.profile),
      goToProfile() {                
        router.push({
          name: "Profile",
          params: { id: AppState.account.id }
        });
      },
    }
  }
}
</script>

<style>
  .profileside-img{
    height: 150px;
    width: 150px;
    border-radius: 50%;

  }
</style>