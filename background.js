let trainingBudget = 1000.00;
let trainingDays = 2.0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ trainingBudget: trainingBudget, trainingDays: trainingDays });
});