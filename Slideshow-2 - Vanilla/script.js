
/* 
SLIDESHOW - Vanilla
-Arrows
-Timer
-Image Selection/Dots

-When the dots are added to the page, they have a class d0, d1, d2
-The d0/d1/d2 tell ya which dot is clicked

-Once at the end, the setInterval will slide back to the 1st image
*/



//SET UP IMAGES/DOTS
const images = [
		{
			url: "chicago.jpg",
			text: "0",
			alt: "Chicago"
		},
		{
			url: "nyc.png",
			text: "1",
			alt: "New York City"
		},
		{
			url: "boston.jpg",
			text: "2",
			alt: "Boston"
		},
		{
			url: "san-francisco.jpg",
			text: "3",
			alt: "San Francisco"
		}
];

const slides = document.getElementById("slides");
const imageSelect = document.querySelector(".image-select");
const arrowRight = document.getElementById("arrow-right");
const arrowLeft = document.getElementById("arrow-left");
const delay = 4000;

let currentPosition = 0;
let currentIndex = 0;
let imageWidth = 700; //height is 350


//ADD IMAGES
function addHTML() {
	let slidesHTML = images.map(function(element) {
		return `
			<div class="slide">
				<img src="${element.url}" alt="${element.alt}">
				<h2>${element.text}</h2>
			</div>
		`;
	}).join("");
	slides.innerHTML = slidesHTML;
}

//ADD DOTS
function addDots() {
	let dotsHTML = images.map(function(element, index) {
		return `
			<div class="dot d${index}"></div>
		`;
	}).join("");
	imageSelect.innerHTML = dotsHTML;
}


addHTML();
addDots();
const dots = document.querySelectorAll(".dot");
dots[0].style.background = "#fff";


//TIMER
setInterval(function() {
	if (currentIndex == images.length-1) {
		slides.style.marginLeft = "0px";
		currentPosition = 0;
		currentIndex = 0;
		changeDot(0);
	}
	else {
		handleRightArrow();
	}
}, delay);



//ARROW EVENT LISTENERS
arrowRight.addEventListener("click", handleRightArrow);
arrowLeft.addEventListener("click", handleLeftArrow);

function handleRightArrow() {
	if (currentIndex !== images.length-1) {
		let prev = currentIndex;
		currentIndex++;
		moveSlide(prev, currentIndex);
	}
}

function handleLeftArrow() {
	if (currentIndex !== 0) {
		let prev = currentIndex;
		currentIndex--;
		moveSlide(prev, currentIndex);
	}
}

function moveSlide(prev, next) {
	currentPosition = ((next-prev) * -imageWidth) + currentPosition;
	slides.style.marginLeft = currentPosition + "px";
	changeDot(next);
}



//DOT HANDLERS
dots.forEach(element => element.addEventListener("click", handleDot));

function handleDot() {
	let prev = currentIndex;
	let next = this.className;
	next = next.slice(next.length-1);
	moveSlide(prev, next);
	changeDot(next);
}

function changeDot(next) {	
	dots.forEach(element => element.style.background = "none");
	let nextDot = document.querySelector(`.d${next}`);
	nextDot.style.background = "#fff";
	currentIndex = Number(next);
}






