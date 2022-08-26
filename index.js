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

let slideIndex = 0;
let slideDisplayEnded = false;
let rewindSlides = false;

/* If autoPlay then playSlider() else showSlide(firstIndex) */
autoPlay ? playSlider() : showSlide(slideIndex);


class Slider {
    constructor(animateSlides, autoplay, sliderTimeout, stopOnClick, sliderMaxWidth, arrayImg) {
        this.animateSlides = animateSlides;
        this.autoplay = autoplay;
        this.sliderTimeout = sliderTimeout;
        this.stopOnClick = stopOnClick;
        this.sliderMaxWidth = sliderMaxWidth;
        this.arrayImg = arrayImg;
        this.sliderTimeoutId = null;
    };
    drawSlider() {
        let slider = document.createElement("div");
        let slides;
        slider.classList.add("3-content", "w3-display-container");
        slider.style.maxWidth = "960px";
        slider.style.margin = "auto";
        body.appendChild(slider);

        for (let i = 0; i < this.arrayImg.length; i++) {
            let temp = document.createElement("div");
            temp.classList.add("w3-display-container");
            let img = document.createElement("img");
            img.setAttribute("src", this.arrayImg[i]);
            img.style.width = "100%";
            temp.appendChild(img);
            slides.push(temp);
        }
        slider.appendChild(slides);

        let leftBtn = document.createElement("button");
        leftBtn.classList.add("w3-button", "w3-black", "w3-hover-white", "w3-display-left");
        leftBtn.innerText = "&#10094;";
        leftBtn.addEventListener("click", () => { this.nextSlide(-1)});
        slider.appendChild(leftBtn);

        let rightBtn = document.createElement("button");
        rightBtn.classList.add("w3-button", "w3-black", "w3-hover-white", "w3-display-right");
        rightBtn.innerText = "&#10095;";
        rightBtn.addEventListener("click", () => { this.nextSlide(1)});
        slider.appendChild(rightBtn);

        let sliderNav = document.createElement("div");
        let navBtn;
        sliderNav.classList.add("w3-center");
        body.appendChild(sliderNav);

        for (let i = 0; i < this.arrayImg.length; i++) {
            let temp = document.createElement("span");
            temp.classList.add("w3-badge", "myDots", "w3-border", "w3-border-black", "w3-transparent");
            temp.addEventListener("click", () => { this.slideIndex = i});
            navBtn.push(temp);
        }

        sliderNav.appendChild(navBtn);
    }

    nextSlide(n) {
        rewindSlides = n < 0 ? true : false;
        if (slideDisplayEnded) {
            showSlide(slideIndex += n);
            this.stopOnClick || rewindSlides ? stopSlider() : null;
        }
    };

    setSliderBackground(n) {
        let urlImg = slides[n].getElementsByTagName("img")[0].src;
        slides[n].parentNode.style.backgroundSize = "contain";
        slides[n].parentNode.style.backgroundImage = "url('" + urlImg + "')";
    };

    showSlide(n) {
        console.log(`ask-->showSlide(${slideIndex})`);
        slideDisplayEnded = false;
        if (n > slides.length - 1) { slideIndex = 0 }
        if (n < 0) { slideIndex = slides.length - 1 }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].classList.remove("w3-black");
        }
        if (rewindSlides) {
            if (this.animateSlides) {
                slides[slideIndex].classList.remove("w3-animate-right");
                slides[slideIndex].classList.add("w3-animate-left");
            }
        } else {
            if (this.animateSlides) {
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
    };

    playSlider() {
        showSlide(slideIndex);
        this.this.sliderTimeoutId = setTimeout(() => { slideIndex++; playSlider(); }, this.sliderTimeout);
    };
    stopSlider() {
        if (typeof (this.sliderTimeoutId) !== "undefined")
            clearTimeout(this.sliderTimeoutId);
    };
};