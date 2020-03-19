class Explosion {
	constructor(x, y, color) {
		this.x = x
		this.y = y
		this.color = color

		this.particles = []
		this.numParticles = 25
		this.isDead = false

		for (let i = 0; i < this.numParticles; i++) {
			let particle = new Particle(this.x, this.y, this.color)
			this.particles.push(particle)
		}

		Game.isShaking = true
		setTimeout(() => {
			Game.isShaking = false
		}, Global.shakeDuration)
	}

	draw() {
		this.particles.forEach((particle, i) => {
			particle.draw()
			if (particle.isDead) {
				this.particles.splice(i, 1)
			}

			if (this.particles.length == 0) {
				this.isDead = true
			}
		})
	}
}

class Particle {
	constructor(x, y, color) {
		this.position = new p5.Vector(x, y)
		this.velocity = p5.Vector.random2D().mult(random(2, 8))
		this.size = this.maxSize = 18
		this.color = color
		this.isDead = false
	}

	draw() {
		this.size -= 0.5

		if (this.size < 0) {
			this.size = 0
			this.isDead = true
		}

		this.position.add(this.velocity)
		this.velocity.mult(0.9)
		fill(this.color)
		noStroke()
		circle(this.position.x, this.position.y, this.size)
	}
}
