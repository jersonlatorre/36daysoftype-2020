class Dot {
	static currentMovingId = -1
	static numDots = 0

	constructor(x, y, size, color, isStatic) {
		this.position = createVector(x, y)
		this.size = size
		this.isStatic = isStatic
		this.color = color

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
				if (!this.isStatic) {
					this.isMouseOver = false
					let distance = dist(mouseX, mouseY, this.position.x, this.position.y)
					if (Dot.currentMovingId == -1) {
						if (distance < this.size / 2) {
							this.isMouseOver = true
							if (mouseIsPressed) {
								this.state = this.STATE_MOVING
								Dot.currentMovingId = this.id
							}
						} else {
							this.isMouseOver = false
						}
					}
				}
				break
			}

			case this.STATE_MOVING: {
				if (this.id == Dot.currentMovingId) {
					this.position.x = mouseX
					this.position.y = mouseY
					if (!mouseIsPressed) {
						this.state = this.STATE_NONE
						Dot.currentMovingId = -1
					}
				}
				break
			}
		}
	}

	draw() {
		noStroke()
		fill(this.color)
		circle(this.position.x, this.position.y, this.size)
		if (this.isMouseOver) {
			fill(colors.blue)
			circle(this.position.x, this.position.y, this.size)
		}
	}
}
