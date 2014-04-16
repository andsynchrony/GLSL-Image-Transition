define(['glsl-transition'],
	function( GlslTransition ) {

	var canvas = document.getElementById("slideShow"),
	shader = document.getElementById('squares').textContent,
	images = document.getElementsByClassName("slideShowImg"),
	transition = GlslTransition(canvas)(shader, { size: [13, 9], smoothness: 0.5 });

	var linearEasing = function (x) { return x; };

	function start()
	{
		loopTransition(0);
	}

	function loopTransition( i )
	{
		var i = i === images.length ? 0 : i;
		var next = i + 1 === images.length ? 0 : i + 1;
		transition({ from: images[i], to: images[next] }, 2000, linearEasing).then(function() {
			return loopTransition( i+1 );
		});
	}

	return {
		start : start
	};
});