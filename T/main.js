let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let t
let hand

function preload() {
	hand = loadImage('assets/hand.svg')
}
function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	t = new T()
	strokeCap(SQUARE)
	hand.resize(CANVAS_SIZE / 25, 0)
	noCursor()
}

function draw() {
	background(colors.black)
	t.draw()
	image(hand, mouseX - 13 * FACTOR, mouseY - 5 * FACTOR)
}
