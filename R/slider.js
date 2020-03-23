class Slider {
	constructor() {
		this.size = 400 * FACTOR
		this.positionX = 340 * FACTOR
		this.positionY = 1015 * FACTOR
		this.value = 0

		this.isDragging = false
	}
	draw() {
		if (dist(mouseX, mouseY, this.positionX + this.size * this.value, this.positionY) < 15) {
			if (mouseIsPressed) {
				this.isDragging = true
			}
		}

		if (!mouseIsPressed) {
			this.isDragging = false
		}

		if (this.isDragging) {
			cursor(HAND)
			this.value = (mouseX - this.positionX) / this.size
			this.value = constrain(this.value, 0, 1)
		} else {
			cursor(ARROW)
		}

		if (dist(mouseX, mouseY, this.positionX + this.size * this.value, this.positionY) < 15 * FACTOR) {
			cursor(HAND)
		}

		strokeWeight(5 * FACTOR)
		stroke(colors.black)
		line(this.positionX, this.positionY, this.positionX + this.size, this.positionY)

		fill(colors.gray)
		circle(this.positionX + this.size * this.value, this.positionY, 30 * FACTOR)
	}
}
