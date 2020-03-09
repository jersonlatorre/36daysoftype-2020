let CANVAS_SIZE = 700
let STRIP_WIDTH = CANVAS_SIZE > 1000 ? 3 : 2
let SETRIPED_IMAGE_SIZE = 2
let N_FRAMES = 10
let N_IMAGES = 3

let currentImage = 0
let pointer
let frames = []
let scanimages = []
let striped
let font
let frame
let clickSound
let isStripesVisible = true
let toggleStripeButtonX = 943 * CANVAS_SIZE / 1080
let toggleStripeButtonY = 997 * CANVAS_SIZE / 1080
let toggleStripeButtonRadius = 32 * CANVAS_SIZE / 1080
let selectImageButtonX = 900 * CANVAS_SIZE / 1080
let selectImageButtonY = 997 * CANVAS_SIZE / 1080
let selectImageButtonRadius = 32 * CANVAS_SIZE / 1080
let loadedCounter = 0

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

	console.log(frames)
	for (let n = 0; n < N_IMAGES; n++) {
		frames[n].forEach((frame) => {
			frame.resize(CANVAS_SIZE, CANVAS_SIZE)
		})
	}

	pointer.resize(50 * CANVAS_SIZE / 1080, 0)
	frame.resize(CANVAS_SIZE, CANVAS_SIZE)

	for (let n = 0; n < N_IMAGES; n++) {
		scanimages[n] = createGraphics(CANVAS_SIZE, CANVAS_SIZE)
	}
	striped = createGraphics(SETRIPED_IMAGE_SIZE * CANVAS_SIZE, CANVAS_SIZE)
	createBaseImage()
	createStripedImage()
}

function draw() {
	background(colors.white)

	// current image
	image(scanimages[currentImage], 0, 0)
	if (isStripesVisible) {
		image(striped, mouseX / 5 - SETRIPED_IMAGE_SIZE * CANVAS_SIZE / 2, 0)
	}

	image(frame, 0, 0)

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
	textSize(22 * CANVAS_SIZE / 1080)
	text('' + (currentImage + 1), selectImageButtonX, selectImageButtonY - 4 * CANVAS_SIZE / 1080)

	image(pointer, mouseX, mouseY)

	textAlign(LEFT)
	fill(255, 120)
	textSize(27 * CANVAS_SIZE / 1080)
	text('Scanimator 1.0', 120 * CANVAS_SIZE / 1080, 990 * CANVAS_SIZE / 1080)
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
	console.log(nStripes)
	for (let i = 0; i < nStripes; i++) {
		striped.fill(colors.black)
		striped.noStroke()
		if (i % N_FRAMES != 0) {
			striped.rect(i * STRIP_WIDTH, 0, STRIP_WIDTH, CANVAS_SIZE)
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
