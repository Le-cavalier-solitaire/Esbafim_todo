// Calculatrice JS: gestion de l'affichage, boutons et clavier
(() => {
  const historyEl = document.getElementById("history");
  const currentEl = document.getElementById("current");
  const nums = Array.from(document.querySelectorAll("button.num"));
  const ops = Array.from(document.querySelectorAll("button.operator"));
  const clearBtn = document.getElementById("clear");
  const delBtn = document.getElementById("del");
  const eqBtn = document.getElementById("equals");
  const sqrtBtn = document.querySelector("button.sqrt");

  let current = "0";
  let previous = "";
  let operator = null;
  let overwrite = false;

  function updateDisplay() {
    currentEl.textContent = current;
    historyEl.textContent = previous
      ? `${previous} ${operator || ""}`.trim()
      : "";
  }

  function clearAll() {
    current = "0";
    previous = "";
    operator = null;
    overwrite = false;
    updateDisplay();
  }

  function deleteLast() {
    if (overwrite) {
      current = "0";
      overwrite = false;
      updateDisplay();
      return;
    }
    if (
      current.length === 1 ||
      (current.length === 2 && current.startsWith("-"))
    ) {
      current = "0";
    } else {
      current = current.slice(0, -1);
    }
    updateDisplay();
  }

  function appendNumber(d) {
    if (overwrite) {
      current = d === "." ? "0." : d;
      overwrite = false;
      updateDisplay();
      return;
    }
    if (d === "." && current.includes(".")) return;
    if (current === "0" && d !== ".") current = d;
    else current = current + d;
    updateDisplay();
  }

  function chooseOperator(op) {
    if (operator && !overwrite) {
      // compute intermediate
      compute();
    }
    operator = op;
    previous = current;
    overwrite = true;
    updateDisplay();
  }

  function compute() {
    if (!operator || previous === "") return;
    const a = parseFloat(previous);
    const b = parseFloat(current);
    if (isNaN(a) || isNaN(b)) return;
    let result = 0;
    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = b === 0 ? "Erreur" : a / b;
        break;
      default:
        return;
    }
    if (result === "Erreur") {
      current = "Erreur";
    } else {
      // limiter les décimales raisonnablement
      current = Number.isFinite(result)
        ? String(parseFloat(result.toFixed(12)).toString())
        : "Erreur";
    }
    previous = "";
    operator = null;
    overwrite = true;
    updateDisplay();
  }

  function computeSqrt() {
    const num = parseFloat(current);
    if (isNaN(num)) return;
    if (num < 0) {
      current = "Erreur";
    } else {
      const result = Math.sqrt(num);
      current = String(parseFloat(result.toFixed(12)).toString());
    }
    operator = null;
    previous = "";
    overwrite = true;
    updateDisplay();
  }

  // Attacher événements
  nums.forEach((b) =>
    b.addEventListener("click", (e) =>
      appendNumber(e.target.textContent.trim())
    )
  );
  ops.forEach((b) =>
    b.addEventListener("click", (e) => chooseOperator(e.target.dataset.op))
  );
  clearBtn.addEventListener("click", clearAll);
  delBtn.addEventListener("click", deleteLast);
  eqBtn.addEventListener("click", compute);
  sqrtBtn.addEventListener("click", computeSqrt);

  // Support clavier
  window.addEventListener("keydown", (e) => {
    if (/^[0-9]$/.test(e.key)) appendNumber(e.key);
    else if (e.key === ".") appendNumber(".");
    else if (e.key === "Backspace") deleteLast();
    else if (e.key === "Escape") clearAll();
    else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      compute();
    } else if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
    else if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      computeSqrt();
    }
  });

  // Initial render
  updateDisplay();
})();
