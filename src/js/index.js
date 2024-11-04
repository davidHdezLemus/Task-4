document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("draggable-images");
  const basePath = "./src/images/pkmn/";
  const totalImages = 151; // total number of images

  // Load images into the container
  for (let i = 1; i <= totalImages; i++) {
    const image = document.createElement("img");
    const imageNumber = String(i).padStart(3, '0'); // pad numbers with leading zeros, e.g., 001, 002, etc.
    image.src = `${basePath}${imageNumber}.png`;
    image.alt = `pokemon-${imageNumber}`;
    image.draggable = true;
    image.addEventListener("dragstart", dragElement);
    imageContainer.appendChild(image);
  }

  // Function to update events based on screen width
  function updateEvents() {
    const isSmallScreen = window.matchMedia("(max-width: 480px)").matches;
    if (isSmallScreen) {
      imageContainer.querySelectorAll("img").forEach(img => {
        img.removeEventListener("dragstart", dragElement);
        img.addEventListener("click", clickElement);
      });
    } else {
      imageContainer.querySelectorAll("img").forEach(img => {
        img.removeEventListener("click", clickElement);
        img.addEventListener("dragstart", dragElement);
      });
    }
  }

  // Call the function on page load
  updateEvents();

  // Call the function on window resize
  window.addEventListener("resize", updateEvents);
});

const rangeH = document.querySelector("#horizontal-slider");
const rangeV = document.querySelector("#vertical-slider");
const titleContainer = document.querySelector("#title-overlay");
const titleTshirt = document.querySelector(".font-pkmn");
const titleInput = document.querySelector("#title-input");
const charNameTshirt = document.querySelector("#character-name");
const blackRadio = document.getElementById("black");
const whiteRadio = document.getElementById("white");

const tshirtBase = document.getElementById("tshirt-base");
const previewSection = document.querySelector(".preview-section");
const tshirtContainer = document.getElementById("tshirt-container");
const imageOverlay = document.getElementById("image-overlay");
const mirrorOverlay = document.getElementById("mirrored-overlay");

// Function to update the T-shirt color based on selected radio button
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

// Function to update the text on the T-shirt
function updateText() {
  titleTshirt.textContent = titleInput.value;
}

// Function to update the position of the text on the T-shirt
function updateTransform() {
  const translateX = rangeH.value;
  const translateY = rangeV.value;
  titleContainer.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

// Event listeners for sliders and input fields
rangeH.addEventListener("input", updateTransform);
rangeV.addEventListener("input", updateTransform);
titleInput.addEventListener("input", updateText);
blackRadio.addEventListener("change", updateTshirtColor);
whiteRadio.addEventListener("change", updateTshirtColor);

let currentImage;
tshirtContainer.addEventListener("drop", dropElement);
tshirtContainer.addEventListener("dragover", dragoverElement);

// Function to handle drag start event
function dragElement(event) {
  currentImage = event.target;
  event.dataTransfer.setData("text/plain", event.target.src);
}

// Function to handle click event for images
function clickElement(event) {
  const imageSrc = event.target.src;
  placeImage(imageSrc);
}

// Function to handle drop event
function dropElement(event) {
  event.preventDefault();
  const imageSrc = event.dataTransfer.getData("text/plain");
  placeImage(imageSrc);
}

// Function to place the image on the T-shirt
function placeImage(imageSrc) {
  // Extract the file name without extension
  const fileName = imageSrc.split('/').pop().split('.').shift();
  charNameTshirt.textContent = `#${fileName}`;

  // Clear previous images in imageOverlay and mirrorOverlay
  imageOverlay.innerHTML = '';
  mirrorOverlay.innerHTML = '';

  // Create the first instance of the image for imageOverlay
  const newImageOverlay = document.createElement("img");
  newImageOverlay.src = imageSrc;
  newImageOverlay.style.position = "absolute";
  newImageOverlay.style.width = "200%";

  // Create the second instance of the image for mirrorOverlay and invert it
  const newImageMirror = document.createElement("img");
  newImageMirror.src = imageSrc;
  newImageMirror.style.position = "absolute";
  newImageMirror.style.width = "100%";
  newImageMirror.style.transform = "scaleX(-1)"; // Apply horizontal mirror effect

  // Add each image to its corresponding container
  imageOverlay.appendChild(newImageOverlay);
  mirrorOverlay.appendChild(newImageMirror);
}

// Function to handle drag over event
function dragoverElement(event) {
  event.preventDefault();
}

// Initialize T-shirt color on page load
updateTshirtColor();
