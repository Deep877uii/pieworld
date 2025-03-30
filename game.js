// --- GLOBAL VARIABLES ---
const gameContainer = document.createElement("div");
document.body.appendChild(gameContainer);
gameContainer.style.position = "relative";
gameContainer.style.width = "100vw";
gameContainer.style.height = "100vh";
gameContainer.style.display = "flex";
gameContainer.style.justifyContent = "center";
gameContainer.style.alignItems = "center";
gameContainer.style.background = "url('assets/background.jpg') no-repeat center center fixed";
gameContainer.style.backgroundSize = "cover";
gameContainer.style.overflow = "hidden";

let level = 1;
let score = 0;
let timer = window.gameSettings?.timeLimit || 120;
let currentQuestion = 0;
let totalQuestions = window.gameSettings?.numQuestions || 10;
let isMoving = false;
let interval;
let isGreenLight = true;

const endX = window.innerWidth - 150;
let character;
let finishLine;

// --- MUSIC & SFX ---
const moveSound = new Audio("assets/mokoba.mp3");
moveSound.loop = true;
moveSound.volume = 0.1;
moveSound.play();

const gunshotSound = new Audio("assets/gunshot.mp3");
const redLightSound = new Audio("assets/red_light.mp3");
const greenLightSound = new Audio("assets/green_light.mp3");

function playSoundEffect(sound) {
    sound.currentTime = 0;
    sound.play();
}

// --- GREEN LIGHT / RED LIGHT CYCLE ---
function startRedLightGreenLight() {
    setInterval(() => {
        if (isGreenLight) {
            isGreenLight = false;
            playSoundEffect(redLightSound);
        } else {
            isGreenLight = true;
            playSoundEffect(greenLightSound);
        }
    }, 5000); // Switch every 5 seconds
}

// --- CHARACTER ---
function createCharacter() {
    character = document.createElement("img");
    character.src = "assets/player.png";
    character.style.width = "80px";
    character.style.height = "160px";
    character.style.position = "absolute";
    character.style.bottom = "20px";
    character.style.left = `${50 + (currentQuestion * ((endX - 50) / totalQuestions))}px`;
    gameContainer.appendChild(character);
}

// --- DOLL CHARACTER (Finish Line) ---
function createDoll() {
    const doll = document.createElement("img");
    doll.src = "assets/doll.png"; // Make sure the file name matches your doll image name in the assets folder
    doll.style.width = "120px";
    doll.style.height = "240px";
    doll.style.position = "absolute";
    doll.style.bottom = "20px";
    doll.style.right = "20px";
    gameContainer.appendChild(doll);
}

// --- HUD ---
const hud = document.createElement("div");
hud.style.position = "absolute";
hud.style.top = "20px";
hud.style.left = "20px";
hud.style.color = "#fff";
hud.style.fontSize = "20px";
hud.style.fontFamily = "Arial";
hud.style.background = "rgba(0, 0, 0, 0.5)";
hud.style.padding = "10px";
gameContainer.appendChild(hud);

function updateHUD() {
    hud.innerHTML = `⭐ Score: ${score} | ⏱️ Time: ${timer}s | Question: ${currentQuestion + 1}/${totalQuestions}`;
}

// --- TIMER ---
function startTimer() {
    interval = setInterval(() => {
        timer--;
        updateHUD();
        if (timer <= 0) {
            clearInterval(interval);
            showGameOver("⏳ Time's up! Game Over!");
        }
    }, 1000);
}

// --- QUESTION GENERATION ---
function generateQuestion() {
    gameContainer.innerHTML = "";
    gameContainer.appendChild(hud);
    createCharacter();
    createDoll();

    const difficulty = window.gameSettings?.difficulty || 1;
    const operators = ['+', '-', '*', '/'];
    let maxNum = 10 + (difficulty * 10);
    let num1 = Math.floor(Math.random() * maxNum) + 1;
    let num2 = Math.floor(Math.random() * maxNum) + 1;
    let operator = operators[Math.floor(Math.random() * operators.length)];
    let answer;

    switch (operator) {
        case '+': answer = num1 + num2; break;
        case '-': answer = num1 - num2; break;
        case '*': answer = num1 * num2; break;
        case '/': answer = Math.floor(num1 / num2); break;
    }

    const questionContainer = document.createElement("div");
    questionContainer.style.position = "absolute";
    questionContainer.style.top = "20%";
    questionContainer.style.background = "white";
    questionContainer.style.padding = "20px";
    questionContainer.style.borderRadius = "10px";
    gameContainer.appendChild(questionContainer);

    const questionText = document.createElement("div");
    questionText.textContent = `${num1} ${operator} ${num2} = ?`;
    questionContainer.appendChild(questionText);

    const input = document.createElement("input");
    input.type = "number";
    questionContainer.appendChild(input);

    const btn = document.createElement("button");
    btn.textContent = "Submit";
    btn.onclick = () => {
        if (isGreenLight) {
            if (parseInt(input.value) === answer) {
                score += 10;
                currentQuestion++;
                updateHUD();
                generateQuestion();
            } else {
                playSoundEffect(gunshotSound);
                showGameOver("💥 Wrong Answer! Game Over!");
            }
        } else {
            playSoundEffect(gunshotSound);
            showGameOver("❌ You answered during Red Light! Game Over!");
        }
    };
    questionContainer.appendChild(btn);
}

// --- GAME OVER ---
function showGameOver(message) {
    clearInterval(interval);
    alert(message);
    location.reload();
}

// --- START GAME ---
generateQuestion();
startTimer();
startRedLightGreenLight();
