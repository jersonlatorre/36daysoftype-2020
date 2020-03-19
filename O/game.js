class GameState {
	static FADE_IN = 0
	static WAIT_FOR_START = 1
	static GAMEPLAY = 2
	static LOSE = 3
	static FADE_OUT_WIN = 4
	static FADE_OUT_LOSE = 5
	static WIN = 6
	static ALL_ENEMIES_DIE = 7
	static WAITING_FOR_ALL_ENEMIES_DIE = 8
	static ALL_BLACK = 9
}

/**
 *  WIN 
 * 	-> ALL_ENEMIES_DIE 
 * 	-> WAITING_FOR_ALL_ENEMIES_DIE 
 * 	-> FADE_OUT_WIN 
 *	-> ALL_BLACK 
 * 	-> FADE_IN
 * 
 *  LOSE 
 * 	-> FADE_OUT_LOSE 
 * 	-> ALL_BLACK 
 * 	-> FADE_IN
 * */

class Game {
	constructor() {
		this.FADE_TIME = 0.4
		this.restart()
	}

	restart() {
		Global.effects = []
		Global.game = this
		this.player = new Player()
		this.planet = new Planet()
		this.enemies = []
		this.items = []

		this.targetPosition = createVector(0, 0)
		this.targetAngle = -PI / 2
		this.targetScale = 1
		this.scale = 0.6 * 1080 / Global.PLANET_RADIUS

		this.state = GameState.FADE_IN
		this.time = 0
		this.fadeTime = 0
		this.generateEnemies()
		this.generateItems()
	}

	draw() {
		background(colors.white)

		switch (this.state) {
			case GameState.FADE_IN: {
				scale(this.scale)
				this.drawElements()

				this.fadeTime += deltaTime / 1000
				if (this.fadeTime >= this.FADE_TIME) {
					this.state = GameState.WAIT_FOR_START
					this.fadeTime = this.FADE_TIME
				}

				fill(0, 255 - 1 / this.FADE_TIME * this.fadeTime * 255)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)

				break
			}
			case GameState.WAIT_FOR_START: {
				scale(this.scale)
				this.drawElements()

				this.time += deltaTime / 1000
				if (this.time >= 0.3) {
					this.state = GameState.GAMEPLAY
					this.time = 0
				}
				break
			}
			case GameState.GAMEPLAY: {
				this.cameraFollowToPlayer()
				this.planet.draw()
				this.player.draw()
				this.enemies.forEach((enemy) => {
					enemy.draw()
				})
				this.items.forEach((item) => {
					item.draw()
				})
				Global.effects.forEach((effect) => {
					effect.draw()
				})

				// if the number of items == 0, WIN!
				if (this.items.length == 0) {
					this.player.state = PlayerState.DIE
					this.state = GameState.WIN
					this.targetScale = 0.6 * 1080 / Global.PLANET_RADIUS
				}
				break
			}
			case GameState.WIN: {
				this.cameraFollowToCenter()
				this.drawElements()
				this.time += deltaTime / 1000

				if (this.time >= 1) {
					this.time = 0
					this.state = GameState.ALL_ENEMIES_DIE
				}
				break
			}
			case GameState.ALL_ENEMIES_DIE: {
				this.cameraFollowToCenter()
				this.drawElements()
				this.enemies.forEach((enemy) => {
					enemy.state = EnemyState.EXPLODE
				})

				this.state = GameState.WAITING_FOR_ALL_ENEMIES_DIE

				break
			}
			case GameState.WAITING_FOR_ALL_ENEMIES_DIE: {
				this.cameraFollowToCenter()
				this.drawElements()
				if (this.enemies.length == 0) {
					this.state = GameState.FADE_OUT_WIN
				}
				break
			}
			case GameState.LOSE: {
				this.cameraFollowToPlayer()
				this.drawElements()

				this.time += deltaTime / 1000
				if (this.time >= 1) {
					this.time = 0
					this.state = GameState.FADE_OUT_LOSE
				}
				break
			}
			case GameState.FADE_OUT_WIN: {
				this.cameraFollowToCenter()
				this.drawElements()

				this.fadeTime -= deltaTime / 1000
				if (this.fadeTime <= 0) {
					this.restart()
					this.state = GameState.ALL_BLACK
					this.fadeTime = 0
				}

				fill(0, 255 - 1 / this.FADE_TIME * this.fadeTime * 255)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)

				break
			}
			case GameState.FADE_OUT_LOSE: {
				this.cameraFollowToPlayer()
				this.drawElements()

				this.fadeTime -= deltaTime / 1000
				if (this.fadeTime <= 0) {
					this.restart()
					this.state = GameState.ALL_BLACK
					this.fadeTime = 0
				}

				fill(0, 255 - 1 / this.FADE_TIME * this.fadeTime * 255)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)

				break
			}
			case GameState.ALL_BLACK: {
				fill(0)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)

				this.time += deltaTime / 1000
				if (this.time >= 0.3) {
					this.time = 0
					this.state = GameState.FADE_IN
				}
				break
			}
		}

		Global.effects.forEach((effect, i) => {
			if (effect.isDead) {
				Global.effects.splice(i, 1)
			}
		})

		this.items.forEach((item, i) => {
			if (item.isDead) {
				this.items.splice(i, 1)
			}
		})

		this.enemies.forEach((enemy, i) => {
			if (enemy.isDead) {
				this.enemies.splice(i, 1)
			}
		})
	}

	drawElements() {
		this.planet.draw()
		this.player.draw()
		this.enemies.forEach((enemy) => {
			enemy.draw()
		})
		this.items.forEach((item) => {
			item.draw()
		})
		Global.effects.forEach((effect) => {
			effect.draw()
		})
	}

	cameraFollowToCenter() {
		this.scale += Global.CAMERA_EASING * (this.targetScale - this.scale)
		this.targetAngle += Global.CAMERA_EASING * (this.player.angle - this.targetAngle)
		this.targetPosition.add(createVector(0, 0).sub(this.targetPosition).mult(Global.CAMERA_EASING))
		scale(this.scale)
		rotate(-this.targetAngle - PI / 2)
		translate(-this.targetPosition.x, -this.targetPosition.y)
	}

	cameraFollowToPlayer() {
		this.scale += Global.CAMERA_EASING * (this.targetScale - this.scale)
		this.targetAngle += Global.CAMERA_EASING * (this.player.angle - this.targetAngle)
		this.targetPosition.add(this.player.position.copy().sub(this.targetPosition).mult(Global.CAMERA_EASING))
		scale(this.scale)
		rotate(-this.targetAngle - PI / 2)
		translate(-this.targetPosition.x, -this.targetPosition.y)
	}

	generateEnemies() {
		for (let i = 0; i < Global.NUMBER_OF_ENEMIES; i++) {
			// generate random angle
			let enemy = new Enemy(random(0, 2 * PI))

			// repeat after find a valid angle
			while (!this.isValidEnemy(enemy)) {
				enemy = new Enemy(random(0, 2 * PI))
			}

			this.enemies.push(enemy)
		}
	}

	generateItems() {
		for (let i = 0; i < Global.NUMBER_OF_ITEMS; i++) {
			// generate random angle
			let item = new Item(random(0, 2 * PI))

			// repeat after find a valid angle
			while (!this.isValidItem(item)) {
				item = new Item(random(0, 2 * PI))
			}

			this.items.push(item)
		}
	}

	isValidEnemy(enemy) {
		// distance to player
		let distanceToPlayer = dist(enemy.position.x, enemy.position.y, this.player.position.x, this.player.position.y)
		if (distanceToPlayer < Global.MIN_DISTANCE_BETWEEN_ENEMIES) {
			return false
		}

		// distance to enemies
		for (let i = 0; i < this.enemies.length; i++) {
			let e = this.enemies[i]
			let distanceToEnemy = dist(enemy.position.x, enemy.position.y, e.position.x, e.position.y)
			if (distanceToEnemy < Global.MIN_DISTANCE_BETWEEN_ENEMIES) {
				return false
			}
		}

		return true
	}

	isValidItem(item) {
		// distance to player
		let distanceToPlayer = dist(item.position.x, item.position.y, this.player.position.x, this.player.position.y)
		if (distanceToPlayer < Global.MIN_DISTANCE_BETWEEN_ITEMS) {
			return false
		}

		// distance to enemies
		for (let i = 0; i < this.items.length; i++) {
			let it = this.items[i]
			let distanceToItem = dist(item.position.x, item.position.y, it.position.x, it.position.y)
			if (distanceToItem < Global.MIN_DISTANCE_BETWEEN_ITEMS) {
				return false
			}
		}

		return true
	}

	keyPressed() {
		if (this.state == GameState.GAMEPLAY) {
			this.player.keyPressed()
		}
	}

	keyReleased() {
		if (this.state == GameState.GAMEPLAY) {
			this.player.keyReleased()
		}
	}
}
