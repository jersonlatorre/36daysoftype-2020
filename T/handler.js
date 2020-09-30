class HandlerState {
	static NONE = 0
	static DRAGGING = 1
	static RETURNING = 2
}

class Handler {
	static currentMovingId = -1
	static numDots = 0

	constructor(x, y, size) {
		this.position = createVector(x, y)
		this.size = size
		this.MAX_SIZE = size
		this.target = this.position.copy()
		this.EASING_FACTOR = 0.2

		this.isMouseOver = false
		this.state = HandlerState.NONE
		this.id = Handler.numDots
		Handler.numDots++
	}

	update() {
		switch (this.state) {
			case HandlerState.NONE: {
				this.position = this.target.copy()
				this.isMouseOver = false

				let distanceToMouse = dist(mouseX, mouseY, this.position.x, this.position.y)
				let distanceToTarget = dist(this.position.x, this.position.y, this.target.x, this.target.y)
				if (Handler.currentMovingId == -1) {
					if (distanceToTarget < 1) {
						this.state = HandlerState.NONE
					}

					if (distanceToMouse < this.size / 2) {
						this.isMouseOver = true
						if (mouseIsPressed) {
							Handler.currentMovingId = this.id
							this.state = HandlerState.DRAGGING
						}
					} else {
						this.isMouseOver = false
					}
				}
				break
			}

			case HandlerState.RETURNING: {
				this.position.x += this.EASING_FACTOR * (this.target.x - this.position.x)
				this.position.y += this.EASING_FACTOR * (this.target.y - this.position.y)
				this.isMouseOver = false

				let distanceToMouse = dist(mouseX, mouseY, this.position.x, this.position.y)
				let distanceToTarget = dist(this.position.x, this.position.y, this.target.x, this.target.y)
				if (Handler.currentMovingId == -1) {
					if (distanceToTarget < 1) {
						this.state = HandlerState.NONE
					}

					if (distanceToMouse < this.size / 2) {
						this.isMouseOver = true
						if (mouseIsPressed) {
							Handler.currentMovingId = this.id
							this.state = HandlerState.DRAGGING
						}
					} else {
						this.isMouseOver = false
					}
				}
				break
			}

			case HandlerState.DRAGGING: {
				if (this.id == Handler.currentMovingId) {
					this.position.x += this.EASING_FACTOR * (mouseX - this.position.x)
					this.position.y += this.EASING_FACTOR * (mouseY - this.position.y)
					if (!mouseIsPressed) {
						this.target = createVector(mouseX, mouseY)
						this.state = HandlerState.RETURNING
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

		if (this.state == HandlerState.DRAGGING) {
			stroke(colors.red)
			strokeWeight(8 * FACTOR)
			line(mouseX, mouseY, this.position.x, this.position.y)
		}
	}
}
