/* Configuration variables can be changed */
const animateSlides = true;
const autoPlay = true;
const sliderTimeout = 3000;
const stopOnClick = false;

/* Init variables do not touch unless u know what u are doing */
const slider = document.getElementById("mySlider");
const slides = slider.getElementsByClassName("mySlides");
const sliderNav = document.getElementById("mySliderNav");
const dots = sliderNav.getElementsByClassName("myDots");

let sliderTimeoutId;
let slideIndex = 0;
let slideDisplayEnded = false;
let rewindSlides = false;

/* If autoPlay then playSlider() else showSlide(firstIndex) */
autoPlay ? playSlider() : showSlide(slideIndex);

/* Display the nextSlide by clicking arrows */
function nextSlide(n) {
    rewindSlides = n < 0 ? true : false;
    if (slideDisplayEnded) {
        showSlide(slideIndex += n);
        stopOnClick || rewindSlides ? stopSlider() : null;
    }
}

/* Utils to set the slider background */
function setSliderBackground(n) {
    let urlImg = slides[n].getElementsByTagName("img")[0].src;
    slides[n].parentNode.style.backgroundSize = "contain";
    slides[n].parentNode.style.backgroundImage = "url('" + urlImg + "')";
}

function showSlide(n) {
    console.log(`ask-->showSlide(${slideIndex})`);
    slideDisplayEnded = false;
    if (n > slides.length - 1) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("w3-black");
    }
    if (rewindSlides) {
        if (animateSlides) {
            slides[slideIndex].classList.remove("w3-animate-right");
            slides[slideIndex].classList.add("w3-animate-left");
        }
    } else {
        if (animateSlides) {
            slides[slideIndex].classList.remove("w3-animate-left");
            slides[slideIndex].classList.add("w3-animate-right");
        }
    }
    slides[slideIndex].classList.add("w3-animate-opacity");
    slides[slideIndex].style.display = "block";
    slides[slideIndex].addEventListener("animationend", () => {
        dots[slideIndex].classList.add("w3-black");
        setSliderBackground(slideIndex);
        slides[slideIndex].addEventListener("touchend", () => nextSlide(1));
        slideDisplayEnded = true;
        console.log(`showSlide(${slideIndex})-->done`);
    });
}

function playSlider() {
    showSlide(slideIndex);
    sliderTimeoutId = setTimeout(() => { slideIndex++; playSlider(); }, sliderTimeout);
}

function stopSlider() {
    if (typeof (sliderTimeoutId) !== "undefined")
        clearTimeout(sliderTimeoutId);
}

class Slider {
    constructor() {

    }

}