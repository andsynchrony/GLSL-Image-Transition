define([ 'tools/scaleImage', 'lib/glsl-transition', "text!tools/transitionShader.glsl"],
	function( scaleImage, GlslTransition, transitionShader ) {

	var canvas, container, transition, images, transitionDuration, transitionDelay, transitionCallback;
	var canvasWidth, canvasHeight;
	var linearEasing = function (x) { return x; };

	window.addEventListener('resize', function() {
        fitToContainer(canvas, container, canvasWidth, canvasHeight);
    }, true);

	function start( element, parent, imgs, width, height, duration, delay, callback )
	{
		canvas = element;
		container = parent;
		transition = GlslTransition(canvas)(transitionShader, { size: [8, 4.5], smoothness: 1.0 });
		transitionDuration = duration;
		transitionDelay = delay;
		transitionCallback = callback;

		canvasWidth = width;
		canvasHeight = height;

		// wait for the images to be scaled, then start the loop.
		scaleImage.scaleImages(imgs, width, height, startLoop);
	}

	function startLoop( scaledImages )
	{
		images = scaledImages;
		fitToContainer(canvas, container, canvasWidth, canvasHeight);

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

	function fitToContainer(canvas, parent, canvasWidth, canvasHeight){

		var curW = canvasWidth;
		var curH = canvasHeight;

		var divWidth = parent.offsetWidth;
		var divHeight = parent.offsetHeight;

		console.log( divWidth + " " + divHeight );


		var canvasRatio = canvasWidth / canvasHeight;
		var divRatio = divWidth / divHeight;

		if (divRatio >= canvasRatio)
		{
			curH = divWidth / canvasRatio;
			curW = divWidth;
		}
		else
		{
			curW = divHeight * canvasRatio;
			curH = divHeight;
		}

		// Make it visually fill the positioned parent
		canvas.style.width =curW+'px';
		canvas.style.height=curH+'px';

		// tolerant browser window needs some tolerance.
		if( curW + 50 > divWidth )
		{
			canvas.style.left = '-'+((curW - divWidth)/2)+'px';
		}
		if( curH + 50 > divHeight )
		{
			canvas.style.top = '-'+((curH - divHeight)/2)+'px';
		}

		// ...then set the internal size to match
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

	}

	return {
		start : start
	};
});