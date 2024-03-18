const displayResult = document.forms["form"]["displayResult"];
const historyPanel = document.getElementById("history");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
const showHistoryBtn = document.getElementById("show-history");
const closeHistoryBtn = document.getElementById("close-history");

let currentHistory = [];

function updateDisplay(value) {
  displayResult.value = value;
}

function addToHistory(entry) {
  currentHistory.push(entry);
  localStorage.setItem("calculatorHistory", JSON.stringify(currentHistory));
  renderHistory();
}

function clearHistory() {
  currentHistory = [];
  localStorage.removeItem("calculatorHistory");
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  currentHistory.forEach((entry) => {
    const p = document.createElement("p");
    p.textContent = entry;
    historyList.appendChild(p);
  });
}

function evaluateExpression(expression) {
  try {
    const result = eval(expression);
    addToHistory(`${expression} = ${result}`);
    updateDisplay(result);
  } catch (error) {
    console.error("Invalid expression:", expression);
  }
}

function handleButtonClick(event) {
  const value = event.target.value;
  let currentDisplay = displayResult.value;

  if (
    !isNaN(value) ||
    value === "." ||
    value === "*" ||
    value === "/" ||
    value === "+" ||
    value === "-"
  ) {
    // Include + and - operators here
    updateDisplay(currentDisplay + value);
  } else if (value === "=") {
    evaluateExpression(currentDisplay);
  } else if (value === "CE") {
    updateDisplay(currentDisplay.slice(0, -1));
  } else if (value === "C") {
    updateDisplay("");
  }
}

function init() {
  document.querySelectorAll('input[type="button"]').forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
  });

  clearHistoryBtn.addEventListener("click", clearHistory);
  showHistoryBtn.addEventListener("click", () => {
    historyPanel.style.display = "block";
  });
  closeHistoryBtn.addEventListener("click", () => {
    historyPanel.style.display = "none";
  });

  const storedHistory = localStorage.getItem("calculatorHistory");
  if (storedHistory) {
    currentHistory = JSON.parse(storedHistory);
    renderHistory();
  }
}

init();
