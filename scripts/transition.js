define(['glsl-transition'],
	function( GlslTransition ) {

	var canvas = document.getElementById("viewport");

	var shader = document.getElementById('squares').textContent;

	var images = document.getElementsByClassName("slideShowImg");

	var transition = GlslTransition(canvas)(shader, { size: [13, 9], smoothness: 0.5 })

	var squareTransition = function (x) { return x; };

	transition({ from: images[0], to: images[1] }, 2000, squareTransition);
});