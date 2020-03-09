let CANVAS_SIZE = 700
let STRIP_WIDTH = CANVAS_SIZE > 1000 ? 3 : 2
let SETRIPED_IMAGE_SIZE = 2
let N_FRAMES = 10
let N_IMAGES = 3

let FACTOR = CANVAS_SIZE / 1080
let currentImage = 0
let pointer
let frames = []
let scanimages = []
let stripedImage
let font
let frame
let clickSound
let isStripesVisible = true
let toggleStripeButtonX = 943 * FACTOR
let toggleStripeButtonY = 997 * FACTOR
let toggleStripeButtonRadius = 32 * FACTOR
let selectImageButtonX = 900 * FACTOR
let selectImageButtonY = 997 * FACTOR
let selectImageButtonRadius = 32 * FACTOR

function preload() {
	font = loadFont('assets/cocogoose.ttf')
	pointer = loadImage('assets/hand.svg')
	frame = loadImage('assets/frame.png')
	clickSound = loadSound('assets/click.wav')

	for (let n = 0; n < N_IMAGES; n++) {
		frames[n] = []
		for (let i = 0; i < N_FRAMES; i++) {
			let name = ('0000' + (i + 1)).slice(-4)
			frames[n][i] = loadImage('assets/f' + (n + 1) + '/' + name + '.png')
		}
	}
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	noCursor()
	textFont(font)

	for (let n = 0; n < N_IMAGES; n++) {
		frames[n].forEach((frame) => {
			frame.resize(CANVAS_SIZE, CANVAS_SIZE)
		})
	}

	pointer.resize(50 * FACTOR, 0)
	frame.resize(CANVAS_SIZE, CANVAS_SIZE)

	for (let n = 0; n < N_IMAGES; n++) {
		scanimages[n] = createGraphics(CANVAS_SIZE, CANVAS_SIZE)
	}
	stripedImage = createGraphics(SETRIPED_IMAGE_SIZE * CANVAS_SIZE, CANVAS_SIZE)
	createBaseImage()
	createStripedImage()
}

function draw() {
	background(colors.white)

	// current image
	image(scanimages[currentImage], 0, 0)
	if (isStripesVisible) {
		image(stripedImage, mouseX / 5 - SETRIPED_IMAGE_SIZE * CANVAS_SIZE / 2, 0)
	}

	// frame
	image(frame, 0, 0)

	// buttons
	if (isStripesVisible) {
		fill(colors.red)
	} else {
		fill(colors.black)
	}
	noStroke()
	circle(toggleStripeButtonX, toggleStripeButtonY, toggleStripeButtonRadius)

	fill(colors.gray)
	circle(selectImageButtonX, selectImageButtonY, selectImageButtonRadius)
	textAlign(CENTER, CENTER)
	fill(colors.black)
	noStroke()
	textSize(22 * FACTOR)
	text('' + (currentImage + 1), selectImageButtonX, selectImageButtonY - 4 * FACTOR)

	// cursor
	image(pointer, mouseX, mouseY)

	// name
	textAlign(LEFT)
	fill(255, 120)
	textSize(27 * FACTOR)
	text('Scanimator 1.0', 120 * FACTOR, 990 * FACTOR)
}

function createBaseImage() {
	let nStripes = parseInt(CANVAS_SIZE / STRIP_WIDTH)
	for (let n = 0; n < N_IMAGES; n++) {
		for (let i = 0; i < nStripes; i++) {
			let m = i % N_FRAMES
			scanimages[n].copy(
				frames[n][m],
				i * STRIP_WIDTH,
				0,
				STRIP_WIDTH,
				CANVAS_SIZE,
				i * STRIP_WIDTH,
				0,
				STRIP_WIDTH,
				CANVAS_SIZE
			)
		}
	}
}

function createStripedImage() {
	let nStripes = parseInt(SETRIPED_IMAGE_SIZE * CANVAS_SIZE / STRIP_WIDTH)
	for (let i = 0; i < nStripes; i++) {
		stripedImage.fill(colors.black)
		stripedImage.noStroke()
		if (i % N_FRAMES != 0) {
			stripedImage.rect(i * STRIP_WIDTH, 0, STRIP_WIDTH, CANVAS_SIZE)
		}
	}
}

function mousePressed() {
	if (
		dist(mouseX, mouseY, toggleStripeButtonX - toggleStripeButtonRadius / 2, toggleStripeButtonY) <
		toggleStripeButtonRadius / 2
	) {
		isStripesVisible = !isStripesVisible
		clickSound.play()
	}

	if (
		dist(mouseX, mouseY, selectImageButtonX - selectImageButtonRadius / 2, selectImageButtonY) <
		selectImageButtonRadius / 2
	) {
		currentImage++
		if (currentImage == N_IMAGES) {
			currentImage = 0
		}
		clickSound.play()
	}
}
