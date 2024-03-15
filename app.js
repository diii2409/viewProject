const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
//*************************************************************** */
// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
window.addEventListener("resize", () => {
	updateLineWidth();
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
});

// Define an array to store points
let points = [];

// Mouse events
canvas.addEventListener("mousemove", (e) => {
	const x = e.clientX;
	const y = e.clientY;
	points.push({ x, y, alpha: 1 }); // Add new points with full opacity
	drawPoints(); // Draw points with current opacity
});

function drawPoints() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
	for (let i = 0; i < points.length; i++) {
		ctx.globalAlpha = points[i].alpha; // Set opacity for each point
		ctx.lineWidth = calculateLineWidth(); // Set line width for each point
		ctx.strokeStyle = "rgb(4, 79, 243,0.8)"; // Set stroke color for each point
		ctx.fillStyle = "rgba(42, 67, 209, 0.8)";
		ctx.beginPath();
		if (i > 0) {
			const prevPoint = points[i - 1];
			ctx.moveTo(prevPoint.x, prevPoint.y); // Start from previous point
		} else {
			ctx.moveTo(points[i].x, points[i].y); // Start from current point
		}
		ctx.lineTo(points[i].x, points[i].y); // Draw line to current point
		ctx.stroke();
	}
	decreaseOpacity(); // Decrease opacity for the next frame
}

function decreaseOpacity() {
	for (let i = 0; i < points.length; i++) {
		points[i].alpha -= 0.00005; // Decrease opacity for each point
	}
	// Remove points with opacity <= 0
	points = points.filter((point) => point.alpha > 0);
	if (points.length > 0) {
		requestAnimationFrame(drawPoints); // Continue drawing points with decreased opacity
	}
}

function calculateLineWidth() {
	// Calculate line width as 3% of the smaller dimension of the canvas
	return Math.min(canvas.width, canvas.height) * 0.005;
}

function updateLineWidth() {
	// Update line width when window is resized
	ctx.lineWidth = calculateLineWidth();
}
const containerWrapper = document.getElementById("containerWrapper");
let isDown = false;
let startX;
let scrollLeft;

containerWrapper.addEventListener("mousedown", (e) => {
	isDown = true;
	startX = e.pageX - containerWrapper.offsetLeft;
	scrollLeft = containerWrapper.scrollLeft;
});

containerWrapper.addEventListener("mouseleave", () => {
	isDown = false;
});

containerWrapper.addEventListener("mouseup", () => {
	isDown = false;
});

containerWrapper.addEventListener("mousemove", (e) => {
	if (!isDown) return;
	e.preventDefault();
	const x = e.pageX - containerWrapper.offsetLeft;
	const walk = (x - startX) * 3; // You can adjust this value for smoother scrolling
	containerWrapper.scrollLeft = scrollLeft - walk;
});

//******************************************************************************
//******************************************************************************
// USE INTERFACE MOBIE
// Touch events
// canvas.addEventListener("touchstart", (e) => {
// 	isDrawing = true;
// 	const touch = e.touches[0];
// 	const x = touch.clientX;
// 	const y = touch.clientY;
// 	points.push({ x, y, alpha: 1 }); // Add initial point with full opacity
// });

// canvas.addEventListener("touchmove", (e) => {
// 	if (isDrawing) {
// 		const touch = e.touches[0];
// 		const x = touch.clientX;
// 		const y = touch.clientY;
// 		points.push({ x, y, alpha: 1 }); // Add new points with full opacity
// 		drawPoints(); // Draw points with current opacity
// 	}
// });

// canvas.addEventListener("touchend", () => {
// 	isDrawing = false;
// });
//******************************************************************************
