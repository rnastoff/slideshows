**Slideshow-1**
-Arrows
-No-Timer
-Image Selection

**Slideshow-2**
-Arrows
-Timer
-Image Selection

**Slideshow-3**
-Arrows
-No Timer
-Image Selection
-Endless

**Slideshow-4**
-Arrows
-Timer
-Image Selection
-Endless


###EXPLANATION OF ENDLESS

**IMAGES ARRAY**
-The num property is used for sorting and keeping track of images

**imageNum**
-The index of the image that's currently showing
-This number is NOT permanently linked to specific images, because the array get re-arranged
-With 4 images, imageNum is really only 1 or 2 (2nd and 3rd images)
-It's only 0 or 3, very briefly, before arrange() re-arranges the object

**dotNum**
-This num is linked to specific images (images[i].num). In other words, 0 is ALWAYS Chicago
-This is needed specifically for image-selection (dots)

**imagePos**
-This is the current position of the "slides" div (the div that holds all the images)
-This works the same as imageNum, only it handles the position of the div
-It's only ever -700, or -1400 (the 2nd and 3rd images (1,2))

**arrange()**
-This only happens after a transition

*Left*
-If we are at the beginning
 -Pop off element at the end
 -Add the element to the beginning
 -Remove transition from "slides"
 -Change the element's position (setting the pos to -700, or the 2nd image in the array)
 -Add transition to "slides"
 -Change the imageNum to 1 (2nd element)
 -Change ImagePos to the 2nd element (-700)
 -Add Images back to page (the currently viewed image should not move)

*Right*
-If we are at the end
 -Remove element from beginning of Array
 -Push the element on to the end of the array
 -Remove transition from "slides"
 -Change the elements position to 2nd from last (-imageWidth x (images.length-2))
 -Add the transition to "slides"
 -Change the imageNum to second from last (images.length-2)
 -Change the imagePos to second from last (-imageWidth * (images.length-2))
 -Add images back to page (the currently viewed image should not move)

**DOT CLICK**
-Reset the array
-Get current position of the image
-Change the position after the reset (so it stays on the same image)
-Pull off the number from the dot class (d0,d1,etc). num
-Set the imageNum = dotnum. (They're both the same after a reset)
-Move the slide
-Change imageNum and dotNum to new image. This happens before the arrange() function
-ChangeDot

**changePos**
-This removes the transition, then changes the margin-left, then re-adds the transition
-The offsetHeight is used to force a reflow




