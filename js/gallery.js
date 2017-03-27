// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/



// Counter for the mImages array
var mCurrentIndex = 0;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

// XMLHttpRequest variable

var mRequest = new XMLHttpRequest();
mRequest.addEventListener("load", reqListener);

mRequest.onreadystatechange = function() { 
// Do something interesting if file is opened successfully 
	if (mRequest.readyState == 4 && mRequest.status == 200) {
		try {
			mJson = JSON.parse(mRequest.responseText);
			for(var key in mJson){
				var item = mJson[key];
				for(var i = 0; i<item.length; i++){
					mImages.push(new GalleryImage(item[i]));
					alert(mImages[i]);
				}
			console.log(mJson); 
		} catch(err) { 
			console.log(err.message) 
		} 
	} 
};
mRequest.open("GET", mUrl, true);
mRequest.send();

// Holds the retrived JSON information
var mJson = JSON.parse(mRequest.responseText);

// Array holding GalleryImage objects (see below).
var mImages = [];

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string

	for(mCurrentIndex; mCurrentIndex < mImages.length; mCurrentIndex++)
		var currentImgSrc = $("#slideShow").attr("src");
		var nextSrc = mImages[mCurrentIndex+1]["img"];
		$("#slideShow").attr("src").text(nextSrc);

		var currentDetails = $("#slideShow").get(".details")

	console.log('swap photo');
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(item) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.location = item["imgLocation"];
	this.description: = item["description"];
	this.date = item["date"];
	this.img = item["imgPath"];
}
