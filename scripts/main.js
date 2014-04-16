requirejs.config({
	paths: {
		text: 'lib/text'
	}
});

require(['tools/transition'],
	function(transition) {

	var canvas = document.getElementById( "slideShow" );
	var images = document.getElementsByClassName("slideShowImg");
	
	fitToContainer(canvas);

	// start transition with target canvas, duration, delay and callback function
	transition.start( canvas, images, 2400, 3000, changeElement );

	// do something awesome here as soon as image transition starts.
	function changeElement( i )
	{
		var title = document.getElementsByClassName("imgTitle")[i].innerHTML;
		document.getElementById("slideShowText").innerHTML = title;
		//document.getElementById("slideShowText").innerHTML = "This is image " + i;
	}
	// from http://stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent
	function fitToContainer(canvas){
		// Make it visually fill the positioned parent
		canvas.style.width ='100%';
		canvas.style.height='100%';
		// ...then set the internal size to match
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}
});