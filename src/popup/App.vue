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
        <fund-search
          @addNewFund="addFund"
          @saveFund="saveFund"
        ></fund-search>
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
// global
import { API } from "../common/Fund_API";
import Banner from "../common/Banner";
// libs
import axios from "axios";
import Vue from "vue";
import ColorConsole from "../common/ColorConsole";
// components
import FundTable from "@/components/FundTable.vue";
import FundSearch from "@/components/FundSearch.vue";

const FUND_TEMPLATE = {
  name: "",
  code: "",
  coast: "", // 持有成本价
  gainReminder: 0, // 涨幅提醒
  dropReminder: 10, // 跌幅提醒
  holding: 0, // 持有份额
  realtimeWorth: 0, // 实时净值
  profitEstimates: 0 // 盈亏估算
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
     * @method updateMyOptionalFundList 更新自选基金列表
     * @method getLocalOptionalFundList 获取本地自选基金列表
     * @method getLocalFundsInfo 获取本地基金列表信息
     */
    updateMyOptionalFundList() {
      localStorage.setItem(
        "fund_mylist",
        JSON.stringify(this.userData.fundList)
      );
    },
    getLocalOptionalFundList() {
      this.userData.fundList = JSON.parse(
        localStorage.getItem("fund_mylist") || "[]"
      );
    },
    getLocalFundsInfo() {
      ColorConsole.blue("# 获取本地基金列表信息 #");
      const _list = this.userData.fundList;
      console.log({ _list });
      const _array = _list.reduce((prev: any, curr: string) => {
        return [...prev, JSON.parse(localStorage.getItem(curr) || "")];
      }, []);

      console.log({ _array });
      this.userData.fundArray = _array;
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

    async saveFund(targetCode: any) {
      const _callback = await this.updateFund(targetCode);
      console.log(_callback);
    },

    // 获取基金更新后的数据
    async updateFund(item: any) {
      // const item = JSON.parse(localStorage.getItem(code) || "{}");
      const _response = await axios.get(API.fundRealTime, {
        params: {
          FCODE: item.code,
          deviceid: "Wap",
          plat: "Wap",
          product: "EFund",
          version: "2.0.0"
        }
      });
      const realtimeWorth = _response.data["Datas"]["DWJZ"];
      const profitEstimates =
        (parseFloat(realtimeWorth) - parseFloat(item.coast)) *
        parseFloat(item.holding);
      const _callback = {
        ...item,
        realtimeWorth,
        profitEstimates: profitEstimates.toFixed(2)
      };
      localStorage.setItem(item.code, JSON.stringify(_callback));
      return _callback;
    },

    updateAll() {
      this.userData.fundArray.forEach(async item => {
        item = await this.updateFund(item);
      });
    },

    // 获取自选基金列表
    async getOptionalFunds() {
      console.log(`Mounted`);
      const _list = JSON.parse(localStorage.getItem("fund_mylist") || "[]");
      this.userData.fundList = _list;
      const array = [];

      for (let i = 0, _length = _list.length; i < _length; i++) {
        array.push(await this.updateFund(_list[i]));
      }

      // const array = await _list.reduce(async (prev: any, curr: any) => {
      //   const _item = JSON.parse(localStorage.getItem(curr) || "{}");
      //   const _response = await axios.get(API.fundRealTime, {
      //     params: {
      //       FCODE: curr,
      //       deviceid: "Wap",
      //       plat: "Wap",
      //       product: "EFund",
      //       version: "2.0.0"
      //     }
      //   });
      //   _item.realtimeWorth = _response.data["Datas"]["DWJZ"];
      //   console.log(prev, _item);
      //   return [...prev, _item];
      // }, []);

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
    ColorConsole.red(Banner);
    // this.getOptionalFunds();
    this.getLocalOptionalFundList();
    this.getLocalFundsInfo();
    this.updateAll();
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
