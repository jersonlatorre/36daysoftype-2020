let CANVAS_SIZE = 1080
let LOOP_DURATION = 2
let pointer

let leftEye
let rightEye
let fly
let flySound

let leftEyePosition = {
	x: CANVAS_SIZE / 2,
	y: CANVAS_SIZE / 2 + 160
}

let rightEyePosition = {
	x: CANVAS_SIZE / 2,
	y: CANVAS_SIZE / 2 - 160
}

function preload() {
	pointer = loadImage('assets/pointer.svg')
	flySound = loadSound('assets/fly.mp3')
}

function setup() {
	userStartAudio()
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	rectMode(CENTER, CENTER)
	smooth()
	noCursor()

	leftEye = new Eye(leftEyePosition.x, leftEyePosition.y)
	rightEye = new Eye(rightEyePosition.x, rightEyePosition.y)
	fly = new Fly()
}

function draw() {
	background(colors.white)
	leftEye.draw()
	rightEye.draw()
	fly.draw()
	image(pointer, mouseX - 5, mouseY)
}
