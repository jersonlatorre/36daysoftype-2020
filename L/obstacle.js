class Obstacle {
	constructor(x, y) {
		this.position = createVector(x, y)
		this.SEPARATE_DISTANCE = 100 * FACTOR
	}

	draw() {
		fill(colors.red)
		stroke(colors.gray)
		strokeWeight(6 * FACTOR)
		circle(this.position.x, this.position.y, this.SEPARATE_DISTANCE)
		this.position.x = mouseX
		this.position.y = mouseY
	}
}