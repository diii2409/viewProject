const canvas = document.getElementById("drawingCanvas");
const container = document.getElementById("container");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
window.addEventListener("resize", (e) => {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
});
// Add drawing functionality (you can expand this)
let isDrawing = false;

// Touch events
canvas.addEventListener("touchstart", (e) => {
	isDrawing = true;
	const touch = e.touches[0];
	const x = touch.clientX;
	const y = touch.clientY;
	ctx.beginPath();
	ctx.moveTo(x, y);
});

canvas.addEventListener("touchmove", (e) => {
	if (isDrawing) {
		const touch = e.touches[0];
		const x = touch.clientX;
		const y = touch.clientY;
		ctx.lineTo(x, y);
		ctx.stroke();
	}
});

canvas.addEventListener("touchend", () => {
	isDrawing = false;
	ctx.closePath();
});

// Mouse events
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	ctx.beginPath();
	ctx.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener("mousemove", (e) => {
	if (isDrawing) {
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
	}
});

canvas.addEventListener("mouseup", () => {
	isDrawing = false;
	ctx.closePath();
});
