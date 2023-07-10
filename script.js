const slider = document.querySelector('#slider');
const slider1 = document.querySelector('#slider-1');
const canvas = document.querySelector('#canvas');
slider.addEventListener('input', handleInputSlider);
slider1.addEventListener('input', handleInputSlider1);
const ctx = canvas.getContext('2d');
const images = [];
window.addEventListener('load', pageLoaded);

function pageLoaded() {
    for (let i = 1; i <= 36; i += 1) {
      const number = i.toString().padStart(2, '00');
      const url = `https://images.stockx.com/360/Air-Jordan-1-High-OG-Spider-Man-Across-the-Spider-Verse/Images/Air-Jordan-1-High-OG-Spider-Man-Across-the-Spider-Verse/Lv2/img${number}.jpg?fm=avif&auto=compress&w=480&dpr=1&updated_at=1683569460&h=320&q=5`;
      const image = new Image();
      image.src = url;
      image.addEventListener('load', () => {
        images[i] = image;
        if (i === 1) {
          loadImage(i);
        }
      });
    }
}

function loadImage(index) {
    ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

function handleInputSlider() {
    console.log(this.value);
    loadImage(this.value);
    slider1.value = this.value; // Actualiza el valor del slider-1
}

function handleInputSlider1() {
    console.log(this.value);
    loadImage(this.value);
    slider.value = this.value; // Actualiza el valor del slider
}


var buttons = document.getElementsByClassName("products_list-text-size_ul");
var activeButton = null;
function updateSneakerSize(button) {
        var sneakerSizeElement = document.getElementById("sneaker-size");
        var newSize = button.textContent;
        sneakerSizeElement.textContent = "Sneaker Size: " + newSize;
        if (activeButton !== null) {
            activeButton.classList.remove("active");
        }

        button.classList.add("active");
        activeButton = button;
}


function toggleDivs() {
  var div2 = document.querySelector('.product-window-list-5-div-2');
  var div3 = document.querySelector('.product-window-list-5-div-3');
  var toggleButton = document.getElementById('toggleButton');

  if (div2.style.display === 'none' && div3.style.display === 'none') {
    div2.style.display = 'flex';
    div3.style.display = 'block';
    toggleButton.src = 'images-hub/chevron-doble-up.png'; // Ruta de la imagen cuando está clickeada
  } else {
    div2.style.display = 'none';
    div3.style.display = 'none';
    toggleButton.src = 'images-hub/chevron-doble-abajo.png'; // Ruta de la imagen cuando no está clickeada
  }
}

/* SCRIPTS CAROUSEL*/ 
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll(".carousel-div")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);


