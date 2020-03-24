class HandlerState {
	static NONE = 0
	static MOVING = 1
}

class Handler {
	static currentMovingId = -1
	static numDots = 0

	constructor(x, y, size) {
		this.position = createVector(x, y)
		this.size = size
		this.MAX_SIZE = size
		this.lastMousePosition = this.position.copy()
		this.EASING_FACTOR = 0.1

		this.isMouseOver = false
		this.state = HandlerState.NONE
		this.id = Handler.numDots
		Handler.numDots++
	}

	update() {
		switch (this.state) {
			case HandlerState.NONE: {
				this.position.x += this.EASING_FACTOR * (this.lastMousePosition.x - this.position.x)
				this.position.y += this.EASING_FACTOR * (this.lastMousePosition.y - this.position.y)
				this.isMouseOver = false
				let distance = dist(mouseX, mouseY, this.position.x, this.position.y)
				if (Handler.currentMovingId == -1) {
					if (distance < this.size / 2) {
						this.isMouseOver = true
						if (mouseIsPressed) {
							Handler.currentMovingId = this.id
							this.state = HandlerState.MOVING
						}
					} else {
						this.isMouseOver = false
					}
				}
				break
			}

			case HandlerState.MOVING: {
				if (this.id == Handler.currentMovingId) {
					this.position.x += this.EASING_FACTOR * (mouseX - this.position.x)
					this.position.y += this.EASING_FACTOR * (mouseY - this.position.y)
					if (!mouseIsPressed) {
						this.lastMousePosition = createVector(mouseX, mouseY)
						this.state = HandlerState.NONE
						Handler.currentMovingId = -1
					}
				}
				break
			}
		}
	}

	draw() {
		this.size = this.MAX_SIZE + 5 * FACTOR * sin(millis() / 250)
		noStroke()
		fill(colors.gray)
		circle(this.position.x, this.position.y, this.size)
		if (this.isMouseOver) {
			fill(colors.blue)
			circle(this.position.x, this.position.y, this.size)
		}

		if (this.state == HandlerState.MOVING) {
			stroke(colors.red)
			strokeWeight(8 * FACTOR)
			line(mouseX, mouseY, this.position.x, this.position.y)
		}
	}
}
