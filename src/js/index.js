document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("draggable-images");
  const basePath = "./src/images/pkmn/";
  const totalImages = 151; // cantidad total de imágenes
  for (let i = 1; i <= totalImages; i++) {
    const image = document.createElement("img");
    const imageNumber = String(i).padStart(3, '0'); // agrega ceros adelante, por ejemplo, 001, 002, etc.
    image.src = `${basePath}${imageNumber}.png`;
    image.alt = `pokemon-${imageNumber}`;
    image.draggable = true;
    image.addEventListener("dragstart", dragElement);
    imageContainer.appendChild(image);
  }
});

const rangeH = document.querySelector("#horizontal-slider");
const rangeV = document.querySelector("#vertical-slider");
const titleContainer = document.querySelector("#title-overlay");
const titleTshirt = document.querySelector("#font-pkmn");
const titleInput = document.querySelector("#title-input");
const charNameTshirt = document.querySelector("#character-name");
const blackRadio = document.getElementById("black");
const whiteRadio = document.getElementById("white");

const tshirtBase = document.getElementById("tshirt-base");
const previewSection = document.querySelector(".preview-section");
const tshirtContainer = document.getElementById("tshirt-container");
const imageOverlay = document.getElementById("image-overlay");
const mirrorOverlay = document.getElementById("mirrored-overlay");

function updateTshirtColor() {
  if (blackRadio.checked) {
    tshirtBase.src = "./src/images/tshirt-black.png";
    titleTshirt.style.color = "var(--white-color)";
    charNameTshirt.style.color = "var(--white-color)";
    previewSection.style.background = "var(--black-bg-color)";
  } else if (whiteRadio.checked) {
    tshirtBase.src = "./src/images/tshirt-white.png";
    titleTshirt.style.color = "var(--black-color)";
    charNameTshirt.style.color = "var(--black-color)";
    previewSection.style.background = "var(--white-bg-color)";
  }
}

function updateText() {
  titleTshirt.textContent = titleInput.value;
}

function updateTransform() {
  const translateX = rangeH.value;
  const translateY = rangeV.value;
  titleContainer.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

rangeH.addEventListener("input", updateTransform);
rangeV.addEventListener("input", updateTransform);
titleInput.addEventListener("input", updateText);
blackRadio.addEventListener("change", updateTshirtColor);
whiteRadio.addEventListener("change", updateTshirtColor);

let currentImage;
tshirtContainer.addEventListener("drop", dropElement);
tshirtContainer.addEventListener("dragover", dragoverElement);

function dragElement(event) {
  currentImage = event.target;
  event.dataTransfer.setData("text/plain", event.target.src);
}

// Selección del contenedor de overlay de imágenes

function dropElement(event) {
  event.preventDefault();
  const imageSrc = event.dataTransfer.getData("text/plain");

  // Extrae solo el nombre del archivo sin la extensión (separa por / y coge la ultima; separa por . y coge lo primero)
  const fileName = imageSrc.split('/').pop().split('.').shift();
  charNameTshirt.textContent = fileName;

  // Limpiar imágenes anteriores en imageOverlay y mirrorOverlay
  imageOverlay.innerHTML = '';
  mirrorOverlay.innerHTML = '';

  // Crear la primera instancia de la imagen para imageOverlay
  const newImageOverlay = document.createElement("img");
  newImageOverlay.src = imageSrc;
  newImageOverlay.style.position = "absolute";
  newImageOverlay.style.width = "200%";

  // Crear la segunda instancia de la imagen para mirrorOverlay e invertirla
  const newImageMirror = document.createElement("img");
  newImageMirror.src = imageSrc;
  newImageMirror.style.position = "absolute";
  newImageMirror.style.width = "100%";
  newImageMirror.style.transform = "scaleX(-1)"; // Aplica el efecto de espejo horizontal

  // Agregar cada imagen a su contenedor correspondiente
  imageOverlay.appendChild(newImageOverlay);
  mirrorOverlay.appendChild(newImageMirror);
}

function dragoverElement(event) {
  event.preventDefault();
}

updateTshirtColor();
