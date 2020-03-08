let CANVAS_SIZE = 1080
let pointer

let keyC
let keyCSharp
let keyD
let keySharp
let keyE
let canvas
let keys = []
let effects = []

let WHITE_KEY_WIDTH = 400 * CANVAS_SIZE / 1080
let WHITE_KEY_HEIGHT = 150 * CANVAS_SIZE / 1080
let BLACK_KEY_WIDTH = 250 * CANVAS_SIZE / 1080
let BLACK_KEY_HEIGHT = 80 * CANVAS_SIZE / 1080

let follow
let synth
let drums

function preload() {
	pointer = loadImage('assets/pointer.svg')
}

function setup() {
	canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	noCursor()
	keys.push(new Key('C'), new Key('D'), new Key('E'), new Key('C#'), new Key('D#'))
	drums = EDrums('x*o*x*o*x*o*x*o*', 1 / 8)
	// drums = EDrums('x.*ox*o*x.*ox.o.', 1 / 14)
	drums.hat.fx.add(Distortion())
	drums.snare.snappy = 0.4
	drums.kick.decay = 0.1
	drums.hat.decay = 0.01

	drums.amp = 1.2

	// synth = Synth({ amp: 0.5, maxVoices: 4, waveform: 'Sine', attack: ms(1), decay: ms(150) })
	synth = Synth2({
		amp: 6,
		maxVoices: 5,
		waveform: 'Triangle',
		filterMult: 5,
		resonance: 3,
		attack: ms(1),
		decay: ms(100),
		cutoff: 0.4
	})
	r = Reverb({ roomSize: 0.8, damping: 1 })
	synth.fx.add(r)
}

function draw() {
	background(colors.red)

	// effects
	effects.forEach((effect, i) => {
		effect.draw()
		if (effects.isDead) {
			splice(i, 1)
		}
	})

	// lines
	let NUM_BARS = 32
	let BAR_WIDTH = width / (NUM_BARS / 2 - 1)
	let fft = FFT(NUM_BARS)
	noFill()
	strokeWeight(CANVAS_SIZE / 36)
	stroke(255, 50)
	beginShape()
	for (let i = 0; i < NUM_BARS / 2; i++) {
		let value = CANVAS_SIZE * fft[i] / 255
		vertex(i * BAR_WIDTH, CANVAS_SIZE - value)
	}
	endShape()

	strokeWeight(CANVAS_SIZE / 100)
	stroke(255, 70)

	beginShape()
	for (let i = 0; i < NUM_BARS / 2; i++) {
		let value = CANVAS_SIZE * fft[i] / 255
		vertex(i * BAR_WIDTH, CANVAS_SIZE - value)
	}
	endShape()

	// piano
	rectMode(CENTER)

	stroke('rgba(255, 255, 255, 0.3)')
	strokeWeight(CANVAS_SIZE / 30)
	rect(width / 2, height / 2, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT * 3)

	keys.forEach((key) => {
		key.draw()
	})

	// pointer
	let r = 50
	noStroke()
	fill(colors.blue)
	circle(mouseX, mouseY, r)
	fill(colors.gray)
	circle(mouseX, mouseY, r / 2)
}

function mousePressed() {
	for (let i = keys.length - 1; i >= 0; i--) {
		let key = keys[i]
		if (
			mouseX < key.position.x + key.width / 2 &&
			mouseX > key.position.x - key.width / 2 &&
			mouseY < key.position.y + key.height / 2 &&
			mouseY > key.position.y - key.height / 2
		) {
			key.play()
			return
		}
	}
}

function mouseReleased() {
	for (let i = keys.length - 1; i >= 0; i--) {
		let key = keys[i]
		key.release()
	}
}

function keyPressed() {
	if (key == 'a' || key == 'A') {
		keys[0].play()
	}

	if (key == 'w' || key == 'W') {
		keys[3].play()
	}

	if (key == 's' || key == 'S') {
		keys[1].play()
	}

	if (key == 'e' || key == 'E') {
		keys[4].play()
	}

	if (key == 'd' || key == 'D') {
		keys[2].play()
	}
}

function keyReleased() {
	for (let i = keys.length - 1; i >= 0; i--) {
		let key = keys[i]
		key.release()
	}
}
