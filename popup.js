let remainingBudget = 0.0;
let remainingDays = 0.0;

chrome.storage.local.get("trainingBudget", ({ trainingBudget }) => {
  document.getElementById("trainingBudget").textContent = trainingBudget;
  remainingBudget = parseFloat(trainingBudget);
});

chrome.storage.local.get("trainingDays", ({ trainingDays }) => {
  document.getElementById("trainingDays").textContent = trainingDays;
  remainingDays = parseFloat(trainingDays);
});


let reset = document.getElementById("reset");
reset.addEventListener("click", async () => {
  document.getElementById("trainingBudget").textContent = 1000;
  chrome.storage.local.set({ trainingBudget: 1000 });
  remainingBudget = 1000;

  document.getElementById("trainingDays").textContent = 2;
  chrome.storage.local.set({ trainingDays: 2 });
  remainingDays = 2;
});

let spentAmountSubmit = document.getElementById("spentAmountSubmit");
spentAmountSubmit.addEventListener("click", async () => {
  let spentAmount = parseFloat(document.getElementById("spentAmount").value);
  
  remainingBudget -= spentAmount;

  document.getElementById("trainingBudget").textContent = remainingBudget.toFixed(2);
  
  chrome.storage.local.set({ trainingBudget: remainingBudget });
});

let spentDaysSubmit = document.getElementById("spentDaysSubmit");
spentDaysSubmit.addEventListener("click", async () => {
  let spentDays = parseFloat(document.getElementById("spentDays").value);
  
  remainingDays -= spentDays;

  document.getElementById("trainingDays").textContent = remainingDays.toFixed(2);
  
  chrome.storage.local.set({ trainingDays: remainingDays });
});