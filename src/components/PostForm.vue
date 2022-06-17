<template>
  <div class="bg-white elevation-2 rounded shadow m-3 p-3">
              <div class="d-flex align-items-center">
                <img src="https://thiscatdoesnotexist.com" class="profile-img border border-2 border-dark" alt="">
                  
                  <textarea class="form-control mx-5" id="exampleFormControlTextarea1" placeholder="Post your feelings" rows="4" v-model="postData.body"></textarea>

              </div>
              <div class="d-flex justify-content-between m-2 p-2">
                <input class="form-control form-control-sm w-25" type="text" placeholder="Image url" aria-label=".form-control-sm example" v-model="postData.imgUrl">
                <button type="button" class="btn btn-primary" @click="createPost">Post</button>
              </div>

          </div>
</template>

<script>
export default {

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