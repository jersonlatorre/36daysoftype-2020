class Wave {
	constructor(x, y) {
		this.position = new p5.Vector(x, y)
		this.radius = 5
		this.speed = 5
		this.isDead = false
		win.play()
	}

	draw() {
		noFill()
		let opacity = map(this.radius, 5, 50, 1, 0)
		stroke('rgba(255, 150, 0, ' + opacity + ')')
		strokeWeight(10)
		circle(this.position.x, this.position.y, this.radius)

		this.radius += this.speed
		this.speed *= 0.93
		if (this.radius > 50) {
			this.isDead = true
		}
	}
}
