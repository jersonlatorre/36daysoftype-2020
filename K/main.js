let game
let font
let boom
let shoot
let win

function preload() {
	font = loadFont('assets/cocogoose.ttf')
	boom = loadSound('assets/boom.mp3')
	shoot = loadSound('assets/laser.mp3')
	win = loadSound('assets/win.wav')
	boom.setVolume(0.3)
	shoot.setVolume(0.15)
	win.setVolume(0.2)

	// boom.setVolume(0)
	// shoot.setVolume(0)
	// win.setVolume(0)
}

function setup() {
	pixelDensity(1)
	textFont(font)
	textAlign(CENTER, CENTER)
	createCanvas(700, 700)
	game = new Game()
}

function draw() {
	scale(width / 500)
	game.draw()
}
