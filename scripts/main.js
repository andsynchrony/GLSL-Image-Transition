requirejs.config({
	paths: {
		text: 'lib/text'
	}
});

require(['tools/transition'],
	function(transition) {

	var canvas = document.getElementById( "slideShow" );
	var container = document.getElementById( "slideShowContainer" );
	var images = document.getElementsByClassName("slideShowImg");
	
	var options = {
		canvas : canvas, 			// the canvas to draw in
		container : container,		// parent div for scaling, resizing, etc.
		images : images,			// an array of image elements
		width : 1280,				// width the images should be resized to
		height : 720,				// height the images should be resized to
		duration : 2400,			// transition duration
		delay : 3000,				// transition delay
		callback : changeElement	// function to be called when new transition starts
	}

	transition.start( options );

	// do something awesome here as soon as image transition starts.
	function changeElement( i )
	{
		var title = document.getElementsByClassName("imgTitle")[i].innerHTML;
		document.getElementById("slideShowText").innerHTML = title;
	}
});