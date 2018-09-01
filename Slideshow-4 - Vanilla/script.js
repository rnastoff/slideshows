
/* 
SLIDESHOW - Vanilla
-Arrows
-No Timer
-Image Selection/Dots
-Endless

-When the dots are added to the page, they have a class d0, d1, d2
-The d0/d1/d2 tell ya which dot is clicked

*/



//SET UP IMAGES/DOTS
let images = [
		{
			url: "chicago.jpg",
			text: "0",
			alt: "Chicago",
			num: 0
		},
		{
			url: "nyc.png",
			text: "1",
			alt: "New York City",
			num: 1
		},
		{
			url: "boston.jpg",
			text: "2",
			alt: "Boston",
			num: 2
		},
		{
			url: "san-francisco.jpg",
			text: "3",
			alt: "San Francisco",
			num: 3
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

arrange();



//TIMER
setInterval(handleRightArrow, delay);



//ARROW EVENT LISTENERS
arrowRight.addEventListener("click", handleRightArrow);
arrowLeft.addEventListener("click", handleLeftArrow);

function handleRightArrow() {
		let prev = currentIndex;
		currentIndex++;
		moveSlide(prev, currentIndex);
}

function handleLeftArrow() {
		let prev = currentIndex;
		currentIndex--;
		moveSlide(prev, currentIndex);	
}

function moveSlide(prev, next) {
	currentPosition = ((next-prev) * -imageWidth) + currentPosition;
	slides.style.marginLeft = currentPosition + "px";
	changeDot(images[currentIndex].num);
	
	removeListeners();
}





//DOT HANDLERS
dots.forEach(element => element.addEventListener("click", handleDot));

function handleDot() {
	reset();	
	let prev = currentIndex;	
	let next = this.className;
	next = next.slice(next.length-1);
	currentIndex = Number(next);
	moveSlide(prev, next);
	removeListeners();
}

function changeDot(next) {	
	dots.forEach(element => element.style.background = "none");
	let nextDot = document.querySelector(`.d${next}`);
	nextDot.style.background = "#fff";
}



//ARRANGE
function arrange() {	
	if (currentIndex == 0) {
		let temp = images.pop();
		images.unshift(temp);
		
		currentPosition = -imageWidth;
		changePosition(-imageWidth);
		currentIndex++;	
		
		changeDot(images[currentIndex].num);
		addHTML();
		
	}
	else if (currentIndex == images.length-1) {
		let temp = images.shift();
		images.push(temp);
		
		currentPosition = -imageWidth * (images.length-2);
		changePosition(currentPosition);		
		currentIndex--;
		
		changeDot(images[currentIndex].num);
		addHTML();
	}
}


//RESET ARRAY
function reset() {
	currentIndex = images[currentIndex].num;
	currentPosition = currentIndex * -imageWidth;	
	images = images.sort((a,b) => a.num - b.num);
	addHTML();
	changePosition(currentPosition);
}


function changePosition(amount) {
	slides.style.transition = "margin-left 0s";
	slides.style.marginLeft = amount + "px";
	slides.offsetHeight; //force reflow
	slides.style.transition = "margin-left 0.5s";
}


function removeListeners() {
	arrowRight.removeEventListener("click", handleRightArrow);
	arrowLeft.removeEventListener("click", handleLeftArrow);
	dots.forEach(element => element.removeEventListener("click", handleDot));
}




slides.addEventListener("transitionend", function(){
	arrange();
	arrowRight.addEventListener("click", handleRightArrow);
	arrowLeft.addEventListener("click", handleLeftArrow);
	dots.forEach(element => element.addEventListener("click", handleDot));
});



