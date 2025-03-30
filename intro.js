// Create Intro Screen
const introScreen = document.createElement("div");
introScreen.style.position = "fixed";
introScreen.style.top = "0";
introScreen.style.left = "0";
introScreen.style.width = "100vw";
introScreen.style.height = "100vh";
introScreen.style.background = "linear-gradient(to right, #fbc2eb, #a6c1ee)";
introScreen.style.display = "flex";
introScreen.style.flexDirection = "column";
introScreen.style.justifyContent = "center";
introScreen.style.alignItems = "center";
introScreen.style.fontFamily = "Arial, sans-serif";
document.body.appendChild(introScreen);

// Title
const title = document.createElement("h1");
title.textContent = " Welcome to the Pie Game!";
title.style.fontSize = "48px";
title.style.color = "#4b2e83";
title.style.marginBottom = "40px";
introScreen.appendChild(title);

// Player Image Display
const playerImage = document.createElement("img");
playerImage.src = "player.png"; // Replace with the correct path to your player image
playerImage.style.width = "150px";
playerImage.style.height = "150px";
playerImage.style.marginBottom = "30px";
playerImage.style.borderRadius = "50%";
introScreen.appendChild(playerImage);

// Settings Section
const settingsContainer = document.createElement("div");
settingsContainer.style.margin = "30px";
settingsContainer.style.background = "#fff";
settingsContainer.style.padding = "20px";
settingsContainer.style.borderRadius = "10px";
introScreen.appendChild(settingsContainer);

// Number of Questions
const questionsLabel = document.createElement("p");
questionsLabel.textContent = "Number of Questions:";
questionsLabel.style.marginBottom = "10px";
settingsContainer.appendChild(questionsLabel);

const questionsSelect = document.createElement("select");
[5, 10, 15, 20].forEach(num => {
  const option = document.createElement("option");
  option.value = num;
  option.textContent = num;
  questionsSelect.appendChild(option);
});
questionsSelect.style.marginBottom = "20px";
settingsContainer.appendChild(questionsSelect);

// Time Limit
const timeLabel = document.createElement("p");
timeLabel.textContent = "Time Limit (seconds):";
timeLabel.style.marginBottom = "10px";
settingsContainer.appendChild(timeLabel);

const timeSelect = document.createElement("select");
[60, 120, 180, 240].forEach(time => {
  const option = document.createElement("option");
  option.value = time;
  option.textContent = time;
  timeSelect.appendChild(option);
});
timeSelect.style.marginBottom = "20px";
settingsContainer.appendChild(timeSelect);

// Difficulty Level
const difficultyLabel = document.createElement("p");
difficultyLabel.textContent = "Difficulty Level:";
difficultyLabel.style.marginBottom = "10px";
settingsContainer.appendChild(difficultyLabel);

const difficultySelect = document.createElement("select");
[
  {value: 1, text: "Easy"},
  {value: 2, text: "Medium"},
  {value: 3, text: "Hard"}
].forEach(level => {
  const option = document.createElement("option");
  option.value = level.value;
  option.textContent = level.text;
  difficultySelect.appendChild(option);
});
settingsContainer.appendChild(difficultySelect);

// Start Button
const startButton = document.createElement("button");
startButton.textContent = "▶️ Start Game";
startButton.style.fontSize = "24px";
startButton.style.padding = "15px 30px";
startButton.style.margin = "10px";
startButton.style.border = "none";
startButton.style.borderRadius = "10px";
startButton.style.background = "#4CAF50";
startButton.style.color = "white";
startButton.style.cursor = "pointer";
introScreen.appendChild(startButton);

// Quit Button
const quitButton = document.createElement("button");
quitButton.textContent = "❌ Quit";
quitButton.style.fontSize = "24px";
quitButton.style.padding = "15px 30px";
quitButton.style.margin = "10px";
quitButton.style.border = "none";
quitButton.style.borderRadius = "10px";
quitButton.style.background = "#f44336";
quitButton.style.color = "white";
quitButton.style.cursor = "pointer";
introScreen.appendChild(quitButton);

// Quit Logic
quitButton.addEventListener("click", () => {
  introScreen.innerHTML = "<h1 style='color: #333'>Goodbye! See you next time 🥧</h1>";
});

// Start Game Logic
startButton.addEventListener("click", () => {
  introScreen.remove();
  window.gameSettings = {
    numQuestions: parseInt(questionsSelect.value),
    timeLimit: parseInt(timeSelect.value),
    difficulty: parseInt(difficultySelect.value)
  };
  const script = document.createElement("script");
  script.src = "game.js";
  document.body.appendChild(script);
});
