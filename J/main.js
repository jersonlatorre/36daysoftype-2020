let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 700
let W = 100 * FACTOR
let pointer
let hand
let eyes = []
let lightsOn = true
let simplex = new SimplexNoise()
let font

function preload() {
	pointer = loadImage('assets/pointer.svg')
	hand = loadImage('assets/hand.svg')
	font = loadFont('assets/cocogoose.ttf')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL)
	pointer.resize(CANVAS_SIZE / 25, 0)
	hand.resize(CANVAS_SIZE / 20, 0)
	textFont(font)
	textSize(30)

	setAttributes('antialias', true)
	eyes.push(new Eye(W, -2 * W * 0.7))
	eyes.push(new Eye(W * 0.2, -2 * W * 0.7))
	eyes.push(new Eye(W, -W * 0.6))
	eyes.push(new Eye(W, W * 0.2))
	eyes.push(new Eye(W, W))
	eyes.push(new Eye(W * 0.7, W + W * 0.7))
	eyes.push(new Eye(0, 2 * W))
	eyes.push(new Eye(-W * 0.7, W + W * 0.7))
	eyes.push(new Eye(-W, W))
	noCursor()
}

function draw() {
	translate(-CANVAS_SIZE / 2 - 10, -CANVAS_SIZE / 2 - 10)
	
	if (lightsOn) {
		background(colors.red)
	} else {
		background(colors.black)
	}

	eyes.forEach((eye) => {
		eye.draw()
	})

	if (lightsOn) {
		fill(255)
	} else {
		fill(100)
	}
	noStroke()
	circle(50 * FACTOR, 50 * FACTOR, 25 * FACTOR)

	if (dist(mouseX, mouseY, 50 * FACTOR, 50 * FACTOR) < 25 * FACTOR / 2) {
		image(hand, mouseX- 10 * FACTOR, mouseY)
	} else {
		image(pointer, mouseX, mouseY)
	}
}

function mouseClicked() {
	if (dist(mouseX, mouseY, 50 * FACTOR, 50 * FACTOR) < 25 * FACTOR / 2) {
		lightsOn = !lightsOn
	}
}
