let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let s
let cursor

function preload() {
	cursor = loadImage('assets/hand.svg')
}
function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	cursor.resize(CANVAS_SIZE / 25, 0)
	noCursor()
	s = new S()
}

function draw() {
	background(colors.white)
	s.draw()
	image(cursor, mouseX - 13 * FACTOR, mouseY - 5 * FACTOR)
}
