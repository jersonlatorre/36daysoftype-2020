class Spring {
	constructor(x, y, mass, gravity) {
		this.x = x
		this.y = y
		this.vx = 0
		this.vy = 0
		this.mass = mass
		this.gravity = gravity
		this.radius = 20
		this.stiffness = 0.1
		this.damping = 0.75
	}

	update(targetX, targetY) {
		let forceX = (targetX - this.x) * this.stiffness
		let ax = forceX / this.mass
		this.vx = this.damping * (this.vx + ax)
		this.x += this.vx
		let forceY = (targetY - this.y) * this.stiffness
		forceY += this.gravity
		let ay = forceY / this.mass
		this.vy = this.damping * (this.vy + ay)
		this.y += this.vy
	}

	draw(nx, ny) {
		noStroke()
		// ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
		stroke(255)
		strokeWeight(30)
		line(this.x, this.y, nx, ny)
	}
}
