class Spring {
	constructor(x, y, mass, gravity) {
		this.position = createVector(x, y)
		this.velocity = createVector(0, 0)
		this.angle = 0
		this.mass = mass
		this.gravity = gravity.copy()
		this.stiffness = 0.08
		this.damping = 0.85
	}

	update(x, y) {
		this.target = createVector(x, y)
		let force = this.target.copy().sub(this.position).mult(this.stiffness).add(this.gravity)
		let a = force.copy().mult(1 / this.mass)
		this.velocity = this.velocity.copy().add(a).mult(this.damping)
		this.position.add(this.velocity)
		this.angle = atan2(this.position.y - 540, this.position.x - 540)
	}
}
