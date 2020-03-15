let CANVAS_SIZE = 1080
let pointer

let l

function preload() {
	pointer = loadImage('assets/pointer.svg')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(CANVAS_SIZE / 25, 0)
	noCursor()

	l = new L()
}

function draw() {
	background(colors.blue)
	l.draw()
	image(pointer, mouseX, mouseY)
}
