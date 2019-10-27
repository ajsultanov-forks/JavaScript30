const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')

let countdown;

function timer(seconds) {
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft)
	}, 1000);
}

function fixZeroes(seconds) {
	if (seconds < 10) {
		return '0' + seconds;
	}
	else {
		return seconds;
	}
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${fixZeroes(remainderSeconds)}`;
	document.title = 'Countdown Timer: ' + display;
	timerDisplay.textContent = display;

	console.log(display);
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Back at ${hour % 12}:${fixZeroes(minutes)}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time, 10);
	timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const minutes = parseInt(e.target.minutes.value, 10) * 60;
	this.reset();
	timer(minutes);
})
