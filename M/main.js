let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let pointer
let house
let font

let N = 17
let W = CANVAS_SIZE / (N + 1)
let letters = []
let mix, miy, mfx, mfy
let STATE_NONE = 0
let STATE_DRAWING = 1
let state = STATE_NONE

let bannedCoordinates = [
	{ i: 5, j: 7 },
	{ i: 5, j: 8 },
	{ i: 5, j: 9 },
	{ i: 5, j: 10 },
	{ i: 5, j: 10 },
	{ i: 6, j: 6 },
	{ i: 6, j: 7 },
	{ i: 6, j: 8 },
	{ i: 6, j: 9 },
	{ i: 6, j: 10 },
	{ i: 7, j: 6 },
	{ i: 7, j: 7 },
	{ i: 7, j: 8 },
	{ i: 7, j: 9 },
	{ i: 7, j: 10 },
	{ i: 8, j: 7 },
	{ i: 8, j: 8 },
	{ i: 8, j: 9 },
	{ i: 8, j: 10 },
	{ i: 9, j: 6 },
	{ i: 9, j: 7 },
	{ i: 9, j: 8 },
	{ i: 9, j: 9 },
	{ i: 9, j: 10 },
	{ i: 10, j: 6 },
	{ i: 10, j: 7 },
	{ i: 10, j: 8 },
	{ i: 10, j: 9 },
	{ i: 10, j: 10 },
	{ i: 11, j: 7 },
	{ i: 11, j: 8 },
	{ i: 11, j: 9 },
	{ i: 11, j: 10 }
]

function preload() {
	pointer = loadImage('assets/pointer.svg')
	house = loadImage('assets/house.svg')
	font = loadFont('assets/cocogoose.ttf')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(CANVAS_SIZE / 25, 0)
	house.resize(CANVAS_SIZE, CANVAS_SIZE)
	textFont(font)
	textSize(45 * FACTOR)
	textAlign(CENTER, CENTER)
	noCursor()
}

function draw() {
	background(colors.white)
	image(house, 0, 0)
	noStroke()

	switch (state) {
		case STATE_NONE: {
			mix = floor((mouseX + W / 2) / W)
			miy = floor((mouseY + W / 2) / W)
			if (isCoordinateInsideCanvas(mix, miy) && !isCoordinateOverHouse(mix - 1, miy - 1)) {
				fill(colors.red)
				circle(mix * W, miy * W, 40 * FACTOR)
			}
			break
		}

		case STATE_DRAWING: {
			mfx = floor((mouseX + W / 2) / W)
			mfy = floor((mouseY + W / 2) / W)
			if (mfx > N) mfx = N
			if (mfy > N) mfy = N
			for (let i = mix; i <= mfx; i++) {
				for (let j = miy; j <= mfy; j++) {
					drawLetter(i, j)
				}
			}
			break
		}
	}

	image(pointer, mouseX, mouseY)
}

function drawLetter(i, j) {
	if (isCoordinateOverHouse(i - 1, j - 1)) return
	fill(colors.black)
	if (i == mix && j == miy) {
		text('S', i * W, j * W - 10)
	} else if (i == mix + 1 && j == miy) {
		text('T', i * W, j * W - 10)
	} else if (i == mix + 2 && j == miy) {
		text('A', i * W, j * W - 10)
	} else if (i == mix + 3 && j == miy) {
		text('Y', i * W, j * W - 10)
	} else {
		if (mfy != miy) {
			if (i == mfx && j == mfy) {
				text('E', i * W, j * W - 10)
			} else if (i == mfx - 1 && j == mfy) {
				text('M', i * W, j * W - 10)
			} else if (i == mfx - 2 && j == mfy) {
				text('O', i * W, j * W - 10)
			} else if (i == mfx - 3 && j == mfy) {
				text('H', i * W, j * W - 10)
			} else {
				fill(0, 35)
				text('+', i * W, j * W - 10)
			}
		} else {
			fill(0, 35)
			text('+', i * W, j * W - 10)
		}
	}
}

function mousePressed() {
	mix = floor((mouseX + W / 2) / W)
	miy = floor((mouseY + W / 2) / W)
	if (isCoordinateInsideCanvas(mix, miy)) {
		state = STATE_DRAWING
	}
}

function mouseReleased() {
	state = STATE_NONE
}

function isCoordinateInsideCanvas(i, j) {
	return i > 0 && j > 0 && i <= N && j <= N
}

function isCoordinateOverHouse(i, j) {
	let isInHouse = false
	bannedCoordinates.forEach((coord) => {
		if (coord.i == i && coord.j == j) {
			isInHouse = true
		}
	})

	return isInHouse
}
