class Y {
	constructor() {}

	draw() {
		let origin = createVector(540, 1000)
		let normal = createVector(0, -1)
		let level = 10
		this.drawBranch(origin, normal, level)
	}

	drawBranch(position, normal, level) {
		if (level == 0) return

		let size = 4 * (level * level) / 2
		let angle = map(level, 0, 10, 0, PI / 5)
		let end1 = position.copy().add(normal.copy().rotate(angle).mult(size))
		let end2 = position.copy().add(normal.copy().rotate(-angle).mult(size))
		line(position.x, position.y, end1.x, end1.y)
		line(position.x, position.y, end2.x, end2.y)
		this.drawBranch(end1, end1.copy().sub(position).normalize(), level - 1)
		this.drawBranch(end2, end2.copy().sub(position).normalize(), level - 1)
	}
}
