<template>
  <el-autocomplete
    class="fund-search"
    popper-class="fund-search-autocomplete"
    v-model="searchFund.searchValue"
    :fetch-suggestions="querySearch"
    placeholder="请输入基金代码或者名称"
    @select="handleSelect"
  >
    <i
      class="fund-addNewItem el-icon-plus el-input__icon"
      slot="suffix"
      @click="addNewFund()"
    >
    </i>
    <template slot-scope="{ item }">
      <div class="name">{{ item.NAME || item.FundName }}</div>
      <div class="subtitle">
        <span class="type">
          {{ item.FundBaseInfo && item.FundBaseInfo.FTYPE }}
        </span>
        <span class="code">{{ item.CODE || item.FundCode }}</span>
      </div>
    </template>
  </el-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { API } from "../global/api/fundApi";
export default Vue.extend({
  name: "FundSearch",
  props: [],
  data() {
    return {
      searchFund: {
        searchValue: "",
        selectedItem: {}
      }
    };
  },
  methods: {
    /**
     * 搜索并添加基金
     * @method querySearch 提供搜索建议列表
     * @method handleSelect 处理选择列表
     * @method addNewFund 添加新的基金
     */

    querySearch(queryString: any, cb: any) {
      axios
        .get(API.fundSearch, {
          params: {
            m: queryString.length ? 1 : 0,
            key: queryString
          }
        })
        .then(function(response: any) {
          console.log({ response });

          response.data["Datas"].forEach((element: any) => {
            element["value"] = element.NAME || element.FundName;
          });

          cb(response.data["Datas"]);
        });
    },
    handleSelect(item: any) {
      console.log("Handle Select", item);
      this.searchFund.selectedItem = item;
    },
    addNewFund() {
      this.$emit("addNewFund", this.searchFund.selectedItem);
    }
  },
  mounted() {
    // browser.runtime.sendMessage({});
  },
  computed: {}
});
</script>

<style scoped lang="less">
// @import "../common/less/color";
.fund-search {
  margin-right: 10px;
  &-autocomplete {
    li {
      line-height: normal;
      padding-top: 5px;
      padding-bottom: 5px;
      .name {
        font-size: medium;
      }
      .subtitle {
        color: @ColorTextSecond;
        .type {
          color: #999;
          font-family: "Helvetica Neue", Helvetica, "PingFang SC",
            "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        }
      }
    }
  }
}
.fund-addNewItem {
  cursor: pointer;
  &:hover {
    color: #666;
  }
}
</style>
