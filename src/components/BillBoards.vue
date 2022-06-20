<template>

  <div v-for="b in billboards" :key="b.title" :billboard="b" class="py-5 d-flex justify-content-center">
   <a :href="`https://${b.linkURL}`">
    <img :src="b.tall" class="img-fluid border border-4 border-warning selectable" alt="">
   </a>

  </div>
  
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { billBoardsService } from "../services/BillBoardsService";
import { AppState } from "../AppState";
export default {
setup(){
  onMounted(async () => {
    try {
      await billBoardsService.getBillBoards()
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  });
  return{
    billboards: computed(() => AppState.billboards)
  }
}
}
</script>

<style>

</style>