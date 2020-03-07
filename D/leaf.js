class Leaf {
	constructor(position) {
		this.position = position
		this.radius = 4
	}

	draw() {
		noStroke()
		fill(colors.black)
		let d = dist(this.position.x, this.position.y, mouseX, mouseY)
		d = constrain(d, 0, 80)
		let r = map(d, 0, 80, 20, 4)
		this.radius = this.radius + 0.04 * (r - this.radius)
		circle(this.position.x, this.position.y, this.radius)
	}
}
