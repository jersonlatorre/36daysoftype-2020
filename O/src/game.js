class GameState {
	static FADE_IN = 0
	static WAIT_FOR_START = 1
	static GAMEPLAY = 2
	static LOSE_LEVEL = 3
	static FADE_OUT_WIN = 4
	static FADE_OUT_LOSE = 5
	static WIN_LEVEL = 6
	static WIN_GAME = 10
	static ALL_ENEMIES_DIE = 7
	static WAITING_FOR_ALL_ENEMIES_DIE = 8
	static ALL_BLACK_WIN = 9
	static ALL_BLACK_LOSE = 11
	static START = 12
}

/**
 *  WIN _LEVEL
 * 	-> ALL_ENEMIES_DIE 
 * 	-> WAITING_FOR_ALL_ENEMIES_DIE 
 * 	-> FADE_OUT_WIN 
 *	-> ALL_BLACK 
 * 	-> FADE_IN
 * 
 *  LOSE_LEVEL
 * 	-> FADE_OUT_LOSE 
 * 	-> ALL_BLACK 
 * 	-> FADE_IN
 * */

class Game {
	constructor() {
		Global.level = -1
		Global.game = this
		this.nextLevel()
		this.state = GameState.START
	}

	nextLevel() {
		Global.level++
		Global.NUMBER_OF_ENEMIES = levels[Global.level].numberOfEnemies
		Global.NUMBER_OF_ITEMS = levels[Global.level].numberOfItems
		Global.MIN_DISTANCE_BETWEEN_ENEMIES = levels[Global.level].minDistanceBetweenEnemies
		Global.MIN_DISTANCE_BETWEEN_ITEMS = levels[Global.level].minDistanceBetweenItems
		Global.PLANET_RADIUS = levels[Global.level].planetRadius
		Global.PLAYER_SPEED = 13 / Global.PLANET_RADIUS
		Global.effects = []
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

	restartLevel() {
		Global.effects = []
		this.player = new Player()
		this.planet = new Planet()
		this.enemies = [ ...Global.backupEnemies ]
		this.items = [ ...Global.backupItems ]

		this.enemies.forEach((enemy) => {
			enemy.restart()
		})

		this.items.forEach((item) => {
			item.restart()
		})

		this.targetPosition = createVector(0, 0)
		this.targetAngle = -PI / 2
		this.targetScale = 1
		this.scale = 0.6 * 1080 / Global.PLANET_RADIUS

		this.state = GameState.FADE_IN
		this.time = 0
		this.fadeTime = 0
	}

	draw() {
		blendMode(BLEND)
		background(colors.white)

		switch (this.state) {
			case GameState.FADE_IN: {
				if (!bgmSound.isLooping()) {
					bgmSound.loop()
				}
				scale(this.scale)
				this.drawElements()

				this.fadeTime += deltaTime / 1000
				if (this.fadeTime >= Global.FADE_TIME) {
					this.state = GameState.WAIT_FOR_START
					this.fadeTime = Global.FADE_TIME
				}

				fill(0, 255 - 1 / Global.FADE_TIME * this.fadeTime * 255)
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
					this.state = GameState.WIN_LEVEL
					bgmSound.stop()
					setTimeout(() => {
						completedSound.play()
					}, 80)
					this.targetScale = 0.6 * 1080 / Global.PLANET_RADIUS
				}
				break
			}
			case GameState.WIN_LEVEL: {
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
				explosionSound.play()
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
			case GameState.LOSE_LEVEL: {
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
					if (Global.level < levels.length - 1) {
						this.nextLevel()
						this.state = GameState.ALL_BLACK_WIN
						levelupSound.play()
						this.fadeTime = 0
					} else {
						this.state = GameState.WIN_GAME
					}
				}

				fill(0, 255 - 1 / Global.FADE_TIME * this.fadeTime * 255)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)

				break
			}
			case GameState.FADE_OUT_LOSE: {
				this.cameraFollowToPlayer()
				this.drawElements()

				this.fadeTime -= deltaTime / 1000
				if (this.fadeTime <= 0) {
					this.restartLevel()
					this.state = GameState.ALL_BLACK_LOSE
					this.fadeTime = 0
					tryagainSound.play()
				}

				fill(0, 255 - 1 / Global.FADE_TIME * this.fadeTime * 255)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)
				break
			}
			case GameState.ALL_BLACK_LOSE: {
				fill(0)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)
				fill(colors.white)
				text('try again', 0, 0)

				this.time += deltaTime / 1000
				if (this.time >= 0.5) {
					this.time = 0
					this.state = GameState.FADE_IN
				}
				break
			}
			case GameState.ALL_BLACK_WIN: {
				fill(0)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)
				fill(colors.white)
				if (Global.level < levels.length - 1) {
					textSize(40)
					text('level ' + (Global.level + 1) + '/' + levels.length, 0, 0)
				} else {
					fill(colors.red)
					textSize(60)
					text('FINAL LEVEL', 0, 0)
				}

				this.time += deltaTime / 1000
				if (this.time >= 1) {
					this.time = 0
					this.state = GameState.FADE_IN
				}
				break
			}
			case GameState.START: {
				fill(0)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)
				fill(colors.white)
				text('level 1/5', 0, -35)

				if (
					mouseX - width / 2 < 75 &&
					mouseX - width / 2 > -75 &&
					mouseY - height / 2 - 42 > -30 &&
					mouseY - height / 2 - 42 < 30
				) {
					cursor(HAND)
					fill('#bbb')

					if (mouseIsPressed) {
						cursor(ARROW)
						this.state = GameState.FADE_IN
					}
				} else {
					cursor(ARROW)
					fill('#999')
				}
				rect(0, 42, 150, 60)

				fill(colors.white)
				text('start', 0, 35)
				break
			}
			case GameState.WIN_GAME: {
				winScreenImage.resize(width, width)
				fill(0)
				rectMode(CENTER)
				rect(0, 0, 5000, 5000)
				image(winScreenImage, -width / 2, -width / 2)
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

		Global.backupEnemies = [ ...this.enemies ]
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

		Global.backupItems = [ ...this.items ]
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
