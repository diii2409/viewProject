const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
window.addEventListener("resize", () => {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	updateLineWidth(); // Update line width when window is resized
});

// Define an array to store points
let points = [];

// Add drawing functionality
let isDrawing = false;

// Touch events
canvas.addEventListener("touchstart", (e) => {
	isDrawing = true;
	const touch = e.touches[0];
	const x = touch.clientX;
	const y = touch.clientY;
	points.push({ x, y, alpha: 1 }); // Add initial point with full opacity
});

canvas.addEventListener("touchmove", (e) => {
	if (isDrawing) {
		const touch = e.touches[0];
		const x = touch.clientX;
		const y = touch.clientY;
		points.push({ x, y, alpha: 1 }); // Add new points with full opacity
		drawPoints(); // Draw points with current opacity
	}
});

canvas.addEventListener("touchend", () => {
	isDrawing = false;
});

// Mouse events
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	const x = e.clientX;
	const y = e.clientY;
	points.push({ x, y, alpha: 1 }); // Add initial point with full opacity
});

canvas.addEventListener("mousemove", (e) => {
	if (isDrawing) {
		const x = e.clientX;
		const y = e.clientY;
		points.push({ x, y, alpha: 1 }); // Add new points with full opacity
		drawPoints(); // Draw points with current opacity
	}
});

canvas.addEventListener("mouseup", () => {
	isDrawing = false;
});

function drawPoints() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
	for (let i = 0; i < points.length; i++) {
		ctx.globalAlpha = points[i].alpha; // Set opacity for each point
		ctx.lineWidth = calculateLineWidth(); // Set line width for each point
		ctx.strokeStyle = "#000000"; // Set stroke color for each point
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
		points[i].alpha -= 0.01; // Decrease opacity for each point
	}
	// Remove points with opacity <= 0
	points = points.filter((point) => point.alpha > 0);
	if (points.length > 0) {
		requestAnimationFrame(drawPoints); // Continue drawing points with decreased opacity
	}
}

function calculateLineWidth() {
	// Calculate line width as 3% of the smaller dimension of the canvas
	return Math.min(canvas.width, canvas.height) * 0.03;
}

function updateLineWidth() {
	// Update line width when window is resized
	ctx.lineWidth = calculateLineWidth();
}
