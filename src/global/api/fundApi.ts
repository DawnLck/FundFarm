/**
 * API
 * @export fundSearch 搜索基金
 */

export const API = {
  fundSearch:
    "http://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?",
  fundRealTime:
    "https://fundmobapi.eastmoney.com/FundMApi/FundBaseTypeInformation.ashx?",
  fundIndex:
    "https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f1,f2,f3,f4,f12,f13,f14&secids=1.000001,0.399006,1.000300,1.000016,1.000905,0.399005,1.000010,0.399001,1.000009",
};

export const fundTemplate = [
  {
    name: "",
    code: "",
    coast: "",
    gainReminder: 0,
    dropReminder: 10,
    holding: 0,
    realtimeWorth: 0,
    profitEstimates: 0,
  },
  {
    name: "天弘100EFT", // 基金名称
    code: "002345", // 基金Code
    coast: 0.7845, // 成本价,
    gainReminder: 0.7, // 涨幅提醒（买入提醒）
    dropReminder: 1, // 跌幅提醒（卖出提醒）
    holding: 500, // 持有份额
    realtimeWorth: 0.78, // 实时净值
    profitEstimates: 0, // 盈亏估算
  },
];
