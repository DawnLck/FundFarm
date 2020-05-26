<template>
  <el-row class="fund-index" :gutter="20" v-show="dataValid">
    <el-col
      :span="6"
      :class="shangZheng && shangZheng.wave.value > 0 ? 'fund-up' : 'fund-down'"
    >
      <div class="grid-content" v-if="shangZheng">
        <h2 class="fund-index-title">上证指数</h2>
        <h3 class="fund-index-price">{{ shangZheng.price }}</h3>
        <div class="fund-index-wave">
          <span class="fund-index-wave-value">{{ shangZheng.wave.value }}</span>
          <span class="fund-index-wave-percent">{{
            shangZheng.wave.percent
          }}</span>
        </div>
      </div>
    </el-col>
    <el-col
      :span="6"
      :class="huSheng && huSheng.wave.value > 0 ? 'fund-up' : 'fund-down'"
    >
      <div class="grid-content" v-if="huSheng">
        <h2 class="fund-index-title">沪深300指</h2>
        <h3 class="fund-index-price">{{ huSheng.price }}</h3>
        <div class="fund-index-wave">
          <span class="fund-index-wave-value">{{ huSheng.wave.value }}</span>
          <span class="fund-index-wave-percent">{{
            huSheng.wave.percent
          }}</span>
        </div>
      </div>
    </el-col>
    <el-col
      :span="6"
      :class="shengZheng && shengZheng.wave.value > 0 ? 'fund-up' : 'fund-down'"
    >
      <div class="grid-content" v-if="shengZheng">
        <h2 class="fund-index-title">深证指数</h2>
        <h3 class="fund-index-price">{{ shangZheng.price }}</h3>
        <div class="fund-index-wave">
          <span class="fund-index-wave-value">{{ shengZheng.wave.value }}</span>
          <span class="fund-index-wave-percent">{{
            shengZheng.wave.percent
          }}</span>
        </div>
      </div>
    </el-col>
    <el-col
      :span="6"
      :class="chuangYe && chuangYe.wave.value > 0 ? 'fund-up' : 'fund-down'"
    >
      <div class="grid-content" v-if="chuangYe">
        <h2 class="fund-index-title">创业板指数</h2>
        <h3 class="fund-index-price">{{ chuangYe.price }}</h3>
        <div class="fund-index-wave">
          <span class="fund-index-wave-value">{{ chuangYe.wave.value }}</span>
          <span class="fund-index-wave-percent">{{
            chuangYe.wave.percent
          }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import axios from "axios";
import { API } from "../global/api/fundApi";
import Vue from "vue";

function normalizeData(data: any) {
  return {
    title: data["f14"],
    price: data["f2"],
    wave: {
      value: parseFloat(data["f4"]),
      percent: `${parseFloat(data["f3"])}%`
    }
  };
}

function saveFundIndex(data: any) {
  localStorage.saveItem(
    "FundIndex",
    JSON.stringify({
      shangZheng: data.shangZheng,
      husheng: data.husheng,
      shengZheng: data.shengZheng,
      chuangYe: data.chuangYe
    })
  );
}

function getFundIndex(): any {
  console.log("getFundIndex");
  return JSON.parse(localStorage.getItem("FundIndex") || "{}");
}

export default Vue.extend({
  name: "fundIndex",
  data() {
    return {
      dataValid: false,
      shangZheng: {
        title: "上证指数",
        price: "",
        wave: {
          value: 0,
          percent: "0%"
        }
      },
      huSheng: {
        title: "沪深指数",
        price: "",
        wave: {
          value: 0,
          percent: "0%"
        }
      },
      shengZheng: {
        title: "深证成指",
        price: "",
        wave: {
          value: 0,
          percent: "0%"
        }
      },
      chuangYe: {
        title: "创业版指",
        price: "",
        wave: {
          value: 0,
          percent: "0%"
        }
      }
    };
  },
  mounted() {
    console.log("FundIndex Mount");

    const _storageFundIndex = getFundIndex();
    if (_storageFundIndex && _storageFundIndex.shangZheng) {
      this.$data.shangZheng = _storageFundIndex.shangZheng;
      this.$data.huSheng = _storageFundIndex.huSheng;
      this.$data.shengZheng = _storageFundIndex.shengZheng;
      this.$data.chuangYe = _storageFundIndex.chuangYe;
      this.$data.dataValid = true;
    }

    const _response = axios
      .get(API.fundIndex, {})
      .then(data => {
        const _data = data && data["data"] && data["data"]["data"];
        const _dataDiff = _data.diff;

        this.$data.shangZheng = normalizeData(_dataDiff[0]);
        this.$data.huSheng = normalizeData(_dataDiff[2]);
        this.$data.shengZheng = normalizeData(_dataDiff[7]);
        this.$data.chuangYe = normalizeData(_dataDiff[1]);

        this.$data.dataValid = true;

        saveFundIndex(this.$data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log({ _response });
  },
  computed: {}
});
</script>

<style scoped lang="less">
@fundIndex: ~"fund-index";
.@{fundIndex} {
  margin-bottom: 1rem;
  h1,
  h2,
  h3 {
    margin: 0;
  }
  &-title {
    margin: 1rem 0;
  }
}
</style>
