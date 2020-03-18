let CANVAS_SIZE = 1080
let pointer
let game

function preload() {
	pointer = loadImage('assets/pointer.svg')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(CANVAS_SIZE / 25, 0)
	noCursor()

	game = new Game()
}

function draw() {
	translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2)
	game.draw()
	image(pointer, mouseX - CANVAS_SIZE / 2, mouseY - CANVAS_SIZE / 2)
}

function keyPressed() {
	game.keyPressed()
}

function keyReleased() {
	game.keyReleased()
}
