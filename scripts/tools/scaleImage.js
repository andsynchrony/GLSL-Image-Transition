define(
	[
	],
	function()
	{
		function scaleImages( images, dstWidth, dstHeight, callback )
		{
			var scaledAspect = function(maxW, maxH, curW, curH) {
				var ratio = curH / curW;
				if (curW >= maxW && ratio <= 1) {
					curW = maxW / ratio;
					curH = maxW;
				} else if (curH >= maxH) {
					curH = maxH * ratio;
					curW = maxH;
				} else {
					curH = maxH;
					curW = maxW;
				}
				return {
					width: curW,
					height: curH
				};
			};

			var newImages = [];

			function finished() {
				callback( newImages );
			}

			function scale( images, i, dstWidth, dstHeight )
			{

				var image = new Image();
				image.onload = function() {  
					// init the canvas
					var canvas = document.createElement('canvas');
					canvas.width = dstWidth;
					canvas.height = dstHeight;

					var scaled = scaledAspect(canvas.width, canvas.height, image.width, image.height);
					var offsetX = (canvas.width - scaled.width) / 2;
					var offsetY = (canvas.height - scaled.height) / 2;

					var ctx = canvas.getContext('2d');
					ctx.drawImage(image, offsetX, offsetY, scaled.width, scaled.height);

					// notify the url to the caller
					newImages[i] = canvas;
					
					if( i < images.length-1 )
						scale( images, i+1, dstWidth, dstHeight );
					else
						finished();
				};
				image.src = images[i].src;
			}

			scale( images, 0, dstWidth, dstHeight);
		}

		return {
			scaleImages : scaleImages
		};
	}
);