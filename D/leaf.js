class Leaf {
	constructor(position) {
		this.position = position
		this.radius = 4
	}

	draw() {
		noStroke()
		fill(colors.black)
		let d = dist(this.position.x, this.position.y, mouseX, mouseY)
		d = constrain(d, 0, CANVAS_SIZE / 12)
		let r = map(d, 0, CANVAS_SIZE / 12, CANVAS_SIZE / 60, CANVAS_SIZE / 250)
		this.radius = this.radius + 0.1 * (r - this.radius)
		circle(this.position.x, this.position.y, this.radius)
	}
}
