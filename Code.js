// Load Fredoka One font
const font = document.createElement("link");
font.href = "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap";
font.rel = "stylesheet";
document.head.appendChild(font);

// Inject styles
const style = document.createElement("style");
style.textContent = `
  .dark-mode {
    background: #1e1e1e !important;
    color: #ddd !important;
  }
  .gui-container {
    font-family: 'Fredoka One', cursive;
    position: fixed;
    top: 20px;
    left: 20px;
    background: white;
    border: 2px solid #ccc;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    width: 330px;
    min-width: 200px;
    z-index: 99999;
    resize: both;
    overflow: hidden; /* Important to hide content when minimized */
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background-color 0.3s, color 0.3s;
  }
  .gui-container.dark-mode {
    background: #1e1e1e;
    border-color: #555;
    color: #ddd;
  }
  .gui-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-bottom: 2px solid #ccc;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    cursor: move;
    background-color: #0066cc;
    color: white;
    user-select: none;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
  }
  .gui-container.dark-mode .gui-header {
    background-color: #0050a3;
  }
  .gui-header .left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .gui-header img {
    width: 30px;
    height: 30px;
  }
  .gui-header span {
    font-size: 18px;
  }
  .gui-body {
    padding: 15px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    transition: max-height 0.3s ease;
  }
  .gui-button {
    font-family: 'Fredoka One', cursive;
    width: 95%;
    margin: 10px auto;
    padding: 15px;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 100px;
    font-size: 106%;
    cursor: pointer;
    transition: background-color 0.3s;
    max-width: 280px;
  }
  .gui-button:hover {
    background-color: #005bb5;
  }
  .gui-container.dark-mode .gui-button {
    background-color: #3399ff;
    color: #222;
  }
  .gui-container.dark-mode .gui-button:hover {
    background-color: #267acc;
  }
  .gui-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-top: 2px solid #ccc;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    background: #f9f9f9;
    width: 100%;
    box-sizing: border-box;
    transition: max-height 0.3s ease;
  }
  .gui-container.dark-mode .gui-panel {
    background: #2a2a2a;
    border-color: #555;
  }
  .gui-panel button {
    background: none;
    border: 2px solid #0066cc;
    border-radius: 8px;
    color: #0066cc;
    font-size: 20px;
    cursor: pointer;
    padding: 5px 12px;
    transition: background-color 0.3s, color 0.3s;
    user-select: none;
  }
  .gui-panel button:hover {
    background-color: #0066cc;
    color: white;
  }
  .gui-container.dark-mode .gui-panel button {
    border-color: #3399ff;
    color: #3399ff;
  }
  .gui-container.dark-mode .gui-panel button:hover {
    background-color: #3399ff;
    color: #222;
  }

  /* Minimized state: hide body, keep panel visible */
  .gui-container.minimized .gui-body {
    max-height: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
  }
  .gui-container.minimized .gui-panel {
    max-height: none;  /* keep panel visible */
    padding: 10px 0;
    pointer-events: auto;
    user-select: auto;
  }
`;
document.head.appendChild(style);

// Create GUI container
const gui = document.createElement("div");
gui.className = "gui-container";
gui.innerHTML = `
  <div class="gui-header" id="guiHeader">
    <div class="left">
      <img src="https://i.ibb.co/C5tNRXNf/image-removebg-preview-4.png" alt="Logo">
      <span>Junior Einsten Cheat GUI</span>
    </div>
  </div>
  <div class="gui-body" id="guiBody">
    <button class="gui-button" id="autoBtn">Auto Answer</button>
    <button class="gui-button" onclick="
      document.querySelectorAll('span.question-invisible.correct').forEach(span => {
        span.classList.remove('question-invisible');
        span.classList.add('question-visible');
      });
    ">Show Answer</button>
  </div>
  <div class="gui-panel">
    <button id="minBtn" title="Minimize">–</button>
    <button id="closeBtn" title="Close GUI">&times;</button>
    <button id="darkModeBtn" title="Toggle Dark Mode">☀️</button>
  </div>
`;
document.body.appendChild(gui);

// Dragging functionality (drag by header)
const header = document.getElementById("guiHeader");
let dragging = false;
let offsetX = 0, offsetY = 0;

header.addEventListener("mousedown", (e) => {
  if (e.target.closest("button")) return; // prevent drag if clicking buttons
  dragging = true;
  offsetX = e.clientX - gui.offsetLeft;
  offsetY = e.clientY - gui.offsetTop;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (dragging) {
    gui.style.left = (e.clientX - offsetX) + "px";
    gui.style.top = (e.clientY - offsetY) + "px";
  }
});

document.addEventListener("mouseup", () => {
  dragging = false;
  document.body.style.userSelect = "";
});

// Minimize button logic
const minBtn = document.getElementById("minBtn");
let minimized = false;
minBtn.onclick = () => {
  minimized = !minimized;
  if (minimized) {
    gui.classList.add("minimized");
    minBtn.textContent = "+";
  } else {
    gui.classList.remove("minimized");
    minBtn.textContent = "–";
  }
};

// Close button logic
const closeBtn = document.getElementById("closeBtn");
closeBtn.onclick = () => gui.remove();

// Dark mode toggle (only GUI container)
const darkModeBtn = document.getElementById("darkModeBtn");
darkModeBtn.onclick = () => {
  gui.classList.toggle("dark-mode");
  darkModeBtn.textContent = gui.classList.contains("dark-mode") ? "🌙" : "☀️";
};

// Auto Answer Logic
document.getElementById("autoBtn").addEventListener("click", () => {
  let attempts = 0;
  const maxAttempts = 10;

  (function loop() {
    const correct = document.querySelector("span.question-invisible.correct");
    const input = document.querySelector('input.form-text[name="answer_0"]');
    const submit = document.querySelector(".submit-question.button.success.radius.form-submit");

    if (correct && input && submit) {
      input.value = correct.textContent.trim();
      input.dispatchEvent(new Event("input", { bubbles: true }));
      submit.click();
      if (++attempts < maxAttempts) setTimeout(loop, 500);
    } else {
      setTimeout(loop, 200);
    }
  })();
});
