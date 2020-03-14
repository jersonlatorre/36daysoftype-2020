class Bullet {
	constructor(x, y, target) {
		this.target = target
		this.position = new p5.Vector(x, y)
		this.velocity = p5.Vector.sub(target.position, this.position).normalize().mult(5)
		this.isDead = false

		this.maxForce = 2
		this.maxSteer = 0.3
		shoot.play()
	}

	draw() {
		let steer = SteeringBehaviours.seek(this, this.target.position)
		this.velocity.add(steer)
		this.position.add(this.velocity)

		if (this.target.isDead) {
			this.isDead = true
		} else {
			if (this.target.position.dist(this.position) < 5) {
				this.isDead = true
				this.target.hit()
			}
		}

		fill(colors.black)
		rectMode(CENTER)

		push()
		translate(this.position.x, this.position.y)
		let angle = atan2(this.velocity.y, this.velocity.x)
		rotate(angle)
		if (this.velocity.x < 0) rotate(PI)
		noStroke()
		rect(0, 0, 6, 4)
		pop()
	}
}
