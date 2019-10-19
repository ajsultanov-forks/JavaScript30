const pressed = [];
const secretCode = "adam";

window.addEventListener("keyup", e => {
	console.log(e.key);
	pressed.push(e.key);
	pressed.splice(0, pressed.length - secretCode.length)
	if (pressed.join('').includes(secretCode)) {
		console.log("ding!!");
	}
});


// index: -5, deleteCount: -3 (0)
// index: -5, deleteCount: -2 (0)
// index: -5, deleteCount: -1 (0)
// index: -5, deleteCount: 0
// index: -5, deleteCount: 1
// index: -5, deleteCount: 1
// index: -5, deleteCount: 1
