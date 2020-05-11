let CANVAS_SIZE = 1080
let FACTOR = CANVAS_SIZE / 1080

let y

function preload() {
	hand = loadImage('assets/hand.svg')
}
function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	hand.resize(CANVAS_SIZE / 25, 0)
	rectMode(CENTER)
	y = new Y()
}

function draw() {
	background('white')
	y.draw()
}
