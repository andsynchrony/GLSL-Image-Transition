/*global define*/
define(
	['tools/scaleImage', 'lib/glsl-transition', 'text!tools/transitionShader.glsl'],
	function ( scaleImage, glslTransition, transitionShader )
	{
		var canvas, transition, images, transitionDuration, transitionDelay, transitionCallback;
		var canvasWidth, canvasHeight;
		var tileWidth, tileHeight, numTilesX, numTilesY;
		
		function linearEasing ( x ) { return x; }

		function start ( options )
		{
			canvas = options.canvas;
			transitionDuration = options.duration;
			transitionDelay = options.delay;
			transitionCallback = options.callback;

			canvasWidth = options.width;
			canvasHeight = options.height;

			tileWidth = options.tileWidth;
			tileHeight = options.tileHeight;
			numTilesX = (canvasWidth/tileWidth);
			numTilesY = (canvasHeight/tileHeight);

			tileHeight = options.tileHeight;

			transition = glslTransition(canvas)(transitionShader, { size: [numTilesX, numTilesY], smoothness: 1.0 });

			// wait for the images to be scaled, then start the loop.
			scaleImage.scaleImages(options.images, options.width, options.height, startLoop);
		}

		function startLoop ( scaledImages )
		{
			images = scaledImages;

			// start the transition loop.
			loopTransition(0);
		}

		function loopTransition ( i )
		{
			var j = i === images.length ? 0 : i;
			transitionCallback( (i + 1) % images.length );
			var next = j + 1 === images.length ? 0 : j + 1;
			
			transition( { from: images[j], to: images[next] }, transitionDuration, linearEasing)
				.delay(transitionDelay)
				.then(
					function()
						{
						transition = glslTransition(canvas)(transitionShader, { size: [numTilesX, numTilesY], smoothness: 1.0 });
						return loopTransition( j + 1 );
					}
				);
		}

		function fitToContainer ( canvas, width, height, canvasWidth, canvasHeight )
		{
			var curW = canvasWidth;
			var curH = canvasHeight;
			var divWidth = width;
			var divHeight = height;
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
			
			// tolerant browser window needs some tolerance.
			if ( curW + 50 > divWidth )
			{
				canvas.style.left = '-'+((curW - divWidth)/2)+'px';
			}
			
			if ( curH + 50 > divHeight )
			{
				canvas.style.top = '-'+((curH - divHeight)/2)+'px';
			}

			canvas.style.width  = curW + 'px';
			canvas.style.height = curH + 'px';
			canvas.width  = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		}

		function resize ( width, height )
		{
			transition.reset();
			numTilesX = (width / tileWidth);
			numTilesY = (height / tileHeight);
			fitToContainer(canvas, width, height, canvasWidth, canvasHeight);
		}

		return {
			start : start,
			resize : resize
		};
	}
);