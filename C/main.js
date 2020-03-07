let CANVAS_SIZE = 700
let LOOP_DURATION = 2
let pointer
let timer = 0

let N = 30
let letter = []
let processedLetter = []
let isOnDrugs = true
// let song

function preload() {
	pointer = loadImage('assets/hand.svg')
	// song = loadSound('assets/hd.mp3')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	noCursor()

	strokeCap(ROUND)
	strokeJoin(ROUND)

	pointer.resize(50, 0)

	// song.amp(0.25)
	// song.play()
}

function generateLetter() {
	let shape = []
	letter = []

	shape.push({ x: 0.6, y: 0.475 })

	// half-circle up
	for (let i = 0; i <= N; i++) {
		let angle = PI * (i / N)
		let x = 0.5 + 0.25 * cos(angle)
		let y = 0.475 - 0.3 * sin(angle)
		shape.push({ x: x, y: y })
	}

	// half-circle down
	for (let i = 0; i <= N; i++) {
		let angle = PI * (i / N)
		let x = 0.5 - 0.25 * cos(angle)
		let y = 0.625 + 0.25 * sin(angle)
		shape.push({ x: x, y: y })
	}

	shape.push({ x: 0.6, y: 0.625 })
	letter.push(shape)
}

function processLetter() {
	processedLetter = []
	letter.forEach((shape) => {
		let processedShape = []
		shape.forEach((p) => {
			let mx = map(constrain(mouseX, 100, CANVAS_SIZE - 100), 0, CANVAS_SIZE, 0, 1)
			let my = map(constrain(mouseY, 100, CANVAS_SIZE - 100), 0, CANVAS_SIZE, 0, 1)
			if (p.x > 0.5) {
				if (p.y > 0.5) {
					let rx = (p.x - 0.5) / 0.5
					let ry = (p.y - 0.5) / 0.5
					let ppx = mx + (1 - mx) * rx
					let ppy = my + (1 - my) * ry
					processedShape.push({ x: ppx, y: ppy })
				} else {
					// p.y < 0.5
					let rx = (p.x - 0.5) / 0.5
					let ry = -(p.y - 0.5) / 0.5
					let ppx = mx + (1 - mx) * rx
					let ppy = my - my * ry
					processedShape.push({ x: ppx, y: ppy })
				}
			} else {
				if (p.y > 0.5) {
					let rx = -(p.x - 0.5) / 0.5
					let ry = (p.y - 0.5) / 0.5
					let ppx = mx + -mx * rx
					let ppy = my + (1 - my) * ry
					processedShape.push({ x: ppx, y: ppy })
				} else {
					// p.y < 0.5
					let rx = -(p.x - 0.5) / 0.5
					let ry = -(p.y - 0.5) / 0.5
					let ppx = mx - mx * rx
					let ppy = my - my * ry
					processedShape.push({ x: ppx, y: ppy })
				}
			}
		})

		processedLetter.push(processedShape)
	})
}

function drawLetter() {
	processedLetter.forEach((shape) => {
		stroke(colors.gray)
		fill(colors.white)
		strokeWeight(20)
		beginShape()
		shape.forEach((point, i) => {
			let dx = 0
			let dy = 0

			if (isOnDrugs) {
				dx = 10 * cos(10 * timer * 2 * PI + i)
				dy = 10 * sin(10 * timer * 2 * PI + i)
			}

			vertex(CANVAS_SIZE * point.x + dx, CANVAS_SIZE * point.y + dy)
		})
		endShape(CLOSE)
	})
}

function draw() {
	if (isOnDrugs) {
		if (((frameCount / 6) | 0) % 2 == 0) {
			background(colors.red)
		} else {
			background(colors.blue)
		}
		N = 3
	} else {
		background(colors.black)
		N = 30
	}

	timer += deltaTime / (1000 * LOOP_DURATION)
	if (timer >= 1) {
		timer = 0
	}

	generateLetter()
	processLetter()
	drawLetter()

	image(pointer, mouseX - 20, mouseY)
}

function mousePressed() {
	isOnDrugs = !isOnDrugs
}