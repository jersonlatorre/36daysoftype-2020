class Explosion {
	constructor(x, y) {
		this.x = x
		this.y = y

		this.particles = []
		this.numParticles = 100
		this.isDead = false

		for (let i = 0; i < this.numParticles; i++) {
			let particle = new Particle(this.x, this.y)
			this.particles.push(particle)
		}

		Game.isShaking = true
		setTimeout(() => {
			Game.isShaking = false
		}, Global.shakeDuration)

		boom.play()
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
	constructor(x, y) {
		this.position = new p5.Vector(x, y)
		this.velocity = p5.Vector.random2D().mult(random(0.5, 4))
		this.size = this.maxSize = 4
		this.isDead = false
	}

	draw() {
		this.size -= 0.1

		if (this.size < 0) {
			this.size = 0
			this.isDead = true
		}

		this.position.add(this.velocity)
		this.velocity.mult(0.93)
		fill(colors.black)
		noStroke()
		circle(this.position.x, this.position.y, this.size)
	}
}
