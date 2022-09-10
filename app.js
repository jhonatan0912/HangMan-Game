const palabras = [
  "pata",
  "pirata",
  "atajo",
  "semana",
  "ideas",
  "vestido",
  "miedo",
  "letras",
  "queso",
  "fuerza",
  "carro",
  "suiza",
  "grapas",
  "colgar",
  "zorro",
  "calor",
  "ducha",
  "lima",
  "feliz",
  "gala",
  "morder",
  "peso",
  "rock",
  "ataca",
  "adulto",
  "señal",
  "kilos",
  "volar",
  "suma",
  "bombo",
  "volver",
  "cabeza",
  "lana",
  "falso",
  "faro",
  "pasaje",
  "sonido",
  "broma",
  "niña",
  "salud",
  "yate",
  "ford",
  "vacas",
  "uña",
  "herida",
  "miope"
];
let word = seleccionarPalabraRandom();
const palabraContainer = document.getElementById("palabraContainer");
const hombreContainer = document.getElementById("hombreContainer");
const respuestaContainer = document.getElementById("respuestaContainer");
const palabraAdivinadaContainer = document.getElementById(
  "palabraAdivinadaContainer"
);
let palabrasAdivinadas = [
  "MediaPlayPause",
  "MediaTrackNext",
  "MediaTrackPrevious",
  "Control",
  " ",
  ",",
  ".",
  "Backspace",
  "Delete",
  "ESC",
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "End",
  "OS",
  "Enter",
  "PageUp",
  "NumLock",
  "PageDown",
  "Alt",
  "Tab",
  "Shift",
  "Insert",
  "/",
  "*",
  "-",
  "+",
  "<",
  "AltGraph",
  "CapsLock",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "meta",
  "contextmenu",
  "home",
  "scrolllock",
  "pause",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "f10",
  "f11",
  "f12",
  "escape",
  "|",
  "´",
  "+",
  "{",
  "}",
];
let mistakeCount = 0;
const threshold = 7;

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", resetHangman);

const thresholdContainer = document.getElementById("threshold");
thresholdContainer.innerHTML = `Te quedan ${threshold - 1} intentos`;

document.addEventListener("keydown", logEvent);

function seleccionarPalabraRandom() {
  return palabras[Math.floor(Math.random() * palabras.length)];
}

function crearInputs() {
  for (let i = 0; i < word.length; i++) {
    let newNode = document.createElement("input");
    newNode.type = "text";
    newNode.setAttribute("id", "letter_" + i);
    newNode.setAttribute("disabled", "true");
    palabraContainer.appendChild(newNode);
  }
}

function palabraEstaCompleta() {
  let letters = 0;
  for (let i = 0; i < word.length; i++) {
    let currentInput = document.getElementById("letter_" + i);
    if (currentInput.getAttribute("readonly")) {
      letters++;
    }
  }

  if (letters === word.length) {
    return true;
  }
}

function estaLetraEnPalabra(letter) {
  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === letter.toLowerCase()) {
      return true;
    }
  }
}

function replaceInput(letter) {
  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === letter.toLowerCase()) {
      let currentInput = document.getElementById("letter_" + i);
      currentInput.classList.add("correct");
      currentInput.value = letter;
      currentInput.setAttribute("readonly", "true");
    }
  }
}

function replaceAllInputs() {
  for (let i = 0; i < word.length; i++) {
    let currentInput = document.getElementById("letter_" + i);
    currentInput.setAttribute("readonly", "true");
  }
}

function drawHead() {
  const head = document.createElement("div");
  head.classList.add("head");
  hombreContainer.appendChild(head);
}

function drawBody() {
  const body = document.createElement("div");
  body.classList.add("body");
  hombreContainer.appendChild(body);
}

function drawLeftArm() {
  const leftArm = document.createElement("div");
  leftArm.classList.add("left-arm");
  hombreContainer.appendChild(leftArm);
}

function drawRightArm() {
  const rightArm = document.createElement("div");
  rightArm.classList.add("right-arm");
  hombreContainer.appendChild(rightArm);
}

function drawLeftLeg() {
  const leftLeg = document.createElement("div");
  leftLeg.classList.add("left-leg");
  hombreContainer.appendChild(leftLeg);
}

function drawRightLeg() {
  const rightLeg = document.createElement("div");
  rightLeg.classList.add("right-leg");
  hombreContainer.appendChild(rightLeg);
}

function drawMan() {
  drawHead();
  drawBody();
  drawLeftArm();
  drawRightArm();
  drawLeftLeg();
  drawRightLeg();
}

function drawPart(letter) {
  createLetterGuessed(letter);
  switch (mistakeCount) {
    case 1:
      drawHead();
      break;
    case 2:
      drawBody();
      break;
    case 3:
      drawLeftArm();
      break;
    case 4:
      drawRightArm();
      break;
    case 5:
      drawLeftLeg();
      break;
    case 6:
      drawRightLeg();
      break;
    case threshold:
      replaceAllInputs();
      respuestaContainer.innerHTML = "<p class='fail'> Perdiste</p>";
      break;
  }
}

function isLetterUsed(letter) {
  for (let i = 0; i < palabrasAdivinadas.length; i++) {
    if (letter === palabrasAdivinadas[i].toLowerCase()) {
      return true;
    }
  }
}

function createLetterGuessed(letter) {
  if (!isLetterUsed(letter)) {
    const node = document.createElement("p");
    node.textContent = letter;
    palabraAdivinadaContainer.appendChild(node);
    palabrasAdivinadas.push(letter);
    mistakeCount = mistakeCount + 1;
    thresholdContainer.innerHTML = `Te quedan ${threshold - mistakeCount} intentos`;
  }
}

function resetHangman() {
  mistakeCount = 0;
  thresholdContainer.innerHTML = `Te quedan ${threshold - 1} intentos`;

  hombreContainer.replaceChildren();
  palabraAdivinadaContainer.replaceChildren();
  palabraContainer.replaceChildren();
  respuestaContainer.replaceChildren();
  let palabrasAdivinadas = [
    "MediaPlayPause",
    "MediaTrackNext",
    "MediaTrackPrevious",
    "Control",
    " ",
    ",",
    ".",
    "Backspace",
    "Delete",
    "ESC",
    "ArrowUp",
    "ArrowLeft",
    "ArrowDown",
    "ArrowRight",
    "End",
    "OS",
    "Enter",
    "PageUp",
    "NumLock",
    "PageDown",
    "Alt",
    "Tab",
    "Shift",
    "Insert",
    "/",
    "*",
    "-",
    "+",
    "<",
    "AltGraph",
    "CapsLock",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "meta",
    "contextmenu",
    "home",
    "scrolllock",
    "pause",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "f10",
    "f11",
    "f12",
    "escape",
    "|",
    "´",
    "+",
    "{",
    "}",
  ];
  word = seleccionarPalabraRandom();
  crearInputs();
}

function logEvent(e) {
  if (estaLetraEnPalabra(e.key) && mistakeCount !== threshold) {
    replaceInput(e.key);
    if (palabraEstaCompleta()) {
      respuestaContainer.innerHTML = "<p class='win'> Ganaste!</p>";
    }
  } else {
    if (!palabraEstaCompleta()) {
      drawPart(e.key.toLowerCase());
    }
  }
}

crearInputs();