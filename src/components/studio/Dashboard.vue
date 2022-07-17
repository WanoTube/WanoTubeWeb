<template>
  <div
    class="row m-4 d-flex flex-column vertical-scrollable"
    style="overflow-y: scroll"
  >
    <h3><b>Channel dashboard</b></h3>
  </div>
</template>
<script>
import { getChannelOverview } from "../../utils/http/videoRequest";
export default {
  async mounted(){
    const overview = await getChannelOverview();
    console.log({overview});
  }
};
</script>
<style>
</style>