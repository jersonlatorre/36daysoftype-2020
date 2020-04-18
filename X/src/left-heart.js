class LeftHeart {
	static isDragging = false

	constructor(x, y) {
		this.position = createVector(x, y)
		this.initialPosition = this.position.copy()
		this.target = this.position.copy()
		this.state = HeartState.NONE
		this.offset = createVector(0, 0)
		this.spring = new Spring(this.position.x, this.position.y, 1, createVector(0, 0))
	}

	draw() {
		switch (this.state) {
			case HeartState.NONE: {
				LeftHeart.isDragging = false
				if (mouseIsPressed && dist(mouseX + 100, mouseY, this.position.x, this.position.y) < 150 && !RightHeart.isDragging) {
					// this.offset = createVector(mouseX - this.position.x, mouseY - this.position.y)
					this.state = HeartState.DRAGGING
				}

				push()
				translate(this.position.x, this.position.y)
				rotate(PI / 2)
				rotate(PI)
				image(heart, -heart.width / 2, -heart.height / 2)
				pop()
				break
			}

			case HeartState.DRAGGING: {
				LeftHeart.isDragging = true
				this.position.x = mouseX
				this.position.y = mouseY
				let angle = atan2(mouseY - this.initialPosition.y - this.offset.x, mouseX - this.initialPosition.x - this.offset.y)

				if (!mouseIsPressed) {
					this.state = HeartState.RETURNING
					this.spring.position = this.position.copy()
					this.target = this.position.copy()
				}

				push()
				translate(this.position.x - this.offset.x, this.position.y - this.offset.y)
				rotate(angle)
				rotate(PI / 2)
				image(heart, -heart.width / 2, -heart.height / 2)
				pop()

				break
			}

			case HeartState.RETURNING: {
				RightHeart.isDragging = false
				this.target.x += 0.3 * (this.initialPosition.x - this.target.x)
				this.target.y += 0.3 * (this.initialPosition.y - this.target.y)

				this.spring.update(this.target.x, this.target.y)
				this.position = this.spring.position.copy()

				if (dist(this.position.x, this.position.y, this.initialPosition.x, this.initialPosition.y) < 1) {
					this.state = HeartState.NONE
				}
				
				if (mouseIsPressed && dist(mouseX + 100, mouseY, this.position.x, this.position.y) < 150 && !RightHeart.isDragging) {
					// this.offset = createVector(mouseX - this.position.x, mouseY - this.position.y)
					this.state = HeartState.DRAGGING
				}

				push()
				translate(this.position.x, this.position.y)
				rotate(PI / 2)
				rotate(this.spring.angle)
				image(heart, -heart.width / 2, -heart.height / 2)
				pop()

				break
			}
		}
	}
}
