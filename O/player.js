class Player {
	constructor() {
		this.MAX_SPEED = 0.03
		this.ANGLE_ACCELERATION = 0.01
		this.FRICTION = 0.89

		// right/left
		this.isMovingLeft = false
		this.isMovingRight = false
		this.angle = -PI / 2
		this.angleSpeed = 0
		this.angleAcceleration = 0

		// jump
		this.MAX_JUMP_HEIGHT = 170
		this.jumpHeight = 0
		this.tJump = 0
		this.deltaTJump = 0.035
		this.isJumping = false
		this.jumpLock = false

		this.position = createVector(0, 0)
	}

	draw() {
		this.angle += this.angleSpeed * deltaTime / 16
		// this.angle += this.angleSpeed

		if (this.isMovingLeft) {
			this.applyAngleForce(-this.ANGLE_ACCELERATION)
		}
		if (this.isMovingRight) {
			this.applyAngleForce(this.ANGLE_ACCELERATION)
		}
		if (!this.isMovingLeft && !this.isMovingRight) {
			this.angleSpeed *= this.FRICTION
		}

		if (this.isJumping && !this.jumpLock) {
			this.jumpLock = true
		}

		if (this.jumpLock) {
			this.jumpHeight = this.MAX_JUMP_HEIGHT * (4 * this.tJump - 4 * this.tJump * this.tJump)
			this.tJump += this.deltaTJump
			if (this.tJump >= 1) {
				this.tJump = 0
				this.jumpHeight = 0
				this.jumpLock = false
			}
		}

		this.position.x = 0.5 * (Global.PLANET_RADIUS + Global.PLAYER_HEIGHT + this.jumpHeight) * cos(this.angle)
		this.position.y = 0.5 * (Global.PLANET_RADIUS + Global.PLAYER_HEIGHT + this.jumpHeight) * sin(this.angle)

		// draw
		fill(colors.red)
		circle(this.position.x, this.position.y, Global.PLAYER_HEIGHT)
	}

	applyAngleForce(force) {
		this.angleSpeed += force
		if (this.angleSpeed > this.MAX_SPEED) {
			this.angleSpeed = this.MAX_SPEED
		}
		if (this.angleSpeed < -this.MAX_SPEED) {
			this.angleSpeed = -this.MAX_SPEED
		}
	}

	keyPressed() {
		if (key == 'a' || key == 'A') {
			this.isMovingLeft = true
		}
		if (key == 'd' || key == 'D') {
			this.isMovingRight = true
		}
		if (key == 'w' || key == 'W') {
			this.isJumping = true
		}
	}

	keyReleased() {
		if (key == 'a' || key == 'A') {
			this.isMovingLeft = false
		}
		if (key == 'd' || key == 'D') {
			this.isMovingRight = false
		}
		if (key == 'w' || key == 'W') {
			this.isJumping = false
		}
	}
}
