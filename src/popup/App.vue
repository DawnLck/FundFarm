<template>
  <el-container>
    <el-header
      :class="'ext-header'"
      height="auto"
    >
      <div class="ext-header-title">
        养基场🐤
      </div>

      <div class="ext-header-options">
        <fund-search @addNewFund="addFund"></fund-search>
        <el-button @click="refresh()">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button class="hidden-lg-and-up">
          <el-link
            icon="el-icon-full-screen"
            href="./popup.html"
            target="_blank"
          >
            全屏
          </el-link>
        </el-button>
      </div>
    </el-header>
    <el-main>
      <fund-table
        :tableData="userData.fundArray"
        @deleteItem="deleteOptionalFund"
      />
    </el-main>
    <el-footer>
      <span>数据来源：天天基金</span>
      <small>Writen by liangck with creation🎉</small>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import FundTable from "@/components/FundTable.vue";
import FundSearch from "@/components/FundSearch.vue";

const FUND_TEMPLATE = {
  name: "",
  code: "",
  coast: "",
  gainReminder: 0,
  dropReminder: 10,
  holding: 0,
  realtimeWorth: 0,
  profitEstimates: 0
};
export default Vue.extend({
  name: "App",
  components: { FundTable, FundSearch },
  data(): {
    userData: {
      fundList: string[];
      fundArray: any[];
    };
  } {
    return {
      userData: {
        fundList: [],
        fundArray: []
      }
    };
  },
  methods: {
    /**
     * Localstorage
     */
    updateMyOptionalFundList() {
      localStorage.setItem(
        "fund_mylist",
        JSON.stringify(this.userData.fundList)
      );
    },

    /**
     * CURD
     * Create \ Update \ Read(Get) \ Delete
     */

    // 添加自选基金
    addFund(target: any) {
      console.log(`Add new fund`);
      const _item = {
        ...FUND_TEMPLATE,
        name: target.NAME || target.FundName,
        code: target.CODE || target.FundCode
      };

      this.userData.fundList.push(_item.code);
      this.updateMyOptionalFundList();

      this.userData.fundArray.push(_item);
      localStorage.setItem(_item.code, JSON.stringify(_item));
    },

    // 获取自选基金列表
    getOptionalFunds() {
      console.log(`Mounted`);
      const _list = JSON.parse(localStorage.getItem("fund_mylist") || "[]");
      this.userData.fundList = _list;

      const array = _list.reduce((prev: any, curr: any) => {
        return [...prev, JSON.parse(localStorage.getItem(curr) || "{}")];
      }, []);

      console.log({ array });
      // this.$set( this.userData.fundArray, array);
      this.userData.fundArray = array;
    },

    // 删除自选基金列表
    deleteOptionalFund(target: string) {
      console.log(`Delete target: {${typeof target}}  ${target}`);
      const _index = this.userData.fundList.indexOf(target);

      if (_index > -1) {
        this.userData.fundList.splice(_index, 1);
        const _arrIndex = this.userData.fundArray.findIndex(
          item => item.code === target
        );
        this.userData.fundArray.splice(_arrIndex, 1);
        this.updateMyOptionalFundList();
      } else {
        console.warn(`没有找到对应的自选基金`);
      }
    }
  },
  mounted() {
    this.getOptionalFunds();
  }
});
</script>

<style lang="less">
@import "../common/color";
html {
  width: auto;
  height: auto;
  max-height: 800px;
}
body {
  margin: 0;
  padding: 0.5rem 0;
}
.ext {
  &-header {
    font-size: 14px;
    .el-link {
      vertical-align: baseline;
    }
    &-title {
      display: inline;
      margin-right: 0.5rem;
      font-size: 20px;
      font-weight: 500;
    }
    &-options {
      display: inline;
      i {
        margin-right: 6px;
      }
      &-add {
        max-width: 20rem;
        vertical-align: bottom;
        margin-right: 1rem;
        button {
          &:hover {
            color: #303133;
            font-size: bold;
          }
        }
      }
    }
  }
}
</style>
