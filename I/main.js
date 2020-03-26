let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let pointer
let hand
let i

let synth
let vibrato

function preload() {
	pointer = loadImage('assets/pointer.svg')
	hand = loadImage('assets/hand.svg')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(CANVAS_SIZE / 25, 0)
	hand.resize(CANVAS_SIZE / 15, 0)
	noCursor()

	synth = Triangle()
	vibrato = Vibrato()
	synth.fx.add(vibrato)
	r = Reverb()
	synth.fx.add(r)

	i = new I()
	getAudioContext().suspend()
}

function draw() {
	background(lerpColor(color(colors.blue), color(80), i.value()))
	let frequency = map(i.value(), 0, 1, 440, 220)
	let amplitude = map(i.strength(), 0, 1, 0.2, 0.6)
	let rate = map(i.strength(), 0, 1, 0.01, 20)
	let amount = map(i.strength(), 0, 1, 0, 0.5)
	synth.frequency = frequency
	synth.amp = amplitude
	vibrato.rate = rate
	vibrato.amount = amount
	i.draw()
}

function mousePressed() {
	userStartAudio()
}
