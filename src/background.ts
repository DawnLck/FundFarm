/***
 * Background.ts
 * 背景视图的运行脚本
 */
chrome.runtime.onMessage.addListener(function(
  request: any,
  sender: any,
  sendResponse: any
) {
  window.alert("Hello from the background");
});
