class Tower {
	constructor(x, y) {
		this.basePosition = new p5.Vector(x, y)
		this.position = new p5.Vector(x, y)
		this.velocity = new p5.Vector(0, 0)

		this.attackRadius = 220
		this.actionRadius = 50
		this.tAttack = 0
		this.bullets = []

		this.maxForce = 1
		this.maxSteer = 0.9

		this.zzzs = []
		this.timerZzz = 0

		this.State = { SLEEPING: 0, ATTACKING: 1, RETURNING: 2 }
		this.state = this.State.SLEEPING
	}

	draw() {
		switch (this.state) {
			case this.State.SLEEPING: {
				if (this.timerZzz > 0.3) {
					this.timerZzz = 0
					this.spawnZzz()
				}

				this.timerZzz += 0.01

				noStroke()
				fill(colors.red)
				circle(this.position.x, this.position.y, 20)
				fill('rgba(0, 0, 0, 0.2)')
				circle(this.position.x, this.position.y, 10)

				if (this.getNearestNpc() != null) {
					this.state = this.State.ATTACKING
				}

				break
			}

			case this.State.ATTACKING: {
				let nearestNpc = this.getNearestNpc()
				let steer = new p5.Vector(0, 0)

				if (nearestNpc != null) {
					steer.add(SteeringBehaviours.arrive(this, this.basePosition, this.actionRadius))
					steer.add(SteeringBehaviours.seek(this, nearestNpc.position))

					if (this.tAttack % 20 == 0) {
						let bullet = new Bullet(this.position.x, this.position.y, nearestNpc)
						this.bullets.push(bullet)
					}

					this.tAttack += 1
				} else {
					this.state = this.State.RETURNING
				}

				this.velocity.add(steer)
				this.position.add(this.velocity)

				noStroke()
				fill(colors.red)
				circle(this.position.x, this.position.y, 20)
				fill('rgba(0, 0, 0, 0.2)')
				circle(this.position.x, this.position.y, 10)

				break
			}

			case this.State.RETURNING: {
				let steer = SteeringBehaviours.arrive(this, this.basePosition, this.actionRadius)
				this.velocity.add(steer)
				this.position.add(this.velocity)

				if (this.velocity.mag() < 0.1) {
					this.state = this.State.SLEEPING
				}

				if (this.getNearestNpc() != null) {
					this.state = this.State.ATTACKING
				}

				noStroke()
				fill(colors.red)
				circle(this.position.x, this.position.y, 20)
				fill('rgba(0, 0, 0, 0.2)')
				circle(this.position.x, this.position.y, 10)

				break
			}
		}

		this.bullets.forEach((bullet, i) => {
			bullet.draw()
			if (bullet.isDead) {
				this.bullets.splice(i, 1)
			}
		})

		this.zzzs.forEach((zzz, i) => {
			zzz.draw()
			if (zzz.isDead) {
				this.zzzs.splice(i, 1)
			}
		})
	}

	spawnZzz() {
		let zzz = new Zzz(this.position.x, this.position.y)
		this.zzzs.push(zzz)
	}

	getNearestNpc() {
		let minDistance = 9999999999
		let minIndex = -1
		Game.npcs.forEach((npc, i) => {
			let distance = p5.Vector.dist(npc.position, this.position)

			if (distance < this.attackRadius / 2 && distance < minDistance) {
				minDistance = distance
				minIndex = i
			}
		})

		if (minIndex < 0) {
			return null
		} else {
			return Game.npcs[minIndex]
		}
	}
}
