class Zzz {
	constructor(x, y) {
		this.position = new p5.Vector(x, y)
		this.velocity = p5.Vector.random2D()
		this.isDead = false
		this.opacity = 1
	}

	draw() {
		fill('rgba(0, 0, 0, ' + this.opacity + ')')
		noStroke()
		textFont('Arial')
		textSize(map(this.opacity, 0, 1, 10, 14))
		textStyle(BOLD)
		textAlign(CENTER, CENTER)
		text('Z', this.position.x, this.position.y)

		this.position.add(this.velocity)
		this.opacity -= 0.025
		if (this.opacity < 0) {
			this.isDead = true
		}
	}
}
