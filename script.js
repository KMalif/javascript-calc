const themes = document.querySelectorAll("[data-theme]");
const html = document.documentElement;

// switch themes
const changeTeme = () => {
    themes.forEach((index) => {
        index.addEventListener("change", () => {
          const theme = index.value;
          html.setAttribute("data-theme", theme);
          localStorage.setItem("theme-calc", theme);
        });
    });    
};


// set themes
const getThemes = () => {
    const theme = localStorage.getItem("theme-calc") ?? "firstTheme";
    const toggle = document.querySelector(`input[data-theme=${theme}]`);
  
    if (theme) {
      html.setAttribute("data-theme", theme);
      toggle.checked = true;
      return;
    }
};

const keys = document.querySelectorAll("[data-key]");
const display = document.getElementById("display");
const preview = document.getElementById("preview");

let firstOperand = null;
let secondOperand = null;
let operator = null;

const handleKeypadPressed = () => {
    keys.forEach((key) =>
    key.addEventListener("click", () => {
        const displayValue = display.textContent;
        
        // number
        if (key.classList.contains("number")) {
            const keyValue = key.dataset.key;
            if (displayValue === "0") {
                display.textContent = keyValue;
            } else {
                display.textContent = displayValue + keyValue;
            }
        }

        //desimal
        if (key.classList.contains("decimal")) {
            if (!displayValue.includes(".")) {
                display.textContent = `${displayValue}.`;
            }
        }

        // reset 
        if (key.classList.contains("reset")) {
            display.textContent = "0";
            preview.textContent = "";
            firstOperand = null;
            secondOperand = null;
            operator = null;
            hasOperator = false;
        }

        //hapus 
        if (key.classList.contains("delete")) {
            const numbers = displayValue.split("").slice(0, -1);
            if (numbers.length === 0) {
                display.textContent = "0";
            } else {
                display.textContent = numbers.join("");
            }
        }

        // operator
        if (key.classList.contains("operator")) {
            if (operator) return;
            operator = key.dataset.key;
            const operatorSymbol = key.dataset.symbol;
            preview.textContent = `${displayValue} ${operatorSymbol}`;
            display.textContent = "0";
            firstOperand = displayValue;
        }

        // calculate 
        if (key.classList.contains("equal")) {
            firstOperand = parseFloat(firstOperand);
            secondOperand = parseFloat(displayValue);
            calculate();
        }
    })
    );
};

// calculate function
const calculate = () => {
  let result = "";
  switch (operator) {
    case "sum":
      result = firstOperand + secondOperand;
      break;
    case "min":
      result = firstOperand - secondOperand;
      break;
    case "devide":
      result = firstOperand / secondOperand;
      break;
    case "multiply":
      result = firstOperand * secondOperand;
      break;
    default:
      return;
  }

  if (isNaN(result) || result == Infinity){
    return alert("The number can't be devided");
  } 

  firstOperand = Number.isInteger(result) ? result : result.toFixed(2);
  display.textContent = firstOperand;
  preview.textContent = "";
  operator = null;
}

changeTeme();
getThemes();
handleKeypadPressed();