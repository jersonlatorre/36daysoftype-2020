let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let hand

let l

function preload() {
	hand = loadImage('assets/hand.svg')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	hand.resize(FACTOR * CANVAS_SIZE / 18, 0)
	noCursor()

	l = new L()
}

function draw() {
	background(colors.blue)
	l.draw()
	image(hand, mouseX - 16 * FACTOR, mouseY)
}
