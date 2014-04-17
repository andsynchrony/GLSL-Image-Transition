requirejs.config({
	paths: {
		text: 'lib/text'
	}
});

require(['tools/transition'],
	function(transition) {

	var canvas = document.getElementById( "slideShow" );
	var images = document.getElementsByClassName("slideShowImg");
	
	// start transition with target canvas, duration, delay and callback function
	transition.start( canvas, images, 2400, 3000, changeElement );

	// do something awesome here as soon as image transition starts.
	function changeElement( i )
	{
		var title = document.getElementsByClassName("imgTitle")[i].innerHTML;
		document.getElementById("slideShowText").innerHTML = title;
		//document.getElementById("slideShowText").innerHTML = "This is image " + i;
	}

});