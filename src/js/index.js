document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("draggable-images");
  const basePath = "./src/images/pkmn/";
  const totalImages = 151; // cantidad total de imágenes de Pokémon

  for (let i = 1; i <= totalImages; i++) {
    const image = document.createElement("img");
    const imageNumber = String(i).padStart(3, '0'); // agrega ceros adelante, por ejemplo, 001, 002, etc.
    image.src = `${basePath}${imageNumber}.png`;
    image.alt = `pokemon-${imageNumber}`;
    imageContainer.appendChild(image);
  }
});

const rangeH = document.querySelector("#horizontal-slider");
const rangeV = document.querySelector("#vertical-slider");
const titleTshirt = document.querySelector("#title-overlay");
const titleInput = document.querySelector("#title-input");

const blackRadio = document.getElementById("black");
const whiteRadio = document.getElementById("white");
const tshirtBase = document.getElementById("tshirt-base");

const previewSection = document.querySelector(".preview-section");

function updateTshirtColor() {
  if (blackRadio.checked) {
    tshirtBase.src = "./src/images/tshirt-black.png";
    titleTshirt.style.color = "var(--white-color)";
    previewSection.style.background = "var(--black-bg-color)";
  } else if (whiteRadio.checked) {
    tshirtBase.src = "./src/images/tshirt-white.png";
    titleTshirt.style.color = "var(--black-color)";
    previewSection.style.background = "var(--white-bg-color)";
  }
}

function updateText() {
  titleTshirt.textContent = titleInput.value;
}

function updateTransform() {
  const translateX = rangeH.value;
  const translateY = rangeV.value;
  titleTshirt.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

rangeH.addEventListener("input", updateTransform);
rangeV.addEventListener("input", updateTransform);
titleInput.addEventListener("input", updateText);
blackRadio.addEventListener("change", updateTshirtColor);
whiteRadio.addEventListener("change", updateTshirtColor);

updateTshirtColor();
