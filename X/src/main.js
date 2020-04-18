let CANVAS_SIZE = 1080
let FACTOR = CANVAS_SIZE / 1080
let hand
let heart

let x

function preload() {
	hand = loadImage('assets/hand.svg')
	heart = loadImage('assets/heart.png')
}
function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	hand.resize(CANVAS_SIZE / 25, 0)
	noCursor()
	frameRate(60)
	rectMode(CENTER)
	x = new X()
}

function draw() {
	// background('rgba(0, 0, 0, 1)')
	background('white')
	x.draw()
	image(hand, mouseX - 13 * FACTOR, mouseY - 5 * FACTOR)
}
