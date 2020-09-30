class Branch {
	constructor(child, position, direction) {
		this.child = child
		this.position = position
		this.direction = direction
		this.counter = 0
	}

	draw() {
		if (this.child) {
			stroke(colors.white)
			strokeWeight(5)
			line(this.position.x, this.position.y, this.child.position.x, this.child.position.y)
		}
	}
}
