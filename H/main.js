let CANVAS_SIZE = 700
let pointer
let letters = []
let N = 30
let PADDING = CANVAS_SIZE / 180
let MARGIN = CANVAS_SIZE / 10
let reference

let simplex = new SimplexNoise()

function preload() {
	pointer = loadImage('assets/pointer.svg')
	reference = loadImage('assets/reference.svg')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL)
	setAttributes('antialias', true)
	pointer.resize(CANVAS_SIZE / 18, 0)
	reference.resize(CANVAS_SIZE, CANVAS_SIZE)
	noCursor()

	let tileSize = (CANVAS_SIZE - 2 * MARGIN) / N
	let letterSize = (CANVAS_SIZE - 2 * MARGIN) / N - 2 * PADDING
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			let x = MARGIN + i * tileSize + tileSize / 2 + PADDING - tileSize / 2
			let y = MARGIN + j * tileSize + tileSize / 2 + PADDING - tileSize / 2
			let letter = new H(x, y, letterSize)
			letters.push(letter)
		}
	}
}

function draw() {
	translate(-CANVAS_SIZE / 2, -CANVAS_SIZE / 2)
	background(colors.black)
	letters.forEach((letter) => {
		letter.draw()
	})

	translate(mouseX, mouseY, 200)
	fill(colors.blue)
	noStroke()
	circle(0, 0, CANVAS_SIZE / 60)
	image(pointer, 0, 0)
}
