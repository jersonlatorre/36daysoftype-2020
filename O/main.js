let game
let enemyImage
let waterImage
let soapImage

function preload() {
	enemyImage = loadImage('assets/enemy.png')
	waterImage = loadImage('assets/water.png')
	soapImage = loadImage('assets/soap.png')
}

function setup() {
	createCanvas(700, 700)
	game = new Game()

	enemyImage.resize(Global.ENEMY_HEIGHT, 0)
}

function draw() {
	translate(width / 2, width / 2)
	scale(width / 1080)
	game.draw()
}

function keyPressed() {
	game.keyPressed()
}

function keyReleased() {
	game.keyReleased()
}
