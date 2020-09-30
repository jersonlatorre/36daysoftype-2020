class EffectC {
	constructor() {
		this.isDead = false
		this.timer = 0.44
	}

	draw() {
		if (this.isDead) return

		push()
		translate(width / 2, height / 2)
		fill('rgba(255, 255, 255,' + this.timer + ')')
		rect(0, 0, width, height)
		pop()

		this.timer -= 0.05
		if (this.timer <= 0) this.isDead = true
	}
}

class EffectCSharp {
	constructor() {
		this.isDead = false
		this.timer = 0
	}

	draw() {
		if (this.isDead) return

		let position = CANVAS_SIZE / 2 * sin(this.timer * PI / 2)
		fill('rgba(225,230,224,' + 0.3 * map(this.timer, 0, 1, 0.6, 0.1) + ')')
		rect(CANVAS_SIZE / 2 + position, CANVAS_SIZE / 2, CANVAS_SIZE / 14, CANVAS_SIZE)
		rect(CANVAS_SIZE / 2 - position, CANVAS_SIZE / 2, CANVAS_SIZE / 14, CANVAS_SIZE)
		this.timer += 0.02
		if (this.timer >= 1) this.isDead = true
	}
}

class EffectD {
	constructor() {
		this.isDead = false
		this.timer = 1
	}

	draw() {
		if (this.isDead) return

		rectMode(CENTER)
		let N = 3
		let d = CANVAS_SIZE / N
		let r = CANVAS_SIZE / 7 * cos(this.timer * PI / 2)
		stroke('rgba(225,230,224,' + this.timer + ')')
		strokeWeight(1)
		noFill()
		noStroke()
		fill('rgba(225,230,224,' + this.timer / 2.5 + ')')
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (i == 0 || j == 0 || i == N - 1 || j == N - 1) circle(i * d + d / 2, j * d + d / 2, r)
			}
		}

		this.timer -= 0.03
		if (this.timer <= 0) this.isDead = true
	}
}

class EffectDSharp {
	constructor() {
		this.isDead = false
		this.timer = 0
	}

	draw() {
		if (this.isDead) return

		let position = CANVAS_SIZE / 2 * sin(this.timer * PI / 2)
		fill('rgba(225,230,224,' + 0.3 * map(this.timer, 0, 1, 0.6, 0.1) + ')')
		rect(CANVAS_SIZE / 2, CANVAS_SIZE / 2 + position, CANVAS_SIZE, CANVAS_SIZE / 14)
		rect(CANVAS_SIZE / 2, CANVAS_SIZE / 2 - position, CANVAS_SIZE, CANVAS_SIZE / 14)
		this.timer += 0.02
		if (this.timer >= 1) this.isDead = true
	}
}

class EffectE {
	constructor() {
		this.isDead = false
		this.particles = []

		let N = 3
		let x = random(0, CANVAS_SIZE / 2)
		let y = random(0, CANVAS_SIZE / 2)
		for (let i = 0; i < N; i++) {
			this.particles.push(new Particle(x, y))
		}

		x = random(CANVAS_SIZE / 2, CANVAS_SIZE)
		y = random(0, CANVAS_SIZE / 2)
		for (let i = 0; i < N; i++) {
			this.particles.push(new Particle(x, y))
		}

		x = random(CANVAS_SIZE / 2, CANVAS_SIZE)
		y = random(CANVAS_SIZE / 2, CANVAS_SIZE)
		for (let i = 0; i < N; i++) {
			this.particles.push(new Particle(x, y))
		}

		x = random(0, CANVAS_SIZE / 2)
		y = random(CANVAS_SIZE / 2, CANVAS_SIZE)
		for (let i = 0; i < N; i++) {
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
		this.size = CANVAS_SIZE / 14
		this.speed = random(2, CANVAS_SIZE / 35)
		this.velocity = p5.Vector.random2D().mult(this.speed)
	}

	draw() {
		this.size -= 1
		this.x += this.velocity.x
		this.y += this.velocity.y
		this.velocity.mult(0.92)
		noStroke()
		fill('rgba(225,230,224,' + map(this.size, 0, 60, 0, 0.2) + ')')
		circle(this.x, this.y, this.size)

		if (this.size <= 0) {
			this.isDead = true
		}
	}
}
