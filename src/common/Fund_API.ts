/**
 * API
 * @export fundSearch 搜索基金
 */

export const API = {
  fundSearch:
    "http://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?"
};

export const fund_template = [
  {
    name: "",
    code: "",
    coast: "",
    gainReminder: 0,
    dropReminder: 10,
    holding: 0,
    realtimeWorth: 0,
    profitEstimates: 0
  },
  {
    name: "天弘100EFT", // 基金名称
    code: "002345", // 基金Code
    coast: 0.7845, // 成本价,
    gainReminder: 0.7, // 涨幅提醒（买入提醒）
    dropReminder: 1, // 跌幅提醒（卖出提醒）
    holding: 500, // 持有份额
    realtimeWorth: 0.78, // 实时净值
    profitEstimates: 0 // 盈亏估算
  }
];
