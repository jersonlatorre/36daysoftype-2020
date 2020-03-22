class SmallCircleState {
	static MOVING_TO_INSIDE = 0
	static MOVING_TO_OUTSIDE = 1
	static DRAGGING_FROM_INSIDE = 2
	static DRAGGING_FROM_OUTSIDE = 3
	static INSIDE = 4
	static OUTSIDE = 5
}

class SmallCircle {
	constructor(x, y, size, c) {
		this.position = createVector(x, y)
		this.size = size
		this.MAX_SIZE = size
		this.color = color(c)
		this.targetPosition = this.position.copy()
		this.EASING_FACTOR = 0.15
		this.offset = random(10)
	}

	update() {
		let distancePositionToMouse = dist(mouseX, mouseY, this.position.x, this.position.y)
		let distancePositionToBigCircle = dist(this.position.x, this.position.y, width / 2, width / 2)
		let distancePositionToCorner = dist(this.position.x, this.position.y, POSITION_CORNER.x, POSITION_CORNER.y)

		switch (this.state) {
			case SmallCircleState.INSIDE: {
				this.position = POSITION_CENTER.copy()
				if (mouseIsPressed) {
					if (distancePositionToMouse < this.size / 2) {
						this.state = SmallCircleState.DRAGGING_FROM_INSIDE
					}
				}
				break
			}

			case SmallCircleState.OUTSIDE: {
				this.position = POSITION_CORNER.copy()
				if (mouseIsPressed) {
					if (distancePositionToMouse < this.size / 2) {
						this.state = SmallCircleState.DRAGGING_FROM_OUTSIDE
					}
				}
				break
			}

			case SmallCircleState.DRAGGING_FROM_INSIDE: {
				this.position.x += this.EASING_FACTOR * (mouseX - this.position.x)
				this.position.y += this.EASING_FACTOR * (mouseY - this.position.y)

				if (!mouseIsPressed) {
					if (distancePositionToBigCircle < BIG_CIRCLE_RADIUS / 2) {
						this.state = SmallCircleState.MOVING_TO_INSIDE
					} else {
						this.state = SmallCircleState.MOVING_TO_OUTSIDE
					}
				}
				break
			}

			case SmallCircleState.DRAGGING_FROM_OUTSIDE: {
				this.position.x += this.EASING_FACTOR * (mouseX - this.position.x)
				this.position.y += this.EASING_FACTOR * (mouseY - this.position.y)
				if (!mouseIsPressed) {
					if (distancePositionToBigCircle < BIG_CIRCLE_RADIUS / 2) {
						this.state = SmallCircleState.MOVING_TO_INSIDE
					} else {
						this.state = SmallCircleState.MOVING_TO_OUTSIDE
					}
				}
				break
			}

			case SmallCircleState.MOVING_TO_INSIDE: {
				this.targetPosition = POSITION_CENTER.copy()
				this.position.x += this.EASING_FACTOR * (this.targetPosition.x - this.position.x)
				this.position.y += this.EASING_FACTOR * (this.targetPosition.y - this.position.y)

				if (distancePositionToMouse < this.size / 2) {
					if (mouseIsPressed) {
						this.state = SmallCircleState.DRAGGING_FROM_INSIDE
					}
				}

				if (distancePositionToBigCircle < 1) {
					this.state = SmallCircleState.INSIDE
				}

				break
			}

			case SmallCircleState.MOVING_TO_OUTSIDE: {
				this.targetPosition = POSITION_CORNER.copy()
				this.position.x += this.EASING_FACTOR * (this.targetPosition.x - this.position.x)
				this.position.y += this.EASING_FACTOR * (this.targetPosition.y - this.position.y)

				if (distancePositionToMouse < this.size / 2) {
					if (mouseIsPressed) {
						this.state = SmallCircleState.DRAGGING_FROM_OUTSIDE
					}
				}

				if (distancePositionToCorner < 1) {
					this.state = SmallCircleState.OUTSIDE
				}

				break
			}
		}
	}

	draw() {
		this.size = this.MAX_SIZE + 5 * FACTOR * sin(millis() / 250 + this.offset)
		noStroke()
		fill(this.color)
		circle(this.position.x, this.position.y, this.size)

		switch (this.state) {
			case SmallCircleState.DRAGGING_FROM_INSIDE:
			case SmallCircleState.DRAGGING_FROM_OUTSIDE: {
				stroke(colors.red)
				strokeWeight(10 * FACTOR)
				line(mouseX, mouseY, this.position.x, this.position.y)
				break
			}
		}
	}
}
