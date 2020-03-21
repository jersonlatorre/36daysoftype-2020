class Dot {
	static currentMovingId = -1
	static numDots = 0

	constructor(x, y, size) {
		this.position = createVector(x, y)
		this.size = size
		this.MAX_SIZE = size
		this.lastMousePosition = this.position.copy()
		this.EASING_FACTOR = 0.12

		this.isMouseOver = false
		this.STATE_NONE = 0
		this.STATE_MOVING = 1
		this.state = this.STATE_NONE
		this.id = Dot.numDots
		Dot.numDots++
	}

	update() {
		switch (this.state) {
			case this.STATE_NONE: {
				this.position.x += this.EASING_FACTOR * (this.lastMousePosition.x - this.position.x)
				this.position.y += this.EASING_FACTOR * (this.lastMousePosition.y - this.position.y)
				this.isMouseOver = false
				let distance = dist(mouseX, mouseY, this.position.x, this.position.y)
				if (Dot.currentMovingId == -1) {
					if (distance < this.size / 2) {
						this.isMouseOver = true
						if (mouseIsPressed) {
							Dot.currentMovingId = this.id
							this.state = this.STATE_MOVING
						}
					} else {
						this.isMouseOver = false
					}
				}
				break
			}

			case this.STATE_MOVING: {
				if (this.id == Dot.currentMovingId) {
					this.position.x += this.EASING_FACTOR * (mouseX - this.position.x)
					this.position.y += this.EASING_FACTOR * (mouseY - this.position.y)
					if (!mouseIsPressed) {
						this.lastMousePosition = createVector(mouseX, mouseY)
						this.state = this.STATE_NONE
						Dot.currentMovingId = -1
					}
				}
				break
			}
		}
	}

	draw() {
		this.size = this.MAX_SIZE + 10 * sin(millis() / 250)
		noStroke()
		fill(colors.gray)
		circle(this.position.x, this.position.y, this.size)
		if (this.isMouseOver) {
			fill(colors.red)
			circle(this.position.x, this.position.y, this.size)
		}

		if (this.state == this.STATE_MOVING) {
			stroke(colors.gray)
			strokeWeight(10)
			line(mouseX, mouseY, this.position.x, this.position.y)
		}
	}
}
