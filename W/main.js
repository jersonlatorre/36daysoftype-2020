let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let hand
let w

function preload() {
	hand = loadImage('assets/hand.svg')
}
function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	hand.resize(CANVAS_SIZE / 20, 0)
	noCursor()
	strokeCap(ROUND)
	strokeJoin(ROUND)

	w = new W()
}

function draw() {
	background(colors.white)
	w.draw()
	image(hand, mouseX - 18 * FACTOR, mouseY - 5 * FACTOR)
}

function keyPressed () {
	if (key == ' ') {
		w.reset()
	}
}
