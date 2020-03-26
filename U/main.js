let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let hand
let u
let fft
let amplitude
let bgm1
let bgm2
let bgm3
let click

function preload() {
	hand = loadImage('assets/hand.svg')
	bgm1 = loadSound('assets/bgm1.mp3')
	bgm2 = loadSound('assets/bgm2.mp3')
	bgm3 = loadSound('assets/bgm3.mp3')
	click = loadSound('assets/click.wav')
}
function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	hand.resize(CANVAS_SIZE / 25, 0)
	noCursor()

	fft = new p5.FFT()
	amplitude = new p5.Amplitude()
	u = new U()
}

function draw() {
	background(colors.gray)
	u.draw()
	image(hand, mouseX - 13 * FACTOR, mouseY - 5 * FACTOR)
}

function mousePressed() {
	u.click()
	click.play()
}