<template>
  <div>
    <b-container class="bg-warning footer py-3" fluid>
      <b-row>
        <b-col class="text-center">
          <p class="mb-0">Yoga Yuhenson 4222012251</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BContainer } from "bootstrap-vue";

export default {
  name: "FooterLogin",
  components: {
    BContainer,
  },
};
</script>

<style scoped>
.footer{
  border: 2px solid #f2f2f2;
  border-top: 0;
  border-bottom-left-radius: 2vw;
  border-bottom-right-radius: 2vw;
}
</style>

