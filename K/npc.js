class Npc {
	constructor(path) {
		this.path = path
		this.speed = Global.npcSpeed
		this.currentPointIndex = 0
		this.tAppear = 0

		this.position = new p5.Vector(0, 0)
		this.velocity = new p5.Vector(0, 0)
		this.maxForce = 1.5
		this.maxSteer = 0.08

		this.size = 0
		this.minSize = 5
		this.maxSize = 18
		this.hp = this.maxHp = 100
		this.isDead = false

		this.State = { APPEARING: 0, MOVING: 1, DEAD: 2 }
		this.state = this.State.APPEARING
	}

	draw() {
		switch (this.state) {
			case this.State.APPEARING: {
				let startPoint = Game.waypoints[this.path[0]]
				push()
				translate(startPoint.x, startPoint.y)
				stroke(colors.black)
				strokeWeight(1.5)
				fill(colors.white)
				circle(0, 0, this.size)
				fill(colors.black)
				circle(0, 0, this.size / 3)
				pop()

				this.size = this.maxSize * this.easing(this.tAppear)
				this.tAppear += 0.03
				if (this.tAppear >= 1) {
					this.size = this.maxSize
					this.state = this.State.MOVING
					this.tAppear = 0
					this.position = new p5.Vector(startPoint.x, startPoint.y)
				}

				break
			}

			case this.State.MOVING: {
				let currentPoint = Game.waypoints[this.path[this.currentPointIndex]]
				let steer = SteeringBehaviours.seek(this, currentPoint)
				this.velocity.add(steer)
				this.position.add(this.velocity)

				if (p5.Vector.dist(currentPoint, this.position) < 10) {
					this.currentPointIndex++
					if (this.currentPointIndex > this.path.length - 1) {
						this.state = this.State.DEAD
						this.win()
					}
				}

				push()
				translate(this.position.x, this.position.y)
				stroke(colors.black)
				strokeWeight(1.5)
				fill(colors.white)
				circle(0, 0, this.size)
				fill(colors.black)
				circle(0, 0, this.size / 3)

				rectMode(CORNER)
				noStroke()
				fill('rgba(0, 0, 0, 0.5)')
				rect(-7, -16, 14, 4)
				fill('yellow')
				rect(-6, -15, 12 * this.hp / this.maxHp, 2)
				pop()

				break
			}
		}
	}

	easing(t) {
		return 4 * t - 3 * t * t
	}

	next() {
		this.t = 0
		this.currentPointIndex++
		if (this.currentPointIndex > this.path.length - 2) {
			this.win()
		}
	}

	hit() {
		this.hp -= 23

		if (this.hp <= 0) {
			this.die()
		}

		this.size = map(this.hp, 0, this.maxHp, this.minSize, this.maxSize)

		fill('yellow')
		noStroke()
		circle(this.position.x, this.position.y, this.size + 6)
	}

	die() {
		this.isDead = true
		let explosion = new Explosion(this.position.x, this.position.y)

		Game.effects.push(explosion)
	}

	win() {
		let endPoint = Game.waypoints[this.path[this.path.length - 1]]
		this.isDead = true
		let wave = new Wave(endPoint.x, endPoint.y)
		Game.effects.push(wave)
	}
}
