let game
let enemyImage
let waterImage
let soapImage
let winScreenImage
let loseScreenImage
let font

let jumpSound
let levelupSound
let itemSound
let hitSound
let explosionSound
let tryagainSound
let completedSound
let bgmSound

function preload() {
	enemyImage = loadImage('assets/enemy.png')
	waterImage = loadImage('assets/water.png')
	soapImage = loadImage('assets/soap.png')
	winScreenImage = loadImage('assets/winscreen.png')
	loseScreenImage = loadImage('assets/losescreen.png')
	font = loadFont('assets/cocogoose.ttf')

	jumpSound = loadSound('assets/sounds/jump1.wav')
	levelupSound = loadSound('assets/sounds/levelup.wav')
	itemSound = loadSound('assets/sounds/item.wav')
	hitSound = loadSound('assets/sounds/hit.wav')
	explosionSound = loadSound('assets/sounds/explosion.wav')
	tryagainSound = loadSound('assets/sounds/tryagain.wav')
	completedSound = loadSound('assets/sounds/completed.wav')
	bgmSound = loadSound('assets/sounds/bgm.mp3')
}

function setup() {
	createCanvas(700, 700)
	textFont(font)
	textSize(40)
	textAlign(CENTER, CENTER)
	game = new Game()
	enemyImage.resize(Global.ENEMY_HEIGHT, 0)

	jumpSound.amp(0.25)
	levelupSound.amp(0.4)
	hitSound.amp(0.4)
	itemSound.amp(0.4)
	hitSound.amp(0.5)
	tryagainSound.amp(1.3)
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
