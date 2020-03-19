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
	font = loadFont('assets/cocogoose.ttf')
	
	if (isMobileDevice()) return
	enemyImage = loadImage('assets/enemy.png')
	waterImage = loadImage('assets/water.png')
	soapImage = loadImage('assets/soap.png')
	winScreenImage = loadImage('assets/winscreen.png')
	loseScreenImage = loadImage('assets/losescreen.png')

	jumpSound = loadSound('assets/sounds/jump.mp3')
	levelupSound = loadSound('assets/sounds/levelup.mp3')
	itemSound = loadSound('assets/sounds/item.mp3')
	hitSound = loadSound('assets/sounds/hit.mp3')
	explosionSound = loadSound('assets/sounds/explosion.mp3')
	tryagainSound = loadSound('assets/sounds/tryagain.mp3')
	completedSound = loadSound('assets/sounds/completed.mp3')
	bgmSound = loadSound('assets/sounds/bgm.mp3')
}

function setup() {
	createCanvas(700, 700)
	textFont(font)
	textSize(40)
	textAlign(CENTER, CENTER)

	if (isMobileDevice()) {
		translate(width / 2, width / 2)
		scale(0.7)
		fill(0)
		noStroke()
		rect(-3000, -3000, 6000, 6000)
		fill(255)
		textSize(20)
		text('Sorry!', 0, -32)
		text('Your device is not supported yet.', 0, 0)
		text('Try using PC or Laptop.', 0, 32)
		noLoop()
		return
	}

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
	if (isMobileDevice()) return
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

function isMobileDevice() {
	return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1
}
