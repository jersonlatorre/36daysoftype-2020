let CANVAS_SIZE = 1080
let FACTOR = CANVAS_SIZE / 1080
let pointer
let n

function preload() {
	pointer = loadImage('assets/pointer.svg')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(CANVAS_SIZE / 25, 0)
	noCursor()

	n = new N()
}

function draw() {
	background(colors.black)
	n.draw()
	image(pointer, mouseX, mouseY)
}
