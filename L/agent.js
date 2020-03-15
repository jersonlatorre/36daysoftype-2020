class Agent {
	constructor(parent) {
		this.MAX_SPEED = random(2 * FACTOR, 3 * FACTOR)
		this.MAX_STEER = 0.3 * FACTOR
		this.SEPARATE_DISTANCE = 30 * FACTOR
		this.MAX_HISTORY = 8
		this.history = []

		this.p1 = parent.p1
		this.p2 = parent.p2
		this.p3 = parent.p3
		this.position = createVector(this.p1.x, this.p1.y)
		this.velocity = p5.Vector.random2D().mult(this.MAX_SPEED)
		this.velocity.y = abs(this.velocity.y)
		this.target = this.p2
		this.agents = parent.agents
		this.isDead = false

		this.STATE_MOVING = 0
		this.STATE_DYING = 1
		this.state = this.STATE_MOVING
	}

	draw() {
		switch (this.state) {
			case this.STATE_MOVING: {
				// seek force
				let desiredSeek = this.target.copy().sub(this.position).normalize().mult(this.MAX_SPEED)

				// separate force
				let desiredSeparate = createVector(0, 0)
				let nNeighbors = 0
				this.agents.forEach((agent) => {
					let distance = this.squaredDistance(this.position.x, this.position.y, agent.position.x, agent.position.y)
					if (distance > 0 && distance < agent.SEPARATE_DISTANCE * agent.SEPARATE_DISTANCE) {
						let desiredAux = this.position.copy().sub(agent.position).normalize().mult(this.MAX_SPEED)
						desiredSeparate.add(desiredAux)
						nNeighbors++
					}
				})

				if (nNeighbors > 0) desiredSeparate.mult(1 / nNeighbors)

				// total force applied
				let desired = p5.Vector.add(desiredSeek, desiredSeparate.mult(10))
				let steer = desired.copy().sub(this.velocity).limit(this.MAX_STEER)
				this.velocity.add(steer)
				this.position.add(this.velocity)

				// tail size truncated
				this.history.push(this.position.copy())
				if (this.history.length == this.MAX_HISTORY) {
					this.history.splice(0, 1)
				}

				// change target or die
				if (this.squaredDistance(this.position.x, this.position.y, this.p2.x, this.p2.y) < (3600 * FACTOR * FACTOR)) {
					this.target = this.p3
				}

				if (this.squaredDistance(this.position.x, this.position.y, this.p3.x, this.p3.y) < 900 * FACTOR * FACTOR) {
					this.state = this.STATE_DYING
				}

				// draw
				stroke(colors.white)
				strokeJoin(ROUND)
				strokeWeight(14 * FACTOR)
				noFill()
				beginShape()
				this.history.forEach((p) => {
					vertex(p.x, p.y)
				})
				endShape()

				noStroke()
				fill(colors.black)
				circle(this.position.x, this.position.y, 8 * FACTOR)
				break
			}

			case this.STATE_DYING: {
				this.position.add(this.p3.copy().sub(this.position).mult(0.1))

				// tail size truncated
				this.history.push(this.position.copy())
				if (this.history.length == this.MAX_HISTORY) {
					this.history.splice(0, 1)
				}

				let distance = this.squaredDistance(this.position.x, this.position.y, this.p3.x, this.p3.y)
				if (distance < 9 * FACTOR) {
					this.isDead = true
				}

				// draw
				stroke(255)
				strokeJoin(ROUND)
				strokeWeight(14 * FACTOR)
				noFill()
				beginShape()
				this.history.forEach((p) => {
					vertex(p.x, p.y)
				})
				endShape()

				noStroke()
				fill(30)
				circle(this.position.x, this.position.y, 8 * FACTOR)

				break
			}
		}
	}

	squaredDistance(x1, y1, x2, y2) {
		return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
	}
}
