<template>
  <el-col :span="6">
    <div class="grid-content">
      <h2 class="fund-index-title">上证指数</h2>
      <h3 class="fund-index-price">
        {{fundIndex[0].price}}
      </h3>
      <div class="fund-index-wave">
        <span class="fund-index-wave-value"> {{fundIndex[0].wave.value}}</span>
        <span class="fund-index-wave-percent"> {{fundIndex[0].wave.percent}}</span>
      </div>
    </div>
  </el-col>
</template>

<script lang="ts">
import axios from "axios";
import { API } from "../global/api/fundApi";
import Vue from "vue";

export default Vue.extend({
  name: "fundIndexItem",
  data() {
    return {};
  },
  mounted() {},
  computed: {}
});
</script>

<style scoped>
</style>
