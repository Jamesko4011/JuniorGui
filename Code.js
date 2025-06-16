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
  .gui-container {
    font-family: 'Fredoka One', cursive;
    position: fixed;
    top: 20px;
    left: 20px;
    background: white;
    color: #111;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    width: 330px;
    min-width: 200px;
    z-index: 99999;
    overflow: hidden !important;
    resize: none !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gui-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    cursor: move;
    background-color: #0066cc;
    color: white;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
  }
  .gui-header img {
    width: 30px;
    height: 30px;
  }
  .gui-header span {
    font-weight: bold;
    font-size: 18px;
  }
  .gui-body {
    padding: 15px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #3391bd;
    color: white;
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
    max-width: 280px;
  }
  .gui-button:hover {
    background-color: #005bb5;
  }
  .gui-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    background: url('https://www.junioreinstein.nl/template/images/backgrounds/nl_junioreinstein/medium/bg-default.png') no-repeat center center;
    background-size: cover;
    background-color: #3391bd;
    width: 100%;
    box-sizing: border-box;
  }
  .gui-panel button {
    background-color: #0066cc;
    border: 2px solid #FFFFFF;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 20px;
    cursor: pointer;
    padding: 5px 12px;
    user-select: none;
  }
  .gui-panel button:hover {
    background-color: #005bb5;
  }
  .gui-container.minimized .gui-body {
    max-height: 0;
    padding: 0;
    overflow: hidden;
  }
  .credits {
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    color: white;
  }
`;
document.head.appendChild(style);

// Create GUI
const gui = document.createElement("div");
gui.className = "gui-container";
gui.innerHTML = `
  <div class="gui-header" id="guiHeader">
    <div class="left">
      <img src="https://i.ibb.co/C5tNRXNf/image-removebg-preview-4.png" alt="Logo">
      <span>JuniorGUI</span>
    </div>
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
`;
document.body.appendChild(gui);

// Drag functionality
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

// Minimize button
document.getElementById("minBtn").addEventListener("click", () => {
  gui.classList.toggle("minimized");
  document.getElementById("minBtn").textContent = gui.classList.contains("minimized") ? "+" : "–";
});

// Close button
document.getElementById("closeBtn").addEventListener("click", () => gui.remove());

// Show Answer button logic — change div.question-invisible.big_text to class "text"
document.getElementById("showAnsBtn").addEventListener("click", () => {
  // Show the original question text
  document.querySelectorAll('div.question-invisible.big_text').forEach(el => {
    el.className = "text";
  });

  // Show the correct answers
  document.querySelectorAll('span.question-invisible.correct').forEach(el => {
    el.className = "text correct"; // keep correct class if needed for styling
  });
});


// Auto Answer button logic — repeat 10 times with 2s cooldown
document.getElementById("autoBtn").addEventListener("click", () => {
  let attempts = 0;
  const maxAttempts = 10;
  const cooldown = 2000; // 2 seconds

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
