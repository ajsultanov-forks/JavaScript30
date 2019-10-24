const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
// let videoToggle = false;
// let videoStream

// function toggle(e) {
// 	if (e.code="Space") {videoToggle = !videoToggle;}
// 	console.log(videoToggle);
// 	getVideo()
// }

// document.addEventListener("keydown", toggle)

function getVideo() {
	// if (videoToggle) {
		 navigator.mediaDevices.getUserMedia({video: true, audio: false})
			.then(localMediaStream => {
				console.log(localMediaStream);
				video.srcObject = localMediaStream;
				video.play();
				// videoStream = localMediaStream;
			})
			.catch(err => {
				console.console.error("UH OH", error);
			})
	// 	}
	// else {
	// 	let tracks = videoStream.getVideoTracks();
	// 	tracks[0].stop();
	// }
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		// pixels = redEffect(pixels);
		// pixels = rgbSplit(pixels);
		pixels = greenScreen(pixels);
		// ctx.globalAlpha = 0.25;
		ctx.putImageData(pixels, 0, 0)
	}, 50);
}

function takePhoto() {
	snap.currentTime = 0;
	snap.play();

	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome')
	link.innerHTML = `<img src=${data} alt="handsome">`
	strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
	for(let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i] 			= pixels.data[i] * 1.5;
		pixels.data[i + 1]	= pixels.data[i + 1] * .75;
		pixels.data[i + 2]	= pixels.data[i + 2] * .75;
	}
	return pixels;
}

function rgbSplit(pixels) {
	for(let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 10] 			= pixels.data[i] * 1.5;
		pixels.data[i - 40]	= pixels.data[i + 1] * .75;
		pixels.data[i + 40]	= pixels.data[i + 2] * .75;
	}
	return pixels;
}

function greenScreen(pixels) {
	const levels = {};

	document.querySelectorAll('.rgb input').forEach(input => {
		levels[input.name] = input.value;
	})

	for(let i = 0; i < pixels.data.length; i += 4) {
		red = pixels.data[i];
		green = pixels.data[i + 1];
		blue = pixels.data[i + 2];
		alpha = pixels.data[i + 3];

		if (
			   red >= levels.rmin
			&& red <= levels.rmax
			&& green >= levels.gmin
			&& green <= levels.gmax
			&& blue >= levels.bmin
			&& blue <= levels.bmax
		) {
			pixels.data[i + 3] = 0
		}
	}
	return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
