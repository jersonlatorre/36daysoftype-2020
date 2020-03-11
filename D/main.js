let CANVAS_SIZE = 700
let pointer
let timer = 0
let tree
let letterImage
let clickSound
let backgroundColor = colors.blue
let opacity = 0
let isFading = false
let fadeTimer = 0

function preload() {
	pointer = loadImage('assets/pointer.svg')
	letterImage = loadImage('assets/letter.png')
	clickSound = loadSound('assets/click.wav')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	noCursor()
	letterImage.resize(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(40, 0)
	tree = new Tree()
}

function draw() {
	background(backgroundColor)
	tree.grow()
	tree.draw()

	fadeTimer += 0.02
	if (fadeTimer > 1) {
		opacity = 0
		fadeTimer = 0
		isFading = false
	}

	if (isFading) {
		opacity = 255 * sin(fadeTimer * 2 * PI)
		noStroke()
		fill(0, opacity)
		rect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	}

	noFill()
	stroke(colors.red)
	strokeWeight(CANVAS_SIZE / 100)
	circle(mouseX, mouseY, CANVAS_SIZE / 20)

	stroke(colors.gray)
	strokeWeight(CANVAS_SIZE / 150)
	circle(mouseX, mouseY, CANVAS_SIZE / 40)
	image(pointer, mouseX, mouseY)
}

function touchEnded() {
	if (tree.isAnimationFinished) {
		tree.start(mouseX, mouseY)
	} else {
		tree.addBranch(mouseX, mouseY)
	}
	clickSound.play()
	return false
}

function startFade() {
	isFading = true
	fadeTimer = 0
}
