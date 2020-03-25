<template>
  <div class="fund-table">
    <el-table
      stripe
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="基金名称"
      > </el-table-column>

      <!-- 成本价 -->
      <el-table-column
        prop="coast"
        label="成本价"
      >
        <template slot-scope="{ row }">
          <el-input
            v-model="row.coast"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>

      <!-- 涨跌提醒 -->
      <el-table-column
        prop="gainReminder"
        label="补仓价格提醒"
      >
        <template slot-scope="{ row }">
          <el-input
            v-model="row.gainReminder"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="dropReminder"
        label="卖出价格提醒"
      >
        <template slot-scope="{ row }">
          <el-input
            v-model="row.dropReminder"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>

      <!-- 持有份额 -->
      <el-table-column
        prop="holding"
        label="持有份额"
      >
        <template slot-scope="{ row }">
          <el-input
            v-model="row.holding"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <!-- 实时分析 -->
      <el-table-column
        prop="realtimeWorth"
        label="实时价值"
      > </el-table-column>
      <el-table-column
        prop="profitEstimates"
        label="盈亏估算"
      > </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <div>
            <el-button
              @click="saveItem(row)"
              size="small"
            >保存</el-button>
            <el-button
              @click="deleteItem(row)"
              size="small"
            >删除</el-button>
            <!-- <el-button
            type="text"
            size="small"
          >编辑</el-button> -->
          </div>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FundTable",
  props: ["tableData"],
  data() {
    return {
      fundData: []
    };
  },
  mounted() {
    // browser.runtime.sendMessage({});
    console.log(this.tableData);
  },
  methods: {
    saveItem(target: any) {
      console.log(`Save fund: ${target.code}`, target);
      localStorage.setItem(target.code, JSON.stringify(target));
    },
    deleteItem(target: any) {
      // localStorage.removeItem(target.code);
      this.$emit("deleteItem", target.code);
    }
  },
  computed: {
    // defaultText() {
    //   return browser.i18n.getMessage("extName");
    // }
  }
});
</script>

<style scoped lang="less">
.fund-table {
  /deep/.el-input__inner {
    padding: 0 0.5rem;
  }
}
</style>
