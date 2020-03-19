class PlayerState {
	static IDLE = 0
	static DIE = 1
}

class Player {
	constructor() {
		Global.player = this
		this.state = PlayerState.IDLE

		this.ANGLE_ACCELERATION = 0.01

		// right/left
		this.isMovingLeft = false
		this.isMovingRight = false
		this.angle = -PI / 2
		this.angleSpeed = 0
		this.angleAcceleration = 0
		this.position = createVector()
		this.position.x = 0.5 * (Global.PLANET_RADIUS + Global.PLAYER_HEIGHT) * cos(this.angle)
		this.position.y = 0.5 * (Global.PLANET_RADIUS + Global.PLAYER_HEIGHT) * sin(this.angle)

		// jump
		this.jumpHeight = 0
		this.tJump = 0
		this.isJumping = false
		this.jumpLock = false
	}

	draw() {
		switch (this.state) {
			case PlayerState.IDLE: {
				this.angle += this.angleSpeed * deltaTime / 16

				// left/right controller
				if (this.isMovingLeft) {
					this.applyAngleForce(-this.ANGLE_ACCELERATION)
				}
				if (this.isMovingRight) {
					this.applyAngleForce(this.ANGLE_ACCELERATION)
				}
				if (!this.isMovingLeft && !this.isMovingRight) {
					this.angleSpeed *= Global.PLAYER_FRICTION
				}

				// jump controller
				if (this.isJumping && !this.jumpLock) {
					this.jumpLock = true
				}

				if (this.jumpLock) {
					this.jumpHeight = Global.PLAYER_JUMP_HEIGHT * (4 * this.tJump - 4 * this.tJump * this.tJump)
					this.tJump += Global.JUMP_SPEED * deltaTime / 16
					if (this.tJump > 1) {
						this.tJump = 0
						this.jumpHeight = 0
						this.jumpLock = false
					}
				}

				// calculate position
				this.position.x =
					0.5 * (Global.PLANET_RADIUS + Global.PLAYER_HEIGHT + this.jumpHeight) * cos(this.angle)
				this.position.y =
					0.5 * (Global.PLANET_RADIUS + Global.PLAYER_HEIGHT + this.jumpHeight) * sin(this.angle)

				// draw
				fill(colors.black)
				circle(this.position.x, this.position.y, Global.PLAYER_HEIGHT)
				break
			}
			case PlayerState.DIE: {
				// calculate position
				this.position.x =
					0.5 * (Global.PLANET_RADIUS + Global.PLAYER_HEIGHT + this.jumpHeight) * cos(this.angle)
				this.position.y =
					0.5 * (Global.PLANET_RADIUS + Global.PLAYER_HEIGHT + this.jumpHeight) * sin(this.angle)

				// draw
				fill(colors.black)
				circle(this.position.x, this.position.y, Global.PLAYER_HEIGHT)
				break
			}
		}
	}

	applyAngleForce(force) {
		this.angleSpeed += force
		if (this.angleSpeed > Global.PLAYER_SPEED) {
			this.angleSpeed = Global.PLAYER_SPEED
		}
		if (this.angleSpeed < -Global.PLAYER_SPEED) {
			this.angleSpeed = -Global.PLAYER_SPEED
		}
	}

	keyPressed() {
		if (key == 'a' || key == 'A' || keyCode == LEFT_ARROW) {
			this.isMovingLeft = true
		}
		if (key == 'd' || key == 'D' || keyCode == RIGHT_ARROW) {
			this.isMovingRight = true
		}
		if (key == 'w' || key == 'W' || keyCode == UP_ARROW) {
			this.isJumping = true
		}
	}

	keyReleased() {
		if (key == 'a' || key == 'A' || keyCode == LEFT_ARROW) {
			this.isMovingLeft = false
		}
		if (key == 'd' || key == 'D' || keyCode == RIGHT_ARROW) {
			this.isMovingRight = false
		}
		if (key == 'w' || key == 'W' || keyCode == UP_ARROW) {
			this.isJumping = false
		}
	}
}
