let CANVAS_SIZE = 960
let LOOP_DURATION = 2
let pointer

let worms = []
let letter
let click1
let click2
let slow
let fast
let distance = -50
let camera

function preload() {
	pointer = loadImage('assets/pointer.svg')
	letter = loadImage('assets/a.png')
	click1 = loadSound('assets/click1.wav')
	click2 = loadSound('assets/click2.wav')
	slow = loadSound('assets/slow.mp3')
	fast = loadSound('assets/fast.mp3')
}

function setup() {
	
	userStartAudio()
	createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL)
	noCursor()

	let xx
	let yy
	let green

	letter.resize(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(50, 0)

	for (let i = 0; i < 500; i++) {
		xx = random(CANVAS_SIZE)
		yy = random(CANVAS_SIZE)
		green = letter.get(int(xx), int(yy))[1]

		while (green == 0) {
			xx = random(CANVAS_SIZE)
			yy = random(CANVAS_SIZE)
			green = letter.get(int(xx), int(yy))[1]
		}

		let dot = new Dot(xx, yy)
		dot.c = fg_colors[random(0, fg_colors.length) | 0]

		worms.push(dot)
	}
}

function draw() {
	background(colors.red)
	

	if (mouseX > width / 2 && pmouseX <= width / 2) {
		fast.loop()
		slow.stop()
		click1.play()
		distance = -50
	}

	if (mouseX < width / 2 && pmouseX >= width / 2) {
		slow.loop()
		fast.stop()
		click2.play()
		distance = -50
	}

	let f = frameCount / (mouseX > width / 2 ? 3.0 : 80.0)
	if (mouseX > width / 2) {
		background(colors.red)
	} else {
		background(colors.blue)
	}

	push()
	letter.loadPixels()

	rotateY(-(mouseX > width / 2 ? 0.06 : 0.12) * sin(2 * PI * f))
	rotateX(-(mouseX > width / 2 ? 0.06 : 0.12) * cos(2 * PI * f))
	translate(-width / 2, -height / 2, distance)

	worms.forEach((worm) => {
		worm.draw()
	})

	pop()
	letter.updatePixels()

	image(pointer, mouseX - CANVAS_SIZE / 2, mouseY - CANVAS_SIZE / 2)
}
