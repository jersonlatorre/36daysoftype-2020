class Explosion {
	constructor(x, y) {
		this.isDead = false
		this.particles = []

		for (let i = 0; i < 30; i++) {
			this.particles.push(new Particle(x, y))
		}
	}

	draw() {
		if (this.isDead) return
		this.particles.forEach((particle, i) => {
			particle.draw()
			if (particle.isDead) {
				this.particles.splice(i, 1)
			}
		})

		if (this.particles.length == 0) {
			this.isDead = true
		}
	}
}

class Particle {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.isDead = false
		this.size = CANVAS_SIZE / 25
		this.speed = random(2, CANVAS_SIZE / 35)
		this.velocity = p5.Vector.random2D().mult(this.speed)
	}

	draw() {
		this.size -= 1
		this.x += this.velocity.x
		this.y += this.velocity.y
		this.velocity.mult(0.90)
		noStroke()
		fill('rgba(225,230,224,' + map(this.size, 0, 60, 0, 1) + ')')
		circle(this.x, this.y, this.size)

		if (this.size <= 0) {
			this.isDead = true
		}
	}
}
