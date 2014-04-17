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
		images : images,			// an array of image elements
		width : 1280,				// width the images should be resized to
		height : 720,				// height the images should be resized to
		duration : 2400,			// transition duration
		delay : 3000,				// transition delay
		callback : changeElement	// function to be called when new transition starts
	}

	// start transition loop
	transition.start( options );

	// resizes slideshow to the given dimensions
	transition.resize(container.offsetWidth, container.offsetHeight);

	// do something awesome here as soon as image transition starts.
	function changeElement( i )
	{
		var title = document.getElementsByClassName("imgTitle")[i].innerHTML;
		document.getElementById("slideShowText").innerHTML = title;
	}

	// add your favourite listening behavior here
	window.addEventListener('resize', function()
	{
		// resizes slideshow to the given dimensions
		transition.resize(container.offsetWidth, container.offsetHeight);
    }, true);

});