requirejs.config({
	paths: {
		text: 'lib/text'
	}
});

require(['tools/transition'],
	function(transition) {

	var canvas = document.getElementById( "slideShow" );
	var container = document.getElementById( "slideShowContainer" );
	var image_elements = document.getElementsByClassName("slideShowImg");
	var background_image_elements = document.querySelectorAll(".has-background-image");
	
	var images = [ ];
	var images_to_load = [ ];

	var i = 0;
	var len = 0;
	var src;

	for ( i = 0, len = background_image_elements.length; i < len; i++ )
	{
		src = background_image_elements[i].style.backgroundImage.replace( "url(", "" ).replace( ")", "" );
		images_to_load.push( src );
	}

	for ( i = 0, len = image_elements.length; i < len; i++ )
	{
		if ( isImageLoaded( image_elements[i] ) )
		{
			images.push( image_elements[i] );
		}

		else
		{
			images_to_load.push( image_elements[i].getAttribute('src') );
		}
	}

	for ( i = 0, len = images_to_load.length; i < len; i++ )
	{
		loadImage( images_to_load[i] );
	}

	var options = {
		canvas : canvas,			// the canvas to draw in
		images : images,			// an array of image elements
		width : 1280,				// width the images should be resized to
		height : 720,				// height the images should be resized to
		tileWidth : 100,			// custom shader attribute: size of the tiles for the transition shader
		tileHeight : 100,			// custom shader attribute: size of the tiles for the transition shader
		duration : 2400,			// transition duration
		delay : 3000,				// transition delay
		callback : changeElement	// function to be called when new transition starts
	};

	function start()
	{
		// start transition loop
		transition.start( options );

		// resizes slideshow to the given dimensions
		transition.resize(container.offsetWidth, container.offsetHeight);
	}

	// do something awesome here as soon as image transition starts.
	function changeElement( imageNum )
	{
		var title = document.getElementsByClassName("imgTitle")[imageNum].innerHTML;
		document.getElementById("slideShowText").innerHTML = title;
	}

	function loadImage ( src )
	{
		var image = new Image();
		images_to_load.splice( images_to_load.indexOf( src ), 1 );
		image.addEventListener("load", function (){ imageLoaded( src, image ); } );
		image.src = src;
	}

	function imageLoaded ( src, img )
	{
		images.push( img );

		// all images loaded. we can start now.
		if ( images_to_load.length === 0 )
		{
			start();
		}
	}

	// http://stackoverflow.com/a/1977898/229189
	function isImageLoaded( img )
	{
		if ( ! img.complete )
		{
			return false;
		}

		if (
			typeof img.naturalWidth !== "undefined" &&
			img.naturalWidth === 0
		)
		{
			return false;
		}

		// No other way of checking: assume it’s ok.
		return true;
	}


		// add your favourite listening behavior here
	window.addEventListener("resize", function()
	{
		// resizes slideshow to the given dimensions
		transition.resize(container.offsetWidth, container.offsetHeight);
	}, true);
});