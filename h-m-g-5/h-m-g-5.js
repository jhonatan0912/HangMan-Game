//!listener para recargar la pagina mediante el boton de enter
const body = document.body;
body.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    location.reload();
  }
})

//!Objeto con palabras random
const palabras = [
  "sillon",
  "licuadora",
  "secadora",
  "escoba",
  "espejo",
  "lapicero",
  "cuaderno",
  "mesa",
  "silla",
  "peluche",
  "libro",
  "cama",
  "llave",
  "juquete",
  "casino",
  "lampara",
  "zapatilla",
  "zapato",
  "medias",
  "puerta",
  "celular",
  "laptop",
  "monitor",
  "television",
  "ventana",
  "bloqueador",
  "reloj",
  "wifi",
  "cable",
  "cuadro",
  "cocina",
  "estante",
  "refrigeradora",
  "sarten",
  "casco",
  "carro",
  "helicoptero",
  "sombrero",
  "pantalon",
  "yate",
  "libreria",
  "tienda",
  "arbol",
  "poste",
  "hospital",
  "escalera",
  "pincel",
  "tempera",
  "piedra",
  "estatua",
  "tanque",
  "camion",
  "canasta",
  "bolsa",
  "desodorante",
  "perfume",
  "cartera",
  "monedero",
  "alcancia"
];

let word = seleccionarPalabraRandom();

const palabraContainer = document.getElementById("palabraContainer");
const hombreContainer = document.getElementById("hombreContainer");
const respuestaContainer = document.getElementById("respuestaContainer");
const letraAdivinadaContainer = document.getElementById("letraAdivinadaContainer");
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

//! Funcion que selecciona una palabra al azar del objeto palabras
function seleccionarPalabraRandom() {
  return palabras[Math.floor(Math.random() * palabras.length)];
}

//! Funcion para crear inputs segun la cantidad de letras de la palabra al azar
function crearInputs() {
  for (let i = 0; i < word.length; i++) {
    let newNode = document.createElement("input");
    newNode.type = "text";
    newNode.setAttribute("id", "letter_" + i);
    newNode.setAttribute("disabled", "true");
    palabraContainer.appendChild(newNode);
  }
}

//! Funcion que compara si el tamaño de la palabra esta completa, si es asi devuelve un true
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
//! Funcion que compara la palabra random con la letra que ingresamos, si es verdadero devuelve un true
function estaLetraEnPalabra(letter) {
  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === letter.toLowerCase()) {
      return true;
    }
  }
}
//! Funcion que le da da la clase correct si la letra que ingresamos se encuentra en la palabra random
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
//! Funcion que resetea los valores de los inputs y le agrega el atributo de solo leer
function replaceAllInputs() {
  for (let i = 0; i < word.length; i++) {
    let currentInput = document.getElementById("letter_" + i);
    currentInput.setAttribute("readonly", "true");
  }
}
//! Funcion para crear la cabeza del hombre
function drawHead() {
  const head = document.createElement("div");
  head.classList.add("head");
  hombreContainer.appendChild(head);
}
//! Funcion para crear el cuerpo del hombre
function drawBody() {
  const body = document.createElement("div");
  body.classList.add("body");
  hombreContainer.appendChild(body);
}
//! Funcion para crear el brazo izquiedo
function drawLeftArm() {
  const leftArm = document.createElement("div");
  leftArm.classList.add("left-arm");
  hombreContainer.appendChild(leftArm);
}
//! Funcion para crear el brazo derecho
function drawRightArm() {
  const rightArm = document.createElement("div");
  rightArm.classList.add("right-arm");
  hombreContainer.appendChild(rightArm);
}
//! Funcion para crear la pierna izquierda
function drawLeftLeg() {
  const leftLeg = document.createElement("div");
  leftLeg.classList.add("left-leg");
  hombreContainer.appendChild(leftLeg);
}
//! Funcion para crear la pierna derecha
function drawRightLeg() {
  const rightLeg = document.createElement("div");
  rightLeg.classList.add("right-leg");
  hombreContainer.appendChild(rightLeg);
}

//! Funcion que encapsula el dibujo del hombre en una sola funcion
function drawMan() {
  drawHead();
  drawBody();
  drawLeftArm();
  drawRightArm();
  drawLeftLeg();
  drawRightLeg();
}

//! Funcion para dibujar parte del cuerpo cuando la letra ingresada sea incorrecta
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
      respuestaContainer.innerHTML = "<p class='perdiste'> Perdiste</p>";
      break;
  }
}
//! Funcion para verificar si una letra con caracteres extraños se ingreso
function isLetterUsed(letter) {
  for (let i = 0; i < palabrasAdivinadas.length; i++) {
    if (letter === palabrasAdivinadas[i].toLowerCase()) {
      return true;
    }
  }
}
//! Funcion para crear un elemento con las palabras ingresadas
function createLetterGuessed(letter) {
  if (!isLetterUsed(letter)) {
    const node = document.createElement("p");
    node.classList.add('letter-used');
    node.textContent = letter;
    letraAdivinadaContainer.appendChild(node);
    palabrasAdivinadas.push(letter);
    mistakeCount = mistakeCount + 1;
    thresholdContainer.innerHTML = `Te quedan ${threshold - mistakeCount} intentos`;
  }
}

//! Funcion para eliminar la vista del hombre, la palabra random y los inputs
function resetHangman() {
  mistakeCount = 0;
  thresholdContainer.innerHTML = `Te quedan ${threshold - 1} intentos`;

  hombreContainer.replaceChildren();
  letraAdivinadaContainer.replaceChildren();
  palabraContainer.replaceChildren();
  respuestaContainer.replaceChildren();
  word = seleccionarPalabraRandom();
  crearInputs();
}

/*
*Funcion que detecta cuando el teclado esta presionado
*para comparar si la letra que ingresamos esta en la palabra random
*/
function logEvent(e) {
  if (estaLetraEnPalabra(e.key) && mistakeCount !== threshold) {
    replaceInput(e.key);
    if (palabraEstaCompleta()) {
      respuestaContainer.innerHTML = "<p class='ganaste'> Ganaste!</p>";
    }
  } else {
    if (!palabraEstaCompleta()) {
      drawPart(e.key.toLowerCase());
    }
  }
}

//! Invocamos a la funcion para crear los inputs cuando se recargue la pagina
crearInputs();