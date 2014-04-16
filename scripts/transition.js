define(['glsl-transition'],
	function( GlslTransition ) {

	var canvas = document.getElementById("slideShow"),
	shader = document.getElementById('transitionShader').textContent,
	images = document.getElementsByClassName("slideShowImg"),
	transition = GlslTransition(canvas)(shader, { size: [8, 4.5], smoothness: 0.5 }),
	transitionDuration = 1400,
	transitionDelay = 1000;

	var linearEasing = function (x) { return x; };

	function start()
	{
		loopTransition(0);
	}

	function loopTransition( i )
	{
		var i = i === images.length ? 0 : i;
		var next = i + 1 === images.length ? 0 : i + 1;
		transition({ from: images[i], to: images[next] }, transitionDuration, linearEasing).delay(transitionDelay).then(function() {
			return loopTransition( i+1 );
		});
	}

	return {
		start : start
	};
});