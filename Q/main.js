let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let pointer

let BIG_CIRCLE_RADIUS = 500 * FACTOR
let SMALL_CIRCLE_RADIUS = 120 * FACTOR
let POSITION_CENTER
let POSITION_CORNER

let bigCircle
let p1, p2

function preload() {
	pointer = loadImage('assets/hand.svg')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(CANVAS_SIZE / 25, 0)

	POSITION_CENTER = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2)
	POSITION_CORNER = createVector(CANVAS_SIZE / 2 + 250 * FACTOR, CANVAS_SIZE / 2 + 250 * FACTOR)
	p1 = new SmallCircle(POSITION_CENTER.x, POSITION_CENTER.y, SMALL_CIRCLE_RADIUS, colors.black)
	p1.state = SmallCircleState.INSIDE
	p2 = new SmallCircle(POSITION_CORNER.x, POSITION_CORNER.y, SMALL_CIRCLE_RADIUS, colors.white)
	p2.state = SmallCircleState.OUTSIDE
	bigCircle = new BigCircle()
	noCursor()
}

function draw() {
	bigCircle.draw()
	p1.update()
	p2.update()

	if (p1.state == SmallCircleState.DRAGGING_FROM_INSIDE || p1.state == SmallCircleState.DRAGGING_FROM_OUTSIDE) {
		if (dist(p1.position.x, p1.position.y, POSITION_CENTER.x, POSITION_CENTER.y) < BIG_CIRCLE_RADIUS / 2) {
			p2.state = SmallCircleState.MOVING_TO_OUTSIDE
			bigCircle.toWhite()
		} else {
			p2.state = SmallCircleState.MOVING_TO_INSIDE
			bigCircle.toBlack()
		}
	}

	if (p2.state == SmallCircleState.DRAGGING_FROM_INSIDE || p2.state == SmallCircleState.DRAGGING_FROM_OUTSIDE) {
		if (dist(p2.position.x, p2.position.y, POSITION_CENTER.x, POSITION_CENTER.y) < BIG_CIRCLE_RADIUS / 2) {
			p1.state = SmallCircleState.MOVING_TO_OUTSIDE
			bigCircle.toBlack()
		} else {
			p1.state = SmallCircleState.MOVING_TO_INSIDE
			bigCircle.toWhite()
		}
	}

	p1.draw()
	p2.draw()
	image(pointer, mouseX - 13 * FACTOR, mouseY)
}
