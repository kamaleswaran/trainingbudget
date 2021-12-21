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

chrome.storage.local.get("lastSpentAmountNotes", ({ lastSpentAmountNotes }) => {
  document.getElementById("lastSpentAmountNotes").textContent = lastSpentAmountNotes;
});


let reset = document.getElementById("reset");
reset.addEventListener("click", async () => {
  document.getElementById("trainingBudget").textContent = 1000;
  chrome.storage.local.set({ trainingBudget: 1000 });
  remainingBudget = 1000;

  document.getElementById("trainingDays").textContent = 2;
  chrome.storage.local.set({ trainingDays: 2 });
  remainingDays = 2;

  document.getElementById("lastSpentAmountNotes").textContent = '';
  chrome.storage.local.set({ lastSpentAmountNotes: '' });

  document.getElementById("lastSpentDaysNotes").textContent = '';
  chrome.storage.local.set({ lastSpentDaysNotes: '' });
});

let spentAmountSubmit = document.getElementById("spentAmountSubmit");
spentAmountSubmit.addEventListener("click", async () => {
  let spentAmountNotes = document.getElementById("spentAmountNotes").value;
  let spentAmount = parseFloat(document.getElementById("spentAmount").value);

  if (!spentAmount || remainingBudget - spentAmount < 0) {
    return;
  }

  remainingBudget -= spentAmount;

  document.getElementById("trainingBudget").textContent = remainingBudget.toFixed(2);
  
  let lastSpentAmountNotes = spentAmountNotes + ' for £' + spentAmount + '/-';
  document.getElementById("lastSpentAmountNotes").textContent = lastSpentAmountNotes;
  chrome.storage.local.set({ trainingBudget: remainingBudget, lastSpentAmountNotes: lastSpentAmountNotes });
});

let spentDaysSubmit = document.getElementById("spentDaysSubmit");
spentDaysSubmit.addEventListener("click", async () => {
  let spentDaysNotes = document.getElementById("spentDaysNotes").value;
  let spentDays = parseFloat(document.getElementById("spentDays").value);
  
  if (!spentDays || remainingDays - spentDays < 0) {
    return;
  }

  remainingDays -= spentDays;

  document.getElementById("trainingDays").textContent = remainingDays.toFixed(2);
  
  let lastSpentDaysNotes = spentDaysNotes + ' for ' + spentDays + ' days.';
  document.getElementById("lastSpentDaysNotes").textContent = lastSpentDaysNotes;
  
  chrome.storage.local.set({ trainingDays: remainingDays, lastSpentDaysNotes: lastSpentDaysNotes });
});