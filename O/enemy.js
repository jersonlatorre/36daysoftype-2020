class EnemyState {
	static IDLE = 0
	static HIT = 1
	static EXPLODE = 2
	static DIE = 3
}

class Enemy {
	constructor(angle) {
		this.angle = angle
		let x = 0.5 * (Global.PLANET_RADIUS + Global.ENEMY_HEIGHT) * cos(this.angle)
		let y = 0.5 * (Global.PLANET_RADIUS + Global.ENEMY_HEIGHT) * sin(this.angle)
		this.position = createVector(x, y)
		this.state = EnemyState.IDLE
		this.scale = 1
		this.targetScale = 1.4
		this.isDead = false
	}

	draw() {
		switch (this.state) {
			case EnemyState.IDLE: {
				// check collisions
				if (
					dist(Global.player.position.x, Global.player.position.y, this.position.x, this.position.y) <
					Global.ENEMY_HEIGHT * 0.6
				) {
					this.state = EnemyState.HIT
					Global.game.state = GameState.LOSE
					Global.player.state = PlayerState.DIE
				}

				push()
				let rotation = atan2(this.position.y, this.position.x)
				translate(this.position.x, this.position.y)
				rotate(PI / 2 + rotation)
				imageMode(CENTER)
				image(enemyImage, 0, 0)
				pop()
				break
			}
			case EnemyState.HIT: {
				this.scale += 0.12 * (this.targetScale - this.scale)
				push()
				let rotation = atan2(this.position.y, this.position.x)
				translate(this.position.x, this.position.y)
				rotate(PI / 2 + rotation)
				scale(this.scale)
				imageMode(CENTER)
				image(enemyImage, 0, 0)
				pop()
				break
			}
			case EnemyState.EXPLODE: {
				Global.effects.push(new Explosion(this.position.x, this.position.y, 'red'))
				this.state = EnemyState.DIE
				break
			}
			case EnemyState.DIE: {
				setTimeout(() => {
					this.isDead = true
				}, 1000)
				break
			}
		}
	}
}
