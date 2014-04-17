define([ 'tools/scaleImage', 'lib/glsl-transition', "text!tools/transitionShader.glsl"],
	function( scaleImage, GlslTransition, transitionShader ) {

	var canvas = document.getElementById("slideShow"),
	images,
	transitionDuration, transitionDelay, transitionCallback;

	var linearEasing = function (x) { return x; };
	var transition = GlslTransition(canvas)(transitionShader, { size: [8, 4.5], smoothness: 1.0 });

	function start( element, imgs, duration, delay, callback )
	{
		canvas = element;
		fitToContainer(canvas);

		transitionDuration = duration;
		transitionDelay = delay;
		transitionCallback = callback;

		// wait for the images to be scaled, then start the loop.
		scaleImage.scaleImages(imgs, canvas.width, canvas.height, startLoop);
	}

	function startLoop( scaledImages )
	{
		images = scaledImages;

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

	// from http://stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent
	function fitToContainer(canvas){
		// Make it visually fill the positioned parent
		canvas.style.width ='100%';
		canvas.style.height='100%';

		// ...then set the internal size to match
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}

	return {
		start : start
	};
});