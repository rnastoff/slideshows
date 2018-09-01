
/* 
SLIDESHOW
-Arrows
-No Timer
-Image Selection/Dots

-When the dots are added to the page, they have a class d0, d1, d2
-The d0/d1/d2 keeps track of which image is clicked/viewed
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
	
	
	const imageWidth = 700; //Height is 350
	let imageNum = 0;
	let imagePos = 0;
	
	
	//ADD IMAGES AND DOTS TO PAGE
	let slideHTML = images.map(function(element, index) {	
		return `<div class='slide'>
							<img src='${images[index].url}' alt='${images[index].alt}'>
							<h2>${images[index].text}</h2>
            <div>`;		
	});
	
	let dotsHTML = images.map(function(element, index) {
		return `<div class="dot d${index}"></div>`;
	});


//JQUERY
$(document).ready(function() {
		
	//ADD IMAGES AND DOTS TO PAGE
	$(".slides").html(slideHTML);
	$(".image-select").html(dotsHTML);
	$(".dot:first-of-type").css("background", "#fff");
	
	
	
	//ARROWS EVENT LISTENER
	$("#arrow-right").click(function() {		
		if (imageNum !== images.length-1) {
			let prev = imageNum;
			imageNum++;
			moveSlide(prev, imageNum);
			changeDot(imageNum);
		}	
	});	
	
	$("#arrow-left").click(function() {
		if (imageNum !== 0) {
			let prev = imageNum;
			imageNum--;
			moveSlide(prev, imageNum);
			changeDot(imageNum);
		}
	});
	
	
	//DOTS EVENT LISTENER
	$(".dot").click(function() {		
		let num = $(this).attr("class");
		num = num.slice(num.length-1); //just the number				
		moveSlide(imageNum, num);
		changeDot(num);
		imageNum = Number(num); 
	});
		
	
	//MOVER FUNCTION
	function moveSlide(prev, next) {	
		imagePos = (((next - prev) * -imageWidth) + imagePos);	
		$(".slides").css("margin-left", imagePos + "px");
	}
	
	//DOT FUNCTION
	function changeDot(next) {
		$(".dot").css("background", "initial"); //clear all		
		$(".d" + next).css("background", "#fff");	
	}
	
	
}); //document ready end