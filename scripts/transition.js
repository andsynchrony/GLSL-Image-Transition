

define(['glsl-transition'],
	function( GlslTransition ) {

	var canvas = document.getElementById("viewport");
	var Transition = GlslTransition(canvas);

	var shader = document.getElementById('squares').textContent;
	var awesomeTransition1 = Transition(shader, { size: [13, 9], smoothness: 0.5 })

	var image1 = document.getElementById('img1');
	var image2 = document.getElementById('img2');


	var squareTransition = function (x) { return x*x; };

	awesomeTransition1({ from: image1, to: image2 }, 2000, squareTransition);

});