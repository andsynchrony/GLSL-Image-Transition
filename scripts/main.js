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
	
	// start transition with target canvas, duration, delay and callback function
	transition.start( canvas, container, images, 1280, 960, 2400, 3000, changeElement );

	// do something awesome here as soon as image transition starts.
	function changeElement( i )
	{
		var title = document.getElementsByClassName("imgTitle")[i].innerHTML;
		document.getElementById("slideShowText").innerHTML = title;
	}

});