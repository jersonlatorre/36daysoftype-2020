let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let LEVELS = 10
let MARGIN = -1
let BIAS = 0.1
let LOOP_DURATION = 10

let slider
let letter = 'R'
let divisions = []
let nDivision = 0
let video
let font
let timer = 0
let letterCanvas
let simplex = new SimplexNoise()
let synth
let vibrato

function preload() {
	font = loadFont('cocogoose.ttf')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	colorMode(HSB)
	textFont(font)
	smooth()
	letterCanvas = createGraphics(1080 * FACTOR, 1080 * FACTOR)
	slider = new Slider()

	synth = Triangle()
	vibrato = Vibrato()
	synth.fx.add(vibrato)
	r = Reverb()
	synth.fx.add(r)
}

function draw() {
	background('white')

	timer += map(slider.value, 0, 1, 0.02, 0.2) * deltaTime / 1000
	if (timer >= 1) {
		timer = 0
	}

	letterCanvas.background(colors.white)
	letterCanvas.noStroke()
	letterCanvas.fill(colors.black)
	letterCanvas.textAlign(CENTER, CENTER)
	letterCanvas.textFont(font)
	letterCanvas.textSize(850 * FACTOR)
	letterCanvas.text(letter, width / 2 - 20 * FACTOR, height / 2 - 140 * FACTOR)
	letterCanvas.loadPixels()

	divisions = [
		{
			x1: MARGIN,
			y1: MARGIN,
			x2: width - MARGIN,
			y2: MARGIN,
			x3: width - MARGIN,
			y3: height - MARGIN,
			x4: MARGIN,
			y4: height - MARGIN,
			level: 0
		}
	]

	nDivision = 0

	for (let i = 0; i < LEVELS; i++) {
		processDivisions()
	}

	vibrato.rate = map(slider.value, 0, 1, 0.01, 280)
	vibrato.amount = map(slider.value, 0, 1, 0, 0.2)
	synth.amp = map(slider.value, 0, 1, 0.3, 0.8)
	synth.frequency = map(slider.value, 0, 1, 110, 150)

	// slider.update()
	BIAS = map(slider.value, 0, 1, 0.45, 0)
	drawDivisions()
	slider.draw()
}

function processDivisions() {
	nDivision++
	let aux = []
	divisions.forEach((d, index) => {
		let nx = cos(2 * timer * PI)
		let ny = sin(2 * timer * PI)
		let r1 = BIAS + (1 - 2 * BIAS) * 0.5 * (1 + simplex.noise3D(nx, ny, index))
		let r2 = BIAS + (1 - 2 * BIAS) * 0.5 * (1 + simplex.noise3D(nx, ny, index + 5))

		if (nDivision % 2 == 0) {
			aux.push({
				x1: d.x1,
				y1: d.y1,
				x2: r1 * d.x1 + (1 - r1) * d.x2,
				y2: r1 * d.y1 + (1 - r1) * d.y2,
				x3: r2 * d.x3 + (1 - r2) * d.x4,
				y3: r2 * d.y3 + (1 - r2) * d.y4,
				x4: d.x4,
				y4: d.y4,
				level: index
			})

			aux.push({
				x1: r1 * d.x1 + (1 - r1) * d.x2,
				y1: r1 * d.y1 + (1 - r1) * d.y2,
				x2: d.x2,
				y2: d.y2,
				x3: d.x3,
				y3: d.y3,
				x4: r2 * d.x3 + (1 - r2) * d.x4,
				y4: r2 * d.y3 + (1 - r2) * d.y4,
				level: index
			})
		} else {
			aux.push({
				x1: d.x1,
				y1: d.y1,
				x2: d.x2,
				y2: d.y2,
				x3: r1 * d.x2 + (1 - r1) * d.x3,
				y3: r1 * d.y2 + (1 - r1) * d.y3,
				x4: r2 * d.x1 + (1 - r2) * d.x4,
				y4: r2 * d.y1 + (1 - r2) * d.y4,
				level: index
			})

			aux.push({
				x1: r2 * d.x1 + (1 - r2) * d.x4,
				y1: r2 * d.y1 + (1 - r2) * d.y4,
				x2: r1 * d.x2 + (1 - r1) * d.x3,
				y2: r1 * d.y2 + (1 - r1) * d.y3,
				x3: d.x3,
				y3: d.y3,
				x4: d.x4,
				y4: d.y4,
				level: index
			})
		}
	})

	divisions = aux.slice()
}

function drawDivisions() {
	let points = []
	let whitePoints = []

	// draw divisions
	divisions.forEach((d) => {
		let cx = (d.x1 + d.x2 + d.x3 + d.x4) >> 2
		let cy = (d.y1 + d.y2 + d.y3 + d.y4) >> 2

		let r = letterCanvas.pixels[4 * (cy * width + cx)]
		let g = letterCanvas.pixels[4 * (cy * width + cx) + 1]
		let b = letterCanvas.pixels[4 * (cy * width + cx) + 2]

		let h = (r + g + b) / 3

		if (h < 127) {
			points.push([ cx, cy ])
		}

		fill(colors.white)
		strokeWeight(1.5)
		stroke(colors.gray)

		beginShape()
		vertex(d.x1, d.y1)
		vertex(d.x2, d.y2)
		vertex(d.x3, d.y3)
		vertex(d.x4, d.y4)
		vertex(d.x1, d.y1)
		endShape()

		noStroke()
		if (h == 255) {
			fill(colors.black)
			circle(cx, cy, 5 * FACTOR)
		} else {
			whitePoints.push([ cx, cy ])
		}
	})

	let ch = hull(points, 80)

	// draw letter
	fill(colors.red)
	noStroke()
	beginShape()
	ch.forEach((p) => {
		vertex(p[0], p[1])
	})
	endShape()

	// draw intern points
	whitePoints.forEach((p) => {
		fill(colors.white)
		noStroke()
		circle(p[0], p[1], 8 * FACTOR)
	})

	// draw outline
	let L = 9
	ch.forEach((p) => {
		stroke(colors.blue)
		strokeWeight(6)
		line(p[0] - L, p[1], p[0] + L, p[1])
		line(p[0], p[1] - L, p[0], p[1] + L)
	})
}
