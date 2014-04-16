define(['lib/glsl-transition', "text!tools/transitionShader.glsl"],
	function( GlslTransition, transitionShader ) {

	var canvas = document.getElementById("slideShow"),
	images = document.getElementsByClassName("slideShowImg"),
	transition = GlslTransition(canvas)(transitionShader, { size: [8, 4.5], smoothness: 1.0 }),
	transitionDuration = 500,
	transitionDelay = 1000,
	transitionCallback;

	var linearEasing = function (x) { return x; };

	function start( elementId, duration, delay, callback )
	{
		canvas = document.getElementById( elementId );
		transitionDuration = duration;
		transitionDelay = delay;
		transitionCallback = callback;

		// start the transition loop.
		loopTransition(0);
	}

	function loopTransition( i )
	{
		transitionCallback( (i+1)%images.length );
		var i = i === images.length ? 0 : i;
		var next = i + 1 === images.length ? 0 : i + 1;
		transition({ from: images[i], to: images[next] }, transitionDuration, linearEasing).delay(transitionDelay).then(function() {
			return loopTransition( i + 1 );
		});
	}

	return {
		start : start
	};
});