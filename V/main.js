let CANVAS_SIZE = 1080
let FACTOR = CANVAS_SIZE / 1080
let hand
let v
let simplex

function preload() {
	hand = loadImage('assets/hand.svg')
}
function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	hand.resize(CANVAS_SIZE / 25, 0)
	noCursor()

	simplex = new SimplexNoise()
	v = new V()
}

function draw() {
	background(colors.blue)
	v.draw()
	image(hand, mouseX - 13 * FACTOR, mouseY - 5 * FACTOR)
}