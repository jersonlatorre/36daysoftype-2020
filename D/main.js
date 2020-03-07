let CANVAS_SIZE = 850
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
	pointer.resize(50, 0)
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
	strokeWeight(10)
	circle(mouseX, mouseY, 50)

	stroke(colors.white)
	strokeWeight(5)
	circle(mouseX, mouseY, 25)
	image(pointer, mouseX, mouseY)
}

function mousePressed() {
	if (tree.isAnimationFinished){
		tree.start(mouseX, mouseY)
	}
	clickSound.play()
}

function startFade() {
	isFading = true
	fadeTimer = 0
}
