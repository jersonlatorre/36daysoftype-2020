let CANVAS_SIZE = 700
let backgroundImage
let hitSound
let levelupSound
let winSound
let winScreen
let level = -3

let engine
let ball
let boundaries = []
let obstacles = []
let explosions = []
let goal

let PLAYING = 0
let WIN = 1
let TRANSITION_IN = 2
let RESET = 3
let TRANSITION_OUT = 4
let SUPER_WIN = 5
let state = PLAYING

let transitionTimer = 0
let winStripesOffset = 0

function preload() {
	pointer = loadImage('assets/pointer.svg')
	backgroundImage = loadImage('assets/background.png')
	winScreen = loadImage('assets/winscreen.png')
	hitSound = loadSound('assets/hit.wav')
	winSound = loadSound('assets/win.mp3')
	levelupSound = loadSound('assets/levelup.wav')
}

function resetGame() {
	level += 3
	if (level >= 15) {
		state = SUPER_WIN
		winSound.amp(0.6)
		winSound.play()
	}

	let obstaclesPositions = [
		{ x: 2.5 * CANVAS_SIZE / 12, y: 2.5 * CANVAS_SIZE / 12 },
		{ x: 2.5 * CANVAS_SIZE / 12, y: 7.5 * CANVAS_SIZE / 12 },
		{ x: 2.5 * CANVAS_SIZE / 12, y: 8.5 * CANVAS_SIZE / 12 },
		{ x: 2.5 * CANVAS_SIZE / 12, y: 9.5 * CANVAS_SIZE / 12 },
		{ x: 3.5 * CANVAS_SIZE / 12, y: 4.5 * CANVAS_SIZE / 12 },
		{ x: 3.5 * CANVAS_SIZE / 12, y: 5.5 * CANVAS_SIZE / 12 },
		{ x: 4.5 * CANVAS_SIZE / 12, y: 2.5 * CANVAS_SIZE / 12 },
		{ x: 4.5 * CANVAS_SIZE / 12, y: 9.5 * CANVAS_SIZE / 12 },
		{ x: 5.5 * CANVAS_SIZE / 12, y: 2.5 * CANVAS_SIZE / 12 },
		{ x: 6.5 * CANVAS_SIZE / 12, y: 2.5 * CANVAS_SIZE / 12 },
		{ x: 6.5 * CANVAS_SIZE / 12, y: 8.5 * CANVAS_SIZE / 12 },
		{ x: 7.5 * CANVAS_SIZE / 12, y: 2.5 * CANVAS_SIZE / 12 },
		{ x: 7.5 * CANVAS_SIZE / 12, y: 6.5 * CANVAS_SIZE / 12 },
		{ x: 7.5 * CANVAS_SIZE / 12, y: 8.5 * CANVAS_SIZE / 12 },
		{ x: 9.5 * CANVAS_SIZE / 12, y: 6.5 * CANVAS_SIZE / 12 },
		{ x: 9.5 * CANVAS_SIZE / 12, y: 7.5 * CANVAS_SIZE / 12 },
		{ x: 9.5 * CANVAS_SIZE / 12, y: 8.5 * CANVAS_SIZE / 12 },
		{ x: 9.5 * CANVAS_SIZE / 12, y: 9.5 * CANVAS_SIZE / 12 }
	]

	boundaries = []
	obstacles = []
	explosions = []
	engine = Matter.Engine.create()
	engine.world.gravity = { x: 0, y: 0 }
	randomSeed(new Date().getMilliseconds())

	// ball
	ball = new Ball(9 * CANVAS_SIZE / 12, 3 * CANVAS_SIZE / 12)
	// ball = new Ball(CANVAS_SIZE / 2 + 100, CANVAS_SIZE / 2)

	// boundaries
	boundaries.push(new Boundary(CANVAS_SIZE / 2, CANVAS_SIZE / 12, CANVAS_SIZE, 2 * CANVAS_SIZE / 12))
	boundaries.push(new Boundary(CANVAS_SIZE / 2, 11 * CANVAS_SIZE / 12, CANVAS_SIZE, 2 * CANVAS_SIZE / 12))
	boundaries.push(new Boundary(CANVAS_SIZE / 12, CANVAS_SIZE / 2, 2 * CANVAS_SIZE / 12, 8 * CANVAS_SIZE / 12))
	boundaries.push(new Boundary(11 * CANVAS_SIZE / 12, CANVAS_SIZE / 2, 2 * CANVAS_SIZE / 12, 8 * CANVAS_SIZE / 12))
	boundaries.push(new Boundary(7 * CANVAS_SIZE / 12, 4.5 * CANVAS_SIZE / 12, CANVAS_SIZE / 2, CANVAS_SIZE / 12))
	boundaries.push(new Boundary(CANVAS_SIZE / 2, 7.5 * CANVAS_SIZE / 12, 4 * CANVAS_SIZE / 12, CANVAS_SIZE / 12))
	boundaries.push(new Boundary(4.5 * CANVAS_SIZE / 12, CANVAS_SIZE / 2, CANVAS_SIZE / 12, 2 * CANVAS_SIZE / 12))

	// obstacles
	let length = obstaclesPositions.length
	for (let i = 0; i < length - level; i++) {
		obstaclesPositions.splice(random(0, obstaclesPositions.length), 1)
	}
	obstaclesPositions.forEach((p) => {
		obstacles.push(new Obstacle(p.x, p.y))
	})

	// goal
	goal = new Goal()

	// engine
	Matter.Events.on(engine, 'collisionStart', (event) => {
		if (event.pairs[0].bodyB.label == 'goal') {
			state = WIN
			levelupSound.amp(0.2)
			levelupSound.play()
			hitSound.amp(1)
			hitSound.play()
			explosions.push(new Explosion(event.pairs[0].bodyA.position.x, event.pairs[0].bodyA.position.y))
			setTimeout(() => {
				state = TRANSITION_IN
			}, 800)
		} else {
			let speed = constrain(ball.body.speed, 0, 50)
			let volume = map(speed, 0, 50, 0, 1)
			hitSound.amp(volume)
			hitSound.play()
		}
	})

	// Matter.Engine.run(engine)
}

function setup() {
	noCursor()
	rectMode(CENTER)
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	backgroundImage.resize(CANVAS_SIZE, CANVAS_SIZE)
	winScreen.resize(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(CANVAS_SIZE / 24, 0)

	resetGame()
}

function draw() {
	image(backgroundImage, 0, 0)
	obstacles.forEach((obstacle) => {
		obstacle.draw()
	})

	switch (state) {
		case PLAYING:
			Matter.Engine.update(engine)
			ball.draw()
			break
		case WIN:
			explosions.forEach((explosion, i) => {
				explosion.draw()
				if (explosion.isDead) {
					explosions.splice(i, 1)
				}
			})
			break
		case TRANSITION_IN:
			transitionTimer += 0.02
			if (transitionTimer >= 0.5) {
				state = TRANSITION_OUT
				resetGame()
			}

			fill(0, 255 * sin(transitionTimer * PI))
			square(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE)
			break
		case TRANSITION_OUT:
			transitionTimer += 0.02
			if (transitionTimer >= 1) {
				transitionTimer = 0
				state = PLAYING
			}

			ball.draw()
			fill(0, 255 * sin(transitionTimer * PI))
			square(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE)
			break
		case SUPER_WIN:
			let N_STRIPES = 17
			let h = CANVAS_SIZE / N_STRIPES
			winStripesOffset += 2
			if (winStripesOffset >= 2 * h) winStripesOffset -= 2 * h
			for (let i = 0; i < N_STRIPES + 2; i++) {
				fill(i % 2 == 0 ? 250 : 100, 180)
				rect(CANVAS_SIZE / 2, i * h + h / 2 - winStripesOffset, CANVAS_SIZE, h)
			}
			image(winScreen, 0, 0)
			break
	}

	image(pointer, mouseX, mouseY)
}

function touchStarted() {
	userStartAudio()
	ball.onTouchStarted()
}

function touchEnded() {
	ball.onTouchEnded()
}
