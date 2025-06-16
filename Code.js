// Load fonts
const font = document.createElement("link");
font.href = "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap";
font.rel = "stylesheet";
document.head.appendChild(font);

const font2 = document.createElement("link");
font2.href = "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap";
font2.rel = "stylesheet";
document.head.appendChild(font2);

// Style
const style = document.createElement("style");
style.textContent = `
  @keyframes flicker {
    0% { opacity: 0.95; }
    5% { opacity: 0.5; }
    10% { opacity: 1; }
    15% { opacity: 0.7; }
    20% { opacity: 1; }
    100% { opacity: 0.95; }
  }

  .gui-container {
    display: flex;
    font-family: 'Courier New', monospace;
    position: fixed;
    top: 20px;
    left: 20px;
    background: #000;
    color: #00FF00;
    border: 2px solid #00FF00;
    border-radius: 10px;
    box-shadow: 0 0 20px #00FF00;
    width: auto;
    z-index: 99999;
    animation: flicker 2s infinite alternate;
  }

  .gui-core {
    width: 340px;
    display: flex;
    flex-direction: column;
  }

  .gui-header {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: #001100;
    color: #00FF00;
    border-bottom: 1px solid #00FF00;
    font-weight: bold;
    font-size: 16px;
    user-select: none;
  }

  .gui-body {
    padding: 10px;
    background: #000;
    text-align: center;
  }

  .gui-button {
    background-color: transparent;
    color: #00FF00;
    border: 1px solid #00FF00;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    padding: 10px;
    margin: 10px 0;
    width: 90%;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }

  .gui-button:hover {
    background-color: #00FF00;
    color: #000;
  }

  .gui-panel {
    background: #000;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #00FF00;
  }

  .gui-panel button {
    background: none;
    color: #00FF00;
    border: 1px solid #00FF00;
    font-size: 18px;
    cursor: pointer;
    padding: 5px 10px;
  }

  .gui-panel button:hover {
    background-color: #00FF00;
    color: black;
  }

  .credits {
    font-size: 10px;
    color: #00FF00;
    margin-top: 5px;
  }

  .titl {
    font-size: 30px;
    color: #00FF00;
    margin-top: 5px;
  }

  .gui-extension-panel {
    width: 230px;
    background: #000;
    border-left: 2px solid #00FF00;
    padding: 10px;
    box-sizing: border-box;
  }

  .calculator-display {
    background: #001100;
    color: #00FF00;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #00FF00;
    width: 100%;
    text-align: right;
    box-sizing: border-box;
  }

  .calculator-buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
  }

  .calculator-buttons button {
    background: none;
    color: #00FF00;
    border: 1px solid #00FF00;
    font-size: 16px;
    cursor: pointer;
    padding: 10px;
    transition: background 0.3s, color 0.3s;
  }

  .calculator-buttons button:hover {
    background-color: #00FF00;
    color: black;
  }
`;
document.head.appendChild(style);

// Create GUI
const gui = document.createElement("div");
gui.className = "gui-container";
gui.innerHTML = `
  <div class="gui-core">
    <div class="gui-header" id="guiHeader">
      <div class="titl">JuniorGUI</div>
    </div>
    <div class="gui-body" id="guiBody">
      <div class="credits">Made by <a href="https://github.com/jamesko4011" target="_blank" style="color:white;">Jamesko1104</a></div>
      <button class="gui-button" id="autoBtn">Auto Answer</button>
      <button class="gui-button" id="showAnsBtn">Show Answer</button>
    </div>
    <div class="gui-panel">
      <button id="minBtn" title="Minimize">–</button>
      <button id="closeBtn" title="Close GUI">&times;</button>
    </div>
  </div>
  <div class="gui-extension-panel">
    <div class="calculator-display" id="calcDisplay">0</div>
    <div class="calculator-buttons" id="calcButtons">
      <button>7</button><button>8</button><button>9</button><button>/</button>
      <button>4</button><button>5</button><button>6</button><button>*</button>
      <button>1</button><button>2</button><button>3</button><button>-</button>
      <button>0</button><button>.</button><button>=</button><button>+</button>
      <button>√</button><button>^</button><button>%</button><button>C</button>
    </div>
  </div>
`;
document.body.appendChild(gui);

// Dragging
const header = document.getElementById("guiHeader");
let dragging = false, offsetX = 0, offsetY = 0;
header.addEventListener("mousedown", (e) => {
  if (e.target.closest("button")) return;
  dragging = true;
  offsetX = e.clientX - gui.offsetLeft;
  offsetY = e.clientY - gui.offsetTop;
  document.body.style.userSelect = "none";
});
document.addEventListener("mousemove", (e) => {
  if (dragging) {
    gui.style.left = `${e.clientX - offsetX}px`;
    gui.style.top = `${e.clientY - offsetY}px`;
  }
});
document.addEventListener("mouseup", () => {
  dragging = false;
  document.body.style.userSelect = "";
});

// Buttons
document.getElementById("minBtn").addEventListener("click", () => {
  document.getElementById("guiBody").classList.toggle("hidden");
});
document.getElementById("closeBtn").addEventListener("click", () => gui.remove());

document.getElementById("showAnsBtn").addEventListener("click", () => {
  document.querySelectorAll('.question-invisible').forEach(el => {
    el.classList.remove('question-invisible');
    el.style.display = 'inline';
  });
});

document.getElementById("autoBtn").addEventListener("click", () => {
  let attempts = 0;
  const maxAttempts = 10;
  const cooldown = 2000;

  (function loop() {
    let correct = document.querySelector("span.question-invisible.correct")
               || document.querySelector("span.question-invisible.big_text.correct");
    const input = document.querySelector('input.form-text[name="answer_0"]');
    const submit = document.querySelector(".submit-question.button.success.radius.form-submit");

    if (correct && input && submit) {
      input.value = correct.textContent.trim();
      input.dispatchEvent(new Event("input", { bubbles: true }));
      submit.click();
    }

    attempts++;
    if (attempts < maxAttempts) {
      setTimeout(loop, cooldown);
    }
  })();
});

// Calculator logic
const display = document.getElementById("calcDisplay");
const buttons = document.getElementById("calcButtons");
let current = "";

buttons.addEventListener("click", (e) => {
  const val = e.target.textContent;
  if (!e.target.matches("button")) return;

  switch (val) {
    case "=":
      try {
        current = current.replace("√", "Math.sqrt").replace("^", "**");
        display.textContent = eval(current);
        current = display.textContent;
      } catch {
        display.textContent = "Error";
        current = "";
      }
      break;
    case "C":
      current = "";
      display.textContent = "0";
      break;
    case "√":
    case "^":
    case "%":
    case "+":
    case "-":
    case "*":
    case "/":
    case ".":
      current += val;
      display.textContent = current;
      break;
    default:
      current += val;
      display.textContent = current;
  }
});
