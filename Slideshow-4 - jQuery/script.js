
/********************** 
SLIDESHOW
-Arrows
-Timer
-Image Selection/Dots
-Auto-Loop
***********************/



//SET UP IMAGES/DOTS
let images = [
		{
			url: "chicago.jpg",
			text: "Chicago",
			alt: "Chicago",
			num: 0
		},
		{
			url: "nyc.png",
			text: "NYC",
			alt: "New York City",
			num: 1
		},
		{
			url: "boston.jpg",
			text: "Boston",
			alt: "Boston",
			num: 2
		},
		{
			url: "san-francisco.jpg",
			text: "San Francisco",
			alt: "San Francisco",
			num: 3
		},
		{
			url: "portland.jpg",
			text: "Portland",
			alt: "Portland",
			num: 4
		}
	];
	
	
	const imageWidth = 700; //Height is 350
	let imageNum = 0; //index of currently viewed image
	let imagePos = 0; //current pos of slides div
	let dotNum = 0; //number linked to specific images (0 is always chicago)
	let delay = 3000;

	
	

//JQUERY
$(document).ready(function() {
	
	//CREATE IMAGES HTML
	function addImages() {
		let slideHTML = images.map(function(element, index) {	
			return `<div class='slide'>
							<img src='${images[index].url}' alt='${images[index].alt}'>
							<h2>${images[index].text}</h2>
							<div>`;		
		});
		$(".slides").html(slideHTML);
	}
	
	//CREATE DOTS HTML
	let dotsHTML = images.map(function(element, index) {
		return `<div class="dot d${index}"></div>`;
	});
	
	//ADD STUFF TO DOM
	addImages();
	arrange();
	$(".image-select").html(dotsHTML);
	$(".dot:first-of-type").css("background", "#fff");
	

	
	//TIMER
	setInterval(handleArrowRight, delay);
	
	
	
	//ARROWS EVENT LISTENER
	$("#arrow-right").on("click", handleArrowRight);
	$("#arrow-left").on("click", handleArrowLeft);
	
	function handleArrowRight() {
		let prev = imageNum;
		imageNum++;
		moveSlide(prev, imageNum);
		changeDot(++dotNum);	
	}
	
	function handleArrowLeft() {
		let prev = imageNum;
		imageNum--;
		moveSlide(prev, imageNum);
		changeDot(--dotNum);
	}
	
	
	
	
	//MOVER FUNCTION
	function moveSlide(prev, next) {	
		imagePos = (((next - prev) * -imageWidth) + imagePos);	
		$(".slides").css("margin-left", imagePos + "px");
		$("#arrow-right").off("click", handleArrowRight);
		$("#arrow-left").off("click", handleArrowLeft);
		$(".dot").off("click", handleDot);
	}
	
	

	
	//DOTS EVENT LISTENER
	$(".dot").on("click", handleDot);
	
	function handleDot() {
		reset();
		imagePos = -imageWidth * dotNum; //get current position
		changePos(imagePos); //change to new position after reset
			
		let num = $(this).attr("class");
		num = num.slice(num.length-1); //just the number
		
		imageNum = dotNum;				 
		moveSlide(imageNum, num);
		
		//these 2 happen before the arrange() function occurs (Transition end)
		imageNum = Number(num); //change to new index
		dotNum = images[imageNum].num; //change to new
		
		changeDot(num);		
	}
	
	
		
	
	//DOT FUNCTION
	function changeDot(next) {
		if (next > images.length-1) {
			dotNum = 0;
			next = 0;
		}
		else if (next < 0) {
			dotNum = images.length-1;
			next = images.length-1;
		}
		$(".dot").css("background", "initial"); //clear all		
		$(".d" + next).css("background", "#fff");	
	}
	
	
		
	
	//ARRANGE OBJECT FOR ENDLESS
	function arrange() {
		if (imageNum == 0) {
			let temp = images.pop();
			images.unshift(temp);			
			changePos(-imageWidth);				
			imagePos = -imageWidth;
			imageNum = 1;
			addImages();
		}	
		else if (imageNum == images.length-1) {		
			let temp = images.shift();
			images.push(temp);			
			let reposition = -imageWidth * (images.length-2);		
			changePos(reposition);			
			imagePos = reposition;
			imageNum = images.length-2;
			addImages();
		}
	}
	
	
	//RESET OBJECT
	function reset() {
		images = images.sort(function(prev, next) {
			return prev.num - next.num;
		});		
		addImages();
	}
	
	
	//TURN OFF TRANSITION, CHANGE MARGIN-LEFT AFTER ARRANGE(), TURN ON TRANSITION
	function changePos(amount) {				
		$(".slides").css("transition", "margin-left 0s");
		$(".slides").css("margin-left", amount + "px");
		document.querySelector(".slides").offsetHeight; //force a reflow
		$(".slides").css("transition", "margin-left 0.5s");
	}
	
	
	
	//RUN ARRANGE / TURN OFF CLICK HANDLERS
	$(".slides").on("transitionend webkitTransitionEnd oTransitionEnd", function() {
		arrange();
		$("#arrow-right").on("click", handleArrowRight);
		$("#arrow-left").on("click", handleArrowLeft);
		$(".dot").on("click", handleDot);
	});
	

}); //document ready end