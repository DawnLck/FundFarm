<template>
  <div class="card fund-trend">
    <div class="fund-trend-name"></div>
    <div class="fund-trend-price"></div>
    <div class="fund-trend-chart"></div>
    <div class="fund-trend-volume"></div>
    <div class="fund-trend-peakValley"></div>
  </div>
</template>

<script>
export default {
  name: "FundTrendCard",
  props: {
    fundTrend: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped></style>
